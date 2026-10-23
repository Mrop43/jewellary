import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles, Check } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [pricePreset, setPricePreset] = useState<'all' | 'under-2500' | '2500-5000' | 'above-5000'>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'New Arrivals' && !prod.isNewArrival) return false;
        if (selectedCategory === 'Best Sellers' && !prod.isBestSeller) return false;
        if (
          selectedCategory !== 'New Arrivals' &&
          selectedCategory !== 'Best Sellers' &&
          prod.category !== selectedCategory &&
          prod.subCategory !== selectedCategory
        ) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesCategory = prod.category.toLowerCase().includes(query);
        const matchesTags = prod.tags && prod.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesCategory && !matchesTags) return false;
      }

      // Price preset
      if (pricePreset === 'under-2500' && prod.price >= 2500) return false;
      if (pricePreset === '2500-5000' && (prod.price < 2500 || prod.price > 5000)) return false;
      if (pricePreset === 'above-5000' && prod.price <= 5000) return false;

      // Occasion filter (using tags)
      if (selectedOccasion !== 'all') {
        if (!prod.tags || !prod.tags.includes(selectedOccasion)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, pricePreset, selectedOccasion, selectedSort]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-[#FCFBF7] py-10 sm:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="pb-8 border-b border-[#E8DFD5] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold block mb-1">
              Dnyanu Creation Fine Catalogue
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#141311] font-normal">
              {selectedCategory === 'all' ? 'All Fine Jewellery' : selectedCategory}
            </h1>
            <p className="text-xs text-stone-500 mt-2 max-w-xl">
              Handcrafted in 925 sterling silver with 24K antique micro-gold polish and uncut polki stones.
              Showing {filteredProducts.length} certified items.
            </p>
          </div>

          {/* Quick Clear Filter if active */}
          {(selectedCategory !== 'all' || searchQuery || pricePreset !== 'all' || selectedOccasion !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPricePreset('all');
                setSelectedOccasion('all');
              }}
              className="text-xs text-rose-700 hover:underline font-semibold flex items-center gap-1 self-start md:self-end"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Categories Pill/Tab Bar */}
        <div className="py-4 overflow-x-auto flex items-center gap-2 border-b border-stone-200">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.name);
                setVisibleCount(8);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat.name
                  ? 'bg-[#141311] text-[#D4AF37] shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-[#F3EEE8] border border-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Presets */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-stone-500 font-medium mr-1 hidden sm:inline">Price:</span>
              <button
                onClick={() => setPricePreset('all')}
                className={`px-2.5 py-1 rounded border text-xs ${
                  pricePreset === 'all' ? 'bg-[#141311] text-white border-[#141311]' : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPricePreset('under-2500')}
                className={`px-2.5 py-1 rounded border text-xs ${
                  pricePreset === 'under-2500' ? 'bg-[#141311] text-white border-[#141311]' : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                Under ₹2,500
              </button>
              <button
                onClick={() => setPricePreset('2500-5000')}
                className={`px-2.5 py-1 rounded border text-xs ${
                  pricePreset === '2500-5000' ? 'bg-[#141311] text-white border-[#141311]' : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                ₹2,500 - ₹5,000
              </button>
              <button
                onClick={() => setPricePreset('above-5000')}
                className={`px-2.5 py-1 rounded border text-xs ${
                  pricePreset === 'above-5000' ? 'bg-[#141311] text-white border-[#141311]' : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                Above ₹5,000
              </button>
            </div>

            {/* Occasion Filter */}
            <div className="hidden md:flex items-center gap-1 text-xs">
              <span className="text-stone-500 font-medium mr-1">Occasion:</span>
              {['all', 'Bridal', 'Festive', 'Daily Wear'].map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-2.5 py-1 rounded border text-xs capitalize ${
                    selectedOccasion === occ ? 'bg-[#141311] text-white border-[#141311]' : 'bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-stone-500" />
            <span className="text-xs text-stone-500 font-medium">Sort by:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-white border border-stone-300 rounded font-medium text-stone-800 focus:outline-none focus:border-[#C5A880]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded border border-stone-200 mt-6 space-y-3">
            <h3 className="font-serif text-lg text-stone-800">No jewellery matches your filter criteria</h3>
            <p className="text-xs text-stone-500">Try clearing your filters or selecting a different category.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPricePreset('all');
                setSelectedOccasion('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 bg-[#141311] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > visibleCount && (
          <div className="mt-12 text-center">
            <p className="text-xs text-stone-500 mb-3">
              Showing {displayedProducts.length} of {filteredProducts.length} pieces
            </p>
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-8 py-3 bg-[#141311] hover:bg-[#2A2724] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded shadow transition-all cursor-pointer"
            >
              Load More Pieces
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
