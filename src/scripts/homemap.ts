/**
 * Mapa real de la home (opción "Dónde estamos"): MapLibre + estilo de marca con todas las ubicaciones.
 * Se carga solo cuando la sección está cerca de la pantalla (MapLibre pesa) y reutiliza /data/stores.json del localizador.
 * Al señalar o enfocar una cadena de la lista se resaltan sus ubicaciones y el resto se atenúa.
 */
interface Store { retailer: string | null; lat: number; lng: number }
const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

document.querySelectorAll<HTMLElement>('[data-where="1"]').forEach((root) => {
  const el = root.querySelector<HTMLElement>('[data-homemap]');
  if (!el) return;
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    start(root, el);
  }, { rootMargin: '500px' });
  io.observe(el);
});

async function start(root: HTMLElement, el: HTMLElement) {
  const [{ maplibregl, brandStyle, rasterFallback, STYLE_URL, RED, PURPLE }, stores] = await Promise.all([
    import('./brandmap'),
    fetch('/data/stores.json').then((r) => r.json() as Promise<Store[]>),
  ]);
  const pts = stores.filter((s) => s.lat && s.lng);
  const chains = new Set(Array.from(root.querySelectorAll<HTMLElement>('[data-map-chains] a')).map((a) => a.dataset.chain!));
  const data = {
    type: 'FeatureCollection' as const,
    features: pts.map((s) => {
      const slug = s.retailer ? slugify(s.retailer) : '';
      return { type: 'Feature' as const, properties: { chain: chains.has(slug) ? slug : '' }, geometry: { type: 'Point' as const, coordinates: [s.lng, s.lat] } };
    }),
  };
  const bounds = pts.reduce((b, s) => b.extend([s.lng, s.lat] as [number, number]), new maplibregl.LngLatBounds([pts[0].lng, pts[0].lat], [pts[0].lng, pts[0].lat]));

  const map = new maplibregl.Map({
    container: el,
    style: rasterFallback as any,
    bounds,
    fitBoundsOptions: { padding: { top: 80, bottom: 80, left: 60, right: 60 } },
    cooperativeGestures: true,
    attributionControl: false, // la atribución va como texto debajo del mapa (el recorte inclinado la taparía)
  });
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-left');

  const addLayer = () => {
    if (map.getSource('stores')) return;
    map.addSource('stores', { type: 'geojson', data });
    map.addLayer({
      id: 'stores-dots', type: 'circle', source: 'stores',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 4, 8, 7, 12, 10],
        'circle-color': PURPLE, 'circle-opacity': 0.85,
        'circle-stroke-color': '#ffffff', 'circle-stroke-width': 0.8,
        'circle-opacity-transition': { duration: 300 }, 'circle-radius-transition': { duration: 300 },
      },
    });
  };
  const highlight = (slug: string | null) => {
    if (!map.getLayer('stores-dots')) return;
    const is = ['==', ['get', 'chain'], slug ?? ''];
    map.setPaintProperty('stores-dots', 'circle-color', slug ? ['case', is, RED, PURPLE] : PURPLE);
    map.setPaintProperty('stores-dots', 'circle-opacity', slug ? ['case', is, 1, 0.12] : 0.85);
    map.setPaintProperty('stores-dots', 'circle-radius', slug
      ? ['interpolate', ['linear'], ['zoom'], 4, ['case', is, 7, 3], 8, ['case', is, 10, 5], 12, ['case', is, 13, 7]]
      : ['interpolate', ['linear'], ['zoom'], 4, 4, 8, 7, 12, 10]);
  };

  map.once('load', async () => {
    try {
      const style = brandStyle(await fetch(STYLE_URL).then((r) => r.json()));
      map.setStyle(style, { diff: false });
      map.once('styledata', addLayer);
    } catch {
      addLayer(); // se queda con el mapa raster de OpenStreetMap
    }
  });

  root.querySelectorAll<HTMLElement>('[data-map-chains] a').forEach((a) => {
    const slug = a.dataset.chain!;
    a.addEventListener('pointerenter', () => highlight(slug));
    a.addEventListener('focus', () => highlight(slug));
    a.addEventListener('pointerleave', () => highlight(null));
    a.addEventListener('blur', () => highlight(null));
  });
}
