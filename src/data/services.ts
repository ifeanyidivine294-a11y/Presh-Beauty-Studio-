import { StudioService } from '../types';

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'bridal-makeup',
    title: 'Bridal Makeup',
    tagline: 'Look stunning on your special day.',
    price: 85000,
    duration: '2.5 - 3 hours',
    iconName: 'Crown',
    category: 'Bridal',
    image: '/assets/presh/hero_bride_clean.jpg',
    description: 'Bespoke high-definition bridal glam engineered to last 18+ hours through tears of joy, humidity, and flash photography. Includes deluxe skin prep and complimentary luxury touch-up kit.',
    features: [
      'Comprehensive pre-wedding skin prep & glow primer',
      'Long-wear sweat & tear-proof HD base',
      'Custom 3D mink lashes & sculpted brow shaping',
      'Chest, neck & shoulder shimmer contouring',
      'Complimentary bridal touch-up kit (mini lipstick, blotting papers, setting mist)'
    ]
  },
  {
    id: 'event-makeup',
    title: 'Event Makeup',
    tagline: 'Turn heads at every event.',
    price: 35000,
    duration: '1.5 hours',
    iconName: 'Star',
    category: 'Event',
    image: '/assets/presh/portfolio_4.jpg',
    description: 'Sophisticated event glam customized for Owambe celebrations, birthday shoots, red carpet galas, award dinners, or church milestones.',
    features: [
      'Flawless semi-matte or dewy velvet complexion',
      'Smokey, cut-crease, or soft radiant eye artistry',
      'Signature lip combination (ombre nude, ruby red, or gloss)',
      'High-performance 12-hour makeup sealant'
    ]
  },
  {
    id: 'gele-tying',
    title: 'Gele Tying',
    tagline: 'Elegant styles, perfectly tied.',
    price: 15000,
    duration: '45 mins',
    iconName: 'Sparkles',
    category: 'Gele',
    image: '/assets/presh/portfolio_3.jpg',
    description: 'Masterful Nigerian Gele artistry by specialist hands. From crisp infinity geles and pleated fan geles to traditional Aso-Ebi and royal bridal headpieces.',
    features: [
      'Infinity Gele & Pleated Bridal Fan styling',
      'Avant-garde rose & side-ruffle geles',
      'Auto-Gele custom fitting and pinning',
      'Comfort-first tension control to prevent headaches'
    ]
  },
  {
    id: 'makeup-lessons',
    title: 'Makeup Lessons',
    tagline: 'Learn, practice, and grow.',
    price: 75000,
    duration: '1 - 4 Weeks Masterclass',
    iconName: 'GraduationCap',
    category: 'Training',
    image: '/assets/presh/ceo_preview.jpg',
    description: 'Hands-on intensive masterclass sessions with Lead Artist Presh. Designed for both personal beauty mastery and aspiring professional artists.',
    features: [
      'Personal "Do-Your-Own-Makeup" Intensive (3 days)',
      'Pro Artistry & Bridal Glam Masterclass (2 to 4 weeks)',
      'Live model demonstrations & brush techniques',
      'Presh Beauty Studio Certificate of Completion',
      'Product kit recommendations & wholesale supplier contacts'
    ]
  },
  {
    id: 'large-occasion',
    title: 'Bridal Retinue & Large Occasion',
    tagline: 'Group glam for bridesmaids & mother-of-the-day.',
    price: 150000,
    duration: 'Full Day Service',
    iconName: 'Heart',
    category: 'Bridal',
    image: '/assets/presh/portfolio_1.jpg',
    description: 'Dedicated team glam for bridal trains, bridesmaids, mothers, and chief bridesmaids. Coordinated elegance with timely delivery on your wedding morning.',
    features: [
      'Coordinated color palettes matching wedding theme',
      'Express glam stations ensuring zero schedule delay',
      'VIP on-site studio or hotel setup',
      'Touch-up assistance through church service and reception entry'
    ]
  }
];
