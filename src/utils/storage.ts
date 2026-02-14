import { CartItem, User, Review, Order } from './types';
import { HARDCODE_CREDENTIALS, PROMO_CODE, PROMO_DISCOUNT } from './types';
import { products } from './data';

// Cart Storage
export function getCart(): CartItem[] {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId: number): CartItem[] {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push({ product, quantity: 1 });
    }
  }
  
  saveCart(cart);
  updateCartCount();
  return cart;
}

export function removeFromCart(productId: number): CartItem[] {
  let cart = getCart();
  cart = cart.filter(item => item.product.id !== productId);
  saveCart(cart);
  updateCartCount();
  return cart;
}

export function updateQuantity(productId: number, quantity: number): CartItem[] {
  const cart = getCart();
  const item = cart.find(item => item.product.id === productId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
    saveCart(cart);
    updateCartCount();
  }
  
  return cart;
}

export function clearCart(): void {
  localStorage.removeItem('cart');
  updateCartCount();
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function getCartCount(): number {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function updateCartCount(): void {
  const count = getCartCount();
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = count.toString();
  }
}

// Auth Storage
export function getUser(): User | null {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
}

export function saveUser(user: User | null): void {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
  updateAuthButton();
}

export function login(email: string, password: string): boolean {
  if (email === HARDCODE_CREDENTIALS.email && password === HARDCODE_CREDENTIALS.password) {
    saveUser({ email, isLoggedIn: true });
    return true;
  }
  return false;
}

export function logout(): void {
  saveUser(null);
}

export function updateAuthButton(): void {
  const user = getUser();
  const authBtn = document.getElementById('auth-btn');
  if (authBtn) {
    if (user?.isLoggedIn) {
      authBtn.textContent = 'Выход';
      authBtn.classList.add('logged-in');
    } else {
      authBtn.textContent = 'Вход';
      authBtn.classList.remove('logged-in');
    }
  }
}

// Reviews Storage
export function getReviews(): Review[] {
  const data = localStorage.getItem('reviews');
  return data ? JSON.parse(data) : [];
}

export function addReview(review: Omit<Review, 'id' | 'date'>): void {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: Date.now(),
    date: new Date().toLocaleDateString('ru-RU')
  };
  reviews.push(newReview);
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Orders Storage
export function getOrders(): Order[] {
  const data = localStorage.getItem('orders');
  return data ? JSON.parse(data) : [];
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Promo code
export function applyPromoCode(code: string): { valid: boolean; discount: number; message: string } {
  if (code.toUpperCase() === PROMO_CODE) {
    return {
      valid: true,
      discount: PROMO_DISCOUNT,
      message: 'Промокод применён! Скидка 10%'
    };
  }
  return {
    valid: false,
    discount: 0,
    message: 'Неверный промокод'
  };
}
