import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const { setSelectedCategory, setActiveView, products } = useShop();

  const handleSelectCollection = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FCFBF7] py-12 sm:py-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold">
            Signature Design Houses
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#141311] font-normal">
            Curated Jewellery Collections
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Explore dedicated shopping galleries curated by occasion, craftsmanship, and silhouette.
          </p>
        </div>

        {/* Collections Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.slice(1).map((cat) => {
            // Count products in this category
            const count = products.filter(
              (p) =>
                cat.name === 'New Arrivals' ? p.isNewArrival :
                cat.name === 'Best Sellers' ? p.isBestSeller :
                p.category === cat.name || p.subCategory === cat.name
            ).length;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCollection(cat.name)}
                className="group relative bg-white border border-[#E8DFD5] rounded-sm overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                      {count} Masterpieces Available
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium">{cat.name}</h3>
                  </div>
                </div>

                <div className="p-4 bg-white flex items-center justify-between border-t border-stone-100">
                  <span className="text-xs font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                    Explore Collection
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#9B783E] group-hover:bg-[#141311] group-hover:text-[#D4AF37] flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
