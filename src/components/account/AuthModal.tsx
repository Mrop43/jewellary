import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Lock, Phone, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, addToast } = useShop();

  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [simulatedGeneratedOtp, setSimulatedGeneratedOtp] = useState('7890');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      addToast('Please enter your mobile number or email address.', 'error');
      return;
    }
    // Generate 4-digit demo OTP
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedGeneratedOtp(generated);
    setMode('otp');
    addToast(`OTP sent! Your instant test code is ${generated}`, 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim() !== simulatedGeneratedOtp && otp.trim() !== '7890') {
      addToast('Invalid OTP. Please check or use the auto-fill button.', 'error');
      return;
    }
    login(identifier, name || 'Soham Sawant');
    setMode('login');
    setIdentifier('');
    setOtp('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-md rounded-sm shadow-2xl overflow-hidden border border-[#C5A880]/30 my-8 text-left">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Banner */}
        <div className="p-6 bg-[#141311] text-[#FCFBF7] border-b border-[#C5A880]/30 text-center">
          <div className="inline-block p-2 bg-[#D4AF37]/20 rounded-full mb-2">
            <Lock className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-xl tracking-wider font-medium text-[#FCFBF7]">
            Dnyanu Creation VIP Portal
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Access exclusive collections, track shipments & redeem reward points
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {mode === 'otp' ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs text-stone-500">
                  Enter 4-digit code sent to <strong className="text-stone-800">{identifier}</strong>
                </span>
                <div className="p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 font-medium">
                  Instant Test Code: <span className="font-mono font-bold">{simulatedGeneratedOtp}</span>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={4}
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • •"
                  className="w-full text-center tracking-[1em] text-2xl font-mono py-3 border border-stone-300 rounded focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOtp(simulatedGeneratedOtp)}
                  className="w-1/2 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded"
                >
                  Auto-Fill Test OTP
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-[#141311] hover:bg-[#2A2724] text-[#D4AF37] text-xs font-semibold rounded uppercase tracking-wider"
                >
                  Verify & Sign In
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-stone-500 hover:text-stone-900 underline"
                >
                  Change Mobile / Email
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Radhika Verma"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">
                  Mobile Number or Email Address *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="+91 98200 12345 or user@example.com"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  We'll send an instant OTP code for secure passwordless login.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#141311] hover:bg-[#2A2724] text-[#FCFBF7] text-xs font-semibold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all shadow"
              >
                <span>{mode === 'register' ? 'Register & Send OTP' : 'Request Login OTP'}</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <div className="text-center pt-2">
                {mode === 'login' ? (
                  <p className="text-xs text-stone-600">
                    New to Dnyanu Creation?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="font-semibold text-[#9B783E] hover:underline"
                    >
                      Create Account (+350 Welcome Points)
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-stone-600">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-semibold text-[#9B783E] hover:underline"
                    >
                      Sign In with OTP
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted · Strict Data Privacy Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
