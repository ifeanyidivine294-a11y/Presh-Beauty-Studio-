import React from 'react';
import { Crown, Star, Sparkles, GraduationCap, Heart, Check, Clock, Calendar, ArrowRight, Shield } from 'lucide-react';
import { STUDIO_SERVICES } from '../data/services';
import { StudioService } from '../types';

interface ServicesSectionProps {
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const getIcon = (iconName: StudioService['iconName']) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#FAD38D] fill-[#FAD38D]/80" />;
      case 'Star':
        return <Star className="w-6 h-6 text-[#FAD38D] fill-[#FAD38D]/80" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#FAD38D]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#FAD38D]" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-[#FAD38D] fill-[#FAD38D]/80" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#FAD38D]" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#160513] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#FAD38D] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Services & Glam Packages</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Flawless Artistry, Tailored For You
          </h2>

          <p className="text-sm sm:text-base text-[#F8DDE8]/80 leading-relaxed">
            From intimate bridal beauty to grand Owambe glam and pro masterclasses. Every session includes luxury skin prep, custom lash application, and our signature long-wear sealing technique.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDIO_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl p-6 bg-gradient-to-b from-[#240C1D]/90 to-[#190614]/90 border border-white/15 backdrop-blur-md flex flex-col justify-between hover:border-[#E01272]/50 hover:shadow-[0_0_25px_rgba(224,18,114,0.25)] transition-all duration-300"
            >
              {/* Header Icon + Price */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-13 h-13 rounded-2xl bg-[#321028] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#F8DDE8]/60 uppercase tracking-widest font-semibold">Starting At</p>
                    <p className="text-2xl font-serif font-bold text-[#FAD38D]">
                      ₦{service.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#F8DDE8]/70 mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#FAD38D]" />
                  <span>{service.duration}</span>
                  <span className="text-white/30">•</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-[#FAD38D]">
                    {service.category}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#FAD38D] transition-colors mb-2">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#F8DDE8]/80 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 pb-6 border-t border-white/10 pt-4">
                  <p className="text-[11px] font-bold text-[#FAD38D] uppercase tracking-wider">What's Included:</p>
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#FFF1F6]/90">
                      <div className="w-4 h-4 rounded-full bg-[#E01272]/30 text-[#FAD38D] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#FAD38D]" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onBookService(service.id)}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF1A88] via-[#E01272] to-[#A80050] text-white font-bold text-sm shadow-[0_0_18px_rgba(255,26,136,0.35)] hover:shadow-[0_0_25px_rgba(255,26,136,0.6)] hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Strip */}
        <div className="mt-12 p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-[#FAD38D]" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-white">Hygiene & Luxury Standard Guaranteed</h4>
              <p className="text-xs text-[#F8DDE8]/75">Single-use disposables for mascaras and lip palettes, sanitized UV brush sterilization before every client.</p>
            </div>
          </div>
          <button
            onClick={() => onBookService('bridal-makeup')}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold whitespace-nowrap transition"
          >
            Inquire for Destination Weddings
          </button>
        </div>

      </div>
    </section>
  );
};
