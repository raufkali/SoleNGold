import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPricePKR } from '../utils/cartLogic';

interface CartDrawerProps {
  navigate: (path: string) => void;
  openCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ navigate, openCheckout }) => {
  const { cart, totals, isCartDrawerOpen, setIsCartDrawerOpen, updateQuantity, removeItem } =
    useCart();

  if (!isCartDrawerOpen) return null;

  const remainingForFreeShipping = totals.freeShippingThreshold - totals.subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E7E3DA] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E3DA] flex items-center justify-between bg-[#F8F7F3]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B89550]" />
              <h2 className="font-serif text-xl font-normal text-[#171717] tracking-tight">
                Shopping Bag ({totals.totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#686868] hover:text-[#171717] transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="px-6 py-3 bg-[#171717] text-white text-[11px] tracking-wider uppercase flex items-center justify-between">
            {totals.freeShippingQualified ? (
              <span className="text-[#B89550] font-medium">
                ✓ Complimentary Shipping Unlocked
              </span>
            ) : (
              <span>
                Add {formatPricePKR(remainingForFreeShipping)} more for Free Shipping
              </span>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 border border-[#E7E3DA] flex items-center justify-center text-[#B89550] mb-4 bg-[#F8F7F3]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-xl text-[#171717] mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-[#686868] max-w-xs mb-6">
                  Explore our handcrafted collections of sneakers, loafers, and formal footwear.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-3 bg-[#171717] hover:bg-[#B89550] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
                >
                  START EXPLORING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 border border-[#E7E3DA] bg-[#FFFFFF] hover:border-[#B89550]/40 transition-colors"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 bg-[#F8F7F3] border border-[#E7E3DA] shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#171717] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-[#686868] hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#686868] mt-0.5">
                        EU {item.size} · {item.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F8F7F3]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E7E3DA]">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#171717] hover:bg-[#F8F7F3] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#171717] hover:bg-[#F8F7F3] transition-colors"
                          disabled={item.quantity >= item.maxStock}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#171717] tabular-nums">
                        {formatPricePKR(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Totals & Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E7E3DA] bg-[#F8F7F3] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#686868]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#171717]">
                    {formatPricePKR(totals.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#686868]">
                  <span>Courier Delivery</span>
                  <span className="tabular-nums font-medium text-[#171717]">
                    {totals.shippingFee === 0 ? 'Complimentary' : formatPricePKR(totals.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#171717] pt-2 border-t border-[#E7E3DA]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums text-[#B89550]">
                    {formatPricePKR(totals.total)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-3 bg-white hover:bg-black hover:text-white text-[#171717] border border-[#E7E3DA] text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors text-center cursor-pointer"
                >
                  VIEW BAG
                </button>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    openCheckout();
                  }}
                  className="w-full py-3 bg-[#B89550] hover:bg-[#96753B] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
