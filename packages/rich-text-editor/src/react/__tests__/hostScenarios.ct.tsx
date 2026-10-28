/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { pressUntil, ready, settled } from './fixtures/layout';
import { ProfileProbe } from './fixtures/ProfileProbe';
import { expectFocus, surfaceOf as toolbarSurface } from './fixtures/toolbarHarness';
import { ToolbarProbe } from './fixtures/ToolbarProbe';

test('toolbar below the content keeps DOM order, roving focus, Alt+F10 from the text and Escape back to the text', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe compose toolbarBelow />);
    await ready(page);
    const order = await page.evaluate(() => {
        const root = document.querySelector('[data-test-id="fondue-rich-text-editor"]');
        const surface = root?.querySelector('[data-rte-surface]');
        const toolbar = root?.querySelector('[role="toolbar"]');
        if (surface === null || surface === undefined || toolbar === null || toolbar === undefined) {
            return '';
        }

        return surface.compareDocumentPosition(toolbar) & Node.DOCUMENT_POSITION_FOLLOWING ? 'below' : 'above';
    });
    expect(order).toBe('below');

    await toolbarSurface(page).click();
    await page.keyboard.press('Alt+F10');
    await expectFocus(page, 'Bold');
    await pressUntil(page, 'ArrowRight', 'Italic');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expectFocus(page, 'Notes');
});

test('focus end from onReady places the caret after the last character of a loaded document', async ({
    mount,
    page,
}) => {
    await mount(<ProfileProbe profile="inline" text="Hello" focusOnReady="end" />);
    await ready(page);
    await settled(page);
    await expect
        .poll(() =>
            page.evaluate(() => {
                const selection = window.getSelection();
                if (selection === null || selection.rangeCount === 0) {
                    return false;
                }

                const range = selection.getRangeAt(0);
                const surface = document.querySelector('[data-rte-surface]');
                if (surface === null || !surface.contains(range.endContainer)) {
                    return false;
                }

                const text = surface.textContent ?? '';

                return range.collapsed && text.endsWith('Hello') && range.endOffset === text.length;
            }),
        )
        .toBe(true);
});
