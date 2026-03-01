import { test, expect } from '@playwright/test';
import { HomePage, CatalogPage, CartPage, AuthPage, ProfilePage, CheckoutPage, ResultPage } from './pages';

test.describe('Galaxy Store - Скриншот тесты', () => {
  let homePage: HomePage;
  let catalogPage: CatalogPage;
  let cartPage: CartPage;
  let authPage: AuthPage;
  let profilePage: ProfilePage;
  let checkoutPage: CheckoutPage;
  let resultPage: ResultPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    catalogPage = new CatalogPage(page);
    cartPage = new CartPage(page);
    authPage = new AuthPage(page);
    profilePage = new ProfilePage(page);
    checkoutPage = new CheckoutPage(page);
    resultPage = new ResultPage(page);

    await page.goto('/');
  });

  // ========== Главная страница ==========

  test('Главная страница - базовый вид', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('home-page-base.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Главная страница - hover на навигации', async ({ page }) => {
    await page.goto('/');
    await page.hover('a[href="#/catalog"]');
    await expect(page).toHaveScreenshot('home-page-nav-hover.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Главная страница - hover на карточках товаров', async ({ page }) => {
    await page.goto('/');
    await page.hover('.feature-card:first-child');
    await expect(page).toHaveScreenshot('home-page-feature-hover.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  // ========== Страница каталога ==========

  test('Каталог - базовый вид', async ({ page }) => {
    await catalogPage.goto();
    await expect(page).toHaveScreenshot('catalog-page-base.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Каталог - фильтр по категории lightsabers', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.filterByCategory('lightsabers');
    await expect(page).toHaveScreenshot('catalog-page-lightsabers.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Каталог - фильтр по категории clothing', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.filterByCategory('clothing');
    await expect(page).toHaveScreenshot('catalog-page-clothing.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Каталог - фильтр по категории merch', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.filterByCategory('merch');
    await expect(page).toHaveScreenshot('catalog-page-merch.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Каталог - сортировка по популярности', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.sortBy('popularity');
    await expect(page).toHaveScreenshot('catalog-page-sort-popularity.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Каталог - сортировка по остатку', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.sortBy('stock');
    await expect(page).toHaveScreenshot('catalog-page-sort-stock.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Каталог - фильтр по цене', async ({ page }) => {
    await catalogPage.goto();
    await page.fill('#min-price', '1000');
    await page.fill('#max-price', '5000');
    await page.press('#max-price', 'Enter');
    await expect(page).toHaveScreenshot('catalog-page-price-filter.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Каталог - hover на товаре', async ({ page }) => {
    await catalogPage.goto();
    await page.hover('.product-card:first-child');
    await expect(page).toHaveScreenshot('catalog-page-product-hover.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  // ========== Страница корзины ==========

  test('Корзина - пустая корзина', async ({ page }) => {
    await cartPage.goto();
    await expect(page).toHaveScreenshot('cart-page-empty.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Корзина - с товарами', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await catalogPage.addProductToCart(1);
    await cartPage.goto();
    await expect(page).toHaveScreenshot('cart-page-with-items.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Корзина - применение промокода', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await page.fill('#promo-input', 'GALAXY20');
    await page.click('#apply-promo');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('cart-page-promo-applied.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Корзина - изменение количества товара', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await page.click('.quantity-btn.plus');
    await expect(page).toHaveScreenshot('cart-page-quantity-increased.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  // ========== Страница оплаты ==========

  test('Оплата - форма оформления заказа', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveScreenshot('checkout-page-form.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Оплата - успешный платеж', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await checkoutPage.processSuccessPayment();
    await expect(page).toHaveScreenshot('checkout-page-success.png', {
      fullPage: true,
      maxDiffPixels: 500,
    });
  });

  test('Оплата - неудачный платеж', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await checkoutPage.processFailedPayment();
    await expect(page).toHaveScreenshot('checkout-page-failure.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  // ========== Страница отзывов ==========

  test('Отзывы - базовый вид', async ({ page }) => {
    await page.goto('#/reviews');
    await expect(page).toHaveScreenshot('reviews-page-base.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Отзывы - выбор рейтинга', async ({ page }) => {
    await page.goto('#/reviews');
    await page.click('.rating-star[data-rating="5"]');
    await expect(page).toHaveScreenshot('reviews-page-rating-5.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  // ========== Страница профиля ==========

  test('Профиль - неавторизованный пользователь', async ({ page }) => {
    await profilePage.goto();
    await expect(page).toHaveScreenshot('profile-page-logged-out.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Профиль - авторизованный пользователь', async ({ page }) => {
    await authPage.openModal();
    await authPage.login('qwe@qwe.ru', 'qweQWE');
    await profilePage.goto();
    await expect(page).toHaveScreenshot('profile-page-logged-in.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Профиль - с историей заказов', async ({ page }) => {
    // Авторизация
    await authPage.openModal();
    await authPage.login('qwe@qwe.ru', 'qweQWE');
    
    // Создание заказа
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await checkoutPage.processSuccessPayment();
    
    // Переход в профиль
    await profilePage.goto();
    await expect(page).toHaveScreenshot('profile-page-with-orders.png', {
      fullPage: true,
      maxDiffPixels: 500,
    });
  });

  // ========== Модальное окно авторизации ==========

  test('Авторизация - модальное окно вход', async ({ page }) => {
    await page.goto('/');
    await authPage.openModal();
    await expect(page).toHaveScreenshot('auth-modal-login.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Авторизация - модальное окно регистрация', async ({ page }) => {
    await page.goto('/');
    await authPage.openModal();
    await authPage.toggleAuthMode();
    await expect(page).toHaveScreenshot('auth-modal-register.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  // ========== Header с авторизованным пользователем ==========

  test('Header - авторизованный пользователь', async ({ page }) => {
    await authPage.openModal();
    await authPage.login('qwe@qwe.ru', 'qweQWE');
    await page.goto('/');
    await expect(page.locator('.header')).toHaveScreenshot('header-logged-in.png', {
      maxDiffPixels: 50,
    });
  });

  test('Header - корзина с товарами', async ({ page }) => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await catalogPage.addProductToCart(1);
    await page.goto('/');
    await expect(page.locator('.header')).toHaveScreenshot('header-with-cart.png', {
      maxDiffPixels: 50,
    });
  });

  // ========== Footer ==========

  test('Footer - базовый вид', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.footer')).toHaveScreenshot('footer-base.png', {
      maxDiffPixels: 50,
    });
  });

  // ========== Адаптивные тесты (мобильная версия) ==========

  test('Главная страница - мобильная версия', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('home-page-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Каталог - мобильная версия', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await catalogPage.goto();
    await expect(page).toHaveScreenshot('catalog-page-mobile.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Корзина - мобильная версия с товарами', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await expect(page).toHaveScreenshot('cart-page-mobile.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  // ========== Планшетная версия ==========

  test('Главная страница - планшетная версия', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('home-page-tablet.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Каталог - планшетная версия', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await catalogPage.goto();
    await expect(page).toHaveScreenshot('catalog-page-tablet.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });
});
