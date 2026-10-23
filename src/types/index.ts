export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  material: string;
  stone: string;
  weight: string;
  hallmark: string;
  care: string;
  stock: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  sizes?: string[];
  platingOptions?: string[];
  tags?: string[];
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedPlating?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  locality?: string;
  city: string;
  state: string;
  pincode: string;
  type: 'home' | 'work' | 'other';
  isDefault: boolean;
}

export interface OrderTimelineStep {
  status: string;
  date: string;
  description: string;
  completed: boolean;
  active?: boolean;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  pointsRedeemed?: number;
  pointsDiscount?: number;
  giftWrap: boolean;
  shippingCharges: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'paid' | 'pending_cod';
  status: OrderStatus;
  deliveryAddress: Address;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  timeline: OrderTimelineStep[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  description: string;
  isActive: boolean;
  expiryDate: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  image?: string;
}

export interface PointTransaction {
  id: string;
  date: string;
  type: 'earned' | 'redeemed' | 'bonus' | 'referral';
  points: number;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  savedAddresses: Address[];
  rewardPoints: number;
  referralCode: string;
  referredCount: number;
  joinedDate: string;
  tier: 'Silver' | 'Gold' | 'Diamond';
}
