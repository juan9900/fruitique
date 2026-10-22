/**
 * Envío de formularios por AJAX. El endpoint y los textos de estado viajan en
 * data-* desde el componente (ver src/data/forms.ts).
 * Sin JS el formulario sigue siendo un POST normal al mismo endpoint.
 */
export function wireForm(formId: string, statusId: string) {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  if (!form) return;
  const status = document.getElementById(statusId);
  const say = (text?: string) => { if (status) status.textContent = text ?? ''; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]') as HTMLButtonElement | null;
    if (btn) btn.disabled = true;
    say(form.dataset.sending);
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      // El action es el endpoint normal (sirve sin JS); aquí usamos su variante AJAX.
      const url = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => null);
      // FormSubmit puede responder 200 con success:"false" (p. ej. formulario sin activar).
      const ok = res.ok && String(payload?.success ?? 'true') === 'true';
      if (!ok) throw new Error(payload?.message ?? String(res.status));
      form.reset();
      say(form.dataset.ok);
    } catch (err) {
      console.error('[form]', err);
      say(form.dataset.error);
    }
    if (btn) btn.disabled = false;
  });
}
