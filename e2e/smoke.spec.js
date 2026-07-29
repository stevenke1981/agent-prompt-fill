import { test, expect } from '@playwright/test';
import fs from 'node:fs';

async function dismissUpdateDialogs(page) {
  await page.waitForLoadState('networkidle');
  const later = page.getByRole('button', { name: /稍後再說|Later/i });
  while (await later.isVisible().catch(() => false)) {
    await later.click();
  }
}

test.describe('Agent Prompt Fill smoke E2E', () => {
  test('discovery → editor → copy prompt', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await expect(page).toHaveTitle(/Agent Prompt Fill/i);

    await dismissUpdateDialogs(page);

    const backToEditor = page.getByRole('button', { name: /返回編輯器|Back to editor/i });
    if (await backToEditor.isVisible().catch(() => false)) {
      await backToEditor.click();
    } else {
      await page.getByText(/通用 Coding Agent|General Coding Agent/i).first().click();
      const useTemplate = page.getByRole('button', { name: /使用此模板|Use.*template/i });
      if (await useTemplate.isVisible().catch(() => false)) {
        await useTemplate.click();
      }
    }

    await expect(page.getByRole('button', { name: /預覽互動|Preview/i })).toBeVisible({
      timeout: 15000,
    });

    const previewBtn = page.getByRole('button', { name: /預覽互動|Preview/i });
    if (await previewBtn.isVisible()) {
      await previewBtn.click();
    }

    const copyBtn = page.getByRole('button', { name: /複製結果|Copy/i }).first();
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    await expect(page.getByText(/已複製|Copied/i)).toBeVisible({ timeout: 5000 });

    const clipboardText = await page.evaluate(async () => {
      try {
        return await navigator.clipboard.readText();
      } catch {
        return '';
      }
    });

    expect(clipboardText.length).toBeGreaterThan(20);
    expect(clipboardText).toMatch(/Role|角色/i);
  });

  test('banks search filters options', async ({ page }) => {
    await page.goto('/');
    await dismissUpdateDialogs(page);

    const backToEditor = page.getByRole('button', { name: /返回編輯器|Back to editor/i });
    if (await backToEditor.isVisible().catch(() => false)) {
      await backToEditor.click();
    }

    const bankSearch = page.getByPlaceholder(/搜尋詞庫|Search banks/i);
    await expect(bankSearch).toBeVisible({ timeout: 15000 });
    await bankSearch.fill('agent_role');
    await expect(bankSearch).toHaveValue('agent_role');
  });

  test('theme toggle switches dark class', async ({ page }) => {
    await page.goto('/');
    await dismissUpdateDialogs(page);

    await page.getByRole('button', { name: /設定|Settings/i }).click();
    await page.getByRole('button', { name: /深色|Dark/i }).click();

    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);
  });

  test('export long image downloads a local JPEG (no third-party)', async ({ page, context }) => {
    await page.goto('/');
    await dismissUpdateDialogs(page);

    const backToEditor = page.getByRole('button', { name: /返回編輯器|Back to editor/i });
    if (await backToEditor.isVisible().catch(() => false)) {
      await backToEditor.click();
    } else {
      await page.getByText(/通用 Coding Agent|General Coding Agent/i).first().click();
      const useTemplate = page.getByRole('button', { name: /使用此模板|Use.*template/i });
      if (await useTemplate.isVisible().catch(() => false)) {
        await useTemplate.click();
      }
    }

    const previewBtn = page.getByRole('button', { name: /預覽互動|Preview/i });
    await expect(previewBtn).toBeVisible({ timeout: 15000 });
    await previewBtn.click();

    const popups = [];
    context.on('page', (p) => popups.push(p));

    const thirdParty = [];
    page.on('request', (req) => {
      const url = req.url();
      if (/^https?:/i.test(url) && !/localhost|127\.0\.0\.1/i.test(url)) {
        thirdParty.push(url);
      }
    });

    const exportBtn = page.getByRole('button', { name: /長圖|Long Image/i });
    await expect(exportBtn).toBeVisible();

    // 監聽實際下載事件，證明使用者真的取得檔案
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      exportBtn.click(),
    ]);

    // 本機渲染並下載完成後才會出現成功 toast
    await expect(page.getByText(/長圖已下載|Long image downloaded/i)).toBeVisible({
      timeout: 15000,
    });

    // 驗證下載檔確為 JPEG：檔名副檔名 + 檔案大小 + magic bytes (FF D8 FF)
    expect(download.suggestedFilename()).toMatch(/\.jpe?g$/i);
    const filePath = await download.path();
    const buf = await fs.promises.readFile(filePath);
    expect(buf.length).toBeGreaterThan(1024);
    expect(buf[0]).toBe(0xff);
    expect(buf[1]).toBe(0xd8);
    expect(buf[2]).toBe(0xff);

    expect(popups).toHaveLength(0);
    expect(thirdParty).toHaveLength(0);
  });
});
