export type Product = {
  id: string;
  name: string;
  category: 'Clothing' | 'Bags' | 'Shoes' | 'Accessories';
  price: number;
  oldPrice?: number;
  color: string;
  colorName: string;
  description: string;
  image: string;
  badge?: string;
};

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;

export const products: Product[] = [
  {
    id: 'linen-dress',
    name: 'The Linen Column Dress',
    category: 'Clothing',
    price: 148,
    color: '#D6C8AE',
    colorName: 'Oat',
    description: 'An effortless silhouette in airy European linen. Cut on the bias with a softly defined waist and a clean, ankle-grazing finish.',
    image: photo('photo-1539109136881-3be0616acf4b'),
    badge: 'Bestseller',
  },
  {
    id: 'everyday-tote',
    name: 'Everyday Leather Tote',
    category: 'Bags',
    price: 218,
    color: '#725344',
    colorName: 'Chestnut',
    description: 'A considered carryall crafted in supple, responsibly sourced leather. Room for the things you use every day.',
    image: photo('photo-1584917865442-de89df76afd3'),
  },
  {
    id: 'soft-knit',
    name: 'Soft Touch Knit',
    category: 'Clothing',
    price: 124,
    oldPrice: 158,
    color: '#C4B9AB',
    colorName: 'Stone',
    description: 'A relaxed, tactile knit with an easy drape. Made for slow mornings and longer evenings.',
    image: photo('photo-1551163943-3f6a855d1153'),
    badge: 'New',
  },
  {
    id: 'woven-flats',
    name: 'Woven Leather Flats',
    category: 'Shoes',
    price: 176,
    color: '#A77B5A',
    colorName: 'Cognac',
    description: 'Hand-finished woven leather with a cushioned insole and a walk-everywhere profile.',
    image: photo('photo-1543163521-1bf539c55dd2'),
  },
  {
    id: 'weekend-shirt',
    name: 'Weekend Poplin Shirt',
    category: 'Clothing',
    price: 112,
    color: '#E8E3D8',
    colorName: 'Ivory',
    description: 'Crisp cotton poplin, a generous cut, and the little details that make it a keeper.',
    image: photo('photo-1598554747436-c9293d6a588f'),
    badge: 'New',
  },
  {
    id: 'crescent-bag',
    name: 'The Crescent Shoulder Bag',
    category: 'Bags',
    price: 196,
    color: '#6D493D',
    colorName: 'Espresso',
    description: 'A softly structured shoulder bag with a sculptural profile and just enough room for the essentials.',
    image: photo('photo-1590874103328-eac38a683ce7'),
  },
  {
    id: 'silk-scarf',
    name: 'Silk Twill Scarf',
    category: 'Accessories',
    price: 68,
    color: '#9A7864',
    colorName: 'Rosewood',
    description: 'A light-catching silk twill finished by hand. Wear it loose, tied, or wrapped around your favourite bag.',
    image: photo('photo-1601924994987-69e26d50dc26'),
  },
  {
    id: 'tailored-trouser',
    name: 'The Relaxed Trouser',
    category: 'Clothing',
    price: 138,
    color: '#67695B',
    colorName: 'Moss',
    description: 'A fluid tailored trouser with a soft front pleat and a polished, relaxed fit.',
    image: photo('photo-1509631179647-0177331693ae'),
  },
];

export const categories = ['All', 'Clothing', 'Bags', 'Shoes', 'Accessories'] as const;
