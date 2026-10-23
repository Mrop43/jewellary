import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { CategorySlider } from './components/home/CategorySlider';
import { FeaturedShowcase } from './components/home/FeaturedShowcase';
import {
  WhyChooseUs,
  CustomerReviewsSection,
  InstagramGallery,
  NewsletterSection
} from './components/home/HomeExtras';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailView } from './components/products/ProductDetailView';
import { CollectionsPage } from './components/collections/CollectionsPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { CustomerAccount } from './components/account/CustomerAccount';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AboutUs } from './components/pages/AboutUs';
import { ContactUs } from './components/pages/ContactUs';
import { FAQPage } from './components/pages/FAQPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductQuickViewModal } from './components/products/ProductQuickViewModal';
import { OrderTrackingModal } from './components/tracking/OrderTrackingModal';
import { AuthModal } from './components/account/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

const MainContent: React.FC = () => {
  const { activeView, selectedProduct } = useShop();

  return (
    <main className="min-h-screen">
      {activeView === 'home' && (
        <>
          <HeroBanner />
          <CategorySlider />
          <FeaturedShowcase />
          <WhyChooseUs />
          <CustomerReviewsSection />
          <InstagramGallery />
          <NewsletterSection />
        </>
      )}

      {activeView === 'shop' && (
        selectedProduct ? <ProductDetailView product={selectedProduct} /> : <ShopPage />
      )}

      {activeView === 'collections' && <CollectionsPage />}

      {activeView === 'about' && <AboutUs />}

      {activeView === 'contact' && <ContactUs />}

      {activeView === 'faq' && <FAQPage />}

      {activeView === 'account' && <CustomerAccount />}

      {activeView === 'admin' && <AdminDashboard />}

      {activeView === 'checkout' && <CheckoutPage />}
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#1C1917]">
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <ProductQuickViewModal />
        <OrderTrackingModal />
        <AuthModal />
        <ToastContainer />
        <FloatingWhatsApp />
      </div>
    </ShopProvider>
  );
}
