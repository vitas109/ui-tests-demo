import './styles/main.css';
import { products, categoryNames } from './utils/data';
import { Product, CartItem, Review, Category } from './utils/types';
import * as storage from './utils/storage';
import { SUCCESS_CARD, PROMO_DISCOUNT } from './utils/types';

// State
let currentPage = '';
let currentFilters = {
  category: '' as Category | '',
  minPrice: 0,
  maxPrice: 20000,
  sortBy: 'popularity' as 'popularity' | 'stock'
};
let promoApplied = false;
let selectedRating = 0;

// Custom Alert Function
function showAlert(message: string): void {
  const existingOverlay = document.querySelector('.custom-alert-overlay');
  if (existingOverlay) existingOverlay.remove();
  
  const existingAlert = document.querySelector('.custom-alert');
  if (existingAlert) existingAlert.remove();
  
  const overlay = document.createElement('div');
  overlay.className = 'custom-alert-overlay';
  
  const alert = document.createElement('div');
  alert.className = 'custom-alert';
  alert.textContent = message;
  
  document.body.appendChild(overlay);
  document.body.appendChild(alert);
  
  setTimeout(() => {
    overlay.remove();
    alert.remove();
  }, 2000);
  
  overlay.addEventListener('click', () => {
    overlay.remove();
    alert.remove();
  });
}

// Initialize app
function init(): void {
  storage.updateCartCount();
  storage.updateAuthButton();
  handleRoute();
  setupEventListeners();
  window.addEventListener('hashchange', handleRoute);
}

// Router
function handleRoute(): void {
  const hash = window.location.hash.slice(1) || '/';
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  if (hash === '/' || hash === '') {
    currentPage = 'home';
    renderHomePage(mainContent);
  } else if (hash === '/catalog') {
    currentPage = 'catalog';
    renderCatalogPage(mainContent);
  } else if (hash === '/cart') {
    currentPage = 'cart';
    renderCartPage(mainContent);
  } else if (hash === '/checkout') {
    currentPage = 'checkout';
    renderCheckoutPage(mainContent);
  } else if (hash === '/reviews') {
    currentPage = 'reviews';
    renderReviewsPage(mainContent);
  } else if (hash === '/success') {
    currentPage = 'success';
    renderSuccessPage(mainContent);
  } else if (hash === '/failure') {
    currentPage = 'failure';
    renderFailurePage(mainContent);
  } else if (hash === '/profile') {
    currentPage = 'profile';
    renderProfilePage(mainContent);
  }
}

// Event Listeners
function setupEventListeners(): void {
  // Auth button
  document.getElementById('auth-btn')?.addEventListener('click', () => {
    const user = storage.getUser();
    if (user?.isLoggedIn) {
      storage.logout();
    } else {
      openAuthModal();
    }
  });

  // Auth modal
  document.getElementById('close-auth')?.addEventListener('click', closeAuthModal);
  document.getElementById('auth-modal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAuthModal();
  });

  document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
  document.getElementById('auth-toggle-link')?.addEventListener('click', toggleAuthMode);

  // Cart link
  document.querySelector('.cart-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/cart';
  });
}

// Auth
function openAuthModal(): void {
  document.getElementById('auth-modal')?.classList.add('active');
}

function closeAuthModal(): void {
  document.getElementById('auth-modal')?.classList.remove('active');
  (document.getElementById('auth-form') as HTMLFormElement)?.reset();
  
  // Refresh profile page if needed
  if (currentPage === 'profile') {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      renderProfilePage(mainContent);
    }
  }
}

let isLoginMode = true;

function toggleAuthMode(e: Event): void {
  e.preventDefault();
  isLoginMode = !isLoginMode;
  document.getElementById('auth-title')!.textContent = isLoginMode ? 'Вход' : 'Регистрация';
  document.getElementById('auth-submit')!.textContent = isLoginMode ? 'Войти' : 'Регистрация';
  document.getElementById('auth-toggle-text')!.textContent = isLoginMode ? 'Нет аккаунта?' : 'Есть аккаунт?';
  document.getElementById('auth-toggle-link')!.textContent = isLoginMode ? 'Регистрация' : 'Вход';
}

function handleAuth(e: Event): void {
  e.preventDefault();
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  if (!email || !password) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  if (isLoginMode) {
    if (storage.login(email, password)) {
      closeAuthModal();
    } else {
      alert('Неверные учетные данные');
    }
  } else {
    // Registration - same credentials for demo
    storage.login(email, password);
    closeAuthModal();
  }
}

// Page Renderers
function renderHomePage(container: HTMLElement): void {
  container.innerHTML = `
    <section class="hero">
      <h1>Добро пожаловать в Galaxy Store</h1>
      <p>Магазин лучшей атрибутики по вселенной Звёздных войн. Световые мечи, одежда, фигурки и многое другое!</p>
      <a href="#/catalog" class="btn btn-primary">Перейти в каталог</a>
    </section>
    <section class="features">
      <div class="feature-card" onclick="window.location.hash='#/catalog'; document.getElementById('category-filter').value='lightsabers'; setTimeout(() => document.querySelector('#category-filter').dispatchEvent(new Event('change')), 100)" style="cursor: pointer;">
        <div class="feature-icon">⚔️</div>
        <h3>Световые мечи</h3>
        <p>Оригинальные световые мечи из любимых фильмов</p>
      </div>
      <div class="feature-card" onclick="window.location.hash='#/catalog'; document.getElementById('category-filter').value='clothing'; setTimeout(() => document.querySelector('#category-filter').dispatchEvent(new Event('change')), 100)" style="cursor: pointer;">
        <div class="feature-icon">👕</div>
        <h3>Одежда</h3>
        <p>Футболки, худи и куртки с символикой галактики</p>
      </div>
      <div class="feature-card" onclick="window.location.hash='#/catalog'; document.getElementById('category-filter').value='merch'; setTimeout(() => document.querySelector('#category-filter').dispatchEvent(new Event('change')), 100)" style="cursor: pointer;">
        <div class="feature-icon">🎭</div>
        <h3>Мерч</h3>
        <p>Фигурки, брелоки и аксессуары</p>
      </div>
    </section>
  `;
}

function renderCatalogPage(container: HTMLElement): void {
  const filteredProducts = getFilteredProducts();
  
  container.innerHTML = `
    <h1>Каталог товаров</h1>
    <div class="catalog-filters">
      <div class="filters-row">
        <div class="filter-group">
          <label for="category-filter">Категория</label>
          <select id="category-filter">
            <option value="">Все категории</option>
            <option value="lightsabers">${categoryNames.lightsabers}</option>
            <option value="clothing">${categoryNames.clothing}</option>
            <option value="merch">${categoryNames.merch}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="min-price">Цена от</label>
          <input type="number" id="min-price" value="0" min="0" max="20000">
        </div>
        <div class="filter-group">
          <label for="max-price">Цена до</label>
          <input type="number" id="max-price" value="20000" min="0" max="20000">
        </div>
        <div class="filter-group">
          <label for="sort-filter">Сортировка</label>
          <select id="sort-filter">
            <option value="popularity">По популярности</option>
            <option value="stock">По остатку</option>
          </select>
        </div>
      </div>
    </div>
    <div class="products-grid" id="products-grid">
      ${filteredProducts.map(product => renderProductCard(product)).join('')}
    </div>
  `;

  setupCatalogFilters();
}

function getFilteredProducts(): Product[] {
  let filtered = [...products];

  if (currentFilters.category) {
    filtered = filtered.filter(p => p.category === currentFilters.category);
  }

  filtered = filtered.filter(p => 
    p.price >= currentFilters.minPrice && p.price <= currentFilters.maxPrice
  );

  if (currentFilters.sortBy === 'popularity') {
    filtered.sort((a, b) => b.popularity - a.popularity);
  } else {
    filtered.sort((a, b) => a.stock - b.stock);
  }

  return filtered;
}

function renderProductCard(product: Product): string {
  const stockClass = product.stock <= 5 ? 'low' : product.stock <= 20 ? 'medium' : 'high';
  const stockText = product.stock <= 5 ? 'Мало' : product.stock <= 20 ? 'Достаточно' : 'В наличии';
  
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">${product.image}</div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${categoryNames[product.category]}</p>
        <p class="product-stock ${stockClass}">${stockText} (${product.stock} шт.)</p>
        <p class="product-price">${product.price.toLocaleString('ru-RU')} ₽</p>
        <button class="btn-add-cart" data-id="${product.id}">В корзину</button>
      </div>
    </div>
  `;
}

function setupCatalogFilters(): void {
  const categoryFilter = document.getElementById('category-filter') as HTMLSelectElement;
  const minPriceFilter = document.getElementById('min-price') as HTMLInputElement;
  const maxPriceFilter = document.getElementById('max-price') as HTMLInputElement;
  const sortFilter = document.getElementById('sort-filter') as HTMLSelectElement;

  categoryFilter.value = currentFilters.category;
  minPriceFilter.value = currentFilters.minPrice.toString();
  maxPriceFilter.value = currentFilters.maxPrice.toString();
  sortFilter.value = currentFilters.sortBy;

  categoryFilter.addEventListener('change', () => {
    currentFilters.category = categoryFilter.value as Category | '';
    renderCatalogPage(document.getElementById('main-content')!);
  });

  minPriceFilter.addEventListener('change', () => {
    currentFilters.minPrice = parseInt(minPriceFilter.value) || 0;
    renderCatalogPage(document.getElementById('main-content')!);
  });

  maxPriceFilter.addEventListener('change', () => {
    currentFilters.maxPrice = parseInt(maxPriceFilter.value) || 20000;
    renderCatalogPage(document.getElementById('main-content')!);
  });

  sortFilter.addEventListener('change', () => {
    currentFilters.sortBy = sortFilter.value as 'popularity' | 'stock';
    renderCatalogPage(document.getElementById('main-content')!);
  });

  // Add to cart buttons
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt((e.target as HTMLElement).getAttribute('data-id')!);
      storage.addToCart(id);
      showAlert('Товар добавлен в корзину!');
    });
  });
}

function renderCartPage(container: HTMLElement): void {
  const cart = storage.getCart();
  
  if (cart.length === 0) {
    container.innerHTML = `
      <h1>Корзина</h1>
      <div class="cart-empty">
        <p>Корзина пуста</p>
        <a href="#/catalog" class="btn btn-primary">Перейти в каталог</a>
      </div>
    `;
    return;
  }

  const total = storage.getCartTotal();
  const discount = promoApplied ? total * PROMO_DISCOUNT : 0;
  const finalTotal = total - discount;

  container.innerHTML = `
    <h1>Корзина</h1>
    <div class="cart-page">
      <div class="cart-items">
        ${cart.map(item => renderCartItem(item)).join('')}
      </div>
      <div class="cart-summary">
        <h3>Итого</h3>
        <div class="summary-row">
          <span>Товары (${storage.getCartCount()}):</span>
          <span>${total.toLocaleString('ru-RU')} ₽</span>
        </div>
        ${promoApplied ? `
          <div class="summary-row">
            <span>Скидка:</span>
            <span>-${discount.toLocaleString('ru-RU')} ₽</span>
          </div>
        ` : ''}
        <div class="summary-row summary-total">
          <span>К оплате:</span>
          <span>${finalTotal.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div class="promo-input-group">
          <input type="text" id="promo-input" placeholder="Промокод">
          <button id="apply-promo">Применить</button>
        </div>
        <p class="promo-message" id="promo-message"></p>
        <a href="#/checkout" class="btn-checkout">Оформить заказ</a>
      </div>
    </div>
  `;

  setupCartPageEvents(cart);
}

function renderCartItem(item: CartItem): string {
  return `
    <div class="cart-item" data-id="${item.product.id}">
      <div class="cart-item-image">${item.product.image}</div>
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.product.name}</h4>
        <p class="cart-item-price">${item.product.price.toLocaleString('ru-RU')} ₽</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-id="${item.product.id}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn plus" data-id="${item.product.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.product.id}">×</button>
    </div>
  `;
}

function setupCartPageEvents(cart: CartItem[]): void {
  // Quantity buttons
  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt((e.target as HTMLElement).getAttribute('data-id')!);
      const item = cart.find(i => i.product.id === id);
      if (item) {
        storage.updateQuantity(id, item.quantity - 1);
        renderCartPage(document.getElementById('main-content')!);
      }
    });
  });

  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt((e.target as HTMLElement).getAttribute('data-id')!);
      const item = cart.find(i => i.product.id === id);
      if (item) {
        storage.updateQuantity(id, item.quantity + 1);
        renderCartPage(document.getElementById('main-content')!);
      }
    });
  });

  // Remove buttons
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt((e.target as HTMLElement).getAttribute('data-id')!);
      storage.removeFromCart(id);
      renderCartPage(document.getElementById('main-content')!);
    });
  });

  // Promo code
  document.getElementById('apply-promo')?.addEventListener('click', () => {
    const input = document.getElementById('promo-input') as HTMLInputElement;
    const result = storage.applyPromoCode(input.value);
    const messageEl = document.getElementById('promo-message')!;
    
    if (result.valid) {
      promoApplied = true;
      messageEl.textContent = result.message;
      messageEl.className = 'promo-message success';
      renderCartPage(document.getElementById('main-content')!);
    } else {
      messageEl.textContent = result.message;
      messageEl.className = 'promo-message error';
    }
  });
}

function renderCheckoutPage(container: HTMLElement): void {
  const cart = storage.getCart();
  
  if (cart.length === 0) {
    window.location.hash = '#/cart';
    return;
  }

  container.innerHTML = `
    <div class="checkout-page">
      <form class="checkout-form" id="checkout-form">
        <h2>Оформление заказа</h2>
        <div class="form-group">
          <label for="name">Имя</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="phone">Телефон</label>
          <input type="tel" id="phone" required>
        </div>
        <div class="form-group">
          <label for="address">Адрес доставки</label>
          <input type="text" id="address" required>
        </div>
        <div class="payment-section">
          <h3>Оплата картой</h3>
          <div class="form-group">
            <label for="card-number">Номер карты</label>
            <input type="text" id="card-number" placeholder="1111 1111 1111 1111" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="card-expiry">Срок окончания</label>
              <input type="text" id="card-expiry" placeholder="12/25" required>
            </div>
            <div class="form-group">
              <label for="card-cvc">CVC</label>
              <input type="text" id="card-cvc" placeholder="123" required>
            </div>
          </div>
        </div>
        <button type="submit" class="btn-pay">Оплатить</button>
      </form>
    </div>
  `;

  document.getElementById('checkout-form')?.addEventListener('submit', handleCheckout);
}

function handleCheckout(e: Event): void {
  e.preventDefault();
  
  const cardNumber = (document.getElementById('card-number') as HTMLInputElement).value.replace(/\s/g, '');
  
  if (cardNumber === SUCCESS_CARD) {
    // Create order
    const cart = storage.getCart();
    const total = storage.getCartTotal();
    const discount = promoApplied ? total * PROMO_DISCOUNT : 0;
    const finalTotal = total - discount;
    
    const order = {
      id: 'ORD-' + Date.now(),
      items: cart,
      total: finalTotal,
      promoApplied,
      date: new Date().toLocaleDateString('ru-RU')
    };
    
    storage.addOrder(order);
    storage.clearCart();
    promoApplied = false;
    
    window.location.hash = '#/success';
  } else {
    window.location.hash = '#/failure';
  }
}

function renderProfilePage(container: HTMLElement): void {
  const user = storage.getUser();
  const orders = storage.getOrders();
  const reviews = storage.getReviews();
  
  if (!user?.isLoggedIn) {
    container.innerHTML = `
      <div class="profile-page">
        <div class="profile-login-required">
          <h2>Для доступа к личному кабинету необходимо войти</h2>
          <button class="btn btn-primary" id="login-required-btn">Войти</button>
        </div>
      </div>
    `;
    document.getElementById('login-required-btn')?.addEventListener('click', openAuthModal);
    return;
  }
  
  container.innerHTML = `
    <div class="profile-page">
      <div class="profile-header">
        <div class="profile-avatar">👤</div>
        <div class="profile-info">
          <h2>Личный кабинет</h2>
          <p class="profile-email">${user.email}</p>
          <p class="profile-status">✓ Авторизован</p>
        </div>
      </div>
      
      <div class="profile-stats">
        <div class="profile-stat-card">
          <div class="stat-value">${orders.length}</div>
          <div class="stat-label">Заказов</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-value">${reviews.length}</div>
          <div class="stat-label">Отзывов</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-value">${storage.getCartCount()}</div>
          <div class="stat-label">Товаров в корзине</div>
        </div>
      </div>
      
      <div class="profile-section">
        <h3>История заказов</h3>
        ${orders.length === 0 ? '<p class="empty-message">Заказов пока нет</p>' : 
          orders.map(order => `
            <div class="order-card">
              <div class="order-header">
                <span class="order-id">${order.id}</span>
                <span class="order-date">${order.date}</span>
              </div>
              <div class="order-items">
                ${order.items.map(item => `<span>${item.product.name} x${item.quantity}</span>`).join(', ')}
              </div>
              <div class="order-total">
                Итого: ${order.total.toLocaleString('ru-RU')} ₽
                ${order.promoApplied ? '<span class="promo-badge">Промокод</span>' : ''}
              </div>
            </div>
          `).join('')}
      </div>
      
      <div class="profile-section">
        <h3>Мои отзывы</h3>
        ${reviews.length === 0 ? '<p class="empty-message">Отзывов пока нет</p>' : 
          reviews.map(review => `
            <div class="review-card">
              <div class="review-header">
                <span class="review-product">${review.productName}</span>
                <span class="review-rating">${'★'.repeat(review.rating)}</span>
              </div>
              <p class="review-text">${review.text}</p>
              <p class="review-date">${review.date}</p>
            </div>
          `).join('')}
      </div>
      
      <button class="btn btn-logout" id="logout-btn">Выйти из аккаунта</button>
    </div>
  `;
  
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    storage.logout();
    window.location.hash = '#/';
  });
}

function renderSuccessPage(container: HTMLElement): void {
  const orders = storage.getOrders();
  const lastOrder = orders[orders.length - 1];
  
  container.innerHTML = `
    <div class="result-page success">
      <div class="result-icon">✓</div>
      <h1>Заказ успешно оплачен!</h1>
      <p class="order-number">Номер заказа: ${lastOrder?.id || 'N/A'}</p>
      <a href="#/" class="btn btn-primary">Вернуться на главную</a>
    </div>
  `;
}

function renderFailurePage(container: HTMLElement): void {
  container.innerHTML = `
    <div class="result-page failure">
      <div class="result-icon">✗</div>
      <h1>Оплата отклонена</h1>
      <p>Проверьте данные карты и попробуйте снова</p>
      <a href="#/checkout" class="btn btn-primary">Вернуться к оплате</a>
    </div>
  `;
}

function renderReviewsPage(container: HTMLElement): void {
  const reviews = storage.getReviews();
  const cart = storage.getCart();
  const orderedProducts = cart.map(item => item.product);
  
  container.innerHTML = `
    <div class="reviews-page">
      <div class="review-form">
        <h2>Оставить отзыв</h2>
        <div class="form-group">
          <label for="review-product">Выберите товар</label>
          <select id="review-product">
            <option value="">Выберите товар...</option>
            ${orderedProducts.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Оценка</label>
          <div class="rating-select" id="rating-select">
            <span class="rating-star" data-rating="1">★</span>
            <span class="rating-star" data-rating="2">★</span>
            <span class="rating-star" data-rating="3">★</span>
            <span class="rating-star" data-rating="4">★</span>
            <span class="rating-star" data-rating="5">★</span>
          </div>
        </div>
        <div class="form-group">
          <label for="review-text">Текст отзыва</label>
          <textarea id="review-text" rows="4" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #374151; background: #16213e; color: #eaeaea; font-size: 1rem;"></textarea>
        </div>
        <button class="btn btn-primary" id="submit-review">Отправить отзыв</button>
      </div>
      <h2>Отзывы</h2>
      <div class="reviews-list">
        ${reviews.length === 0 ? '<p>Отзывов пока нет</p>' : reviews.map(renderReviewCard).join('')}
      </div>
    </div>
  `;

  setupReviewsEvents();
}

function renderReviewCard(review: Review): string {
  return `
    <div class="review-card">
      <div class="review-header">
        <span class="review-product">${review.productName}</span>
        <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
      </div>
      <p class="review-text">${review.text}</p>
      <p class="review-date">${review.date}</p>
    </div>
  `;
}

function setupReviewsEvents(): void {
  const ratingStars = document.querySelectorAll('.rating-star');
  
  ratingStars.forEach(star => {
    star.addEventListener('click', (e) => {
      selectedRating = parseInt((e.target as HTMLElement).getAttribute('data-rating')!);
      updateRatingDisplay();
    });
  });

  document.getElementById('submit-review')?.addEventListener('click', () => {
    const productSelect = document.getElementById('review-product') as HTMLSelectElement;
    const reviewText = (document.getElementById('review-text') as HTMLTextAreaElement).value;
    const productId = parseInt(productSelect.value);
    
    if (!productId || !reviewText || selectedRating === 0) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const cart = storage.getCart();
    const product = cart.find(item => item.product.id === productId)?.product;
    
    if (!product) {
      alert('Товар не найден в заказе');
      return;
    }

    storage.addReview({
      productId,
      productName: product.name,
      rating: selectedRating,
      text: reviewText
    });

    alert('Отзыв отправлен!');
    renderReviewsPage(document.getElementById('main-content')!);
  });
}

function updateRatingDisplay(): void {
  const stars = document.querySelectorAll('.rating-star');
  stars.forEach((star, index) => {
    if (index < selectedRating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

// Initialize
init();
