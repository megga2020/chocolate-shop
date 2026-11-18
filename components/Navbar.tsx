'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles, Award } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu & Boutique' },
    { href: '/cart', label: 'Cart' },
    { href: '/checkout', label: 'Checkout' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1E0F07]/95 backdrop-blur-md border-b border-[#D4AF37]/30 transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-[#2C1810] text-[#EFE0C7] text-xs py-1.5 px-4 text-center border-b border-[#D4AF37]/20 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Complimentary Express Delivery in UAE on orders above <strong>200 AED</strong></span>
        <span className="hidden sm:inline text-[#D4AF37]">|</span>
        <span className="hidden sm:inline text-gold-300">Use code <strong>GOLDEN10</strong> for 10% OFF</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F8F1D4] to-[#A6801E] p-[2px] shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#1E0F07] rounded-full flex items-center justify-center">
              <span className="text-[#D4AF37] font-serif font-bold text-xl">C</span>
            </div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#FDF8F0] uppercase flex items-center gap-1.5">
              Chocolate Shop
            </div>
            <div className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-sans">
              Artisan Chocolatier • Dubai
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-wider uppercase font-medium transition-colors py-1 ${
                  isActive
                    ? 'text-[#D4AF37]'
                    : 'text-[#F5EFEB] hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Cart Button & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <Link
            href="/cart"
            className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#331D13] border border-[#D4AF37]/40 text-[#FDF8F0] hover:border-[#D4AF37] hover:bg-[#482B1D] transition-all shadow-md group"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
              Bag
            </span>
            <span className="bg-[#D4AF37] text-[#1E0F07] font-bold text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {totalItems}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#FDF8F0] hover:text-[#D4AF37] p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#22120B] border-b border-[#D4AF37]/30 px-6 py-5 space-y-4 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base tracking-widest uppercase font-serif py-2 border-b border-[#382015] ${
                  isActive ? 'text-[#D4AF37]' : 'text-[#F5EFEB]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
