import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CartItem,
  CartTotals,
  addItemToCart,
  updateCartQuantity,
  removeFromCart,
  calculateCartTotals,
} from '../utils/cartLogic';

interface CartContextType {
  cart: CartItem[];
  totals: CartTotals;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addItem: (item: {
    productId: string;
    name: string;
    image: string;
    unitPrice: number;
    size: string | number;
    color: string;
    quantity: number;
    maxStock: number;
  }) => void;
  updateQuantity: (
    productId: string,
    size: string | number,
    color: string,
    newQuantity: number
  ) => void;
  removeItem: (productId: string, size: string | number, color: string) => void;
  clearCart: () => void;
  notification: string | null;
  dismissNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'sole_and_gold_cart_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Storage unavailable or corrupted; fallback to empty array
    }
    return [];
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to localStorage whenever cart state changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore quota exceptions gracefully
    }
  }, [cart]);

  // Auto-dismiss notification after 4 seconds
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification]);

  const addItem = (item: {
    productId: string;
    name: string;
    image: string;
    unitPrice: number;
    size: string | number;
    color: string;
    quantity: number;
    maxStock: number;
  }) => {
    setCart((prev) => addItemToCart(prev, item));
    setNotification(`Added "${item.name}" (Size: ${item.size}, ${item.color}) to your bag.`);
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (
    productId: string,
    size: string | number,
    color: string,
    newQuantity: number
  ) => {
    setCart((prev) => updateCartQuantity(prev, productId, size, color, newQuantity));
  };

  const removeItem = (productId: string, size: string | number, color: string) => {
    setCart((prev) => removeFromCart(prev, productId, size, color));
  };

  const clearCart = () => {
    setCart([]);
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  const totals = calculateCartTotals(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        totals,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        notification,
        dismissNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
