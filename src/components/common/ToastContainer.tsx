import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 p-4 bg-[#141311] text-[#FCFBF7] border border-[#C5A880]/30 shadow-2xl rounded-sm transition-all duration-300 transform translate-y-0 opacity-100"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#C5A880] shrink-0" />}
          <p className="text-sm font-medium tracking-wide flex-1">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
