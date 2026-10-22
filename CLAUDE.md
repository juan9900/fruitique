# Fruitique — sitio web

Sitio nuevo de Fruitique (paletas/helados artesanales, distribuidos en Florida, Nueva York y Nueva Jersey en cadenas y tiendas locales). Reemplaza un WordPress hackeado. Es una **plataforma de marca para el consumidor + localizador de puntos de venta**, no una página corporativa.

## Recorrido obligatorio
**Descubrir Fruitique → Elegir producto/sabor → Encontrar la ubicación más cercana → Ir a comprarlo.**
Toda decisión de diseño, contenido y SEO debe apoyar este recorrido.

## Regla de proceso: no optimizar todavía
No hacer ni proponer la optimización/revisión final (accesibilidad, rendimiento, Lighthouse, Netlify, publicación) hasta que el usuario diga que el contenido está listo. Estado y pendientes en `docs/ESTADO-DEL-PROYECTO.md`.

## Antes de trabajar, lee
- `docs/PLAN-SITIO.md` — objetivo, mapa del sitio, localizador, SEO, stack, fases, pendientes.
- `docs/MANUAL-DE-MARCA.md` — esencia, tono, color, tipografía, logo, fotografía, productos.
- `docs/ESTADO-DEL-PROYECTO.md` — hasta dónde vamos y qué falta.
Los PDFs originales están en `assets-marca/pdfs/` y las fuentes en `assets-marca/fonts/`.

## Reglas que no se rompen
- **Stack**: Astro estático. **Sin base de datos**; los datos viven en JSON/MD en el repo (`src/data/`).
- **Idiomas**: por ahora **solo inglés** (decisión del dueño, 2026-10-14; se hace español solo si la clienta lo pide). Las páginas ES están pausadas en `src/_paused/es/` (no se construyen) y el interruptor es `ES_ENABLED` en `src/i18n/ui.ts`. Contenido nuevo: solo EN; no hace falta escribir ES ni `hreflang`. Los textos ES que ya existen en `ui.ts`/`home.ts`/etc. se conservan por si se reactiva.
- **Terminología**: la clienta dice **"ubicaciones" (locations)**, no "puntos de venta". En el sitio: Locations/Ubicaciones y "Find Fruitique near you".
- **Navegación**: Productos | Sabores | Dónde Comprar | Nuestra Historia | **Become a Partner** | Contacto. El sexto ítem lo pidió la clienta (2026-10-21) y se queda en inglés aunque se reactive ES. El burger aparece por debajo de **62rem** (antes 84rem): entre 62rem y 84rem (iPad horizontal, portátiles) el menú completo se compacta con `clamp()` en tamaño de letra, `gap` y padding del botón, para que el CTA "Find Fruitique near you" nunca quede escondido en el burger.
- **CTA "Find Fruitique near you / Encuentra Fruitique cerca de ti"** siempre visible (header + hero + páginas de producto/sabor).
- **Colores**: solo los tokens de marca (más `--fq-coconut`, `--fq-coconut-light`, `--fq-tamarind`, `--fq-leaf` (hoy sin uso: Tamarindo salió del sitio), añadidos por el dueño para el escenario de sabores de la home; `stageThemes` en `src/data/home.ts`) (`--fq-red #ED1D24`, `--fq-yellow #FFD400`, `--fq-cream #FFEAD5`, `--fq-turquoise #27BDBE`, `--fq-purple #93288D`, `--fq-white`). No inventar colores. Verificar contraste AA.
- **Tipografías**: Como (titulares, **links del navbar y preguntas de las FAQ**, 2026-10-21), Rude Slab (acentos de sabor), Poppins (texto/UI). Licencias de Como y Rude Slab confirmadas por el usuario; cargadas como woff2 en `public/fonts/` (`@font-face` en `tokens.css`).
- **Logo**: usar siempre el archivo oficial; nunca reescribirlo con texto. Desde el 2026-10-21 está vectorizado en `public/brand/` y se usa con `src/components/Logo.astro` (`variant="onRed"` en header y footer, que son rojos). Favicon, `.ico` y `apple-touch-icon` salen del isotipo. Ver `docs/ASSETS.md`.
- **Tono**: alegre, cómplice, cercano, corto; firma ":)" — ver manual.
- **SEO**: una página por producto, sabor, retailer y ciudad; schema.org (`Organization`, `Product`, `Store/LocalBusiness`, `BreadcrumbList`, `FAQPage`); title/meta/H1 únicos; enlaces internos sabor ↔ producto ↔ tiendas cercanas.
- Imágenes optimizadas (`astro:assets`), buen rendimiento móvil, accesibilidad (alt, foco, contraste).

## PROHIBIDO: "los sellos de Claude" (regla del dueño del proyecto, siempre vigente)
El usuario llama así a los clichés visuales que delatan una web hecha con IA. **Nunca** los uses, ni en diseño, ni en componentes, ni en copy, ni en animaciones, aunque parezcan buena idea:
- **Marquesinas** / cintas de texto que corren (ni de sabores, ni de logos, ni de nada).
- **Títulos chiquitos encima de títulos grandes** (eyebrows, kickers, "overlines", etiquetas sobre el H1/H2). Un título va solo.
- **Badges / pills / chips / etiquetas** por todos lados (en tarjetas, secciones, nombres de sabor, "Nuevo", "Natural", etc.). Solo si es un dato funcional real y único, nunca decorativo.
- **Bordes laterales** de acento (`border-left`/`border-right` de color en tarjetas, citas, callouts).
- **Numeración decorativa** tipo 01, 02, 03, 04 (ni círculos con 1-2-3-4 ni "en 4 pasos"). Si algo es una secuencia, que el diseño lo comunique sin números.
Si dudas de si algo es un "sello", no lo pongas. Antes de dar una sección por terminada, revísala contra esta lista. Prefiere composición, tipografía grande, color de marca, producto/foto y movimiento con intención.

## Stack y comandos
Astro 7 (estático) + `@astrojs/sitemap` + `@fontsource/poppins`. Node ≥ 22.12.
- `npm run dev` / `npm run build` / `npm run preview`
- Idiomas: `src/i18n/ui.ts` (textos `ui`, rutas localizadas `routes`, helpers `useTranslations`, `localePath`, `alternatePath`). Páginas EN en `src/pages/`, ES en `src/pages/es/`; el contenido de las páginas va en componentes compartidos que reciben `locale`.
- Tokens de marca: `src/styles/tokens.css`; estilos globales y botones: `src/styles/global.css`.
- Layout: `src/layouts/BaseLayout.astro` (canonical, hreflang, OG); `Header`/`Footer` en `src/components/`.
- Como (400/700/800) y Rude Slab (700 normal/italic) cargadas en `public/fonts/`.
- Pendiente: foto de producto en el hero, retailers/ciudades, Nuestra Historia y Contacto (fases 3-5; esos links del menú aún dan 404).
- **Líneas de producto (2026-10-21)**: SquareBars (barra suelta 4 oz + 3 Pack de 12 oz en coco, mango y fresa; las dos presentaciones se nombran y se ven en home, `/products/` y la página del producto), Pints, Ice Cream Sandwiches y Filled Popsicles (banda **crema**, no roja: el empaque de fresa es rojo oscuro y se fundía con el fondo). Filled Popsicles va en **crema** en `/products/` y en su página, pero en la tira de tarjetas de la home va en **rojo** (pedido del dueño, 2026-10-21): una tarjeta sin color rompía el ritmo de la tira. La línea Non Dairy Popsicles salió del catálogo; `/products/popsicles/` redirige a `/products/filled-popsicles/` (`redirects` en `astro.config.mjs`). Las cajas del 3 Pack son render propio hecho desde el troquel y las paletas rellenas salen de renders con IA del dueño, no foto real: ver `docs/ASSETS.md`.
- Hecho (fase 2): `/products/`, `/flavors/` y sus detalles EN/ES (`CatalogIndex`/`CatalogDetail`, datos en `src/data/flavors.ts` y `products.ts`, con JSON-LD `Product` + `BreadcrumbList`). Textos de sabores/productos son borrador pendiente de aprobar. Los slugs difieren por idioma: las páginas pasan `alternates` a `BaseLayout` para hreflang y selector de idioma.

- **Become a Partner (2026-10-21)**: `/become-a-partner/` (`PartnerPage.astro`, textos en `src/data/pages.ts` → `partner`, contacto comercial en `salesContact`) para captar comercios en Florida: congelador en comodato sin costo, el comercio solo invierte en producto, distribución estatal, los 3 congeladores del brochure (en un escaparate donde los tres van **a escala real entre sí**: la altura de cada foto sale de sus pulgadas, `--k`, sobre fichas de color iguales y un mismo suelo), logos de clientes (`src/data/client-logos.ts`) y formulario Netlify `form-name="partner"`. La franja de enlace es `PartnerCta.astro` (texto en `src/data/home.ts` → `partnerCta`): titular grande, botón rojo y los tres congeladores **superpuestos sobre una ficha de color** y a escala real entre sí (mismo criterio `--k` que el escaparate; la ficha es turquesa sobre crema y amarilla sobre turquesa). Vive en la home (turquesa, entre `Where` y la FAQ), en el localizador y en las páginas de ciudad/cadena. Ojo: no darle la clase `.band`, que `closingBand()` solo anima la primera del documento.

## Animación (GSAP)
Todo el movimiento vive en `src/scripts/motion.ts` (GSAP + ScrollTrigger + SplitText, `gsap.matchMedia`). Secciones animadas de la home: hero (titular por líneas, paleta con rebote, parallax de puntero), escenario fijado de sabores (el fondo cambia al color de cada sabor), recorrido (tarjetas + línea que se dibuja) y banda final.
Congeladores de Become a Partner: `freezerReveal()` (hooks `data-freezers`, `data-freezer-pad`, `data-freezer-unit`, `data-freezer-copy`, `data-freezer-hero`). La ficha de color crece desde el suelo y cada congelador aterriza encima con rebote; en la franja `PartnerCta` los dos bunkers entran desde su lado y el vertical sube del centro. Va con `ScrollTrigger.batch` por tarjeta: en fila (escritorio) las tres se escalonan, en columna (móvil) cada una entra a su turno.
Reglas:
- El contenido siempre está en el HTML. Sin JS o con `prefers-reduced-motion`, la página se ve completa y estática (`html.motion-ok` lo pone un script inline solo si hay movimiento).
- Solo `transform`/`opacity`; sin scroll-jacking (pins con `scrub`); bucles decorativos finitos; todo lo que se mueva solo >5 s lleva pausa.
- Colores de animación solo de la paleta de marca. Los hooks son atributos/clases (`data-split`, `data-reveal`, `.stage`, …): al añadir una sección animada, registra su función en `motion.ts` y verifica con captura headless (desktop, móvil 390px y reduced-motion).
- Las ilustraciones (`Popsicle.astro`) son provisionales hasta tener fotos/logo oficiales.

- Hecho (fase 3): localizador en `src/components/Locator.astro` + `src/scripts/locator.ts` (carga `/data/stores.json` y `/data/zips.json`, MapLibre + OpenFreeMap (datos de OSM, estilo recoloreado con la paleta en `brandStyle`, sin API key)). Datos regenerables con `npm run data` (fuentes en `data-source/`). No tocar `public/data/*.json` a mano.
- **Nombre de la marca: "Fruitique"** (con *i*; confirmado por el usuario: es el del sitio viejo fruitiqueicecream.com). El brief decía "Frutique" por error. Nunca escribir "Frutique" como nombre en textos, schema ni UI.
- Walmart: sus 162 tiendas vienen del mapa comercial de la clienta (2026-10-14) y ya están en el localizador y en `/where-to-buy/walmart/`. **Decisión del dueño: Walmart SÍ se nombra en el sitio** (textos, enlaces, SEO, keywords "Fruitique Walmart"); no hay que consultarlo con la clienta ni filtrarlo.
- Ubicaciones: `npm run data` combina la lista del sitio viejo (`data-source/old-site-stores.json`, respaldo) con `data-source/mapa-comercial-2026.json` (mapa de la clienta, sin ventas ni contactos; las inactivas se quitan). El KML original con datos sensibles NO va al repo.
- Hecho (fase 4): `/where-to-buy/[slug]/` y `/es/donde-comprar/[slug]/` para ciudades (≥3 ubicaciones) y cadenas (≥4), `LocationPage.astro` + `src/data/locations.ts` (umbrales `MIN_CITY`/`MIN_RETAILER`). JSON-LD `ItemList` de `Store` + breadcrumbs. Origen de los datos explicado en `docs/ORIGEN-DE-UBICACIONES.md`.
- Imágenes reales (de los PDFs de marca) en `src/assets/packs` y `src/assets/photos`, mapeadas en `src/data/media.ts`; ver `docs/ASSETS.md`. Usar `<Image>` de `astro:assets`. Flavors sin imagen caen a `ProductArt` (ilustración provisional). Contacto y Nuestra Historia hechos (textos en `src/data/pages.ts`, borrador; el correo del formulario se configura en Netlify).
- Mapa: MapLibre con worker empaquetado (`?worker&url`) y `maplibre-gl` excluido de `optimizeDeps` en `astro.config.mjs`: no cambiar eso o el worker da 404/504. Tras instalar paquetes con el dev server abierto, reinícialo con `npx astro dev stop && npx astro dev --force`.
- Mapa compartido en `src/scripts/brandmap.ts` (MapLibre, worker, `brandStyle`); lo usan `locator.ts` y `homemap.ts` (mapa de la home, carga diferida). Escenario de sabores de la home: un solo timeline atado al scroll (`scrub`, decisión del dueño; excepción a la regla de pins con scrub), sin `snap` (el dueño no quiere que nada se complete solo); todos los tweens son `fromTo` con `immediateRender:false` para que ir y volver sea idéntico. La entrada del primer envase (`intro`) se completa al instante cuando empieza el pin (`introDone`) para que no vuelva a abrir las fresas después de que el scroll las cerró, y los tramos empiezan en `+0.001` para que ningún detalle se pinte en el instante 0. Se probó por tiempo (disparo al cambiar de sabor) y falló: puntos a medias con scroll rápido y/o sabores saltados.
