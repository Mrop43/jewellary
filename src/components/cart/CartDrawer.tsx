import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  Trash2,
  Gift,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  Check,
  ShieldCheck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    giftWrap,
    setGiftWrap,
    subtotal,
    discount,
    shippingCharges,
    total,
    setActiveView
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FCFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-[#C5A880]/30 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8DFD5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9B783E]" />
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-3 bg-[#FAF7F2] border-b border-[#E8DFD5] text-left">
          {amountNeededForFreeShipping > 0 ? (
            <p className="text-xs text-stone-700 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Add <span className="font-bold text-[#9B783E]">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</span> more to unlock <span className="font-semibold text-emerald-800">FREE Insured Express Shipping!</span>
            </p>
          ) : (
            <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              Congratulations! You have unlocked <span className="font-bold">FREE Express Delivery</span>.
            </p>
          )}
          <div className="w-full h-1.5 bg-stone-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C5A880] to-[#D4AF37] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EBE4DC] text-left">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3EEE8] flex items-center justify-center text-[#9B783E]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="font-serif text-lg text-stone-800">Your bag is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs">
                Explore our handcrafted polki kundan, hallmarked rings, and bridal sets to find your perfect adornment.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('shop');
                }}
                className="px-6 py-2.5 bg-[#141311] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#2A2724]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 first:pt-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded border border-stone-200 shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                      {item.selectedPlating && <span>{item.selectedPlating}</span>}
                      {item.selectedSize && (
                        <>
                          <span>·</span>
                          <span>{item.selectedSize}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-stone-300 rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-stone-800 min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-stone-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions & Price Breakdown */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E8DFD5] space-y-4 text-left shadow-lg">
            {/* Gift Wrap Checkbox */}
            <label className="flex items-center gap-3 p-2.5 bg-[#FAF8F5] rounded border border-dashed border-[#C5A880]/60 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="w-4 h-4 accent-[#9B783E] rounded"
              />
              <Gift className="w-4 h-4 text-[#9B783E] shrink-0" />
              <div className="flex-1 text-xs">
                <span className="font-semibold text-stone-800">Add Luxury Velvet Gift Box (+₹99)</span>
                <span className="block text-[11px] text-stone-500">Includes personalized handwritten message card</span>
              </div>
            </label>

            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-medium">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> Applied!</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-rose-600 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. FESTIVE15)"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError(null);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded uppercase font-mono tracking-wider focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#141311] text-[#D4AF37] text-xs font-semibold rounded hover:bg-[#2A2724] uppercase"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
            </div>

            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {giftWrap && (
                <div className="flex justify-between">
                  <span>Luxury Gift Packaging</span>
                  <span>₹99</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Insured Shipping</span>
                <span>
                  {shippingCharges === 0 ? (
                    <span className="text-emerald-700 font-semibold uppercase">FREE</span>
                  ) : (
                    `₹${shippingCharges}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Estimated Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#141311] hover:bg-[#2A2724] text-[#FCFBF7] text-xs font-semibold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all shadow-md group cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe 256-Bit SSL Encrypted Indian Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
