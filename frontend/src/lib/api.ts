
import { SAMPLE_PRODUCTS } from "./sample-data";
import type { Customer, Order, OrderItem, Product } from "./types";

const BASE_URL =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined)?.replace(/\/$/, "") ?? "";

export const USE_SAMPLE_DATA = !BASE_URL;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

const delay = (ms = 350) =>
  new Promise((resolve) => setTimeout(resolve, ms));

type ApiProduct = Omit<Product, "price" | "rating" | "reviews"> & {
  price: string | number;
  rating?: number;
  reviews?: number;
};

/** GET /api/products/ */
export async function fetchProducts(): Promise<Product[]> {
  if (USE_SAMPLE_DATA) {
    await delay();
    return SAMPLE_PRODUCTS;
  }

  const data = await request<ApiProduct[] | { results: ApiProduct[] }>(
    "/api/products/"
  );

  const products = Array.isArray(data) ? data : data.results;

  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: product.rating ?? 0,
    reviews: product.reviews ?? 0,
  }));
}

/** GET /api/products/{id}/ */
export async function fetchProduct(id: number): Promise<Product> {
  if (USE_SAMPLE_DATA) {
    await delay();
    const product = SAMPLE_PRODUCTS.find((item) => item.id === id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  const product = await request<ApiProduct>(`/api/products/${id}/`);

  return {
    ...product,
    price: Number(product.price),
    rating: product.rating ?? 0,
    reviews: product.reviews ?? 0,
  };
}

export type CreateOrderInput = {
  customer: Customer;
  items: OrderItem[];
};

const DEMO_KEY = "shopease_demo_orders";

/** POST /api/orders/ */
export async function createOrder(
  input: CreateOrderInput
): Promise<Order> {
  if (USE_SAMPLE_DATA) {
    await delay(600);

    const subtotal = input.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = subtotal >= 999 ? 0 : 49;

    const order: Order = {
      id: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      ...input,
      subtotal,
      shipping,
      total: subtotal + shipping,
      created_at: new Date().toISOString(),
      is_demo: true,
    };

    const all = JSON.parse(localStorage.getItem(DEMO_KEY) || "{}");
    all[order.id] = order;
    localStorage.setItem(DEMO_KEY, JSON.stringify(all));

    return order;
  }

  const order = await request<Order>("/api/orders/", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return { ...order, is_demo: false };
}

/** GET /api/orders/{id}/ */
export async function fetchOrder(id: string): Promise<Order> {
  if (USE_SAMPLE_DATA || id.startsWith("DEMO-")) {
    const all = JSON.parse(localStorage.getItem(DEMO_KEY) || "{}");

    if (!all[id]) {
      throw new Error("Order not found");
    }

    return all[id];
  }

  const order = await request<Order>(`/api/orders/${id}/`);

  return { ...order, is_demo: false };
}
