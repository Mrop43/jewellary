import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Address } from '../../types';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  Plus,
  ArrowLeft,
  Truck,
  Sparkles,
  Award
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    user,
    subtotal,
    discount,
    appliedCoupon,
    giftWrap,
    shippingCharges,
    total,
    pointsToRedeem,
    setPointsToRedeem,
    createOrder,
    setActiveView,
    addAddress,
    addToast
  } = useShop();

  // Selected delivery address
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user?.savedAddresses[0]?.id || ''
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // New Address state
  const [newName, setNewName] = useState(user?.name || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newStreet, setNewStreet] = useState('');
  const [newLocality, setNewLocality] = useState('');
  const [newCity, setNewCity] = useState('Mumbai');
  const [newState, setNewState] = useState('Maharashtra');
  const [newPincode, setNewPincode] = useState('400050');
  const [newType, setNewType] = useState<'home' | 'work' | 'other'>('home');

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  // Razorpay Gateway Details simulation
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Processing state & Success Order State
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Indian States list
  const INDIAN_STATES = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Gujarat', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'West Bengal', 'Rajasthan', 'Kerala',
    'Punjab', 'Madhya Pradesh', 'Goa', 'Andhra Pradesh'
  ];

  if (cart.length === 0 && !confirmedOrder) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-serif text-stone-900 mb-3">Your shopping cart is empty</h2>
        <p className="text-sm text-stone-500 mb-6">Add jewellery pieces before checking out.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-3 bg-[#141311] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded"
        >
          Explore Catalogue
        </button>
      </div>
    );
  }

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim() || !newStreet.trim() || !newPincode.trim()) {
      addToast('Please fill out all required address fields.', 'error');
      return;
    }

    addAddress({
      name: newName,
      phone: newPhone,
      street: newStreet,
      locality: newLocality,
      city: newCity,
      state: newState,
      pincode: newPincode,
      type: newType,
      isDefault: false
    });

    setShowNewAddressForm(false);
  };

  const handleFillTestCard = () => {
    setCardNumber('4532 ···· ···· 8892');
    setCardExpiry('08/29');
    setCardCvv('789');
    setCardName(user?.name || 'Soham Sawant');
    addToast('Test RuPay / Visa card credentials filled!', 'info');
  };

  const currentAddress =
    user?.savedAddresses.find((a) => a.id === selectedAddressId) ||
    user?.savedAddresses[0] || {
      id: 'addr-default',
      name: user?.name || 'Customer',
      phone: user?.phone || '+91 98200 12345',
      street: 'Heritage Arcade, Linking Road',
      locality: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      type: 'home' as const,
      isDefault: true
    };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Simulate authentic payment gateway authorization handshake (1.5s)
    setTimeout(() => {
      const order = createOrder({
        address: currentAddress,
        paymentMethod
      });
      setIsProcessing(false);
      setConfirmedOrder(order);
    }, 1500);
  };

  // If order is successfully confirmed, show the Celebration Screen
  if (confirmedOrder) {
    return (
      <div className="py-12 px-4 max-w-3xl mx-auto text-left">
        <div className="bg-white border border-[#C5A880]/40 rounded-sm shadow-xl p-6 sm:p-10 space-y-8">
          <div className="text-center space-y-3 pb-6 border-b border-stone-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#8C7657] font-semibold">
              Payment Confirmed & Verified
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-stone-600">
              Order Reference: <strong className="font-mono text-stone-900">{confirmedOrder.orderNumber}</strong>
            </p>
            <p className="text-xs text-stone-500">
              An invoice and BlueDart tracking confirmation have been sent to <strong>{user?.email}</strong>.
            </p>
          </div>

          {/* Tracking Summary */}
          <div className="p-4 bg-[#FAF8F5] rounded border border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-[#9B783E]" />
              <div>
                <p className="text-xs font-semibold text-stone-900">
                  Carrier: {confirmedOrder.carrier}
                </p>
                <p className="text-xs text-stone-500">
                  AWB Tracking #: <span className="font-mono text-stone-800">{confirmedOrder.trackingNumber}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveView('account');
              }}
              className="px-4 py-2 bg-[#141311] hover:bg-[#2A2724] text-[#D4AF37] text-xs font-semibold tracking-wider uppercase rounded"
            >
              Track Order Live &rarr;
            </button>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-800">
              Purchased Jewellery Items
            </h3>
            <div className="divide-y divide-stone-100">
              {confirmedOrder.items.map((item: any) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 object-cover rounded border border-stone-200"
                    />
                    <div>
                      <p className="font-medium text-stone-900">{item.product.name}</p>
                      <p className="text-stone-500">Qty: {item.quantity} · {item.selectedPlating}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-stone-900">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address & Payment recap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200 text-xs">
            <div>
              <p className="text-stone-400 font-semibold uppercase tracking-wider mb-1">Delivering To:</p>
              <p className="font-medium text-stone-900">{confirmedOrder.deliveryAddress.name}</p>
              <p className="text-stone-600">{confirmedOrder.deliveryAddress.street}</p>
              <p className="text-stone-600">
                {confirmedOrder.deliveryAddress.city}, {confirmedOrder.deliveryAddress.state} - {confirmedOrder.deliveryAddress.pincode}
              </p>
              <p className="text-stone-600 mt-1">Phone: {confirmedOrder.deliveryAddress.phone}</p>
            </div>
            <div>
              <p className="text-stone-400 font-semibold uppercase tracking-wider mb-1">Payment Breakdown:</p>
              <div className="space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Method</span>
                  <span className="font-medium uppercase text-stone-800">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Total Amount Paid</span>
                  <span className="font-bold text-stone-900">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setConfirmedOrder(null);
                setActiveView('shop');
              }}
              className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] font-semibold text-xs tracking-wider uppercase rounded text-center transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                setConfirmedOrder(null);
                setActiveView('account');
              }}
              className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs tracking-wider uppercase rounded text-center transition-colors"
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBF7] py-10 sm:py-16 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => setActiveView('shop')}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </button>

        <h1 className="text-2xl sm:text-3xl font-serif text-[#141311] mb-8 font-medium">
          Express Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Delivery Address & Payment Methods (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Delivery Address Section */}
            <div className="bg-white p-6 rounded-sm border border-[#E8DFD5] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#141311] text-[#D4AF37] flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h2 className="font-serif text-lg text-stone-900 font-medium">
                    Delivery Address
                  </h2>
                </div>
                <button
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-xs text-[#9B783E] hover:underline font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {showNewAddressForm ? 'Cancel' : 'Add New Address'}
                </button>
              </div>

              {/* Saved addresses selector */}
              {!showNewAddressForm && (
                <div className="space-y-3">
                  {user?.savedAddresses.map((addr) => (
                    <label
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`block p-4 rounded border cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-[#B48C2B] bg-[#FCFAF6] ring-1 ring-[#D4AF37]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="addressSelection"
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="accent-[#9B783E]"
                          />
                          <span className="text-xs font-bold text-stone-900">{addr.name}</span>
                          <span className="text-[10px] uppercase font-semibold text-[#8C7657] bg-stone-100 px-1.5 py-0.5 rounded">
                            {addr.type}
                          </span>
                        </div>
                        <span className="text-xs text-stone-500">{addr.phone}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-2 pl-5">
                        {addr.street}, {addr.locality ? `${addr.locality}, ` : ''}{addr.city}, {addr.state} - <strong className="text-stone-800">{addr.pincode}</strong>
                      </p>
                    </label>
                  ))}
                </div>
              )}

              {/* Add New Address Form */}
              {showNewAddressForm && (
                <form onSubmit={handleAddNewAddress} className="mt-4 space-y-4 bg-[#FAF8F5] p-4 rounded border border-stone-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">Mobile Number (with +91) *</label>
                      <input
                        type="text"
                        required
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Flat / House / Building / Street *</label>
                    <input
                      type="text"
                      required
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      placeholder="e.g. Flat 301, Silver Sands, Linking Road"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">State *</label>
                      <select
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-stone-700">Address Type:</span>
                    {(['home', 'work', 'other'] as const).map((t) => (
                      <label key={t} className="flex items-center gap-1.5 text-xs capitalize cursor-pointer">
                        <input
                          type="radio"
                          name="addressType"
                          checked={newType === t}
                          onChange={() => setNewType(t)}
                          className="accent-[#9B783E]"
                        />
                        {t}
                      </label>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#141311] text-[#D4AF37] text-xs font-semibold rounded uppercase tracking-wider"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* 2. Customer Rewards Redemption Section */}
            {user && user.rewardPoints > 0 && (
              <div className="bg-[#FAF8F5] p-5 rounded-sm border border-[#E8DFD5]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#9B783E]" />
                    <h3 className="font-serif text-sm font-semibold text-stone-900">
                      Redeem Dnyanu Rewards Points
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#8C7657]">
                    Balance: {user.rewardPoints} Pts (₹{user.rewardPoints})
                  </span>
                </div>
                <p className="text-xs text-stone-600 mb-3">
                  Use your reward points for an instant reduction on your total bill. (1 Point = ₹1)
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPointsToRedeem(pointsToRedeem > 0 ? 0 : Math.min(user.rewardPoints, total))}
                    className={`px-4 py-2 text-xs font-semibold rounded border transition-colors ${
                      pointsToRedeem > 0
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {pointsToRedeem > 0 ? `Redeeming ₹${pointsToRedeem} (Click to remove)` : `Redeem Max (Save ₹${Math.min(user.rewardPoints, total)})`}
                  </button>
                </div>
              </div>
            )}

            {/* 3. Indian Payment Gateway (Razorpay Simulator) */}
            <div className="bg-white p-6 rounded-sm border border-[#E8DFD5] shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#141311] text-[#D4AF37] flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <h2 className="font-serif text-lg text-stone-900 font-medium">
                    Payment Gateway (Razorpay India)
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit Encrypted</span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#B48C2B] bg-[#FCFAF6] text-[#9B783E] ring-1 ring-[#D4AF37]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#B48C2B] bg-[#FCFAF6] text-[#9B783E] ring-1 ring-[#D4AF37]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Cards / RuPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#B48C2B] bg-[#FCFAF6] text-[#9B783E] ring-1 ring-[#D4AF37]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span>NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#B48C2B] bg-[#FCFAF6] text-[#9B783E] ring-1 ring-[#D4AF37]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* UPI Tab View */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 bg-[#FAF8F5] p-4 rounded border border-stone-200">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('gpay')}
                      className={`px-3 py-1.5 text-xs font-medium rounded border ${
                        selectedUpiApp === 'gpay' ? 'bg-[#141311] text-[#D4AF37] border-[#141311]' : 'bg-white'
                      }`}
                    >
                      Google Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('phonepe')}
                      className={`px-3 py-1.5 text-xs font-medium rounded border ${
                        selectedUpiApp === 'phonepe' ? 'bg-[#141311] text-[#D4AF37] border-[#141311]' : 'bg-white'
                      }`}
                    >
                      PhonePe
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('paytm')}
                      className={`px-3 py-1.5 text-xs font-medium rounded border ${
                        selectedUpiApp === 'paytm' ? 'bg-[#141311] text-[#D4AF37] border-[#141311]' : 'bg-white'
                      }`}
                    >
                      Paytm UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('qr')}
                      className={`px-3 py-1.5 text-xs font-medium rounded border ${
                        selectedUpiApp === 'qr' ? 'bg-[#141311] text-[#D4AF37] border-[#141311]' : 'bg-white'
                      }`}
                    >
                      Scan Dynamic QR
                    </button>
                  </div>

                  {selectedUpiApp === 'qr' ? (
                    <div className="flex flex-col items-center p-4 bg-white rounded border border-dashed border-[#C5A880]/50 text-center">
                      <div className="p-3 bg-stone-900 rounded-sm mb-2">
                        <QrCode className="w-24 h-24 text-[#D4AF37]" />
                      </div>
                      <p className="text-xs font-semibold text-stone-800">Scan to pay with any UPI App</p>
                      <p className="text-[11px] text-stone-500">BHIM, Google Pay, PhonePe, Paytm, Cred</p>
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">
                        Enter UPI ID (VPA)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. mobile@okhdfcbank or user@ybl"
                          className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setUpiId('soham.sawant@okhdfcbank')}
                          className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium rounded"
                        >
                          Auto-fill
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Cards Tab View */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 bg-[#FAF8F5] p-4 rounded border border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-800">
                      Credit / Debit / RuPay Card
                    </span>
                    <button
                      type="button"
                      onClick={handleFillTestCard}
                      className="text-xs text-[#9B783E] hover:underline font-semibold"
                    >
                      Fill Demo Test Card &rarr;
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 ···· ···· 8892"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="08/29"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="789"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on card"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white"
                    />
                  </div>
                </div>
              )}

              {/* NetBanking View */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-4 bg-[#FAF8F5] p-4 rounded border border-stone-200">
                  <label className="text-xs font-semibold text-stone-800 block">
                    Select Your Bank
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`p-2 text-xs font-medium rounded border truncate ${
                          selectedBank === b ? 'bg-[#141311] text-[#D4AF37] border-[#141311]' : 'bg-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COD View */}
              {paymentMethod === 'cod' && (
                <div className="space-y-2 bg-[#FAF8F5] p-4 rounded border border-stone-200 text-xs text-stone-600">
                  <p className="font-semibold text-stone-900">
                    Pay in cash when your BlueDart courier delivers your parcel.
                  </p>
                  <p>
                    Please keep the exact cash amount ready. A secret delivery verification code will be sent to your mobile phone via SMS upon dispatch.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Review & Placement (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-sm border border-[#E8DFD5] shadow-sm space-y-4">
              <h2 className="font-serif text-lg text-stone-900 font-medium pb-2 border-b border-stone-200">
                Order Summary ({cart.length} items)
              </h2>

              {/* Items List Mini */}
              <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-10 h-10 object-cover rounded border border-stone-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-stone-900 truncate">{item.product.name}</p>
                        <p className="text-[11px] text-stone-500">
                          Qty: {item.quantity} · {item.selectedPlating}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-stone-900 shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>- ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {pointsToRedeem > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Reward Points Redeemed</span>
                    <span>- ₹{pointsToRedeem.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between">
                    <span>Luxury Velvet Packaging</span>
                    <span>₹99</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span>
                    {shippingCharges === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">FREE</span>
                    ) : (
                      `₹${shippingCharges}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-stone-900">Total Payable</span>
                  <span className="text-2xl font-serif font-bold text-stone-900">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Primary Place Order Button */}
              <div className="pt-4">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#141311] hover:bg-[#2A2724] disabled:bg-stone-500 text-[#FCFBF7] text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Payment with Razorpay...</span>
                    </div>
                  ) : (
                    <>
                      <span>Place Order & Pay ₹{total.toLocaleString('en-IN')}</span>
                      <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded border border-stone-200 text-center space-y-1">
                <p className="text-[11px] text-stone-500">
                  By placing this order you agree to Dnyanu Creation Terms of Service & 15-Day Return Policy.
                </p>
                <div className="flex items-center justify-center gap-2 text-stone-600 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Guaranteed BIS Hallmarked Jewellery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
