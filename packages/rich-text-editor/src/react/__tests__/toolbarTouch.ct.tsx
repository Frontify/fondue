/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { toolbarOf } from './fixtures/layout';
import { codeBlock, surfaceOf, itemOf, ready, select, boxOf } from './fixtures/toolbarHarness';
import { ToolbarProbe } from './fixtures/ToolbarProbe';

test.describe('with a coarse pointer', () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });

    test('opens More on a tap', async ({ mount, page }) => {
        await mount(<ToolbarProbe />);
        await ready(page);

        await itemOf(page, 'More').tap();

        await expect(page.getByRole('menu')).toBeVisible();
        await expect(page.getByRole('menuitem', { name: 'Show toolbar on selection only' })).toBeVisible();
    });

    test('opens no More on a tap in a disabled editor', async ({ mount, page }) => {
        await mount(<ToolbarProbe disabled />);
        await ready(page);

        await itemOf(page, 'More').tap({ force: true });
        await page.evaluate(
            () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        );

        await expect(page.getByRole('menu')).toHaveCount(0);
    });

    test('does not open More when a touch slides off it before release', async ({ mount, page }) => {
        await mount(<ToolbarProbe />);
        await ready(page);
        const box = await boxOf(itemOf(page, 'More'));
        const client = await page
            .context()
            .newCDPSession(page)
            .catch(() => undefined);
        test.skip(client === undefined, 'CDP dispatches a sliding touch in Chromium only');
        const point = (x: number, y: number) => [{ x, y }];
        // A slide that pans the page ends in `pointercancel`, which never reaches the release handler; without panning,
        // the release must reach More's own handler, or the test would pass for any release.
        await itemOf(page, 'More').evaluate((more) => {
            more.style.touchAction = 'none';
            const released: string[] = [];
            Object.assign(window, { moreReleases: released });
            more.addEventListener('pointerup', (event) => released.push((event as PointerEvent).pointerType));
        });

        await client?.send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints: point(box.x + 4, box.y + 4),
        });
        await client?.send('Input.dispatchTouchEvent', {
            type: 'touchMove',
            touchPoints: point(box.x + 200, box.y + 200),
        });
        await client?.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });

        await expect
            .poll(() => page.evaluate(() => (window as unknown as { moreReleases: string[] }).moreReleases))
            .toEqual(['touch']);
        // Radix opens a menu in effects and frames after the release.
        await page.evaluate(
            () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        );
        await expect(page.getByRole('menu')).toHaveCount(0);
    });

    test('gives every toolbar item a 44 by 44 CSS pixel target', async ({ mount, page }) => {
        await mount(<ToolbarProbe wide />);
        await ready(page);
        const sizes = await toolbarOf(page)
            .getByRole('button')
            .evaluateAll((buttons) =>
                buttons.map((button) => {
                    const { width, height } = button.getBoundingClientRect();

                    return width >= 44 && height >= 44;
                }),
            );

        expect(sizes.length).toBeGreaterThan(0);
        expect(sizes.every(Boolean)).toBe(true);
    });

    test('gives every node chrome button a 44 by 44 CSS pixel target', async ({ mount, page }) => {
        await mount(<ToolbarProbe compose blocks={[codeBlock('let code = 1')]} />);
        await ready(page);
        await expect.poll(() => page.evaluate(() => matchMedia('(pointer: coarse)').matches)).toBe(true);
        await surfaceOf(page).focus();
        await select(page, 'code');
        const buttons = page.locator('[data-rte-node-chrome] button');
        await expect(buttons.first()).toBeVisible();
        const sizes = await buttons.evaluateAll((elements) =>
            elements.map((element) => {
                const { width, height } = element.getBoundingClientRect();

                return { label: element.getAttribute('aria-label'), width, height };
            }),
        );

        expect(sizes.length).toBeGreaterThan(0);
        expect(sizes.filter(({ width, height }) => width < 44 || height < 44)).toEqual([]);
    });
});

test.describe('on a phone with a sticky toolbar', () => {
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 700 } });

    test('scrolls the caret clear of the sticky toolbar, also once it grows and the viewport halves', async ({
        mount,
        page,
    }) => {
        const texts = Array.from({ length: 60 }, (_, index) => `Line ${index + 1}`);
        await mount(<ToolbarProbe texts={texts} />);
        await ready(page);
        const caretClear = () =>
            page.evaluate(() => {
                const selection = window.getSelection();
                const toolbar = document.querySelector('[role="toolbar"]');
                if (selection === null || selection.rangeCount === 0 || toolbar === null) {
                    return false;
                }

                const caret = selection.getRangeAt(0).getBoundingClientRect();
                let height = window.innerHeight;
                if (window.visualViewport !== null) {
                    height = window.visualViewport.height;
                }

                return caret.top >= toolbar.getBoundingClientRect().bottom && caret.bottom <= height;
            });
        /** Puts the caret at the end of a line that sits under the toolbar, then types there. */
        const typeUnderToolbar = async (line: string) => {
            await page.evaluate((text) => {
                const paragraph = [...document.querySelectorAll('[role="textbox"] p')].find(
                    (element) => element.textContent === text,
                );
                const toolbar = document.querySelector('[role="toolbar"]');
                if (paragraph === undefined || toolbar === null) {
                    return;
                }

                const under = toolbar.getBoundingClientRect().bottom - 4;
                window.scrollBy(0, paragraph.getBoundingClientRect().bottom - under);
                window.toolbarEditor?.setSelection(window.toolbarEditor.handle, { text, from: text.length });
            }, line);
            await page.keyboard.type('x');
        };

        await surfaceOf(page).tap();
        await typeUnderToolbar('Line 30');
        const first = await caretClear();
        await page.setViewportSize({ width: 390, height: 350 });
        await toolbarOf(page).evaluate((toolbar) => {
            (toolbar as HTMLElement).style.blockSize = '120px';
        });
        // The resize observer reports the new height in the next frame.
        await page.evaluate(
            () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        );
        await typeUnderToolbar('Line 40');

        expect([first, await caretClear()]).toEqual([true, true]);
    });
});
