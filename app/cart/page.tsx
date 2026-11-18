'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    discount,
    appliedPromo,
    applyPromo,
    removePromo,
    total,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const success = applyPromo(promoInput);
    if (!success) {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 3000);
    } else {
      setPromoInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#22120B] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-[#FDF8F0]">Your Shopping Bag is Empty</h1>
          <p className="text-sm text-[#A9856F] max-w-md mx-auto">
            Discover our eight signature chocolates made with 24K gold, roasted pistachios, and single-origin cocoa.
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] font-serif font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-xl"
          >
            <span>Explore 8 Signature Chocolates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#331D13] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Order Review
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDF8F0]">
            Your Shopping Bag
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#A9856F] hover:text-red-400 transition self-start sm:self-auto flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Items</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ chocolate, quantity }) => (
            <div
              key={chocolate.id}
              className="bg-[#22120B] border border-[#D4AF37]/25 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg hover:border-[#D4AF37]/50 transition"
            >
              {/* Image & Title */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#180C07] shrink-0 border border-[#331D13]">
                  <img
                    src={chocolate.image}
                    alt={chocolate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-medium block">
                    {chocolate.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#FDF8F0]">
                    {chocolate.name}
                  </h3>
                  <p className="text-xs text-[#C7A97E] font-serif">
                    {chocolate.arabicName}
                  </p>
                  <p className="text-xs text-[#A9856F] mt-0.5">
                    Unit: <strong className="text-[#D4AF37]">{chocolate.priceAED} AED</strong>
                  </p>
                </div>
              </div>

              {/* Quantity & Controls */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#331D13]">
                {/* Plus / Minus */}
                <div className="flex items-center border border-[#331D13] bg-[#140905] rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(chocolate.id, quantity - 1)}
                    className="px-3 py-1.5 text-[#D4AF37] hover:bg-[#331D13] transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#FDF8F0] min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(chocolate.id, quantity + 1)}
                    className="px-3 py-1.5 text-[#D4AF37] hover:bg-[#331D13] transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal for Item */}
                <div className="text-right min-w-[80px]">
                  <span className="text-[10px] text-[#A9856F] block uppercase">Total</span>
                  <span className="font-serif text-lg font-bold text-[#D4AF37]">
                    {chocolate.priceAED * quantity} <span className="text-xs font-sans text-[#EFE2CC]">AED</span>
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(chocolate.id)}
                  className="p-2 text-[#7E5842] hover:text-red-400 hover:bg-[#140905] rounded-lg transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Delivery Note */}
          <div className="p-4 rounded-xl bg-[#22120B]/60 border border-[#D4AF37]/20 flex items-center gap-3 text-xs text-[#D2BEB0]">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              Orders above <strong>200 AED</strong> qualify for complimentary refrigerated express courier delivery across all 7 Emirates.
            </span>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#22120B] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#FDF8F0] border-b border-[#331D13] pb-4">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-xs text-[#D2BEB0] font-semibold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Promo Code</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try 'GOLDEN10'"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full bg-[#140905] border border-[#331D13] rounded-xl px-3 py-2 text-xs text-[#FDF8F0] uppercase tracking-wider focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#331D13] hover:bg-[#482B1D] text-[#D4AF37] font-bold text-xs uppercase tracking-wider rounded-xl border border-[#D4AF37]/30 transition"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-[11px] text-red-400">Invalid promo code. Use GOLDEN10 for 10% off.</p>
              )}
              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800">
                  <span>Code <strong>{appliedPromo}</strong> applied (-10%)</span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-emerald-300 hover:text-white underline text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Price Breakdown */}
            <div className="space-y-3 text-xs border-t border-[#331D13] pt-4">
              <div className="flex justify-between text-[#D2BEB0]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#FDF8F0]">{subtotal} AED</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount (10% Golden Code)</span>
                  <span>-{discount} AED</span>
                </div>
              )}

              <div className="flex justify-between text-[#D2BEB0]">
                <span>UAE Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-400 font-semibold">FREE</span>
                ) : (
                  <span className="font-semibold text-[#FDF8F0]">{deliveryFee} AED</span>
                )}
              </div>

              <div className="border-t border-[#331D13] pt-3 flex justify-between items-baseline">
                <div>
                  <span className="font-serif text-base font-bold text-[#FDF8F0] block">Grand Total</span>
                  <span className="text-[10px] text-[#A9856F]">Includes 5% UAE VAT</span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                    {total} <span className="text-xs font-sans text-[#EFE2CC]">AED</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] font-serif font-bold text-sm tracking-wider uppercase hover:brightness-110 active:scale-95 transition shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#A9856F] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Encrypted 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
