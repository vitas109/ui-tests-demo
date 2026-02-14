import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CatalogPage extends BasePage {
  readonly pageTitle: Locator;
  readonly categoryFilter: Locator;
  readonly minPriceFilter: Locator;
  readonly maxPriceFilter: Locator;
  readonly sortFilter: Locator;
  readonly productCards: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1');
    this.categoryFilter = page.locator('#category-filter');
    this.minPriceFilter = page.locator('#min-price');
    this.maxPriceFilter = page.locator('#max-price');
    this.sortFilter = page.locator('#sort-filter');
    this.productCards = page.locator('.product-card');
    this.addToCartButtons = page.locator('.btn-add-cart');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/catalog');
    await this.page.waitForSelector('.catalog-filters');
  }

  async verifyPageTitle(): Promise<void> {
    await expect(this.pageTitle).toContainText('Каталог товаров');
  }

  async verifyProductsCount(expected: number): Promise<void> {
    await expect(this.productCards).toHaveCount(expected);
  }

  async filterByCategory(category: string): Promise<void> {
    await this.categoryFilter.selectOption(category);
  }

  async setPriceRange(min: number, max: number): Promise<void> {
    await this.minPriceFilter.fill(min.toString());
    await this.maxPriceFilter.fill(max.toString());
    await this.minPriceFilter.dispatchEvent('change');
    await this.maxPriceFilter.dispatchEvent('change');
  }

  async sortBy(sortType: 'popularity' | 'stock'): Promise<void> {
    await this.sortFilter.selectOption(sortType);
  }

  async addProductToCart(productIndex: number = 0): Promise<void> {
    await this.addToCartButtons.nth(productIndex).click();
  }

  async getProductNames(): Promise<string[]> {
    return await this.productCards.locator('.product-name').allTextContents();
  }

  async getFirstProductStock(): Promise<string | null> {
    return await this.productCards.first().locator('.product-stock').textContent();
  }
}
