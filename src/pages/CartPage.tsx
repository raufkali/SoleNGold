import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPricePKR } from '../utils/cartLogic';

interface CartPageProps {
  navigate: (path: string) => void;
  openCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ navigate, openCheckout }) => {
  const { cart, totals, updateQuantity, removeItem, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  const remainingForFree = totals.freeShippingThreshold - totals.subtotal;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'GOLD10' || code === 'WELCOME10') {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try "GOLD10" for 10% off your order.');
    }
  };

  const discountAmount = appliedPromo ? Math.round(totals.subtotal * 0.1) : 0;
  const finalPayable = Math.max(0, totals.total - discountAmount);

  return (
    <div className="bg-[#FFFFFF] min-h-[70vh] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E3DA] mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89550] font-semibold block mb-1">
              YOUR SELECTION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              Shopping Bag
            </h1>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs uppercase tracking-[0.18em] text-[#686868] hover:text-[#171717] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing</span>
          </button>
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center border border-[#E7E3DA] bg-[#F8F7F3] p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 border border-[#B89550] flex items-center justify-center text-[#B89550] mx-auto mb-4 bg-white">
              <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h2 className="font-serif text-2xl text-[#171717] mb-2">Your Bag is Empty</h2>
            <p className="text-xs text-[#686868] max-w-md mx-auto mb-8 font-light leading-relaxed">
              You haven't added any luxury footwear to your shopping bag yet. Explore our latest arrivals of sneakers, loafers, and formal shoes.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-3.5 bg-[#171717] hover:bg-[#B89550] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
            >
              EXPLORE FOOTWEAR
            </button>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Columns: Itemized List */}
            <div className="lg:col-span-8 space-y-6">
              {/* Complimentary shipping bar */}
              <div className="p-4 bg-[#F8F7F3] border border-[#E7E3DA] flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#B89550]" />
                  <span className="font-medium text-[#171717]">
                    {totals.freeShippingQualified
                      ? 'Congratulations! You qualify for complimentary nationwide express delivery.'
                      : `Add ${formatPricePKR(remainingForFree)} more to qualify for Free Shipping.`}
                  </span>
                </div>
                <span className="text-[11px] text-[#686868] uppercase tracking-wider">
                  Express 2-3 Days
                </span>
              </div>

              {/* Items Table/Cards */}
              <div className="border border-[#E7E3DA] divide-y divide-[#E7E3DA]">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-[#FAF9F6] transition-colors"
                  >
                    {/* Image & Details */}
                    <div className="flex items-center gap-5">
                      <div
                        onClick={() => navigate(`/product/${item.productId}`)}
                        className="w-24 h-24 bg-[#F8F7F3] border border-[#E7E3DA] shrink-0 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <button
                          onClick={() => navigate(`/product/${item.productId}`)}
                          className="text-left font-serif text-lg font-medium text-[#171717] hover:text-[#B89550] transition-colors"
                        >
                          {item.name}
                        </button>
                        <div className="text-xs text-[#686868] space-x-2 mt-1">
                          <span>Size: EU {item.size}</span>
                          <span>·</span>
                          <span>Color: {item.color}</span>
                        </div>
                        <p className="text-xs font-semibold text-[#171717] mt-2 tabular-nums">
                          {formatPricePKR(item.unitPrice)} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity Stepper & Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#E7E3DA]">
                      <div className="flex items-center border border-[#E7E3DA]">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#171717] hover:bg-[#F8F7F3] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#171717] hover:bg-[#F8F7F3] transition-colors"
                          disabled={item.quantity >= item.maxStock}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <span className="font-serif text-lg font-medium text-[#171717] tabular-nums block">
                          {formatPricePKR(item.unitPrice * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-[11px] text-[#686868] hover:text-red-600 transition-colors mt-0.5 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-xs text-[#686868] hover:text-red-600 transition-colors uppercase tracking-wider"
                >
                  Clear Bag Contents
                </button>
              </div>
            </div>

            {/* Right 4 Columns: Order Summary Card */}
            <div className="lg:col-span-4">
              <div className="p-6 bg-[#F8F7F3] border border-[#E7E3DA] space-y-6 sticky top-28">
                <h2 className="font-serif text-xl font-medium text-[#171717] pb-3 border-b border-[#E7E3DA]">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-[#686868]">
                    <span>Items Subtotal ({totals.totalItems})</span>
                    <span className="tabular-nums font-medium text-[#171717]">
                      {formatPricePKR(totals.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#686868]">
                    <span>Express Courier Shipping</span>
                    <span className="tabular-nums font-medium text-[#171717]">
                      {totals.shippingFee === 0 ? (
                        <span className="text-[#B89550] uppercase font-semibold">Complimentary</span>
                      ) : (
                        formatPricePKR(totals.shippingFee)
                      )}
                    </span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Discount ({appliedPromo} - 10%)</span>
                      <span className="tabular-nums font-medium">
                        -{formatPricePKR(discountAmount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-semibold text-[#171717] pt-4 border-t border-[#E7E3DA]">
                    <span>Total Due</span>
                    <span className="tabular-nums font-serif text-xl text-[#B89550]">
                      {formatPricePKR(finalPayable)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#686868] mb-2 font-medium">
                    Promotional Code
                  </label>
                  <div className="flex border border-[#E7E3DA] bg-white">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. GOLD10"
                      className="flex-1 py-2.5 px-3 text-xs uppercase tracking-wider focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-4 bg-[#171717] hover:bg-[#B89550] text-white text-[11px] font-semibold uppercase tracking-wider transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-red-600 mt-1">{promoError}</p>
                  )}
                  {appliedPromo && (
                    <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                      ✓ Promo code {appliedPromo} applied successfully!
                    </p>
                  )}
                </form>

                {/* Checkout CTA */}
                <button
                  onClick={openCheckout}
                  className="w-full py-4 bg-[#B89550] hover:bg-[#96753B] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>PROCEED TO DEMO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-[#E7E3DA] space-y-2 text-[11px] text-[#686868]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B89550] shrink-0" />
                    <span>Safe Cash on Delivery or Direct Bank Transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#B89550] shrink-0" />
                    <span>Hassle-free 30-day size exchange guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
