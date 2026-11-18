'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Chocolate } from '@/data/chocolates';
import { useCart } from '@/context/CartContext';
import { Star, Plus, Check, Eye, X, Sparkles, ShieldCheck } from 'lucide-react';

interface ChocolateCardProps {
  chocolate: Chocolate;
}

export default function ChocolateCard({ chocolate }: ChocolateCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(chocolate, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div className="group relative bg-[#22120B] rounded-2xl overflow-hidden border border-[#D4AF37]/25 hover:border-[#D4AF37] shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 flex flex-col justify-between">
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          {chocolate.badge ? (
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-[#1E0F07]" />
              {chocolate.badge}
            </span>
          ) : <span />}

          <span className="bg-[#140905]/80 backdrop-blur-sm text-[#F8F1D4] text-[10px] font-medium px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
            {chocolate.cocoaPercentage}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative h-60 w-full overflow-hidden bg-[#180C07]">
          {/* Fallback image with styling */}
          <img
            src={chocolate.image}
            alt={chocolate.name}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#22120B] via-transparent to-transparent opacity-80" />

          {/* Quick view button */}
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-[#140905]/85 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1E0F07] transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            title="Quick Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#D4AF37] mb-1">
              <span className="tracking-widest uppercase text-[10px] font-medium text-[#C59A2F]">
                {chocolate.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-semibold text-[#FDF8F0]">{chocolate.rating}</span>
                <span className="text-[#7E5842]">({chocolate.reviewsCount})</span>
              </div>
            </div>

            <h3 className="font-serif text-lg font-bold text-[#FDF8F0] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
              {chocolate.name}
            </h3>
            <p className="text-xs font-serif text-[#C7A97E] mb-2 dir-rtl">
              {chocolate.arabicName}
            </p>

            <p className="text-xs text-[#A9856F] line-clamp-2 leading-relaxed mb-4">
              {chocolate.description}
            </p>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="pt-3 border-t border-[#331D13] flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A9856F] block">
                Price
              </span>
              <div className="font-serif text-xl font-bold text-[#D4AF37] flex items-baseline gap-1">
                <span>{chocolate.priceAED}</span>
                <span className="text-xs font-sans font-medium text-[#EFE2CC]">AED</span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 shadow-md ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] hover:brightness-110 active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#22120B] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-[#140905]/80 text-[#D2BEB0] hover:text-white hover:bg-[#331D13] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-full bg-[#180C07]">
                <img
                  src={chocolate.image}
                  alt={chocolate.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  {chocolate.badge && (
                    <span className="bg-[#D4AF37] text-[#1E0F07] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {chocolate.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#D4AF37] mb-1">
                    {chocolate.category} • {chocolate.cocoaPercentage}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#FDF8F0] mb-1">
                    {chocolate.name}
                  </h3>
                  <p className="text-sm font-serif text-[#C7A97E] mb-3">
                    {chocolate.arabicName}
                  </p>

                  <p className="text-xs text-[#D2BEB0] leading-relaxed mb-4">
                    {chocolate.description}
                  </p>

                  <div className="space-y-2 mb-4 text-xs">
                    <div>
                      <strong className="text-[#D4AF37]">Origin:</strong>{' '}
                      <span className="text-[#EFE2CC]">{chocolate.origin}</span>
                    </div>
                    <div>
                      <strong className="text-[#D4AF37]">Ingredients:</strong>{' '}
                      <span className="text-[#A9856F]">{chocolate.ingredients.join(', ')}</span>
                    </div>
                    {chocolate.allergens.length > 0 && (
                      <div>
                        <strong className="text-amber-400">Allergens:</strong>{' '}
                        <span className="text-[#A9856F]">{chocolate.allergens.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#331D13] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9856F]">Price</span>
                    <div className="font-serif text-2xl font-bold text-[#D4AF37]">
                      {chocolate.priceAED} <span className="text-xs font-sans text-[#EFE2CC]">AED</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#331D13] rounded-lg bg-[#140905]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2.5 py-1 text-sm text-[#D4AF37] hover:bg-[#331D13]"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#FDF8F0]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2.5 py-1 text-sm text-[#D4AF37] hover:bg-[#331D13]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        handleAdd();
                        setShowModal(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A6801E] text-[#1E0F07] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
