import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Laptop, Shirt, Sofa, Dumbbell, BookOpen } from "lucide-react";
import { fetchProducts } from "@/lib/api";
import { SAMPLE_CATEGORIES } from "@/lib/sample-data";
import { ProductCard, ProductGridSkeleton, StateMessage } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopEase — Modern Online Shopping" },
      { name: "description", content: "Shop electronics, fashion, home and more at ShopEase. Free shipping over ₹999." },
      { property: "og:title", content: "ShopEase — Modern Online Shopping" },
      { property: "og:description", content: "Shop electronics, fashion, home and more at ShopEase." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const ICONS: Record<string, typeof Laptop> = { Electronics: Laptop, Fashion: Shirt, Home: Sofa, Sports: Dumbbell, Books: BookOpen };

function Home() {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const featured = data?.filter((p) => p.featured) ?? [];

  return (
    <>
      <section className="bg-hero">
        <div className="container-shop grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">New season arrivals</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              Everything you need, <span className="text-primary">all in one place.</span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">Quality products at honest prices — delivered fast to your door.</p>
            <Link to="/products" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-card-hover hover:bg-primary/90">
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="hidden grid-cols-2 gap-4 md:grid">
            {["photo-1505740420928-5e560c06d30e", "photo-1549298916-b41d501d3772", "photo-1507473885765-e6ed057f782c", "photo-1553062407-98eeb64c6a62"].map((id, i) => (
              <img key={id} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=70`} alt="" className={`aspect-square rounded-2xl object-cover shadow-card ${i % 2 ? "translate-y-6" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-shop -mt-6 grid gap-4 sm:grid-cols-3">
        {[[Truck, "Free shipping", "On orders over ₹999"], [ShieldCheck, "Secure checkout", "Your data stays safe"], [RotateCcw, "Easy returns", "7-day return window"]].map(([Icon, t, d]) => {
          const I = Icon as typeof Truck;
          return (
            <div key={t as string} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
              <I className="h-6 w-6 text-primary" />
              <div><p className="font-semibold text-foreground">{t as string}</p><p className="text-sm text-muted-foreground">{d as string}</p></div>
            </div>
          );
        })}
      </section>

      <section className="container-shop mt-16">
        <h2 className="text-2xl font-bold text-foreground">Shop by category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SAMPLE_CATEGORIES.map((c) => {
            const I = ICONS[c] ?? Laptop;
            return (
              <Link key={c} to="/products" search={{ category: c }} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition hover:border-primary hover:shadow-card-hover">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground"><I className="h-6 w-6" /></span>
                <span className="font-semibold text-foreground">{c}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-shop mt-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-foreground">Featured products</h2>
          <Link to="/products" className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <div className="mt-6">
          {isLoading ? <ProductGridSkeleton count={6} /> : isError ? (
            <StateMessage kind="error" title="Couldn't load products" text="Please check your connection and try again." action={<button onClick={() => refetch()} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Retry</button>} />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
