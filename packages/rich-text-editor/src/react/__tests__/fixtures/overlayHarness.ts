/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

/** Undo and redo, then the toolbar stand-ins, as the touch toolbars start. */
export const TOUCH_TOOLBAR = [
    ['fixture.history.undo', 'fixture.history.redo'],
    ['mark.bold.toggle', 'fixture.italic.toggle', 'fixture.link.edit'],
    ['fixture.list.toggle'],
];

export const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
export const bubbleOf = (page: Page) => page.getByRole('toolbar', { name: 'Selection formatting' });
export const toolbarOf = (page: Page) => page.getByRole('toolbar', { name: 'Text formatting' });
export const popoverOf = (page: Page) => page.getByTestId('fixture-link-popover');
export const suggestionsOf = (page: Page) => page.getByTestId('fixture-suggestions');
export const menuOf = (page: Page) => page.getByRole('menu', { name: 'Block actions' });
export const dialogOf = (page: Page) => page.getByRole('dialog', { name: 'Alternative text' });
export const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.overlayProbe !== undefined)).toBe(true);
};

export const select = (page: Page, text: string) =>
    page.evaluate((target) => window.overlayProbe?.select({ text: target }), text);
export const open = (page: Page, kind: 'link' | 'suggestions' | 'menu') =>
    page.evaluate((overlay) => window.overlayProbe?.open(overlay), kind);
/** The focused element's `aria-label` or text, followed into shadow roots and iframes. */
export const focusedName = (page: Page) =>
    page.evaluate(() => {
        let active = document.activeElement;
        for (;;) {
            if (active instanceof HTMLIFrameElement && active.contentDocument !== null) {
                active = active.contentDocument.activeElement;
            } else if (active !== null && active.shadowRoot !== null && active.shadowRoot.activeElement !== null) {
                active = active.shadowRoot.activeElement;
            } else {
                break;
            }
        }

        if (active === null) {
            return null;
        }

        // A field's name is its label's text.
        const { labels } = active as Partial<HTMLInputElement>;
        const label = labels?.[0];
        if (label !== undefined) {
            return label.textContent;
        }

        return active.getAttribute('aria-label') ?? active.textContent;
    });
// Radix Toolbar moves focus in a timeout after the key, so focus is read once it settles.
export const expectFocus = (page: Page, name: string) => expect.poll(() => focusedName(page)).toBe(name);
/** The client rectangle of `text` in the surface. */
export const textBox = (page: Page, text: string) =>
    page.evaluate((target) => {
        const surface = document.querySelector('[role="textbox"]');
        if (surface === null) {
            throw new Error('No surface');
        }

        const walker = document.createTreeWalker(surface, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) {
            const index = (node.textContent ?? '').indexOf(target);
            if (index >= 0) {
                const range = document.createRange();
                range.setStart(node, index);
                range.setEnd(node, index + target.length);
                const { top, bottom, left, right } = range.getBoundingClientRect();

                return { top, bottom, left, right };
            }
        }

        throw new Error(`No text ${target}`);
    }, text);
export const boxOf = async (locator: Locator) => {
    const box = await locator.boundingBox();
    if (box === null) {
        throw new Error('No box');
    }

    return { top: box.y, bottom: box.y + box.height, left: box.x, right: box.x + box.width };
};

// Radix listens for Escape and places an overlay in effects and frames after it shows.
export const frames = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
/** Resolves once every stylesheet link is in the cascade: WebKit keeps a lazy chunk's sheet out of it while others load, so an earlier box read is the unstyled one. */
export const stylesApplied = (page: Page) =>
    page.waitForFunction(() =>
        [...document.querySelectorAll<HTMLLinkElement>('link[rel=stylesheet]')].every(
            (link) => link.sheet !== null && [...document.styleSheets].includes(link.sheet),
        ),
    );
export const bottomOf = async (locator: Locator) => {
    const box = await boxOf(locator);

    return box.bottom;
};

export const documentHtml = (page: Page) => page.evaluate(() => window.overlayProbe?.html());
/** The `alt` of the image in the runtime's snapshot document. */
export const imageAlt = (page: Page) =>
    page.evaluate(() => {
        const content = window.overlayProbe?.handle.getSnapshot().document.content.content;
        const image = content?.find((block) => block.type === 'media_image');
        if (image === undefined) {
            return undefined;
        }

        return image.attrs?.alt;
    });
/** Counts the `focusout` events of the surface from now on; read the count with `focusOuts`. */
export const watchFocusOut = (page: Page) =>
    page.evaluate(() => {
        const counter = { count: 0 };
        Object.assign(window, { focusOutCounter: counter });
        document.querySelector('[role="textbox"]')?.addEventListener('focusout', () => {
            counter.count += 1;
        });
    });
export const focusOuts = (page: Page) =>
    page.evaluate(() => (window as unknown as { focusOutCounter: { count: number } }).focusOutCounter.count);
export const summary = (page: Page) => page.evaluate(() => window.overlayProbe?.handle.getSummary().selection);
export const paragraph = (text: string) =>
    ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] }) as never;
export const image = { type: 'media_image', attrs: { nodeId: 'image-1', assetId: null, alt: '' } } as never;
export const table = { type: 'table_block', attrs: { nodeId: 'table-1' }, content: [paragraph('cell')] } as never;
export const codeBlock = {
    type: 'chrome_code',
    attrs: { nodeId: 'code-1', language: 'plain' },
    content: [{ type: 'text', text: 'let code = 1' }],
} as never;
export const lines = (count: number) => Array.from({ length: count }, (_, index) => `Line ${index + 1}`);
/** Opens the alternative text dialog from the image's node chrome, by keyboard. */
export const openAltText = async (page: Page) => {
    await surfaceOf(page).focus();
    // Focus places the caret a task later, which would replace a selection set before it.
    await expectFocus(page, 'Notes');
    await frames(page);
    await page.evaluate(() => window.overlayProbe?.select({ nodeId: 'image-1' }));
    // Alt+F10 from node chrome moves on to the next toolbar, so it starts from the surface with the image selected.
    await expect.poll(() => summary(page)).toMatchObject({ selectedNodeId: 'image-1' });
    await page.keyboard.press('Alt+F10');
    await expectFocus(page, 'Alternative text');
    await page.keyboard.press('Enter');
    await expect(dialogOf(page)).toBeVisible();
};

/** Whether every corner and the center of `locator` is in the viewport and shows the overlay, not what clips it. */
export const shownWhole = (locator: Locator) =>
    locator.evaluate((element) => {
        const { top, bottom, left, right } = element.getBoundingClientRect();
        if (top < 0 || left < 0 || bottom > window.innerHeight || right > window.innerWidth) {
            return false;
        }

        const points = [
            [left + 2, top + 2],
            [right - 2, top + 2],
            [left + 2, bottom - 2],
            [right - 2, bottom - 2],
            [(left + right) / 2, (top + bottom) / 2],
        ];

        return points.every(([pointerX, pointerY]) =>
            element.contains(document.elementFromPoint(pointerX ?? 0, pointerY ?? 0)),
        );
    });
