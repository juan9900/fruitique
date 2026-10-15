# Estado del proyecto Fruitique

*Última actualización: 2026-10-14 (Home lista por parte del dueño; se añade el control de aprobación por página).*

## Regla de trabajo (importante)
**No se hace la optimización ni la revisión final** (accesibilidad, rendimiento, Lighthouse, pruebas en dispositivos, preparación y publicación en Netlify) **hasta que el usuario diga explícitamente que el contenido está listo.** Aún falta mucho contenido. Mientras tanto, solo se avanza en contenido, estructura y funciones. No proponer esa fase por iniciativa propia.

## Resumen
**Idioma (2026-10-14):** el sitio sale solo en inglés. Las páginas en español están pausadas en `src/_paused/es/` y el selector de idioma está oculto (`ES_ENABLED = false` en `src/i18n/ui.ts`); se reactivan solo si la clienta lo pide. Hoy se construyen 115 páginas, todas en inglés.

Sitio nuevo de **Fruitique** (el nombre lleva *i*) para reemplazar el WordPress hackeado de la clienta (fruitiqueicecream.com, caído). Astro estático, sin base de datos, en inglés (`/`) y español (`/es/`), con muchas animaciones GSAP. Función principal: encontrar la ubicación más cercana por ZIP o ciudad.

Los detalles viven en `CLAUDE.md` (reglas), `PLAN-SITIO.md`, `MANUAL-DE-MARCA.md`, `INFO-COMERCIAL.md` (brochure y mapa comercial, 2026-10-14), `ASSETS.md` y `ORIGEN-DE-UBICACIONES.md`.

## Hecho
- **Documentación**: plan general, manual de marca (de los 3 PDFs), `CLAUDE.md` con reglas, y el documento sencillo para la clienta sobre el origen de la lista de ubicaciones.
- **Base técnica**: Astro 7, doble idioma con rutas traducidas, `hreflang`, canonical, sitemap, datos estructurados (Organization, Product, BreadcrumbList, ItemList de Store), colores y tipografías de marca, header y footer.
- **Home** (lista del lado del dueño, 2026-10-14; falta aprobación de la clienta): hero con empaques reales y buscador por ZIP; escenario fijado de 5 sabores donde el pint gira, se abre y suelta fruta y el fondo cambia de color; tres líneas de producto; recorrido en frases grandes; cifra de ubicaciones, cadenas y ciudades (calculadas de los datos); preguntas frecuentes con `FAQPage`; banda final. Textos en `src/data/home.ts` (borrador). Animaciones GSAP con versión estática para quien prefiere menos movimiento.
- **Productos y sabores** (actualizado con el brochure, 2026-10-14): `/products/` rediseñada con una banda por línea (producto grande, sabores enlazados, "Find Fruitique near you"); 4 líneas y 16 sabores, cada sabor enlazado a las líneas donde existe. Home con las 4 líneas. Páginas de detalle para cada una (120 páginas en total). Usan los empaques y fotos reales de los PDFs; los sabores sin imagen usan una ilustración provisional.
- **Localizador de ubicaciones** (`/where-to-buy/`, `/es/donde-comprar/`): 1.333 ubicaciones = lista del sitio viejo (865) combinada con el mapa comercial 2026 de la clienta (+478 nuevas, incluye 162 Walmart; 9 inactivas quitadas; 324 ya estaban), búsqueda por ZIP o ciudad, la más cercana destacada, lista, filtro por tienda, "usar mi ubicación" y mapa MapLibre/OpenFreeMap con estilo de la marca.
- **Páginas SEO**: 60 ciudades (con 3 o más ubicaciones) y 5 cadenas (con 4 o más), en ambos idiomas, y un bloque de exploración por tienda y por ciudad en la página del localizador.
- **Nuestra Historia** y **Contacto** (formulario preparado para Netlify Forms).
- **Regla de diseño**: sin "sellos de Claude" (marquesinas, títulos pequeños sobre títulos grandes, badges, bordes laterales, numeración 01-02-03). Está en `CLAUDE.md`.

## Aprobación por página
Dos casillas por página: **Dueño** (el usuario la da por terminada de diseño y contenido) y **Clienta** (la clienta la aprobó). Marcar con `[x]` cuando ocurra. Una página no se considera cerrada hasta tener las dos.

| Página | Dueño | Clienta |
|---|---|---|
| Home (`/`) | [x] | [ ] |
| Productos (`/products/`) | [ ] | [ ] |
| Detalle de producto (`/products/[slug]/`) | [ ] | [ ] |
| Sabores (`/flavors/`) | [ ] | [ ] |
| Detalle de sabor (`/flavors/[slug]/`) | [ ] | [ ] |
| Dónde comprar / localizador (`/where-to-buy/`) | [ ] | [ ] |
| Páginas de ciudad y cadena (`/where-to-buy/[slug]/`) | [ ] | [ ] |
| Nuestra Historia (`/our-story/`) | [ ] | [ ] |
| Contacto (`/contact/`) | [ ] | [ ] |

## Pendiente de contenido (lo que impide dar el sitio por listo)
**Nuevo (2026-10-14, ver `INFO-COMERCIAL.md`)**: la clienta envió el brochure y su mapa comercial. El brochure agrega 2 líneas (Non Dairy Popsicles, Ice Cream Sandwich) y sabores (Piña Colada, Rum Raisin, Tres Leches), y no menciona Tamarindo ni Blackberry. El mapa es una herramienta interna de ventas con 829 cuentas (162 Walmart) y datos sensibles; falta decidir cómo y qué se publica.

**De la clienta**
- ~~Confirmar Walmart~~: decisión del dueño (2026-10-14): **Walmart sí se nombra en el sitio**, sin consultar a la clienta.
- Revisar la lista de ubicaciones: unas 390 tiendas independientes, varias dudosas (restaurantes, un taller); sin teléfonos ni horarios. Ya enviaron un mapa más reciente (ver `INFO-COMERCIAL.md`): falta decidir si reemplaza la lista actual.
- **Logo en vectorial** (en los PDFs solo hay una imagen de 474 px; el header usa texto provisional).
- **Fotos y empaques** de los sabores que faltan: Cheese & Guava, Mamey, Chocolate, Vanilla, Blackberry, Dulce de Leche y Mango. Confirmar qué sabor va en qué línea y que los empaques sigan vigentes.
- **Derechos de las fotos** con personas y fruta (parecen de banco de imágenes).
- **Licencia web de las fuentes** Como y Rude Slab (hoy los títulos usan Poppins).
- Texto propio de **Nuestra Historia** (el actual es borrador basado en el Brand Story).
- **Datos de contacto** (correo de destino del formulario, teléfono, redes) y enlaces a redes en el footer.
- Confirmar el **dominio** (se asumió fruitiqueicecream.com) y las URLs del sitio viejo para redirecciones.
- Posible llamada con la clienta para entender el negocio; ella dijo que enviará más material (Instagram, brand identity).

**De desarrollo (cuando el contenido esté)**
- Descripciones de sabores y productos: son borrador y deben aprobarse.
- Contenido editorial propio en las páginas de ciudad más grandes (Miami, Hialeah, New York); hoy el texto es el mismo para todas.
- Páginas aún sin hacer: política de privacidad y términos, página 404 propia, favicon y logo definitivos, imagen para compartir en redes (Open Graph).
- Revisar si alguna sección pide más animación o ajustes visuales tras ver el contenido final.

## Para la fase final (solo cuando el usuario lo indique)
Accesibilidad (contraste, teclado, lectores de pantalla), rendimiento (peso de imágenes, Core Web Vitals), pruebas en móviles reales, SEO técnico (revisión de schema, sitemap, robots), configurar Netlify (formulario, dominio, redirecciones) y publicar.

## Notas técnicas para quien continúe
- Servidor local: `npm run dev` (o `npx astro dev --background`). Tras instalar paquetes, reiniciar con `npx astro dev stop && npx astro dev --force`.
- Datos del localizador: `npm run data` (fuentes en `data-source/`). No editar `public/data/*.json` a mano.
- El mapa necesita su worker empaquetado y `maplibre-gl` excluido de `optimizeDeps`; ver `CLAUDE.md`.
- Textos de interfaz en `src/i18n/ui.ts`; textos de historia y contacto en `src/data/pages.ts`; sabores en `src/data/flavors.ts`; imágenes en `src/data/media.ts`.
- Pruebas visuales: Playwright con el Chrome del usuario (escritorio, móvil 390 px y con movimiento reducido).

**2026-10-14 — lista de sabores = brochure**: 14 sabores. Se quitaron Tamarindo y Blackberry; EN ahora "Soursop" y "Guava & Cheese". El escenario de la home tiene 4 sabores (Strawberry, Passion Fruit, Soursop, Coconut) y cierra con "and many more." + enlace a `/flavors/`. Los tokens `--fq-tamarind` y `--fq-leaf` y los empaques de Tamarindo (`src/assets/packs/*tamarindo*`) quedan sin uso.
