import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    sku: 'DC-01-MNG',
    name: 'Dual Lotus Pearl Pendant Traditional Mangalsutra',
    category: 'Mangalsutra',
    subCategory: 'Traditional Jewellery',
    price: 249,
    originalPrice: 499,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.27_AM_6a58d55e.jpeg'
    ],
    description: 'Item #1: Handcrafted traditional double-strand auspicious black bead Mangalsutra featuring dual floral pearl medallions centered with ruby-pink drop stones. Inspired by authentic Maharashtrian bridal heritage.',
    material: 'Micro Gold Plated Brass & Auspicious Black Beads',
    stone: 'Rice Pearls & Ruby Simulants',
    weight: '22 grams',
    hallmark: 'The Dnyanuu Collection Authenticity Certified',
    care: 'Store in dry airtight pouch. Keep away from water and direct perfume spray.',
    stock: 25,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    platingOptions: ['Traditional Gold'],
    tags: ['Mangalsutra', 'Traditional', 'Item 1', 'Pearls', 'Best Seller']
  },
  {
    id: 'prod-02',
    sku: 'DC-02-LOTUS',
    name: 'Kamal Lotus Motif Ruby & Pearl Delicate Choker Necklace',
    category: 'Necklaces',
    subCategory: 'Daily Wear Jewellery',
    price: 239,
    originalPrice: 499,
    discountPercent: 52,
    rating: 4.8,
    reviewsCount: 98,
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.26_AM__2__5bbb5c71.jpeg'
    ],
    description: 'Item #2: Minimalist and graceful gold cord choker necklace featuring a blooming lotus motif in ruby-pink stones, flanked by lustrous seed pearl bunches and faceted emerald-green glass beads.',
    material: 'Gold Tone Finish with Adjustable Back Dori',
    stone: 'Pink Lotus Gems, Seed Pearls & Green Crystal Beads',
    weight: '18 grams',
    hallmark: 'The Dnyanuu Collection Stamp',
    care: 'Wipe with soft cotton cloth after use. Store flat.',
    stock: 30,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    platingOptions: ['High-Shine Yellow Gold'],
    tags: ['Necklaces', 'Choker', 'Lotus', 'Item 2', 'Festive']
  },
  {
    id: 'prod-03',
    sku: 'DC-03-CHUD',
    name: 'Maharashtrian Royal Green Glass Bridal Chooda with Pearl Kadas',
    category: 'Bangles',
    subCategory: 'Bridal Jewellery',
    price: 799,
    originalPrice: 1499,
    discountPercent: 47,
    rating: 5.0,
    reviewsCount: 88,
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.26_AM__1__bbdcfafd.jpeg'
    ],
    description: 'Item #3: The auspicious bridal Hirva Chuda set. Features authentic rich bottle-green glass bangles bounded by ornate double-line pearl and ruby-studded gold kadas on both ends. Essential for traditional weddings and festive occasions.',
    material: 'Authentic Indian Glass Bangles with Micro-Gold Plated Kadas',
    stone: 'Seed Pearls, Ruby & Green Gems',
    weight: '65 grams (Complete Wrist Set)',
    hallmark: 'The Dnyanuu Collection Certified',
    care: 'Handle glass with care. Keep in cushioned bangle box provided.',
    stock: 15,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    sizes: ['2.4 (Small - 57mm)', '2.6 (Medium - 60mm)', '2.8 (Large - 63mm)'],
    platingOptions: ['Antique Royal Gold'],
    tags: ['Bangles', 'Chuda', 'Green Bangles', 'Bridal', 'Item 3']
  },
  {
    id: 'prod-04',
    sku: 'DC-04-KADA',
    name: 'Imperial Basra Pearl & Ruby Filigree Kada Set',
    category: 'Bangles',
    subCategory: 'Traditional Jewellery',
    price: 699,
    originalPrice: 1299,
    discountPercent: 46,
    rating: 4.9,
    reviewsCount: 76,
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.26_AM_76070dd1.jpeg'
    ],
    description: 'Item #4: Exquisite luxury bracelet and kada display set featuring multi-layered rice pearls and royal floral filigree kadas encrusted with oval ruby stones and golden bead spacers.',
    material: 'Heavy Gold Tone Brass with Lacquer Anti-Tarnish Finish',
    stone: 'Cultured Pearls & Cabochon Ruby Simulants',
    weight: '85 grams (Set of Kadas)',
    hallmark: 'The Dnyanuu Collection Sealed',
    care: 'Store in moisture-free pouch. Avoid perfume contact.',
    stock: 20,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ['2.4 (Small - 57mm)', '2.6 (Medium - 60mm)', '2.8 (Large - 63mm)'],
    platingOptions: ['24K Micron Gold Plated'],
    tags: ['Bangles', 'Pearl Kada', 'Ruby', 'Festive', 'Item 4']
  },
  {
    id: 'prod-05',
    sku: 'DC-05-MINI',
    name: 'Modern Daily Wear Minimalist Mangalsutra (Single Piece)',
    category: 'Mangalsutra',
    subCategory: 'Daily Wear Jewellery',
    price: 180,
    originalPrice: 350,
    discountPercent: 49,
    rating: 4.9,
    reviewsCount: 164,
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.25_AM__1__03c1668f.jpeg'
    ],
    description: 'Item #5: Special price ₹180 per single piece (Rs. 180/1). Feather-light, modern everyday Mangalsutra on a single auspicious black-bead chain. Available in 3 elegant charm choices: Design 1 (Ruby Floral Cluster), Design 2 (Golden Crescent Chandrakor with pearl drops), and Design 3 (Minimal Curved Pearl Arc).',
    material: 'Gold Tone Alloy & Auspicious Black Beads',
    stone: 'Rice Pearls & Ruby Simulants',
    weight: '8 grams each',
    hallmark: 'The Dnyanuu Collection Stamped',
    care: 'Safe for daily office wear. Wipe clean with dry cotton.',
    stock: 50,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    platingOptions: [
      'Design 1: Ruby Floral Cluster (₹180)',
      'Design 2: Crescent Chandrakor (₹180)',
      'Design 3: Curved Pearl Arc (₹180)'
    ],
    tags: ['Mangalsutra', 'Daily Wear', 'Minimal', 'Rs 180', 'Item 5']
  },
  {
    id: 'prod-06',
    sku: 'DC-06-FLORAL',
    name: 'Jadau Floral Kundan & Meenakari Kada Bangles Set',
    category: 'Bangles',
    subCategory: 'Traditional Jewellery',
    price: 320,
    originalPrice: 650,
    discountPercent: 51,
    rating: 4.8,
    reviewsCount: 65,
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.25_AM_0775e7c6.jpeg'
    ],
    description: 'Item #6: Hand-crafted Jadau floral petal kadas adorned with glistening Kundan stones, emerald-green beads, and ruby red cabochons. Interspaced with pearl beaded bangles for a stunning festive wrist stack.',
    material: 'Micro Gold Polished Brass Base',
    stone: 'Uncut Polki Kundan Glass & Enamel Beads',
    weight: '48 grams',
    hallmark: 'The Dnyanuu Collection Quality Mark',
    care: 'Keep in dry air-tight box.',
    stock: 22,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)'],
    platingOptions: ['Royal Yellow Gold'],
    tags: ['Bangles', 'Kundan', 'Floral Kada', 'Festive', 'Item 6']
  },
  {
    id: 'prod-07',
    sku: 'DC-07-ROYALSET',
    name: 'Royal Chandrakor Bridal Choker, Earrings, Maang Tikka & Mangalsutra Complete Set',
    category: 'Bridal Jewellery',
    subCategory: 'Necklaces',
    price: 549,
    originalPrice: 1199,
    discountPercent: 54,
    rating: 5.0,
    reviewsCount: 195,
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.24_AM_4a010a5d.jpeg'
    ],
    description: 'Item #7: The complete royal bridal ensemble. Includes: (1) Grand Chandrakor crescent ruby and pearl choker necklace with gold dori, (2) Matching crescent jhumka drop earrings, (3) Dainty pearl maang tikka, and (4) Double-line auspicious black bead floral mangalsutra. Everything you need for a majestic festive or wedding look at just ₹549.',
    material: 'Traditional Temple Micro-Gold Polish with Velvet Packaging',
    stone: 'Teardrop Ruby Simulants, Cultured Pearls & Black Beads',
    weight: '95 grams (Complete 4-Piece Ensemble)',
    hallmark: 'The Dnyanuu Collection Master Craft Certified',
    care: 'Complimentary velvet storage pouch included. Avoid direct moisture.',
    stock: 18,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    platingOptions: ['24K Antique Temple Gold'],
    tags: ['Bridal Jewellery', 'Choker Set', 'Earrings', 'Maang Tikka', 'Item 7', 'Best Seller']
  },
  {
    id: 'prod-08',
    sku: 'DC-08-JHUMKA',
    name: 'Royal Basra Pearl Cluster Bell Jhumka Earrings',
    category: 'Earrings',
    subCategory: 'Traditional Jewellery',
    price: 280,
    originalPrice: 599,
    discountPercent: 53,
    rating: 4.9,
    reviewsCount: 112,
    images: [
      '/assets/aistudio/dnyanuu_jhumka_earrings.jpg'
    ],
    description: 'Item #8: Opulent traditional royal bell jhumkas featuring floral stud tops set with cabochon ruby gems and tiered micro seed pearl rows with hanging pearl drops. Perfectly balanced for lightweight comfort.',
    material: '22K Micro Gold Plated Brass',
    stone: 'Ruby Stones & Cultured Seed Pearls',
    weight: '24 grams per pair',
    hallmark: 'The Dnyanuu Collection Stamped',
    care: 'Keep in dry air-tight box. Wipe with soft cotton after wearing.',
    stock: 35,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    platingOptions: ['Antique Royal Gold'],
    tags: ['Earrings', 'Jhumka', 'Pearls', 'Item 8', 'Traditional']
  },
  {
    id: 'prod-09',
    sku: 'DC-09-THUSHI',
    name: 'Authentic Maharashtrian Kolhapuri Thushi Choker Necklace',
    category: 'Necklaces',
    subCategory: 'Traditional Jewellery',
    price: 420,
    originalPrice: 899,
    discountPercent: 53,
    rating: 5.0,
    reviewsCount: 94,
    images: [
      '/assets/aistudio/dnyanuu_kolhapuri_thushi.jpg'
    ],
    description: 'Item #9: The timeless Maharashtrian bridal favorite. Hand-strung rows of golden beads tightly woven into a flexible choker band, centered with a grand floral medallion encrusted with royal ruby petals and pearl drops. Secured with a rich golden adjustable dori.',
    material: 'Traditional Temple Polish Brass with Handwoven Gold Thread',
    stone: 'Kempu Ruby Simulants & Rice Pearls',
    weight: '52 grams',
    hallmark: 'The Dnyanuu Collection Heritage Mark',
    care: 'Handle with care. Store flat in soft velvet pouch.',
    stock: 24,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    platingOptions: ['Traditional Kolhapuri Gold'],
    tags: ['Necklaces', 'Thushi', 'Kolhapuri', 'Item 9', 'Bridal']
  },
  {
    id: 'prod-10',
    sku: 'DC-10-NATH',
    name: 'Royal Peshwai Bridal Pearl & Ruby Clip-On Nath',
    category: 'Traditional Jewellery',
    subCategory: 'Bridal Jewellery',
    price: 160,
    originalPrice: 350,
    discountPercent: 54,
    rating: 4.9,
    reviewsCount: 138,
    images: [
      '/assets/aistudio/dnyanuu_bridal_nath.jpg'
    ],
    description: 'Item #10: Auspicious Maharashtrian Peshwai Nath in iconic paisley mango shape. Handcrafted with fine Basra seed pearls, emerald green and pink ruby gemstones, complete with an elegant pearl-embellished hair-tuck chain. Convenient clip-on mechanism (no piercing required).',
    material: 'Clip-On Micro Gold Plated Brass (No Piercing Needed)',
    stone: 'Basra Pearls, Ruby & Emerald Simulants',
    weight: '7 grams',
    hallmark: 'The Dnyanuu Collection Authenticity Seal',
    care: 'Gently wipe after use. Avoid bending the clip.',
    stock: 40,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    platingOptions: ['Traditional Gold'],
    tags: ['Traditional Jewellery', 'Nath', 'Bridal', 'Peshwai', 'Item 10']
  },
  {
    id: 'prod-11',
    sku: 'DC-11-RING',
    name: 'Imperial Floral Jadau Kundan & Ruby Cocktail Statement Ring',
    category: 'Rings',
    subCategory: 'Traditional Jewellery',
    price: 210,
    originalPrice: 450,
    discountPercent: 53,
    rating: 4.8,
    reviewsCount: 82,
    images: [
      '/assets/aistudio/dnyanuu_kundan_ring.jpg'
    ],
    description: 'Item #11: Majestic cocktail ring centered with an oval ruby gemstone framed by shimmering uncut Polki Kundan petals and a delicate perimeter of seed pearls. Features an adjustable back to fit all finger sizes comfortably.',
    material: 'Micro Gold Plated Brass Alloy with Adjustable Band',
    stone: 'Uncut Polki Kundan, Simulated Ruby & Seed Pearls',
    weight: '16 grams',
    hallmark: 'The Dnyanuu Collection Stamped',
    care: 'Safe for festive wear. Store in velvet ring box.',
    stock: 28,
    isNewArrival: true,
    isBestSeller: false,
    sizes: ['Free Size (Adjustable to fit all fingers)'],
    platingOptions: ['24K Antique Gold'],
    tags: ['Rings', 'Kundan', 'Cocktail Ring', 'Item 11', 'Statement']
  }
];

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Jewellery',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.24_AM_4a010a5d.jpeg'
  },
  {
    id: 'Earrings',
    name: 'Earrings',
    image: '/assets/aistudio/dnyanuu_jhumka_earrings.jpg'
  },
  {
    id: 'Necklaces',
    name: 'Necklaces',
    image: '/assets/aistudio/dnyanuu_kolhapuri_thushi.jpg'
  },
  {
    id: 'Rings',
    name: 'Rings',
    image: '/assets/aistudio/dnyanuu_kundan_ring.jpg'
  },
  {
    id: 'Bangles',
    name: 'Bangles',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.26_AM__1__bbdcfafd.jpeg'
  },
  {
    id: 'Mangalsutra',
    name: 'Mangalsutra',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.27_AM_6a58d55e.jpeg'
  },
  {
    id: 'Traditional Jewellery',
    name: 'Traditional Jewellery',
    image: '/assets/aistudio/dnyanuu_bridal_nath.jpg'
  },
  {
    id: 'Bridal Jewellery',
    name: 'Bridal Jewellery',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.24_AM_4a010a5d.jpeg'
  },
  {
    id: 'Daily Wear Jewellery',
    name: 'Daily Wear Jewellery',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.25_AM__1__03c1668f.jpeg'
  },
  {
    id: 'New Arrivals',
    name: 'New Arrivals',
    image: '/assets/aistudio/dnyanuu_jhumka_earrings.jpg'
  },
  {
    id: 'Best Sellers',
    name: 'Best Sellers',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.24_AM_4a010a5d.jpeg'
  }
];
