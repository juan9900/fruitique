import { salesContact } from './pages';

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
 * PENDIENTE (2026-10-21): el correo destino queda visible en el HTML y es
 * scrapeable. Al hablar con el cliente, activar su buzón con el primer envío y
 * sustituir el correo por el alias con hash que da FormSubmit
 * (`https://formsubmit.co/<hash>`), que oculta la dirección.
 */
export const FORM_TEST_MODE = false;

/** Buzón de pruebas mientras FORM_TEST_MODE está activo. */
const TEST_INBOX = 'juanluislauretta@gmail.com';

export const formTo = FORM_TEST_MODE ? TEST_INBOX : salesContact.email;

/** Endpoint normal: sin JS el POST funciona igual y FormSubmit muestra su página de gracias. */
export const formEndpoint = `https://formsubmit.co/${formTo}`;

export const formSubject = {
  contact: 'Fruitique — new message from the website',
  partner: 'Fruitique — new partner request',
} as const;
