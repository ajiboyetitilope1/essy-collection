import React, { createContext, useContext, useMemo, useState } from 'react';
import { products, type Product } from '@/data/products';

export type CartLine = { productId: string; size: string; quantity: number };
type StoreContextValue = {
  cart: CartLine[];
  saved: string[];
  addToBag: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  removeFromBag: (productId: string, size: string) => void;
  toggleSaved: (productId: string) => void;
  clearBag: () => void;
  cartCount: number;
  subtotal: number;
  getProduct: (id: string) => Product | undefined;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: React.PropsWithChildren) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  const value = useMemo<StoreContextValue>(() => {
    const getProduct = (id: string) => products.find((product) => product.id === id);
    const subtotal = cart.reduce((sum, line) => sum + (getProduct(line.productId)?.price ?? 0) * line.quantity, 0);
    return {
      cart,
      saved,
      getProduct,
      subtotal,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
      addToBag: (productId, size) => setCart((current) => {
        const existing = current.find((line) => line.productId === productId && line.size === size);
        return existing
          ? current.map((line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line)
          : [...current, { productId, size, quantity: 1 }];
      }),
      updateQuantity: (productId, size, quantity) => setCart((current) =>
        quantity <= 0
          ? current.filter((line) => line.productId !== productId || line.size !== size)
          : current.map((line) => line.productId === productId && line.size === size ? { ...line, quantity } : line)),
      removeFromBag: (productId, size) => setCart((current) =>
        current.filter((line) => line.productId !== productId || line.size !== size)),
      toggleSaved: (productId) => setSaved((current) =>
        current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]),
      clearBag: () => setCart([]),
    };
  }, [cart, saved]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
