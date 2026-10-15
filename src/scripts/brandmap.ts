/**
 * Mapa de marca compartido (localizador y home): MapLibre + OpenFreeMap (datos de OpenStreetMap, sin API key) con el estilo recoloreado con la paleta.
 * No cambiar la forma de cargar el worker (?worker&url) ni sacar maplibre-gl de optimizeDeps.exclude en astro.config.mjs.
 */
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// Vite empaqueta el worker de MapLibre (con sus dependencias) y nos da su URL final.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

maplibregl.setWorkerUrl(workerUrl);
export { maplibregl };

export const css = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
export const RED = css('--fq-ui'), YELLOW = css('--fq-yellow'), PURPLE = css('--fq-purple');

export const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';
const INK = css('--fq-ink'), CREAM = css('--fq-cream'), TURQ = css('--fq-turquoise');

/** Recolorea el estilo "positron" con la paleta de marca. Solo cambia colores, no la geometría. */
export function brandStyle(style: any) {
  const paint = (l: any, p: Record<string, unknown>) => { l.paint = { ...(l.paint ?? {}), ...p }; };
  for (const l of style.layers) {
    const id: string = l.id;
    if (id === 'background') paint(l, { 'background-color': CREAM });
    else if (id === 'park' || id === 'landcover_wood') paint(l, { 'fill-color': TURQ, 'fill-opacity': 0.2 });
    else if (id === 'water') paint(l, { 'fill-color': TURQ });
    else if (id === 'waterway') paint(l, { 'line-color': TURQ });
    else if (id === 'landuse_residential') paint(l, { 'fill-color': '#ffffff', 'fill-opacity': 0.35 });
    else if (id === 'building') paint(l, { 'fill-color': RED, 'fill-opacity': 0.09, 'fill-outline-color': 'rgba(0,0,0,0)' });
    else if (/^highway_motorway_inner|motorway_bridge_inner|tunnel_motorway_inner/.test(id)) paint(l, { 'line-color': YELLOW });
    else if (id === 'highway_major_inner') paint(l, { 'line-color': '#ffffff' });
    else if (/casing/.test(id)) paint(l, { 'line-color': '#ffffff' });
    else if (/^highway_(minor|path)$/.test(id)) paint(l, { 'line-color': '#ffffff' });
    else if (/subtle/.test(id)) paint(l, { 'line-color': '#ffffff', 'line-opacity': 0.6 });
    else if (/^railway/.test(id)) paint(l, { 'line-color': PURPLE, 'line-opacity': 0.25 });
    else if (/^boundary/.test(id)) paint(l, { 'line-color': PURPLE, 'line-opacity': 0.5 });
    else if (/^water_name|waterway_line_label/.test(id)) paint(l, { 'text-color': '#ffffff', 'text-halo-color': TURQ });
    else if (id === 'label_state') paint(l, { 'text-color': RED, 'text-halo-color': CREAM });
    else if (l.type === 'symbol' && l.paint && 'text-color' in l.paint) paint(l, { 'text-color': INK, 'text-halo-color': CREAM });
  }
  return style;
}

export const rasterFallback = {
  version: 8 as const,
  sources: { osm: { type: 'raster' as const, tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: '© OpenStreetMap' } },
  layers: [{ id: 'osm', type: 'raster' as const, source: 'osm' }],
};

