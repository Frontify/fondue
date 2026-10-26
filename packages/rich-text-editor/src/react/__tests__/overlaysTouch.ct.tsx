/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { cspViolationsOf } from '../../../playwright/csp';

import {
    TOUCH_TOOLBAR,
    surfaceOf,
    bubbleOf,
    toolbarOf,
    dialogOf,
    ready,
    select,
    focusedName,
    expectFocus,
    boxOf,
    bottomOf,
    documentHtml,
    imageAlt,
    watchFocusOut,
    focusOuts,
    paragraph,
    image,
    lines,
    openAltText,
} from './fixtures/overlayHarness';
import { OverlayProbe } from './fixtures/OverlayProbe';

test.afterEach(async ({ page }) => {
    // No paste or render path needs inline script, `eval` or a foreign origin.
    expect(await cspViolationsOf(page)).toEqual([]);
});

test.describe('on a touch device', () => {
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 700 } });

    /** Halves the visual viewport, as an on-screen keyboard does, and tells the editor. */
    const openKeyboard = (page: Page) =>
        page.evaluate(() => {
            const viewport = window.visualViewport;
            if (viewport === null) {
                return;
            }
            const height = window.innerHeight / 2;
            Object.defineProperty(viewport, 'height', { configurable: true, get: () => height });
            viewport.dispatchEvent(new Event('resize'));
        });

    test('docks the toolbar above the on-screen keyboard inside a host dialog, whose transform moves the origin of fixed positioning', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe within="dialog" bubble={false} />);
        await ready(page);
        await surfaceOf(page).tap();

        await openKeyboard(page);

        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(350, 0);
    });

    test('follows the visual viewport when it pans above the on-screen keyboard', async ({ mount, page }) => {
        await mount(<OverlayProbe bubble={false} />);
        await ready(page);
        await surfaceOf(page).tap();
        await openKeyboard(page);
        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(350, 0);

        await page.evaluate(() => {
            const viewport = window.visualViewport;
            if (viewport === null) {
                return;
            }
            Object.defineProperty(viewport, 'offsetTop', { configurable: true, get: () => 100 });
            viewport.dispatchEvent(new Event('scroll'));
        });

        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(450, 0);
    });

    test('docks the toolbar with undo and redo above the on-screen keyboard, and a tap leaves focus in the surface', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe bubble={false} toolbar={TOUCH_TOOLBAR} />);
        await ready(page);
        await surfaceOf(page).tap();
        await select(page, 'two');

        await openKeyboard(page);
        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(350, 0);
        await expect(toolbarOf(page).getByRole('button', { name: 'Undo' })).toBeVisible();
        await expect(toolbarOf(page).getByRole('button', { name: 'Redo' })).toBeVisible();
        await watchFocusOut(page);
        await toolbarOf(page).getByRole('button', { name: 'Bold' }).tap();

        await expect(toolbarOf(page).getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true');
        expect(await focusOuts(page)).toBe(0);
        expect(await focusedName(page)).toBe('Notes');
        expect(await documentHtml(page)).toBe('<p>one <strong>two</strong> three</p>');
    });

    // Only the docked toolbar's items prevent the press default that moves focus.
    test('prevents the press default of a toolbar item only while the toolbar is docked', async ({ mount, page }) => {
        await mount(<OverlayProbe bubble={false} toolbar={TOUCH_TOOLBAR} />);
        await ready(page);
        await surfaceOf(page).tap();
        const pressPrevented = () =>
            toolbarOf(page)
                .getByRole('button', { name: 'Bold' })
                .evaluate(
                    (element) =>
                        !element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true })),
                );

        expect(await pressPrevented()).toBe(false);
        await openKeyboard(page);
        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(350, 0);
        expect(await pressPrevented()).toBe(true);
    });

    test('ends a composition and runs Bold once tapped on the docked toolbar @engine', async ({
        mount,
        page,
        browserName,
    }) => {
        test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only');
        await mount(<OverlayProbe bubble={false} toolbar={TOUCH_TOOLBAR} texts={['one ']} />);
        await ready(page);
        await surfaceOf(page).tap();
        await page.evaluate(() => window.overlayProbe?.handle.focus('end'));
        await openKeyboard(page);
        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(350, 0);
        const client = await page.context().newCDPSession(page);
        await client.send('Input.imeSetComposition', { text: 'two', selectionStart: 3, selectionEnd: 3 });

        await toolbarOf(page).getByRole('button', { name: 'Bold' }).tap();
        await expect(toolbarOf(page).getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true');
        await page.keyboard.type('x');

        expect(await focusedName(page)).toBe('Notes');
        await expect.poll(() => documentHtml(page)).toBe('<p>one two<strong>x</strong></p>');
    });

    test('scrolls the caret clear of the docked toolbar above the on-screen keyboard', async ({ mount, page }) => {
        await mount(<OverlayProbe bubble={false} toolbar={TOUCH_TOOLBAR} texts={lines(60)} />);
        await ready(page);
        await surfaceOf(page).tap();
        await openKeyboard(page);
        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(350, 0);
        const bottomMargin = () => page.evaluate(() => window.overlayProbe?.bottomMargin());
        // The docked toolbar's resize observer adds its height to the margin after the toolbar has moved.
        await expect.poll(bottomMargin).toBeGreaterThan(355);
        const margin = await bottomMargin();
        // A visual viewport scroll measures the keyboard again, which must keep the docked toolbar's part.
        await page.evaluate(() => window.visualViewport?.dispatchEvent(new Event('scroll')));
        expect(await bottomMargin()).toBe(margin);

        await page.evaluate(() => {
            const paragraph = [...document.querySelectorAll('[role="textbox"] p')].find(
                (element) => element.textContent === 'Line 40',
            );
            const toolbar = document.querySelector('[role="toolbar"]');
            if (paragraph === undefined || toolbar === null) {
                return;
            }
            window.scrollBy(0, paragraph.getBoundingClientRect().top - toolbar.getBoundingClientRect().top - 4);
            window.overlayProbe?.select({ text: 'Line 40', from: 7 });
        });
        await page.keyboard.type('x');

        const clear = await page.evaluate(() => {
            const selection = window.getSelection();
            const toolbar = document.querySelector('[role="toolbar"]');
            if (selection === null || selection.rangeCount === 0 || toolbar === null) {
                return false;
            }
            const caret = selection.getRangeAt(0).getBoundingClientRect();
            return caret.bottom <= toolbar.getBoundingClientRect().top && caret.top >= 0;
        });
        expect(clear).toBe(true);
    });

    test('drops the docked toolbar from the bottom scroll margin when bubble mode replaces it', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe bubble={false} toolbar={TOUCH_TOOLBAR} />);
        await ready(page);
        await surfaceOf(page).tap();
        await openKeyboard(page);
        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(350, 0);
        const bottomMargin = () => page.evaluate(() => window.overlayProbe?.bottomMargin());
        // The docked toolbar's resize observer adds its height to the margin after the toolbar has moved.
        await expect.poll(bottomMargin).toBeGreaterThan(355);

        await toolbarOf(page).getByRole('button', { name: 'More' }).tap();
        await page.getByRole('menuitem', { name: 'Show toolbar on selection only' }).tap();
        await expect(toolbarOf(page)).toHaveCount(0);

        // The keyboard's 350 px and ProseMirror's own 5 px margin stay.
        await expect.poll(bottomMargin).toBe(355);
    });

    test('gives every bubble toolbar item a 44 by 44 CSS pixel target', async ({ mount, page }) => {
        await mount(<OverlayProbe defaultToolbarMode="bubble" />);
        await ready(page);
        await surfaceOf(page).tap();
        await select(page, 'two');
        await expect(bubbleOf(page)).toBeVisible();

        for (const button of await bubbleOf(page).getByRole('button').all()) {
            const box = await boxOf(button);
            expect(box.right - box.left).toBeGreaterThanOrEqual(44);
            expect(box.bottom - box.top).toBeGreaterThanOrEqual(44);
        }
    });

    test('closes the alternative text dialog with its visible close control, with no change and focus on its chrome button', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe bubble={false} blocks={[paragraph('one'), image]} />);
        await ready(page);
        await openAltText(page);
        expect(await imageAlt(page)).toBe('');
        await dialogOf(page).getByRole('textbox', { name: 'Description' }).fill('A dog');
        const close = dialogOf(page).getByRole('button', { name: 'Close' });
        await expect(close).toBeVisible();

        await close.tap();

        await expect(dialogOf(page)).toBeHidden();
        await expectFocus(page, 'Alternative text');
        expect(await documentHtml(page)).not.toContain('A dog');
        expect(await imageAlt(page)).toBe('');
    });
});
