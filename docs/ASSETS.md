# Imágenes de marca usadas en el sitio

Salen de los PDFs sin comprimir de la clienta (`02 Brand Essence`, `03 Brand Identity`, `04 Brand Architecture`), extraídos con `pdfimages` y recortados/optimizados a WebP.

- **Empaques con fondo transparente** → `src/assets/packs/` (pints de Strawberry, Passion Fruit, Guanábana, Coconut y Tamarindo; vasos SquareBar de Strawberry, Coconut, Passion Fruit y Tamarindo; trío de vasos; caja de paletas).
- **Fotografía** → `src/assets/photos/` (paletas de fresa y maracuyá, vasos de coco, maracuyá, guanábana y fresa, dulce de leche, fruta de fresa, coco, maracuyá, mango y guanábana, y 4 fotos de personas).
- El mapeo imagen ↔ sabor/producto está en `src/data/media.ts`. Los sabores sin imagen (Cheese & Guava, Mamey, Chocolate, Vanilla, Blackberry, Mango en empaque) usan la ilustración provisional (`ProductArt.astro`).

- **Del brochure 2026-10-14** → `src/assets/packs/`: pint Piña Colada, Creamy Mango, Creamy Passion Fruit; sándwiches Cookies & Cream y Dulce de Leche; paletas non-dairy de Strawberry y Sweet Mango; barra de fresa. Los dos Creamy son de baja resolución (~300 px).

## Pendiente con la clienta
- **Derechos de uso**: las fotos con personas y de fruta parecen de banco de imágenes. Confirmar que tienen licencia para la web.
- **Que cada empaque siga vigente** (los PDFs son un documento de identidad, no un catálogo actual).
- **Fotos o empaques de los sabores que faltan** (Cheese & Guava, Mamey, Chocolate, Vanilla, Blackberry, Dulce de Leche y Mango).
- **Logo en vectorial**: el único logo en los PDFs es una imagen pequeña (474 px), no sirve para el sitio.
- Las fotos tienen un acabado de "mockup"; con fotos propias el resultado mejoraría.
