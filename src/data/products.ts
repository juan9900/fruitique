/** Líneas de producto — PDF 04 Brand Architecture. Textos en borrador pendientes de aprobación. Líneas, tamaños y sabores: brochure de la clienta (2026-10-14). */
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
  /** Sabores de esta línea; `label` es el nombre propio dentro de la línea (p. ej. "Creamy Mango"). */
  flavors: { slug: string; label?: string }[];
}
export const products: Product[] = [
  { slug: 'popsicles', slugEs: 'paletas', kind: 'popsicle', en: 'Popsicles', es: 'Paletas',
    bg: 'var(--fq-red)', ink: 'var(--fq-white)', pop: 'var(--fq-white)', accent: 'var(--fq-yellow)',
    descEn: 'Handmade on a stick. Natural flavors, a little bit of fruit and a lot of happiness.',
    descEs: 'Artesanales, en palito. Sabores naturales, un poco de fruta y mucha felicidad.',
    size: '2.5 oz', notesEn: 'Non-dairy, made with real fruit. Gluten-free and non-GMO.', notesEs: 'Sin lácteos, con fruta real. Sin gluten y non-GMO.',
    flavors: [{ slug: 'strawberry' }, { slug: 'mango', label: 'Sweet Mango' }] },
  { slug: 'square-bars', slugEs: 'square-bars', kind: 'squarebar', en: 'SquareBars', es: 'SquareBars',
    bg: 'var(--fq-yellow)', ink: 'var(--fq-red)', pop: 'var(--fq-red)', accent: 'var(--fq-white)',
    descEn: 'The square way to craving. Easy to share, easy to love, hard to stop at one.',
    descEs: 'La forma cuadrada del antojo. Fácil de compartir, fácil de querer, difícil parar en uno.',
    size: '4 oz', notesEn: 'Made with real fruit. Gluten-free and non-GMO. Contains milk.', notesEs: 'Con fruta real. Sin gluten y non-GMO. Contiene leche.',
    flavors: [{ slug: 'coconut' }, { slug: 'strawberry' }, { slug: 'passion-fruit' }, { slug: 'mango' }, { slug: 'dulce-de-leche' }, { slug: 'mamey' }, { slug: 'guanabana' }, { slug: 'vanilla' }, { slug: 'chocolate' }, { slug: 'rum-raisin' }, { slug: 'cheese-guava' }] },
  { slug: 'pints', slugEs: 'pints', kind: 'pint', en: 'Pints', es: 'Pints',
    bg: 'var(--fq-turquoise)', ink: 'var(--fq-ink)', pop: 'var(--fq-red)', accent: 'var(--fq-white)',
    descEn: 'Artisan ice cream for staying in. Made with real cream, a spoon and a good show.',
    descEs: 'Helado artesanal para quedarse en casa. Con crema de verdad, cuchara y una buena serie.',
    size: '14 oz', notesEn: 'Made with real cream. Non-GMO. Contains milk.', notesEs: 'Con crema de verdad. Non-GMO. Contiene leche.',
    flavors: [{ slug: 'pina-colada' }, { slug: 'rum-raisin' }, { slug: 'tres-leches' }, { slug: 'passion-fruit' }, { slug: 'strawberry', label: 'Creamy Strawberry' }, { slug: 'mango', label: 'Creamy Mango' }] },
  { slug: 'ice-cream-sandwiches', slugEs: 'sandwiches-de-helado', kind: 'sandwich', en: 'Ice Cream Sandwiches', es: 'Sándwiches de Helado', short: { en: 'Sandwiches', es: 'Sándwiches' },
    bg: 'var(--fq-purple)', ink: 'var(--fq-white)', pop: 'var(--fq-cream)', accent: 'var(--fq-yellow)',
    descEn: 'Chocolate cookie on the outside, creamy on the inside. Mini size, maxi craving.',
    descEs: 'Galleta de chocolate por fuera, cremoso por dentro. Tamaño mini, antojo maxi.',
    size: '2.5 oz', notesEn: 'Non-GMO. Contains milk.', notesEs: 'Non-GMO. Contiene leche.',
    flavors: [{ slug: 'cookies-and-cream' }, { slug: 'dulce-de-leche' }] },
];
/** Líneas en las que existe un sabor (para enlazar sabor ↔ producto). */
export const linesOfFlavor = (flavorSlug: string) =>
  products.flatMap((p) => { const f = p.flavors.find((x) => x.slug === flavorSlug); return f ? [{ product: p, label: f.label }] : []; });
export const productSlug = (p: Product, locale: 'en' | 'es') => (locale === 'es' ? p.slugEs : p.slug);
