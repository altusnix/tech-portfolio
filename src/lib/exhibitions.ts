export interface Exhibition {
  title: string;
  venue: string;
  city: string;
  date: string;
  // filename within src/assets/art-portfolio/
  image: string;
}

export const exhibitions: Exhibition[] = [
  {
    title: 'Rebirth',
    venue: 'Grosse Pointe War Memorial',
    city: 'Grosse Pointe, MI',
    date: 'February 2026',
    image: '14.jpg',
  },
  {
    title: 'Duality',
    venue: 'Art.Fait at The Indra Gallery',
    city: 'London',
    date: 'October 2025',
    image: '9.jpeg',
  },
  {
    title: 'The Incredible Lightness of Art II',
    venue: 'Philadelphia/TriState Artists Equity',
    city: 'Philadelphia, PA',
    date: 'September 2025',
    image: '5.jpeg',
  },
  {
    title: 'Process & Material',
    venue: 'The Crooked Tree',
    city: 'Petoskey, MI',
    date: 'September 2025',
    image: '1.jpeg',
  },
  {
    title: '2025 Thumb Area Artists Exhibition',
    venue: 'Starkweather Arts Center',
    city: 'Romeo, MI',
    date: 'September 2025',
    image: '8.jpeg',
  },
  {
    title: "Here's Me",
    venue: 'Grosse Pointe Artists Association',
    city: 'Grosse Pointe, MI',
    date: 'October 2025',
    image: 'me.jpg',
  },
  {
    title: 'Mindblowing',
    venue: 'Grosse Pointe Artists Association',
    city: 'Grosse Pointe, MI',
    date: 'August 2025',
    // TODO: old site reused 5.jpeg for both this and "The Incredible
    // Lightness of Art II" above — that's the bug the roadmap flagged.
    // Swapped in 4.jpeg (previously unused) as a placeholder; confirm
    // this is actually the right piece for this show.
    image: '4.jpeg',
  },
  {
    title: 'Pancakes & Booze Popup Art Show',
    venue: 'Tangent Gallery',
    city: 'Detroit, MI',
    date: 'August 2025',
    image: '11.jpeg',
  },
  {
    title: 'The Dark Side 2025',
    venue: 'Boomer Gallery',
    city: 'London',
    date: 'July 2025',
    image: '3.jpeg',
  },
  {
    title: 'FUNGI Art Show',
    venue: 'BWAC',
    city: 'Brooklyn, NY',
    date: 'June 2025',
    image: '2.jpeg',
  },
  {
    title: 'Nasty Women Gallery Show',
    venue: 'Nasty Women Gallery Show',
    city: 'Chicago, IL',
    date: '2020',
    image: 'hands2.jpeg',
  },
];
