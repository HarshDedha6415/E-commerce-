import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, Store } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q: q.trim() || undefined } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-shop flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Store className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">ShopEase</span>
        </Link>
        <form onSubmit={submit} className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="h-10 w-full rounded-full border border-input bg-muted pl-9 pr-4 text-sm outline-none focus:border-primary focus:bg-background focus:ring-2 focus:ring-ring/20"
          />
        </form>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link to="/products" className="hidden rounded-md px-3 py-2 text-muted-foreground hover:text-foreground md:block" activeProps={{ className: "text-primary" }}>
            Shop
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative rounded-md p-2 text-foreground hover:bg-muted">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-muted">
      <div className="container-shop grid gap-8 py-12 sm:grid-cols-3 text-sm">
        <div>
          <p className="text-base font-bold text-foreground">ShopEase</p>
          <p className="mt-2 text-muted-foreground">Everyday essentials, delivered with ease.</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Shop</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li><Link to="/products" className="hover:text-primary">All products</Link></li>
            <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-foreground">Support</p>
          <p className="mt-2 text-muted-foreground">Free shipping on orders over ₹999. 7-day easy returns.</p>
        </div>
      </div>
      <p className="border-t border-border py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} ShopEase · Internship project</p>
    </footer>
  );
}
