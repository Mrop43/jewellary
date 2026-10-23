import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Address,
  Order,
  OrderStatus,
  Coupon,
  UserProfile,
  PointTransaction,
  Review
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import {
  INITIAL_COUPONS,
  INITIAL_USER,
  INITIAL_ORDERS,
  INITIAL_POINT_TRANSACTIONS,
  INITIAL_REVIEWS
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ShopContextType {
  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Omit<Product, 'id' | 'sku' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedPlating?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  giftWrap: boolean;
  setGiftWrap: (wrap: boolean) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  pointsToRedeem: number;
  setPointsToRedeem: (points: number) => void;
  subtotal: number;
  discount: number;
  shippingCharges: number;
  total: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth & User
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (identifier: string, name?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  editAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  pointTransactions: PointTransaction[];

  // Orders
  orders: Order[];
  createOrder: (orderInput: {
    address: Address;
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Navigation / View State
  activeView: 'home' | 'shop' | 'collections' | 'about' | 'contact' | 'faq' | 'account' | 'admin' | 'checkout';
  setActiveView: (view: 'home' | 'shop' | 'collections' | 'about' | 'contact' | 'faq' | 'account' | 'admin' | 'checkout') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dnyanu_products_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_PRODUCTS.length && !parsed[0].images[0]?.includes('unsplash.com')) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dnyanu_cart_v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dnyanu_wishlist_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Auth / User
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('dnyanu_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('dnyanu_is_logged_in');
    return saved ? JSON.parse(saved) : true;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pointTransactions, setPointTransactions] = useState<PointTransaction[]>(() => {
    const saved = localStorage.getItem('dnyanu_pts_tx');
    return saved ? JSON.parse(saved) : INITIAL_POINT_TRANSACTIONS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dnyanu_orders_v2');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('dnyanu_reviews_v2');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Navigation & modals
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'collections' | 'about' | 'contact' | 'faq' | 'account' | 'admin' | 'checkout'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist states
  useEffect(() => {
    localStorage.setItem('dnyanu_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dnyanu_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dnyanu_wishlist_v2', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('dnyanu_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dnyanu_is_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('dnyanu_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dnyanu_reviews_v2', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('dnyanu_pts_tx', JSON.stringify(pointTransactions));
  }, [pointTransactions]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
      if (appliedCoupon.code === 'FESTIVE15' && discount > 1500) {
        discount = 1500;
      }
    } else {
      discount = appliedCoupon.value;
    }
  }

  // Points discount: ₹1 per point
  const pointsDiscount = pointsToRedeem;
  const giftWrapFee = giftWrap ? 99 : 0;
  const shippingCharges = subtotal > 0 && subtotal < 1999 ? 99 : 0;
  const total = Math.max(0, subtotal - discount - pointsDiscount + giftWrapFee + shippingCharges);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedPlating?: string
  ) => {
    const plating = selectedPlating || (product.platingOptions && product.platingOptions[0]) || 'Gold Plated';
    const size = selectedSize || (product.sizes && product.sizes[0]);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedSize === size &&
          item.selectedPlating === plating
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          selectedSize: size,
          selectedPlating: plating
        };
        return [...prev, newItem];
      }
    });

    addToast(`Added "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setPointsToRedeem(0);
    setGiftWrap(false);
  };

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === formatted && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `This coupon requires a minimum purchase of ₹${found.minOrderValue.toLocaleString('en-IN')}.`
      };
    }

    setAppliedCoupon(found);
    addToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addToast(`Removed from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        addToast(`Added to wishlist! ✨`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Auth
  const login = (identifier: string, name = 'Soham Sawant') => {
    const existing = user || INITIAL_USER;
    const isEmail = identifier.includes('@');
    const updatedUser: UserProfile = {
      ...existing,
      name: name || existing.name,
      email: isEmail ? identifier : existing.email,
      phone: !isEmail ? identifier : existing.phone
    };
    setUser(updatedUser);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${updatedUser.name}!`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    addToast('You have been logged out safely.', 'info');
  };

  const addAddress = (addrInput: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = {
      ...addrInput,
      id: `addr-${Date.now()}`
    };
    let updatedAddresses = [...user.savedAddresses];
    if (newAddr.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(newAddr);
    setUser({ ...user, savedAddresses: updatedAddresses });
    addToast('New delivery address saved!', 'success');
  };

  const editAddress = (address: Address) => {
    if (!user) return;
    let updated = user.savedAddresses.map((a) => (a.id === address.id ? address : a));
    if (address.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: a.id === address.id }));
    }
    setUser({ ...user, savedAddresses: updated });
    addToast('Address updated.', 'success');
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const updated = user.savedAddresses.filter((a) => a.id !== id);
    setUser({ ...user, savedAddresses: updated });
    addToast('Address removed.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updated = user.savedAddresses.map((a) => ({ ...a, isDefault: a.id === id }));
    setUser({ ...user, savedAddresses: updated });
    addToast('Default address updated.', 'success');
  };

  // Orders
  const createOrder = ({
    address,
    paymentMethod
  }: {
    address: Address;
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
    notes?: string;
  }): Order => {
    const orderNumber = `DC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `DC-BD-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} 2026`;

    // Points earned: 5% of order total
    const pointsEarned = Math.floor(total * 0.05);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: dateFormatted,
      items: [...cart],
      subtotal,
      discount,
      couponCode: appliedCoupon?.code,
      pointsRedeemed: pointsToRedeem,
      pointsDiscount,
      giftWrap,
      shippingCharges,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending_cod' : 'paid',
      status: 'Order Placed',
      deliveryAddress: address,
      trackingNumber,
      carrier: 'BlueDart Express Air',
      estimatedDelivery: '3 to 5 Business Days',
      timeline: [
        {
          status: 'Order Placed',
          date: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`,
          description: `Order successfully placed via ${paymentMethod.toUpperCase()}`,
          completed: true,
          active: true
        },
        {
          status: 'Confirmed',
          date: 'Pending Studio Verification',
          description: 'Jewellery artisan confirmation & hallmarking review',
          completed: false
        },
        {
          status: 'Processing',
          date: 'Pending',
          description: 'Quality inspection & packaging in tamper-proof seal',
          completed: false
        },
        {
          status: 'Shipped',
          date: 'Pending',
          description: `Handed over to ${trackingNumber}`,
          completed: false
        },
        {
          status: 'Out for Delivery',
          date: 'Pending',
          description: 'Delivery agent arriving at your doorstep',
          completed: false
        },
        {
          status: 'Delivered',
          date: 'Pending',
          description: 'Delivered with secret OTP verification',
          completed: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update user points
    if (user) {
      const newPoints = user.rewardPoints - pointsToRedeem + pointsEarned;
      setUser({ ...user, rewardPoints: newPoints });

      // Add points transaction log
      const newTransactions: PointTransaction[] = [];
      if (pointsToRedeem > 0) {
        newTransactions.push({
          id: `pt-${Date.now()}-red`,
          date: dateFormatted,
          type: 'redeemed',
          points: pointsToRedeem,
          description: `Points redeemed on Order #${orderNumber}`
        });
      }
      if (pointsEarned > 0) {
        newTransactions.push({
          id: `pt-${Date.now()}-earn`,
          date: dateFormatted,
          type: 'earned',
          points: pointsEarned,
          description: `5% Rewards earned on Order #${orderNumber}`
        });
      }
      setPointTransactions((prev) => [...newTransactions, ...prev]);
    }

    clearCart();
    setActiveTrackingOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const updatedTimeline = order.timeline.map((step) => {
          if (step.status === status) {
            return { ...step, completed: true, active: true };
          }
          return step;
        });

        return {
          ...order,
          status,
          timeline: updatedTimeline
        };
      })
    );
    addToast(`Order #${orderId} status changed to ${status}`, 'info');
  };

  // Admin Product Actions
  const addProduct = (prodData: Omit<Product, 'id' | 'sku' | 'rating' | 'reviewsCount'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      sku: `DC-${prodData.category.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewsCount: 1
    };
    setProducts((prev) => [newProd, ...prev]);
    addToast(`Product "${newProd.name}" added to catalog!`, 'success');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    addToast('Product details updated successfully.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product removed from catalog.', 'info');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    addToast(`Coupon "${coupon.code}" created!`, 'success');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };
    setReviews((prev) => [newRev, ...prev]);
    addToast('Thank you! Your verified review has been published.', 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        giftWrap,
        setGiftWrap,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        pointsToRedeem,
        setPointsToRedeem,
        subtotal,
        discount,
        shippingCharges,
        total,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        isLoggedIn,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        addAddress,
        editAddress,
        deleteAddress,
        setDefaultAddress,
        pointTransactions,
        orders,
        createOrder,
        updateOrderStatus,
        activeTrackingOrder,
        setActiveTrackingOrder,
        coupons,
        addCoupon,
        reviews,
        addReview,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
