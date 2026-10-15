/**
 * Imágenes de producto y fotografía extraídas de los PDFs de marca (02/03/04) — ver docs/ASSETS.md.
 * Pendiente confirmar: derechos de uso de las fotos con personas/fruta (pueden ser de banco de imágenes) y que cada empaque siga vigente.
 */
import type { ImageMetadata } from 'astro';

const packs = import.meta.glob<{ default: ImageMetadata }>('../assets/packs/*.webp', { eager: true });
const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.webp', { eager: true });
const pack = (n: string) => packs[`../assets/packs/${n}.webp`]?.default;
const photo = (n: string) => photos[`../assets/photos/${n}.webp`]?.default;
const list = (...xs: (ImageMetadata | undefined)[]) => xs.filter(Boolean) as ImageMetadata[];

/** lidCut: fracción de la altura del pint (0-1) donde termina la tapa; sirve para separarla del cuerpo en el escenario de la home. */
export interface Media { pack?: ImageMetadata; packs?: ImageMetadata[]; lidCut?: number; cup?: ImageMetadata; photos: ImageMetadata[]; texture?: ImageMetadata }

export const flavorMedia: Record<string, Media> = {
  coconut: { lidCut: .185, pack: pack('pint-coconut'), cup: pack('cup-coconut'), photos: list(photo('cups-coconut')), texture: photo('fruit-coconut') },
  'passion-fruit': { lidCut: .18, pack: pack('pint-passion-fruit'), cup: pack('cup-passion-fruit'), photos: list(photo('popsicle-passion-fruit'), photo('cups-passion-fruit')), texture: photo('fruit-passion-fruit') },
  guanabana: { lidCut: .18, pack: pack('pint-guanabana'), photos: list(photo('cups-guanabana')), texture: photo('fruit-guanabana') },
  strawberry: { lidCut: .185, pack: pack('pint-strawberry'), cup: pack('cup-strawberry'), photos: list(photo('popsicle-strawberry'), photo('cups-strawberry')), texture: photo('fruit-strawberry') },
  'dulce-de-leche': { pack: pack('sandwich-dulce-de-leche'), photos: list(photo('dulce-de-leche')) },
  mango: { pack: pack('popsicle-nd-sweet-mango'), photos: [], texture: photo('fruit-mango') },
  'pina-colada': { pack: pack('pint-pina-colada'), photos: [] },
  'cookies-and-cream': { pack: pack('sandwich-cookies-cream'), photos: [] },
};
export const emptyMedia: Media = { photos: [] };
export const mediaOf = (slug: string): Media => flavorMedia[slug] ?? emptyMedia;

export const productMedia: Record<string, Media> = {
  popsicles: { pack: pack('box-popsicles-strawberry'), packs: list(pack('box-popsicles-strawberry'), pack('popsicle-nd-strawberry'), pack('popsicle-nd-sweet-mango')), photos: list(photo('popsicle-strawberry'), photo('popsicle-passion-fruit')) },
  'square-bars': { pack: pack('cups-trio'), packs: list(pack('cups-trio'), pack('bar-strawberry')), photos: list(photo('cups-coconut'), photo('cups-passion-fruit'), photo('cups-guanabana')) },
  pints: { pack: pack('pint-strawberry'), packs: list(pack('pint-pina-colada'), pack('pint-strawberry-lineup'), pack('pint-creamy-mango'), pack('pint-creamy-passion-fruit')), photos: [] },
  'ice-cream-sandwiches': { pack: pack('sandwich-cookies-cream'), packs: list(pack('sandwich-cookies-cream'), pack('sandwich-dulce-de-leche')), photos: [] },
};

export const lifestyle = {
  family: photo('life-family-beach')!,
  couple: photo('life-couple-street')!,
  table: photo('life-family-table')!,
  model: photo('life-model-yellow')!,
};
export const heroPacks = [pack('pint-passion-fruit')!, pack('pint-strawberry')!, pack('pint-guanabana')!];

/** Fotos del recorrido de la home (descubre → elige → encuentra → disfruta). */
export const journeyPhotos = [lifestyle.model, photo('cups-passion-fruit')!, lifestyle.couple, lifestyle.family];
