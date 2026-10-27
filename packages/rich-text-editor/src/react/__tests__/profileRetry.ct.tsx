/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { AXE_TAGS } from '#/testing/conformance/axeTags';

import { ProfileRetryProbe } from './fixtures/ProfileRetryProbe';

// The shell is mounted directly: aborting the profile's chunk would also break whatever chunk shares it in this build.
test('the retry shell has no axe violations and names the textbox', async ({ mount, page }) => {
    await mount(<ProfileRetryProbe />);

    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message' })).toHaveCount(1);
    const { violations } = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();

    expect(violations).toEqual([]);
});

test('takes focus on its message, and Tab then Enter retries with focus held', async ({ mount, page, browserName }) => {
    await mount(<ProfileRetryProbe />);
    // WebKit tabs past buttons unless Alt is held.
    let tab = 'Tab';
    if (browserName === 'webkit') {
        tab = 'Alt+Tab';
    }

    await expect(page.getByText('The editor could not load.')).toBeFocused();
    await page.keyboard.press(tab);
    await expect(page.getByRole('button', { name: 'Retry' })).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('retries')).toHaveText('true');
});
