/**
 * Sistema de movimiento de Fruitique (GSAP).
 * Reglas (docs/PLAN-SITIO.md §Motion):
 *  - Todo el contenido existe en el HTML; JS solo añade movimiento. Sin JS o con prefers-reduced-motion, la página se ve completa y estática.
 *  - Solo transform/opacity. Sin scroll-jacking: el scroll es nativo, los pins usan scrub.
 *  - Bucles decorativos finitos (WCAG 2.2.2).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const $ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

/** Resuelve "var(--fq-red)" a un color real para poder interpolarlo. */
function resolveColor(value: string): string {
  const m = value.match(/^var\((--[\w-]+)\)$/);
  return m ? getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() : value;
}

const mm = gsap.matchMedia();

mm.add(
  {
    motion: '(prefers-reduced-motion: no-preference)',
    fine: '(hover: hover) and (pointer: fine)',
  },
  (ctx) => {
    const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
    if (!motion) return;

    heroIntro(fine);
    pageIntro();
    storyScrub();
    forThose();
    parallaxImages();
    revealOnScroll();
    flavorStage();
    productLines();
    journey();
    faqAccordion();
    whereSections();
    freezerReveal();
    countUp();
    closingBand(fine);
  },
);

/* ───────────── Hero: titular por líneas + abanico de envases con la sonrisa ───────────── */
function heroIntro(fine: boolean) {
  const hero = $('.hero')[0] as HTMLElement;
  if (!hero) return;

  const title = $('[data-split]', hero)[0];
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  if (title) {
    SplitText.create(title, {
      type: 'lines',
      autoSplit: true,
      onSplit(self) {
        gsap.set(title, { visibility: 'visible' });
        // Sin máscara: sobre fondo blanco el borde de recorte se vería como una raya; sube con fundido.
        return gsap.from(self.lines, { yPercent: 60, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out', delay: 0.1 });
      },
    });
  }

  tl.from('.hero [data-hero-fade]', { y: 28, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.5);
  return heroFan(hero, fine);
}

/* Abanico: círculo → envase central → laterales se abren → sonrisa. Estado final = CSS. */
function heroFan(hero: HTMLElement, fine: boolean) {
  const fans = $('.visual .fan', hero);
  const bars = $('.visual .bar', hero);
  const base = [-14, 14];
  const reach = (hero.querySelector('.visual') as HTMLElement).offsetWidth * 0.24;
  // Un solo gesto: todo arranca a la vez y los envases suben y se abren en la misma curva.
  gsap.set('.hero .visual > *', { visibility: 'visible' });
  gsap.set('.hero .visual .disc', { scale: 0.7, opacity: 0 });
  gsap.set('.hero .visual .fan', { yPercent: 35, opacity: 0 });
  gsap.set('.hero .visual .f1', { x: reach, rotate: 0 });
  gsap.set('.hero .visual .f3', { x: -reach, rotate: 0 });
  // Los square bars entran desde abajo, sin tocar su rotación de CSS.
  gsap.set('.hero .visual .bar', { yPercent: 55, opacity: 0 });
  gsap.set('.hero .visual .smile', { scale: 0.4, opacity: 0, rotate: -20, transformOrigin: '50% 50%' });
  const tl = gsap.timeline({
    delay: 0.15,
    defaults: { duration: 1.05, ease: 'expo.out' },
    // Ya cargado: flotación suave de los envases y la boca se mece (finita, no bucle infinito).
    onComplete: () => {
      fans.forEach((el, i) => gsap.to(el, { y: -(8 + i * 2), duration: 2.2 + i * 0.35, ease: 'sine.inOut', yoyo: true, repeat: 5, delay: i * 0.25 }));
      bars.forEach((el, i) => gsap.to(el, { y: -(5 + i * 2), duration: 2.6 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: 5, delay: 0.4 + i * 0.3 }));
      gsap.to('.hero .visual .smile', { rotate: 4, scaleX: 1.05, scaleY: 1.08, duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: 5 });
    },
  });
  tl.to('.hero .visual .disc', { scale: 1, opacity: 1 }, 0);
  tl.to('.hero .visual .fan', { yPercent: 0, opacity: 1 }, 0);
  tl.to('.hero .visual .f1', { x: 0, rotate: base[0] }, 0);
  tl.to('.hero .visual .f3', { x: 0, rotate: base[1] }, 0);
  tl.to('.hero .visual .bar', { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.08 }, 0.18);
  tl.to('.hero .visual .smile', { scale: 1, opacity: 1, rotate: 0, duration: 0.9 }, 0.08);

  // El puntero abre o cierra un poco el abanico (solo escritorio).
  if (fine) {
    const rot = [fans[0], fans[1]].map((el) => gsap.quickTo(el, 'rotation', { duration: 0.8, ease: 'power3.out' }));
    const onMove = (e: PointerEvent) => {
      const k = 1 + (e.clientX / window.innerWidth - 0.5) * 0.7;
      rot[0](base[0] * k);
      rot[1](base[1] * k);
    };
    hero.addEventListener('pointermove', onMove);
    return () => hero.removeEventListener('pointermove', onMove);
  }
}

/* ───────────── Reveals genéricos ───────────── */
function revealOnScroll() {
  const items = $('[data-reveal]');
  if (!items.length) return;
  gsap.set(items, { opacity: 0, y: 40 });
  ScrollTrigger.batch(items, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }),
  });
}

/* ───────────── Escenario fijado: el scroll (scrub) cierra el envase, cambia el color del fondo, cambia el envase y abre el nuevo ───────────── */
function flavorStage() {
  const stage = $('.stage')[0];
  const items = $('.stage__item', stage);
  if (!stage || items.length < 2) return;

  const data = items.map((n) => ({
    bg: resolveColor(n.dataset.bg!),
    ink: resolveColor(n.dataset.ink!),
    pop: resolveColor(n.dataset.pop!),
    text: resolveColor(n.dataset.text!),
    accent: resolveColor(n.dataset.accent!),
  }));
  const apply = (d: (typeof data)[number]) => ({ '--stage-bg': d.bg, '--stage-ink': d.ink, '--stage-text': d.text, '--pop-body': d.pop, '--pop-accent': d.accent });

  stage.classList.add('stage-pinned');
  gsap.set(stage, apply(data[0]));
  gsap.set(items.slice(1), { autoAlpha: 0 });
  const dots = $('.stage__dots span', stage);
  gsap.set(dots[0], { scale: 1.6, opacity: 1 });

  const art = $('.stage__art', stage)[0];
  const pop = $('.stage__pop', stage)[0];
  const pints = $('.stage__pint', stage);
  const lids = $('.stage__lid', stage);
  const groups = $('.bits', stage).map((g) => $('.bit', g));
  gsap.set(pints.slice(1), { opacity: 0 });
  const more = $('.stage__more', stage)[0]; // cierre "and many more": el último ítem no tiene envase, muestra otras formas de Fruitique
  gsap.set(more, { autoAlpha: 0 });
  gsap.set(lids, { transformOrigin: '50% 9%' });
  gsap.set(groups.flat(), { scale: 0, opacity: 0 });

  // Los detalles brotan de la boca del pint (la línea de corte de la tapa) y vuelven a ella. Se mide con offset* (no le afectan las transformaciones).
  const toMouth = {
    x: (_: number, el: HTMLElement) => (pop.offsetLeft + pop.offsetWidth / 2) - (Number(el.dataset.x) * art.clientWidth / 100),
    y: (_: number, el: HTMLElement) => {
      const cut = Number(pints[groups.findIndex((g) => g.includes(el))].dataset.cut);
      return (pop.offsetTop + pop.offsetHeight * cut / 100) - (Number(el.dataset.y) * art.clientHeight / 100);
    },
  };

  /** Abre el envase i: la tapa sube y los detalles salen disparados. */
  const openTo = (tl: gsap.core.Timeline, i: number, at: number | string) =>
    tl.fromTo(lids[i], { yPercent: 0, rotate: 0 }, { yPercent: -38, rotate: -12, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, at)
      .fromTo(groups[i], { ...toMouth, scale: 0, opacity: 0, rotate: -90 }, { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, duration: 0.7, stagger: 0.04, ease: 'back.out(1.7)', immediateRender: false }, `${at}+=0.15`);

  const steps = items.length - 1;
  const SEG = 2.4; // duración (unidades de timeline) del tramo de cada sabor

  // Entrada: el primer envase llega con la tapa puesta y se abre al aparecer la sección.
  const intro = gsap.timeline({ paused: true });
  intro.from(pop, { scale: 0.6, rotate: -20, duration: 0.6, ease: 'back.out(1.7)' }, 0);
  openTo(intro, 0, 0.5);
  // La entrada y el timeline del scroll escriben sobre los mismos elementos: si la entrada seguía corriendo cuando el scroll ya había cerrado el primer
  // envase, volvía a abrirlo y las fresas se quedaban en pantalla. Por eso la entrada se completa al instante cuando empieza el pin.
  let introDone = false;
  ScrollTrigger.create({ trigger: stage, start: 'top 55%', once: true, onEnter: () => { if (!introDone) intro.play(); } });

  // Un solo timeline atado al scroll: cada tramo cierra el envase anterior, cambia el color, cambia el envase y abre el nuevo.
  // Todos los tweens llevan valores de origen explícitos (fromTo, sin immediateRender) para que avanzar y retroceder sea siempre idéntico.
  const master = gsap.timeline({ defaults: { ease: 'power2.inOut', immediateRender: false } });
  for (let i = 1; i <= steps; i++) {
    const prev = i - 1;
    const t = prev * SEG + 0.001; // el 0.001 evita que el primer detalle se pinte con su valor inicial en el instante 0, antes de que la entrada abra el envase
    const isMore = i >= pints.length; // paso final: sin envase nuevo
    // 1) el envase anterior se cierra: los detalles vuelven a entrar y la tapa baja
    master
      .fromTo(groups[prev], { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }, { ...toMouth, scale: 0, opacity: 0, rotate: 90, duration: 0.35, stagger: 0.015, ease: 'power2.in' }, t)
      .fromTo(lids[prev], { yPercent: -38, rotate: -12 }, { yPercent: 0, rotate: 0, duration: 0.3, ease: 'power2.in' }, t + 0.2)
      // 2) cambia el color de fondo, el texto y el punto activo
      .fromTo(stage, apply(data[prev]), { ...apply(data[i]), duration: 0.8 }, t + 0.35)
      .fromTo(items[prev], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, duration: 0.35 }, t + 0.35)
      .fromTo(items[i], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, t + 0.7)
      .fromTo(dots[prev], { scale: 1.6, opacity: 1 }, { scale: 1, opacity: 0.5, duration: 0.3 }, t + 0.35)
      .fromTo(dots[i], { scale: 1, opacity: 0.5 }, { scale: 1.6, opacity: 1, duration: 0.3 }, t + 0.35)
    // 3) apenas cambia el color, el envase se cambia por el nuevo (se hunde, se intercambia y rebota)
    if (!isMore) {
      master
        .fromTo(pop, { scale: 1, yPercent: 0, rotate: 0 }, { scale: 0.8, yPercent: 14, rotate: i > prev ? -5 : 5, duration: 0.3, ease: 'power2.in' }, t + 0.5)
        .set(pints[prev], { opacity: 0 }, t + 0.8)
        .set(pints[i], { opacity: 1 }, t + 0.8)
        .fromTo(pop, { scale: 0.8, yPercent: 14, rotate: i > prev ? -5 : 5 }, { scale: 1, yPercent: 0, rotate: 0, duration: 0.5, ease: 'back.out(1.8)' }, t + 0.8);
      // 4) y se abre: la tapa sube y salen los detalles
      openTo(master, i, t + 1.1);
    } else {
      // paso final: el envase sale y entra el abanico de otras formas
      master
        .fromTo(pop, { scale: 1, yPercent: 0, opacity: 1 }, { scale: 0.8, yPercent: 14, opacity: 0, duration: 0.35, ease: 'power2.in' }, t + 0.5)
        .fromTo(more, { autoAlpha: 0, y: 40, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, t + 0.9);
    }
  }
  master.set({}, {}, steps * SEG); // el timeline dura exactamente un tramo por sabor

  ScrollTrigger.create({
    trigger: stage, start: 'top top', end: () => `+=${steps * 100}%`, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
    onEnter: () => { introDone = true; intro.progress(1); },
    animation: master, scrub: 0.3, // sin snap: nada se completa solo, el envase abre exactamente lo que avanza el scroll
  });
}

/* ───────────── Líneas de producto: el título sube por palabras, los paneles se abanican y los empaques saltan de adentro ───────────── */
function productLines() {
  const lines = $('.line');
  if (!lines.length) return;
  const title = $('[data-lines-title]')[0];
  if (title) {
    SplitText.create(title, {
      type: 'words',
      mask: 'words',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.words, { yPercent: 120, duration: 0.9, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: title, start: 'top 85%', once: true } });
      },
    });
  }
  gsap.from('[data-lines-lead]', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '[data-lines-lead]', start: 'top 90%', once: true } });

  // El panel de color queda fijo (animarlo dejaba ver el fondo crema detrás = destello); solo entra su contenido.
  // Estado inicial fijado ya y luego solo se anima hacia lo visible.
  lines.forEach((l, i) => {
    gsap.set($('.line__art img', l)[0], { visibility: 'visible', opacity: 0, yPercent: 40, scale: 0.6, rotate: -8 + i * 5 });
    gsap.set($('.line__copy > *', l), { visibility: 'visible', opacity: 0, y: 24 });
  });
  ScrollTrigger.batch(lines, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) => {
      const tl = gsap.timeline();
      batch.forEach((l, i) => {
        const at = i * 0.16;
        tl.to($('.line__art img', l)[0], { opacity: 1, yPercent: 0, scale: 1, rotate: 0, duration: 1.3, ease: 'elastic.out(1, 0.55)' }, at)
          .to($('.line__copy > *', l), { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, at + 0.2);
      });
    },
  });
}

/* ───────────── Recorrido: un tramo rojo recorre el camino central con el scroll; cada foto salta sobre él y el texto entra desde su lado ───────────── */
function journey() {
  const root = $('[data-journey]')[0];
  if (!root) return;
  const run = $('.path__run', root)[0];
  const path = $('.path', root)[0];
  if (run && path) {
    // Con vector-effect: non-scaling-stroke el dash se mide en px de pantalla: medimos el largo real del camino ya estirado.
    const screenLen = () => {
      const m = run.getScreenCTM()!;
      const total = run.getTotalLength();
      let len = 0, prev: DOMPoint | null = null;
      for (let i = 0; i <= 120; i++) {
        const pt = run.getPointAtLength((total * i) / 120).matrixTransform(m);
        if (prev) len += Math.hypot(pt.x - prev.x, pt.y - prev.y);
        prev = pt;
      }
      return len;
    };
    const seg = () => screenLen() * 0.1;
    run.style.strokeDasharray = `${seg()} 99999`;
    gsap.fromTo(run, { strokeDashoffset: () => seg() }, {
      strokeDashoffset: () => -screenLen(), ease: 'none', immediateRender: true,
      scrollTrigger: {
        trigger: path, start: 'top 65%', end: 'bottom 35%', scrub: 0.5, invalidateOnRefresh: true,
        onRefresh: () => { run.style.strokeDasharray = `${seg()} 99999`; },
      },
    });
  }
  $('.step', root).forEach((step, i) => {
    const photo = $('.step__photo', step)[0];
    const text = $('.step__text', step)[0];
    const st = { trigger: step, start: 'top 75%', once: true };
    const side = i % 2 ? 1 : -1;
    gsap.from(photo, { scale: 0.4, rotate: -25 * side, opacity: 0, duration: 1.2, ease: 'back.out(1.8)', scrollTrigger: st });
    gsap.from(text, { x: 70 * side * -1, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2, scrollTrigger: st });
  });
}

/* ───────────── Dónde estamos: el mapa sube al entrar ───────────── */
function whereSections() {
  const map = $('.homemap')[0]; // el marco (el mapa va dentro, derecho)
  if (map) gsap.from(map, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: map, start: 'top 85%', once: true } });
}

/* ───────────── Preguntas: los acordeones se abren y cierran con altura animada ───────────── */
function faqAccordion() {
  const cleanups: Array<() => void> = [];
  $<HTMLDetailsElement>('.faq details').forEach((d) => {
    const summary = $('summary', d)[0];
    if (!summary) return;
    const onClick = (e: Event) => {
      e.preventDefault();
      gsap.killTweensOf(d);
      const closed = summary.offsetHeight;
      if (d.open && d.classList.contains('is-open')) {
        d.classList.remove('is-open');
        gsap.to(d, { height: closed, duration: 0.4, ease: 'power3.inOut', onComplete: () => { d.open = false; gsap.set(d, { clearProps: 'height' }); } });
      } else {
        const from = d.open ? d.offsetHeight : closed;
        d.open = true;
        d.classList.add('is-open');
        const to = d.scrollHeight;
        gsap.fromTo(d, { height: from }, { height: to, duration: 0.5, ease: 'power3.out', onComplete: () => gsap.set(d, { clearProps: 'height' }) });
        gsap.from($('.faq__a p', d), { y: -12, opacity: 0, duration: 0.5, ease: 'power2.out' });
      }
    };
    summary.addEventListener('click', onClick);
    cleanups.push(() => summary.removeEventListener('click', onClick));
  });
  return () => cleanups.forEach((c) => c());
}

/* ───────────── Dónde estamos: la cifra sube al entrar ───────────── */
function countUp() {
  const fmt = new Intl.NumberFormat(document.documentElement.lang === 'es' ? 'es-US' : 'en-US');
  $('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    el.style.minWidth = `${el.offsetWidth}px`; // fija el ancho final para que la frase no se reacomode al contar
    el.textContent = fmt.format(0);
    gsap.to(o, {
      v: end, duration: 1.8, ease: 'power2.out', snap: { v: 1 },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => { el.textContent = fmt.format(o.v); },
    });
  });
}

/* ───────────── Congeladores (Become a Partner): la ficha de color crece y cada congelador aterriza sobre ella ───────────── */
function freezerReveal() {
  // El congelador del hero es lo primero que se ve: entra al cargar, sin esperar scroll.
  const heroUnit = $('[data-freezer-hero]')[0];
  if (heroUnit) {
    gsap.from(heroUnit, { yPercent: 14, scale: 0.9, opacity: 0, transformOrigin: '50% 100%', duration: 1.4, ease: 'back.out(1.3)', delay: 0.35 });
  }

  const groups = $('[data-freezers]');
  if (!groups.length) return;

  // Estado inicial desde JS: sin movimiento (o sin JS) la sección ya se ve completa.
  groups.forEach((group) => {
    gsap.set($('[data-freezer-pad]', group), { scaleY: 0, opacity: 0, transformOrigin: '50% 100%' });
    $('[data-freezer-unit]', group).forEach((u) => {
      // En la franja los laterales llegan desde su lado; el central y los del escaparate suben del suelo.
      const from = u.dataset.freezerFrom;
      gsap.set(u, {
        opacity: 0,
        xPercent: from === 'left' ? -26 : from === 'right' ? 26 : 0,
        yPercent: from === 'left' || from === 'right' ? 6 : 16,
        scale: 0.88,
        transformOrigin: '50% 100%',
      });
    });
    gsap.set($('[data-freezer-copy]', group), { opacity: 0, y: 22 });
  });

  // En batch: los tres congeladores del escaparate entran escalonados cuando van en fila,
  // y cada uno a su turno cuando la rejilla cae a una columna (móvil).
  ScrollTrigger.batch(groups, {
    start: 'top 82%',
    once: true,
    onEnter: (batch) => {
      const tl = gsap.timeline();
      batch.forEach((group, i) => {
        const at = i * 0.16;
        const pads = $('[data-freezer-pad]', group);
        const units = $('[data-freezer-unit]', group);
        const copy = $('[data-freezer-copy]', group);
        if (pads.length) tl.to(pads, { scaleY: 1, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.12 }, at);
        tl.to(units, { opacity: 1, xPercent: 0, yPercent: 0, scale: 1, duration: 1.15, ease: 'back.out(1.5)', stagger: 0.14 }, at + 0.22);
        if (copy.length) tl.to(copy, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06 }, at + 0.5);
      });
    },
  });
}

/* ───────────── Banda final: palabras que suben + botón magnético ───────────── */
function closingBand(fine: boolean) {
  const band = $('.band')[0];
  if (!band) return;
  const title = $('[data-split-words]', band)[0];
  if (title) {
    SplitText.create(title, {
      type: 'words',
      mask: 'words',
      autoSplit: true,
      onSplit(self) {
        gsap.set(self.words, { yPercent: 120 });
        gsap.set(title, { visibility: 'visible' });
        return gsap.to(self.words, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: band, start: 'top 75%', once: true } });
      },
    });
  }
  const btn = $('.band .btn')[0];
  if (btn && fine) {
    const x = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
    const y = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.35);
      y((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => { x(0); y(0); };
    btn.addEventListener('pointermove', move);
    btn.addEventListener('pointerleave', leave);
    return () => { btn.removeEventListener('pointermove', move); btn.removeEventListener('pointerleave', leave); };
  }
}

/* ───────────── Entrada de páginas internas (producto, sabor, listados) ───────────── */
function pageIntro() {
  $('.intro [data-split], .page-hero [data-split], .finder-hero [data-split], .story-hero [data-split]').forEach((title) => {
    SplitText.create(title, {
      type: 'lines',
      mask: 'lines',
      maskClass: 'sp-mask',
      autoSplit: true,
      onSplit(self) {
        self.masks.forEach((m: HTMLElement) => { m.style.paddingBottom = '.35em'; m.style.marginBottom = '-.35em'; });
        gsap.set(title, { visibility: 'visible' });
        return gsap.from(self.lines, { yPercent: 145, rotate: 3, duration: 1, stagger: 0.1, ease: 'expo.out', delay: 0.05 });
      },
    });
  });
  const hero = $('.page-hero')[0];
  if (!hero) return;
  gsap.from('.page-hero [data-hero-fade]', { y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out', delay: 0.4 });
  gsap.from('.page-hero .art', { yPercent: -120, rotate: -20, duration: 1.5, ease: 'elastic.out(1, 0.5)', delay: 0.3 });
  gsap.to('.page-hero .art', { y: -10, rotate: 11, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: 5, delay: 2 });
}

/* ───────────── Manifiesto de Nuestra Historia: cada línea sube desde una máscara al entrar en pantalla ───────────── */
function storyScrub() {
  const p = $('[data-rise-lines]')[0];
  if (!p) return;
  SplitText.create(p, {
    type: 'lines',
    mask: 'lines',
      maskClass: 'sp-mask',
    autoSplit: true,
    onSplit(self) {
      self.masks.forEach((m: HTMLElement) => { m.style.paddingBottom = '.35em'; m.style.marginBottom = '-.35em'; });
      gsap.set(p, { visibility: 'visible' });
      return gsap.from(self.lines, {
        yPercent: 145, rotate: 3, duration: 1, stagger: 0.12, ease: 'expo.out',
        scrollTrigger: { trigger: p, start: 'top 85%', once: true },
      });
    },
  });
}

/* ───────────── "For those who…": cada frase entra desde su lado, palabra a palabra ───────────── */
function forThose() {
  $('[data-for-line]').forEach((p, i) => {
    const dir = i % 2 ? 1 : -1;
    SplitText.create(p, {
      type: 'words',
      autoSplit: true,
      onSplit(self) {
        gsap.set(p, { visibility: 'visible' });
        return gsap.from(self.words, {
          x: 70 * dir, opacity: 0, rotate: 4 * dir, duration: 0.9, stagger: 0.05, ease: 'expo.out',
          scrollTrigger: { trigger: p, start: 'top 88%', once: true },
        });
      },
    });
  });
}

/* ───────────── Foto principal de sabor/producto: zoom suave con el scroll (un solo efecto por página) ───────────── */
function parallaxImages() {
  $('[data-parallax]').forEach((img) => {
    gsap.fromTo(img, { scale: 1.22, yPercent: -6 }, {
      scale: 1, yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: img.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}
