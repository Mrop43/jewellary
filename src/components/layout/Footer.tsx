import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141311] text-[#E8DFD5] border-t border-[#C5A880]/30 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#FCFBF7] text-[#141311] flex items-center justify-center border border-[#D4AF37]">
                <svg viewBox="0 0 40 40" className="w-5 h-5 text-[#B48C2B]" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 4L34 16L20 36L6 16L20 4Z" />
                  <path d="M6 16H34" />
                  <path d="M14 16L20 36L26 16" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#FCFBF7]">
                  DNYANU
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] block font-medium -mt-1">
                  CREATION · FINE JEWELS
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Dedicated to celebrating India's royal jewellery legacy. Every masterpiece is hand-crafted with
              hallmarked 925 sterling silver, 24K antique micro-gold plating, and heirloom uncut Polki Kundan stones.
            </p>

            {/* Atelier Address & Contact */}
            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Flagship Boutique:</strong> Heritage Arcade, Linking Road, Bandra West, Mumbai 400050
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+91 98200 99999 / +91 22 2640 1122</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>care@dnyanucreation.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#141311] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#141311] transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#141311] transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {['Earrings', 'Necklaces', 'Rings', 'Bangles', 'Mangalsutra', 'Bridal Jewellery'].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => handleCategoryClick(c)}
                    className="hover:text-[#FCFBF7] transition-colors"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => { setActiveView('account'); window.scrollTo(0,0); }} className="hover:text-[#FCFBF7]">
                  Track My Order
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('account'); window.scrollTo(0,0); }} className="hover:text-[#FCFBF7]">
                  Rewards & Referrals
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('faq'); window.scrollTo(0,0); }} className="hover:text-[#FCFBF7]">
                  FAQs & Sizing Guide
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('about'); window.scrollTo(0,0); }} className="hover:text-[#FCFBF7]">
                  Our Karigars & Story
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('contact'); window.scrollTo(0,0); }} className="hover:text-[#FCFBF7]">
                  Boutique Locator
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('admin'); window.scrollTo(0,0); }} className="hover:text-[#D4AF37] text-stone-400">
                  Store Owner Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Trust & Guarantees
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>100% BIS 925 Hallmarked</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>15-Day Easy Doorstep Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>256-Bit SSL Safe Checkout</span>
              </div>
              <p className="text-[11px] text-stone-500 pt-2 leading-relaxed">
                Govt. Recognized Hallmark Registration No. IN-MH-BND-8891.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Dnyanu Creation Fine Jewels Pvt. Ltd. All rights reserved.</p>

          {/* Indian Payment Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase font-mono">
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-stone-300">UPI (GPay / PhonePe)</span>
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-stone-300">RuPay</span>
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-stone-300">Visa / Mastercard</span>
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-stone-300">NetBanking</span>
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-stone-300">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
