import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ShopSection } from './components/ShopSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { BookingOrderForm } from './components/BookingOrderForm';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AdminFeeModal } from './components/AdminFeeModal';

import { Product, ProductCategory, CartItem, StudioService } from './types';
import { PRODUCTS } from './data/products';
import { STUDIO_SERVICES } from './data/services';
import { 
  INITIAL_NIGERIAN_STATES, 
  INITIAL_BUSINESS_CONFIG, 
  StateWaybillConfig, 
  BusinessConfig 
} from './data/logistics';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Headphones, 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Heart,
  Calendar
} from 'lucide-react';

export default function App() {
  // Navigation active tab: 'home' | 'services' | 'shop' | 'portfolio' | 'about' | 'contact'
  const [activeTab, setActiveTab] = useState<string>('home');

  // Business and Logistics State (persisted in localStorage)
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(() => {
    const saved = localStorage.getItem('presh_business_config');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESS_CONFIG;
  });

  const [stateLogistics, setStateLogistics] = useState<StateWaybillConfig[]>(() => {
    const saved = localStorage.getItem('presh_logistics_rates');
    return saved ? JSON.parse(saved) : INITIAL_NIGERIAN_STATES;
  });

  // Shopping Cart State (persisted in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('presh_cart_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Prepopulation state for Contact/Order page
  const [orderTarget, setOrderTarget] = useState<{
    type: 'service' | 'product';
    serviceId?: string;
    product?: Product | null;
    color?: string;
    size?: string;
  }>({
    type: 'service',
    serviceId: 'bridal-makeup',
    product: null,
    color: '',
    size: ''
  });

  // Filter state for Shop tab
  const [shopCategoryFilter, setShopCategoryFilter] = useState<ProductCategory | 'All'>('All');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Persist settings & cart
  useEffect(() => {
    localStorage.setItem('presh_business_config', JSON.stringify(businessConfig));
  }, [businessConfig]);

  useEffect(() => {
    localStorage.setItem('presh_logistics_rates', JSON.stringify(stateLogistics));
  }, [stateLogistics]);

  useEffect(() => {
    localStorage.setItem('presh_cart_items', JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const handleAddToCart = (product: Product, selectedColor: string, selectedSize?: string) => {
    const cartId = `${product.id}-${selectedColor}-${selectedSize || 'nosize'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          itemId: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          color: selectedColor,
          size: selectedSize,
          quantity: 1,
          itemType: 'product'
        }
      ];
    });

    showToast(`Added "${product.name}" (${selectedColor}) to your bag!`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Order Now direct action from product card
  const handleOrderProductNow = (product: Product, selectedColor: string, selectedSize?: string) => {
    setOrderTarget({
      type: 'product',
      product,
      color: selectedColor,
      size: selectedSize
    });
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Book Service direct action
  const handleBookService = (serviceId: string = 'bridal-makeup') => {
    setOrderTarget({
      type: 'service',
      serviceId,
      product: null,
      color: '',
      size: ''
    });
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Proceed to Checkout from Cart Drawer
  const handleProceedToCheckoutFromCart = () => {
    setIsCartOpen(false);
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Category Card from Home Page
  const handleOpenCategoryInShop = (category: ProductCategory) => {
    setShopCategoryFilter(category);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Rate updates
  const handleUpdateStateRate = (stateName: string, newFee: number) => {
    setStateLogistics((prev) =>
      prev.map((s) => (s.state === stateName ? { ...s, defaultFee: newFee } : s))
    );
  };

  const handleResetRates = () => {
    setStateLogistics(INITIAL_NIGERIAN_STATES);
    showToast('Logistics waybill rates reset to defaults.');
  };

  const handleUpdateBusinessConfig = (updated: BusinessConfig) => {
    setBusinessConfig(updated);
    showToast('Business details updated successfully!');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Home Page What We Do and 4 Category Cards
  const renderHomeContent = () => {
    const fourCategories: {
      category: ProductCategory;
      title: string;
      image: string;
      featuredItem: string;
      price: string;
      buttonText: string;
    }[] = [
      {
        category: 'Bags',
        title: 'Bags & Clutches',
        image: '/assets/products/bag_1.jpg',
        featuredItem: 'Presh Royale Quilted Chain Bag',
        price: '₦48,500',
        buttonText: 'See All Bags'
      },
      {
        category: 'Shoes',
        title: 'Shoes & Glam Heels',
        image: '/assets/products/shoe_1.jpg',
        featuredItem: 'Crystal Stiletto Glam Pumps',
        price: '₦42,000',
        buttonText: 'See All Shoes'
      },
      {
        category: 'Jewelry',
        title: 'Jewelry & Bridal Sets',
        image: '/assets/products/jewelry_1.jpg',
        featuredItem: '18k Gold Dipped Royal Choker',
        price: '₦62,000',
        buttonText: 'See All Jewelry'
      },
      {
        category: 'Perfumes',
        title: 'Luxury Perfumes & Scents',
        image: '/assets/products/perfume_1.jpg',
        featuredItem: 'Rose & Oud Royale Eau de Parfum',
        price: '₦52,000',
        buttonText: 'See All Perfumes'
      }
    ];

    return (
      <div className="space-y-16">
        
        {/* Hero Section */}
        <Hero
          onBookNow={() => handleBookService('bridal-makeup')}
          onSelectServiceCard={(svcId) => handleBookService(svcId)}
          onExploreShop={() => {
            setShopCategoryFilter('All');
            setActiveTab('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* B. What We Do Section */}
        <section className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#FAD38D] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Presh Beauty Studio</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-relaxed max-w-3xl mx-auto">
            "We bring elegance, confidence and style together through carefully selected fashion and beauty essentials."
          </h2>

          <p className="text-sm sm:text-base text-[#F8DDE8]/80 max-w-2xl mx-auto leading-relaxed">
            Headquartered in the vibrant heart of Asaba, Delta State, we celebrate the sovereign beauty of every woman with flawless bridal artistry, regal Nigerian gele styling, and an exclusive fashion boutique collection.
          </p>
        </section>

        {/* C. Four Category Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#FAD38D] uppercase tracking-wider">
                Exclusive Boutique
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Shop By Category
              </h2>
            </div>
            <button
              onClick={() => {
                setShopCategoryFilter('All');
                setActiveTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs sm:text-sm text-[#FAD38D] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Explore All 14 Items</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourCategories.map((catCard) => (
              <div
                key={catCard.category}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#240C1D] to-[#180514] border border-white/15 hover:border-[#E01272]/50 shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/4] overflow-hidden bg-black/40">
                    <img
                      src={catCard.image}
                      alt={catCard.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#160412]/80 backdrop-blur-md text-[10px] font-bold text-[#FAD38D] uppercase tracking-wider">
                      {catCard.category}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-1.5 text-left">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#FAD38D] transition-colors">
                      {catCard.title}
                    </h3>
                    <p className="text-xs text-[#F8DDE8]/75 line-clamp-1">
                      Featured: {catCard.featuredItem}
                    </p>
                    <p className="font-serif text-sm font-bold text-[#FAD38D]">
                      From {catCard.price}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <button
                    onClick={() => handleOpenCategoryInShop(catCard.category)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF1A88] to-[#A80050] text-white text-xs font-bold shadow-md hover:brightness-110 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{catCard.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* D. Product Availability Statement from Spec */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-medium text-[#FFF1F6] italic">
              "These are some of our products. We have many more available. Contact us for the full collection."
            </p>
            <a
              href={`https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent('Hello Presh Beauty Studio, I would like to see the full collection of bags, shoes, jewelry and perfumes.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#FAD38D] hover:underline font-semibold"
            >
              <span>Chat on WhatsApp for custom orders & wholesale</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* E. Trust and Service Highlights Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#2B0E23]/90 via-[#1E0719]/90 to-[#2B0E23]/90 border border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#FAD38D]" />
              </div>
              <div className="text-left">
                <h4 className="font-serif font-bold text-white text-sm sm:text-base">Premium Quality</h4>
                <p className="text-[11px] text-[#F8DDE8]/70">Verified luxury materials & cosmetics</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E01272]/20 border border-[#E01272]/30 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-[#FF2A85]" />
              </div>
              <div className="text-left">
                <h4 className="font-serif font-bold text-white text-sm sm:text-base">Fast Waybill Delivery</h4>
                <p className="text-[11px] text-[#F8DDE8]/70">Reliable inter-state park dispatch</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-[#FAD38D]" />
              </div>
              <div className="text-left">
                <h4 className="font-serif font-bold text-white text-sm sm:text-base">Secure Payments</h4>
                <p className="text-[11px] text-[#F8DDE8]/70">Verified PalmPay & instant receipts</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E01272]/20 border border-[#E01272]/30 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6 text-[#FF2A85]" />
              </div>
              <div className="text-left">
                <h4 className="font-serif font-bold text-white text-sm sm:text-base">Excellent Support</h4>
                <p className="text-[11px] text-[#F8DDE8]/70">Direct WhatsApp beauty consultation</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Feature on Home */}
        <AboutSection
          businessConfig={businessConfig}
          onBookNow={() => handleBookService('bridal-makeup')}
          isFullPage={false}
        />

        {/* Portfolio Lookbook */}
        <PortfolioSection
          onBookLook={(lookTitle) => {
            setOrderTarget({
              type: 'service',
              serviceId: 'bridal-makeup',
              color: '',
              size: ''
            });
            setActiveTab('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Interactive Booking & Order Section on Home */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <BookingOrderForm
            initialType="service"
            initialServiceId="bridal-makeup"
            businessConfig={businessConfig}
            stateLogistics={stateLogistics}
            onOpenAdminRates={() => setIsAdminModalOpen(true)}
          />
        </section>

      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#14040E] text-[#FFF1F6] selection:bg-[#FF1A88] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#1E0719] border border-[#FF1A88] text-white text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(255,26,136,0.5)] flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-[#FAD38D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        businessConfig={businessConfig}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activeTab === 'home' && renderHomeContent()}

        {activeTab === 'services' && (
          <div className="space-y-12">
            <ServicesSection
              onBookService={(svcId) => handleBookService(svcId)}
            />
            <div className="max-w-4xl mx-auto px-4 pb-16">
              <BookingOrderForm
                initialType="service"
                initialServiceId={orderTarget.serviceId || 'bridal-makeup'}
                businessConfig={businessConfig}
                stateLogistics={stateLogistics}
                onOpenAdminRates={() => setIsAdminModalOpen(true)}
              />
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <ShopSection
            initialCategory={shopCategoryFilter}
            onOrderNow={handleOrderProductNow}
            onAddToCart={handleAddToCart}
            businessConfig={businessConfig}
          />
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-12 py-8">
            <PortfolioSection
              onBookLook={(lookTitle) => {
                setOrderTarget({
                  type: 'service',
                  serviceId: 'bridal-makeup',
                  color: '',
                  size: ''
                });
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <div className="max-w-4xl mx-auto px-4 pb-16">
              <BookingOrderForm
                initialType="service"
                initialServiceId="bridal-makeup"
                businessConfig={businessConfig}
                stateLogistics={stateLogistics}
                onOpenAdminRates={() => setIsAdminModalOpen(true)}
              />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <AboutSection
            businessConfig={businessConfig}
            onBookNow={() => handleBookService('bridal-makeup')}
            isFullPage={true}
          />
        )}

        {activeTab === 'contact' && (
          <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <p className="text-xs font-bold text-[#FAD38D] uppercase tracking-wider">
                Direct Orders & Appointments
              </p>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
                Book a Session or Complete Order
              </h1>
              <p className="text-sm text-[#F8DDE8]/80 max-w-lg mx-auto">
                Fill the verified form below with your preferred option. Inter-state waybill delivery and in-studio pickup in Asaba are both supported.
              </p>
            </div>

            <BookingOrderForm
              initialType={orderTarget.type}
              initialServiceId={orderTarget.serviceId}
              initialProduct={orderTarget.product}
              initialColor={orderTarget.color}
              initialSize={orderTarget.size}
              cartItems={cart}
              businessConfig={businessConfig}
              stateLogistics={stateLogistics}
              onOpenAdminRates={() => setIsAdminModalOpen(true)}
            />
          </section>
        )}
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckoutFromCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          handleOrderProductNow(p, p.defaultColor, p.sizes?.[0]);
        }}
        onSelectService={(s) => {
          handleBookService(s.id);
        }}
      />

      {/* Admin Fee & Business Config Modal */}
      <AdminFeeModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        stateLogistics={stateLogistics}
        onUpdateStateRate={handleUpdateStateRate}
        onResetRates={handleResetRates}
        businessConfig={businessConfig}
        onUpdateBusinessConfig={handleUpdateBusinessConfig}
      />

      {/* Footer */}
      <Footer
        onBookNow={() => handleBookService('bridal-makeup')}
        businessConfig={businessConfig}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
