/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { AlignHtml } from './fixtures/AlignHtml';

test('computes text-align from the inline style for each alignment', async ({ mount, page }) => {
    await mount(<AlignHtml />);
    await expect(page.locator('p')).toHaveCount(4);

    const computed = await page
        .locator('p')
        .evaluateAll((paragraphs) => paragraphs.map((paragraph) => getComputedStyle(paragraph).textAlign));

    expect(computed).toEqual(['left', 'center', 'right', 'justify']);
});
