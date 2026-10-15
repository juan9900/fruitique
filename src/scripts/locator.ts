/**
 * Localizador de ubicaciones: ZIP o ciudad → ubicación más cercana + lista + mapa.
 * 100 % en el cliente, sin llaves de API: /data/stores.json, /data/zips.json (ver scripts/build-data.mjs) y MapLibre con tiles vectoriales de OpenFreeMap (datos de OpenStreetMap),
 * con el estilo recoloreado con la paleta de marca (ver brandStyle).
 */
import { gsap } from 'gsap';
import { maplibregl, brandStyle, rasterFallback, STYLE_URL, RED, YELLOW, PURPLE } from './brandmap';

interface Store { id: number; name: string; retailer: string | null; address: string; city: string; state: string; zip: string; lat: number; lng: number }
type Pt = { lat: number; lng: number };

const cfg = JSON.parse(document.getElementById('locator-config')!.textContent!) as { locale: 'en' | 'es'; labels: Record<string, string> };
const L10N = cfg.labels;
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const form = $<HTMLFormElement>('loc-form'), input = $<HTMLInputElement>('loc-q'), geoBtn = $<HTMLButtonElement>('loc-geo');
const filterEl = $<HTMLSelectElement>('loc-filter'), statusEl = $('loc-status'), closestEl = $('loc-closest'), moreEl = $('loc-more'), listEl = $('loc-list');


let stores: Store[] = [];
let zips: Record<string, [number, number]> = {};
const cityIndex = new Map<string, { lat: number; lng: number; n: number }>();

const miles = (a: Pt, b: Pt) => {
  const r = 3958.8, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(h));
};
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const fmt = (d: number) => (d < 10 ? d.toFixed(1) : Math.round(d).toString());
const directions = (s: Store) => `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;
const addr = (s: Store) => [s.address, [s.city, s.state].filter(Boolean).join(', '), s.zip].filter(Boolean).join(' · ');

/* ── Mapa (MapLibre + OpenFreeMap, estilo de marca) ── */
const gestureText = cfg.locale === 'es'
  ? { 'CooperativeGesturesHandler.WindowsHelpText': 'Usa Ctrl + scroll para acercar el mapa', 'CooperativeGesturesHandler.MacHelpText': 'Usa ⌘ + scroll para acercar el mapa', 'CooperativeGesturesHandler.MobileHelpText': 'Usa dos dedos para mover el mapa' }
  : { 'CooperativeGesturesHandler.WindowsHelpText': 'Use Ctrl + scroll to zoom the map', 'CooperativeGesturesHandler.MacHelpText': 'Use ⌘ + scroll to zoom the map', 'CooperativeGesturesHandler.MobileHelpText': 'Use two fingers to move the map' };

const map = new maplibregl.Map({
  container: 'loc-map',
  style: rasterFallback as any,
  center: [-81.0, 27.0],
  zoom: 6,
  cooperativeGestures: true,
  locale: gestureText,
  attributionControl: { compact: true },
});
map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-left');

const features = (list: Store[]) => ({
  type: 'FeatureCollection' as const,
  features: list.map((s) => ({ type: 'Feature' as const, properties: { id: s.id }, geometry: { type: 'Point' as const, coordinates: [s.lng, s.lat] } })),
});
const byId = new Map<number, Store>();
let mapReady: Promise<void>;
let selected: number | null = null;
const popup = new maplibregl.Popup({ closeButton: false, offset: 12 });

function setupLayers() {
  map.addSource('stores', { type: 'geojson', data: features([]) });
  map.addSource('user', { type: 'geojson', data: features([]) });
  map.addLayer({ id: 'stores-dots', type: 'circle', source: 'stores', paint: { 'circle-radius': 5, 'circle-color': RED, 'circle-stroke-color': '#ffffff', 'circle-stroke-width': 1.5 } });
  map.addLayer({ id: 'stores-selected', type: 'circle', source: 'stores', filter: ['==', ['get', 'id'], -1], paint: { 'circle-radius': 11, 'circle-color': RED, 'circle-stroke-color': YELLOW, 'circle-stroke-width': 4 } });
  map.addLayer({ id: 'user-dot', type: 'circle', source: 'user', paint: { 'circle-radius': 9, 'circle-color': PURPLE, 'circle-stroke-color': '#ffffff', 'circle-stroke-width': 3 } });
  map.on('click', 'stores-dots', (e) => {
    const id = e.features?.[0]?.properties?.id as number | undefined;
    const s = id != null ? byId.get(id) : undefined;
    if (!s) return;
    select(s, false);
    document.getElementById(`loc-item-${s.id}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  map.on('mouseenter', 'stores-dots', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    const id = e.features?.[0]?.properties?.id as number | undefined;
    const s = id != null ? byId.get(id) : undefined;
    if (s) popup.setLngLat([s.lng, s.lat]).setText(`${s.name} · ${s.city}`).addTo(map);
  });
  map.on('mouseleave', 'stores-dots', () => { map.getCanvas().style.cursor = ''; popup.remove(); });
}

mapReady = new Promise<void>((resolve) => {
  map.once('load', async () => {
    try {
      const style = brandStyle(await fetch(STYLE_URL).then((r) => r.json()));
      map.setStyle(style, { diff: false });
      map.once('styledata', () => { setupLayers(); resolve(); });
    } catch {
      setupLayers(); // se queda con el mapa raster de OpenStreetMap
      resolve();
    }
  });
});

function select(s: Store, pan = true) {
  selected = s.id;
  if (map.getLayer('stores-selected')) map.setFilter('stores-selected', ['==', ['get', 'id'], s.id]);
  if (pan) map.flyTo({ center: [s.lng, s.lat], zoom: Math.max(map.getZoom(), 14), duration: 800 });
}
async function drawMarkers(list: Store[]) {
  await mapReady;
  byId.clear();
  list.forEach((s) => byId.set(s.id, s));
  (map.getSource('stores') as maplibregl.GeoJSONSource).setData(features(list));
  map.setFilter('stores-selected', ['==', ['get', 'id'], -1]);
  selected = null;
}

/* ── Filtro ── */
function filtered(): Store[] {
  const v = filterEl.value;
  if (v === 'all') return stores;
  if (v === 'independent') return stores.filter((s) => !s.retailer);
  return stores.filter((s) => s.retailer === v);
}
function buildFilter() {
  const chains = [...new Set(stores.map((s) => s.retailer).filter(Boolean) as string[])].sort(
    (a, b) => stores.filter((s) => s.retailer === b).length - stores.filter((s) => s.retailer === a).length,
  );
  filterEl.innerHTML = [`<option value="all">${L10N.all}</option>`, ...chains.map((c) => `<option>${c}</option>`), `<option value="independent">${L10N.independent}</option>`].join('');
}

/* ── Búsqueda ── */
function resolve(q: string): Pt | null {
  const raw = q.trim();
  const zip = raw.match(/\b(\d{5})\b/)?.[1];
  if (zip && zips[zip]) return { lat: zips[zip][0], lng: zips[zip][1] };
  const key = norm(raw).replace(/\b(fl|florida|ny|new york state|nj|new jersey|ma|ct|ri)\b$/, '').trim();
  if (!key) return null;
  const hit = cityIndex.get(key) ?? [...cityIndex.entries()].filter(([k]) => k.startsWith(key)).sort((a, b) => b[1].n - a[1].n)[0]?.[1];
  return hit ? { lat: hit.lat, lng: hit.lng } : null;
}

function show(origin: Pt) {
  const pool = filtered();
  const ranked = pool.map((s) => ({ s, d: miles(origin, s) })).sort((a, b) => a.d - b.d);
  statusEl.textContent = '';
  if (!ranked.length) { statusEl.textContent = L10N.none; closestEl.hidden = moreEl.hidden = true; return; }

  drawMarkers(pool).then(() => {
    (map.getSource('user') as maplibregl.GeoJSONSource).setData({ type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [origin.lng, origin.lat] } }] });
    const pts = [[origin.lng, origin.lat], ...[first, ...next].map(({ s }) => [s.lng, s.lat])];
    const b = pts.reduce((acc, [x, y]) => acc.extend([x, y] as [number, number]), new maplibregl.LngLatBounds(pts[0] as [number, number], pts[0] as [number, number]));
    map.fitBounds(b, { padding: 60, maxZoom: 14, duration: 1000 });
    select(first.s, false);
  });

  const [first, ...rest] = ranked;
  const next = rest.slice(0, 8);
  closestEl.hidden = false;
  closestEl.innerHTML = '';
  const h = document.createElement('h2');
  h.textContent = L10N.closest.replace('{name}', `${first.s.name} (${first.s.city})`).replace('{d}', fmt(first.d));
  const p = document.createElement('p');
  p.textContent = addr(first.s);
  const a = document.createElement('a');
  a.className = 'btn btn--red'; a.href = directions(first.s); a.target = '_blank'; a.rel = 'noopener'; a.textContent = L10N.directions;
  closestEl.append(h, p, a);
  if (first.d > 40) statusEl.textContent = L10N.far;

  moreEl.hidden = !next.length;
  listEl.innerHTML = '';
  for (const { s, d } of next) {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button'; b.id = `loc-item-${s.id}`;
    b.innerHTML = `<span><span class="n"></span><span class="a"></span></span><span class="d"></span>`;
    (b.querySelector('.n') as HTMLElement).textContent = s.name;
    (b.querySelector('.a') as HTMLElement).textContent = addr(s);
    (b.querySelector('.d') as HTMLElement).textContent = `${fmt(d)} ${L10N.mi}`;
    b.addEventListener('click', () => select(s));
    li.append(b); listEl.append(li);
  }

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from(closestEl, { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out' });
    gsap.from(listEl.children, { y: 16, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.15 });
  }
}

let lastOrigin: Pt | null = null;
function search(q: string) {
  const origin = resolve(q);
  if (!origin) { statusEl.textContent = L10N.noMatch; closestEl.hidden = moreEl.hidden = true; return; }
  lastOrigin = origin;
  show(origin);
}

const toResults = () => document.querySelector('.results')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
form.addEventListener('submit', (e) => { e.preventDefault(); search(input.value); toResults(); });
filterEl.addEventListener('change', () => { if (lastOrigin) show(lastOrigin); else drawMarkers(filtered()); });
geoBtn.addEventListener('click', () => {
  if (!navigator.geolocation) { statusEl.textContent = L10N.geoError; return; }
  navigator.geolocation.getCurrentPosition(
    (pos) => { lastOrigin = { lat: pos.coords.latitude, lng: pos.coords.longitude }; input.value = ''; show(lastOrigin); },
    () => { statusEl.textContent = L10N.geoError; },
    { timeout: 10000 },
  );
});

/* ── Carga de datos ── */
(async () => {
  try {
    const [s, z] = await Promise.all([fetch('/data/stores.json').then((r) => r.json()), fetch('/data/zips.json').then((r) => r.json())]);
    stores = s; zips = z;
    for (const st of stores) {
      const k = norm(st.city);
      if (!k) continue;
      const c = cityIndex.get(k) ?? { lat: 0, lng: 0, n: 0 };
      c.lat += st.lat; c.lng += st.lng; c.n++;
      cityIndex.set(k, c);
    }
    cityIndex.forEach((c) => { c.lat /= c.n; c.lng /= c.n; });
    buildFilter();
    drawMarkers(stores);
    statusEl.textContent = '';
    const q = new URLSearchParams(location.search).get('q');
    if (q) { input.value = q; search(q); }
  } catch {
    statusEl.textContent = L10N.noMatch;
  }
})();
