export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
/** El sitio sale solo en inglés por decisión del dueño (2026-10-14). Para reactivar español: poner true, mover src/_paused/es a src/pages/es y restaurar i18n en astro.config.mjs. */
export const ES_ENABLED = false;

/** Route keys -> localized paths (sin prefijo de idioma). Ver docs/PLAN-SITIO.md §3 */
export const routes = {
  home: { en: '/', es: '/' },
  products: { en: '/products/', es: '/productos/' },
  flavors: { en: '/flavors/', es: '/sabores/' },
  whereToBuy: { en: '/where-to-buy/', es: '/donde-comprar/' },
  story: { en: '/our-story/', es: '/nuestra-historia/' },
  partner: { en: '/become-a-partner/', es: '/conviertete-en-socio/' },
  contact: { en: '/contact/', es: '/contacto/' },
} as const;
export type RouteKey = keyof typeof routes;

export const ui = {
  en: {
    'site.title': 'Fruitique — Handmade Happiness :)',
    'site.description':
      'Natural, handmade square bars, pints, ice cream sandwiches and filled popsicles. Find the closest Fruitique location near you.',
    'nav.products': 'Products',
    'nav.flavors': 'Flavors',
    'nav.whereToBuy': 'Where to Buy',
    'nav.story': 'About Us',
    'nav.partner': 'Become a Partner',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'cta.find': 'Find Fruitique near you',
    'cta.partner': 'Become a partner',
    'hero.title': 'Handmade happiness, one craving at a time.',
    'hero.text':
      'Natural flavors, handmade moments, irresistible cravings. Pick your flavor and find it at a location near you.',
    'search.label': 'City or ZIP code',
    'search.placeholder': 'Miami, FL or 33101',
    'search.button': 'Find locations',
    'stage.title': 'Which one is yours?',
    'stage.cta': 'Find it near you',
    'band.title': 'Your next little reward is closer than you think.',
    'flavors.title': 'Pick your craving.',
    'flavors.lead': 'Fourteen natural, handmade flavors. Choose yours and find it near you.',
    'products.title': 'Made for every craving.',
    'products.lead': 'SquareBars, Pints, Ice Cream Sandwiches and Filled Popsicles: different ways to say the same thing, handmade happiness.',
    'detail.moreFlavors': 'More flavors',
    'detail.moreProducts': 'More ways to enjoy',
    'detail.allFlavors': 'See all flavors',
    'detail.allProducts': 'See all products',
    'loc.title': 'Find Fruitique near you.',
    'loc.lead': 'Enter your ZIP code or city and we will show you the closest locations.',
    'loc.geo': 'Use my location',
    'loc.show': 'Show',
    'loc.all': 'All locations',
    'loc.independent': 'Independent stores',
    'loc.closest': '{name} is the closest, {d} mi away.',
    'loc.directions': 'Get directions',
    'loc.more': 'More nearby',
    'loc.noMatch': 'We could not find that ZIP code or city yet. Try another one.',
    'loc.geoError': 'We could not get your location. Enter a ZIP code instead.',
    'loc.far': 'Heads up: we have no locations close to you yet.',
    'loc.loading': 'Loading locations…',
    'loc.mi': 'mi',
    'loc.none': 'No locations for that filter nearby.',
    'page.browseCity': 'Browse by city',
    'page.browseRetailer': 'Browse by store',
    'city.lead': '{n} locations to find Fruitique in {city}, {state}. Pick the closest one and go get your craving.',
    'retailer.lead': 'Find Fruitique at {n} {retailer} locations in {states}.',
    'list.directions': 'Directions',
    'list.search': 'Search by ZIP code',
    'list.count': '{n} locations',
    'zip.label': 'ZIP code, city or state',
    'zip.placeholder': 'ZIP code, city or state',
    'zip.button': 'Filter',
    'zip.clear': 'Show all',
    'zip.near': 'Showing {n} locations within {mi} mi of {zip}, nearest first.',
    'zip.nearest': 'Nothing within {mi} mi of {zip}. Here are the closest ones.',
    'zip.found': '{n} locations match “{q}”.',
    'zip.none': 'No locations match “{q}”. Try a ZIP code, a city or FL, NY, NJ.',
    'zip.invalid': 'We could not find that ZIP code. Try a 5-digit ZIP in FL, NY or NJ.',
    'footer.tagline': 'Handmade Happiness :)',
    'footer.rights': 'All rights reserved.',
    'lang.switch': 'Español',
    'lang.switchLabel': 'Ver en español',
  },
  es: {
    'site.title': 'Fruitique — Handmade Happiness :)',
    'site.description':
      'Square bars, pints, sándwiches de helado y paletas rellenas, artesanales y naturales. Encuentra la ubicación de Fruitique más cercana a ti.',
    'nav.products': 'Productos',
    'nav.flavors': 'Sabores',
    'nav.whereToBuy': 'Dónde Comprar',
    'nav.story': 'Nuestra Historia',
    'nav.partner': 'Conviértete en Socio',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'cta.find': 'Encuentra Fruitique cerca de ti',
    'cta.partner': 'Conviértete en socio',
    'hero.title': 'Felicidad hecha a mano, un antojo a la vez.',
    'hero.text':
      'Sabores naturales, momentos artesanales, antojos irresistibles. Elige tu sabor y encuéntralo en una ubicación cerca de ti.',
    'search.label': 'Ciudad o código postal',
    'search.placeholder': 'Miami, FL o 33101',
    'search.button': 'Buscar ubicaciones',
    'stage.title': '¿Cuál es el tuyo?',
    'stage.cta': 'Encuéntralo cerca de ti',
    'band.title': 'Tu próxima recompensa está más cerca de lo que crees.',
    'flavors.title': 'Elige tu antojo.',
    'flavors.lead': 'Catorce sabores naturales y artesanales. Escoge el tuyo y encuéntralo cerca de ti.',
    'products.title': 'Hechos para cada antojo.',
    'products.lead': 'SquareBars, Pints, Sándwiches de Helado y Paletas Rellenas: distintas formas de decir lo mismo, felicidad hecha a mano.',
    'detail.moreFlavors': 'Más sabores',
    'detail.moreProducts': 'Más formas de disfrutarlo',
    'detail.allFlavors': 'Ver todos los sabores',
    'detail.allProducts': 'Ver todos los productos',
    'loc.title': 'Encuentra Fruitique cerca de ti.',
    'loc.lead': 'Escribe tu código postal o ciudad y te mostramos las ubicaciones más cercanas.',
    'loc.geo': 'Usar mi ubicación',
    'loc.show': 'Mostrar',
    'loc.all': 'Todas las ubicaciones',
    'loc.independent': 'Tiendas independientes',
    'loc.closest': '{name} es la más cercana, a {d} mi.',
    'loc.directions': 'Cómo llegar',
    'loc.more': 'Más cerca de ti',
    'loc.noMatch': 'Aún no encontramos ese código postal o ciudad. Prueba con otro.',
    'loc.geoError': 'No pudimos obtener tu ubicación. Escribe un código postal.',
    'loc.far': 'Ojo: todavía no tenemos ubicaciones cerca de ti.',
    'loc.loading': 'Cargando ubicaciones…',
    'loc.mi': 'mi',
    'loc.none': 'No hay ubicaciones cercanas con ese filtro.',
    'page.browseCity': 'Explora por ciudad',
    'page.browseRetailer': 'Explora por tienda',
    'city.lead': '{n} ubicaciones para encontrar Fruitique en {city}, {state}. Elige la más cercana y ve por tu antojo.',
    'retailer.lead': 'Encuentra Fruitique en {n} ubicaciones de {retailer} en {states}.',
    'list.directions': 'Cómo llegar',
    'list.search': 'Buscar por código postal',
    'list.count': '{n} ubicaciones',
    'zip.label': 'Código postal, ciudad o estado',
    'zip.placeholder': 'Código postal, ciudad o estado',
    'zip.button': 'Filtrar',
    'zip.clear': 'Ver todas',
    'zip.near': '{n} ubicaciones a menos de {mi} mi de {zip}, de la más cercana a la más lejana.',
    'zip.nearest': 'Nada a menos de {mi} mi de {zip}. Estas son las más cercanas.',
    'zip.found': '{n} ubicaciones para “{q}”.',
    'zip.none': 'No hay ubicaciones para “{q}”. Prueba con un código postal, una ciudad o FL, NY, NJ.',
    'zip.invalid': 'No encontramos ese código postal. Prueba con un ZIP de 5 dígitos en FL, NY o NJ.',
    'footer.tagline': 'Handmade Happiness :)',
    'footer.rights': 'Todos los derechos reservados.',
    'lang.switch': 'English',
    'lang.switchLabel': 'View in English',
  },
} as const;
export type UiKey = keyof (typeof ui)['en'];

export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key] ?? ui[defaultLocale][key];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return (locales as readonly string[]).includes(first) ? (first as Locale) : defaultLocale;
}

/** Ruta localizada con prefijo de idioma cuando corresponde. */
export function localePath(key: RouteKey, locale: Locale): string {
  const path = routes[key][locale];
  return locale === defaultLocale ? path : `/${locale}${path === '/' ? '/' : path}`;
}

/** Devuelve la ruta equivalente en otro idioma (para el selector y hreflang). */
export function alternatePath(url: URL, target: Locale): string {
  const current = getLocaleFromUrl(url);
  const stripped = current === defaultLocale ? url.pathname : url.pathname.replace(`/${current}`, '') || '/';
  const key = (Object.keys(routes) as RouteKey[]).find((k) => routes[k][current] === stripped);
  if (key) return localePath(key, target);
  return target === defaultLocale ? stripped : `/${target}${stripped}`;
}
