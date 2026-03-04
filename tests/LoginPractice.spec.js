import { test, expect } from '@playwright/test';
import LoginPracticePage from '../page-objects/LoginPracticePage.js';

test('Login practice: sign in and verify iPhone X is present', async ({ page }) => {
    const login = new LoginPracticePage(page);

    // Navigate to login practice page
    await login.goTo();

    // Fill credentials and interact with page
    await login.login('rahulshettyacademy', 'learning');
    // select user role and accept the info modal (site shows a popup on role select)
    await login.selectUserRole();
    await login.selectCheckbox();

    // Submit and wait for navigation to shop
    await login.submitSignIn();

    // Verify product presence on the shop page
    const productPresent = await login.isProductPresent('Samsung Note 8');
    expect(productPresent).toBeTruthy();
});
