import storesJson from './stores.json';

export interface Store { id: number; name: string; retailer: string | null; address: string; city: string; state: string; zip: string; lat: number; lng: number }
export const stores = storesJson as Store[];

export const stateNames: Record<string, { en: string; es: string }> = {
  FL: { en: 'Florida', es: 'Florida' },
  NY: { en: 'New York', es: 'Nueva York' },
  NJ: { en: 'New Jersey', es: 'Nueva Jersey' },
  MA: { en: 'Massachusetts', es: 'Massachusetts' },
  RI: { en: 'Rhode Island', es: 'Rhode Island' },
  CT: { en: 'Connecticut', es: 'Connecticut' },
};

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Mínimo de ubicaciones para tener página propia (evita páginas vacías/duplicadas, ver PLAN-SITIO §6). */
export const MIN_CITY = 3;
export const MIN_RETAILER = 4;

export interface CityGroup { slug: string; city: string; state: string; stores: Store[] }
export interface RetailerGroup { slug: string; name: string; stores: Store[] }

const cityMap = new Map<string, CityGroup>();
for (const s of stores) {
  if (!s.city || !s.state) continue;
  const slug = `${slugify(s.city)}-${s.state.toLowerCase()}`;
  const g = cityMap.get(slug) ?? { slug, city: s.city, state: s.state, stores: [] };
  g.stores.push(s);
  cityMap.set(slug, g);
}
export const cities = [...cityMap.values()].filter((c) => c.stores.length >= MIN_CITY).sort((a, b) => b.stores.length - a.stores.length);

const retMap = new Map<string, RetailerGroup>();
for (const s of stores) {
  if (!s.retailer) continue;
  const slug = slugify(s.retailer);
  const g = retMap.get(slug) ?? { slug, name: s.retailer, stores: [] };
  g.stores.push(s);
  retMap.set(slug, g);
}
export const retailers = [...retMap.values()].filter((r) => r.stores.length >= MIN_RETAILER).sort((a, b) => b.stores.length - a.stores.length);

export const statesOf = (list: Store[]) => [...new Set(list.map((s) => s.state).filter(Boolean))];
