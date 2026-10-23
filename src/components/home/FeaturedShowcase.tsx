import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../products/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FeaturedShowcase: React.FC = () => {
  const { products, setActiveView, setSelectedCategory } = useShop();
  const [activeTab, setActiveTab] = useState<'best' | 'new' | 'bridal' | 'daily'>('best');

  const filtered = products.filter((p) => {
    if (activeTab === 'best') return p.isBestSeller;
    if (activeTab === 'new') return p.isNewArrival;
    if (activeTab === 'bridal') return p.category === 'Bridal Jewellery' || p.category === 'Traditional Jewellery';
    if (activeTab === 'daily') return p.category === 'Daily Wear Jewellery' || p.category === 'Mangalsutra' || p.category === 'Necklaces';
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EADFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Handpicked For You
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] font-normal">
              Signature Jewels & Best Sellers
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded border border-stone-200 shadow-2xs self-start md:self-auto">
            <button
              onClick={() => setActiveTab('best')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 'best' ? 'bg-[#141311] text-[#D4AF37]' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 'new' ? 'bg-[#141311] text-[#D4AF37]' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('bridal')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 'bridal' ? 'bg-[#141311] text-[#D4AF37]' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bridal Edit
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 'daily' ? 'bg-[#141311] text-[#D4AF37]' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Daily Wear
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('shop');
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#141311] hover:bg-[#2A2724] text-[#D4AF37] text-xs font-semibold uppercase tracking-widest rounded-sm transition-all shadow-md group cursor-pointer"
          >
            <span>Explore Complete Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
