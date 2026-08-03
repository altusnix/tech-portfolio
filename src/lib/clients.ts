export interface ClientLogo {
  name: string;
  src: string;
}

// The old site rendered AbbVie, Craftsman, GM, Grainger, Lexus, and Porsche
// as malformed inline data-URIs even though real logo files already existed
// in /icons — swapped to those real files here.
export const clientLogos: ClientLogo[] = [
  { name: 'AbbVie', src: '/icons/abbvie.svg' },
  { name: 'AHA', src: '/icons/aha-logo.png' },
  { name: 'Amana', src: '/icons/amana.png' },
  { name: 'Anixter', src: '/icons/anixter-header-logo.png' },
  { name: 'Bear', src: '/icons/bear.png' },
  { name: 'Bridgestone', src: '/icons/bridgestone-logo.png' },
  { name: 'Coca-Cola', src: '/icons/CocaCola.svg' },
  { name: 'Columbia College', src: '/icons/columbia-college.png' },
  { name: 'Craftsman', src: '/icons/craftsman-logo-white.png' },
  { name: 'CST', src: '/icons/Cst-masthead.webp' },
  { name: 'Czarnowski', src: '/icons/Czar-Logo-white.png' },
  { name: 'DePaul', src: '/icons/depaul.png' },
  { name: 'General Motors', src: '/icons/GM.svg' },
  { name: 'Gladiator', src: '/icons/gladiator_logo.png' },
  { name: 'Grainger', src: '/icons/Grainger.svg' },
  { name: 'Kenmore', src: '/icons/Kenmore.png' },
  { name: 'Lexus', src: '/icons/Lexus.svg' },
  { name: 'Magnificent Mile', src: '/icons/magmile-logo-light.svg' },
  { name: "McDonald's", src: '/icons/McDonalds-Logo.png' },
  { name: 'Porsche', src: '/icons/Porsche.svg' },
  { name: 'Seagen', src: '/icons/Seagen-Logo_White.png' },
  { name: 'Sears', src: '/icons/sears.svg' },
  { name: 'TAE', src: '/icons/tae.png' },
  { name: 'Toyota', src: '/icons/toyota-logo-white.png' },
  { name: 'U.S. Army', src: '/icons/armyLogo.png' },
  { name: 'Whirlpool', src: '/icons/whirlpool-logo.png' },
  // TODO: old site labeled this generic "Client Logo" with no real brand
  // name attached anywhere — confirm who this is or drop it
  { name: 'TODO: unidentified client', src: '/icons/white-logo-v.png' },
];
