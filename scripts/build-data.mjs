/**
 * Genera los datos del localizador a partir de fuentes crudas en data-source/:
 *  - old-site-stores.json  → export del plugin WP Store Locator del sitio viejo (fruitiqueicecream.com), 2026-10-13 (respaldo; se sigue usando)
 *  - mapa-comercial-2026.json → cuentas del "Mapa Comercial Fruitique 2026" de la clienta (solo datos públicos de la tienda;
 *    sin ventas ni contactos). Coordenadas: Census Geocoder / OSM; `approx` = centroide del ZIP.
 *    Se combina con la lista vieja: gana la nueva en inactivas (se quitan) y se evitan duplicados.
 *  - census-zcta-2023.txt  → centroides de ZIP (US Census Gazetteer)
 * Salida: src/data/stores.json y public/data/{stores,zips}.json
 * Uso: npm run data
 */
import { readFileSync, writeFileSync } from 'node:fs';

const decode = (s) => s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n)).replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
const squash = (s) => decode(s ?? '').replace(/\s+/g, ' ').trim();
const smallWords = new Set(['of', 'de', 'la', 'el', 'and', 'the', 'y']);
const title = (s) =>
  squash(s).toLowerCase().split(' ').map((w, i) => (i && smallWords.has(w) ? w : w.replace(/(^|[-(/])([a-z])/g, (_, a, b) => a + b.toUpperCase()))).join(' ');

/** Estado por prefijo de ZIP (para filas sin estado). */
function stateFromZip(zip) {
  const p3 = zip.slice(0, 3), p2 = zip.slice(0, 2);
  if (p3 === '028' || p3 === '029') return 'RI';
  if (['01', '02', '05'].includes(p2) && p3 !== '050') return 'MA';
  if (p2 === '06') return 'CT';
  if (p2 === '07' || p2 === '08') return 'NJ';
  if (['10', '11', '12', '13', '14'].includes(p2)) return 'NY';
  if (['32', '33', '34'].includes(p2)) return 'FL';
  return '';
}

const CHAINS = [
  [/^cvs/i, 'CVS'],
  [/^winn[\s-]*dixie/i, 'Winn-Dixie'],
  [/^sedano/i, "Sedano's"],
  [/^presidente/i, 'Presidente Supermarket'],
  [/^milam/i, "Milam's Market"],
  [/^western beef/i, 'Western Beef'],
  [/^walmart/i, 'Walmart'],
  [/^bravo/i, 'Bravo Supermarket'],
  [/^vicente/i, "Vicente's Supermarket"],
];

const raw = JSON.parse(readFileSync('data-source/old-site-stores.json', 'utf8'));
const mapa = JSON.parse(readFileSync('data-source/mapa-comercial-2026.json', 'utf8'));
const REGION = new Set(['FL', 'NY', 'NJ', 'MA', 'RI', 'CT']);
const byKey = new Map();

/** Normaliza una fila (de cualquiera de las dos fuentes) y la agrega a byKey. */
function addRow(r, forcedRetailer, register = true) {
  let label = squash(r.store);
  const [head, ...rest] = label.split(':');
  const chainSrc = rest.length ? head : label;
  const chain = CHAINS.find(([re]) => re.test(chainSrc));
  const retailer = forcedRetailer ?? (chain ? chain[1] : null);

  let name;
  if (retailer) {
    const tail = rest.length ? rest.join(':') : label;
    const num = [...tail.matchAll(/\d+/g)].map((m) => m[0]).sort((a, b) => b.length - a.length)[0]?.replace(/^0+/, '');
    name = num ? `${retailer} #${num}` : squash(rest.length ? tail : label).replace(/\.$/, '');
    if (!num && rest.length) name = `${retailer} ${title(tail).replace(new RegExp(`^${retailer}\\s*`, 'i'), '')}`.trim();
  } else {
    name = title(label.replace(/^[^:]+:/, ''));
  }

  let zip = squash(r.zip).replace(/\D/g, '');
  if (zip && zip.length === 4) zip = '0' + zip;
  if (zip.length !== 5) zip = '';
  let state = squash(r.state).toUpperCase();
  if (!state && zip) state = stateFromZip(zip);

  let city = squash(r.city).replace(/,?\s*\b(N,?\s*Y|NJ|NY|FL)\b\.?$/i, '').replace(/^FT\.?\s/i, 'Fort ').replace(/^ST\.?\s/i, 'St. ');
  city = title(city);
  const lat = Number(r.lat), lng = Number(r.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || !lat) return null;

  const address = title(r.address).replace(/\bN\b/g, 'N').replace(/\b(Ne|Nw|Se|Sw)\b/g, (m) => m.toUpperCase());
  const key = `${retailer ?? name}|${lat.toFixed(4)}|${lng.toFixed(4)}`;
  const row = { name, retailer, address, city, state, zip, lat: +lat.toFixed(6), lng: +lng.toFixed(6) };
  if (register && !byKey.has(key)) byKey.set(key, row);
  return row;
}

for (const r of raw) addRow(r);

/* ── Combinar con el mapa comercial 2026 ── */
const kmBetween = (a, b) => Math.hypot((a.lat - b.lat) * 111, (a.lng - b.lng) * 111 * Math.cos((a.lat * Math.PI) / 180));
const storeNum = (r) => r.name.match(/#(\d+)/)?.[1];
const addrKey = (r) => `${r.address.toLowerCase().replace(/\W/g, '')}|${r.zip}`;
const sameStore = (a, b) => {
  if (a.retailer && b.retailer && a.retailer !== b.retailer) return false;
  if (a.retailer && b.retailer && storeNum(a) && storeNum(b)) return storeNum(a) === storeNum(b);
  if (a.address && a.zip && addrKey(a) === addrKey(b)) return true;
  return kmBetween(a, b) < (a.retailer && b.retailer ? 0.15 : 0.1);
};
const merge = { added: 0, matched: 0, inactiveRemoved: 0, outOfRegion: 0 };
for (const m of mapa) {
  const row = addRow({ store: m.name, address: m.address, city: m.city, state: m.state, zip: m.zip, lat: m.lat, lng: m.lng }, m.chain, false);
  if (!row) continue;
  if (row.state && !REGION.has(row.state)) { merge.outOfRegion++; continue; }
  const hit = [...byKey.entries()].find(([, o]) => sameStore(o, row));
  if (!m.active) { if (hit) { byKey.delete(hit[0]); merge.inactiveRemoved++; } continue; }
  if (hit) { merge.matched++; continue; }
  byKey.set(`${row.retailer ?? row.name}|${row.lat.toFixed(4)}|${row.lng.toFixed(4)}`, row);
  merge.added++;
}
console.log('mapa comercial:', merge);

/* ── Reparación de datos sucios del sitio viejo (ciudad con dirección, filas sin ZIP/estado) ── */
const rows = [...byKey.values()];
const validCity = (c) => c && !/\d/.test(c) && !c.includes(',') && c.length <= 26;
const km = (a, b) => Math.hypot((a.lat - b.lat) * 111, (a.lng - b.lng) * 111 * Math.cos((a.lat * Math.PI) / 180));
const zipCity = new Map();
for (const r of rows) if (r.zip && validCity(r.city)) { const m = zipCity.get(r.zip) ?? new Map(); m.set(r.city, (m.get(r.city) ?? 0) + 1); zipCity.set(r.zip, m); }
const modeOf = (m) => [...m.entries()].sort((a, b) => b[1] - a[1])[0][0];
for (const r of rows) {
  if (!r.zip || !r.state) { const n = rows.filter((o) => o.zip && km(o, r) < 5).sort((a, b) => km(a, r) - km(b, r))[0]; if (n) { r.zip ||= n.zip; r.state ||= n.state; } }
  if (!validCity(r.city)) {
    const oldCity = r.city;
    const near = rows.filter((o) => validCity(o.city) && km(o, r) < 3).sort((a, b) => km(a, r) - km(b, r))[0];
    r.city = (r.zip && zipCity.has(r.zip) && modeOf(zipCity.get(r.zip))) || near?.city || '';
    if (r.address.toLowerCase() === r.name.toLowerCase() || !/\d/.test(r.address)) r.address = oldCity;
  }
  if (r.city) r.address = r.address.replace(new RegExp(`\\s+${r.city}(\\s+Fl)?$`, 'i'), '').replace(/\s+Fl$/i, '').trim();
  if (/^[A-Za-z .]+ Fl \d{5}$/.test(r.address)) { r.address = ''; }
  r.state ||= r.zip ? stateFromZip(r.zip) : '';
}
const cityAlias = { Manhattan: 'New York', 'Midtown Manhattan': 'New York', 'The Bronx': 'Bronx', 'Sunny Isles': 'Sunny Isles Beach', Fairlawn: 'Fair Lawn', 'Hallandale': 'Hallandale Beach', 'North Miami Bch': 'North Miami Beach' };
for (const r of rows) r.city = cityAlias[r.city] ?? r.city;
const manual = { 'Winn-Dixie #2238': { state: 'FL', zip: '34769' },'Presidente Supermarket #2': { city: 'Lauderhill', state: 'FL', zip: '33319', address: '' }, 'Q-Mart Ny': { city: 'New York', state: 'NY' }, 'La Paisita Restaurant': { city: 'Port St. Lucie' } };
for (const r of rows) Object.assign(r, manual[r.name] ?? {});

const stores = rows
  .sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.name.localeCompare(b.name))
  .map((s, i) => ({ id: i + 1, ...s }));

// ZIPs: solo estados con ubicaciones (prefijos 01-08, 10-14, 32-34)
const keep = ['01', '02', '03', '05', '06', '07', '08', '10', '11', '12', '13', '14', '32', '33', '34'];
const zips = {};
for (const line of readFileSync('data-source/census-zcta-2023.txt', 'utf8').split('\n').slice(1)) {
  const c = line.split('\t');
  if (c.length < 7) continue;
  const z = c[0].trim();
  if (!keep.includes(z.slice(0, 2))) continue;
  zips[z] = [+Number(c[5]).toFixed(4), +Number(c[6]).toFixed(4)];
}

writeFileSync('src/data/stores.json', JSON.stringify(stores));
writeFileSync('public/data/stores.json', JSON.stringify(stores));
writeFileSync('public/data/zips.json', JSON.stringify(zips));
const byState = stores.reduce((a, s) => ((a[s.state || '?'] = (a[s.state || '?'] || 0) + 1), a), {});
console.log(`${raw.length} filas viejas + ${mapa.length} del mapa → ${stores.length} ubicaciones`, byState, `· ${Object.keys(zips).length} ZIPs`);
