import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  Heart,
  ShoppingBag,
  Star,
  Check,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setActiveView,
    setIsCartOpen
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPlating, setSelectedPlating] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);

  const currentPlating =
    selectedPlating || (product.platingOptions && product.platingOptions[0]) || 'Gold Plated';
  const currentSize =
    selectedSize || (product.sizes && product.sizes[0]) || '';

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    setPincodeStatus(`Available! Standard delivery by 26 Oct to ${pincode} · Free Shipping`);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, currentSize, currentPlating);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentSize, currentPlating);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setActiveView('checkout');
  };

  const handleViewFullDetails = () => {
    setSelectedProduct(product);
    setQuickViewProduct(null);
    setActiveView('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden border border-[#C5A880]/30 my-8">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 rounded-full shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Area */}
          <div className="p-6 bg-[#FBF9F5] flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded overflow-hidden border border-stone-200 bg-white shadow-inner">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#141311] text-[#D4AF37] text-xs font-semibold px-2.5 py-1 tracking-wider uppercase">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded overflow-hidden border-2 shrink-0 ${
                      activeImageIndex === idx ? 'border-[#B48C2B]' : 'border-stone-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="text-[#8C7657] uppercase tracking-wider font-semibold">
                  {product.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>SKU: {product.sku}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">In Stock</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-serif text-stone-900 font-medium leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-semibold text-stone-800">{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount} verified customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-serif font-bold text-stone-900">
                  ₹{product.price.toLocaleString('en-IN')}{product.id === 'prod-05' ? ' / 1 pc' : ''}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-stone-500">Inclusive of all taxes</span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-stone-600 mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Plating Option */}
              {product.platingOptions && product.platingOptions.length > 0 && (
                <div className="mt-4">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-2">
                    Finish / Plating: <span className="text-[#8C7657] font-normal">{currentPlating}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.platingOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedPlating(opt)}
                        className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                          currentPlating === opt
                            ? 'bg-[#141311] text-[#D4AF37] border-[#141311]'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Option if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                      Select Size:
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                          currentSize === s
                            ? 'bg-[#141311] text-[#D4AF37] border-[#141311]'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Pin Code checker */}
              <div className="mt-5 p-3 bg-[#FAF8F5] rounded border border-[#EBE4DC]">
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter Indian PIN Code (e.g. 400050)"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium rounded transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className="mt-2 text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> {pincodeStatus}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-stone-800 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-[#141311] hover:bg-[#2A2724] text-[#FCFBF7] text-xs font-semibold rounded tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded border transition-colors ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-stone-300 text-stone-600 hover:text-rose-600'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-4 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] text-xs font-bold rounded tracking-wider uppercase transition-colors shadow flex items-center justify-center gap-2"
              >
                <span>Buy Now with 1-Click</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  onClick={handleViewFullDetails}
                  className="text-xs font-medium text-[#8C7657] hover:underline"
                >
                  View Full Product Specifications & Certifications &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
