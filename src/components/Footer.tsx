import React from 'react';
import { Crown, Calendar, ArrowRight, MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react';
import { BusinessConfig } from '../data/logistics';

interface FooterProps {
  onBookNow: () => void;
  businessConfig: BusinessConfig;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookNow, businessConfig, onNavigate }) => {
  return (
    <footer className="bg-[#10030C] border-t border-white/10 text-[#FFF1F6] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner matching Reference Image (Crown + Ready to look your best? + Book Now button + info) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2B0C22]/95 via-[#1E0617]/95 to-[#2B0C22]/95 border border-white/15 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Crown & Headline */}
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FAD38D]/20 to-[#E01272]/20 border border-[#FAD38D]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(250,211,141,0.2)]">
              <Crown className="w-9 h-9 text-[#FAD38D] fill-[#FAD38D]/80" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Ready to look your best?
              </h3>
              <p className="text-xs sm:text-sm text-[#F8DDE8]/80 mt-1">
                Book now and experience the Presh Beauty difference!
              </p>
            </div>
          </div>

          {/* Center: Book Now Button */}
          <div>
            <button
              onClick={onBookNow}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF1A88] via-[#E01272] to-[#A80050] text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(255,26,136,0.5)] hover:shadow-[0_0_35px_rgba(255,26,136,0.7)] hover:scale-105 active:scale-95 transition cursor-pointer border border-white/20 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Info snippet matching reference */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 text-xs text-[#F8DDE8]/80 border-t sm:border-t-0 sm:border-l lg:border-l border-white/15 pt-4 sm:pt-0 sm:pl-6">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FAD38D] font-bold text-[10px]">
                15years
              </span>
              <span className="text-white font-medium">Excellence in Beauty</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#FAD38D]" />
              <span>Asaba, Delta State, Nigeria</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#FAD38D]" />
              <span>8:00 AM – 6:00 PM</span>
            </div>
          </div>

        </div>

        {/* Brand Columns & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4 border-t border-white/10 text-xs sm:text-sm">
          
          {/* Brand Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#FAD38D]" />
              <span className="font-serif text-xl font-bold text-white tracking-wide">
                Presh Beauty Studio
              </span>
            </div>
            <p className="text-xs text-[#F8DDE8]/75 leading-relaxed">
              Nigeria's premier luxury bridal glam, traditional gele mastery, pro makeup academy, and handpicked fashion boutique based in Asaba, Delta State.
            </p>
            <p className="text-xs text-[#FAD38D] font-medium">
              Chukwudebe Ifeanyi — Founder & Lead Artist
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-base font-bold text-white">Quick Navigation</h4>
            <ul className="space-y-1.5 text-xs text-[#F8DDE8]/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition">
                  Studio Services & Gele
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition">
                  Luxury Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition">
                  Client Transformations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition">
                  About Our Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-base font-bold text-white">Collection Categories</h4>
            <ul className="space-y-1.5 text-xs text-[#F8DDE8]/80">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAD38D] transition">
                  Designer Bags & Clutches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAD38D] transition">
                  Glam Stilettos & Heels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAD38D] transition">
                  Bridal & 18k Gold Jewelry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAD38D] transition">
                  Luxury Niche Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#FAD38D] transition">
                  Masterclass Academy
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-base font-bold text-white">Contact & Bookings</h4>
            <div className="space-y-2 text-xs text-[#F8DDE8]/80">
              <a
                href={`https://wa.me/${businessConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: {businessConfig.phone}</span>
              </a>
              <a
                href={`tel:${businessConfig.phone}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#FAD38D]" />
                <span>{businessConfig.phone}</span>
              </a>
              <a
                href={`mailto:${businessConfig.email}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail className="w-3.5 h-3.5 text-[#FAD38D]" />
                <span className="truncate">{businessConfig.email}</span>
              </a>
              <div className="flex items-center gap-2 text-[11px] text-[#F8DDE8]/70 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#FAD38D]" />
                <span>Pickup: 6:30 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Signature Slogan matching reference image */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8DDE8]/70">
          <p>© 2025 Presh Beauty Studio. All Rights Reserved.</p>
          <p className="font-serif italic text-lg sm:text-xl text-[#FAD38D] tracking-wide">
            Beauty is Confidence...
          </p>
        </div>

      </div>
    </footer>
  );
};
