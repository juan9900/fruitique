/**
 * Imágenes de producto y fotografía.
 * Origen: PDFs de marca (02/03/04), brochure 2026-10-14 y los empaques nuevos de 2026-10-21 — ver docs/ASSETS.md.
 * Pendiente confirmar: derechos de uso de las fotos con personas/fruta (pueden ser de banco de imágenes) y que cada empaque siga vigente.
 */
import type { ImageMetadata } from 'astro';

const packs = import.meta.glob<{ default: ImageMetadata }>('../assets/packs/*.webp', { eager: true });
const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.webp', { eager: true });
const pack = (n: string) => packs[`../assets/packs/${n}.webp`]?.default;
const photo = (n: string) => photos[`../assets/photos/${n}.webp`]?.default;
const list = (...xs: (ImageMetadata | undefined)[]) => xs.filter(Boolean) as ImageMetadata[];

/**
 * lidCut: fracción de la altura del pint (0-1) donde termina la tapa; sirve para separarla del cuerpo en el escenario de la home.
 * Está medido sobre el envase que usa el escenario (`stagePack`), no sobre `pack`. La junta real entre el faldón de la tapa (más
 * ancho) y el cuerpo (más estrecho) es la primera fila del cuerpo partida por el alto de la imagen — .1824 fresa y maracuyá,
 * .1822 mango, .1809 tres leches, .1844 coco, medidas sobre la silueta (canal alfa). Por encima de esa junta, al abrirse la tapa
 * asoman dos "orejas" a los lados del envase; por debajo, la tapa se lleva pegado un escalón de cuerpo.
 * Se probó bajarlo 6 px (2026-10-22) y se descartó: la tapa se llevaba pegada una tira del envase que se veía en las dos puntas.
 * El corte va exactamente en la junta.
 * stagePack: envase que usa el escenario de sabores de la home. Desde el 2026-10-22 el escenario va con los pints nuevos
 * (Strawberry, Passion Fruit, Tres Leches y Mango) y solo Coconut sigue con la foto vieja, por pedido del dueño: como esa
 * viene con fondo blanco en vez de transparente, el escenario usa su recorte `pint-coconut-stage`.
 * byLine: empaque del sabor dentro de una línea concreta (clave = `kind` del producto). Sin él, la tarjeta
 * "Find X as" caería al empaque genérico de la línea y mostraría otro sabor.
 */
export interface Media { pack?: ImageMetadata; packs?: ImageMetadata[]; lidCut?: number; stagePack?: ImageMetadata; cup?: ImageMetadata; byLine?: Record<string, ImageMetadata | undefined>; photos: ImageMetadata[]; texture?: ImageMetadata }

export const flavorMedia: Record<string, Media> = {
  coconut: { lidCut: .1844, pack: pack('pint-coconut'), stagePack: pack('pint-coconut-stage'), cup: pack('cup-coconut'), photos: list(photo('cups-coconut')), texture: photo('fruit-coconut') },
  'passion-fruit': { lidCut: .1824, pack: pack('pint-creamy-passion-fruit'), cup: pack('cup-passion-fruit'), byLine: { popsicle: pack('filled-pop-passion-fruit') }, photos: list(photo('popsicle-passion-fruit'), photo('cups-passion-fruit')), texture: photo('fruit-passion-fruit') },
  guanabana: { lidCut: .18, pack: pack('pint-guanabana'), photos: list(photo('cups-guanabana')), texture: photo('fruit-guanabana') },
  strawberry: { lidCut: .1824, pack: pack('pint-creamy-strawberry'), cup: pack('cup-strawberry'), byLine: { popsicle: pack('filled-pop-strawberry') }, photos: list(photo('popsicle-strawberry'), photo('cups-strawberry')), texture: photo('fruit-strawberry') },
  'dulce-de-leche': { pack: pack('sandwich-dulce-de-leche'), byLine: { sandwich: pack('sandwich-dulce-de-leche') }, photos: list(photo('dulce-de-leche')) },
  'tres-leches': { lidCut: .1809, pack: pack('pint-tres-leches'), photos: [] },
  mango: { lidCut: .1822, pack: pack('pint-creamy-mango'), cup: pack('bar-mango'), photos: [], texture: photo('fruit-mango') },
  'pina-colada': { lidCut: .183, pack: pack('pint-pina-colada'), photos: [] },
  'cookies-and-cream': { pack: pack('sandwich-cookies-cream'), photos: [] },
};
export const emptyMedia: Media = { photos: [] };
export const mediaOf = (slug: string): Media => flavorMedia[slug] ?? emptyMedia;
/** Envase del escenario de sabores de la home (cae al pack normal si el sabor no tiene uno propio). */
export const stagePackOf = (slug: string): ImageMetadata | undefined => { const m = mediaOf(slug); return m.stagePack ?? m.pack; };

export const productMedia: Record<string, Media> = {
  'square-bars': { pack: pack('squarebars-duo'), packs: list(pack('box3-trio'), pack('bar-coconut'), pack('bar-strawberry')), photos: list(photo('cups-coconut'), photo('cups-passion-fruit'), photo('cups-guanabana')) },
  pints: { pack: pack('pint-creamy-strawberry'), packs: list(pack('pint-pina-colada'), pack('pint-creamy-strawberry'), pack('pint-creamy-mango'), pack('pint-creamy-passion-fruit'), pack('pint-tres-leches')), photos: [] },
  'ice-cream-sandwiches': { pack: pack('sandwich-cookies-cream'), packs: list(pack('sandwich-cookies-cream'), pack('sandwich-dulce-de-leche')), photos: [] },
  'filled-popsicles': { pack: pack('filled-pop-strawberry'), packs: list(pack('filled-pop-strawberry'), pack('filled-pop-passion-fruit')), photos: list(photo('popsicle-strawberry'), photo('popsicle-passion-fruit')) },
};

export const lifestyle = {
  family: photo('life-family-beach')!,
  couple: photo('life-couple-street')!,
  table: photo('life-family-table')!,
  model: photo('life-model-yellow')!,
};
/** Hero de la home: tres pints en abanico (el del medio va al centro) y dos square bars sueltos delante. */
export const heroPacks = [pack('pint-pina-colada')!, pack('pint-creamy-strawberry')!, pack('pint-creamy-mango')!];
export const heroBars = [pack('bar-strawberry')!, pack('bar-mango')!];

/** Fotos del recorrido de la home (descubre → elige → encuentra → disfruta). */
export const journeyPhotos = [lifestyle.model, photo('cups-passion-fruit')!, photo('popsicle-strawberry')!, photo('cups-coconut')!];

/** Congeladores en comodato. Fotos extraídas del brochure de la clienta (provisionales, ver docs/ASSETS.md). */
export const freezers = [photo('freezer-upright')!, photo('freezer-bunker-3')!, photo('freezer-bunker-2')!];
