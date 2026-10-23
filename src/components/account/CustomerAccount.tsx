import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  User,
  Package,
  MapPin,
  Award,
  Heart,
  LogOut,
  Copy,
  Check,
  Truck,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { ProductCard } from '../products/ProductCard';

export const CustomerAccount: React.FC = () => {
  const {
    user,
    orders,
    wishlist,
    logout,
    setActiveView,
    deleteAddress,
    setDefaultAddress,
    addAddress,
    pointTransactions,
    setActiveTrackingOrder,
    addToCart,
    addToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'rewards' | 'wishlist'>('orders');
  const [copiedReferral, setCopiedReferral] = useState(false);

  // New Address form toggle
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('Mumbai');
  const [newState, setNewState] = useState('Maharashtra');
  const [newPincode, setNewPincode] = useState('400050');
  const [newType, setNewType] = useState<'home' | 'work' | 'other'>('home');

  if (!user) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-serif text-stone-900 mb-2">Please Sign In</h2>
        <p className="text-xs text-stone-500 mb-6">Log in to view your orders, addresses, and reward balance.</p>
        <button
          onClick={() => setActiveView('home')}
          className="px-6 py-2.5 bg-[#141311] text-[#D4AF37] text-xs font-semibold rounded uppercase tracking-wider"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const handleCopyReferral = () => {
    const link = `https://dnyanucreation.com/invite?ref=${user.referralCode}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedReferral(true);
      addToast('Referral link copied to clipboard! Share with friends & earn ₹300 per order.', 'success');
      setTimeout(() => setCopiedReferral(false), 3000);
    }
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim() || !newStreet.trim() || !newPincode.trim()) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }
    addAddress({
      name: newName,
      phone: newPhone,
      street: newStreet,
      city: newCity,
      state: newState,
      pincode: newPincode,
      type: newType,
      isDefault: false
    });
    setShowAddAddress(false);
  };

  return (
    <div className="bg-[#FCFBF7] py-10 sm:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#E8DFD5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#141311] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#C5A880]/50 shadow">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif text-stone-900 font-medium">
                  {user.name}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FAF0DC] text-[#8C7657] border border-[#C5A880]/40">
                  {user.tier} Member
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {user.email} · {user.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Reward Points Box */}
            <div className="px-5 py-3 bg-[#FAF8F5] rounded border border-[#E8DFD5] text-center">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                Reward Points
              </span>
              <span className="text-xl font-bold text-[#9B783E]">
                {user.rewardPoints} Pts
              </span>
              <span className="block text-[10px] text-emerald-700 font-medium">Worth ₹{user.rewardPoints}</span>
            </div>

            <button
              onClick={() => {
                logout();
                setActiveView('home');
              }}
              className="p-3 text-stone-500 hover:text-stone-900 border border-stone-200 hover:border-stone-300 rounded transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabbed Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Side Menu */}
          <div className="lg:col-span-3 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#141311] text-[#D4AF37]'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders & Tracking ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`w-full text-left px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'rewards'
                  ? 'bg-[#141311] text-[#D4AF37]'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Rewards & Referrals</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-[#141311] text-[#D4AF37]'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>My Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-[#141311] text-[#D4AF37]'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses ({user.savedAddresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#141311] text-[#D4AF37]'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-sm border border-[#E8DFD5] shadow-xs min-h-[420px]">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-900">
                    Order History & Live Shipments
                  </h3>
                  <p className="text-xs text-stone-500">
                    Track courier milestones and review hallmarked purchases
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 text-stone-500 text-xs">
                    You have not placed any orders yet.
                  </div>
                ) : (
                  <div className="space-y-5">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-5 rounded border border-[#E8DFD5] bg-[#FAF8F5]/50 space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                              Order Number
                            </span>
                            <span className="font-mono font-bold text-xs text-stone-900">
                              {ord.orderNumber}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                              Placed On
                            </span>
                            <span className="text-xs text-stone-700 font-medium">
                              {ord.date}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                              Total Amount
                            </span>
                            <span className="text-xs font-bold text-stone-900">
                              ₹{ord.total.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                              Status
                            </span>
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#141311] text-[#D4AF37]">
                              {ord.status}
                            </span>
                          </div>

                          <button
                            onClick={() => setActiveTrackingOrder(ord)}
                            className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Track Live</span>
                          </button>
                        </div>

                        {/* Order Items */}
                        <div className="divide-y divide-stone-100">
                          {ord.items.map((item) => (
                            <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.product.images[0]}
                                  alt=""
                                  className="w-12 h-12 object-cover rounded border border-stone-200"
                                />
                                <div>
                                  <p className="font-medium text-stone-900">{item.product.name}</p>
                                  <p className="text-[11px] text-stone-500">
                                    Qty: {item.quantity} · {item.selectedPlating} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                                  </p>
                                </div>
                              </div>
                              <span className="font-semibold text-stone-900">
                                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500">
                          <span>Delivered by <strong>{ord.carrier}</strong> (AWB: {ord.trackingNumber})</span>
                          <span>Payment: <strong className="uppercase">{ord.paymentMethod}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Rewards & Referral Tab */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-900">
                    Dnyanu Rewards & Referral Program
                  </h3>
                  <p className="text-xs text-stone-500">
                    Earn 5% rewards on all jewellery purchases and ₹300 per successful friend invite.
                  </p>
                </div>

                {/* Referral Code Box */}
                <div className="p-6 bg-[#141311] text-[#FCFBF7] rounded border border-[#C5A880]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                        Your Unique Referral Code
                      </p>
                      <h4 className="text-2xl font-mono font-bold tracking-wider mt-1">
                        {user.referralCode}
                      </h4>
                    </div>
                    <button
                      onClick={handleCopyReferral}
                      className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] text-xs font-semibold rounded flex items-center gap-1.5 uppercase tracking-wider transition-colors"
                    >
                      {copiedReferral ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedReferral ? 'Copied Link!' : 'Copy Share Link'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Gift your friends <strong>₹300 OFF</strong> on their first order. When they complete their purchase,
                    you will automatically receive <strong>300 bonus reward points</strong> (worth ₹300) into your account!
                  </p>
                </div>

                {/* Points History */}
                <div>
                  <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
                    Recent Points Transactions
                  </h4>
                  <div className="divide-y divide-stone-100 border border-stone-200 rounded">
                    {pointTransactions.map((tx) => (
                      <div key={tx.id} className="p-3.5 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-medium text-stone-900">{tx.description}</p>
                          <p className="text-[11px] text-stone-400">{tx.date}</p>
                        </div>
                        <span
                          className={`font-bold ${
                            tx.type === 'redeemed' ? 'text-stone-600' : 'text-emerald-700'
                          }`}
                        >
                          {tx.type === 'redeemed' ? '-' : '+'}
                          {tx.points} Pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-900">
                    My Curated Wishlist ({wishlist.length})
                  </h3>
                  <p className="text-xs text-stone-500">Saved items ready for your next celebration</p>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-12 text-stone-500 text-xs">
                    Your wishlist is currently empty. Explore our collection and tap the heart icon!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border border-stone-200 rounded overflow-hidden p-3 bg-[#FAF8F5]">
                        <img src={item.images[0]} alt="" className="w-full aspect-square object-cover rounded mb-2" />
                        <h4 className="text-xs font-semibold text-stone-900 truncate">{item.name}</h4>
                        <div className="text-xs font-bold text-stone-900 mt-1">₹{item.price.toLocaleString('en-IN')}</div>
                        <button
                          onClick={() => {
                            addToCart(item, 1);
                          }}
                          className="w-full mt-3 py-2 bg-[#141311] text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Cart</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-stone-900">
                      Saved Delivery Addresses
                    </h3>
                    <p className="text-xs text-stone-500">Manage shipping destinations across India</p>
                  </div>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="px-3.5 py-1.5 bg-[#141311] text-[#D4AF37] text-xs font-semibold rounded flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Address</span>
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={handleSaveNewAddress} className="p-4 bg-[#FAF8F5] rounded border border-stone-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium block mb-1">Name</label>
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-1">Phone</label>
                        <input
                          type="text"
                          required
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-medium block mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-1">State</label>
                        <input
                          type="text"
                          required
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-1">PIN Code</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newPincode}
                          onChange={(e) => setNewPincode(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#D4AF37] text-[#141311] text-xs font-bold rounded uppercase tracking-wider"
                    >
                      Save Address
                    </button>
                  </form>
                )}

                <div className="space-y-3">
                  {user.savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded border border-stone-200 flex items-start justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900">{addr.name}</span>
                          <span className="text-[10px] uppercase font-semibold text-[#8C7657] bg-stone-100 px-1.5 py-0.5 rounded">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-1">
                          {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">Phone: {addr.phone}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-xs text-[#9B783E] hover:underline"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="p-1 text-stone-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-900">
                    Profile Information
                  </h3>
                  <p className="text-xs text-stone-500">Update your verified personal details</p>
                </div>

                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      disabled
                      value={user.name}
                      className="w-full px-3 py-2 text-xs border border-stone-200 rounded bg-stone-50 text-stone-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Registered Email</label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3 py-2 text-xs border border-stone-200 rounded bg-stone-50 text-stone-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Mobile Phone (OTP Linked)</label>
                    <input
                      type="tel"
                      disabled
                      value={user.phone}
                      className="w-full px-3 py-2 text-xs border border-stone-200 rounded bg-stone-50 text-stone-700"
                    />
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Your account is 100% verified with OTP two-factor security.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
