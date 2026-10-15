# ¿De dónde salió la lista de ubicaciones?

*(Explicación sencilla para la clienta)*

**Actualización (2026-10-14):** esta es la historia de la lista del sitio viejo. Después la clienta envió su Mapa Comercial 2026 y ambas listas se combinaron: hoy son 1.333 ubicaciones, incluidas 162 tiendas Walmart. Ver `INFO-COMERCIAL.md` §5.

**Respuesta corta:** salió del propio mapa de Fruitique. El sitio viejo está caído, pero la parte que muestra "dónde comprar" seguía respondiendo, así que se pidió la misma lista que usaba esa página y se guardó una copia. No se obtuvo de ningún otro lugar ni se agregó nada inventado.

## Cómo se hizo

1. **El sitio viejo guardaba las ubicaciones** en un complemento llamado *WP Store Locator*, que es el que dibujaba el mapa y buscaba por código postal.
2. Aunque la página principal ya no cargaba bien, **esa función seguía contestando** cuando se le pedía la lista. Es la misma consulta que hacía el sitio cada vez que alguien escribía su ZIP code.
3. Se descargó la lista completa y se guardó una copia tal cual (`data-source/old-site-stores.json`), por si hay que revisar algo.
4. **Se limpió**: la lista traía muchas ubicaciones repetidas (2.595 filas que en realidad eran 865 ubicaciones distintas), nombres en mayúsculas o minúsculas mezcladas, ciudades con la dirección escrita dentro, códigos postales sin el cero inicial y algunas filas sin estado.
5. **Se le agregaron las coordenadas de cada código postal** usando datos públicos del Censo de EE. UU., para que el buscador pueda decir qué ubicación queda más cerca de quien escribe su ZIP.

## Qué quedó

- **865 ubicaciones únicas**: Florida (577), Nueva York (152), Nueva Jersey (106), Massachusetts (23), Rhode Island (6) y Connecticut (1).
- Cadenas con más ubicaciones: CVS, Winn-Dixie, Sedano's y Presidente Supermarket; el resto son tiendas locales.
- La lista **no incluye teléfonos ni horarios confiables**, porque el sitio viejo no los tenía bien cargados.

## Qué conviene que revise la clienta

- **Que la lista esté al día.** Es la que estaba publicada en el sitio viejo; algunas tiendas pueden haber cerrado o cambiado.
- **Algunas ubicaciones parecen no ser tiendas de helado** (por ejemplo un taller y varios restaurantes). Si no corresponden, se quitan en un minuto.
- **Si venden en Walmart.** No aparece ninguna ubicación de Walmart en la lista. Si existen, hay que pasar esas direcciones para agregarlas.
- Si ella tiene **su mapa o una hoja de cálculo más reciente**, se puede usar en lugar de esta lista y se actualiza todo automáticamente.

## ¿Es seguro?

Sí. Solo se leyeron datos que ya eran públicos (los mismos que mostraba el mapa a cualquier visitante). **No se copió nada del sitio hackeado** más que esa lista de direcciones: ni código, ni plugins, ni archivos. El sitio nuevo se construyó desde cero, así que no hereda el problema de seguridad. Se recomienda no volver a usar el sitio viejo.
