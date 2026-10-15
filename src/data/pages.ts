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
