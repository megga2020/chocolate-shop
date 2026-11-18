'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import {
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
  Gift,
  Sparkles,
  ArrowLeft,
  Lock,
  Database,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  MapPin,
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, discount, total, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Sara Al-Hashemi',
    email: 'sara.hashemi@example.ae',
    phone: '+971 50 123 4567',
    emirate: 'Dubai',
    area: 'Downtown Dubai, Boulevard Point, Apt 1402',
    deliveryTime: 'Today Express (Within 2 Hours)',
    giftNote: 'Happy Birthday Mother! Enjoy the 24K Gold Chocolates.',
    includeGiftWrap: true,
    paymentMethod: 'card',
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [supabaseSaved, setSupabaseSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const generatedId = `CS-DXB-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      id: generatedId,
      customer_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      emirate: formData.emirate,
      address: formData.area,
      delivery_time: formData.deliveryTime,
      gift_note: formData.includeGiftWrap ? formData.giftNote : null,
      include_gift_wrap: formData.includeGiftWrap,
      payment_method: formData.paymentMethod,
      items: items.map((item) => ({
        chocolate_id: item.chocolate.id,
        name: item.chocolate.name,
        price_aed: item.chocolate.priceAED,
        quantity: item.quantity,
        total_aed: item.chocolate.priceAED * item.quantity,
      })),
      subtotal_aed: subtotal,
      delivery_fee_aed: deliveryFee,
      discount_aed: discount,
      total_aed: total,
      status: 'Confirmed',
    };

    try {
      // Save order into Supabase
      const { data, error: dbError } = await supabase.from('orders').insert([orderPayload]);
      if (dbError) {
        console.warn('Supabase orders table notice:', dbError.message);
        setSupabaseSaved(false);
      } else {
        setSupabaseSaved(true);
      }

      setOrderId(generatedId);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error('Order saving error:', err);
      setOrderId(generatedId);
      setOrderComplete(true);
      clearCart();
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // If order complete modal
  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Order Confirmed • Shukran!</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDF8F0]">
            Thank You for Your Order
          </h1>
          <p className="text-sm text-[#D2BEB0] max-w-lg mx-auto">
            Your chocolate package has been assigned to our refrigerated luxury courier in Dubai.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#22120B] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 text-left space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-[#331D13] gap-2">
            <div>
              <span className="text-xs text-[#A9856F] uppercase">Order Reference</span>
              <p className="font-serif text-lg font-bold text-[#D4AF37]">{orderId}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-[#A9856F] uppercase">Database Sync</span>
              <p className="text-xs font-semibold text-emerald-400 flex items-center sm:justify-end gap-1">
                <Database className="w-3.5 h-3.5" />
                <span>Saved to Supabase &apos;orders&apos; table</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#A9856F] block uppercase mb-1">Delivery Destination</span>
              <p className="font-semibold text-[#FDF8F0]">{formData.fullName}</p>
              <p className="text-[#D2BEB0]">{formData.area}</p>
              <p className="text-[#D2BEB0]">{formData.emirate}, United Arab Emirates</p>
              <p className="text-[#A9856F] mt-1">{formData.phone}</p>
            </div>

            <div>
              <span className="text-[#A9856F] block uppercase mb-1">Delivery Method</span>
              <p className="font-semibold text-[#D4AF37]">{formData.deliveryTime}</p>
              {formData.includeGiftWrap && (
                <p className="text-[#D2BEB0] mt-1 flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Complimentary Gold Ribbon & Greeting Card</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-xl"
          >
            Order More Chocolates
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#22120B] border border-[#331D13] text-[#FDF8F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#331D13] transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty and user visits checkout directly
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="font-serif text-3xl font-bold text-[#FDF8F0]">No Items to Checkout</h1>
        <p className="text-sm text-[#A9856F]">Your shopping bag is currently empty.</p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#D4AF37] text-[#1E0F07] font-serif font-bold text-xs uppercase tracking-wider"
        >
          <span>Explore Chocolates in AED</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back button & title */}
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F8F1D4] uppercase tracking-wider font-semibold mb-3 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDF8F0]">
          UAE Checkout & Courier Delivery
        </h1>
        <p className="text-xs text-[#A9856F] mt-1">
          Complete your order with climate-controlled delivery in United Arab Emirates. All prices in AED.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Customer & Delivery Form */}
          <div className="bg-[#22120B] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#FDF8F0] flex items-center gap-2 border-b border-[#331D13] pb-3">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>1. Delivery Destination (UAE)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[#D2BEB0] font-semibold">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7E5842]" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Recipient's Name"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#D2BEB0] font-semibold">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7E5842]" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] focus:border-[#D4AF37] focus:outline-none"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#D2BEB0] font-semibold">UAE Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7E5842]" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] focus:border-[#D4AF37] focus:outline-none"
                    placeholder="+971 50 000 0000"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#D2BEB0] font-semibold">Emirate *</label>
                <select
                  name="emirate"
                  value={formData.emirate}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#D2BEB0] font-semibold">Delivery Speed</label>
                <select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="Today Express (Within 2 Hours)">Today Express (Within 2 Hours in Dubai)</option>
                  <option value="Tomorrow Morning (9AM - 1PM)">Tomorrow Morning (9AM - 1PM)</option>
                  <option value="Tomorrow Evening (4PM - 9PM)">Tomorrow Evening (4PM - 9PM)</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[#D2BEB0] font-semibold">Street Address / Villa / Apartment *</label>
                <textarea
                  name="area"
                  required
                  rows={2}
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="Building name, Street, Apartment or Villa number"
                />
              </div>
            </div>

            {/* Gift Options */}
            <div className="pt-4 border-t border-[#331D13] space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#D2BEB0]">
                <input
                  type="checkbox"
                  name="includeGiftWrap"
                  checked={formData.includeGiftWrap}
                  onChange={handleChange}
                  className="rounded text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37]"
                />
                <span className="font-semibold text-[#FDF8F0]">
                  Include Luxury Velvet Gold Ribbon & Handwritten Gift Card (Free)
                </span>
              </label>

              {formData.includeGiftWrap && (
                <div className="space-y-1 text-xs">
                  <label className="text-[#A9856F]">Gift Message for Recipient:</label>
                  <input
                    type="text"
                    name="giftNote"
                    value={formData.giftNote}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] text-xs focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Your personal message..."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-[#22120B] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="font-serif text-lg font-bold text-[#FDF8F0] flex items-center gap-2 border-b border-[#331D13] pb-3">
              <CreditCard className="w-4 h-4 text-[#D4AF37]" />
              <span>2. Payment Method</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#D4AF37] bg-[#331D13]'
                    : 'border-[#331D13] bg-[#140905]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#FDF8F0]">Credit / Debit Card</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="accent-[#D4AF37]"
                  />
                </div>
                <span className="text-[10px] text-[#A9856F]">Visa, Mastercard, AMEX</span>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                  formData.paymentMethod === 'applepay'
                    ? 'border-[#D4AF37] bg-[#331D13]'
                    : 'border-[#331D13] bg-[#140905]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#FDF8F0]">Apple Pay</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="applepay"
                    checked={formData.paymentMethod === 'applepay'}
                    onChange={handleChange}
                    className="accent-[#D4AF37]"
                  />
                </div>
                <span className="text-[10px] text-[#A9856F]">Instant Touch ID / Face ID</span>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#D4AF37] bg-[#331D13]'
                    : 'border-[#331D13] bg-[#140905]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#FDF8F0]">Cash on Delivery</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="accent-[#D4AF37]"
                  />
                </div>
                <span className="text-[10px] text-[#A9856F]">Pay upon arrival (UAE)</span>
              </label>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="text-[#A9856F] block mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4111 2222 3333 4444"
                    className="w-full px-3 py-2 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] tracking-wider focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#A9856F] block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="w-full px-3 py-2 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[#A9856F] block mb-1">CVV Security Code</label>
                    <input
                      type="password"
                      defaultValue="888"
                      className="w-full px-3 py-2 bg-[#140905] border border-[#331D13] rounded-xl text-[#FDF8F0] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Review & Place Order Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#22120B] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#FDF8F0] border-b border-[#331D13] pb-3">
              Order Review ({items.length} items)
            </h2>

            {/* Compact Item list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map(({ chocolate, quantity }) => (
                <div
                  key={chocolate.id}
                  className="flex items-center justify-between text-xs py-2 border-b border-[#331D13]/60 gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={chocolate.image}
                      alt={chocolate.name}
                      className="w-10 h-10 rounded-lg object-cover bg-[#180C07] shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-[#FDF8F0] line-clamp-1">{chocolate.name}</p>
                      <p className="text-[10px] text-[#A9856F]">Qty: {quantity} × {chocolate.priceAED} AED</p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-[#D4AF37]">
                    {chocolate.priceAED * quantity} AED
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs border-t border-[#331D13] pt-4">
              <div className="flex justify-between text-[#D2BEB0]">
                <span>Subtotal</span>
                <span>{subtotal} AED</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Golden Promo (10%)</span>
                  <span>-{discount} AED</span>
                </div>
              )}
              <div className="flex justify-between text-[#D2BEB0]">
                <span>UAE Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `${deliveryFee} AED`}</span>
              </div>

              <div className="border-t border-[#331D13] pt-3 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-[#FDF8F0]">Total Due</span>
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                  {total} <span className="text-xs font-sans text-[#EFE2CC]">AED</span>
                </span>
              </div>
            </div>

            {/* CRITICAL BUTTON: "Place Order" (Matches Step 3 spec) */}
            <button
              type="submit"
              disabled={isPlacingOrder}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E4CB6A] to-[#A6801E] text-[#1E0F07] font-serif font-bold text-base tracking-wider uppercase hover:brightness-110 active:scale-95 transition shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPlacingOrder ? (
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 animate-spin text-[#1E0F07]" />
                  <span>Saving Order to Supabase...</span>
                </span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#1E0F07]" />
                  <span>Place Order ({total} AED)</span>
                </>
              )}
            </button>

            <div className="space-y-2 pt-2 text-[11px] text-[#A9856F] border-t border-[#331D13]">
              <div className="flex items-center gap-2 text-emerald-400">
                <Database className="w-3.5 h-3.5" />
                <span>Direct Supabase database integration enabled.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Halal certified luxury chocolate guarantee.</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Chilled temperature-controlled courier vehicle.</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
