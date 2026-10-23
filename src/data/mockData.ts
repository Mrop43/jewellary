import { Coupon, Review, UserProfile, Order, PointTransaction } from '../types';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'FESTIVE15',
    discountType: 'percentage',
    value: 15,
    minOrderValue: 499,
    description: '15% OFF on orders above ₹499 (Max ₹250)',
    isActive: true,
    expiryDate: '2026-12-31'
  },
  {
    code: 'DNYANU50',
    discountType: 'fixed',
    value: 50,
    minOrderValue: 299,
    description: 'Flat ₹50 OFF on orders above ₹299',
    isActive: true,
    expiryDate: '2026-11-30'
  },
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minOrderValue: 180,
    description: 'Instant 10% welcome discount for new shoppers',
    isActive: true,
    expiryDate: '2027-01-01'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'prod-07',
    author: 'Pooja Kulkarni',
    city: 'Pune, Maharashtra',
    rating: 5,
    title: 'Unbelievable value for just ₹549!',
    comment: 'I ordered the 4-piece Chandrakor bridal set for my cousin’s wedding. The necklace, earrings, maang tikka, and mangalsutra are all so well finished. Looks like real traditional heirloom jewellery!',
    date: '12 Oct 2026',
    verified: true,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.24_AM_4a010a5d.jpeg'
  },
  {
    id: 'rev-02',
    productId: 'prod-01',
    author: 'Radhika Deshmukh',
    city: 'Thane, Mumbai',
    rating: 5,
    title: 'Authentic Maharashtrian floral design at ₹249',
    comment: 'The pearl lotus pendant looks gorgeous in person. The black beads are tightly woven and the gold plating has a very royal, rich sheen. Fast BlueDart delivery too!',
    date: '08 Oct 2026',
    verified: true,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.27_AM_6a58d55e.jpeg'
  },
  {
    id: 'rev-03',
    productId: 'prod-03',
    author: 'Sneha Patil',
    city: 'Kolhapur',
    rating: 5,
    title: 'Pure traditional green glass bridal chuda',
    comment: 'The green glass bangles with pearl kadas (₹799) fit my wrists perfectly (size 2.6). Safely packed without a single crack. 10/10 unboxing experience!',
    date: '28 Sep 2026',
    verified: true,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.26_AM__1__bbdcfafd.jpeg'
  },
  {
    id: 'rev-04',
    productId: 'prod-05',
    author: 'Ananya Sharma',
    city: 'Bandra, Mumbai',
    rating: 5,
    title: '₹180 per piece is such a steal!',
    comment: 'I bought all 3 daily wear mangalsutra designs. They are so lightweight for office and daily chores. Zero neck strain and look very classy.',
    date: '19 Sep 2026',
    verified: true,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.25_AM__1__03c1668f.jpeg'
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-901',
  name: 'Soham Sawant',
  email: 'soham.sawant@example.com',
  phone: '+91 98200 12345',
  rewardPoints: 120,
  referralCode: 'DNYANU-SOHAM-42',
  referredCount: 3,
  joinedDate: 'Jan 2026',
  tier: 'Gold',
  savedAddresses: [
    {
      id: 'addr-01',
      name: 'Soham Sawant',
      phone: '+91 98200 12345',
      street: 'Flat 402, Royal Palms Heights, Linking Road',
      locality: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      type: 'home',
      isDefault: true
    },
    {
      id: 'addr-02',
      name: 'Soham Sawant',
      phone: '+91 98200 12345',
      street: '7th Floor, Cyberscape Business Park, Viman Nagar',
      locality: 'Viman Nagar',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411014',
      type: 'work',
      isDefault: false
    }
  ]
};

export const INITIAL_POINT_TRANSACTIONS: PointTransaction[] = [
  {
    id: 'pt-01',
    date: '20 Oct 2026',
    type: 'referral',
    points: 50,
    description: 'Referral reward: Friend Priya completed first order'
  },
  {
    id: 'pt-02',
    date: '14 Oct 2026',
    type: 'earned',
    points: 30,
    description: 'Reward points earned on Order #DC-2026-8841'
  },
  {
    id: 'pt-03',
    date: '01 Oct 2026',
    type: 'bonus',
    points: 40,
    description: 'Gold Tier Welcome Bonus'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8841',
    orderNumber: 'DC-2026-8841',
    date: '14 Oct 2026',
    items: [
      {
        id: 'cart-item-1',
        productId: 'prod-07',
        product: {
          id: 'prod-07',
          sku: 'DC-07-ROYALSET',
          name: 'Royal Chandrakor Bridal Choker, Earrings, Maang Tikka & Mangalsutra Complete Set',
          category: 'Bridal Jewellery',
          price: 549,
          originalPrice: 1199,
          discountPercent: 54,
          rating: 5.0,
          reviewsCount: 195,
          images: [
            '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.24_AM_4a010a5d.jpeg'
          ],
          description: 'Item #7: The complete royal bridal ensemble at ₹549.',
          material: 'Traditional Temple Micro-Gold Polish',
          stone: 'Ruby Simulants, Cultured Pearls & Black Beads',
          weight: '95 grams',
          hallmark: 'The Dnyanuu Collection Certified',
          care: 'Complimentary velvet storage pouch included.',
          stock: 18,
          platingOptions: ['24K Antique Temple Gold']
        },
        quantity: 1,
        selectedPlating: '24K Antique Temple Gold'
      }
    ],
    subtotal: 549,
    discount: 50,
    couponCode: 'DNYANU50',
    pointsRedeemed: 0,
    pointsDiscount: 0,
    giftWrap: false,
    shippingCharges: 0,
    total: 499,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    status: 'Shipped',
    deliveryAddress: INITIAL_USER.savedAddresses[0],
    trackingNumber: 'DC-BD-99238472',
    carrier: 'BlueDart Express Air',
    estimatedDelivery: '25 Oct 2026',
    timeline: [
      {
        status: 'Order Placed',
        date: '14 Oct, 03:30 PM',
        description: 'Order placed & payment verified via UPI (Google Pay)',
        completed: true
      },
      {
        status: 'Confirmed',
        date: '14 Oct, 04:15 PM',
        description: 'Order confirmed by The Dnyanuu Collection Studio',
        completed: true
      },
      {
        status: 'Processing',
        date: '15 Oct, 11:00 AM',
        description: 'Jewellery inspected, quality stamped & packed in velvet box',
        completed: true
      },
      {
        status: 'Shipped',
        date: '16 Oct, 06:45 PM',
        description: 'Dispatched via BlueDart Express (Air Courier). AWB: DC-BD-99238472',
        completed: true,
        active: true
      },
      {
        status: 'Out for Delivery',
        date: 'Pending',
        description: 'Courier agent will deliver to Bandra West address',
        completed: false
      },
      {
        status: 'Delivered',
        date: 'Pending',
        description: 'Package handed over with OTP verification',
        completed: false
      }
    ]
  }
];

export const FAQS = [
  {
    category: 'The Dnyanuu Collection Authenticity',
    q: 'Are these authentic traditional jewellery pieces?',
    a: 'Yes, 100%! All our jewellery in The Dnyanuu Collection is handcrafted with high-grade micro-gold plating, genuine glass bangles, lustrous pearls, and auspicious black beads. Every piece comes safely packaged in our signature velvet pouch.'
  },
  {
    category: 'Item Serial Pricing',
    q: 'What are the official prices of the 7 collection items?',
    a: 'Our collection is priced with direct-from-artisan affordability: Item 1 (Dual Lotus Mangalsutra) - ₹249, Item 2 (Lotus Ruby Choker) - ₹239, Item 3 (Green Bridal Chuda with Pearl Kadas) - ₹799, Item 4 (Pearl & Ruby Filigree Kada Set) - ₹699, Item 5 (Daily Wear Minimal Mangalsutra) - ₹180 per piece, Item 6 (Jadau Floral Kundan Bangles) - ₹320, Item 7 (Complete 4-Piece Royal Bridal Set) - ₹549.'
  },
  {
    category: 'Shipping & Delivery',
    q: 'What are the delivery times and shipping charges across India?',
    a: 'We offer express delivery across India. Metro cities usually receive orders within 3 to 4 business days via BlueDart or Delhivery.'
  },
  {
    category: 'Payment & Cash on Delivery',
    q: 'Do you offer Cash on Delivery (COD) and UPI payments?',
    a: 'Yes! We support all Indian payment options including Google Pay, PhonePe, Paytm, RuPay, Credit/Debit cards, NetBanking, and Cash on Delivery (COD).'
  },
  {
    category: 'Returns & Exchange',
    q: 'What is your return policy?',
    a: 'We offer an easy 15-day return and exchange policy if there is any sizing mismatch or transit damage. Simply initiate a request from your account or WhatsApp.'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'insta-1',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.24_AM_4a010a5d.jpeg',
    caption: 'Royal Chandrakor Bridal Choker Complete Set at only ₹549. ✨ #TheDnyanuuCollection #BridalJewellery',
    likes: '2.4k',
    productTag: 'Item #7: Royal Chandrakor Set (₹549)'
  },
  {
    id: 'insta-2',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.26_AM__1__bbdcfafd.jpeg',
    caption: 'Traditional Maharashtrian Hirva Chuda with pearl kadas at ₹799. 💚 #MaharashtrianBride #DnyanuuBangles',
    likes: '1.8k',
    productTag: 'Item #3: Bridal Green Chuda (₹799)'
  },
  {
    id: 'insta-3',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.25_AM__1__03c1668f.jpeg',
    caption: 'Daily wear minimal Mangalsutra trio at just ₹180 each. 💫 #MinimalJewellery #DailyWear',
    likes: '3.1k',
    productTag: 'Item #5: Daily Wear Mangalsutra (₹180/pc)'
  },
  {
    id: 'insta-4',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.27_AM_6a58d55e.jpeg',
    caption: 'Dual lotus pearl pendant traditional Mangalsutra at ₹249. 🌸 #TraditionalJewellery #DnyanuuCollection',
    likes: '1.5k',
    productTag: 'Item #1: Dual Lotus Mangalsutra (₹249)'
  }
];
