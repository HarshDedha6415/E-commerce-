import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Info } from "lucide-react";
import { fetchOrder } from "@/lib/api";
import { StateMessage } from "@/components/shop/ProductCard";
import { OrderSummary } from "@/components/shop/OrderSummary";

export const Route = createFileRoute("/order/$id")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — ShopEase" },
      { name: "description", content: "Your ShopEase order confirmation." },
      { property: "og:title", content: "Order Confirmed — ShopEase" },
      { property: "og:description", content: "Your ShopEase order confirmation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  ssr: false,
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const { id } = Route.useParams();
  const { data: o, isLoading, isError } = useQuery({ queryKey: ["order", id], queryFn: () => fetchOrder(id), retry: false });

  if (isLoading) return <div className="container-shop py-20 text-center text-muted-foreground">Loading order…</div>;
  if (isError || !o)
    return <div className="container-shop py-10"><StateMessage kind="error" title="Order not found" action={<Link to="/" className="font-semibold text-primary">Go home</Link>} /></div>;

  return (
    <div className="container-shop max-w-3xl py-12">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-4 text-3xl font-bold text-foreground">Thank you, {o.customer.name.split(" ")[0]}!</h1>
        <p className="mt-2 text-muted-foreground">Your order has been placed. A confirmation will be sent to {o.customer.email}.</p>
        <p className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 font-mono text-sm font-semibold text-accent-foreground">Order #{o.id}</p>
      </div>
      {o.is_demo && (
        <p className="mt-6 flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" /> Demo order — this was created with sample data and has NOT been saved to a backend server.
        </p>
      )}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card text-sm">
          <h2 className="text-lg font-bold">Shipping to</h2>
          <p className="mt-3 font-medium">{o.customer.name}</p>
          <p className="text-muted-foreground">{o.customer.address}, {o.customer.city} – {o.customer.pincode}</p>
          <p className="text-muted-foreground">{o.customer.phone}</p>
        </div>
        <OrderSummary lines={o.items.map((i) => ({ key: i.product_id, ...i }))} subtotal={o.subtotal} shipping={o.shipping} total={o.total} />
      </div>
      <div className="mt-8 text-center"><Link to="/products" className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground">Continue shopping</Link></div>
    </div>
  );
}
