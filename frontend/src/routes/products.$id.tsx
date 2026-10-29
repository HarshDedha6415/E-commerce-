import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, Minus, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";
import { fetchProduct } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/pricing";
import { Rating, StateMessage } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/products/$id")({
  head: () => ({
    meta: [
      { title: "Product Details — ShopEase" },
      { name: "description", content: "View product details, price and availability at ShopEase." },
      { property: "og:title", content: "Product Details — ShopEase" },
      { property: "og:description", content: "View product details, price and availability at ShopEase." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const { data: p, isLoading, isError } = useQuery({ queryKey: ["product", id], queryFn: () => fetchProduct(Number(id)) });
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="container-shop py-10">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-4 w-4" /> Back to products
      </Link>
      {isLoading ? (
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-muted" />
          <div className="space-y-4"><div className="h-8 w-3/4 animate-pulse rounded bg-muted" /><div className="h-24 animate-pulse rounded bg-muted" /></div>
        </div>
      ) : isError || !p ? (
        <div className="mt-6"><StateMessage kind="error" title="Product not found" text="It may have been removed." action={<Link to="/products" className="font-semibold text-primary">Browse products</Link>} /></div>
      ) : (
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <img src={p.image} alt={p.name} className="aspect-square w-full rounded-2xl border border-border object-cover shadow-card" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{p.category}</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">{p.name}</h1>
            <div className="mt-3"><Rating value={p.rating} reviews={p.reviews} /></div>
            <p className="mt-6 text-3xl font-extrabold text-foreground">{formatPrice(p.price)}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium">
              {p.stock > 0 ? (
                <span className="flex items-center gap-1 text-success"><Check className="h-4 w-4" /> In stock{p.stock <= 5 && ` — only ${p.stock} left`}</span>
              ) : (
                <span className="flex items-center gap-1 text-destructive"><X className="h-4 w-4" /> Out of stock</span>
              )}
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>
            {p.stock > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-lg border border-input">
                  <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-muted"><Minus className="h-4 w-4" /></button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button aria-label="Increase" onClick={() => setQty((q) => Math.min(p.stock, q + 1))} className="p-3 hover:bg-muted"><Plus className="h-4 w-4" /></button>
                </div>
                <button
                  onClick={() => { add(p, qty); toast.success(`Added ${qty} × ${p.name}`); }}
                  className="flex-1 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 sm:flex-none"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
