import { test, expect } from '@playwright/test';

async function enter(page, theme = 'dark') {
  await page.addInitScript((value) => !localStorage.getItem('pratham-theme') && localStorage.setItem('pratham-theme', value), theme);
  await page.goto('/');
  await expect(page.getByRole('status')).toBeHidden({ timeout: 8000 });
}

test('dark intro lasts 4–5 seconds and loads a healthy portfolio', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const missing = [];
  page.on('response', response => { if (response.status() >= 400) missing.push(response.url()); });
  await page.goto('/');
  await expect(page.getByRole('status')).toBeVisible();
  const start = Date.now();
  await page.waitForTimeout(3500);
  await expect(page.getByRole('status')).toBeVisible();
  await expect(page.getByRole('status')).toBeHidden({ timeout: 3500 });
  expect(Date.now() - start).toBeGreaterThan(4000);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('PRATHAMRATHORE.');
  await expect(page.locator('.hero-sculpture')).toHaveJSProperty('complete', true);
  expect(await page.locator('.hero-sculpture').evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
  expect(errors).toEqual([]);
  expect(missing).toEqual([]);
});

test('theme persists and light mode has its own intro and sculpture', async ({ page }) => {
  await enter(page);
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.hero-sculpture')).toHaveAttribute('src', '/hero-light.webp');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('pratham-theme'))).toBe('light');
  await page.reload();
  await expect(page.locator('.loader-light .loader-petal')).toHaveCount(2);
  await expect(page.locator('.loader-orbit')).toHaveCount(0);
  await expect(page.getByRole('status')).toBeHidden({ timeout: 8000 });
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
});

test('resume project dialogs open and support Escape and focus return', async ({ page }) => {
  await enter(page);
  for (const project of ['AI Agentic Workflow', 'Krishi Seva']) {
    const trigger = page.getByRole('button', { name: `Explore ${project} project` });
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading')).toContainText(project);
    await expect(dialog.locator('.project-dialog-details li')).toHaveCount(2);
    await expect(dialog.getByRole('link')).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  }
});

test('footer video popup handles missing media without a broken player', async ({ page }) => {
  await enter(page);
  await page.getByRole('button', { name: 'Terms & conditions' }).click();
  const dialog = page.getByRole('dialog', { name: 'Terms & conditions' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('Terms video unavailable.')).toBeVisible();
  await expect(dialog.locator('video')).toHaveCount(0);
  await dialog.getByRole('button', { name: 'Close window' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByText('All rights are reserved to Pratham Rathore @2026')).toBeVisible();
});

test('mobile navigation works and all sections fit a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await enter(page, 'light');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: 'Skills' }).click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(nav).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Tools & languages.' })).toBeVisible();
  await expect(page.locator('.skill-tile')).toHaveCount(6);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.skill-tile').first().focus();
  await expect(page.locator('.skill-tile').first()).toBeFocused();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await nav.getByRole('link', { name: 'Projects', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
});

test('intro can change theme during loading and be replayed from the footer', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('status').getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('.loader-petal')).toHaveCount(2);
  await expect(page.locator('.site')).toHaveAttribute('inert', '');
  await expect(page.locator('.site')).toHaveJSProperty('inert', true);
  await expect(page.getByRole('status')).toBeHidden({ timeout: 8000 });
  await page.getByRole('button', { name: 'Replay intro' }).click();
  await expect(page.getByRole('status')).toBeVisible();
  await expect(page.locator('.loader-light')).toBeVisible();
  await expect(page.getByRole('status')).toBeHidden({ timeout: 8000 });
});

test('reduced motion keeps content available and external profiles are correct', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await enter(page);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.hero-name')).toHaveCSS('opacity', '1');
  await expect(page.locator('.headline-mask > span').first()).toHaveCSS('transform', 'none');
  await expect(page.locator('#contact').getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('href', 'https://www.linkedin.com/in/prathamr85650/');
  await expect(page.getByRole('link', { name: 'Pratham on GitHub' })).toHaveAttribute('href', 'https://github.com/Phantom18tm');
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior)).toBe('auto');
});


test('portfolio represents all resume sections and removes the former concept content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await enter(page);
  await expect(page.locator('.project-card')).toHaveCount(2);
  await expect(page.locator('#work')).toContainText('AI Agentic Workflow');
  await expect(page.locator('#work')).toContainText('Krishi Seva');
  await expect(page.locator('#experience')).toContainText('CognioLabs');
  await expect(page.locator('#experience')).toContainText('Dehix.org');
  await expect(page.locator('#experience')).toContainText('82%+');
  await expect(page.locator('#experience')).toContainText('68%');
  await expect(page.locator('#experience')).toContainText('27+ clients');
  await expect(page.locator('#experience')).toContainText('89%');
  await expect(page.locator('.resume-tool-group')).toHaveCount(4);
  await expect(page.locator('.resume-tool-group li')).toHaveCount(21);
  await expect(page.locator('#skills')).toContainText('JavaScript (Beginner)');
  await expect(page.locator('#skills')).toContainText('Python (Beginner)');
  await expect(page.locator('.resume-professional-skills li')).toHaveCount(7);
  for (const result of ['7.14', '85%', '90.2%']) await expect(page.locator('#education')).toContainText(result);
  for (const text of ['Product Space', 'SIH24', 'ISTE', '700+']) await expect(page.locator('#achievements')).toContainText(text);
  await expect(page.locator('#achievements a')).toHaveCount(3);
  await expect(page.locator('#contact')).toContainText('mailprathamrathore28@gmail.com');
  await expect(page.locator('#contact')).toContainText('+91 8924050494');
  await expect(page.locator('#contact').getByRole('link', { name: 'pratham-omega.vercel.app' })).toHaveAttribute('href', 'https://pratham-omega.vercel.app/');
  await expect(page.getByRole('heading', { name: /^(Orbit|Forma|Pulse|A developer’s mind|A designer’s eye)/i })).toHaveCount(0);
  await expect(page.getByText(/interface concept/i)).toHaveCount(0);
  await expect(page.locator('#skills').getByText('Git', { exact: true })).toHaveCount(0);
  await expect(page.locator('a[download]')).toHaveCount(0);
});
