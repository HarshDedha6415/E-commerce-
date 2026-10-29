import { formatPrice } from "@/lib/pricing";

type Line = { key: string | number; name: string; image: string; price: number; quantity: number };

export function OrderSummary({ lines, subtotal, shipping, total, children }: { lines?: Line[]; subtotal: number; shipping: number; total: number; children?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="text-lg font-bold text-foreground">Order summary</h2>
      {lines && (
        <ul className="mt-4 divide-y divide-border">
          {lines.map((l) => (
            <li key={l.key} className="flex items-center gap-3 py-3">
              <img src={l.image} alt="" className="h-12 w-12 rounded-md object-cover" />
              <div className="flex-1 text-sm"><p className="line-clamp-1 font-medium text-foreground">{l.name}</p><p className="text-muted-foreground">Qty {l.quantity}</p></div>
              <span className="text-sm font-semibold">{formatPrice(l.price * l.quantity)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-medium">{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
        <div className="flex justify-between border-t border-border pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-bold text-foreground">{formatPrice(total)}</dd></div>
      </dl>
      {children}
    </div>
  );
}
