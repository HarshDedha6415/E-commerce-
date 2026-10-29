import { describe, expect, it } from "vitest";
import { calcTotals } from "@/lib/pricing";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";

const p = (price: number) => ({ ...SAMPLE_PRODUCTS[0]!, price });

describe("cart totals", () => {
  it("sums price × quantity and adds ₹49 shipping under ₹999", () => {
    expect(calcTotals([{ product: p(300), quantity: 2 }])).toEqual({ subtotal: 600, shipping: 49, total: 649 });
  });
  it("ships free at ₹999 or more", () => {
    expect(calcTotals([{ product: p(999), quantity: 1 }]).total).toBe(999);
  });
});
