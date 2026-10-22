/**
 * Textos de Nuestra Historia y Contacto. Base: Brand Story del PDF 02 (Brand Essence), traducido/adaptado.
 * BORRADOR: la clienta debe enviar o aprobar su texto de historia. No hay datos de contacto reales aún (no inventar).
 */
export const story = {
  en: {
    title: 'About Us',
    metaDesc: 'Fruitique is handmade ice cream that creates small moments of happiness with natural flavors and an irresistible craving.',
    h1a: 'We are not ice cream makers.',
    h1b: 'We are happiness creators :)',
    manifesto:
      'Fruitique is a handmade ice cream experience that creates small moments of happiness through delight, tradition and natural flavors that turn into an irresistible craving.',
    forThose: [
      'For those who jump for joy on one leg,',
      'or for those with a broken heart.',
      'For those who crave, or those who want to reward themselves.',
      'For those who are passing through, or those who need a break.',
      'For those who want to share.',
      'For those who take care of themselves but do not deprive themselves of a little reward in the middle of the day.',
      'For those who like to go out.',
      'And for those who prefer to stay home watching a series while they enjoy our ice cream.',
    ],
    pillars: [
      { t: 'Natural flavors', d: 'Flavors that come from nature, made to taste like the real thing.' },
      { t: 'Handmade moments', d: 'Made by hand, with the care and tradition that make it special.' },
      { t: 'Irresistible cravings', d: 'The kind you remember and want to repeat.' },
    ],
    closing: 'Moments of Happiness :)',
    cta: 'Find Fruitique near you',
  },
  es: {
    title: 'Nuestra Historia',
    metaDesc: 'Fruitique es helado artesanal que crea pequeños momentos de felicidad con sabores naturales y un antojo irresistible.',
    h1a: 'No somos fabricantes de helados.',
    h1b: 'Somos creadores de felicidad :)',
    manifesto:
      'Fruitique es una experiencia de helado artesanal que busca generar pequeños momentos de felicidad a través del deleite, la tradición y los sabores naturales que crean un antojo irresistible.',
    forThose: [
      'Para quienes saltan de felicidad en un solo pie,',
      'o para quienes tienen el corazón roto.',
      'Para quienes se antojan, o quieren premiarse.',
      'Para quienes van de paso, o necesitan un descanso.',
      'Para quienes quieren compartir.',
      'Para quienes se cuidan pero no se privan de un premio a mitad del día.',
      'Para quienes les gusta salir.',
      'Y para quienes prefieren quedarse en casa viendo una serie mientras disfrutan nuestro helado.',
    ],
    pillars: [
      { t: 'Sabores naturales', d: 'Sabores que vienen de la naturaleza, hechos para saber a lo real.' },
      { t: 'Momentos artesanales', d: 'Hechos a mano, con el cuidado y la tradición que lo hacen especial.' },
      { t: 'Antojos irresistibles', d: 'De esos que se recuerdan y se quieren repetir.' },
    ],
    closing: 'Momentos de Felicidad :)',
    cta: 'Encuentra Fruitique cerca de ti',
  },
} as const;

export const contact = {
  en: {
    title: 'Contact',
    metaDesc: 'Write to the Fruitique team. Questions, ideas or want to carry Fruitique in your store.',
    h1: 'Say hello.',
    lead: 'Questions, ideas, or want Fruitique in your store? Write to us and we will get back to you.',
    name: 'Name', email: 'Email', message: 'Message', send: 'Send message',
    sending: 'Sending…', ok: 'Thanks! We got your message and will write back soon.', error: 'Something went wrong. Please try again in a moment.',
  },
  es: {
    title: 'Contacto',
    metaDesc: 'Escribe al equipo de Fruitique. Preguntas, ideas o si quieres tener Fruitique en tu tienda.',
    h1: 'Escríbenos.',
    lead: '¿Preguntas, ideas o quieres Fruitique en tu tienda? Escríbenos y te respondemos.',
    name: 'Nombre', email: 'Correo', message: 'Mensaje', send: 'Enviar mensaje',
    sending: 'Enviando…', ok: '¡Gracias! Recibimos tu mensaje y te escribimos pronto.', error: 'Algo salió mal. Inténtalo de nuevo en un momento.',
  },
} as const;

/**
 * Become a Partner. Base: brochure de la clienta (docs/INFO-COMERCIAL.md §2) y sus
 * directrices del 2026-10-21. BORRADOR pendiente de aprobación.
 * El correo y el teléfono salen del brochure; confirmar antes de publicar.
 */
export const partner = {
  en: {
    title: 'Become a Partner',
    metaDesc:
      'Sell Fruitique in your store. We place a branded freezer at no cost — you only invest in the ice cream. Distribution across Florida.',
    h1a: 'Grow your business',
    h1b: 'with Fruitique.',
    lead:
      'Bring tropical, handmade ice cream to your customers with no freezer investment. We provide the freezer at no cost; you only buy the product you sell.',
    sub: 'Now partnering with grocery stores, convenience stores, gas stations, pharmacies, restaurants, hotels and hospitals across Florida.',
    cta: 'Become a partner today',
    benefitsTitle: 'Three reasons it works.',
    benefits: [
      { t: 'Free freezer placement', d: 'We provide a branded Fruitique freezer at no cost to qualifying partners. You plug it in, we keep it looking good.' },
      { t: 'You only invest in product', d: 'No expensive equipment to buy. Your money goes into the ice cream your customers take home.' },
      { t: 'Florida-wide distribution', d: 'We deliver across the state, so restocking is one message away wherever your store is.' },
    ],
    whoTitle: 'Who can become a partner?',
    whoLead:
      'If people walk in hungry, happy or in a hurry, Fruitique has a size for them. Our partners are:',
    who: ['Grocery stores and supermarkets', 'Convenience stores and gas stations', 'Pharmacies', 'Restaurants and cafés', 'Hotels and resorts', 'Hospitals and campuses'],
    whyTitle: 'Why they keep reordering.',
    why: [
      'Made in Florida with real fruit and clean-label ingredients.',
      'Every batch is crafted for the same flavor, texture and look.',
      'A colorful display that sells itself from the freezer.',
      'Gluten-free, non-GMO and dairy-free options for today’s shoppers.',
      'One year of frozen life, so nothing goes to waste.',
    ],
    freezersTitle: 'Our freezer options.',
    freezersLead: 'Three sizes, all branded, all on us. Pick the one that fits your floor.',
    dimLabels: { w: 'Width', d: 'Depth', h: 'Height' },
    scaleNote: 'Shown to scale.',
    freezers: [
      {
        name: 'Upright freezer',
        pitch: 'The tall one. Fits where there is no floor to spare.',
        w: '25 3/8"', d: '22 3/4"', h: '55"', inches: 55,
        features: ['Compact vertical design, ideal for tight retail spaces', 'Runs on a standard electrical outlet', 'Energy-efficient, eco-friendly R-290 refrigerant', 'Optional baskets for organized display'],
      },
      {
        name: '3-basket bunker',
        pitch: 'The big display. Everything in sight, everything within reach.',
        w: '31 1/2"', d: '27 3/8"', h: '33 1/2"', inches: 33.5,
        features: ['Low-profile design for easy customer access', 'Casters for easy mobility and cleaning', 'Optimized for ice cream visibility and efficient cooling'],
      },
      {
        name: 'Dual-basket bunker',
        pitch: 'The small one. Slides into the busiest corner of the store.',
        w: '23"', d: '27 3/8"', h: '33 1/2"', inches: 33.5,
        features: ['Small footprint, fits easily in high-traffic areas', 'Casters for easy mobility and cleaning', 'Optimized for product visibility and quick access'],
      },
    ],
    freezersNote: 'Freezer placement is subject to approval and a minimum order.',
    trustedTitle: 'Already in good company.',
    trustedLead: 'Retailers, pharmacies, hospitals and hotels already keep Fruitique in their freezers.',
    coverage: (n: string, s: number) => `${n} locations across ${s} states, and counting.`,
    formTitle: 'Let’s talk.',
    formLead: 'Tell us about your store and our sales team will get back to you with pricing and the freezer program.',
    f: {
      business: 'Business name', name: 'Your name', email: 'Email', phone: 'Phone',
      city: 'City', zip: 'ZIP code', type: 'Type of business', message: 'Anything else we should know?',
      types: ['Grocery store or supermarket', 'Convenience store or gas station', 'Pharmacy', 'Restaurant or café', 'Hotel or resort', 'Hospital or campus', 'Other'],
      send: 'Send request', sending: 'Sending…',
      ok: 'Thanks! We got your request and our sales team will be in touch.',
      error: 'Something went wrong. Please try again in a moment.',
      or: 'Prefer to call or write?',
    },
  },
  es: {
    title: 'Conviértete en Socio',
    metaDesc:
      'Vende Fruitique en tu tienda. Ponemos el congelador sin costo; tú solo inviertes en el helado. Distribución en toda Florida.',
    h1a: 'Haz crecer tu negocio',
    h1b: 'con Fruitique.',
    lead:
      'Lleva helado artesanal y tropical a tus clientes sin invertir en congelador. Nosotros ponemos el equipo sin costo; tú solo compras el producto que vendes.',
    sub: 'Ya trabajamos con supermercados, tiendas de conveniencia, gasolineras, farmacias, restaurantes, hoteles y hospitales en toda Florida.',
    cta: 'Conviértete en socio hoy',
    benefitsTitle: 'Tres razones para hacerlo.',
    benefits: [
      { t: 'Congelador sin costo', d: 'Ponemos un congelador Fruitique sin costo para los socios que califican. Tú lo conectas, nosotros lo mantenemos impecable.' },
      { t: 'Solo inviertes en producto', d: 'Sin equipos caros que comprar. Tu dinero va al helado que tus clientes se llevan.' },
      { t: 'Distribución en toda Florida', d: 'Entregamos en todo el estado: reponer está a un mensaje de distancia.' },
    ],
    whoTitle: '¿Quién puede ser socio?',
    whoLead: 'Si entra gente con hambre, con prisa o con ganas de darse un gusto, Fruitique tiene un tamaño para ellos. Nuestros socios son:',
    who: ['Supermercados y tiendas de abarrotes', 'Tiendas de conveniencia y gasolineras', 'Farmacias', 'Restaurantes y cafés', 'Hoteles y resorts', 'Hospitales y campus'],
    whyTitle: 'Por qué vuelven a pedir.',
    why: [
      'Hecho en Florida con fruta real y etiqueta limpia.',
      'Cada lote sale con el mismo sabor, textura y presentación.',
      'Un display colorido que se vende solo desde el congelador.',
      'Opciones sin gluten, non-GMO y sin lácteos.',
      'Un año de vida congelada: nada se pierde.',
    ],
    freezersTitle: 'Nuestros congeladores.',
    freezersLead: 'Tres tamaños, todos con la marca y todos por nuestra cuenta. Elige el que te quede bien.',
    dimLabels: { w: 'Ancho', d: 'Fondo', h: 'Alto' },
    scaleNote: 'A escala real entre ellos.',
    freezers: [
      { name: 'Congelador vertical', pitch: 'El alto. Entra donde no sobra piso.', w: '25 3/8"', d: '22 3/4"', h: '55"', inches: 55, features: ['Diseño vertical compacto, ideal para espacios ajustados', 'Funciona con un tomacorriente estándar', 'Eficiente y con refrigerante ecológico R-290', 'Canastas opcionales para ordenar el display'] },
      { name: 'Bunker de 3 canastas', pitch: 'El de exhibir. Todo a la vista y al alcance.', w: '31 1/2"', d: '27 3/8"', h: '33 1/2"', inches: 33.5, features: ['Diseño bajo para que el cliente alcance fácil', 'Ruedas para moverlo y limpiarlo', 'Pensado para ver el helado y enfriar bien'] },
      { name: 'Bunker de 2 canastas', pitch: 'El pequeño. Cabe en la esquina de más paso.', w: '23"', d: '27 3/8"', h: '33 1/2"', inches: 33.5, features: ['Poco espacio, entra en zonas de mucho paso', 'Ruedas para moverlo y limpiarlo', 'Pensado para ver el producto y tomarlo rápido'] },
    ],
    freezersNote: 'La colocación del congelador está sujeta a aprobación y a un pedido mínimo.',
    trustedTitle: 'En buena compañía.',
    trustedLead: 'Cadenas, farmacias, hospitales y hoteles ya tienen Fruitique en sus congeladores.',
    coverage: (n: string, s: number) => `${n} ubicaciones en ${s} estados, y subiendo.`,
    formTitle: 'Hablemos.',
    formLead: 'Cuéntanos de tu negocio y nuestro equipo comercial te escribe con precios y el programa de congeladores.',
    f: {
      business: 'Nombre del negocio', name: 'Tu nombre', email: 'Correo', phone: 'Teléfono',
      city: 'Ciudad', zip: 'Código postal', type: 'Tipo de negocio', message: '¿Algo más que debamos saber?',
      types: ['Supermercado o abarrotes', 'Tienda de conveniencia o gasolinera', 'Farmacia', 'Restaurante o café', 'Hotel o resort', 'Hospital o campus', 'Otro'],
      send: 'Enviar solicitud', sending: 'Enviando…',
      ok: '¡Gracias! Recibimos tu solicitud y nuestro equipo comercial te contacta.',
      error: 'Algo salió mal. Inténtalo de nuevo en un momento.',
      or: '¿Prefieres llamar o escribir?',
    },
  },
} as const;

/** Contacto comercial del brochure (2026-10-14). Confirmar con la clienta antes de publicarlo en más sitios. */
export const salesContact = { email: 'juan@fruitiqueusa.com', phone: '+1 (305) 414-3375', phoneHref: '+13054143375' } as const;
