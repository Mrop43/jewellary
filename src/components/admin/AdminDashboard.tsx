import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { OrderStatus } from '../../types';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  Plus,
  Trash2,
  Edit2,
  Download,
  CheckCircle,
  Tag,
  Star,
  Settings,
  ArrowLeft,
  Search,
  Filter
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    reviews,
    setActiveView,
    addToast
  } = useShop();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'reviews'>('overview');

  // Search & filter state
  const [productSearch, setProductSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Add Product Form Modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Earrings');
  const [newProdPrice, setNewProdPrice] = useState<number>(2999);
  const [newProdOrigPrice, setNewProdOrigPrice] = useState<number>(3999);
  const [newProdStock, setNewProdStock] = useState<number>(20);
  const [newProdImageUrl, setNewProdImageUrl] = useState('/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.09.24_AM_4a010a5d.jpeg');
  const [newProdDesc, setNewProdDesc] = useState('Exquisite traditional handcrafted design from The Dnyanuu Collection with antique micro-gold polish and sparkling stones.');

  // Create Coupon Form state
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState<number>(15);
  const [newCouponMin, setNewCouponMin] = useState<number>(1999);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdImageUrl.trim()) {
      addToast('Please enter product name and image URL.', 'error');
      return;
    }

    const discount = Math.max(0, Math.round(((newProdOrigPrice - newProdPrice) / newProdOrigPrice) * 100));

    addProduct({
      name: newProdName,
      category: newProdCategory,
      price: Number(newProdPrice),
      originalPrice: Number(newProdOrigPrice),
      discountPercent: discount,
      stock: Number(newProdStock),
      images: [newProdImageUrl],
      description: newProdDesc,
      material: '24K Micron Gold Plated 925 Hallmarked Silver',
      stone: 'Finest Kundan, Polki & Pearls',
      weight: '45 grams',
      hallmark: 'BIS 925 Hallmarked',
      care: 'Store in velvet pouch. Avoid perfumes.'
    });

    setShowAddProductModal(false);
    setNewProdName('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) {
      addToast('Please enter coupon code.', 'error');
      return;
    }

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: 'percentage',
      value: Number(newCouponVal),
      minOrderValue: Number(newCouponMin),
      description: newCouponDesc || `${newCouponVal}% OFF on orders above ₹${newCouponMin}`,
      isActive: true,
      expiryDate: '2026-12-31'
    });

    setShowAddCoupon(false);
    setNewCouponCode('');
  };

  const handleExportCSV = () => {
    const headers = 'Order Number,Date,Customer,Total,Status,Payment Method,AWB Tracking\n';
    const rows = orders.map(
      (o) =>
        `"${o.orderNumber}","${o.date}","${o.deliveryAddress.name}","₹${o.total}","${o.status}","${o.paymentMethod}","${o.trackingNumber}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dnyanu_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    addToast('Orders exported to CSV successfully!', 'success');
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Admin Header */}
        <div className="bg-[#141311] text-[#FCFBF7] p-6 rounded-sm border border-[#C5A880]/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#141311]">
                Store Owner / Admin Portal
              </span>
              <span className="text-xs text-stone-400">· Dnyanu Creation Live Console</span>
            </div>
            <h1 className="text-2xl font-serif text-[#FCFBF7] font-medium mt-1">
              Store Management & Operations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('home')}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] text-xs font-bold rounded uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow"
            >
              <Download className="w-4 h-4" />
              <span>Export Orders</span>
            </button>
          </div>
        </div>

        {/* Admin KPI Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Sales</span>
              <div className="p-2 bg-amber-50 text-[#9B783E] rounded">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 mt-2">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">Real-time revenue</span>
          </div>

          <div className="bg-white p-5 rounded border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Orders</span>
              <div className="p-2 bg-stone-100 text-stone-800 rounded">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 mt-2">
              {totalOrdersCount}
            </div>
            <span className="text-[11px] text-stone-500 font-medium">All active & delivered</span>
          </div>

          <div className="bg-white p-5 rounded border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Catalogue Items</span>
              <div className="p-2 bg-stone-100 text-stone-800 rounded">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 mt-2">
              {products.length}
            </div>
            <span className="text-[11px] text-stone-500 font-medium">{lowStockCount} items low stock (&le;5)</span>
          </div>

          <div className="bg-white p-5 rounded border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Average Order Value</span>
              <div className="p-2 bg-amber-50 text-[#9B783E] rounded">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 mt-2">
              ₹{avgOrderValue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">Indian cart benchmark</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-300 pb-2">
          {(['overview', 'products', 'orders', 'coupons', 'reviews'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveAdminTab(t)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                activeAdminTab === t
                  ? 'bg-[#141311] text-[#D4AF37]'
                  : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t === 'overview' && 'Overview & Rules'}
              {t === 'products' && `Products (${products.length})`}
              {t === 'orders' && `Orders (${orders.length})`}
              {t === 'coupons' && `Coupons (${coupons.length})`}
              {t === 'reviews' && `Reviews (${reviews.length})`}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview & Store Configuration */}
        {activeAdminTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded border border-stone-200 space-y-4">
              <h3 className="font-serif text-base font-semibold text-stone-900">
                Customer Rewards & Loyalty Program Rules
              </h3>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span>Points Earned per Purchase</span>
                  <strong className="text-stone-900">5% of Order Value</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span>Referral Reward (Referrer)</span>
                  <strong className="text-stone-900">₹300 (300 Points)</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span>Referral Discount (Referee Friend)</span>
                  <strong className="text-stone-900">₹300 OFF First Order</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span>Point Redemption Value</span>
                  <strong className="text-stone-900">1 Point = ₹1.00 INR</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span>Free Express Shipping Threshold</span>
                  <strong className="text-stone-900">₹1,999.00 INR</strong>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded border border-stone-200 space-y-4">
              <h3 className="font-serif text-base font-semibold text-stone-900">
                Store Operations & Logistics Handlers
              </h3>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span>Primary Indian Courier Partner</span>
                  <strong className="text-stone-900">BlueDart Express Air</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span>Secondary Courier Partner</span>
                  <strong className="text-stone-900">Delhivery Surface & Air</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span>Payment Gateway</span>
                  <strong className="text-stone-900">Razorpay India (UPI, RuPay, Cards)</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span>Cash on Delivery (COD)</span>
                  <strong className="text-emerald-700">Active & Enabled</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span>Return Window</span>
                  <strong className="text-stone-900">15-Day Doorstep Pickup</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products Manager */}
        {activeAdminTab === 'products' && (
          <div className="bg-white p-6 rounded border border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search catalogue by title or SKU..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded focus:border-[#C5A880]"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2 bg-[#141311] hover:bg-[#2A2724] text-[#D4AF37] text-xs font-semibold rounded flex items-center gap-1.5 uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Jewellery Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (₹)</th>
                    <th className="py-3 px-4">Original (₹)</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-10 h-10 object-cover rounded border border-stone-200"
                        />
                        <div>
                          <p className="font-semibold text-stone-900">{p.name}</p>
                          <p className="text-[10px] text-stone-400 font-mono">{p.sku}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{p.category}</td>
                      <td className="py-3 px-4 font-bold text-stone-900">
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-stone-400 line-through">
                        ₹{p.originalPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            p.stock <= 5 ? 'text-rose-600 font-bold' : 'text-stone-800'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            const newStock = prompt(`Update stock for "${p.name}":`, String(p.stock));
                            if (newStock !== null) {
                              updateProduct(p.id, { stock: Number(newStock) || 0 });
                            }
                          }}
                          className="p-1 text-stone-500 hover:text-stone-900"
                          title="Edit Stock"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${p.name}" from catalog?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1 text-stone-400 hover:text-rose-600"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Orders Manager */}
        {activeAdminTab === 'orders' && (
          <div className="bg-white p-6 rounded border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-stone-500" />
                <span className="text-xs font-semibold text-stone-700">Filter by Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-1 text-xs border rounded bg-white"
                >
                  <option value="all">All Orders</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Customer & City</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-mono font-bold text-stone-900">
                        {ord.orderNumber}
                      </td>
                      <td className="py-3 px-4 text-stone-500">{ord.date}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-stone-900">{ord.deliveryAddress.name}</p>
                        <p className="text-[11px] text-stone-500">
                          {ord.deliveryAddress.city}, {ord.deliveryAddress.pincode}
                        </p>
                      </td>
                      <td className="py-3 px-4 font-bold text-stone-900">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 uppercase font-semibold text-stone-600">
                        {ord.paymentMethod}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="px-2.5 py-1 text-xs border rounded bg-white font-medium text-stone-800"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Coupons Manager */}
        {activeAdminTab === 'coupons' && (
          <div className="bg-white p-6 rounded border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-stone-900">
                Active Promotional Coupons & Offers
              </h3>
              <button
                onClick={() => setShowAddCoupon(!showAddCoupon)}
                className="px-4 py-2 bg-[#141311] text-[#D4AF37] text-xs font-semibold rounded flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Coupon</span>
              </button>
            </div>

            {showAddCoupon && (
              <form onSubmit={handleCreateCoupon} className="p-4 bg-[#FAF8F5] rounded border border-stone-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium block mb-1">Coupon Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DIWALI25"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border rounded bg-white uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1">Discount % *</label>
                    <input
                      type="number"
                      required
                      value={newCouponVal}
                      onChange={(e) => setNewCouponVal(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1">Min Order Value (₹)</label>
                    <input
                      type="number"
                      value={newCouponMin}
                      onChange={(e) => setNewCouponMin(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Short description for banner"
                    value={newCouponDesc}
                    onChange={(e) => setNewCouponDesc(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37] text-[#141311] text-xs font-bold rounded uppercase tracking-wider"
                >
                  Save Coupon
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="p-4 rounded border border-stone-200 bg-[#FAF8F5] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#9B783E]">{c.code}</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">{c.description}</p>
                  <p className="text-[11px] text-stone-400">
                    Min Order: ₹{c.minOrderValue.toLocaleString('en-IN')} · Expiry: {c.expiryDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Customer Reviews Moderation */}
        {activeAdminTab === 'reviews' && (
          <div className="bg-white p-6 rounded border border-stone-200 space-y-4">
            <h3 className="font-serif text-base font-semibold text-stone-900">
              Customer Feedback & Verified Testimonials
            </h3>
            <div className="divide-y divide-stone-100">
              {reviews.map((rev) => (
                <div key={rev.id} className="py-3 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-stone-900">{rev.author}</span>
                      <span className="text-[11px] text-stone-500">({rev.city})</span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center text-amber-500 text-xs">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-stone-800">{rev.title}</p>
                    <p className="text-xs text-stone-600">{rev.comment}</p>
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full p-6 rounded shadow-2xl border border-stone-300 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Add New Jewellery Product to Catalog
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-medium block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Solitaire Tennis Choker"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium block mb-1">Category *</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="Earrings">Earrings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Rings">Rings</option>
                    <option value="Bangles">Bangles</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Mangalsutra">Mangalsutra</option>
                    <option value="Traditional Jewellery">Traditional Jewellery</option>
                    <option value="Bridal Jewellery">Bridal Jewellery</option>
                    <option value="Daily Wear Jewellery">Daily Wear Jewellery</option>
                    <option value="Gift Collections">Gift Collections</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium block mb-1">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium block mb-1">Discounted Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="font-medium block mb-1">Original Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProdOrigPrice}
                    onChange={(e) => setNewProdOrigPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium block mb-1">Primary Image URL (High-res photo) *</label>
                <input
                  type="url"
                  required
                  value={newProdImageUrl}
                  onChange={(e) => setNewProdImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="font-medium block mb-1">Artisanal Description</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border rounded text-stone-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#B48C2B] text-[#141311] font-bold uppercase tracking-wider rounded"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
