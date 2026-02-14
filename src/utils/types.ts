// Types for the Star Wars Store Application

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  stock: number;
  popularity: number;
}

export type Category = 'lightsabers' | 'clothing' | 'merch';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  email: string;
  isLoggedIn: boolean;
}

export interface Review {
  id: number;
  productId: number;
  productName: string;
  rating: number;
  text: string;
  date: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  promoApplied: boolean;
  date: string;
}

// Hardcoded credentials
export const HARDCODE_CREDENTIALS = {
  email: 'qwe@qwe.ru',
  password: 'qweQWE'
};

// Promo code
export const PROMO_CODE = 'SW10';
export const PROMO_DISCOUNT = 0.10; // 10%

// Payment cards
export const SUCCESS_CARD = '1111111111111111';
