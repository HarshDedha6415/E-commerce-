// SAMPLE DATA ONLY — used when VITE_API_BASE_URL is not set.
// Live data comes from the Django REST API via src/lib/api.ts.
import type { Product } from "./types";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const SAMPLE_CATEGORIES = ["Electronics", "Fashion", "Home", "Sports", "Books"];

export const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: "Wireless Noise-Cancelling Headphones", category: "Electronics", price: 4999, rating: 4.6, reviews: 1284, stock: 24, featured: true, image: img("photo-1505740420928-5e560c06d30e"), description: "Over-ear Bluetooth headphones with active noise cancellation, 30-hour battery life and plush memory-foam ear cushions." },
  { id: 2, name: "Smart Fitness Watch", category: "Electronics", price: 3499, rating: 4.3, reviews: 842, stock: 12, featured: true, image: img("photo-1523275335684-37898b6baf30"), description: "Track heart rate, sleep, steps and workouts. Water resistant up to 50m with a 7-day battery." },
  { id: 3, name: "Portable Bluetooth Speaker", category: "Electronics", price: 1899, rating: 4.4, reviews: 563, stock: 0, image: img("photo-1608043152269-423dbba4e7e1"), description: "Compact speaker with deep bass, IPX7 waterproofing and 12 hours of playtime." },
  { id: 4, name: "Classic White Sneakers", category: "Fashion", price: 2499, rating: 4.5, reviews: 2210, stock: 40, featured: true, image: img("photo-1549298916-b41d501d3772"), description: "Minimal leather sneakers with a cushioned sole — easy to pair with anything." },
  { id: 5, name: "Denim Jacket", category: "Fashion", price: 2199, rating: 4.2, reviews: 318, stock: 8, image: img("photo-1576995853123-5a10305d93c0"), description: "Timeless mid-wash denim jacket with a relaxed fit and button-front closure." },
  { id: 6, name: "Leather Backpack", category: "Fashion", price: 3299, rating: 4.7, reviews: 476, stock: 15, featured: true, image: img("photo-1553062407-98eeb64c6a62"), description: "Full-grain leather backpack with a padded 15\" laptop sleeve and plenty of pockets." },
  { id: 7, name: "Ceramic Coffee Mug Set", category: "Home", price: 899, rating: 4.4, reviews: 190, stock: 60, image: img("photo-1514228742587-6b1558fcca3d"), description: "Set of four hand-glazed ceramic mugs, microwave and dishwasher safe." },
  { id: 8, name: "Modern Table Lamp", category: "Home", price: 1599, rating: 4.1, reviews: 122, stock: 5, featured: true, image: img("photo-1507473885765-e6ed057f782c"), description: "Warm ambient lamp with a fabric shade and solid wood base." },
  { id: 9, name: "Indoor Plant in Pot", category: "Home", price: 749, rating: 4.6, reviews: 341, stock: 30, image: img("photo-1485955900006-10f4d324d411"), description: "Easy-care leafy plant in a matte ceramic pot — brightens any desk." },
  { id: 10, name: "Yoga Mat", category: "Sports", price: 1199, rating: 4.5, reviews: 655, stock: 22, image: img("photo-1601925260368-ae2f83cf8b7f"), description: "6mm non-slip mat with alignment lines and a carry strap." },
  { id: 11, name: "Adjustable Dumbbells", category: "Sports", price: 5999, rating: 4.7, reviews: 288, stock: 3, featured: true, image: img("photo-1638536532686-d610adfc8e5c"), description: "Quick-change dumbbells adjusting from 2.5kg to 24kg — replaces 15 sets." },
  { id: 12, name: "Insulated Water Bottle", category: "Sports", price: 699, rating: 4.3, reviews: 912, stock: 80, image: img("photo-1602143407151-7111542de6e8"), description: "Stainless steel bottle keeps drinks cold for 24 hours or hot for 12." },
  { id: 13, name: "The Pragmatic Programmer", category: "Books", price: 1299, rating: 4.8, reviews: 1560, stock: 18, image: img("photo-1544947950-fa07a98d237f"), description: "A classic guide to software craftsmanship, updated for modern development." },
  { id: 14, name: "Hardcover Notebook", category: "Books", price: 399, rating: 4.4, reviews: 233, stock: 100, image: img("photo-1531346878377-a5be20888e57"), description: "A5 dotted notebook with 192 thick, ink-friendly pages." },
];
