/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { HtmlOutputProbe } from './fixtures/HtmlOutputProbe';

const storedOf = (page: Page) => page.getByRole('region', { name: 'Stored HTML' });

test('keeps the inline recipes of a heading style, the default link style and a button link style with no package stylesheet', async ({
    mount,
    page,
}) => {
    await mount(<HtmlOutputProbe />);
    const stored = storedOf(page);
    // The content root takes `white-space: break-spaces` only from the package stylesheet.
    await expect(stored.locator('.fondue-rte-content')).not.toHaveCSS('white-space', 'break-spaces');
    await expect(page.locator('style[data-rte-styles]')).toHaveCount(0);

    const heading = stored.locator('h1');
    await expect(heading).toHaveCSS('color', 'rgb(29, 78, 216)');
    await expect(heading).toHaveCSS('font-size', '32px');
    await expect(heading).toHaveCSS('font-weight', '700');
    const lead = stored.locator('p');
    await expect(lead).toHaveCSS('font-size', '20px');
    await expect(lead).toHaveCSS('font-weight', '300');
    const link = stored.locator('a', { hasText: 'basics' });
    await expect(link).toHaveCSS('text-decoration-line', 'underline');
    const button = stored.locator('a', { hasText: 'start' });
    await expect(button).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(button).toHaveCSS('background-color', 'rgb(29, 78, 216)');
    await expect(button).toHaveCSS('font-weight', '700');
    await expect(button).toHaveCSS('text-decoration-line', 'none');
});

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
