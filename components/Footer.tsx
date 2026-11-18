import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#140905] text-[#D2BEB0] border-t border-[#D4AF37]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#331D13] mb-12">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#22120B]/60 border border-[#D4AF37]/20">
            <div className="w-12 h-12 rounded-full bg-[#382015] flex items-center justify-center shrink-0 text-[#D4AF37]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-[#FDF8F0] font-semibold text-sm">24K Edible Gold & Single Origin</h4>
              <p className="text-xs text-[#A9856F] mt-0.5">Crafted with Valrhona & Swiss grand cru cocoa.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#22120B]/60 border border-[#D4AF37]/20">
            <div className="w-12 h-12 rounded-full bg-[#382015] flex items-center justify-center shrink-0 text-[#D4AF37]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-[#FDF8F0] font-semibold text-sm">Climate-Controlled UAE Courier</h4>
              <p className="text-xs text-[#A9856F] mt-0.5">Same-day delivery in Dubai & 24h across UAE Emirates.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#22120B]/60 border border-[#D4AF37]/20">
            <div className="w-12 h-12 rounded-full bg-[#382015] flex items-center justify-center shrink-0 text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-[#FDF8F0] font-semibold text-sm">Freshness & Halal Guarantee</h4>
              <p className="text-xs text-[#A9856F] mt-0.5">100% Halal certified, preservative-free artisan treats.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#331D13]">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8F6A13] p-[2px]">
                <div className="w-full h-full bg-[#1E0F07] rounded-full flex items-center justify-center font-serif text-[#D4AF37] font-bold">
                  C
                </div>
              </div>
              <span className="font-serif text-lg tracking-widest text-[#FDF8F0] uppercase font-bold">
                Chocolate Shop
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#A9856F]">
              Handcrafting royal chocolate confectionery with pure heritage, French culinary tradition, and Middle Eastern luxury flavors in Dubai.
            </p>
            <div className="text-xs text-[#D4AF37] font-serif">
              Prices listed in AED (United Arab Emirates Dirham)
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#FDF8F0] uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-[#D4AF37] transition">Home</Link></li>
              <li><Link href="/menu" className="hover:text-[#D4AF37] transition">Signature Menu (8 Chocolates)</Link></li>
              <li><Link href="/cart" className="hover:text-[#D4AF37] transition">Shopping Cart</Link></li>
              <li><Link href="/checkout" className="hover:text-[#D4AF37] transition">Secure Checkout</Link></li>
            </ul>
          </div>

          {/* Boutiques */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#FDF8F0] uppercase mb-4">
              Dubai Boutiques
            </h3>
            <ul className="space-y-3 text-xs text-[#A9856F]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>The Dubai Mall, Fashion Avenue Ground Floor, Downtown Dubai</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Galleria Mall, Al Maryah Island, Abu Dhabi</span>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#FDF8F0] uppercase mb-4">
              Concierge Service
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A9856F]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#F5EFEB]">+971 4 800 CHOCO (24626)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>concierge@chocolateshop.ae</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>Daily 10:00 AM – 11:30 PM GST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7E5842] gap-4">
          <p>© {new Date().getFullYear()} Chocolate Shop LLC. All rights reserved. Registered in Dubai, UAE.</p>
          <p className="flex items-center gap-1.5 text-xs text-[#A9856F]">
            Designed with <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" /> in Brown, Cream & Gold
          </p>
        </div>
      </div>
    </footer>
  );
}
