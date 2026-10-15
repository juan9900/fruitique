/**
 * Sabores — docs/PLAN-SITIO.md §4.
 * Textos en borrador (tono de marca) pendientes de aprobación de la clienta.
 * Qué sabor existe en qué línea sale del brochure de la clienta (2026-10-14) y vive en `products.ts` (`flavors` de cada línea).
 * Lista = sabores del brochure (Tamarindo y Blackberry se quitaron el 2026-10-14 por decisión del dueño: no están en el brochure).
 * Colores: solo paleta de marca.
 */
type Theme = { bg: string; ink: string; pop: string; accent: string };
const red: Theme = { bg: 'var(--fq-red)', ink: 'var(--fq-white)', pop: 'var(--fq-white)', accent: 'var(--fq-yellow)' };
const yellow: Theme = { bg: 'var(--fq-yellow)', ink: 'var(--fq-red)', pop: 'var(--fq-white)', accent: 'var(--fq-red)' };
const turquoise: Theme = { bg: 'var(--fq-turquoise)', ink: 'var(--fq-ink)', pop: 'var(--fq-white)', accent: 'var(--fq-yellow)' };
const purple: Theme = { bg: 'var(--fq-purple)', ink: 'var(--fq-white)', pop: 'var(--fq-cream)', accent: 'var(--fq-yellow)' };
const cream: Theme = { bg: 'var(--fq-cream)', ink: 'var(--fq-red)', pop: 'var(--fq-white)', accent: 'var(--fq-red)' };

export interface Flavor extends Theme {
  slug: string;
  slugEs: string;
  en: string;
  es: string;
  descEn: string;
  descEs: string;
}

export const flavors: Flavor[] = [
  { slug: 'coconut', slugEs: 'coco', en: 'Coconut', es: 'Coco', ...turquoise,
    descEn: 'Creamy, tropical and impossible to share. Pure coconut, the way you remember it.',
    descEs: 'Cremoso, tropical y difícil de compartir. Coco de verdad, como lo recuerdas.' },
  { slug: 'passion-fruit', slugEs: 'maracuya', en: 'Passion Fruit', es: 'Maracuyá', ...yellow,
    descEn: 'Bright, bold and full of tropical attitude. One bite wakes everything up.',
    descEs: 'Brillante, intenso y con actitud tropical. Un bocado y todo despierta.' },
  { slug: 'cheese-guava', slugEs: 'queso-y-guayaba', en: 'Guava & Cheese', es: 'Queso y Guayaba', ...red,
    descEn: 'The classic pair, now frozen. Sweet guava, a little cheesy, a lot of love.',
    descEs: 'La pareja de siempre, ahora helada. Guayaba dulce, un toque de queso y mucho cariño.' },
  { slug: 'guanabana', slugEs: 'guanabana', en: 'Soursop', es: 'Guanábana', ...turquoise,
    descEn: 'Soft, fragrant and ultra smooth. A tropical treat you will crave again.',
    descEs: 'Suave, aromática y ultra cremosa. Un antojo tropical al que vas a volver.' },
  { slug: 'mamey', slugEs: 'mamey', en: 'Mamey', es: 'Mamey', ...red,
    descEn: 'Rich, velvety and warm. A tropical favorite that feels like a hug.',
    descEs: 'Intenso, aterciopelado y cálido. Un favorito tropical que se siente como un abrazo.' },
  { slug: 'strawberry', slugEs: 'fresa', en: 'Strawberry', es: 'Fresa', ...red,
    descEn: 'Ripe, juicy and a little imperfect, just like the good stuff.',
    descEs: 'Madura, jugosa y un poco imperfecta, como lo bueno de verdad.' },
  { slug: 'dulce-de-leche', slugEs: 'dulce-de-leche', en: 'Dulce de Leche', es: 'Dulce de Leche', ...yellow,
    descEn: 'Golden, creamy and made for reward moments in the middle of the day.',
    descEs: 'Dorado, cremoso y hecho para esas recompensas a mitad del día.' },
  { slug: 'mango', slugEs: 'mango', en: 'Mango', es: 'Mango', ...yellow,
    descEn: 'Sun in a stick. Sweet, juicy and impossible to eat without smiling.',
    descEs: 'Sol en un palito. Dulce, jugoso e imposible de comer sin sonreír.' },
  { slug: 'chocolate', slugEs: 'chocolate', en: 'Chocolate', es: 'Chocolate', ...purple,
    descEn: 'Deep, smooth and made for the moments you do not want to share.',
    descEs: 'Profundo, suave y hecho para los momentos que no quieres compartir.' },
  { slug: 'vanilla', slugEs: 'vainilla', en: 'Vanilla', es: 'Vainilla', ...cream,
    descEn: 'Simple done right. Soft, creamy and perfect on its own or with anything.',
    descEs: 'Lo simple, bien hecho. Suave, cremosa y perfecta sola o con lo que quieras.' },
  { slug: 'pina-colada', slugEs: 'pina-colada', en: 'Piña Colada', es: 'Piña Colada', ...yellow,
    descEn: 'Pineapple, coconut and a beach in every spoonful. Paradise, no passport needed.',
    descEs: 'Piña, coco y una playa en cada cucharada. El paraíso, sin pasaporte.' },
  { slug: 'rum-raisin', slugEs: 'ron-y-pasas', en: 'Rum Raisin', es: 'Ron y Pasas', ...purple,
    descEn: 'Plump raisins, a whisper of rum and a creamy base. A grown-up classic with a wink.',
    descEs: 'Pasas jugosas, un susurro de ron y una base cremosa. Un clásico de grandes, con guiño.' },
  { slug: 'tres-leches', slugEs: 'tres-leches', en: 'Tres Leches', es: 'Tres Leches', ...cream,
    descEn: 'The cake everyone fights over, turned into ice cream. Milky, soft and very sweet.',
    descEs: 'El pastel por el que todos pelean, hecho helado. Lechoso, suave y muy dulce.' },
  { slug: 'cookies-and-cream', slugEs: 'galleta-y-crema', en: 'Cookies & Cream', es: 'Galleta y Crema', ...red,
    descEn: 'Chocolate cookie, creamy middle, one happy bite. Mini size, maxi craving.',
    descEs: 'Galleta de chocolate, centro cremoso y un bocado feliz. Tamaño mini, antojo maxi.' },
];

export const flavorSlug = (f: Flavor, locale: 'en' | 'es') => (locale === 'es' ? f.slugEs : f.slug);

const featuredSlugs = ['strawberry', 'passion-fruit', 'guanabana', 'coconut'];
export const featured = featuredSlugs.map((s) => flavors.find((f) => f.slug === s)!);
