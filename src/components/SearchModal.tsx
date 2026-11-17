import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { STUDIO_SERVICES } from '../data/services';
import { Product, StudioService } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectService: (service: StudioService) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectService
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const filteredProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    : [];

  const filteredServices = q
    ? STUDIO_SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-w-xl w-full bg-[#1F0719] border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-[#FFF1F6]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#280C22]">
          <Search className="w-5 h-5 text-[#FAD38D] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search makeup services, gele, bags, shoes, jewelry, perfumes..."
            className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="text-center py-8 text-xs text-[#F8DDE8]/60 space-y-2">
              <Sparkles className="w-6 h-6 text-[#FAD38D] mx-auto opacity-70" />
              <p>Type to search our studio services or fashion boutique collection</p>
              <div className="flex gap-2 justify-center pt-2 flex-wrap text-[11px]">
                {['Bridal', 'Gele', 'Bags', 'Heels', 'Perfume', 'Lessons'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 && filteredServices.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#F8DDE8]/60">
              No results found for "{query}". Contact us for custom orders!
            </div>
          ) : (
            <>
              {/* Studio Services */}
              {filteredServices.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-[#FAD38D] uppercase tracking-wider">
                    Studio Services
                  </p>
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        onClose();
                        onSelectService(service);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition"
                    >
                      <div>
                        <p className="font-serif font-bold text-sm text-white">{service.title}</p>
                        <p className="text-[11px] text-[#F8DDE8]/70">{service.tagline}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#FAD38D] text-xs">
                          ₦{service.price.toLocaleString()}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/50" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Products */}
              {filteredProducts.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-[#FAD38D] uppercase tracking-wider">
                    Boutique Products
                  </p>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-serif font-bold text-sm text-white line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-[#F8DDE8]/70">
                            {product.category} • {product.colors.length} colors
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#FAD38D] text-xs whitespace-nowrap">
                          ₦{product.price.toLocaleString()}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/50" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
