/**
 * Líneas de producto — PDF 04 Brand Architecture. Textos en borrador pendientes de aprobación.
 * Líneas, tamaños y sabores: brochure de la clienta (2026-10-14) y empaques nuevos (2026-10-21):
 * entra el 3 Pack de SquareBars y la línea Filled Popsicles; sale la de paletas non-dairy.
 */
export interface Product {
  slug: string;
  slugEs: string;
  kind: 'popsicle' | 'squarebar' | 'pint' | 'sandwich';
  en: string;
  es: string;
  /** Nombre corto para botones (cuando el nombre es largo). */
  short?: { en: string; es: string };
  bg: string; ink: string; pop: string; accent: string;
  descEn: string;
  descEs: string;
  /** Tamaño de la porción (brochure 2026-10-14). */
  size: string;
  /** Datos funcionales de la línea (brochure); sin adornos. */
  notesEn: string;
  notesEs: string;
  /** Formato adicional real de la línea (p. ej. la caja de 3). Dato funcional, no decorativo. */
  packNoteEn?: string;
  packNoteEs?: string;
  /** Sabores de esta línea; `label` es el nombre propio dentro de la línea (p. ej. "Creamy Mango"). */
  flavors: { slug: string; label?: string }[];
}
export const products: Product[] = [
  { slug: 'square-bars', slugEs: 'square-bars', kind: 'squarebar', en: 'SquareBars', es: 'SquareBars',
    bg: 'var(--fq-yellow)', ink: 'var(--fq-red)', pop: 'var(--fq-red)', accent: 'var(--fq-white)',
    descEn: 'The square way to craving. Grab a single bar, or take the 3-pack home. Easy to share, hard to stop at one.',
    descEs: 'La forma cuadrada del antojo. Llévate una barra suelta o la caja de 3. Fácil de compartir, difícil parar en una.',
    size: '4 oz', notesEn: 'Made with real fruit. Gluten-free and non-GMO. Contains milk.', notesEs: 'Con fruta real. Sin gluten y non-GMO. Contiene leche.',
    packNoteEn: 'Two ways: single bar, 4 oz, or the 3-pack box, 12 oz, in Coconut, Mango and Strawberry.', packNoteEs: 'Dos presentaciones: barra suelta de 4 oz o caja de 3 de 12 oz, en Coco, Mango y Fresa.',
    flavors: [{ slug: 'coconut' }, { slug: 'strawberry' }, { slug: 'passion-fruit' }, { slug: 'mango' }, { slug: 'dulce-de-leche' }, { slug: 'mamey' }, { slug: 'guanabana' }, { slug: 'vanilla' }, { slug: 'chocolate' }, { slug: 'rum-raisin' }, { slug: 'cheese-guava' }] },
  { slug: 'pints', slugEs: 'pints', kind: 'pint', en: 'Pints', es: 'Pints',
    bg: 'var(--fq-turquoise)', ink: 'var(--fq-ink)', pop: 'var(--fq-red)', accent: 'var(--fq-white)',
    descEn: 'Artisan ice cream for staying in. Made with real cream, a spoon and a good show.',
    descEs: 'Helado artesanal para quedarse en casa. Con crema de verdad, cuchara y una buena serie.',
    size: '14 oz', notesEn: 'Made with real cream. Non-GMO. Contains milk.', notesEs: 'Con crema de verdad. Non-GMO. Contiene leche.',
    flavors: [{ slug: 'pina-colada', label: 'Piña Colada Paradise' }, { slug: 'rum-raisin' }, { slug: 'tres-leches' }, { slug: 'passion-fruit', label: 'Creamy Passion Fruit' }, { slug: 'strawberry', label: 'Creamy Strawberry' }, { slug: 'mango', label: 'Creamy Mango' }] },
  { slug: 'ice-cream-sandwiches', slugEs: 'sandwiches-de-helado', kind: 'sandwich', en: 'Ice Cream Sandwiches', es: 'Sándwiches de Helado', short: { en: 'Sandwiches', es: 'Sándwiches' },
    bg: 'var(--fq-purple)', ink: 'var(--fq-white)', pop: 'var(--fq-cream)', accent: 'var(--fq-yellow)',
    descEn: 'Chocolate cookie on the outside, creamy on the inside. Mini size, maxi craving.',
    descEs: 'Galleta de chocolate por fuera, cremoso por dentro. Tamaño mini, antojo maxi.',
    size: '2.5 oz', notesEn: 'Non-GMO. Contains milk.', notesEs: 'Non-GMO. Contiene leche.',
    flavors: [{ slug: 'cookies-and-cream' }, { slug: 'dulce-de-leche' }] },
  { slug: 'filled-popsicles', slugEs: 'paletas-rellenas', kind: 'popsicle', en: 'Filled Popsicles', es: 'Paletas Rellenas', short: { en: 'Filled Pops', es: 'Rellenas' },
    // crema con tinta oscura: el rojo sobre crema da 3,74:1 y no pasa AA en texto normal
    bg: 'var(--fq-cream)', ink: 'var(--fq-ink)', pop: 'var(--fq-red)', accent: 'var(--fq-red)',
    descEn: 'Real fruit on the outside, condensed milk running through the middle. The surprise is the best part.',
    descEs: 'Fruta de verdad por fuera y leche condensada corriendo por el centro. La sorpresa es lo mejor.',
    size: '3 oz', notesEn: 'Filled with condensed milk. Made with real fruit. Contains milk.', notesEs: 'Rellenas de leche condensada. Con fruta real. Contiene leche.',
    flavors: [{ slug: 'strawberry' }, { slug: 'passion-fruit' }] },
];
/** Líneas en las que existe un sabor (para enlazar sabor ↔ producto). */
export const linesOfFlavor = (flavorSlug: string) =>
  products.flatMap((p) => { const f = p.flavors.find((x) => x.slug === flavorSlug); return f ? [{ product: p, label: f.label }] : []; });
export const productSlug = (p: Product, locale: 'en' | 'es') => (locale === 'es' ? p.slugEs : p.slug);
