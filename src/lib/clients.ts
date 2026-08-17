export interface ClientLogo {
  name: string;
  src: string;
  // intrinsic pixel dimensions of the source file — rendered size is
  // controlled by CSS, but the browser needs these to reserve layout
  // space and avoid a shift while the image loads
  width: number;
  height: number;
}

// The old site rendered AbbVie, Craftsman, GM, Grainger, Lexus, and Porsche
// as malformed inline data-URIs even though real logo files already existed
// in /icons — swapped to those real files here.
export const clientLogos: ClientLogo[] = [
  { name: 'AbbVie', src: '/icons/abbvie.svg', width: 83, height: 15 },
  { name: 'AHA', src: '/icons/aha-logo.png', width: 1428, height: 772 },
  { name: 'Amana', src: '/icons/amana.png', width: 5251, height: 642 },
  { name: 'Anixter', src: '/icons/anixter-header-logo.png', width: 800, height: 200 },
  { name: 'Bear', src: '/icons/bear.png', width: 290, height: 118 },
  { name: 'Bridgestone', src: '/icons/bridgestone-logo.png', width: 400, height: 87 },
  { name: 'Coca-Cola', src: '/icons/CocaCola.svg', width: 81, height: 29 },
  { name: 'Columbia College', src: '/icons/columbia-college.png', width: 280, height: 80 },
  { name: 'Craftsman', src: '/icons/craftsman-logo-white.png', width: 300, height: 43 },
  { name: 'CST', src: '/icons/Cst-masthead.webp', width: 2779, height: 229 },
  { name: 'Czarnowski', src: '/icons/Czar-Logo-white.png', width: 1600, height: 300 },
  { name: 'DePaul', src: '/icons/depaul.png', width: 1280, height: 168 },
  { name: 'General Motors', src: '/icons/GM.svg', width: 35, height: 35 },
  { name: 'Gladiator', src: '/icons/gladiator_logo.png', width: 320, height: 105 },
  { name: 'Grainger', src: '/icons/Grainger.svg', width: 83, height: 13 },
  { name: 'Kenmore', src: '/icons/Kenmore.png', width: 483, height: 191 },
  { name: 'Lexus', src: '/icons/Lexus.svg', width: 125, height: 93 },
  { name: 'Magnificent Mile', src: '/icons/magmile-logo-light.svg', width: 310, height: 73 },
  { name: "McDonald's", src: '/icons/McDonalds-Logo.png', width: 1134, height: 1135 },
  { name: 'Porsche', src: '/icons/Porsche.svg', width: 86, height: 9 },
  { name: 'Seagen', src: '/icons/Seagen-Logo_White.png', width: 800, height: 260 },
  { name: 'Sears', src: '/icons/sears.svg', width: 176, height: 40 },
  { name: 'TAE', src: '/icons/tae.png', width: 457, height: 150 },
  { name: 'Toyota', src: '/icons/toyota-logo-white.png', width: 500, height: 339 },
  { name: 'U.S. Army', src: '/icons/armyLogo.png', width: 4223, height: 996 },
  { name: 'Whirlpool', src: '/icons/whirlpool-logo.png', width: 512, height: 163 },
  { name: 'Voximetry', src: '/icons/white-logo-v.png', width: 101, height: 141 },
];
