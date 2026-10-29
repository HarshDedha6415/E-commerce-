import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { calcTotals } from "./pricing";
import type { CartItem, Product } from "./types";

const KEY = "shopease_cart";

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (p: Product, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  const value = useMemo<CartCtx>(() => {
    const clamp = (p: Product, q: number) => Math.max(1, Math.min(q, p.stock || 1));
    return {
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      ...calcTotals(items),
      add: (p, qty = 1) =>
        setItems((prev) => {
          const ex = prev.find((i) => i.product.id === p.id);
          if (ex) return prev.map((i) => (i.product.id === p.id ? { ...i, quantity: clamp(p, i.quantity + qty) } : i));
          return [...prev, { product: p, quantity: clamp(p, qty) }];
        }),
      setQty: (id, qty) =>
        setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, quantity: clamp(i.product, qty) } : i))),
      remove: (id) => setItems((prev) => prev.filter((i) => i.product.id !== id)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
