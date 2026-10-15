# Manual de marca — Fruitique

Síntesis de los PDFs de la clienta (`assets-marca/pdfs/`: 02 Brand Essence, 03 Brand Identity, 04 Brand Architecture), adaptada al uso web.

## 1. Esencia
**Handmade Happiness :)**
> Experiencia helado artesanal que busca generar pequeños momentos de felicidad a través del deleite, la tradición y los sabores naturales que crean un antojo irresistible.

- Propósito: *Shared Moments through natural and handmade flavors.*
- Tres pilares: **Sabores naturales · Momento artesanal · Antojo irresistible.**
- Variantes de lema: *Natural Happiness :)* · *Moments of Happiness :)* · *Handmade Happiness :)*
- Posicionamiento: *"We are not ice cream makers. We are Happiness Creators / Moment Makers / Irresistible Crave."* Somos creadores de historias hechas a mano.

## 2. Personalidad, valores y ADN
- **Personalidad**: Divertida, Cool, Confiable, Enérgica, Dinámica, Atractiva.
- **Hacia dónde va la marca** (perfil hoy→futuro): más innovadora, joven, premium, informal, creativa, emocional, cálida, impulsiva, nacional, práctica, servicial, cotidiana, asequible, femenina, cercana.
- **Valores**: *Inspiradora* (entusiasta, apasionada, optimista) · *Saludable* (vital, artesanal) · *Empática* (cercana, amable, servicial).
- **ADN**: Divertida · Inspiradora · Cómplices · Natural · Artesanal · Dinámicos.
- **Audiencias**: Adulto contemporáneo · Centennials · Gen Z.

## 3. Tono de voz
Feliz, cómplice, servicial, atento, dinámico, creativo e innovador. Habla de tú, frases cortas, juguetón, con picardía suave. El ":)" es la firma (con moderación, no en cada frase).

Brand Story (referencia de voz): *"For those who jump of happiness on one leg, or for those with broken hearts. For those who crave, or those who want to reward themselves… For those who want to share… And for those who prefer to stay home watching Netflix while enjoy our cream pint."*

| Sí | No |
|---|---|
| "Encuentra Fruitique cerca de ti :)" | "Consulte nuestra red de distribución" |
| "Coco, mango, guanábana… ¿cuál es tu antojo?" | "Nuestro portafolio de productos" |
| "Hecho a mano. Hecho para compartir." | Jerga corporativa, tono serio o frío |

Nota de adaptación: los PDFs hablan de heladería ("visítanos", scooping). En la web, el llamado es **encontrar el producto en tienda** ("Encuéntranos en una ubicación cerca de ti").

## 4. Color
Muestreado de la paleta del PDF 03 (los PDFs no traen HEX; confirmar con la clienta).

| Token | Nombre | HEX | Uso |
|---|---|---|---|
| `--fq-red` | FrutiRed (primario) | `#ED1D24` | Fondo dominante, header, bloques de marca |
| `--fq-yellow` | Amarillo | `#FFD400` | Acentos, subrayado de CTA, destacados |
| `--fq-cream` | Crema | `#FFEAD5` | Fondos suaves, tarjetas |
| `--fq-turquoise` | Turquesa | `#27BDBE` | Bloques secundarios (p. ej. guanábana), contraste fresco |
| `--fq-purple` | Morado ("Pink" en el PDF) | `#93288D` | Acentos (berry, blackberry) |
| `--fq-white` | Blanco | `#FFFFFF` | Texto sobre rojo, fondos limpios |

Reglas:
- El rojo es el color de marca: secciones hero, footer y CTA principal.
- Texto blanco sobre rojo (tamaños grandes/bold); texto rojo u oscuro sobre amarillo y crema — **nunca blanco sobre amarillo**. Revisar contraste AA (el blanco sobre turquesa es justo: usar solo texto grande/bold).
- Amarillo = acento y llamada a la acción secundaria; no como fondo de texto largo.
- La evolución de marca pasó de "Rojo" a "FrutiRed" con trazo pincelado: se pueden usar manchas/pinceladas como textura.
- Cada sabor puede tomar el color de su empaque como color de bloque (ver §10).

## 5. Tipografía
| Rol | Fuente | Pesos | Uso |
|---|---|---|---|
| Display / titulares | **Como** | Regular, Bold (hay ExtraLight→Heavy) | H1/H2, claims |
| Acento de producto | **Rude Slab** | Book, Bold, itálicas | Nombres de sabor ("Straw*berry*", "Natural *flavors*"), detalles |
| Texto / UI | **Poppins** | Regular, Medium, SemiBold, Bold | Párrafos, botones, nav, formularios |

- Archivos en `assets-marca/fonts/` (Como Type, Rude Slab, Poppins).
- Poppins es libre (SIL OFL); **Como y Rude Slab son comerciales: confirmar licencia web** antes de ponerlas en `public/`. Mientras tanto, fallback Poppins/`system-ui`.
- Convertir a WOFF2 y subset al implementar; `font-display: swap`.

## 6. Logotipo
- Wordmark **"fruitique"** (tipografía redondeada propia) + **ícono**: vaso/paleta con cara sonriente (versiones con corazón, sonrisa y outline), con "hoja/mango" que cambia de color.
- Versiones: horizontal, vertical, solo ícono; color, en blanco sobre rojo, amarillo/outline sobre turquesa.
- Descriptor: *Handmade Happiness.*
- Sub-marcas por formato, cada una con su ícono: **SquareBars**, **Popsicles**, **Pint** (+ Natural / Premium).
- Reglas: usar siempre el archivo oficial (**pedir SVG/AI a la clienta**); nunca reescribir el logo con texto; respetar espacio libre; sin deformar ni recolorear fuera de las versiones aprobadas. Marca registrada ® en materiales formales.

## 7. Iconografía
- Set de line icons (helados, paletas, conos, frutas) en trazo, colores rojo/amarillo/turquesa/morado.
- Set por ciudad (Florida, New York, New Jersey): reutilizable en páginas de ciudad y del localizador (los de Florida son los relevantes).
- Mantener trazo uniforme y redondeado; usar SVG.

## 8. Fotografía
Tres conceptos:
1. **Momentos de felicidad** — consumidores reales disfrutando: sonrisas, diversidad, familia, parejas, complicidad, picardía; fondos de color saturado (amarillo).
2. **Helado artesanal** — producto protagonista: cremosidad, imperfección, toppings, efecto WOW.
3. **Ingredientes naturales** — fruta fresca en primer plano (fresa, maracuyá, coco, mango), texturas, detalles.

Para la web: priorizar **producto + fruta + gente disfrutando**; recortes limpios del empaque sobre bloques de color; evitar stock genérico frío.

## 9. Texturas y recursos gráficos
- Pinceladas/manchas de FrutiRed, madera blanca, bloques de color planos, bloques diagonales con el logo de la sub-marca.
- Composición típica de banner: **foto de producto + bloque de color en diagonal + logo del formato** (rojo / amarillo / turquesa).

## 10. Arquitectura de producto
```
fruitique — Handmade Happiness
├── SquareBars
├── Popsicles
└── Pints (Natural · Premium)
```
Sabores (12): Coconut, Tamarindo, Passion Fruit, Cheese & Guava, Guanábana, Mamey, Strawberry, Dulce de Leche, Mango, Chocolate, Vanilla, Blackberry.

Color de empaque observado: Strawberry → rojo · Passion Fruit → amarillo · Guanábana → turquesa · Tamarindo → marrón · Coconut → blanco/turquesa claro. Los demás: tomar de las fotos de producto cuando la clienta las entregue.
Los nombres de sabor se escriben en Rude Slab con una parte en itálica.

**Actualización 2026-10-14 (brochure de la clienta, ver `INFO-COMERCIAL.md`)**: las líneas vigentes son Square Bars 4 oz, Special Pints 14 oz, Non Dairy Popsicles 2.5 oz e Ice Cream Sandwich 2.5 oz, con sabores por línea. Tagline en uso: "Handmade Happiness". Sellos funcionales reales: Non-GMO, Gluten Free, Dairy Free (según línea).

## 11. Aplicación a la web
- **Header**: logo + nav (Productos | Sabores | Dónde Comprar | Nuestra Historia | Contacto) + EN/ES + botón amarillo "Find Fruitique near you".
- **Hero**: fondo FrutiRed o amarillo, producto grande, titular en Como, buscador ciudad/ZIP.
- **Tarjetas de sabor**: bloque del color del sabor, empaque, nombre en Rude Slab.
- **Botones**: primario amarillo con texto rojo/oscuro sobre rojo; secundario blanco con texto rojo; esquinas redondeadas (coherente con el logo).
- **Footer**: rojo, logo en blanco, "Handmade Happiness :)", nav, redes, idioma.
- Movimiento sutil y alegre (hover con rebote leve), respetando `prefers-reduced-motion`.

## 12. Lo que NO se hace (sellos de IA)
Sin marquesinas, sin títulos pequeños sobre títulos grandes, sin badges/pills decorativos, sin bordes laterales de acento y sin numeración 01-02-03. Detalle en `CLAUDE.md`. La marca es alegre por su color, su producto y su tono, no por adornos de plantilla.
