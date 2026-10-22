import React, { useState } from 'react';
import { X, CheckCircle, ShieldAlert, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPricePKR } from '../utils/cartLogic';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, navigate }) => {
  const { cart, totals, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Lahore',
    postalCode: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [confirmedCart, setConfirmedCart] = useState<typeof cart>([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Full name is required.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errs.phone = 'Valid 11-digit phone number is required (e.g., 03001234567).';
    }
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = 'Complete delivery street address is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedId = `SG-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setConfirmedCart([...cart]);
    setConfirmedTotal(totals.total);
    setIsSubmitted(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border border-[#E7E3DA] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#686868] hover:text-[#171717] transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Order Confirmation View */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#F8F7F3] border border-[#B89550] flex items-center justify-center text-[#B89550] mx-auto mb-4">
              <CheckCircle className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="inline-block border border-[#B89550] px-3 py-1 bg-[#F8F7F3] text-[10px] tracking-[0.2em] uppercase font-semibold text-[#B89550] mb-2">
              DEMO ORDER PLACED
            </div>

            <h2 className="font-serif text-3xl text-[#171717] mb-2 font-normal">
              Order #{orderId} Confirmed
            </h2>

            <p className="text-xs text-[#686868] max-w-md mx-auto mb-6">
              Thank you, <strong className="text-[#171717]">{formData.fullName}</strong>. Your order has been registered in demo mode. Our atelier team would now verify your size and dispatch to <span className="text-[#171717]">{formData.address}, {formData.city}</span>.
            </p>

            {/* Receipt Summary */}
            <div className="bg-[#F8F7F3] border border-[#E7E3DA] p-4 text-left mb-6 max-h-48 overflow-y-auto space-y-2 text-xs">
              <div className="font-semibold text-[#171717] uppercase tracking-wider pb-1 border-b border-[#E7E3DA]">
                Order Items ({confirmedCart.length})
              </div>
              {confirmedCart.map((item) => (
                <div key={item.id} className="flex justify-between text-[#686868]">
                  <span>
                    {item.name} (EU {item.size}, {item.color}) × {item.quantity}
                  </span>
                  <span className="font-medium text-[#171717] tabular-nums">
                    {formatPricePKR(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-sm text-[#171717] pt-2 border-t border-[#E7E3DA]">
                <span>Total Amount</span>
                <span className="text-[#B89550] font-serif text-base tabular-nums">
                  {formatPricePKR(confirmedTotal)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  onClose();
                  navigate('/');
                }}
                className="px-8 py-3 bg-[#171717] hover:bg-[#B89550] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                RETURN TO ATELIER HOME
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#171717] text-white text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 font-medium">
                DEMO CHECKOUT
              </span>
              <span className="text-xs text-[#686868]">No actual payments or card details processed</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] mb-6">
              Finalize Your Order
            </h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#686868] mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Tariq Mansoor"
                    className="w-full border border-[#E7E3DA] p-2.5 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-0.5">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#686868] mb-1 font-medium">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300 1234567"
                    className="w-full border border-[#E7E3DA] p-2.5 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-0.5">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#686868] mb-1 font-medium">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House/Apartment #, Street, Phase / Sector"
                  className="w-full border border-[#E7E3DA] p-2.5 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden"
                />
                {errors.address && (
                  <p className="text-[11px] text-red-600 mt-0.5">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#686868] mb-1 font-medium">
                    City
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-[#E7E3DA] p-2.5 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden bg-white"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Multan">Multan</option>
                    <option value="Quetta">Quetta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#686868] mb-1 font-medium">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="e.g. 54000"
                    className="w-full border border-[#E7E3DA] p-2.5 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#686868] mb-2 font-medium">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 border cursor-pointer text-left transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#B89550] bg-[#F8F7F3]'
                        : 'border-[#E7E3DA] hover:border-black'
                    }`}
                  >
                    <span className="font-serif text-sm font-medium text-[#171717] block">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[11px] text-[#686868] block mt-0.5">
                      Pay courier upon unboxing & inspection
                    </span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 border cursor-pointer text-left transition-colors ${
                      paymentMethod === 'bank'
                        ? 'border-[#B89550] bg-[#F8F7F3]'
                        : 'border-[#E7E3DA] hover:border-black'
                    }`}
                  >
                    <span className="font-serif text-sm font-medium text-[#171717] block">
                      Direct Bank Transfer
                    </span>
                    <span className="text-[11px] text-[#686868] block mt-0.5">
                      Standard Chartered / Meezan Bank
                    </span>
                  </div>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-[#E7E3DA] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#686868] block">Total Payable:</span>
                  <span className="font-serif text-xl font-bold text-[#B89550] tabular-nums">
                    {formatPricePKR(totals.total)}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#B89550] hover:bg-[#96753B] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
                >
                  CONFIRM DEMO ORDER
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
