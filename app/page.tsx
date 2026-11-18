'use client';

import React from 'react';
import Link from 'next/link';
import { CHOCOLATES } from '@/data/chocolates';
import ChocolateCard from '@/components/ChocolateCard';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Gift, Star, Award } from 'lucide-react';

export default function HomePage() {
  const featuredChocolates = CHOCOLATES.slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1E0F07] via-[#22120B] to-[#140905] px-4 sm:px-6 lg:px-8 py-20 border-b border-[#D4AF37]/20">
        {/* Subtle Decorative Background Circles */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#5F3C29]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#331D13]/80 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dubai’s Finest Haute Chocolaterie</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FDF8F0] leading-[1.15]">
              Pure Cocoa Heritage,{' '}
              <span className="block bg-gradient-to-r from-[#F8F1D4] via-[#D4AF37] to-[#C59A2F] bg-clip-text text-transparent">
                Crowned in 24K Gold.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#D2BEB0] leading-relaxed font-light">
              Experience eight signature handcrafted creations combining Swiss grand cru chocolate,
              roasted Kerman pistachios, crisp kunafa, and authentic Emirati saffron. Priced in AED.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E4CB6A] to-[#A6801E] text-[#1E0F07] font-serif font-bold text-base tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 group"
            >
              <span>Explore Menu (8 Chocolates)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/cart"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#22120B] border border-[#D4AF37]/50 text-[#FDF8F0] font-serif font-semibold text-base tracking-wider uppercase hover:bg-[#331D13] hover:border-[#D4AF37] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>View Shopping Cart</span>
            </Link>
          </div>

          {/* UAE Badges Strip */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto border-t border-[#331D13]">
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37] block">8</span>
              <span className="text-xs text-[#A9856F] uppercase tracking-wider">Artisan Flavors</span>
            </div>
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37] block">AED</span>
              <span className="text-xs text-[#A9856F] uppercase tracking-wider">Local UAE Pricing</span>
            </div>
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37] block">2 Hours</span>
              <span className="text-xs text-[#A9856F] uppercase tracking-wider">Express Dubai Courier</span>
            </div>
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37] block">100%</span>
              <span className="text-xs text-[#A9856F] uppercase tracking-wider">Halal & Fresh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
              <Award className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDF8F0]">
              Signature Confections
            </h2>
            <p className="text-sm text-[#A9856F] mt-1">
              Sample our most celebrated creations crafted for discerning palates.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#D4AF37] hover:text-[#F8F1D4] transition group"
          >
            <span>View All 8 Varieties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredChocolates.map((chocolate) => (
            <ChocolateCard key={chocolate.id} chocolate={chocolate} />
          ))}
        </div>
      </section>

      {/* Special Feature: Dubai Kunafa & 24K Gold Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2E180E] via-[#22120B] to-[#140905] border border-[#D4AF37]/40 p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                Exclusive Creations
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FDF8F0] leading-tight">
                The Dubai Kunafa & 24K Gold Sensation
              </h2>
              <p className="text-[#D2BEB0] text-sm sm:text-base leading-relaxed">
                We have perfected the marriage of crispy toasted kataifi, buttery pistachio cream,
                and rare Valrhona cocoa. Presented in our hand-polished cedar boxes with genuine
                24K gold foil trim.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-[#180C07]/70 p-4 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-xs text-[#A9856F] uppercase tracking-wider block">Royal Truffle</span>
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]">85 AED</span>
                </div>
                <div className="bg-[#180C07]/70 p-4 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-xs text-[#A9856F] uppercase tracking-wider block">Kunafa Bonbon</span>
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]">65 AED</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] font-semibold text-sm tracking-wider uppercase hover:brightness-110 active:scale-95 transition shadow-lg"
                >
                  <span>Order From Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=80"
                alt="Dubai Kunafa Pistachio Chocolate"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140905]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#140905]/80 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-wider">Top Rated in UAE</span>
                  <p className="text-sm font-serif font-bold text-white">Dubai Pistachio Kunafa Bonbon</p>
                </div>
                <span className="font-serif text-lg font-bold text-[#D4AF37]">65 AED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cream Card: The Artisanal Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8F1E4] text-[#22120B] rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#D4AF37] shadow-2xl">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold tracking-[0.25em] text-[#7D5F13] uppercase">
              The Chocolatier’s Creed
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22120B]">
              Brown, Cream & Gold: The Trinity of Luxury
            </h2>
            <p className="text-sm text-[#5F3C29] leading-relaxed">
              Every creation starts with grand cru cocoa beans roasted to dark perfection (Brown),
              infused with velvety dairy and Bourbon vanilla (Cream), and finished with pure edible leaf (Gold).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#DFC8A5] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#382015] text-[#D4AF37] flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-[#22120B] mb-2">
                Ethical Single-Origin Cocoa
              </h3>
              <p className="text-xs text-[#5F3C29] leading-relaxed">
                Directly sourced from premier estates in Ecuador, Madagascar, and Ivory Coast with full traceability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#DFC8A5] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#382015] text-[#D4AF37] flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#22120B] mb-2">
                Middle Eastern Botanicals
              </h3>
              <p className="text-xs text-[#5F3C29] leading-relaxed">
                Grade-1 Super Negin saffron, wild Emirati mountain honey, and cardamom ground fresh every dawn.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#DFC8A5] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#382015] text-[#D4AF37] flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-[#22120B] mb-2">
                Gold Leaf Embellishment
              </h3>
              <p className="text-xs text-[#5F3C29] leading-relaxed">
                Hand-applied 24-karat Florentine gold leaf verified 100% food-grade for royal gifting in Dubai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials in UAE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Patron Reviews
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#FDF8F0]">
            Loved Across the Emirates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#22120B] p-6 rounded-2xl border border-[#D4AF37]/25 space-y-4">
            <div className="flex gap-1 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-xs text-[#D2BEB0] italic leading-relaxed">
              &quot;The Dubai Pistachio Kunafa Bonbon is unlike anything else in Dubai. The crunch of the kataifi with warm chocolate is unmatched.&quot;
            </p>
            <div>
              <p className="font-serif text-sm font-bold text-[#FDF8F0]">Fatima Al-Mansouri</p>
              <p className="text-[11px] text-[#A9856F]">Palm Jumeirah, Dubai</p>
            </div>
          </div>

          <div className="bg-[#22120B] p-6 rounded-2xl border border-[#D4AF37]/25 space-y-4">
            <div className="flex gap-1 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-xs text-[#D2BEB0] italic leading-relaxed">
              &quot;Ordered the 24K Gold Truffles for our anniversary dinner in Downtown Dubai. The gold shimmer and smooth Ecuadorian cocoa were pure perfection.&quot;
            </p>
            <div>
              <p className="font-serif text-sm font-bold text-[#FDF8F0]">Tariq & Sarah</p>
              <p className="text-[11px] text-[#A9856F]">Downtown Dubai</p>
            </div>
          </div>

          <div className="bg-[#22120B] p-6 rounded-2xl border border-[#D4AF37]/25 space-y-4">
            <div className="flex gap-1 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-xs text-[#D2BEB0] italic leading-relaxed">
              &quot;Super prompt delivery in Abu Dhabi. Arrived perfectly chilled in high-temperature courier packaging without a hint of melt.&quot;
            </p>
            <div>
              <p className="font-serif text-sm font-bold text-[#FDF8F0]">Dr. Rashid Al-Nuaimi</p>
              <p className="text-[11px] text-[#A9856F]">Saadiyat Island, Abu Dhabi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-[#22120B] via-[#331D13] to-[#22120B] p-10 sm:p-14 rounded-3xl border border-[#D4AF37]/50 shadow-2xl space-y-6">
          <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDF8F0]">
            Ready to Indulge in True Luxury?
          </h2>
          <p className="text-sm text-[#D2BEB0] max-w-xl mx-auto">
            Order your curated box of artisan chocolates today. Fast delivery in temperature-controlled boxes across all UAE emirates.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] font-serif font-bold text-sm tracking-wider uppercase hover:brightness-110 active:scale-95 transition shadow-xl"
            >
              <span>Explore All 8 Chocolates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
