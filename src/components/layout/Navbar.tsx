import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    activeView,
    setActiveView,
    selectedCategory,
    setSelectedCategory,
    setSelectedProduct,
    isLoggedIn,
    setIsAuthModalOpen,
    products,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  // Filter products for quick predictive search
  const filteredSearchProducts = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    setActiveView('shop');
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setActiveView('shop');
    setSearchFocused(false);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FCFBF7]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#141311] text-[#E8DFD5] text-xs py-2 px-4 border-b border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% BIS 925 Hallmarked & Certified
            </span>
            <span className="text-stone-400">·</span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Truck className="w-3.5 h-3.5 text-[#C5A880]" /> Free Express Shipping Across India on ₹1,999+
            </span>
          </div>

          <div className="flex-1 md:flex-initial text-center md:text-right font-medium tracking-wide">
            <span className="text-[#F9F6F0]">Festive Offer: </span>
            <span className="text-[#D4AF37]">Extra 15% OFF</span>
            <span className="text-stone-300"> with code </span>
            <span className="bg-[#C5A880]/20 border border-[#C5A880]/50 px-1.5 py-0.5 rounded text-[#D4AF37] font-mono font-semibold">
              FESTIVE15
            </span>
          </div>

          {/* Quick Admin Portal Switch */}
          <button
            onClick={() => setActiveView(activeView === 'admin' ? 'home' : 'admin')}
            className={`hidden lg:flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded border transition-colors ${
              activeView === 'admin'
                ? 'bg-[#D4AF37] text-[#141311] border-[#D4AF37]'
                : 'text-[#C5A880] border-[#C5A880]/30 hover:border-[#C5A880] hover:text-[#FCFBF7]'
            }`}
            title="Switch between Customer Store and Store Owner / Admin Dashboard"
          >
            <ShieldAlert className="w-3 h-3" />
            {activeView === 'admin' ? 'Exit Admin Dashboard' : 'Store Admin Portal'}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-800 hover:text-[#B48C2B] transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 ml-1 text-stone-800 hover:text-[#B48C2B] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div
            onClick={() => {
              setActiveView('home');
              setSelectedCategory('all');
            }}
            className="flex items-center gap-3 cursor-pointer group select-none text-left"
          >
            {/* Elegant Luxury Jewellery Emblem */}
            <div className="relative w-10 h-10 rounded-sm bg-[#141311] flex items-center justify-center border border-[#C5A880]/50 shadow-sm group-hover:border-[#D4AF37] transition-all">
              <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 4L34 16L20 36L6 16L20 4Z" />
                <path d="M6 16H34" />
                <path d="M14 16L20 36L26 16" />
                <path d="M14 16L20 4L26 16" />
              </svg>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D4AF37] animate-ping opacity-75" />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#141311] group-hover:text-[#9B783E] transition-colors">
                DNYANU
              </span>
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#8C7657] font-medium -mt-1">
                CREATION · FINE JEWELS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => setActiveView('home')}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-[#B48C2B] ${
                activeView === 'home' ? 'text-[#B48C2B] font-semibold border-b-2 border-[#D4AF37] pb-1' : 'text-stone-700'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('shop');
              }}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-[#B48C2B] ${
                activeView === 'shop' && selectedCategory === 'all'
                  ? 'text-[#B48C2B] font-semibold border-b-2 border-[#D4AF37] pb-1'
                  : 'text-stone-700'
              }`}
            >
              All Jewellery
            </button>

            {/* Quick Categories dropdown */}
            <div className="relative group">
              <button
                onClick={() => setActiveView('collections')}
                className={`flex items-center gap-1 text-sm tracking-wide font-medium transition-colors hover:text-[#B48C2B] ${
                  activeView === 'collections' ? 'text-[#B48C2B] font-semibold border-b-2 border-[#D4AF37] pb-1' : 'text-stone-700'
                }`}
              >
                Collections
              </button>

              <div className="absolute top-full left-0 w-64 pt-3 hidden group-hover:block transition-all">
                <div className="bg-[#FCFBF7] border border-[#E8DFD5] shadow-xl p-3 rounded-sm space-y-1">
                  {CATEGORIES.slice(1, 10).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-[#F3EEE8] hover:text-[#B48C2B] transition-colors flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-40" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCategoryClick('New Arrivals')}
              className="text-sm tracking-wide font-medium text-stone-700 hover:text-[#B48C2B] transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              New Arrivals
            </button>

            <button
              onClick={() => handleCategoryClick('Bridal Jewellery')}
              className="text-sm tracking-wide font-medium text-stone-700 hover:text-[#B48C2B] transition-colors"
            >
              Bridal Edit
            </button>

            <button
              onClick={() => setActiveView('about')}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-[#B48C2B] ${
                activeView === 'about' ? 'text-[#B48C2B] font-semibold border-b-2 border-[#D4AF37] pb-1' : 'text-stone-700'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => setActiveView('contact')}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-[#B48C2B] ${
                activeView === 'contact' ? 'text-[#B48C2B] font-semibold border-b-2 border-[#D4AF37] pb-1' : 'text-stone-700'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Predictive Search Input */}
            <div ref={searchRef} className="relative hidden md:block w-48 lg:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jhumkas, kundan, rings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5EFEB]/70 border border-[#E0D5C7] rounded-full focus:outline-none focus:border-[#C5A880] focus:bg-white transition-all text-stone-800 placeholder-stone-400"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Predictive Search Suggestions Dropdown */}
              {searchFocused && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E8DFD5] rounded-md shadow-2xl z-50 overflow-hidden divide-y divide-stone-100">
                  <div className="p-2 bg-[#FBF9F5] text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
                    Products ({filteredSearchProducts.length})
                  </div>
                  {filteredSearchProducts.length > 0 ? (
                    filteredSearchProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleProductSelect(p)}
                        className="flex items-center gap-3 p-2.5 hover:bg-[#F7F4EE] cursor-pointer transition-colors"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded border border-stone-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-stone-900 truncate">{p.name}</p>
                          <p className="text-[11px] text-stone-500">{p.category}</p>
                        </div>
                        <div className="text-xs font-semibold text-[#8C7657]">
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-stone-500">
                      No jewellery matching "{searchQuery}"
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setActiveView('shop');
                      setSearchFocused(false);
                    }}
                    className="w-full text-center py-2 text-xs font-medium text-[#B48C2B] hover:bg-[#F3EEE8] transition-colors"
                  >
                    View All Search Results &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Trigger */}
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  setIsAuthModalOpen(true);
                } else {
                  setActiveView('account');
                }
              }}
              className="relative p-2 text-stone-700 hover:text-[#B48C2B] transition-colors"
              title="My Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B48C2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </button>

            {/* Account Trigger */}
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setActiveView('account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 text-stone-700 hover:text-[#B48C2B] transition-colors flex items-center gap-1.5"
              title={isLoggedIn ? 'My Account' : 'Sign In'}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-medium text-stone-700">
                {isLoggedIn ? 'Account' : 'Sign In'}
              </span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 py-2 px-3 bg-[#141311] text-[#FCFBF7] rounded-full hover:bg-[#2A2724] border border-[#C5A880]/40 transition-all shadow-sm"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-medium tracking-wider">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar toggle */}
        {isSearchOpen && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jewellery, kundan, earrings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-8 py-2 text-sm bg-[#F5EFEB] border border-[#E0D5C7] rounded-md focus:outline-none focus:border-[#C5A880] text-stone-800"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {searchQuery && (
              <div className="mt-2 bg-white border border-[#E8DFD5] rounded shadow-lg max-h-60 overflow-y-auto divide-y divide-stone-100">
                {filteredSearchProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleProductSelect(p)}
                    className="flex items-center gap-3 p-2.5 active:bg-stone-50"
                  >
                    <img src={p.images[0]} alt={p.name} className="w-9 h-9 object-cover rounded" />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-medium truncate text-stone-900">{p.name}</p>
                      <p className="text-[10px] text-stone-500">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[112px] z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#FCFBF7] w-4/5 max-w-sm h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5 text-left">
              <div className="pb-4 border-b border-[#E8DFD5]">
                <p className="text-xs uppercase tracking-widest text-[#8C7657] font-semibold mb-2">
                  Navigation
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setActiveView('home');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1.5 text-base font-serif text-stone-800 hover:text-[#B48C2B]"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setActiveView('shop');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1.5 text-base font-serif text-stone-800 hover:text-[#B48C2B]"
                  >
                    All Jewellery
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('collections');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1.5 text-base font-serif text-stone-800 hover:text-[#B48C2B]"
                  >
                    Collections & Categories
                  </button>
                  <button
                    onClick={() => {
                      handleCategoryClick('Bridal Jewellery');
                    }}
                    className="block w-full text-left py-1.5 text-base font-serif text-stone-800 hover:text-[#B48C2B]"
                  >
                    Bridal Edit
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('about');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1.5 text-base font-serif text-stone-800 hover:text-[#B48C2B]"
                  >
                    Our Heritage & Craft
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('contact');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1.5 text-base font-serif text-stone-800 hover:text-[#B48C2B]"
                  >
                    Contact & Boutique
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-[#8C7657] font-semibold mb-2">
                  Shop by Category
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.slice(1, 9).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCategoryClick(c.name)}
                      className="text-left text-xs text-stone-600 hover:text-[#B48C2B] py-1 truncate"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E8DFD5] space-y-3">
              <button
                onClick={() => {
                  setActiveView('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded bg-[#141311] text-[#D4AF37] border border-[#C5A880]/30"
              >
                <ShieldAlert className="w-4 h-4" /> Admin Portal
              </button>

              <button
                onClick={() => {
                  if (isLoggedIn) {
                    setActiveView('account');
                  } else {
                    setIsAuthModalOpen(true);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded bg-[#F3EEE8] text-stone-800 hover:bg-[#E8DFD5]"
              >
                <User className="w-4 h-4 text-[#B48C2B]" />
                {isLoggedIn ? 'My Account & Orders' : 'Sign In / Register'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
