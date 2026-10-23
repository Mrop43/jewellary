import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { INSTAGRAM_POSTS } from '../../data/mockData';
import {
  ShieldCheck,
  Gem,
  Award,
  Sparkles,
  HeartHandshake,
  Star,
  Instagram,
  CheckCircle2,
  Mail,
  ArrowRight
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FCFBF7] border-b border-[#EADFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold block mb-2">
          The Dnyanu Promise
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] font-normal max-w-2xl mx-auto">
          Why Discerning Connoisseurs Choose Dnyanu Creation
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto mt-3">
          We bring you royal heirloom designs without the traditional 300% jewelry markup,
          crafted with certified metals and uncompromised love.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 text-left">
          {/* Card 1 */}
          <div className="p-8 bg-white border border-[#E8DFD5] rounded-sm shadow-xs space-y-4 hover:border-[#D4AF37] transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#141311] text-[#D4AF37] flex items-center justify-center border border-[#C5A880]/40">
              <Gem className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Master Karigari & Heritage Design
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every curve, prong, and pearl drop is hand-set by 3rd-generation artisanal karigars in Maharashtra and Rajasthan, preserving royal Indian goldsmithing traditions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white border border-[#E8DFD5] rounded-sm shadow-xs space-y-4 hover:border-[#D4AF37] transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#141311] text-[#D4AF37] flex items-center justify-center border border-[#C5A880]/40">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              100% Certified & BIS Hallmarked
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Zero ambiguity on purity. All sterling silver products carry certified BIS 925 hallmarks, anti-tarnish protective coatings, and a signed Certificate of Authenticity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white border border-[#E8DFD5] rounded-sm shadow-xs space-y-4 hover:border-[#D4AF37] transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#141311] text-[#D4AF37] flex items-center justify-center border border-[#C5A880]/40">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Direct-from-Atelier Fair Pricing
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              By removing lavish showroom rents and multiple tiers of wholesalers, we deliver royal luxury directly to your doorstep at true artisan rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CustomerReviewsSection: React.FC = () => {
  const { reviews } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EADFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold block mb-2">
            Real Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] font-normal">
            Cherished By Over 10,000+ Women
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs font-bold text-stone-800 ml-1">4.9 / 5 Overall Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white border border-[#E8DFD5] rounded-sm shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h4 className="font-serif text-sm font-semibold text-stone-900">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-900">{rev.author}</p>
                  <p className="text-[10px] text-stone-400">{rev.city}</p>
                </div>
                {rev.verified && (
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InstagramGallery: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-[#FCFBF7] border-b border-[#EADFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold mb-2">
          <Instagram className="w-3.5 h-3.5 text-[#9B783E]" /> #DnyanuSparkle
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] font-normal">
          Follow Our Instagram Lookbook
        </h2>
        <p className="text-xs text-stone-500 mt-2 mb-10">
          Tag @DnyanuCreation in your bridal & festive looks to be featured on our official showcase.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('shop');
              }}
              className="group relative aspect-square rounded-sm overflow-hidden border border-[#E8DFD5] shadow-xs cursor-pointer"
            >
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white text-left">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">
                  Featured Product
                </span>
                <p className="text-xs font-semibold leading-tight line-clamp-1">{post.productTag}</p>
                <span className="text-[10px] text-stone-300 mt-1">Tap to Shop &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const NewsletterSection: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to Dnyanu Creation! Check your inbox for your ₹200 gift voucher.', 'success');
  };

  return (
    <section className="py-16 bg-[#141311] text-[#FCFBF7] text-center border-t border-[#C5A880]/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Sparkles className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
        <h2 className="text-2xl sm:text-3xl font-serif text-[#FCFBF7] font-normal">
          Join the Dnyanu Royal Circle
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-2 mb-6 leading-relaxed">
          Subscribe to receive early VIP access to new bridal launches, private festive discounts,
          and receive an instant <strong>₹200 welcome voucher</strong> on your first order.
        </p>

        {subscribed ? (
          <div className="p-4 bg-[#C5A880]/20 border border-[#D4AF37] rounded text-xs text-[#D4AF37] font-medium">
            ✓ Welcome to the Inner Circle! Use coupon code <strong>WELCOME10</strong> for extra savings.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 text-xs bg-white/10 border border-[#C5A880]/40 rounded text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
            >
              Claim ₹200 Voucher
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
