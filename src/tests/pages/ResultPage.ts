import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResultPage extends BasePage {
  readonly successPage: Locator;
  readonly failurePage: Locator;
  readonly resultIcon: Locator;
  readonly resultTitle: Locator;
  readonly orderNumber: Locator;

  constructor(page: Page) {
    super(page);
    this.successPage = page.locator('.result-page.success');
    this.failurePage = page.locator('.result-page.failure');
    this.resultIcon = page.locator('.result-icon');
    this.resultTitle = page.locator('.result-page h1');
    this.orderNumber = page.locator('.order-number');
  }

  async gotoSuccess(): Promise<void> {
    await this.page.goto('/#/success');
  }

  async gotoFailure(): Promise<void> {
    await this.page.goto('/#/failure');
  }

  async verifySuccessPage(): Promise<void> {
    await expect(this.successPage).toBeVisible();
    await expect(this.resultTitle).toContainText('успешно оплачен');
  }

  async verifyFailurePage(): Promise<void> {
    await expect(this.failurePage).toBeVisible();
    await expect(this.resultTitle).toContainText('отклонена');
  }

  async getOrderNumber(): Promise<string | null> {
    return await this.orderNumber.textContent();
  }
}
