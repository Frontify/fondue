/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { HtmlOutputProbe } from './fixtures/HtmlOutputProbe';

const storedOf = (page: Page) => page.getByRole('region', { name: 'Stored HTML' });

test('keeps literal and token text colours and highlights of toHTML output with no package stylesheet', async ({
    mount,
    page,
}) => {
    await mount(<HtmlOutputProbe />);
    const stored = storedOf(page);

    await expect(stored.locator('span', { hasText: 'teal' })).toHaveCSS('color', 'rgb(15, 118, 110)');
    await expect(stored.locator('span', { hasText: 'red' })).toHaveCSS('color', 'rgb(192, 57, 43)');
    await expect(stored.locator('span', { hasText: 'red' })).toHaveAttribute('data-rte-color', 'brand.red');
    await expect(stored.locator('mark', { hasText: 'sun' })).toHaveCSS('background-color', 'rgb(253, 230, 138)');
    await expect(stored.locator('mark', { hasText: 'rose' })).toHaveCSS('background-color', 'rgb(254, 205, 211)');
});
