# Imágenes de marca usadas en el sitio

Salen de los PDFs sin comprimir de la clienta (`02 Brand Essence`, `03 Brand Identity`, `04 Brand Architecture`), extraídos con `pdfimages` y recortados/optimizados a WebP.

- **Empaques con fondo transparente** → `src/assets/packs/` (pints de Strawberry, Passion Fruit, Guanábana, Coconut y Tamarindo; vasos SquareBar de Strawberry, Coconut, Passion Fruit y Tamarindo; trío de vasos; caja de paletas).
- **Fotografía** → `src/assets/photos/` (paletas de fresa y maracuyá, vasos de coco, maracuyá, guanábana y fresa, dulce de leche, fruta de fresa, coco, maracuyá, mango y guanábana, y 4 fotos de personas).
- El mapeo imagen ↔ sabor/producto está en `src/data/media.ts`. Los sabores sin imagen (Cheese & Guava, Mamey, Chocolate, Vanilla, Blackberry, Mango en empaque) usan la ilustración provisional (`ProductArt.astro`).

- **Del brochure 2026-10-14** → `src/assets/packs/`: sándwiches Cookies & Cream y Dulce de Leche.

## Empaques nuevos (2026-10-21)
La clienta envió cuatro fotos de pint y los archivos de empaque (PDF) del 3 Pack y de las paletas rellenas. Todo se procesó con `pdftoppm` + ImageMagick y se guardó en `src/assets/packs/`:

- **Pints** (fotos con fondo blanco): floodfill desde las esquinas con fuzz 10 % — no más, porque la tapa crema está a la misma distancia del blanco que la sombra — y después una limpieza de la franja inferior (últimas 45 filas: fuera los píxeles con saturación ≤ 18 y luminancia ≥ 195). Ese segundo paso quita la sombra de estudio de la foto, que es un gris plano `rgb(227,227,227)` y sobre el círculo amarillo del hero se veía como un "plato" blanco. Son `pint-pina-colada`, `pint-creamy-strawberry`, `pint-creamy-passion-fruit`, `pint-creamy-mango` y `pint-tres-leches` (este último se añadió el 2026-10-22, del mismo lote: `PINTAS/TRES LECHES.jpg`), y sustituyen a los tres pints de baja resolución del brochure. El `lidCut` del escenario es la junta entre el faldón de la tapa (más ancho) y el cuerpo (más estrecho): la primera fila del cuerpo partida por el alto de la imagen — .1824 fresa y maracuyá, .1822 mango, .1809 tres leches. Por encima asoman "orejas" del faldón en el envase; por debajo, la tapa se lleva pegado un escalón de cuerpo (se probó con 6 px y se descartó).
- **Square bars sueltos**: `bar-coconut`, `bar-strawberry`, `bar-mango`. Salen de los troqueles del 3 Pack, donde la foto del bar va como imagen embebida con canal alfa, así que vienen recortados de origen.
- **Cajas de 3** (`box3-coconut`, `box3-strawberry`, `box3-mango`, `box3-trio`): **no son fotos**. Se armaron aquí a partir del troquel oficial: se renderizó el PDF a 200 ppp, se recortaron el panel frontal (170×95 mm), la tapa (170×73 mm) y el lateral (73×95 mm), y se montaron con una **proyección en perspectiva calculada** (caja de 170×95×73 mm, yaw 34°, pitch 13°, cámara a 560 mm), no con cuadriláteros a ojo. El script vive en el scratchpad de la sesión; si hay que rehacerlas, lo que importa son esos parámetros y los tres recortes. En `box3-trio` las tres cajas van separadas **962 px** (el ancho del frente proyectado): con menos se tapan el nombre del sabor entre ellas. Reemplazarlas en cuanto haya foto real del producto.
- **`squarebars-duo`**: la caja de 3 de fresa con una barra suelta delante. Es la imagen de la línea SquareBars en la home y en el hero del producto, para que se vean las dos presentaciones en una sola pieza.
- **Paletas rellenas**:
  - `filled-pop-strawberry` y `filled-pop-passion-fruit`: recortados de **renders que generó el dueño con IA** (2026-10-21) a partir del empaque de la propuesta, porque los mockups del PDF dejaban restos de fondo imposibles de limpiar bien. **No son fotos de producto ni arte oficial de la clienta**: hay que sustituirlos por las fotos reales.
  - Los dos vienen sobre fondo neutro (gris plano el de fresa, tablero de transparencia aplanado a JPEG el de maracuyá), así que el recorte (`cut_neutral.py` en el scratchpad) hace flood desde **todo el borde**, no solo desde las cuatro esquinas: con solo las esquinas quedó una franja de fondo pegada al extremo derecho del de fresa. Después, apertura morfológica del fondo y una erosión de 7 px que se come el halo del JPEG.

### Pint de Coco para el escenario (2026-10-22)
`pint-coconut.webp` es de la serie vieja (550×350) y viene **con fondo blanco**, no transparente. Para que pueda ir sobre cualquier color del escenario se guardó aparte `pint-coconut-stage.webp`: floodfill desde las cuatro esquinas con `fuzz 8%` y `-trim` → 334×347, mismo encuadre relativo que los pints nuevos (≈0,96) y `lidCut` .1844 (su cuerpo empieza en la fila 64 de 347). `pint-coconut.webp` se queda intacto para el resto del sitio. **Es baja resolución y empaque antiguo** (tapa turquesa, "Non Dairy", "Handmade Happiness") al lado de cuatro envases del diseño nuevo: pedir a la clienta la foto nueva del pint de Coco.

Archivos de origen (fuera del repo, los envió la clienta el 2026-10-21): `IMG_4728..4731.JPG`, `FRUTIQUE EMPAQUE SABORES - {COCO,FRESA,MANGO} - 2.pdf`, `FRUTIQUE_PROPUESTA CREMAS INDIVIDUAL 2.pdf`.

**Se borraron** al salir la línea non-dairy del catálogo: `box-popsicles-strawberry`, `popsicle-nd-strawberry`, `popsicle-nd-sweet-mango`. Las fotos `photos/popsicle-strawberry` y `photos/popsicle-passion-fruit` se reutilizan en la línea Filled Popsicles: son paletas del catálogo viejo, **confirmar con la clienta** si siguen sirviendo.

## Pendiente con la clienta
- **Derechos de uso**: las fotos con personas y de fruta parecen de banco de imágenes. Confirmar que tienen licencia para la web.
- **Que cada empaque siga vigente** (los PDFs son un documento de identidad, no un catálogo actual).
- **Fotos o empaques de los sabores que faltan** (Cheese & Guava, Mamey, Chocolate, Vanilla y Blackberry).
- **Fotos reales del 3 Pack y de las paletas rellenas**: las que hay hoy son render propio a partir del troquel y del PDF de propuesta, y en el caso de la paleta de fresa un render hecho con IA. Ninguna es foto de producto.
- **Logo en vectorial**: el único logo en los PDFs es una imagen pequeña (474 px), no sirve para el sitio.
- Las fotos tienen un acabado de "mockup"; con fotos propias el resultado mejoraría.

## Logo oficial (2026-10-21)
El usuario entregó el logo horizontal en PNG con fondo transparente (`LOGO_Frutique_Horizontal.png`, 2160×1215, rojo `#ED1C24` + turquesa `#20BDBE` + sonrisa blanca). La copia de origen queda en `src/assets/brand/fruitique-logo-source.png`.

Se **vectorizó**, no se redibujó: con PIL se separó el PNG en capas por color (isotipo, wordmark, hoja, corazón de la *i*, bajada "Artisan Ice cream") y cada máscara se trazó con `potrace -s -a 1.0 -O 0.2 -u 10`. Los paths se montaron en un solo SVG con `viewBox="445 492 1290 305"` (el bbox real del contenido) bajo el `transform` que genera potrace. La diferencia media contra el PNG original es 0,004, o sea imperceptible.

### Versión amarilla (2026-10-22)
La clienta mandó el logo con la hoja, el corazón de la *i* y las palabras "Ice cream" en **amarillo** en vez de turquesa (`LOGO_Frutique06.jpg` y `LOGO_Frutique11.jpg`, el isotipo). Es el mismo dibujo, solo cambia el color, así que **no se revectorizó**: se recolorearon los SVG que ya había, que tienen más calidad que esos JPG. Para que "Ice cream" quedara amarillo y "Artisan" blanco hubo que **partir en dos el path de la bajada**, que era uno solo: sus 16 subpaths (uno por letra; los huecos van con `m` minúscula dentro de cada uno) se repartieron por la x de arranque — "Artisan" de 9509 a 11416 y "Ice cream" de 11992 a 14570, umbral en 11700. Ya no queda turquesa en ningún archivo del logo.

Archivos en `public/brand/`:
- `fruitique-logo.svg` — versión a color, para fondos claros: isotipo, wordmark y bajada en rojo, hoja y corazón en amarillo (la bajada no va en amarillo porque sobre fondo claro no se leería). Hoy no la usa ninguna página.
- `fruitique-logo-white.svg` — **la del header y el footer**: cuerpo y "Artisan" en blanco, hoja, corazón e "Ice cream" en amarillo, y la sonrisa como hueco (deja ver el rojo del fondo).
- `fruitique-icon.svg` / `fruitique-icon-white.svg` — solo el isotipo.
- De ahí salen `public/favicon.svg` y `public/favicon.ico` (32/16): el isotipo **sin fondo**, vaso rojo y hoja amarilla (decisión del dueño, 2026-10-22). El `public/apple-touch-icon.png` (180 px) tiene que ser opaco por exigencia de iOS y va sobre **rojo** con el isotipo blanco, que es la imagen que mandó la clienta; sobre crema la hoja amarilla no se veía.

Lo sirve `src/components/Logo.astro` (`variant="onRed" | "color"`, alto por la variable CSS `--logo-h`). **Si la clienta aparece con el AI/SVG original, sustituir estos archivos.**

## Congeladores (2026-10-21)
`src/assets/photos/freezer-upright.webp` (540×926) es un render del dueño hecho con Gemini a partir de la nevera vertical real: una sola puerta, que es la que corresponde a la ficha de 25 3/8" de ancho. Sustituye al recorte del brochure, que era de dos verticales juntos y tenía el borde serruchado. **No es foto real**; el texto pequeño del costado no es legible a tamaño de uso.
`freezer-bunker-3.webp` (496×512) y `freezer-bunker-2.webp` (328×424) sí salen del brochure (`pdfimages` de las páginas 4 y 5, recompuestas con su máscara alfa y recortadas). **Son provisionales**: pedir las fotos originales y, sobre todo, una nevera Fruitique surtida dentro de una tienda, que es la imagen que su brief pide para el hero.

## Logos de clientes (2026-10-21)
`public/logos/clients/` guarda los logos oficiales descargados de Wikimedia Commons: `nbc-news.svg`, `telemundo.svg`, `hca-healthcare.svg`, `marriott.svg` y `baptist-health.png` (este es pequeño, 198×41; sustituirlo si aparece uno mejor). Walmart, CVS, Winn-Dixie y Memorial Healthcare se reutilizan de `public/logos/retailers/`. El mapa está en `src/data/client-logos.ts` y la lista de marcas sale del brochure. Son marcas de terceros: falta el permiso explícito de la clienta.
