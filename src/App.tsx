import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';
import { Check, X } from 'lucide-react';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { notification, dismissNotification } = useCart();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route matching logic
  const renderCurrentView = () => {
    // Product Detail Page: /product/:slug
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('/')[0];
      return (
        <ProductDetailPage
          slug={slug}
          navigate={navigate}
          openCheckout={() => setIsCheckoutOpen(true)}
        />
      );
    }

    // Category pages: /category/:cat
    if (currentPath.startsWith('/category/')) {
      const category = currentPath.replace('/category/', '').split('/')[0];
      const titles: Record<string, string> = {
        men: "Men's Footwear Collection",
        women: "Women's Footwear Collection",
        sneakers: 'Luxury Sneakers & Runners',
        formal: 'Formal & Black Tie Collection',
        loafers: 'Hand-Burnished Loafers',
        boots: 'Chelsea & Ankle Boots',
        sandals: 'Summer Leather Sandals',
      };
      return (
        <ShopPage
          initialCategory={category}
          navigate={navigate}
          title={titles[category] || 'Curated Footwear'}
        />
      );
    }

    if (currentPath === '/shop') {
      return <ShopPage initialCategory="all" navigate={navigate} title="All Footwear Collection" />;
    }

    if (currentPath === '/new-arrivals') {
      return <ShopPage initialCategory="all" navigate={navigate} title="New Arrivals 2026" />;
    }

    if (currentPath === '/cart') {
      return <CartPage navigate={navigate} openCheckout={() => setIsCheckoutOpen(true)} />;
    }

    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // Default to HomePage
    return <HomePage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#171717]">
      {/* Live Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 max-w-sm bg-[#171717] text-white p-4 border border-[#B89550] shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-[#B89550] flex items-center justify-center text-white shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs text-[#E7E3DA] font-light leading-snug">{notification}</p>
          </div>
          <button
            onClick={dismissNotification}
            className="text-[#E7E3DA] hover:text-white p-1"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main View Area */}
      <main className="flex-1">{renderCurrentView()}</main>

      {/* Footer */}
      <Footer navigate={navigate} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer navigate={navigate} openCheckout={() => setIsCheckoutOpen(true)} />

      {/* Demo Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        navigate={navigate}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
