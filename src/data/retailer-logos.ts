/** Logos de cadenas (marcas de terceros) en `public/logos/retailers/`, por slug de `retailers` (src/data/locations.ts). Sin logo: HCA Florida, Vicente's y Western Beef (no hay archivo oficial). */
const files: Record<string, string> = {
  cvs: 'cvs.svg',
  walmart: 'walmart.svg',
  'winn-dixie': 'winn-dixie.svg',
  'bravo-supermarket': 'bravo-supermarket.png',
  sedanos: 'sedanos.png',
  'presidente-supermarket': 'presidente-supermarket.png',
  'memorial-healthcare-system': 'memorial-healthcare-system.svg',
  'milams-market': 'milams-market.png',
};
export const retailerLogo = (slug: string) => (files[slug] ? `/logos/retailers/${files[slug]}` : undefined);
