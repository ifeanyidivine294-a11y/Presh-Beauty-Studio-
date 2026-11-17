import React, { useState } from 'react';
import { Sparkles, Crown, Eye, Calendar, X, ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/portfolio';

interface PortfolioSectionProps {
  onBookLook: (lookTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onBookLook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Bridal', 'Traditional', 'Glam', 'Reception'];

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-12 sm:py-16 bg-[#14040E] relative">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#E01272]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#FAD38D] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FAD38D]" />
              <span>Real Transformations</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#FAD38D] hidden sm:block" />
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Our <span className="italic text-[#FAD38D]">Portfolio</span>
              </h2>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#E01272] to-[#A80050] text-white shadow-[0_0_12px_rgba(224,18,114,0.4)]'
                    : 'bg-white/5 text-[#FFF1F6]/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Photo Grid (Matching the reference image row of 4 photos) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-white/15 bg-[#1F0719] shadow-lg cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300"
              onClick={() => setActiveModalItem(item)}
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
                
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Tag pill */}
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#FAD38D] uppercase tracking-wider">
                  {item.tag}
                </span>

                {/* Hover overlay action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="p-2.5 rounded-full bg-[#E01272] text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Title at bottom */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                  <p className="text-white font-serif text-sm font-bold line-clamp-1 group-hover:text-[#FAD38D] transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-[#F8DDE8]/75 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full rounded-3xl bg-[#1C0617] border border-white/20 overflow-hidden shadow-2xl p-5 text-left space-y-4">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image Preview */}
            <div className="rounded-2xl overflow-hidden aspect-[4/4] bg-black/50 relative border border-white/10">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-[#FAD38D]">
                {activeModalItem.tag}
              </span>
            </div>

            {/* Description & CTAs */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {activeModalItem.title}
              </h3>
              <p className="text-sm text-[#F8DDE8]/85 mt-2 leading-relaxed">
                {activeModalItem.description}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  const title = activeModalItem.title;
                  setActiveModalItem(null);
                  onBookLook(title);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-gradient-to-r from-[#FF1A88] to-[#A80050] text-white font-bold text-sm shadow-[0_0_15px_rgba(255,26,136,0.4)] hover:brightness-110 transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Look</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveModalItem(null)}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white/80 text-sm font-medium transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
