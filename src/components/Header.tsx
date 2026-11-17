import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Crown, MessageCircle, Phone, Search } from 'lucide-react';
import { BusinessConfig } from '../data/logistics';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  businessConfig: BusinessConfig;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  businessConfig,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'shop', label: 'Shop' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#160512]/90 backdrop-blur-md border-b border-[#F8DDE8]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="relative">
            <img 
              src="/assets/presh/logo.png" 
              alt="Presh Beauty Studio" 
              className="h-12 w-auto object-contain rounded-md filter drop-shadow-[0_2px_8px_rgba(250,211,141,0.25)] transition group-hover:scale-105"
              onError={(e) => {
                // fallback if image is missing
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="hidden xs:block">
            <div className="flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-[#FAD38D] fill-[#FAD38D]" />
              <span className="font-serif text-2xl font-bold tracking-wide bg-gradient-to-r from-[#FAD38D] via-[#FFE4B5] to-[#FAD38D] bg-clip-text text-transparent">
                Presh
              </span>
            </div>
            <p className="text-[10px] tracking-[0.25em] text-[#F8DDE8]/80 uppercase -mt-0.5 font-medium">
              Beauty Studio
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E01272] to-[#A80050] text-white shadow-[0_0_15px_rgba(224,18,114,0.4)]'
                    : 'text-[#FFF1F6]/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Search, 15years WhatsApp badge, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Search */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-[#FFF1F6]/75 hover:text-white hover:bg-white/10 transition"
              title="Search services & products"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* 15 Years Badge with WhatsApp */}
          <a
            href={`https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent('Hello Presh Beauty Studio, I would like to make an enquiry.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4D068] to-[#C99E25] text-[#29151F] font-bold text-xs tracking-wider shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:brightness-110 transition cursor-pointer"
            title="Chat with Presh Beauty Studio on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-[#29151F] text-[#F4D068]" />
            <span>15years</span>
          </a>

          {/* Shopping Cart Button */}
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#FFF1F6] transition group"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-[#F8DDE8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-[#E01272] to-[#A80050] text-white text-[11px] font-bold shadow-[0_0_10px_rgba(224,18,114,0.6)] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#FFF1F6] hover:bg-white/10 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E0719] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full py-2.5 px-3 rounded-xl text-sm font-medium text-left transition ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E01272] to-[#A80050] text-white shadow-md'
                      : 'bg-white/5 text-[#FFF1F6]/90 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent('Hello Presh Beauty Studio, I would like to book a session.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4D068] text-[#29151F] font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-[#29151F]" />
              <span>15 Years Experience • Chat on WhatsApp</span>
            </a>

            <div className="flex items-center justify-between text-xs text-[#F8DDE8]/70 px-2 pt-1">
              <span>📍 Asaba, Delta State, Nigeria</span>
              <a href={`tel:${businessConfig.phone}`} className="flex items-center gap-1 text-[#FAD38D]">
                <Phone className="w-3 h-3" />
                <span>Call Studio</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
