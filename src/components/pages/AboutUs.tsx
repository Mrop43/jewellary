import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Award, Gem, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  return (
    <div className="bg-[#FCFBF7] py-12 sm:py-20 text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold">
            Our Heritage & Artisanal Soul
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#141311] font-light leading-tight">
            The Story of <span className="italic font-normal">Dnyanu Creation</span>
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Where centuries-old Indian goldsmithing traditions meet modern wearable opulence.
          </p>
        </div>

        {/* Feature Hero Section */}
        <div className="relative rounded-sm overflow-hidden aspect-video md:aspect-[21/9] border border-[#E8DFD5] shadow-lg">
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.27_AM_6a58d55e.jpeg"
            alt="The Dnyanuu Collection Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Rooted in Mumbai & Jaipur
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-medium mt-1 max-w-lg">
              Preserving Indian Craftsmanship, One Masterpiece at a Time.
            </h2>
          </div>
        </div>

        {/* Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-stone-900 font-medium">
              Elegance Reimagined for the Modern Indian Woman
            </h3>
            <p>
              Founded with the vision to make royal Indian jewellery wearable, accessible, and certified,
              <strong> Dnyanu Creation</strong> was born out of deep reverence for Indian heirloom artistry.
            </p>
            <p>
              Too often, traditional fine jewellery is either locked away in bank vaults due to exorbitant gold prices,
              or compromised by cheap imitation metals that tarnish after a few wears. We asked: Why should royalty come with compromise?
            </p>
            <p>
              By hand-crafting with pure <strong>BIS 925 Sterling Silver</strong>, layered with heavy <strong>24K micron antique gold polish</strong> and anti-tarnish protective sealing, we create jewellery that looks and feels indistinguishable from solid heirloom gold.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-8 rounded-sm border border-[#E8DFD5] space-y-5">
            <h4 className="font-serif text-lg text-stone-900 font-semibold">
              Our 4 Pillars of Excellence
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Gem className="w-5 h-5 text-[#9B783E] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-stone-900">3rd-Generation Karigars</h5>
                  <p className="text-xs text-stone-600">Preserving Jaipuri Meenakari, Kolhapuri Saaj, and Jadau settings.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Award className="w-5 h-5 text-[#9B783E] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-stone-900">100% Certified Purity</h5>
                  <p className="text-xs text-stone-600">Govt. recognized hallmarking standards stamped inside every piece.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-[#9B783E] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-stone-900">Zero Middleman Markup</h5>
                  <p className="text-xs text-stone-600">Direct atelier-to-doorstep model saving you up to 60% compared to luxury retail.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#9B783E] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-stone-900">Lifetime Polish Warranty</h5>
                  <p className="text-xs text-stone-600">Complimentary repolishing so your jewels shine forever.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="p-8 sm:p-12 bg-[#141311] text-[#FCFBF7] rounded-sm text-center space-y-4 border border-[#C5A880]/40">
          <h3 className="text-2xl sm:text-3xl font-serif font-light">
            Find Your Signature Piece Today
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
            Experience the royal radiance of Dnyanu Creation. Handcrafted for your celebrations.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('shop');
              }}
              className="px-8 py-3 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] text-xs font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
