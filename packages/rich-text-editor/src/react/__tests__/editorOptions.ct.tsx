/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { bullets, listItem, taskItem, tasks } from './fixtures/listBlocks';
import { ListProbe } from './fixtures/ListProbe';
import { OverlayProbe } from './fixtures/OverlayProbe';

type ListRte = NonNullable<Window['listRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const bubbleOf = (page: Page) => page.getByRole('toolbar', { name: 'Selection formatting' });
// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const frames = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
const nested = [bullets(listItem('first'), listItem('second', bullets(listItem('inner one'), listItem('inner two'))))];
const taskBlocks = [tasks(taskItem('task-1', 'task one'), taskItem('task-2', 'task two'))];
const lines = (count: number) => Array.from({ length: count }, (_, index) => `Line ${index + 1}`);

test.describe('tabMovesFocus', () => {
    const listReady = async (page: Page) => {
        await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
        await expect.poll(() => page.evaluate(() => window.listRte !== undefined)).toBe(true);
    };
    const caretIn = async (page: Page, text: string) => {
        await surfaceOf(page).focus();
        await settleFocus(page);
        await page.evaluate((value) => {
            const rte = window.listRte as ListRte;
            rte.setSelection(rte.handle, { text: value, from: 1 });
        }, text);
    };
    const commandsOf = (page: Page) =>
        page.evaluate(() => (window.listRte as ListRte).changes.map(({ commandId }) => commandId));

    test('moves focus out of a list item that can nest with Tab and Shift+Tab, changing nothing', async ({
        mount,
        page,
    }) => {
        await mount(<ListProbe blocks={nested} tabMovesFocus />);
        await listReady(page);

        await caretIn(page, 'inner two');
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: 'After' })).toBeFocused();
        await caretIn(page, 'inner two');
        await page.keyboard.press('Shift+Tab');
        await expect(surfaceOf(page)).not.toBeFocused();
        await expect(page.getByRole('toolbar').getByRole('button', { name: 'Bold' })).toBeFocused();

        await expect(surfaceOf(page).locator('ul ul li')).toHaveText(['inner one', 'inner two']);
        expect(await commandsOf(page)).toEqual([]);
    });

    // Task checkboxes are out of the Tab order, so Tab from the item reaches the host button in Chromium and WebKit.
    test('moves focus out of a task item that can nest with Tab and Shift+Tab, changing nothing', async ({
        mount,
        page,
    }) => {
        await mount(<ListProbe blocks={taskBlocks} tabMovesFocus />);
        await listReady(page);

        await caretIn(page, 'task two');
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: 'After' })).toBeFocused();
        await caretIn(page, 'task two');
        await page.keyboard.press('Shift+Tab');
        await expect(page.getByRole('toolbar').getByRole('button', { name: 'Bold' })).toBeFocused();

        await expect(surfaceOf(page).locator('ul ul')).toHaveCount(0);
        expect(await commandsOf(page)).toEqual([]);
    });

    test('still indents a list item and a task item with Tab and outdents with Shift+Tab by default', async ({
        mount,
        page,
    }) => {
        await mount(<ListProbe blocks={[...nested, ...taskBlocks]} />);
        await listReady(page);

        await caretIn(page, 'inner two');
        await page.keyboard.press('Tab');
        await expect(surfaceOf(page)).toBeFocused();
        await expect(surfaceOf(page).locator('ul ul ul li')).toHaveText('inner two');
        await page.keyboard.press('Shift+Tab');
        await expect(surfaceOf(page)).toBeFocused();
        await caretIn(page, 'task two');
        await page.keyboard.press('Tab');
        await expect(surfaceOf(page)).toBeFocused();

        await expect.poll(() => commandsOf(page)).toEqual(['list.indent', 'list.outdent', 'task.indent']);
    });
});

test.describe('bubble toolbar and focus leaving the editor', () => {
    const ready = async (page: Page) => {
        await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
        await expect.poll(() => page.evaluate(() => window.overlayProbe !== undefined)).toBe(true);
        await surfaceOf(page).focus();
        await settleFocus(page);
    };
    const select = (page: Page, text: string) =>
        page.evaluate((target) => window.overlayProbe?.select({ text: target }), text);
    const selectionOf = (page: Page) => page.evaluate(() => window.overlayProbe?.selection());

    test('keeps the toolbar for focus in it and hides it for a host button, keeping the selection', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe />);
        await ready(page);
        await select(page, 'two');
        await expect(bubbleOf(page)).toBeVisible();
        const selected = await selectionOf(page);

        await page.keyboard.press('Alt+F10');
        await expect(bubbleOf(page).getByRole('button', { name: 'Bold' })).toBeFocused();
        await frames(page);
        await expect(bubbleOf(page)).toBeVisible();
        await page.getByRole('button', { name: 'After' }).focus();

        await expect(bubbleOf(page)).toBeHidden();
        expect(await selectionOf(page)).toEqual(selected);
    });

    test('hides the toolbar under the pointer when Tab moves focus to a host button', async ({ mount, page }) => {
        await mount(<OverlayProbe />);
        await ready(page);
        await select(page, 'two');
        await expect(bubbleOf(page)).toBeVisible();
        const selected = await selectionOf(page);
        await frames(page);
        await bubbleOf(page).hover({ position: { x: 4, y: 4 } });

        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: 'After' })).toBeFocused();
        await expect(bubbleOf(page)).toBeHidden();
        expect(await selectionOf(page)).toEqual(selected);
    });

    test('lets pointer and focus events of the surface bubble out of the editor root', async ({ mount, page }) => {
        await mount(<OverlayProbe />);
        await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
        await page.evaluate(() => {
            const heard: string[] = [];
            Object.assign(window, { heardEvents: heard });
            for (const type of ['pointerdown', 'focusin', 'focusout']) {
                document.addEventListener(type, (event) => {
                    if (event.target instanceof Element && event.target.closest('[data-rte-surface]') !== null) {
                        heard.push(type);
                    }
                });
            }
        });

        await surfaceOf(page).click();
        await page.getByRole('button', { name: 'After' }).focus();

        const heard = await page.evaluate(() => (window as unknown as { heardEvents: string[] }).heardEvents);
        expect(heard).toEqual(['pointerdown', 'focusin', 'focusout']);
    });
});

test.describe('scrollSelectionIntoView', () => {
    const scrollerOf = (page: Page) => page.locator('[data-scroller]');
    /** Puts the caret at the end of `Line 6`, near the bottom of the visible area, and presses Enter ten times. */
    const enterBelow = async (page: Page) => {
        await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
        await expect.poll(() => page.evaluate(() => window.overlayProbe !== undefined)).toBe(true);
        await surfaceOf(page).focus();
        await settleFocus(page);
        await page.evaluate(() => window.overlayProbe?.select({ text: 'Line 6', from: 6 }));
        for (let count = 0; count < 10; count += 1) {
            await page.keyboard.press('Enter');
        }
        await frames(page);
    };
    /** How far the caret's block sits below the scroller's visible bottom edge. */
    const caretBelow = (page: Page) =>
        scrollerOf(page).evaluate((scroller) => {
            const node = window.getSelection()?.anchorNode;
            let block: Element | null = null;
            if (node instanceof Element) {
                block = node;
            } else if (node !== null && node !== undefined) {
                block = node.parentElement;
            }
            if (block === null) {
                throw new Error('No caret');
            }
            return block.getBoundingClientRect().top - scroller.getBoundingClientRect().bottom;
        });
    const scrollTopOf = (page: Page) => scrollerOf(page).evaluate((scroller) => scroller.scrollTop);

    test('leaves the scroll position when an edit moves the caret below the visible area', async ({ mount, page }) => {
        await mount(
            <OverlayProbe bubble={false} texts={lines(40)} scrollHeight={200} scrollSelectionIntoView={false} />,
        );
        await enterBelow(page);

        expect(await scrollTopOf(page)).toBe(0);
        expect(await page.evaluate(() => window.scrollY)).toBe(0);
        expect(await caretBelow(page)).toBeGreaterThan(0);
    });

    test('scrolls the caret into view by default', async ({ mount, page }) => {
        await mount(<OverlayProbe bubble={false} texts={lines(40)} scrollHeight={200} />);
        await enterBelow(page);

        expect(await scrollTopOf(page)).toBeGreaterThan(0);
        expect(await caretBelow(page)).toBeLessThan(0);
    });
});
