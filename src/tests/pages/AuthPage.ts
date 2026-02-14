import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
  readonly modal: Locator;
  readonly closeButton: Locator;
  readonly title: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly toggleLink: Locator;
  readonly toggleText: Locator;
  readonly authButton: Locator;

  constructor(page: Page) {
    super(page);
    this.modal = page.locator('#auth-modal');
    this.closeButton = page.locator('#close-auth');
    this.title = page.locator('#auth-title');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#auth-submit');
    this.toggleLink = page.locator('#auth-toggle-link');
    this.toggleText = page.locator('#auth-toggle-text');
    this.authButton = page.locator('#auth-btn');
  }

  async openModal(): Promise<void> {
    await this.authButton.click();
    await expect(this.modal).toHaveClass(/active/);
  }

  async closeModal(): Promise<void> {
    await this.closeButton.click();
    await expect(this.modal).not.toHaveClass(/active/);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async verifyLoggedIn(): Promise<void> {
    await expect(this.authButton).toContainText('Выход');
    await expect(this.authButton).toHaveClass(/logged-in/);
  }

  async verifyLoggedOut(): Promise<void> {
    await expect(this.authButton).toContainText('Вход');
  }

  async verifyTitle(titleText: string): Promise<void> {
    await expect(this.title).toContainText(titleText);
  }

  async toggleAuthMode(): Promise<void> {
    await this.toggleLink.click();
  }

  async getSubmitButtonText(): Promise<string | null> {
    return await this.submitButton.textContent();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
