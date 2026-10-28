/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { StyleProbe } from './fixtures/StyleProbe';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });

test('a button presentation link style matches the editor and the reader', async ({ mount, page }) => {
    await mount(<StyleProbe />);
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    const link = surfaceOf(page).locator('a', { hasText: 'button link' });
    const reader = page.getByRole('region', { name: 'Reader' }).locator('a', { hasText: 'button link' });
    for (const anchor of [link, reader]) {
        await expect(anchor).toHaveCSS('display', 'inline-block');
        await expect(anchor).toHaveCSS('background-color', 'rgb(29, 78, 216)');
    }
});
