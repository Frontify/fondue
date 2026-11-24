/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { DirectionFrame } from './DirectionFrame';

// An alignment is stored as the end of the line, so it follows the direction the editor reads in.

/** How far the text may sit from the edge it is aligned to, for rounding. */
const EDGE_TOLERANCE_PX = 3;

type TextEdges = { paragraphLeft: number; paragraphRight: number; textLeft: number; textRight: number };

/** The edges of the paragraph's content box and of the text inside it, in the page's coordinates. */
const textEdgesOf = (paragraph: Locator): Promise<TextEdges> =>
    paragraph.evaluate((node) => {
        const box = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        const range = document.createRange();
        range.selectNodeContents(node);
        const text = range.getBoundingClientRect();

        return {
            paragraphLeft: box.left + Number.parseFloat(style.paddingLeft),
            paragraphRight: box.right - Number.parseFloat(style.paddingRight),
            textLeft: text.left,
            textRight: text.right,
        };
    });

test.describe('an end aligned paragraph', () => {
    test('is at the right edge in a left to right editor', async ({ mount }) => {
        const component = await mount(<DirectionFrame />);
        const paragraph = component.getByTestId('ltr').locator('[contenteditable] p');

        await expect(paragraph).toHaveCSS('text-align', 'end');

        const edges = await textEdgesOf(paragraph);
        expect(Math.abs(edges.paragraphRight - edges.textRight)).toBeLessThanOrEqual(EDGE_TOLERANCE_PX);
    });

    test('is at the left edge in a right to left editor', async ({ mount }) => {
        const component = await mount(<DirectionFrame />);
        const paragraph = component.getByTestId('rtl').locator('[contenteditable] p');

        await expect(paragraph).toHaveCSS('text-align', 'end');

        const edges = await textEdgesOf(paragraph);
        expect(Math.abs(edges.textLeft - edges.paragraphLeft)).toBeLessThanOrEqual(EDGE_TOLERANCE_PX);
    });
});

test.describe('the alignment control in a right to left editor', () => {
    test('offers the start first, named right', async ({ mount }) => {
        const component = await mount(<DirectionFrame />);
        const editor = component.getByTestId('rtl');

        await editor.getByRole('textbox').click();

        await expect(editor.getByRole('radiogroup').getByRole('radio').first()).toHaveAccessibleName('Align right');
    });
});
