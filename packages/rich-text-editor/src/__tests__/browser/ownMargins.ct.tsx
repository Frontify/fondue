/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { OwnMarginsFrame } from './OwnMarginsFrame';
import { FRAME_MARGIN } from './ownMarginsValues';

// A block's look hands its margins to the document through custom properties that do not inherit,
// so the blocks inside a block that hands over its margins keep the document's gap.

const SURFACES = ['renderer', 'editor'];

/** A host stylesheet's reset, an attribute and a tag per rule, which rank as `.prose p` does. */
const HOST_MARGIN_RESET = '[data-test-id] p, [data-test-id] blockquote { margin: 0; }';

for (const surface of SURFACES) {
    test.describe(`the margins a block hands to the document in the ${surface}`, () => {
        test('are the ones the block hands over', async ({ mount }) => {
            const component = await mount(<OwnMarginsFrame />);
            const frame = component.getByTestId(surface).locator('blockquote');

            await expect(frame).toHaveCSS('margin-top', FRAME_MARGIN);
            await expect(frame).toHaveCSS('margin-bottom', FRAME_MARGIN);
        });

        test('do not reach the first paragraph inside the block', async ({ mount }) => {
            const component = await mount(<OwnMarginsFrame />);
            const root = component.getByTestId(surface);
            const documentGap = await root
                .locator('p')
                .first()
                .evaluate((node) => getComputedStyle(node).marginBottom);
            const inner = root.locator('blockquote p').first();

            await expect(inner).toHaveCSS('margin-top', '0px');
            await expect(inner).toHaveCSS('margin-bottom', documentGap);
            await expect(inner).not.toHaveCSS('margin-bottom', FRAME_MARGIN);
        });

        test('outrank a host rule of one class and one tag loaded after them', async ({ mount, page }) => {
            const component = await mount(<OwnMarginsFrame />);
            const first = component.getByTestId(surface).locator('p').first();
            const documentGap = await first.evaluate((node) => getComputedStyle(node).marginBottom);

            await page.addStyleTag({ content: HOST_MARGIN_RESET });

            await expect(first).toHaveCSS('margin-bottom', documentGap);
            await expect(component.getByTestId(surface).locator('blockquote')).toHaveCSS('margin-top', FRAME_MARGIN);
        });

        test('leave a block of any tag the document gap', async ({ mount }) => {
            const component = await mount(<OwnMarginsFrame />);
            const root = component.getByTestId(surface);
            const documentGap = await root
                .locator('p')
                .first()
                .evaluate((node) => getComputedStyle(node).marginBottom);
            const section = root.locator('section');

            await expect(section).toHaveCSS('margin-top', '0px');
            await expect(section).toHaveCSS('margin-bottom', documentGap);
            expect(documentGap).not.toBe('0px');
        });

        test('do not reach the last paragraph inside the block', async ({ mount }) => {
            const component = await mount(<OwnMarginsFrame />);

            await expect(component.getByTestId(surface).locator('blockquote p').last()).toHaveCSS(
                'margin-bottom',
                '0px',
            );
        });
    });
}
