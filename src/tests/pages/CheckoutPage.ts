import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cardExpiryInput: Locator;
  readonly cardCvcInput: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    super(page);
    this.form = page.locator('#checkout-form');
    this.nameInput = page.locator('#name');
    this.phoneInput = page.locator('#phone');
    this.addressInput = page.locator('#address');
    this.cardNumberInput = page.locator('#card-number');
    this.cardExpiryInput = page.locator('#card-expiry');
    this.cardCvcInput = page.locator('#card-cvc');
    this.payButton = page.locator('.btn-pay');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/checkout');
  }

  async verifyFormVisible(): Promise<void> {
    await expect(this.form).toBeVisible();
  }

  async fillContactInfo(name: string, phone: string, address: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.addressInput.fill(address);
  }

  async fillCardInfo(cardNumber: string, expiry: string, cvc: string): Promise<void> {
    await this.cardNumberInput.fill(cardNumber);
    await this.cardExpiryInput.fill(expiry);
    await this.cardCvcInput.fill(cvc);
  }

  async submitPayment(): Promise<void> {
    await this.payButton.click();
  }

  async processSuccessPayment(): Promise<void> {
    await this.fillContactInfo('Тест Тестов', '+79999999999', 'Тестовая улица 1');
    await this.fillCardInfo('1111 1111 1111 1111', '12/25', '123');
    await this.submitPayment();
  }

  async processFailedPayment(): Promise<void> {
    await this.fillContactInfo('Тест Тестов', '+79999999999', 'Тестовая улица 1');
    await this.fillCardInfo('2222 2222 2222 2222', '12/25', '123');
    await this.submitPayment();
  }
}
