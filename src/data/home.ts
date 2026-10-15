/**
 * Textos y datos de la home (secciones nuevas). BORRADOR pendiente de aprobar por la clienta.
 * Las cifras (ubicaciones, cadenas, sabores) salen de los datos, no se escriben a mano.
 * Walmart no se menciona hasta que la clienta lo confirme.
 */
import { flavors } from './flavors';
import { cities, retailers, stateNames, statesOf, stores } from './locations';
import type { Locale } from '../i18n/ui';

export const home = {
  en: {
    stage: { see: 'See flavor', moreName: 'and many more.', moreDesc: 'Fourteen flavors and counting. Pick yours.', moreCta: 'See all flavors' },
    products: {
      title: 'Four ways to say yes.',
      lead: 'Same handmade happiness, a different way to enjoy it.',
      see: (name: string) => `See ${name}`,
    },
    journey: {
      title: 'From craving to your freezer.',
      lines: [
        { h: 'Discover your craving.', d: 'Natural flavors, made by hand.', link: 'story', cta: 'About us' },
        { h: 'Pick your flavor.', d: 'Fourteen to choose from. Every one has its own mood.', link: 'flavors', cta: 'See all flavors' },
        { h: 'Find it near you.', d: 'Type your ZIP or your city and we show you the closest locations.', link: 'whereToBuy', cta: 'Find locations' },
        { h: 'Make a moment of it :)', d: 'Grab it, share it or keep it all to yourself.', link: 'products', cta: 'See the products' },
      ],
    },
    where: {
      lead: 'Find Fruitique at',
      noun: 'locations.',
      states: (states: string) => `In ${states}.`,
      map: 'Map of every Fruitique location',
      more: 'and many more :)',
    },
    faq: {
      title: 'Questions, answered.',
      items: (n: number, states: string, chains: string, flavorNames: string, count: number) => [
        { q: 'Where can I buy Fruitique?', a: `Fruitique is in ${n} locations across ${states}, including ${chains}. Type your ZIP code or city in the locator and we show you the closest ones.` },
        { q: 'Which flavors are there?', a: `${count} flavors: ${flavorNames}. Each one has its own page.` },
        { q: 'How does Fruitique come?', a: 'In four formats: Popsicles, SquareBars, Pints and Ice Cream Sandwiches.' },
        { q: 'Is it handmade and natural?', a: 'That is the whole idea. Natural flavors, handmade moments and cravings you cannot say no to. Handmade Happiness :)' },
        { q: 'How do I find the closest location?', a: 'Enter your ZIP code or city, or tap “Use my location”. We highlight the closest one and show all of them on a map.' },
        { q: 'My store is not on the list. What now?', a: 'Tell us on the Contact page and we will look into it.' },
      ],
    },
  },
  es: {
    stage: { see: 'Ver sabor', moreName: 'y muchos más.', moreDesc: 'Catorce sabores y sumando. Elige el tuyo.', moreCta: 'Ver todos los sabores' },
    products: {
      title: 'Cuatro formas de decir que sí.',
      lead: 'La misma felicidad hecha a mano, de otra manera.',
      see: (name: string) => `Ver ${name}`,
    },
    journey: {
      title: 'Del antojo a tu nevera.',
      lines: [
        { h: 'Descubre tu antojo.', d: 'Sabores naturales, hechos a mano.', link: 'story', cta: 'Nuestra historia' },
        { h: 'Elige tu sabor.', d: 'Catorce para escoger. Cada uno con su propio humor.', link: 'flavors', cta: 'Ver todos los sabores' },
        { h: 'Encuéntralo cerca.', d: 'Escribe tu código postal o tu ciudad y te mostramos las ubicaciones más cercanas.', link: 'whereToBuy', cta: 'Buscar ubicaciones' },
        { h: 'Hazlo un momento :)', d: 'Llévalo, compártelo o quédatelo todo.', link: 'products', cta: 'Ver los productos' },
      ],
    },
    where: {
      lead: 'Encuentra Fruitique en',
      noun: 'ubicaciones.',
      states: (states: string) => `En ${states}.`,
      map: 'Mapa de todas las ubicaciones de Fruitique',
      more: 'y muchas más :)',
    },
    faq: {
      title: 'Preguntas, respondidas.',
      items: (n: number, states: string, chains: string, flavorNames: string, count: number) => [
        { q: '¿Dónde puedo comprar Fruitique?', a: `Fruitique está en ${n} ubicaciones en ${states}, entre ellas ${chains}. Escribe tu código postal o ciudad en el localizador y te mostramos las más cercanas.` },
        { q: '¿Qué sabores hay?', a: `${count} sabores: ${flavorNames}. Cada uno tiene su propia página.` },
        { q: '¿En qué formatos viene?', a: 'En cuatro formatos: Paletas, SquareBars, Pints y Sándwiches de Helado.' },
        { q: '¿Es artesanal y natural?', a: 'Esa es toda la idea. Sabores naturales, momentos artesanales y antojos a los que no se les dice que no. Felicidad hecha a mano :)' },
        { q: '¿Cómo encuentro la ubicación más cercana?', a: 'Escribe tu código postal o ciudad, o toca “Usar mi ubicación”. Destacamos la más cercana y te mostramos todas en un mapa.' },
        { q: 'Mi tienda no aparece en la lista. ¿Qué hago?', a: 'Cuéntanoslo en la página de Contacto y lo revisamos.' },
      ],
    },
  },
} as const;

const join = (arr: string[], locale: Locale) => {
  const and = locale === 'en' ? 'and' : 'y';
  return arr.length < 2 ? arr.join('') : `${arr.slice(0, -1).join(', ')} ${and} ${arr[arr.length - 1]}`;
};

/** Datos derivados de los JSON de ubicaciones (se recalculan solos con `npm run data`). */
export function homeFacts(locale: Locale) {
  const byCount = (st: string) => stores.filter((x) => x.state === st).length;
  const stateList = join(statesOf(stores).sort((a, b) => byCount(b) - byCount(a)).map((s) => stateNames[s]?.[locale] ?? s), locale);
  const chainNames = retailers.map((r) => r.name);
  return {
    total: stores.length,
    states: stateList,
    chainNames,
    chains: join(chainNames, locale),
    topCities: cities.slice(0, 8),
    flavorNames: join(flavors.map((f) => f[locale]), locale),
    flavorCount: flavors.length,
  };
}

/**
 * Trocitos que salen del pint en el escenario de sabores: 8 posiciones fijas (% del escenario) y la forma de cada una por sabor.
 * Las dos últimas solo se ven en escritorio. 'fruit' (uno solo por sabor, el más grande) usa la foto de fruta del sabor si existe (si no, cae a 'dot').
 */
export type BitKind = 'drop' | 'seed' | 'leaf' | 'dot' | 'ring' | 'fruit';
export const bitSlots = [
  { x: 26, y: 15, r: -18, s: 5.2 },
  { x: 50, y: 4, r: 12, s: 3.8 },
  { x: 86, y: 14, r: 24, s: 4.4 },
  { x: 94, y: 52, r: -10, s: 3.4 },
  { x: 5, y: 56, r: 16, s: 4 },
  { x: 80, y: 90, r: -22, s: 4.6 },
  { x: 20, y: 90, r: 30, s: 3.6 },
  { x: 66, y: 22, r: -30, s: 2.6 },
] as const;
export const bitKinds: Record<string, BitKind[]> = {
  strawberry: ['fruit', 'seed', 'leaf', 'drop', 'leaf', 'seed', 'dot', 'ring'],
  'passion-fruit': ['fruit', 'drop', 'seed', 'ring', 'drop', 'leaf', 'dot', 'seed'],
  guanabana: ['fruit', 'leaf', 'seed', 'ring', 'seed', 'drop', 'leaf', 'dot'],
  coconut: ['fruit', 'leaf', 'ring', 'drop', 'leaf', 'dot', 'ring', 'drop'],
};

/**
 * Colores del escenario de sabores de la home (fondo + detalle), pedidos por el dueño:
 * rojo/blanco · amarillo/morado · turquesa/blanco (guanábana) · blanco/turquesa (coco).
 */
export const stageThemes: Record<string, { bg: string; ink: string; text: string; pop: string; accent: string }> = {
  strawberry: { bg: 'var(--fq-red)', ink: 'var(--fq-white)', text: 'var(--fq-white)', pop: 'var(--fq-white)', accent: 'var(--fq-yellow)' },
  'passion-fruit': { bg: 'var(--fq-yellow)', ink: 'var(--fq-purple)', text: 'var(--fq-purple)', pop: 'var(--fq-purple)', accent: 'var(--fq-purple)' },
  // turquesa/blanco: el titular va en blanco; el texto pequeño y el botón en tinta oscura para mantener contraste AA.
  guanabana: { bg: 'var(--fq-turquoise)', ink: 'var(--fq-white)', text: 'var(--fq-ink)', pop: 'var(--fq-white)', accent: 'var(--fq-white)' },
  // blanco/turquesa: el titular va en turquesa; el texto pequeño y el botón en tinta oscura.
  coconut: { bg: 'var(--fq-white)', ink: 'var(--fq-turquoise)', text: 'var(--fq-ink)', pop: 'var(--fq-turquoise)', accent: 'var(--fq-turquoise)' },
};

/** Cierre del escenario ("and many more"): morado/blanco; el texto pequeño y el botón en blanco (AA sobre morado). */
export const stageMoreTheme = { bg: 'var(--fq-purple)', ink: 'var(--fq-white)', text: 'var(--fq-white)', pop: 'var(--fq-cream)', accent: 'var(--fq-yellow)' };
