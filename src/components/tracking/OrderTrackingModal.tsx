import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { activeTrackingOrder, setActiveTrackingOrder } = useShop();

  if (!activeTrackingOrder) return null;

  const order = activeTrackingOrder;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden border border-[#C5A880]/30 my-8 text-left">
        {/* Header */}
        <div className="p-5 bg-[#141311] text-[#FCFBF7] flex items-center justify-between border-b border-[#C5A880]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold tracking-wide">
                Live Order Tracking
              </h3>
              <p className="text-xs text-stone-400">
                Order #{order.orderNumber} · Carrier: {order.carrier}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTrackingOrder(null)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Courier & AWB Details Banner */}
        <div className="p-4 bg-[#FAF8F5] border-b border-[#E8DFD5] flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
              Air Waybill (AWB) Tracking No.
            </span>
            <span className="text-sm font-mono font-bold text-stone-900 tracking-wider">
              {order.trackingNumber}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
              Estimated Delivery
            </span>
            <span className="text-xs font-semibold text-emerald-800">
              {order.estimatedDelivery}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
              Current Status
            </span>
            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-[#141311] text-[#D4AF37]">
              {order.status}
            </span>
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="p-6 sm:p-8 space-y-6">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-800 mb-4">
            Transit Milestones & Quality Verification
          </h4>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {order.timeline.map((step, idx) => {
              const isDone = step.completed;
              const isActive = step.active;

              return (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Status Node Icon */}
                  <div
                    className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-[#D4AF37] text-[#141311] animate-pulse'
                        : 'bg-stone-200 text-stone-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className={`text-xs font-bold ${isDone || isActive ? 'text-stone-900' : 'text-stone-400'}`}>
                        {step.status}
                      </h5>
                      <span className="text-[11px] text-stone-500 font-mono">{step.date}</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipping Destination & Support */}
        <div className="p-5 bg-[#FCFAF7] border-t border-[#E8DFD5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5 text-xs text-stone-700">
            <MapPin className="w-4 h-4 text-[#9B783E] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-900">Destination Address:</p>
              <p className="text-stone-600">
                {order.deliveryAddress.street}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919820099999?text=Hello%20Dnyanu%20Creation,%20I%20need%20assistance%20tracking%20my%20order"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span>Contact Courier Agent</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
