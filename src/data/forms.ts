
/**
 * Envío de los formularios del sitio (Contacto y Become a Partner) sin servidor.
 *
 * Usamos FormSubmit (endpoint AJAX): el navegador hace POST con los campos y
 * FormSubmit reenvía el contenido por correo. No hace falta API key ni backend,
 * así que el sitio sigue siendo estático. Ojo: no es software libre, es un
 * servicio externo; la alternativa open source (Nodemailer + SMTP) pide servidor.
 *
 * El primer envío a una dirección nueva NO llega: FormSubmit manda un correo de
 * activación a ese buzón y hay que pulsar el enlace una vez. A partir de ahí
 * todos los envíos llegan solos.
 *
 * El endpoint usa el alias con hash de FormSubmit (`https://formsubmit.co/<hash>`)
 * del buzón de la clienta (activado 2026-10-22), así la dirección no queda
 * visible ni scrapeable en el HTML.
 */
export const FORM_TEST_MODE = false;

/** Buzón de pruebas mientras FORM_TEST_MODE está activo. */
const TEST_INBOX = 'juanluislauretta@gmail.com';

/** Alias con hash del buzón de la clienta (oculta la dirección real). */
const FORM_HASH = 'f0ce45068945be034729406d12efa28d';

export const formTo = FORM_TEST_MODE ? TEST_INBOX : FORM_HASH;

/** Endpoint normal: sin JS el POST funciona igual y FormSubmit muestra su página de gracias. */
export const formEndpoint = `https://formsubmit.co/${formTo}`;

export const formSubject = {
  contact: 'Fruitique — new message from the website',
  partner: 'Fruitique — new partner request',
} as const;
