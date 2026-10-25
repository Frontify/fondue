/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { EditorProbe } from './fixtures/EditorProbe';

test('wraps the mount in the light theme with the token styles loaded', async ({ mount, page }) => {
    await mount(<EditorProbe texts={['ab']} />);

    const provider = page.locator('#root > .fondue-theme-provider');
    await expect(provider).toHaveCount(1);
    await expect(provider.locator('[data-test-id="fondue-rich-text-editor"]')).toHaveCount(1);
    // The light theme sets this to rgba(106, 203, 117, 1) and the dark theme to another value.
    await expect
        .poll(() =>
            provider.evaluate((node) =>
                getComputedStyle(node).getPropertyValue('--color-charts-primary-default').trim(),
            ),
        )
        .toBe('rgba(106, 203, 117, 1)');
});
