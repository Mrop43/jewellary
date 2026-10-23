import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Heart,
  ShoppingBag,
  Share2,
  Check,
  ChevronRight,
  Info,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setActiveView,
    setIsCartOpen,
    products,
    reviews,
    addReview,
    addToast
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [selectedPlating, setSelectedPlating] = useState(
    (product.platingOptions && product.platingOptions[0]) || 'Royal Gold'
  );
  const [selectedSize, setSelectedSize] = useState(
    (product.sizes && product.sizes[0]) || ''
  );
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'hallmark' | 'care' | 'reviews'>('desc');
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  // Zoom lens calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeResult('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    setPincodeResult(`Delivery confirmed to ${pincode} by BlueDart Air · Express Delivery in 3 business days.`);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedPlating);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedPlating);
    setIsCartOpen(false);
    setActiveView('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard! Share with friends.', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      addToast('Please enter your name and review remarks.', 'error');
      return;
    }

    addReview({
      productId: product.id,
      author: reviewAuthor.trim(),
      city: reviewCity.trim() || 'Verified Buyer, India',
      rating: reviewRating,
      title: reviewTitle.trim() || 'Exceptional Craftsmanship',
      comment: reviewComment.trim(),
      verified: true
    });

    setReviewAuthor('');
    setReviewCity('');
    setReviewComment('');
    setReviewTitle('');
    setShowReviewForm(false);
  };

  // Filter reviews for this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Related products from same category or tag
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.subCategory === product.subCategory))
    .slice(0, 4);

  return (
    <div className="bg-[#FCFBF7] py-8 sm:py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => { setSelectedProduct(null); setActiveView('home'); }} className="hover:text-stone-900">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <button onClick={() => { setSelectedProduct(null); setActiveView('shop'); }} className="hover:text-stone-900">
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-800 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Grid: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Interactive Image Gallery with Micro Zoom (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails list */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#B48C2B] shadow-md ring-1 ring-[#D4AF37]'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image with Zoom Lens */}
              <div
                className="relative flex-1 aspect-square rounded-sm overflow-hidden bg-white border border-[#E8DFD5] shadow-sm cursor-crosshair group select-none"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Micro zoom overlay display */}
                {isZoomed && (
                  <div
                    className="absolute inset-0 pointer-events-none hidden md:block bg-no-repeat z-20"
                    style={{
                      backgroundImage: `url(${product.images[activeImageIndex] || product.images[0]})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '240%'
                    }}
                  />
                )}

                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {product.discountPercent > 0 && (
                    <span className="bg-[#141311] text-[#D4AF37] text-xs font-semibold px-2.5 py-1 tracking-wider uppercase shadow">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-[#D4AF37] text-[#141311] text-[10px] font-bold px-2 py-0.5 tracking-widest uppercase shadow">
                      Best Seller
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 z-10">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Hover to zoom details
                </div>
              </div>
            </div>

            {/* Hallmarking & Certificate assurance badges */}
            <div className="p-4 bg-[#F8F4EE] rounded border border-[#EADFD3] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#B48C2B] border border-[#D4AF37]/40">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">BIS 925 Hallmarked</p>
                  <p className="text-[11px] text-stone-500">Includes signed Certificate of Authenticity</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#B48C2B] border border-[#D4AF37]/40">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Anti-Tarnish Plating</p>
                  <p className="text-[11px] text-stone-500">24K Micron Gold + E-coating layer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Buying Controls, Pricing & Pincode (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="text-[#8C7657] font-semibold uppercase tracking-widest">
                    {product.category}
                  </span>
                  <span>·</span>
                  <span>SKU: {product.sku}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                  title="Share jewellery"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-serif text-[#141311] font-medium mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-800">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-stone-400">·</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-[#8C7657] font-medium hover:underline"
                >
                  {product.reviewsCount} Customer Reviews
                </button>
              </div>

              {/* Price Banner */}
              <div className="mt-5 p-4 bg-[#F5EFEB]/60 rounded-sm border border-[#E6DDD2]">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-serif font-bold text-stone-900">
                    ₹{product.price.toLocaleString('en-IN')}{product.id === 'prod-05' ? ' / 1 pc' : ''}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-stone-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercent}% OFF)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Inclusive of all GST taxes · Free Insured Express Delivery across India
                </p>
              </div>

              {/* Plating selector */}
              {product.platingOptions && product.platingOptions.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                      Finish & Plating: <span className="font-normal text-[#8C7657]">{selectedPlating}</span>
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.platingOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedPlating(opt)}
                        className={`px-4 py-2 text-xs font-medium rounded-sm border transition-all ${
                          selectedPlating === opt
                            ? 'bg-[#141311] text-[#D4AF37] border-[#141311] shadow-sm'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                      Select Size:
                    </label>
                    <span className="text-[11px] text-[#8C7657] font-medium cursor-pointer hover:underline">
                      Size Guide (Indian Standards)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-sm border transition-all ${
                          selectedSize === s
                            ? 'bg-[#141311] text-[#D4AF37] border-[#141311] shadow-sm'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-stone-600 hover:bg-stone-100 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-stone-900 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 text-stone-600 hover:bg-stone-100 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-stone-500">
                  {product.stock > 0 ? (
                    <span className="text-emerald-700 font-medium">✓ In Stock (Ready to dispatch)</span>
                  ) : (
                    <span className="text-rose-600">Out of Stock</span>
                  )}
                </span>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-[#141311] hover:bg-[#2A2724] text-[#FCFBF7] text-xs font-semibold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-sm border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-stone-300 text-stone-700 hover:text-rose-600 hover:bg-white'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] text-xs font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                >
                  <span>Buy Now — Instant Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Indian Pincode Delivery Estimator */}
              <div className="mt-6 p-4 bg-white rounded border border-[#E8DFD5] shadow-xs">
                <p className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#9B783E]" /> Check Delivery & COD Availability
                </p>
                <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g. 400050)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors"
                  >
                    Verify
                  </button>
                </form>
                {pincodeResult && (
                  <p className="mt-2 text-xs text-emerald-800 flex items-center gap-1 font-medium bg-emerald-50 p-2 rounded">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{pincodeResult}</span>
                  </p>
                )}
              </div>

              {/* Trust highlights */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#9B783E]" />
                  <span>15-Day Easy Doorstep Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#9B783E]" />
                  <span>100% Certified & Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications & Customer Reviews */}
        <div className="mt-16 border-t border-[#E8DFD5] pt-10">
          <div className="flex items-center gap-6 border-b border-[#E8DFD5] overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-sm font-serif font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'desc'
                  ? 'border-[#B48C2B] text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Description & Craft Story
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-serif font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#B48C2B] text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Material & Specifications
            </button>
            <button
              onClick={() => setActiveTab('hallmark')}
              className={`pb-3 text-sm font-serif font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'hallmark'
                  ? 'border-[#B48C2B] text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Hallmarking Certificate
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 text-sm font-serif font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'care'
                  ? 'border-[#B48C2B] text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Care & Maintenance
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-serif font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-[#B48C2B] text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Verified Reviews ({productReviews.length})
            </button>
          </div>

          <div className="py-6 text-sm text-stone-700 leading-relaxed max-w-3xl">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <p>
                  Every piece of jewellery at Dnyanu Creation is individually inspected under high-magnification
                  microscopes and finished by master karigars in Mumbai and Jaipur. Our goal is to bring heirloom-quality
                  opulence within your reach.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded border border-stone-200">
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block font-semibold">Material / Base Metal</span>
                  <span className="text-stone-900 font-medium">{product.material}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block font-semibold">Stone & Gems</span>
                  <span className="text-stone-900 font-medium">{product.stone}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block font-semibold">Gross Weight</span>
                  <span className="text-stone-900 font-medium">{product.weight}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block font-semibold">Certification</span>
                  <span className="text-stone-900 font-medium">{product.hallmark}</span>
                </div>
              </div>
            )}

            {activeTab === 'hallmark' && (
              <div className="space-y-3 bg-[#FAF8F5] p-5 rounded border border-[#E8DFD5]">
                <h4 className="font-serif text-base font-semibold text-stone-900">
                  Govt. Recognized Hallmarking Standard
                </h4>
                <p>
                  All Dnyanu Creation silver and gold-plated ornaments carry our authentic hallmark stamping. You can
                  verify the purity of your jewelry with any registered assaying laboratory.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C7657]">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>BIS 925 Guaranteed Purity · Nickel-free & Lead-free</span>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                <p>{product.care}</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600">
                  <li>Put on jewellery after using perfumes, sprays, and cosmetics.</li>
                  <li>Clean gently with the complimentary microfibre cloth provided.</li>
                  <li>Store individually in the provided luxury velvet pouch to prevent scratches.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg text-stone-900">Customer Testimonials</h4>
                    <p className="text-xs text-stone-500">Based on verified purchases</p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-[#141311] text-[#D4AF37] text-xs font-medium rounded hover:bg-[#2A2724] transition-colors"
                  >
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </button>
                </div>

                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="bg-white p-5 rounded border border-stone-200 space-y-4">
                    <h5 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                      Share Your Experience with {product.name}
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-stone-700 block mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          placeholder="e.g. Radhika Verma"
                          className="w-full px-3 py-2 text-xs border border-stone-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-stone-700 block mb-1">City / State</label>
                        <input
                          type="text"
                          value={reviewCity}
                          onChange={(e) => setReviewCity(e.target.value)}
                          placeholder="e.g. Mumbai, Maharashtra"
                          className="w-full px-3 py-2 text-xs border border-stone-300 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">Rating</label>
                      <div className="flex items-center gap-1 text-amber-500 cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= reviewRating ? 'fill-current text-amber-500' : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">Review Title</label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Absolutely royal finish!"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">Detailed Review *</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Tell other jewellery lovers about the design, weight, and shine..."
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] text-xs font-bold rounded uppercase tracking-wider transition-colors"
                    >
                      Submit Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {productReviews.length > 0 ? (
                    productReviews.map((rev) => (
                      <div key={rev.id} className="bg-white p-4 rounded border border-stone-100 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-stone-900 text-xs">{rev.author}</span>
                            <span className="text-[11px] text-stone-400">· {rev.city}</span>
                            {rev.verified && (
                              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-current' : 'text-stone-200'
                              }`}
                            />
                          ))}
                        </div>
                        <h5 className="text-xs font-semibold text-stone-800">{rev.title}</h5>
                        <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 bg-white rounded border border-dashed border-stone-300 text-center text-xs text-stone-500">
                      No customer reviews yet. Be the first to share your thoughts on this design!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-[#E8DFD5] pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8C7657] font-semibold">Complete The Ensemble</p>
                <h3 className="text-2xl font-serif text-stone-900">You May Also Cherish</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
