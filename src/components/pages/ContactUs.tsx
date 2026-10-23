import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const { addToast } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    addToast('Thank you! Our concierge team will reach out within 2 hours.', 'success');
  };

  return (
    <div className="bg-[#FCFBF7] py-12 sm:py-20 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7657] font-semibold">
            Boutique & Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#141311] font-normal">
            Get In Touch with Dnyanu Creation
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Have questions about custom bridal sets, ring sizing, or order dispatch? We are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Details & Boutiques (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-sm border border-[#E8DFD5] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-medium text-stone-900 border-b border-stone-100 pb-3">
                Flagship Atelier & Boutiques
              </h3>

              <div className="space-y-4 text-xs text-stone-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#9B783E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block text-xs">Mumbai Flagship Boutique</strong>
                    <span>Level 2, Heritage Arcade, Linking Road, Bandra West, Mumbai, Maharashtra 400050</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#9B783E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block text-xs">Pune Experience Studio</strong>
                    <span>Shop 14, Jewel Square, FC Road, Shivajinagar, Pune, Maharashtra 411004</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#9B783E] shrink-0" />
                  <div>
                    <strong className="text-stone-900 block text-xs">Client Concierge Line</strong>
                    <span>+91 98200 99999 / +91 22 2640 1122</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#9B783E] shrink-0" />
                  <div>
                    <strong className="text-stone-900 block text-xs">Email Desk</strong>
                    <span>care@dnyanucreation.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#9B783E] shrink-0" />
                  <div>
                    <strong className="text-stone-900 block text-xs">Studio Visiting Hours</strong>
                    <span>Monday – Sunday: 10:30 AM to 08:30 PM (IST)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Box */}
            <div className="bg-[#FAF8F5] p-5 rounded-sm border border-[#E8DFD5] space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Instant WhatsApp Stylist
                </h4>
              </div>
              <p className="text-xs text-stone-600">
                Prefer immediate messaging? Connect directly with our jewellery consultants for live video calls and sizing recommendations.
              </p>
              <a
                href="https://wa.me/919820099999?text=Hello%20Dnyanu%20Creation,%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Chat with Stylist on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-[#E8DFD5] shadow-xs">
            <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
              Send Us an Inquiry
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Fill in your details below and our jewellery concierge will respond shortly.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-[#FAF8F5] rounded border border-emerald-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900">Message Received</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>! One of our senior specialists will get in touch with you at <strong>{phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-5 py-2 bg-[#141311] text-[#D4AF37] text-xs font-semibold rounded uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] focus:outline-none bg-white"
                    >
                      <option value="Product Inquiry">Product Inquiry & Details</option>
                      <option value="Bridal Customization">Bridal Set Customization</option>
                      <option value="Ring Sizing">Ring or Bangle Sizing Guide</option>
                      <option value="Order Tracking">Order & BlueDart Tracking</option>
                      <option value="Bulk / Gifting">Corporate & Wedding Gifting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-stone-700 block mb-1">Your Message or Requirements *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the jewellery design, metal preference, or required delivery date..."
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#141311] hover:bg-[#2A2724] text-[#D4AF37] font-semibold text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
