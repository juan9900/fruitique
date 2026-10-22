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
 * Está medido sobre el envase que usa el escenario (`stagePack`), no sobre `pack`. En los pints nuevos la tapa termina al .183.
 * stagePack: envase que usa el escenario de sabores de la home. Existe porque el escenario necesita los cuatro sabores
 * en el mismo estilo de empaque y solo hay diseño nuevo de pint para Strawberry, Passion Fruit, Mango y Piña Colada;
 * Coconut y Guanábana siguen con el pint viejo, así que el escenario se queda entero con la serie vieja.
 * byLine: empaque del sabor dentro de una línea concreta (clave = `kind` del producto). Sin él, la tarjeta
 * "Find X as" caería al empaque genérico de la línea y mostraría otro sabor.
 */
export interface Media { pack?: ImageMetadata; packs?: ImageMetadata[]; lidCut?: number; stagePack?: ImageMetadata; cup?: ImageMetadata; byLine?: Record<string, ImageMetadata | undefined>; photos: ImageMetadata[]; texture?: ImageMetadata }

export const flavorMedia: Record<string, Media> = {
  coconut: { lidCut: .185, pack: pack('pint-coconut'), cup: pack('cup-coconut'), photos: list(photo('cups-coconut')), texture: photo('fruit-coconut') },
  'passion-fruit': { lidCut: .18, pack: pack('pint-creamy-passion-fruit'), stagePack: pack('pint-passion-fruit'), cup: pack('cup-passion-fruit'), byLine: { popsicle: pack('filled-pop-passion-fruit') }, photos: list(photo('popsicle-passion-fruit'), photo('cups-passion-fruit')), texture: photo('fruit-passion-fruit') },
  guanabana: { lidCut: .18, pack: pack('pint-guanabana'), photos: list(photo('cups-guanabana')), texture: photo('fruit-guanabana') },
  strawberry: { lidCut: .185, pack: pack('pint-creamy-strawberry'), stagePack: pack('pint-strawberry'), cup: pack('cup-strawberry'), byLine: { popsicle: pack('filled-pop-strawberry') }, photos: list(photo('popsicle-strawberry'), photo('cups-strawberry')), texture: photo('fruit-strawberry') },
  'dulce-de-leche': { pack: pack('sandwich-dulce-de-leche'), byLine: { sandwich: pack('sandwich-dulce-de-leche') }, photos: list(photo('dulce-de-leche')) },
  mango: { lidCut: .183, pack: pack('pint-creamy-mango'), cup: pack('bar-mango'), photos: [], texture: photo('fruit-mango') },
  'pina-colada': { lidCut: .183, pack: pack('pint-pina-colada'), photos: [] },
  'cookies-and-cream': { pack: pack('sandwich-cookies-cream'), photos: [] },
};
export const emptyMedia: Media = { photos: [] };
export const mediaOf = (slug: string): Media => flavorMedia[slug] ?? emptyMedia;
/** Envase del escenario de sabores de la home (cae al pack normal si el sabor no tiene uno propio). */
export const stagePackOf = (slug: string): ImageMetadata | undefined => { const m = mediaOf(slug); return m.stagePack ?? m.pack; };

export const productMedia: Record<string, Media> = {
  'square-bars': { pack: pack('squarebars-duo'), packs: list(pack('box3-trio'), pack('bar-coconut'), pack('bar-strawberry')), photos: list(photo('cups-coconut'), photo('cups-passion-fruit'), photo('cups-guanabana')) },
  pints: { pack: pack('pint-creamy-strawberry'), packs: list(pack('pint-pina-colada'), pack('pint-creamy-strawberry'), pack('pint-creamy-mango'), pack('pint-creamy-passion-fruit')), photos: [] },
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
