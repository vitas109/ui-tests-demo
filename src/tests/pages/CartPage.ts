import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly emptyCartMessage: Locator;
  readonly cartItems: Locator;
  readonly promoInput: Locator;
  readonly applyPromoButton: Locator;
  readonly promoMessage: Locator;
  readonly checkoutButton: Locator;
  readonly cartCount: Locator;

  // Cart item elements
  readonly quantityPlusButtons: Locator;
  readonly quantityMinusButtons: Locator;
  readonly removeButtons: Locator;
  readonly quantitySpans: Locator;

  constructor(page: Page) {
    super(page);
    this.emptyCartMessage = page.locator('.cart-empty');
    this.cartItems = page.locator('.cart-item');
    this.promoInput = page.locator('#promo-input');
    this.applyPromoButton = page.locator('#apply-promo');
    this.promoMessage = page.locator('#promo-message');
    this.checkoutButton = page.locator('.btn-checkout');
    this.cartCount = page.locator('#cart-count');
    this.quantityPlusButtons = page.locator('.quantity-btn.plus');
    this.quantityMinusButtons = page.locator('.quantity-btn.minus');
    this.removeButtons = page.locator('.cart-item-remove');
    this.quantitySpans = page.locator('.cart-item-quantity span');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/cart');
  }

  async verifyEmptyCart(): Promise<void> {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async verifyCartItemsCount(expected: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expected);
  }

  async increaseQuantity(): Promise<void> {
    await this.quantityPlusButtons.first().click();
  }

  async decreaseQuantity(): Promise<void> {
    await this.quantityMinusButtons.first().click();
  }

  async removeItem(): Promise<void> {
    await this.removeButtons.first().click();
  }

  async applyPromoCode(code: string): Promise<void> {
    await this.promoInput.fill(code);
    await this.applyPromoButton.click();
    await this.page.waitForTimeout(500);
  }

  async getPromoMessage(): Promise<string | null> {
    return await this.promoMessage.textContent();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForSelector('#checkout-form');
  }

  async getQuantity(): Promise<string | null> {
    return await this.quantitySpans.first().textContent();
  }
}
