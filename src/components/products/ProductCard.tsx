import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setQuickViewProduct,
    setActiveView
  } = useShop();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product);
    setActiveView('shop');
  };

  return (
    <div className="group relative flex flex-col bg-white border border-[#EBE4DC] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#C5A880]/60 text-left">
      {/* Product Image Area */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-[#FBF9F5] cursor-pointer"
        onClick={handleCardClick}
        onMouseEnter={() => {
          if (product.images.length > 1) setCurrentImageIndex(1);
        }}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Discount Badge & Status */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.tags && product.tags.find(t => t.startsWith('Item')) && (
            <span className="bg-[#141311] text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase border border-[#C5A880]/50 shadow-xs">
              {product.tags.find(t => t.startsWith('Item'))}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-[#D4AF37] text-[#141311] text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && !product.tags?.find(t => t.startsWith('Item')) && (
            <span className="bg-[#D4AF37] text-[#141311] text-[9px] font-bold px-1.5 py-0.5 tracking-widest uppercase">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-stone-700 hover:text-rose-600 hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-500' : ''}`} />
        </button>

        {/* Quick View Trigger on Hover */}
        <div className="absolute inset-x-2 bottom-2 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-[#141311] text-stone-800 hover:text-[#D4AF37] text-xs font-medium rounded-sm border border-stone-200 shadow-md backdrop-blur-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata (Rule: No static pills) */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1.5">
            <span className="uppercase tracking-wider font-medium text-[#8C7657]">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>SKU: {product.sku}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleCardClick}
            className="text-sm font-medium text-stone-900 line-clamp-1 hover:text-[#9B783E] cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5 text-xs text-stone-600">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-stone-800">{product.rating.toFixed(1)}</span>
            <span className="text-stone-400">({product.reviewsCount})</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-[11px] text-emerald-700 font-medium">In Stock</span>
          </div>
        </div>

        {/* Price and Cart Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-stone-900">
                ₹{product.price.toLocaleString('en-IN')}{product.id === 'prod-05' ? ' / 1 pc' : ''}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400">Taxes Included</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="py-2 px-3 bg-[#141311] hover:bg-[#B48C2B] text-white text-xs font-medium rounded-sm transition-colors flex items-center gap-1.5 shadow-sm"
            title="Add to Shopping Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
