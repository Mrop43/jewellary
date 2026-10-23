import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/products';
import { ChevronRight } from 'lucide-react';

export const CategorySlider: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useShop();

  const handleSelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveView('shop');
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FCFBF7] border-b border-[#EADFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold mb-2">
              Curated Masterpieces
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#141311] font-normal">
              Explore By Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('shop');
            }}
            className="mt-3 md:mt-0 text-xs font-semibold tracking-wider text-[#9B783E] hover:text-[#141311] flex items-center gap-1 transition-colors uppercase"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.slice(1).map((category) => (
            <div
              key={category.id}
              onClick={() => handleSelect(category.name)}
              className="group cursor-pointer flex flex-col items-center text-center select-none"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 border-2 border-[#C5A880]/30 group-hover:border-[#D4AF37] transition-all duration-300 shadow-sm group-hover:shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-[#141311]/10 group-hover:bg-transparent transition-colors rounded-full" />
              </div>

              <h3 className="mt-3 text-xs sm:text-sm font-medium text-stone-900 group-hover:text-[#9B783E] transition-colors">
                {category.name}
              </h3>
              <span className="text-[11px] text-stone-500 font-normal">Explore &rarr;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
