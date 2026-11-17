import React from 'react';
import { CheckCircle2, ArrowRight, Award, Heart, Sparkles, MapPin, Phone, MessageCircle } from 'lucide-react';
import { BusinessConfig } from '../data/logistics';

interface AboutSectionProps {
  businessConfig: BusinessConfig;
  onBookNow: () => void;
  isFullPage?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  businessConfig,
  onBookNow,
  isFullPage = false
}) => {
  return (
    <section className={`relative overflow-hidden ${isFullPage ? 'py-16' : 'py-12'} bg-gradient-to-b from-[#12030E] via-[#1A0515] to-[#12030E]`}>
      
      {/* Background radial accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#A80050]/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* About Grid (Image + Story) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: CEO / Founder Portrait with Vanity Studio Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Soft gold glow border */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37]/50 via-[#E01272]/40 to-[#FAD38D]/50 rounded-[28px] blur-sm" />
              
              <div className="relative rounded-[26px] overflow-hidden border border-white/20 bg-[#1D0618] shadow-2xl">
                <img
                  src="/assets/presh/ceo_preview.jpg"
                  alt="Founder & Lead Artist at Presh Beauty Studio"
                  className="w-full h-[380px] sm:h-[420px] object-cover object-top hover:scale-105 transition-transform duration-500"
                />

                {/* Vanity Lights Glow Bar on Left */}
                <div className="absolute top-4 left-3 bottom-4 flex flex-col justify-between pointer-events-none opacity-80">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#FFE4B5] shadow-[0_0_8px_#FFE4B5]" />
                  ))}
                </div>

                {/* CEO Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-[#160412]/90 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm sm:text-base">Chukwudebe Ifeanyi</p>
                      <p className="text-[#FAD38D] text-xs font-medium">Founder & Master Makeup Artist</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FAD38D] text-xs font-semibold">
                      15+ Yrs
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right: Story & Values matching Reference Image */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#FAD38D] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#FAD38D]" />
                <span>Our Philosophy & Mastery</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                About <span className="italic text-[#FAD38D]">Presh Beauty Studio</span>
              </h2>

              <p className="text-base sm:text-lg text-[#F8DDE8]/90 leading-relaxed pt-1">
                I'm passionate about enhancing natural beauty and helping every woman look and feel her best. At Presh Beauty Studio, we combine skill, creativity and premium products to deliver flawless results for every occasion.
              </p>
            </div>

            {/* Checkmark Bullets from Reference Design */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E01272]/20 border border-[#E01272] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#FAD38D]" />
                </div>
                <span className="text-[#FFF1F6] font-medium text-base">
                  Professional & Friendly Service
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E01272]/20 border border-[#E01272] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#FAD38D]" />
                </div>
                <span className="text-[#FFF1F6] font-medium text-base">
                  Premium Beauty Products
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E01272]/20 border border-[#E01272] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#FAD38D]" />
                </div>
                <span className="text-[#FFF1F6] font-medium text-base">
                  A Relaxing Studio Environment
                </span>
              </div>
            </div>

            {/* Additional details for full page or depth */}
            {isFullPage && (
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-serif text-lg font-bold text-[#FAD38D] mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4" /> 15 Years of Heritage
                  </h4>
                  <p className="text-xs text-[#F8DDE8]/80 leading-relaxed">
                    Over a decade and a half styling high-profile Nigerian brides, runway models, and celebrities across Asaba, Delta State, and nationwide.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-serif text-lg font-bold text-[#FAD38D] mb-1 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Flawless Skin-First
                  </h4>
                  <p className="text-xs text-[#F8DDE8]/80 leading-relaxed">
                    Hypoallergenic, sweat-resistant luxury pigments from Dior, NARS, Charlotte Tilbury, and Black Opal matched to every African melanin undertone.
                  </p>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookNow}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4D068] to-[#C99E25] text-[#29151F] font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 transition cursor-pointer"
              >
                <span>Book Your Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent('Hello Presh Beauty Studio, I would like to learn more about your services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-[#FFF1F6] text-sm font-semibold transition"
              >
                <MessageCircle className="w-4 h-4 text-[#FAD38D]" />
                <span>Chat with Lead Artist</span>
              </a>
            </div>

            {/* Studio Address Tag */}
            <div className="flex items-center gap-2 text-xs text-[#F8DDE8]/70 pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#FAD38D] shrink-0" />
              <span>{businessConfig.pickupAddress}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
