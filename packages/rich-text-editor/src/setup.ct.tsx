/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

test('SPEC-rich-text/AC-082 mounts inside the light theme with the token styles', async ({ mount, page }) => {
    await mount(<p data-test-id="setup-probe">Probe</p>);

    const root = page.locator('#root > .fondue-theme-provider');
    await expect(root).toHaveClass(/(^|\s)_light_/);
    const tokens = await root.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
            surface: style.getPropertyValue('--color-surface-default').trim(),
            lightSurface: style.getPropertyValue('--color-neutral-00').trim(),
        };
    });
    expect(tokens.surface).not.toBe('');
    expect(tokens.surface).toBe(tokens.lightSurface);
    await expect(root.getByTestId('setup-probe')).toBeVisible();
});
