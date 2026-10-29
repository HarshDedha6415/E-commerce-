import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { z } from "zod";
import { fetchProducts } from "@/lib/api";
import { ProductCard, ProductGridSkeleton, StateMessage } from "@/components/shop/ProductCard";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(["featured", "price-asc", "price-desc"]).optional(),
});

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Products — ShopEase" },
      { name: "description", content: "Browse, search and filter the full ShopEase catalogue." },
      { property: "og:title", content: "All Products — ShopEase" },
      { property: "og:description", content: "Browse, search and filter the full ShopEase catalogue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

function Products() {
  const { q = "", category, sort = "featured" } = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  const categories = useMemo(() => [...new Set((data ?? []).map((p) => p.category))], [data]);
  const list = useMemo(() => {
    let l = (data ?? []).filter(
      (p) => (!category || p.category === category) && (!q || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q.toLowerCase())),
    );
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [data, q, category, sort]);

  const set = (patch: Partial<z.infer<typeof searchSchema>>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary"}`;

  return (
    <div className="container-shop py-10">
      <h1 className="text-3xl font-bold text-foreground">{category ?? "All products"}</h1>
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <input
          value={q}
          onChange={(e) => set({ q: e.target.value || undefined })}
          placeholder="Search in catalogue…"
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary lg:max-w-xs"
        />
        <select
          value={sort}
          onChange={(e) => set({ sort: e.target.value as "featured" })}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          aria-label="Sort"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className={chip(!category)} onClick={() => set({ category: undefined })}>All</button>
        {categories.map((c) => (
          <button key={c} className={chip(category === c)} onClick={() => set({ category: c })}>{c}</button>
        ))}
      </div>

      <div className="mt-8">
        {isLoading ? <ProductGridSkeleton /> : isError ? (
          <StateMessage kind="error" title="Couldn't load products" action={<button onClick={() => refetch()} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Retry</button>} />
        ) : list.length === 0 ? (
          <StateMessage kind="empty" title="No products found" text="Try a different search or category." action={<button onClick={() => set({ q: undefined, category: undefined })} className="text-sm font-semibold text-primary">Clear filters</button>} />
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">{list.length} products</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
