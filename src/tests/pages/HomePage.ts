import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly logoText: Locator;
  readonly heroTitle: Locator;
  readonly featureCards: Locator;
  readonly catalogLink: Locator;
  readonly categoryCards: Locator;

  constructor(page: Page) {
    super(page);
    this.logoText = page.locator('.logo-text');
    this.heroTitle = page.locator('.hero h1');
    this.featureCards = page.locator('.feature-card');
    this.catalogLink = page.locator('.hero a[href="#/catalog"]');
    this.categoryCards = page.locator('.feature-card');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async verifyLogo(): Promise<void> {
    await expect(this.logoText).toContainText('Galaxy Store');
  }

  async verifyHeroTitle(): Promise<void> {
    await expect(this.heroTitle).toContainText('Добро пожаловать');
  }

  async verifyFeatureCards(): Promise<void> {
    await expect(this.featureCards).toHaveCount(3);
  }

  async goToCatalog(): Promise<void> {
    await this.catalogLink.click();
    await this.page.waitForSelector('.catalog-filters');
  }

  async clickOnCategory(categoryIndex: number): Promise<void> {
    await this.categoryCards.nth(categoryIndex).click();
  }
}
