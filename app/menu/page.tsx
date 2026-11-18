'use client';

import React, { useState, useEffect } from 'react';
import { CHOCOLATES, Chocolate } from '@/data/chocolates';
import ChocolateCard from '@/components/ChocolateCard';
import { supabase } from '@/lib/supabase';
import { Sparkles, SlidersHorizontal, Search, Gift, Database } from 'lucide-react';
import Link from 'next/link';

export default function MenuPage() {
  const [chocolates, setChocolates] = useState<Chocolate[]>(CHOCOLATES);
  const [loading, setLoading] = useState(true);
  const [isFromSupabase, setIsFromSupabase] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  const categories = ['All', 'Dubai Specials', 'Dark Chocolate', 'Milk Chocolate', 'White & Ruby'];

  // Load menu from Supabase
  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('chocolates')
          .select('*')
          .order('price_aed', { ascending: false });

        if (error) {
          console.warn('Supabase fetch notice (fallback to local data):', error.message);
        } else if (data && data.length > 0) {
          // Map DB snake_case columns to camelCase interface
          const mapped: Chocolate[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            arabicName: item.arabic_name || '',
            tagline: item.tagline || '',
            description: item.description || '',
            priceAED: Number(item.price_aed),
            category: item.category,
            cocoaPercentage: item.cocoa_percentage || '',
            badge: item.badge,
            rating: Number(item.rating) || 5.0,
            reviewsCount: item.reviews_count || 0,
            image: item.image,
            origin: item.origin || '',
            ingredients: item.ingredients || [],
            allergens: item.allergens || [],
            isBestseller: item.is_bestseller || false,
          }));
          setChocolates(mapped);
          setIsFromSupabase(true);
        }
      } catch (err) {
        console.error('Error fetching chocolates from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  // Filter logic
  let filtered = chocolates.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.arabicName.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Sort logic
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.priceAED - b.priceAED);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.priceAED - a.priceAED);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#331D13] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
          {isFromSupabase ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Loaded Live from Supabase</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Collection</span>
            </span>
          )}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FDF8F0]">
          The Artisan Chocolate Menu
        </h1>
        <p className="text-sm sm:text-base text-[#D2BEB0] leading-relaxed">
          Explore our eight signature confections. Handcrafted daily in Dubai using the world’s
          rarest cocoa beans, fresh mountain ingredients, and 24K edible gold.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#22120B] p-4 sm:p-6 rounded-2xl border border-[#D4AF37]/30 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9856F]" />
            <input
              type="text"
              placeholder="Search chocolates or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#140905] border border-[#331D13] rounded-xl text-xs text-[#FDF8F0] placeholder-[#7E5842] focus:outline-none focus:border-[#D4AF37] transition"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs text-[#A9856F] uppercase tracking-wider font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#140905] border border-[#331D13] text-[#FDF8F0] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="default">Signature Order</option>
              <option value="price-low">Price: Low to High (AED)</option>
              <option value="price-high">Price: High to Low (AED)</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? chocolates.length
                : chocolates.filter((c) => c.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] shadow-md shadow-[#D4AF37]/20 font-bold'
                    : 'bg-[#180C07] text-[#D2BEB0] hover:text-[#D4AF37] hover:bg-[#331D13] border border-[#331D13]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#1E0F07]/30 text-[#1E0F07]' : 'bg-[#22120B] text-[#A9856F]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Chocolates */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((chocolate) => (
            <ChocolateCard key={chocolate.id} chocolate={chocolate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#22120B] rounded-2xl border border-[#331D13] p-8 space-y-3">
          <p className="font-serif text-lg text-[#FDF8F0]">No chocolates match your search query</p>
          <p className="text-xs text-[#A9856F]">Try clearing filters or search term to see all 8 chocolates.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#D4AF37] text-[#1E0F07] text-xs font-bold rounded-lg uppercase tracking-wider mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* VIP Tasting Box Banner */}
      <div className="bg-gradient-to-r from-[#331D13] via-[#482B1D] to-[#22120B] p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
            <Gift className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Corporate & VIP Gifting
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDF8F0]">
              The Grand 8-Piece Discovery Box
            </h3>
            <p className="text-xs text-[#D2BEB0] mt-1 max-w-xl">
              Want to taste all eight varieties? Add one of each to your shopping bag or request custom velvet packaging with personalized calligraphy cards.
            </p>
          </div>
        </div>

        <Link
          href="/cart"
          className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shrink-0"
        >
          Go To Bag & Checkout
        </Link>
      </div>
    </div>
  );
}
