import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '919820099999'; // Dnyanu Creation verified concierge number
  const defaultMessage = 'Hello Dnyanu Creation! I would like to inquire about fine jewellery designs, ring sizing, or custom orders.';

  const handleStartChat = () => {
    const encoded = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 text-left">
      {isOpen && (
        <div className="mb-3 p-4 bg-white rounded-lg shadow-2xl border border-stone-200 max-w-xs animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-stone-900">Dnyanu Jewellery Concierge</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            Namaste! Need help selecting the right necklace, checking hallmark certificates, or custom sizing?
            Our jewellery stylist is online to assist you.
          </p>
          <button
            onClick={handleStartChat}
            className="w-full mt-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all cursor-pointer border-2 border-white"
        title="WhatsApp Jewellery Assistance"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
};
