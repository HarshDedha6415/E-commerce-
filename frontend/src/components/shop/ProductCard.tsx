import { Link } from "@tanstack/react-router";
import { Star, AlertCircle, PackageOpen } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/pricing";
import type { Product } from "@/lib/types";

export function Rating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <Star className="h-4 w-4 fill-warning text-warning" />
      <span className="font-medium text-foreground">{value.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-muted-foreground">({reviews.toLocaleString()})</span>}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const out = product.stock === 0;
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
      <Link to="/products/$id" params={{ id: String(product.id) }} className="relative aspect-square overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {out && <span className="absolute left-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-xs font-semibold text-background">Out of stock</span>}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">{product.category}</p>
        <Link to="/products/$id" params={{ id: String(product.id) }} className="line-clamp-2 font-semibold text-foreground hover:text-primary">
          {product.name}
        </Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          <button
            disabled={out}
            onClick={() => {
              add(product);
              toast.success(`${product.name} added to cart`);
            }}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border">
          <div className="aspect-square animate-pulse bg-muted" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StateMessage({ kind, title, text, action }: { kind: "error" | "empty"; title: string; text?: string; action?: React.ReactNode }) {
  const Icon = kind === "error" ? AlertCircle : PackageOpen;
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-16 text-center">
      <Icon className={kind === "error" ? "h-10 w-10 text-destructive" : "h-10 w-10 text-muted-foreground"} />
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
