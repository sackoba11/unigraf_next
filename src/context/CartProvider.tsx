"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onlinePrices as defaultOnlinePrices } from "@/data/commerce";
import {
  formatMoney,
  getPurchasableProduct,
  type OnlinePricesMap,
} from "@/lib/commerce/pricing";
import type { CartItem } from "@/types/order";
import type { Product } from "@/types/product";

const STORAGE_KEY = "unigraf-cart-v1";

type CartLine = {
  productId: string;
  quantity: number;
  product: Product;
};

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => boolean;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadStoredItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toCartLines(items: CartItem[], pricesMap: OnlinePricesMap): CartLine[] {
  return items
    .map((item) => {
      const product = getPurchasableProduct(item.productId, pricesMap);
      if (!product || product.price === null) return null;
      return { ...item, product };
    })
    .filter((line): line is CartLine => line !== null);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [pricesMap, setPricesMap] = useState<OnlinePricesMap>(defaultOnlinePrices);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadStoredItems());
    setHydrated(true);

    fetch("/api/catalog/prices")
      .then((response) => response.json())
      .then((data: { prices?: OnlinePricesMap }) => {
        if (data.prices) setPricesMap(data.prices);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const lines = useMemo(() => toCartLines(items, pricesMap), [items, pricesMap]);

  const addItem = useCallback(
    (productId: string, quantity = 1) => {
      const product = getPurchasableProduct(productId, pricesMap);
      if (!product) return false;

      setItems((current) => {
        const existing = current.find((item) => item.productId === productId);
        if (existing) {
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...current, { productId, quantity }];
      });
      return true;
    },
    [pricesMap],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce(
        (sum, line) => sum + (line.product.price ?? 0) * line.quantity,
        0,
      ),
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [lines, addItem, removeItem, setQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function useCartCount(): number {
  const context = useContext(CartContext);
  return context?.count ?? 0;
}

export { formatMoney };
