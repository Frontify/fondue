/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { PanelScrollProbe } from './fixtures/PanelScrollProbe';

test('shows the panel content in a Fondue scroll area that keeps the height and scrolls by keyboard', async ({
    mount,
    page,
}) => {
    await mount(<PanelScrollProbe />);
    await expect.poll(() => page.evaluate(() => window.panelScroll !== undefined)).toBe(true);
    await page.evaluate(() => window.panelScroll?.open());

    const panel = page.locator('[data-rte-panel]');
    const area = panel.locator('[data-component="scroll-area"]');
    await expect(area).toHaveCount(1);
    const viewport = area.locator('[data-radix-scroll-area-viewport]');
    await expect(viewport.getByRole('search', { name: 'Find' })).toBeVisible();
    await expect(panel).toHaveCSS('overflow-y', 'visible');
    await expect(page.getByRole('button', { name: 'First' })).toBeFocused();
    const sizes = await viewport.evaluate((node) => ({
        height: node.getBoundingClientRect().height,
        rem: Number.parseFloat(getComputedStyle(node.ownerDocument.documentElement).fontSize),
        overflows: node.scrollHeight > node.clientHeight,
    }));
    expect(sizes.height).toBeLessThanOrEqual(sizes.rem * 16);
    expect(sizes.overflows).toBe(true);
    expect(await viewport.evaluate((node) => node.scrollTop)).toBe(0);

    await page.keyboard.press('PageDown');

    await expect.poll(() => viewport.evaluate((node) => node.scrollTop)).toBeGreaterThan(0);
});
