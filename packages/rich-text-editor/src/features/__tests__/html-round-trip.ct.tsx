/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { HtmlRoundTripProbe } from './fixtures/HtmlRoundTripProbe';

const seed = Number(process.env.FC_SEED ?? Math.floor(Math.random() * 2 ** 31));

test('pastes the toHTML output of 200 generated documents of lossless features as equal documents', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'The property runs in Chromium.');
    test.setTimeout(120_000);
    await mount(<HtmlRoundTripProbe />);
    await expect(page.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.htmlRoundTrip !== undefined)).toBe(true);

    const mismatches = await page.evaluate((runSeed) => window.htmlRoundTrip?.(200, runSeed), seed);

    expect(mismatches?.slice(0, 1), `fast-check seed ${seed}; replay with FC_SEED`).toEqual([]);
});
