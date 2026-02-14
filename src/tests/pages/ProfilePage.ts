import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly loginRequired: Locator;
  readonly profileHeader: Locator;
  readonly profileEmail: Locator;
  readonly profileStatus: Locator;
  readonly statsCards: Locator;
  readonly logoutButton: Locator;
  readonly loginRequiredButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginRequired = page.locator('.profile-login-required');
    this.profileHeader = page.locator('.profile-page');
    this.profileEmail = page.locator('.profile-email');
    this.profileStatus = page.locator('.profile-status');
    this.statsCards = page.locator('.profile-stat-card');
    this.logoutButton = page.locator('#logout-btn');
    this.loginRequiredButton = page.locator('#login-required-btn');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/profile');
  }

  async verifyLoginRequired(): Promise<void> {
    await expect(this.loginRequired).toBeVisible();
  }

  async verifyMessageContains(text: string): Promise<void> {
    await expect(this.loginRequired.locator('h2')).toContainText(text);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginRequiredButton.click();
  }

  async verifyProfileInfo(email: string): Promise<void> {
    await expect(this.profileEmail).toContainText(email);
    await expect(this.profileStatus).toContainText('Авторизован');
  }

  async verifyStatsDisplayed(): Promise<void> {
    await expect(this.statsCards).toHaveCount(3);
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
