export type ProductCategory = 'Bags' | 'Shoes' | 'Jewelry' | 'Perfumes';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  colors: { name: string; hex: string }[];
  defaultColor: string;
  sizes?: string[]; // for shoes
  description: string;
  featured?: boolean;
}

export interface StudioService {
  id: string;
  title: string;
  tagline: string;
  price: number;
  duration: string;
  iconName: 'Crown' | 'Sparkles' | 'Star' | 'GraduationCap' | 'Heart' | 'Scissors';
  description: string;
  features: string[];
  image?: string;
  category: 'Bridal' | 'Event' | 'Gele' | 'Training';
}

export interface CartItem {
  cartId: string;
  itemId: string;
  name: string;
  category: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
  itemType: 'product' | 'service';
}

export interface OrderBookingState {
  // Booking or shopping mode
  orderType: 'service' | 'product';
  occasionType: 'personal' | 'large'; // 'Personal Makeup' | 'Large Occasion'
  
  // Customer Details
  fullName: string;
  phoneNumber: string;
  email: string;
  homeAddress: string;
  
  // Item/Service Details
  serviceId?: string;
  productCategory: ProductCategory | 'Services';
  productName: string;
  selectedColor: string;
  shoeSize: string;
  quantity: number;
  qualityGrade: 'Standard' | 'Premium';
  additionalNotes: string;

  // Delivery / Studio visit
  deliveryMethod: 'waybill' | 'pickup';
  destinationState: string;
  destinationTown: string;
  waybillAddress: string;
  nearestBusStop: string;
  pickupDate: string;
  pickupTime: string;

  // Multiple items if from Cart Checkout
  cartItems?: CartItem[];
}
