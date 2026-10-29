export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  description: string;
  featured?: boolean;
};

export type CartItem = { product: Product; quantity: number };

export type Customer = { name: string; email: string; phone: string; address: string; city: string; pincode: string };

export type OrderItem = { product_id: number; name: string; price: number; quantity: number; image: string };

export type Order = {
  id: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
  /** true when created locally from sample data — NOT saved on the server */
  is_demo: boolean;
};
