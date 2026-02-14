import { test, expect } from '@playwright/test';
import { HomePage, CatalogPage, CartPage, AuthPage, ProfilePage, CheckoutPage, ResultPage } from './pages';

test.describe('Galaxy Store - UI Tests', () => {
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

  // ========== Home Page Tests ==========

  test('должен загрузить главную страницу', async () => {
    await homePage.verifyLogo();
    await homePage.verifyHeroTitle();
    await homePage.verifyFeatureCards();
  });

  test('должен перейти на страницу каталога', async () => {
    await homePage.goToCatalog();
    await catalogPage.verifyPageTitle();
    await catalogPage.verifyProductsCount(16);
  });

  // ========== Catalog Page Tests ==========

  test('должен фильтровать товары по категории', async () => {
    await catalogPage.goto();
    await catalogPage.filterByCategory('lightsabers');
    await catalogPage.verifyProductsCount(4);
  });

  test('должен добавить товар в корзину', async () => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await expect(cartPage.cartCount).toHaveText('1');
  });

  test('должен показывать разные остатки товаров', async () => {
    await catalogPage.goto();
    const products = await catalogPage.getProductNames();
    expect(products.length).toBeGreaterThan(0);
  });

  test('должен сортировать по популярности', async () => {
    await catalogPage.goto();
    await catalogPage.sortBy('popularity');
    const productNames = await catalogPage.getProductNames();
    expect(productNames[0]).toContain('Дарт Вейдер');
  });

  test('должен сортировать по остатку', async () => {
    await catalogPage.goto();
    await catalogPage.sortBy('stock');
    const stock = await catalogPage.getFirstProductStock();
    expect(stock).toContain('3 шт');
  });

  // ========== Cart Page Tests ==========

  test('должен отобразить товары в корзине', async () => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.verifyCartItemsCount(1);
  });

  test('должен изменить количество товара в корзине', async () => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.increaseQuantity();
    expect(await cartPage.getQuantity()).toContain('2');
  });

  test('должен удалить товар из корзины', async () => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.removeItem();
    await cartPage.verifyEmptyCart();
  });

  // ========== Auth Page Tests ==========

  test('должен открыть модальное окно авторизации', async () => {
    await authPage.openModal();
    await authPage.verifyTitle('Вход');
  });

  test('должен войти с корректными учетными данными', async () => {
    await authPage.openModal();
    await authPage.login('qwe@qwe.ru', 'qweQWE');
    await authPage.verifyLoggedIn();
  });

  test('должен отклонить неверные учетные данные', async ({ page }) => {
    await authPage.openModal();
    await authPage.login('wrong@email.com', 'wrongpass');
    
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Неверные');
      await dialog.dismiss();
    });
  });

  test('должен показать ошибку при пустом email', async ({ page }) => {
    await authPage.openModal();
    await authPage.fillPassword('qweQWE');
    
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('заполните');
      await dialog.dismiss();
    });
    
    await authPage.submit();
  });

  test('должен показать ошибку при пустом пароле', async ({ page }) => {
    await authPage.openModal();
    await authPage.fillEmail('qwe@qwe.ru');
    
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('заполните');
      await dialog.dismiss();
    });
    
    await authPage.submit();
  });

  test('должен переключаться между входом и регистрацией', async () => {
    await authPage.openModal();
    await authPage.verifyTitle('Вход');
    
    await authPage.toggleAuthMode();
    await authPage.verifyTitle('Регистрация');
    expect(await authPage.getSubmitButtonText()).toContain('Регистрация');
    
    await authPage.toggleAuthMode();
    await authPage.verifyTitle('Вход');
  });

  // ========== Checkout Page Tests ==========

  test('должен перейти на страницу оплаты с валидной картой', async () => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await checkoutPage.processSuccessPayment();
    await resultPage.verifySuccessPage();
  });

  test('должен отклонить платеж с невалидной картой', async () => {
    await catalogPage.goto();
    await catalogPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await checkoutPage.processFailedPayment();
    await resultPage.verifyFailurePage();
  });

  // ========== Profile Page Tests ==========

  test('должен показать сообщение о необходимости входа на странице профиля', async () => {
    await profilePage.goto();
    await profilePage.verifyLoginRequired();
    await profilePage.verifyMessageContains('необходимо войти');
  });

  test('должен перенаправить на авторизацию при нажатии кнопки войти на странице профиля', async () => {
    await profilePage.goto();
    await profilePage.clickLoginButton();
    await expect(authPage.modal).toHaveClass(/active/);
  });

  test('должен отобразить информацию о пользователе после входа', async () => {
    await authPage.openModal();
    await authPage.login('qwe@qwe.ru', 'qweQWE');
    await profilePage.goto();
    await profilePage.verifyProfileInfo('qwe@qwe.ru');
  });

  test('должен выйти из аккаунта со страницы профиля', async () => {
    await authPage.openModal();
    await authPage.login('qwe@qwe.ru', 'qweQWE');
    await profilePage.goto();
    await profilePage.logout();
    await homePage.verifyHeroTitle();
  });

  // ========== Navigation Tests ==========

  test('должен переключаться между страницами', async ({ page }) => {
    await homePage.goToCatalog();
    await catalogPage.verifyPageTitle();
    
    await page.click('a[href="#/reviews"]');
    await page.waitForSelector('.review-form');
  });
});
