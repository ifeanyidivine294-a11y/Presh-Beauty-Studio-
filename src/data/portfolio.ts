export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Traditional' | 'Glam' | 'Reception';
  image: string;
  tag: string;
  description: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The Royal White Bridal Gele & Veil',
    category: 'Bridal',
    image: '/assets/presh/portfolio_1.jpg',
    tag: 'White Wedding Glam',
    description: 'Pristine lace veil harmony with sculpted soft-glam brows, nude ombré gloss, and crystal chandelier ear accents.'
  },
  {
    id: 'port-2',
    title: 'Radiant Honey Bronze Soft Glam',
    category: 'Glam',
    image: '/assets/presh/portfolio_2.jpg',
    tag: 'Celebration Look',
    description: 'Golden caramel undertone complexion with feather-light lash density, precision winged liner, and velvety nude pout.'
  },
  {
    id: 'port-3',
    title: 'Imperial Berry Wine Traditional Gele',
    category: 'Traditional',
    image: '/assets/presh/portfolio_3.jpg',
    tag: 'Traditional Marriage (Igba Nkwu)',
    description: 'Masterfully pleated deep burgundy Nigerian Gele paired with matching ruby jewel neckline and sunset rose glow.'
  },
  {
    id: 'port-4',
    title: 'Velvet Plum Evening Reception Glam',
    category: 'Reception',
    image: '/assets/presh/portfolio_4.jpg',
    tag: 'Evening Reception',
    description: 'High-pigment smokey cranberry shadow artistry with glass skin radiance and side-parted Hollywood bridal wave.'
  }
];
