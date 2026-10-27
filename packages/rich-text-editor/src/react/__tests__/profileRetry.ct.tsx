/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { AXE_TAGS } from '#/testing/conformance/axeTags';

import { ProfileProbe } from './fixtures/ProfileProbe';

// The browser keeps a failed `import()` for the page, so Retry in a test loads the same failure again.
const failInlineChunk = (page: Page) => page.route(/assets\/inline-[^/]*\.js/, (route) => route.abort());

test('the retry shell has no axe violations and names the textbox', async ({ mount, page }) => {
    await failInlineChunk(page);
    await mount(<ProfileProbe profile="inline" />);

    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message' })).toHaveCount(1);
    const { violations } = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();

    expect(violations).toEqual([]);
});

test('Tab reaches Retry, Enter retries and the shell takes focus back when the import fails again', async ({
    mount,
    page,
    browserName,
}) => {
    await failInlineChunk(page);
    await mount(<ProfileProbe profile="inline" />);
    // WebKit tabs past buttons unless Alt is held.
    let tab = 'Tab';
    if (browserName === 'webkit') {
        tab = 'Alt+Tab';
    }

    // The message takes focus on mount, so Tab moves to the one button.
    await expect(page.getByText('The editor could not load.')).toBeFocused();
    await page.keyboard.press(tab);

    await expect(page.getByRole('button', { name: 'Retry' })).toBeFocused();
    await page.keyboard.press('Enter');

    // The pressed button left the page with the shell, so focus must land on the new shell's message and not on the body.
    await expect(page.getByText('The editor could not load.')).toBeFocused();
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
});
