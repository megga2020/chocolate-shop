'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chocolate } from '@/data/chocolates';

export interface CartItem {
  chocolate: Chocolate;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (chocolate: Chocolate, quantity?: number) => void;
  removeFromCart: (chocolateId: string) => void;
  updateQuantity: (chocolateId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('chocolate_shop_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedPromo = localStorage.getItem('chocolate_shop_promo');
      if (savedPromo) {
        setAppliedPromo(savedPromo);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('chocolate_shop_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [items, mounted]);

  const addToCart = (chocolate: Chocolate, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.chocolate.id === chocolate.id);
      if (existing) {
        return prev.map((item) =>
          item.chocolate.id === chocolate.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { chocolate, quantity }];
    });
  };

  const removeFromCart = (chocolateId: string) => {
    setItems((prev) => prev.filter((item) => item.chocolate.id !== chocolateId));
  };

  const updateQuantity = (chocolateId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(chocolateId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.chocolate.id === chocolateId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chocolate_shop_cart');
      localStorage.removeItem('chocolate_shop_promo');
    }
  };

  const applyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GOLDEN10' || clean === 'DUBAI10' || clean === 'CHOCO10') {
      setAppliedPromo(clean);
      if (typeof window !== 'undefined') {
        localStorage.setItem('chocolate_shop_promo', clean);
      }
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chocolate_shop_promo');
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.chocolate.priceAED * item.quantity,
    0
  );
  
  // Free delivery over 200 AED, otherwise 20 AED in UAE
  const deliveryFee = subtotal === 0 || subtotal >= 200 ? 0 : 20;
  
  // 10% discount if promo applied
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        discount,
        appliedPromo,
        applyPromo,
        removePromo,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
