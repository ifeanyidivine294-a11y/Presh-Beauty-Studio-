import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#180514] border-l border-white/15 text-[#FFF1F6] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#20071A]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#FAD38D]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Your Shopping Bag</h3>
                <p className="text-xs text-[#F8DDE8]/70">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-serif font-bold text-white">Your bag is empty</p>
                  <p className="text-xs text-[#F8DDE8]/70 max-w-xs mt-1">
                    Explore our luxury bags, shoes, jewelry, perfumes, or book a beauty session.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-[#240C1D]/80 border border-white/10"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="truncate">
                        <h4 className="font-serif text-sm font-bold text-white truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#F8DDE8]/70 mt-0.5">
                          {item.color && <span>Color: <strong className="text-white">{item.color}</strong></span>}
                          {item.size && <span>• Size: <strong className="text-white">{item.size}</strong></span>}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        className="text-white/40 hover:text-[#FF1A88] p-1 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="font-serif text-sm font-bold text-[#FAD38D]">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 bg-black/40 rounded-lg px-2 py-1 border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          className="text-white/70 hover:text-white p-0.5"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="text-white/70 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#1D0618] space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#F8DDE8]/80">
                  <span>Bag Subtotal</span>
                  <span className="font-serif font-bold text-white text-base">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#F8DDE8]/60 text-[11px]">
                  <span>Delivery (Waybill / Pickup)</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF1A88] via-[#E01272] to-[#A80050] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,26,136,0.4)] hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#F8DDE8]/60 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FAD38D]" />
                <span>Orders confirmed seamlessly via WhatsApp</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
