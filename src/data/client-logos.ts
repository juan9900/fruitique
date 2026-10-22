/**
 * Marcas que ya venden o sirven Fruitique, tal como las muestra el brochure de la clienta
 * (docs/INFO-COMERCIAL.md §2). Son marcas de terceros: se usan como referencia comercial.
 * Archivos en `public/logos/clients/` (oficiales, de Wikimedia Commons) y en
 * `public/logos/retailers/` los que ya usaba el localizador. Ver docs/ASSETS.md.
 */
export const clientLogos: { name: string; src: string; wide?: boolean }[] = [
  { name: 'Walmart', src: '/logos/retailers/walmart.svg', wide: true },
  { name: 'CVS Health', src: '/logos/retailers/cvs.svg' },
  { name: 'Winn-Dixie', src: '/logos/retailers/winn-dixie.svg', wide: true },
  { name: 'Baptist Health South Florida', src: '/logos/clients/baptist-health.png', wide: true },
  { name: 'HCA Healthcare', src: '/logos/clients/hca-healthcare.svg' },
  { name: 'Memorial Healthcare System', src: '/logos/retailers/memorial-healthcare-system.svg', wide: true },
  { name: 'Marriott', src: '/logos/clients/marriott.svg', wide: true },
  { name: 'NBC News', src: '/logos/clients/nbc-news.svg' },
  { name: 'Telemundo', src: '/logos/clients/telemundo.svg' },
];
