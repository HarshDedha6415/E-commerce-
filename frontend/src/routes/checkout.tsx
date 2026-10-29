import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { createOrder, USE_SAMPLE_DATA } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { StateMessage } from "@/components/shop/ProductCard";
import { OrderSummary } from "@/components/shop/OrderSummary";
import type { Customer } from "@/lib/types";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — ShopEase" },
      { name: "description", content: "Enter your shipping details to complete your ShopEase order." },
      { property: "og:title", content: "Checkout — ShopEase" },
      { property: "og:description", content: "Complete your ShopEase order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  address: z.string().trim().min(5, "Enter your street address").max(300),
  city: z.string().trim().min(2, "Enter your city").max(100),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a 6-digit PIN code"),
});

const FIELDS: { key: keyof Customer; label: string; type?: string; full?: boolean }[] = [
  { key: "name", label: "Full name", full: true },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "address", label: "Shipping address", full: true },
  { key: "city", label: "City" },
  { key: "pincode", label: "PIN code" },
];

function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<Customer>({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  if (items.length === 0)
    return <div className="container-shop py-10"><StateMessage kind="empty" title="Nothing to check out" text="Your cart is empty." action={<Link to="/products" className="font-semibold text-primary">Browse products</Link>} /></div>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    const r = customerSchema.safeParse(form);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Customer] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const order = await createOrder({
        customer: r.data as Customer,
        items: items.map((i) => ({ product_id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity, image: i.product.image })),
      });
      clear();
      navigate({ to: "/order/$id", params: { id: order.id } });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Could not place order");
      setSubmitting(false);
    }
  };

  return (
    <div className="container-shop py-10">
      <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} noValidate className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold">Shipping details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <label key={f.key} className={f.full ? "sm:col-span-2" : ""}>
                <span className="text-sm font-medium text-foreground">{f.label}</span>
                <input
                  type={f.type ?? "text"}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  aria-invalid={!!errors[f.key]}
                  className={`mt-1 h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/20 ${errors[f.key] ? "border-destructive" : "border-input focus:border-primary"}`}
                />
                {errors[f.key] && <span className="mt-1 block text-xs text-destructive">{errors[f.key]}</span>}
              </label>
            ))}
          </div>
          {apiError && <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{apiError}</p>}
          {USE_SAMPLE_DATA && <p className="mt-4 rounded-lg bg-accent p-3 text-xs text-accent-foreground">Demo mode: no backend is connected, so this order will only be stored in your browser.</p>}
          <button disabled={submitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />} {submitting ? "Placing order…" : "Place order"}
          </button>
        </form>
        <div>
          <OrderSummary
            lines={items.map((i) => ({ key: i.product.id, name: i.product.name, image: i.product.image, price: i.product.price, quantity: i.quantity }))}
            subtotal={subtotal} shipping={shipping} total={total}
          />
        </div>
      </div>
    </div>
  );
}
