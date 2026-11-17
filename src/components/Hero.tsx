import React from 'react';
import { Calendar, Crown, Star, Sparkles, GraduationCap, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { STUDIO_SERVICES } from '../data/services';

interface HeroProps {
  onBookNow: (serviceId?: string) => void;
  onSelectServiceCard: (serviceId: string) => void;
  onExploreShop: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookNow,
  onSelectServiceCard,
  onExploreShop
}) => {
  return (
    <div className="relative overflow-hidden pt-4 pb-12 lg:pt-8 lg:pb-16 bg-gradient-to-b from-[#1C0617] via-[#160411] to-[#12030E]">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#A80050]/25 via-[#C21865]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#E01272]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-[#FAD38D]">
              <Sparkles className="w-3.5 h-3.5 text-[#FAD38D]" />
              <span>LOOK RADIANT • FEEL CONFIDENT</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08]">
              Presh Beauty <br />
              <span className="bg-gradient-to-r from-[#FAD38D] via-[#FFE8C2] to-[#FAD38D] bg-clip-text text-transparent">
                Studio
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#F8DDE8]/85 font-normal max-w-xl leading-relaxed">
              Expert makeup, flawless beauty, and professional beauty services in Asaba.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onBookNow()}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF1A88] via-[#E01272] to-[#A80050] text-white font-bold text-base shadow-[0_0_25px_rgba(255,26,136,0.5)] hover:shadow-[0_0_35px_rgba(255,26,136,0.7)] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer border border-white/20"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={onExploreShop}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-[#FFF1F6] font-semibold text-base transition backdrop-blur-sm cursor-pointer hover:border-[#FAD38D]/50"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 text-[#FAD38D]" />
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-white/10 text-xs text-[#F8DDE8]/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FAD38D] shrink-0" />
                <span>15+ Yrs Artistry</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FAD38D] shrink-0" />
                <span>Luxury Brands</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FAD38D] shrink-0" />
                <span>18hr Long-Wear</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image (Bride with Bouquet in Veil & Crown) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative max-w-lg w-full">
              
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E01272]/30 to-[#FAD38D]/20 rounded-3xl blur-2xl transform scale-105" />

              {/* Glass Frame Container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-b from-white/10 to-black/30 backdrop-blur-sm">
                <img
                  src="/assets/presh/hero_bride_clean.jpg"
                  alt="Radiant Nigerian Bride by Presh Beauty Studio"
                  className="w-full h-[360px] sm:h-[430px] lg:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14040E]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge on Image */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#1C0617]/85 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#FAD38D] font-bold">Signature Bridal Look</p>
                    <p className="text-sm font-semibold text-white">Flawless Glam & Bridal Crown</p>
                  </div>
                  <button
                    onClick={() => onBookNow('bridal-makeup')}
                    className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#E01272] to-[#A80050] text-white text-xs font-bold shadow hover:brightness-110 transition"
                  >
                    Book Bridal
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Feature/Service Cards from the Reference Design */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Bridal Makeup */}
          <div 
            onClick={() => onSelectServiceCard('bridal-makeup')}
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-[#2B0E23]/80 to-[#1F0719]/80 border border-white/15 backdrop-blur-md hover:border-[#E01272]/60 hover:shadow-[0_0_20px_rgba(224,18,114,0.3)] transition-all duration-300 cursor-pointer flex items-center gap-4"
          >
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#FAD38D]/20 to-[#E01272]/30 border border-[#FAD38D]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Crown className="w-7 h-7 text-[#FAD38D] fill-[#FAD38D]/80" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#FAD38D] transition-colors">
                Bridal Makeup
              </h3>
              <p className="text-xs text-[#F8DDE8]/75 mt-0.5 leading-snug">
                Look stunning on your special day.
              </p>
            </div>
          </div>

          {/* Card 2: Event Makeup */}
          <div 
            onClick={() => onSelectServiceCard('event-makeup')}
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-[#2B0E23]/80 to-[#1F0719]/80 border border-white/15 backdrop-blur-md hover:border-[#E01272]/60 hover:shadow-[0_0_20px_rgba(224,18,114,0.3)] transition-all duration-300 cursor-pointer flex items-center gap-4"
          >
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#FAD38D]/20 to-[#E01272]/30 border border-[#FAD38D]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Star className="w-7 h-7 text-[#FAD38D] fill-[#FAD38D]/80" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#FAD38D] transition-colors">
                Event Makeup
              </h3>
              <p className="text-xs text-[#F8DDE8]/75 mt-0.5 leading-snug">
                Turn heads at every event.
              </p>
            </div>
          </div>

          {/* Card 3: Gele Tying */}
          <div 
            onClick={() => onSelectServiceCard('gele-tying')}
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-[#2B0E23]/80 to-[#1F0719]/80 border border-white/15 backdrop-blur-md hover:border-[#E01272]/60 hover:shadow-[0_0_20px_rgba(224,18,114,0.3)] transition-all duration-300 cursor-pointer flex items-center gap-4"
          >
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#FAD38D]/20 to-[#E01272]/30 border border-[#FAD38D]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 text-[#FAD38D]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#FAD38D] transition-colors">
                Gele Tying
              </h3>
              <p className="text-xs text-[#F8DDE8]/75 mt-0.5 leading-snug">
                Elegant styles, perfectly tied.
              </p>
            </div>
          </div>

          {/* Card 4: Makeup Lessons */}
          <div 
            onClick={() => onSelectServiceCard('makeup-lessons')}
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-[#2B0E23]/80 to-[#1F0719]/80 border border-white/15 backdrop-blur-md hover:border-[#E01272]/60 hover:shadow-[0_0_20px_rgba(224,18,114,0.3)] transition-all duration-300 cursor-pointer flex items-center gap-4"
          >
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#FAD38D]/20 to-[#E01272]/30 border border-[#FAD38D]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-7 h-7 text-[#FAD38D]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#FAD38D] transition-colors">
                Makeup Lessons
              </h3>
              <p className="text-xs text-[#F8DDE8]/75 mt-0.5 leading-snug">
                Learn, practice, and grow.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
