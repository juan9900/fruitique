# Información comercial de Fruitique

*Fuentes: brochure "Fruitique Artisan Ice Cream" (PDF de la clienta, 6 páginas, orientado a foodservice) y el mapa comercial de Google My Maps "Mapa Comercial Fruitique 2026". Recibidos el 2026-10-14. Es lo más reciente y tiene prioridad sobre los PDFs de marca y el sitio viejo cuando haya diferencias.*

## 1. Catálogo según el brochure

Todos: vida congelada de **1 año**, hechos en una instalación que puede contener soya y frutos secos, **Non-GMO**. Hecho en Florida.

| Línea | Tamaño | Sabores | Notas |
|---|---|---|---|
| **Square Bars** (barras cuadradas) | 4 oz | Coconut, Strawberry, Passion Fruit, Mango, Dulce de Leche, Mamey, Soursop (guanábana), Vanilla, Chocolate, Rum Raisin, Guava & Cheese | Con fruta real. Contienen leche. Sin gluten (GF). |
| **Special Pints** | 14 oz | Piña Colada, Rum Raisin, Tres Leches, Passion Fruit, Creamy Strawberry, Creamy Mango | "Made with real cream". Contienen leche. |
| **Non Dairy Popsicles** (paletas sin lácteos) | 2.5 oz | Strawberry, Sweet Mango | Sin lácteos, GF, Non-GMO. Con fruta real. |
| **Ice Cream Sandwich** (mini) | 2.5 oz | Cookies & Cream, Dulce de Leche | Contienen leche. Non-GMO. |

Frases de marca del brochure: "Handmade Happiness", "Where tropical indulgence meets mindful ingredients", "Every bite is a celebration of natural goodness — no artificial shortcuts, just authentic taste from the tropics", "Just pure tropical flavor in every bite — simple, clean, and irresistibly good", "Florida Tropical Foodservice Ice Cream Solution from novelties to gallon servings!".

### Qué cambia respecto a lo que tiene el sitio hoy
- Las líneas son **4**, no 3: Square Bars, Pints, **Non Dairy Popsicles** y **Ice Cream Sandwich** (nueva). El sitio tiene Paletas, Square Bars y Pints.
- Sabores **nuevos** que el sitio no tiene: **Piña Colada, Rum Raisin, Tres Leches** (y Sweet Mango/Creamy Strawberry/Creamy Mango como variantes por línea).
- Sabores que **no aparecen en el brochure**: Tamarindo y Blackberry. **Decisión del dueño (2026-10-14): se quitaron del sitio.**
- Nombres: el sitio ya usa los del brochure en inglés: "Guava & Cheese" y "Soursop" (en español siguen Queso y Guayaba y Guanábana; los slugs no cambiaron).
- El brochure confirma qué sabor va en cada línea (pendiente que figuraba en `PLAN-SITIO.md`).
- Hay empaques reales en el brochure (Piña Colada, Creamy Mango, Creamy Passion Fruit, Strawberry y Sweet Mango non-dairy, sandwiches de Cookies & Cream y Dulce de Leche, barras Mango y Coconut). Candidatos para `src/assets/packs`; usar el PDF original, no capturas.

## 2. Negocio y contacto (del brochure)
- Enfoque foodservice y retail: supermercados, hospitales, hoteles. Ofrecen muestras gratis y primer pedido.
- Argumentos: fruta real, etiqueta limpia, lotes consistentes, display colorido, opciones sin gluten / non-GMO / sin lácteos, hecho en Florida.
- Congeladores en comodato (para tiendas): vertical (25 3/8" × 22 3/4" × 55"), bunker de 3 canastas (31 1/2" × 27 3/8" × 33 1/2") y bunker de 2 canastas (23" × 27 3/8" × 33 1/2"). Ruedas, refrigerante R-290.
- Contacto comercial: **juan@fruitiqueusa.com**, **+1 (305) 414-3375**, www.fruitiqueicecream.com. Sirve para la página de Contacto y el footer; confirmar cuál se publica (el correo usa el dominio fruitiqueusa.com).
- Marcas que el brochure muestra como clientes: NBC News/Telemundo, Baptist Health, HCA Healthcare, Memorial Healthcare System, **Walmart**, CVS Health, Winn-Dixie, Marriott. Usar logos de terceros en el sitio requiere permiso; confirmar.

## 3. El mapa comercial (Google My Maps)
**No es una lista pública de tiendas: es una herramienta interna de ventas.** Tiene 4 capas y 1.390 marcadores. No se debe publicar tal cual ni copiar al repo.

| Capa | Marcadores | Qué es |
|---|---|---|
| Ventas Acumuladas YTD / 08 | 829 | Cuentas reales: cadena, ventas acumuladas del año, última factura, activo/inactivo, dirección, teléfono. **Es la lista de ubicaciones más actual y fiable.** |
| Region 9 Walmart .xlsx | 222 | Tiendas Walmart de la región 9, con datos internos de gerentes (nombres, correos, celulares). |
| Walmar por Market | 234 | Las mismas tiendas Walmart agrupadas por mercado. |
| Fruitique_Venue_Targets_MyMaps.csv | 105 | Prospectos: lugares objetivo para vender (parques, etc.), con prioridad y notas. No son puntos de venta. |

Contenido sensible: ventas y facturación, nombres, correos y celulares de gerentes de Walmart. **No va al sitio ni a los docs.** El KML se descargó solo a una carpeta temporal.

### Capa de ventas (cuentas reales)
- 829 cuentas: **809 activas, 20 inactivas**.
- Por cadena: Independientes 324, **CVS 192**, **Walmart 162**, Winn-Dixie 58, Bravo Supermarket 25, Sedano's 23, HCA Florida Hospital 8, Presidente 8, Memorial Regional Hospital 6, Vicente's 4, Broward Meat & Fish 3, Aramark 3, Milam's 3 y otras de 1-2.
- Por estado (aprox., hay filas con el estado mal escrito): FL ~630, NJ 63, NY 57, MA 13, RI 4, PA 1. Solo 16 filas traen latitud/longitud: habría que geocodificar por dirección.
- Comparado con el sitio viejo (865 ubicaciones: FL 577, NY 152, NJ 106): menos NY y NJ, más FL, y **aparece Walmart**, que el sitio viejo no tenía.

### Walmart
Ahora hay dos evidencias de la propia clienta: el logo de Walmart en el brochure y 162 cuentas Walmart en el mapa de ventas (más 222 tiendas en capas de región). Aun así, la regla del proyecto es no afirmarlo en el sitio hasta que la clienta lo confirme explícitamente, porque el brochure es de foodservice y las capas de Walmart pueden ser una lista de tiendas objetivo y no solo de tiendas con producto. Pendiente: preguntarle si se puede publicar "Walmart" y cuáles tiendas.

## 4. Decisiones pendientes
1. ¿Se publica Walmart? ¿Todas las 162 o las que hoy tienen producto?
2. ¿La capa de ventas reemplaza la lista del sitio viejo? Habría que exportar solo: nombre, cadena, dirección, ciudad, estado, ZIP y teléfono de la tienda; nunca ventas ni datos de gerentes. Excluir inactivas.
3. ¿Se agregan las líneas Non Dairy Popsicles e Ice Cream Sandwich y los sabores Piña Colada, Rum Raisin y Tres Leches? ¿Siguen Tamarindo y Blackberry?
4. ¿Qué correo y teléfono se muestran públicamente?
5. Permiso para usar logos de clientes (NBC, hospitales, Marriott, etc.).

## 5. Cómo quedó integrado (2026-10-14)
- `data-source/mapa-comercial-2026.json`: las 826 cuentas del mapa con coordenadas, solo dirección y cadena (sin ventas, gerentes ni teléfonos). 20 eran inactivas.
- Coordenadas: Census Geocoder (738 de 829), OpenStreetMap (67) y centroide del ZIP en 23 casos (`approx`: el pin queda cerca pero no exacto).
- `npm run data` combina esa lista con la del sitio viejo: 2.595 filas viejas (865 únicas) + 826 nuevas = **1.333 ubicaciones** (FL 941, NY 195, NJ 159, MA 30, RI 7, CT 1). Se quitaron 9 viejas que el mapa marca inactivas y 4 cuentas fuera de la zona (KY, PA, NE, TN).
- Respaldos: `old-site-stores.json` (descarga cruda del plugin) y `old-site-stores.processed.json` (la lista ya limpia que usaba el sitio antes del cambio).
- Revisar con la clienta: tiendas que no son puntos de venta al consumidor (hospitales, museos, gasolineras, oficinas) siguen en la lista como en la del sitio viejo.

## 6. Brochure llevado al sitio (2026-10-14)
- **4 líneas** en `src/data/products.ts`: Popsicles (la línea Non Dairy, 2.5 oz), SquareBars (4 oz), Pints (14 oz) e **Ice Cream Sandwiches** (2.5 oz, nueva). Cada línea trae tamaño, datos funcionales y sus sabores tal como los confirma el brochure; de ahí salen los enlaces sabor ↔ línea.
- **Sabores nuevos** en `src/data/flavors.ts`: Piña Colada, Rum Raisin, Tres Leches y Cookies & Cream (16 en total). Variantes por línea (Sweet Mango, Creamy Strawberry, Creamy Mango) como `label` de la línea, no como sabor aparte.
- **Empaques reales** extraídos del brochure a `src/assets/packs/`: pint Piña Colada, Creamy Mango y Creamy Passion Fruit, sándwiches Cookies & Cream y Dulce de Leche, paletas non-dairy de Strawberry y Sweet Mango, barra de fresa. Creamy Mango y Creamy Passion Fruit salen de una imagen de ~300 px: pedir los archivos originales a la clienta.
- **Sin cambios y por confirmar:** Tamarindo y Blackberry siguen en el sitio pero no están en ninguna línea (no aparecen en el brochure). La línea "Popsicles" del sitio se asumió igual a "Non Dairy Popsicles" del brochure (la caja dice "Non Dairy!").
- **No llevado al sitio:** congeladores en comodato, argumentos de foodservice y logos de clientes (falta decidir si es contenido para consumidor y permiso de logos).
