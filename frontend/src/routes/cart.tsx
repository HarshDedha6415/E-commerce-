import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";
import { StateMessage } from "@/components/shop/ProductCard";
import { OrderSummary } from "@/components/shop/OrderSummary";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — ShopEase" },
      { name: "description", content: "Review items in your ShopEase shopping cart." },
      { property: "og:title", content: "Your Cart — ShopEase" },
      { property: "og:description", content: "Review items in your ShopEase shopping cart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { items, setQty, remove, subtotal, shipping, total } = useCart();

  return (
    <div className="container-shop py-10">
      <h1 className="text-3xl font-bold text-foreground">Shopping cart</h1>
      {items.length === 0 ? (
        <div className="mt-8"><StateMessage kind="empty" title="Your cart is empty" text="Looks like you haven't added anything yet." action={<Link to="/products" className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Start shopping</Link>} /></div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-4">
            {items.map(({ product: p, quantity }) => (
              <li key={p.id} className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
                <img src={p.image} alt={p.name} className="h-24 w-24 rounded-lg object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link to="/products/$id" params={{ id: String(p.id) }} className="font-semibold text-foreground hover:text-primary">{p.name}</Link>
                    <span className="font-bold">{formatPrice(p.price * quantity)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatPrice(p.price)} each</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-lg border border-input">
                      <button aria-label="Decrease" disabled={quantity <= 1} onClick={() => setQty(p.id, quantity - 1)} className="p-2 hover:bg-muted disabled:opacity-40"><Minus className="h-4 w-4" /></button>
                      <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                      <button aria-label="Increase" disabled={quantity >= p.stock} onClick={() => setQty(p.id, quantity + 1)} className="p-2 hover:bg-muted disabled:opacity-40"><Plus className="h-4 w-4" /></button>
                    </div>
                    <button onClick={() => remove(p.id)} className="flex items-center gap-1 text-sm text-destructive hover:underline"><Trash2 className="h-4 w-4" /> Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <OrderSummary subtotal={subtotal} shipping={shipping} total={total}>
              {shipping > 0 && <p className="mt-3 text-xs text-muted-foreground">Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.</p>}
              <Link to="/checkout" className="mt-5 block rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground hover:bg-primary/90">Proceed to checkout</Link>
            </OrderSummary>
          </div>
        </div>
      )}
    </div>
  );
}
