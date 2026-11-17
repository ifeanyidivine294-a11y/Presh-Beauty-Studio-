import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Check, Sparkles, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types';
import { BusinessConfig } from '../data/logistics';

interface ShopSectionProps {
  onOrderNow: (product: Product, selectedColor: string, selectedSize?: string) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize?: string) => void;
  businessConfig: BusinessConfig;
  initialCategory?: ProductCategory | 'All';
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  onOrderNow,
  onAddToCart,
  businessConfig,
  initialCategory = 'All'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  
  // Track selected color and size per product
  const [productSelections, setProductSelections] = useState<{
    [productId: string]: { color: string; size?: string };
  }>(() => {
    const initial: { [productId: string]: { color: string; size?: string } } = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = {
        color: p.defaultColor,
        size: p.sizes ? p.sizes[0] : undefined
      };
    });
    return initial;
  });

  const categories: (ProductCategory | 'All')[] = ['All', 'Bags', 'Shoes', 'Jewelry', 'Perfumes'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleColorChange = (productId: string, colorName: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        color: colorName
      }
    }));
  };

  const handleSizeChange = (productId: string, size: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        size
      }
    }));
  };

  return (
    <section className="py-12 sm:py-16 bg-[#13030E] relative min-h-screen">
      
      {/* Background Subtle Shimmer */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#A80050]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#FAD38D] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#FAD38D]" />
            <span>Presh Luxury Fashion & Beauty Boutique</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Our <span className="italic text-[#FAD38D]">Collection</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F8DDE8]/80">
            Explore carefully selected fashion and beauty essentials.
          </p>
        </div>

        {/* Working Category Filters */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap mb-8 sm:mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E01272] via-[#C21865] to-[#A80050] text-white shadow-[0_0_15px_rgba(224,18,114,0.45)] scale-105'
                    : 'bg-white/5 text-[#FFF1F6]/75 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Catalogue Grid: Exactly 2 cards per row on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {filteredProducts.map((product) => {
            const currentSelection = productSelections[product.id] || {
              color: product.defaultColor,
              size: product.sizes?.[0]
            };

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#250C1E]/90 to-[#180514]/90 border border-white/10 hover:border-[#E01272]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_20px_rgba(224,18,114,0.2)]"
              >
                <div>
                  {/* Real Product Photograph */}
                  <div className="relative aspect-square w-full overflow-hidden bg-black/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Tag */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#160412]/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-bold text-[#FAD38D] uppercase tracking-wider">
                      {product.category}
                    </span>

                    {/* Selected Color indicator badge */}
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] text-white/90 font-medium">
                      {currentSelection.color}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-2.5 sm:p-4 space-y-2">
                    
                    {/* Name */}
                    <h3 className="font-serif text-xs sm:text-base font-bold text-white line-clamp-2 leading-tight group-hover:text-[#FAD38D] transition-colors">
                      {product.name}
                    </h3>

                    {/* Price in Nigerian Naira (₦) */}
                    <p className="font-serif text-sm sm:text-lg font-bold text-[#FAD38D]">
                      ₦{product.price.toLocaleString()}
                    </p>

                    {/* Clickable Colour Swatches */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#F8DDE8]/70">
                        <span>Color:</span>
                        <span className="font-semibold text-white truncate max-w-[80px]">
                          {currentSelection.color}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        {product.colors.map((color) => {
                          const isColorSelected = currentSelection.color === color.name;
                          return (
                            <button
                              key={color.name}
                              type="button"
                              onClick={() => handleColorChange(product.id, color.name)}
                              title={color.name}
                              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border transition-all transform hover:scale-115 flex items-center justify-center ${
                                isColorSelected
                                  ? 'ring-2 ring-[#FF1A88] ring-offset-1 ring-offset-[#1E0719] scale-110'
                                  : 'border-white/30 opacity-75 hover:opacity-100'
                              }`}
                              style={{ backgroundColor: color.hex }}
                            >
                              {isColorSelected && (
                                <Check className={`w-2 h-2 ${color.hex === '#FFFFFF' || color.hex === '#F8F9FA' ? 'text-black' : 'text-white'}`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Conditional Shoe Size Selection */}
                    {product.sizes && (
                      <div className="pt-1.5 space-y-1">
                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#F8DDE8]/70">
                          <span>Size (EU):</span>
                          <span className="font-semibold text-white">{currentSelection.size}</span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSizeChange(product.id, size)}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition ${
                                currentSelection.size === size
                                  ? 'bg-[#E01272] text-white'
                                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Actions: Order Now + Add to Bag */}
                <div className="p-2.5 sm:p-4 pt-0 space-y-1.5">
                  <button
                    onClick={() => onOrderNow(product, currentSelection.color, currentSelection.size)}
                    className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FF1A88] to-[#A80050] text-white text-[11px] sm:text-xs font-bold shadow-[0_0_12px_rgba(255,26,136,0.3)] hover:brightness-110 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>

                  <button
                    onClick={() => onAddToCart(product, currentSelection.color, currentSelection.size)}
                    className="w-full py-1.5 sm:py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#FFF1F6] text-[10px] sm:text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer hover:border-white/25"
                  >
                    <ShoppingBag className="w-3 h-3 text-[#FAD38D]" />
                    <span>Add to Bag</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Product Availability & Category End Notice */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#290E22]/90 via-[#21091A]/90 to-[#290E22]/90 border border-white/15 text-center max-w-3xl mx-auto space-y-3">
          <p className="text-sm sm:text-base font-medium text-[#FFF1F6]">
            "These are some of our products. We have many more available. Contact us for the full collection."
          </p>
          <div className="flex items-center justify-center gap-3 pt-1">
            <a
              href={`https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent('Hello Presh Beauty Studio, I would like to see more designs and products from your collection.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D068] text-[#29151F] font-bold text-xs sm:text-sm shadow-md hover:brightness-110 transition"
            >
              <MessageCircle className="w-4 h-4 fill-[#29151F]" />
              <span>More designs available. Contact us on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
