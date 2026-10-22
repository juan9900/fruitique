# Plan general del sitio Fruitique

> **Nombre de la marca: "Fruitique"** (con *i*), como en el logo y el sitio viejo fruitiqueicecream.com. El brief de la clienta lo escribió "Frutique" (error de tipeo). Como la gente también lo escribe así, se puede incluir "Frutique" de forma natural como variante en búsquedas, sin usarla como nombre oficial.

## 1. Objetivo y posicionamiento
Plataforma de marca para el consumidor y de localización de ubicaciones. Que el cliente entienda rápido **qué es Fruitique, qué productos y sabores tiene y dónde comprarlos**. Fruitique ya está en toda Florida (Walmart y muchos otros comercios): el sitio convierte esa presencia física en ventaja digital y de SEO.

Sensación: moderna, colorida, tropical, premium, muy visual, centrada en producto, navegación simple. Alineada al manual de marca (`MANUAL-DE-MARCA.md`).

## 2. Recorrido del usuario
**Descubrir → Elegir producto/sabor → Encontrar tienda cercana → Ir a comprar.**
- Home: entiende la marca + buscador de tienda arriba del fold.
- Producto/Sabor: ve el producto + CTA "Find Fruitique near you" + tiendas cercanas.
- Dónde comprar: ciudad/ZIP → lista + mapa → "Cómo llegar".

## 3. Mapa del sitio
Navegación: **Productos | Sabores | Dónde Comprar | Nuestra Historia | Become a Partner | Contacto** (+ selector EN/ES + CTA). «Become a Partner» lo pidió la clienta el 2026-10-21 y se mantiene en inglés también en ES (es el mercado estadounidense); la página en español se titula «Conviértete en Socio».

| EN | ES |
|---|---|
| `/` | `/es/` |
| `/products/` · `/products/square-bars/` · `/products/pints/` · `/products/ice-cream-sandwiches/` · `/products/filled-popsicles/` | `/es/productos/` · `/es/productos/square-bars/` · `/es/productos/pints/` · `/es/productos/sandwiches-de-helado/` · `/es/productos/paletas-rellenas/` |
| `/flavors/` · `/flavors/coconut/` · `/flavors/mango/` … | `/es/sabores/` · `/es/sabores/coco/` · `/es/sabores/mango/` … |
| `/where-to-buy/` (localizador) | `/es/donde-comprar/` |
| `/where-to-buy/cvs/` (por cadena) | `/es/donde-comprar/cvs/` |
| `/where-to-buy/miami-fl/`, `/orlando-fl/`, `/tampa-fl/` … (por ciudad) | `/es/donde-comprar/miami-fl/` … |
| `/our-story/` | `/es/nuestra-historia/` |
| `/become-a-partner/` (captación de comercios) | `/es/conviertete-en-socio/` |
| `/contact/` | `/es/contacto/` |

`hreflang` entre cada par, sitemap con ambos idiomas.

## 4. Catálogo (fuente: PDF 04 Brand Architecture)
- Líneas (2026-10-21): **SquareBars** (también en caja de 3: coco, mango y fresa), **Pints**, **Ice Cream Sandwiches** y **Filled Popsicles** (paletas rellenas de leche condensada). La línea Non Dairy Popsicles salió del catálogo; `/products/popsicles/` redirige a `/products/filled-popsicles/`.
- 12 sabores: Coconut, Tamarindo, Passion Fruit, Cheese & Guava, Guanábana, Mamey, Strawberry, Dulce de Leche, Mango, Chocolate, Vanilla, Blackberry.
- **Actualización 2026-10-14**: el brochure de la clienta define 4 líneas y los sabores de cada una; ver `INFO-COMERCIAL.md` (esa lista manda sobre esta). Pendiente: si siguen Tamarindo y Blackberry, y si se agregan las líneas nuevas.
- **Pendiente con la clienta**: cuáles se venden en Walmart, nombres/slug finales.
- Datos en content collections (`src/content/products`, `src/content/flavors`), un archivo por entrada con campos EN/ES.

## 5. Localizador de ubicaciones (función #1)
Lo que dijo la clienta (audio, 2026-10-13): el negocio **no habla de "puntos de venta" sino de "ubicaciones"** (locations); **ya tienen un mapa creado** con dónde comprar el helado; el sitio anterior tenía un buscador donde la persona escribía su **zip code** y aparecía la **tienda más cercana**, y quieren lo mismo. Aún no se sabe dónde vive su mapa (¿Google My Maps u otra herramienta?) ni si pueden exportar los datos. Ofrece una llamada para explicar el negocio.
- Terminología: en el sitio usar **"Locations / Ubicaciones"** y "Find Fruitique near you"; evitar "puntos de venta".
- **Hecho (fase 3):** `/where-to-buy/` y `/es/donde-comprar/`. Datos recuperados del plugin WP Store Locator del sitio viejo (fruitiqueicecream.com): 865 ubicaciones únicas tras limpiar duplicados (FL 577, NY 152, NJ 106, MA 23, RI 6, CT 1). Fuente cruda en `data-source/`, limpieza en `scripts/build-data.mjs` (`npm run data`), salida en `src/data/stores.json` y `public/data/`. Búsqueda por ZIP (centroides del Censo) o ciudad, ubicación más cercana, lista, mapa MapLibre/OpenFreeMap con estilo de marca, filtro por cadena y "usar mi ubicación".
- **Hallazgos de los datos (confirmar con la clienta):** no hay ninguna ubicación de Walmart; las cadenas son CVS (378), Winn-Dixie (56), Sedano's (25), Presidente (12), Milam's y Western Beef, más ~390 tiendas independientes (varias parecen dudosas: restaurantes, talleres). La cobertura incluye Nueva York y Nueva Jersey, no solo Florida. Sin teléfonos ni horarios fiables. Sin catálogo por ubicación.
- Primero: ZIP → tienda(s) más cercana(s) (resultado inmediato y claro); la lista y el mapa son apoyo.
- Si el mapa existente se puede exportar (KML/CSV de Google My Maps), se convierte a `stores.json` y no hay que recapturar nada. Si no, se usa la plantilla CSV.
- Datos: `src/data/stores.json` — `id, name, retailer, address, city, state, zip, lat, lng, phone, products[]`.
- La clienta llena una plantilla CSV; un script de build la convierte a JSON y geocodifica lo que falte de lat/lng.
- Búsqueda 100 % en el cliente: input ciudad/ZIP + "usar mi ubicación"; tabla estática ZIP→coordenadas de Florida; orden por distancia (haversine).
- Lista + mapa (MapLibre + OpenStreetMap, sin API key), link "Cómo llegar" a Google Maps.
- Filtros por retailer y por producto/sabor.
- Las páginas de retailer y ciudad se generan en build desde el mismo JSON.

## 6. Estrategia SEO
Actualización 2026-10-14: el mapa de la clienta trae 162 tiendas Walmart y ya están en el localizador y en su página de cadena (ver `INFO-COMERCIAL.md`). Siguen pendientes los textos de marketing y keywords con "Walmart" hasta que la clienta confirme.

Ojo: las keywords de abajo salen del brief (incluye "Fruitique Walmart"). Los datos del sitio viejo no tienen Walmart; no usar "Walmart" en contenido ni SEO hasta que la clienta confirme que se vende ahí y entregue esas ubicaciones.
Que Google conecte **Fruitique + Productos + Sabores + Comercios + Ubicaciones**.
- Keywords de la página de socios: *sell Fruitique in my store, ice cream freezer program Florida, free freezer placement ice cream, ice cream wholesale Florida, become an ice cream retailer*.
- Keywords objetivo: *Fruitique near me, Fruitique Walmart, coconut ice cream bars near me, mango ice cream bars, filled popsicles, popsicles near me, where to buy Fruitique* y equivalentes en ES (*paletas de coco cerca de mí, paletas de mango, paletas cerca de mí, dónde comprar Fruitique, Fruitique Walmart*).
- Por página: title/meta/H1 únicos, copy útil (no duplicado), enlaces internos sabor ↔ producto ↔ tiendas/ciudad.
- Páginas de ciudad con contenido real (tiendas de esa ciudad, sabores disponibles, FAQ), no plantillas vacías; solo se generan para ciudades con tiendas.
- Schema.org: `Organization`, `Brand`, `Product`, `Store`/`LocalBusiness` (ciudad/retailer), `BreadcrumbList`, `FAQPage`, `Service` (programa de socios).
- Técnico: sitemap, robots, canonical, `hreflang`, Open Graph, Core Web Vitals, imágenes AVIF/WebP con tamaños.
- Google Business Profile / listados: recomendación aparte para la clienta.

## 7. Stack técnico
- **Astro** (estático) + content collections + i18n nativo.
- CSS con tokens de marca (variables CSS), sin framework de UI pesado.
- MapLibre como isla cliente solo en el localizador.
- `@astrojs/sitemap`, `astro:assets`.
- Formulario de contacto vía servicio externo (Netlify Forms o Formspree). Sin backend propio.
- Hosting estático (Netlify). Dominio: fruitiqueicecream.com (el del sitio viejo; confirmar si se mantiene).
- Sin base de datos.

## 8. Pendientes de la clienta (checklist)
- [ ] Confirmar si hay Walmart y, si sí, esas ubicaciones; revisar/depurar las ~390 tiendas independientes
- [ ] Logo en vectorial (SVG/AI) y variantes
- [ ] Fotos de producto en alta (packaging + sabores) y de consumidores
- [ ] Su mapa de ubicaciones ya creado: ¿en qué herramienta está y se puede exportar (KML/CSV)? Si no, lista de tiendas con direcciones
- [ ] Capturas del sitio viejo y del Instagram (mencionó que enviará brand identity, Instagram y más) y, si hace falta, llamada para entender cómo funciona el negocio
- [ ] Confirmar sabores por línea y cuáles están en Walmart
- [ ] Texto de "Nuestra historia"
- [ ] Contacto, redes, email del formulario
- [ ] Licencia web de Como y Rude Slab
- [ ] Confirmar colores HEX (muestreados del PDF)
- [ ] URLs del WordPress viejo (para redirecciones) y acceso al dominio

## 9. Fases
0. Documentación (plan, manual, CLAUDE.md) ✔
1. Scaffolding Astro + design system (tokens, fuentes, layout, header/footer, i18n) ✔
2. Home + páginas de producto y sabor ✔ (con GSAP; textos en borrador)
3. Localizador de ubicaciones ✔ (con datos del sitio viejo)
4. Páginas de cadena y ciudad + SEO técnico (schema, sitemap, hreflang) ✔ (60 ciudades con ≥3 ubicaciones y 5 cadenas con ≥4, en EN/ES; falta contenido editorial propio por ciudad)
5. Contenido ES, QA (a11y, rendimiento), lanzamiento, redirecciones
