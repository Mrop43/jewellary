import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, ShieldCheck, Sparkles, RefreshCw, Award } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  return (
    <section className="relative overflow-hidden bg-[#141311] text-[#FCFBF7]">
      {/* Background with luxury jewellery atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.24_AM_4a010a5d.jpeg"
          alt="The Dnyanuu Collection Traditional Jewellery"
          className="w-full h-full object-cover object-center opacity-35 transform scale-105 transition-transform duration-10000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141311] via-[#141311]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl space-y-6 text-left">
          {/* Subtle gold badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A880]/15 border border-[#C5A880]/30 rounded-full text-xs font-medium text-[#D4AF37] tracking-widest uppercase backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Festive & Bridal Collection 2026
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#FCFBF7] leading-[1.15] tracking-tight">
            Elegance That <br />
            <span className="italic font-normal text-[#E8DFD5] relative">
              Defines You
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#D4AF37]/50" viewBox="0 0 200 8" fill="none">
                <path d="M1 5.5C40 2 160 2 199 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-xl">
            Discover jewellery that celebrates your style, beauty, and every special moment.
            Handcrafted with hallmarked 925 silver, 24K antique micro-gold polish, and royal Polki Kundan stones.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('shop');
              }}
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] font-medium text-sm tracking-wide rounded-sm transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20 flex items-center gap-2 group cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveView('collections')}
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-[#FCFBF7] border border-[#C5A880]/50 hover:border-[#D4AF37] font-medium text-sm tracking-wide rounded-sm transition-all duration-300 cursor-pointer"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>

      {/* Trust Markers Bar */}
      <div className="relative z-10 border-t border-[#C5A880]/20 bg-[#161513]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/15 flex items-center justify-center shrink-0 border border-[#C5A880]/30 text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-[#FCFBF7]">100% BIS Hallmarked</p>
                <p className="text-[11px] text-stone-400">Certified 925 Pure Silver & Gold</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/15 flex items-center justify-center shrink-0 border border-[#C5A880]/30 text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-[#FCFBF7]">Free Express Shipping</p>
                <p className="text-[11px] text-stone-400">Across all India PIN codes ₹1,999+</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/15 flex items-center justify-center shrink-0 border border-[#C5A880]/30 text-[#D4AF37]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-[#FCFBF7]">15-Day Easy Returns</p>
                <p className="text-[11px] text-stone-400">Doorstep pickup & quick refund</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/15 flex items-center justify-center shrink-0 border border-[#C5A880]/30 text-[#D4AF37]">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-[#FCFBF7]">Lifetime Polish Warranty</p>
                <p className="text-[11px] text-stone-400">Complimentary studio repolishing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
