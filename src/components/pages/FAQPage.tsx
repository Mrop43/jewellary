import React, { useState } from 'react';
import { FAQS } from '../../data/mockData';
import { ChevronDown, Search, HelpCircle, PhoneCall } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FAQPage: React.FC = () => {
  const { setActiveView } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#FCFBF7] py-12 sm:py-20 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold">
            Knowledge Base & Assistance
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#141311] font-normal">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Clear, honest answers about our BIS hallmarking, Indian shipping, COD, and jewellery care.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search questions (e.g. hallmark, COD, returns)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-stone-300 rounded-full shadow-2xs focus:outline-none focus:border-[#C5A880]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-sm border border-[#E8DFD5] overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-[#FAF8F5] transition-colors"
                >
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C7657] tracking-wider block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-medium text-stone-900">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#9B783E]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-[#FCFAF7]/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="p-6 bg-[#141311] text-[#FCFBF7] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#C5A880]/40">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div>
              <h4 className="font-serif text-sm font-semibold">Still have questions?</h4>
              <p className="text-xs text-stone-400">Our customer care concierge is available 7 days a week.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('contact')}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};
