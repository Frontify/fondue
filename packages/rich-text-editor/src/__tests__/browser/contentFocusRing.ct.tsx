/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { ContentFocusRingFrame } from './ContentFocusRingFrame';
import { CONTENT_TEXT } from './contentFocusRingValues';

// A host stylesheet such as Tailwind's preflight styles `:-moz-focusring`, which Firefox matches after a click into the text.

const FORCED_COLORS_OUTLINE_WIDTH = '2px';

test.describe('RichTextEditor content focus ring', () => {
    test('has no outline after a click into the text under a host `:-moz-focusring` rule', async ({
        mount,
        page,
    }) => {
        await mount(<ContentFocusRingFrame />);
        const editable = page.getByRole('textbox');

        await editable.getByText(CONTENT_TEXT).click();

        await expect(editable).toBeFocused();
        await expect(editable).toHaveCSS('outline-style', 'none');
    });

    test('has a solid outline after a click into the text in forced colours', async ({ mount, page }) => {
        await page.emulateMedia({ forcedColors: 'active' });
        await mount(<ContentFocusRingFrame />);
        const editable = page.getByRole('textbox');

        await editable.getByText(CONTENT_TEXT).click();

        await expect(editable).toBeFocused();
        await expect(editable).toHaveCSS('outline-style', 'solid');
        await expect(editable).toHaveCSS('outline-width', FORCED_COLORS_OUTLINE_WIDTH);
    });
});
