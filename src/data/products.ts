import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- BAGS (4 items) ---
  {
    id: 'bag-1',
    name: 'Presh Royale Quilted Chain Bag',
    category: 'Bags',
    price: 48500,
    image: '/assets/products/bag_1.jpg',
    description: 'Ultra-luxurious chevron quilted shoulder bag with heavy 18k champagne gold hardware, convertible slide chain strap, and smooth lambskin finish.',
    colors: [
      { name: 'Berry Pink', hex: '#A80050' },
      { name: 'Black', hex: '#111111' },
      { name: 'Nude', hex: '#D2B48C' },
      { name: 'Gold', hex: '#D4AF37' }
    ],
    defaultColor: 'Berry Pink',
    featured: true
  },
  {
    id: 'bag-2',
    name: 'Luxe Sovereign Executive Tote',
    category: 'Bags',
    price: 55000,
    image: '/assets/products/bag_2.jpg',
    description: 'Generous everyday luxury tote crafted in pebble-grain leather with zip closure, reinforced laptop compartment, and gold monogram lock pendant.',
    colors: [
      { name: 'Brown', hex: '#5C4033' },
      { name: 'Black', hex: '#111111' },
      { name: 'Nude', hex: '#D2B48C' }
    ],
    defaultColor: 'Brown',
    featured: true
  },
  {
    id: 'bag-3',
    name: 'Crystal Velvet Evening Minaudière',
    category: 'Bags',
    price: 38000,
    image: '/assets/products/bag_3.jpg',
    description: 'A showstopping evening clutch wrapped in plush velvet with pavé crystal trim and detachable jewelry cross-body chain. Perfect for weddings & red carpets.',
    colors: [
      { name: 'Pink', hex: '#E01272' },
      { name: 'Red', hex: '#990000' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Black', hex: '#111111' }
    ],
    defaultColor: 'Pink',
    featured: false
  },
  {
    id: 'bag-4',
    name: 'Structured Croc Aristocrat Satchel',
    category: 'Bags',
    price: 46000,
    image: '/assets/products/bag_4.jpg',
    description: 'Timeless architectural top-handle bag featuring embossed crocodile texture, turn-lock fastener, and matching detachable shoulder strap.',
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Brown', hex: '#5C4033' },
      { name: 'White', hex: '#F8F9FA' }
    ],
    defaultColor: 'Black',
    featured: false
  },

  // --- SHOES (4 items) ---
  {
    id: 'shoe-1',
    name: 'Crystal Stiletto Glam Pumps (4-inch)',
    category: 'Shoes',
    price: 42000,
    image: '/assets/products/shoe_1.jpg',
    description: 'Dazzling pointed-toe stiletto adorned with hand-placed crystal brooch ornament and cushioned leather insole designed for high-comfort ceremony wear.',
    colors: [
      { name: 'Nude', hex: '#E6C280' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    defaultColor: 'Nude',
    sizes: ['37', '38', '39', '40', '41', '42'],
    featured: true
  },
  {
    id: 'shoe-2',
    name: 'Strappy Minimalist Metallic Heels',
    category: 'Shoes',
    price: 36500,
    image: '/assets/products/shoe_2.jpg',
    description: 'Sculptural delicate barely-there strap sandals with metallic sheen finish and architectural square-toe silhouette for modern fashionistas.',
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Black', hex: '#111111' },
      { name: 'Pink', hex: '#E01272' }
    ],
    defaultColor: 'Gold',
    sizes: ['37', '38', '39', '40', '41'],
    featured: false
  },
  {
    id: 'shoe-3',
    name: 'Golden Diva Bridal Ankle Sandal',
    category: 'Shoes',
    price: 39000,
    image: '/assets/products/shoe_3.jpg',
    description: 'Romantic evening sandal with criss-cross ankle wrap, shimmering satin straps, and gold stiletto heel that elevates any bridal or reception gown.',
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Nude', hex: '#D2B48C' },
      { name: 'Red', hex: '#A80050' }
    ],
    defaultColor: 'Gold',
    sizes: ['38', '39', '40', '41', '42'],
    featured: true
  },
  {
    id: 'shoe-4',
    name: 'Royal Velvet Statement Stiletto',
    category: 'Shoes',
    price: 45000,
    image: '/assets/products/shoe_4.jpg',
    description: 'Opulent deep-hued velvet pointed pumps accented with shimmering heel cap and padded arch support. A signature statement piece.',
    colors: [
      { name: 'Red', hex: '#8B0000' },
      { name: 'Black', hex: '#111111' },
      { name: 'Brown', hex: '#4A2E18' }
    ],
    defaultColor: 'Red',
    sizes: ['37', '38', '39', '40', '41'],
    featured: false
  },

  // --- PERFUMES (3 items) ---
  {
    id: 'perfume-1',
    name: 'Rose & Oud Royale Eau de Parfum (100ml)',
    category: 'Perfumes',
    price: 52000,
    image: '/assets/products/perfume_1.jpg',
    description: 'An intoxicating oriental floral masterpiece combining Damascus rose, aged Cambodian oud, smoked amber, and warm Madagascar vanilla. Extraordinary 24h sillage.',
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Pink', hex: '#A80050' }
    ],
    defaultColor: 'Gold',
    featured: true
  },
  {
    id: 'perfume-2',
    name: 'Amber Vanilla Blossom Intense (100ml)',
    category: 'Perfumes',
    price: 48000,
    image: '/assets/products/perfume_2.jpg',
    description: 'Seductive gourmand elixir with candied jasmine, bourbon vanilla, sparkling bergamot, and white musk. Radiant and feminine.',
    colors: [
      { name: 'Nude', hex: '#D2B48C' },
      { name: 'Pink', hex: '#F8DDE8' }
    ],
    defaultColor: 'Pink',
    featured: false
  },
  {
    id: 'perfume-3',
    name: 'Golden Nectar Extrait de Parfum (85ml)',
    category: 'Perfumes',
    price: 58000,
    image: '/assets/products/perfume_3.jpg',
    description: 'A rare high-concentration luxury perfume extract boasting honeyed orange blossom, rare saffron, cedarwood, and rich golden amber drops.',
    colors: [
      { name: 'Gold', hex: '#D4AF37' }
    ],
    defaultColor: 'Gold',
    featured: true
  },

  // --- JEWELRY (3 items) ---
  {
    id: 'jewelry-1',
    name: '18k Gold Dipped Royal Choker & Drop Earrings',
    category: 'Jewelry',
    price: 62000,
    image: '/assets/products/jewelry_1.jpg',
    description: 'Traditional royal Nigerian bridal jewelry suite. Intricately filigreed 18k yellow gold electroplating with micro-zirconia gemstones and matched drop earrings.',
    colors: [
      { name: 'Gold', hex: '#D4AF37' }
    ],
    defaultColor: 'Gold',
    featured: true
  },
  {
    id: 'jewelry-2',
    name: 'Imperial Crystal Tiara & Tennis Suite',
    category: 'Jewelry',
    price: 49500,
    image: '/assets/products/jewelry_2.jpg',
    description: 'Dazzling cubic zirconia bridal set featuring a regal arched princess tiara, graduated tennis necklace, and drop chandelier earrings.',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Gold', hex: '#D4AF37' }
    ],
    defaultColor: 'White',
    featured: true
  },
  {
    id: 'jewelry-3',
    name: 'Emerald Cut Solitaire Statement Ring',
    category: 'Jewelry',
    price: 34000,
    image: '/assets/products/jewelry_3.jpg',
    description: 'Flawless emerald-cut lab simulated diamond set on a polished 18k gold band with hidden halo pavé accents.',
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'White', hex: '#E5E4E2' }
    ],
    defaultColor: 'Gold',
    featured: false
  }
];
