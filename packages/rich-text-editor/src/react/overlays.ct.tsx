/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { OverlayProbe } from '../../fixtures/editor/OverlayProbe';

/** Undo and redo, then the toolbar stand-ins, as the touch toolbars start (SPEC-rich-text-react, Default toolbars). */
const TOUCH_TOOLBAR = [
    ['fixture.history.undo', 'fixture.history.redo'],
    ['mark.bold.toggle', 'fixture.italic.toggle', 'fixture.link.edit'],
    ['fixture.list.toggle'],
];

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const bubbleOf = (page: Page) => page.getByRole('toolbar', { name: 'Selection formatting' });
const toolbarOf = (page: Page) => page.getByRole('toolbar', { name: 'Text formatting' });
const popoverOf = (page: Page) => page.getByTestId('fixture-link-popover');
const suggestionsOf = (page: Page) => page.getByTestId('fixture-suggestions');
const menuOf = (page: Page) => page.getByRole('menu', { name: 'Block actions' });
const dialogOf = (page: Page) => page.getByRole('dialog', { name: 'Alternative text' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.overlayProbe !== undefined)).toBe(true);
};
const select = (page: Page, text: string) =>
    page.evaluate((target) => window.overlayProbe?.select({ text: target }), text);
const open = (page: Page, kind: 'link' | 'suggestions' | 'menu') =>
    page.evaluate((overlay) => window.overlayProbe?.open(overlay), kind);
/** The focused element's `aria-label` or text, followed into shadow roots and iframes. */
const focusedName = (page: Page) =>
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
const expectFocus = (page: Page, name: string) => expect.poll(() => focusedName(page)).toBe(name);
/** The client rectangle of `text` in the surface. */
const textBox = (page: Page, text: string) =>
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
const boxOf = async (locator: Locator) => {
    const box = await locator.boundingBox();
    if (box === null) {
        throw new Error('No box');
    }
    return { top: box.y, bottom: box.y + box.height, left: box.x, right: box.x + box.width };
};
// Radix listens for Escape and places an overlay in effects and frames after it shows.
const frames = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
const bottomOf = async (locator: Locator) => {
    const box = await boxOf(locator);
    return box.bottom;
};
const documentHtml = (page: Page) => page.evaluate(() => window.overlayProbe?.html());
/** The `alt` of the image in the runtime's snapshot document. */
const imageAlt = (page: Page) =>
    page.evaluate(() => {
        const content = window.overlayProbe?.handle.getSnapshot().document.content.content;
        const image = content?.find((block) => block.type === 'media_image');
        if (image === undefined) {
            return undefined;
        }
        return image.attrs?.alt;
    });
/** Counts the `focusout` events of the surface from now on; read the count with `focusOuts`. */
const watchFocusOut = (page: Page) =>
    page.evaluate(() => {
        const counter = { count: 0 };
        Object.assign(window, { focusOutCounter: counter });
        document.querySelector('[role="textbox"]')?.addEventListener('focusout', () => {
            counter.count += 1;
        });
    });
const focusOuts = (page: Page) =>
    page.evaluate(() => (window as unknown as { focusOutCounter: { count: number } }).focusOutCounter.count);
const summary = (page: Page) => page.evaluate(() => window.overlayProbe?.handle.getSummary().selection);
const paragraph = (text: string) =>
    ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] }) as never;
const image = { type: 'media_image', attrs: { nodeId: 'image-1', assetId: null, alt: '' } } as never;
const table = { type: 'table_block', attrs: { nodeId: 'table-1' }, content: [paragraph('cell')] } as never;
const codeBlock = {
    type: 'chrome_code',
    attrs: { nodeId: 'code-1', language: 'plain' },
    content: [{ type: 'text', text: 'let code = 1' }],
} as never;
const lines = (count: number) => Array.from({ length: count }, (_, index) => `Line ${index + 1}`);
/** Opens the alternative text dialog from the image's node chrome, by keyboard. */
const openAltText = async (page: Page) => {
    await surfaceOf(page).focus();
    await page.evaluate(() => window.overlayProbe?.select({ nodeId: 'image-1' }));
    await page.keyboard.press('Alt+F10');
    await expectFocus(page, 'Alternative text');
    await page.keyboard.press('Enter');
    await expect(dialogOf(page)).toBeVisible();
};

test('SPEC-rich-text-react/AC-042 shows the bubble toolbar for a mouse selection and leaves focus in the surface', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe />);
    await ready(page);
    const word = await textBox(page, 'two');
    const middle = (word.top + word.bottom) / 2;

    await page.mouse.move(word.left + 1, middle);
    await page.mouse.down();
    await page.mouse.move(word.right - 1, middle, { steps: 4 });
    await page.mouse.up();

    await expect(bubbleOf(page)).toBeVisible();
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('two');
    expect(await focusedName(page)).toBe('Notes');
    await page.keyboard.press('Tab');
    await expectFocus(page, 'After');
});

test('SPEC-rich-text-react/AC-054 keeps the bubble toolbar focus ring and pressed bar visible in forced colours', async ({
    mount,
    page,
}, testInfo) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await mount(<OverlayProbe />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();
    const bold = bubbleOf(page).getByRole('button', { name: 'Bold' });
    const around = async () => {
        const box = await boxOf(bold);
        return page.screenshot({
            clip: {
                x: box.left - 6,
                y: box.top - 6,
                width: box.right - box.left + 12,
                height: box.bottom - box.top + 12,
            },
        });
    };
    const bar = async () => {
        const box = await boxOf(bold);
        return page.screenshot({
            clip: { x: box.left, y: box.bottom - 3, width: box.right - box.left, height: 3 },
        });
    };
    const unfocused = await around();
    const unpressed = await bar();

    await page.keyboard.press('Alt+F10');
    await expectFocus(page, 'Bold');
    await page.mouse.move(0, 0);
    const focused = await around();
    const ring = await bold.evaluate((element) => {
        const style = getComputedStyle(element);
        return { style: style.outlineStyle, width: Number.parseFloat(style.outlineWidth) };
    });
    await testInfo.attach('focused bubble toolbar item in forced colours', { body: focused, contentType: 'image/png' });
    await page.evaluate(() => window.overlayProbe?.handle.execute('mark.bold.toggle'));
    await expect(bold).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Escape');
    await frames(page);
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();
    const pressed = await bar();

    // Forced colours drops a box-shadow, so only a real outline is a ring that stays.
    expect(ring, 'focus ring outline').toMatchObject({ style: 'solid', width: 2 });
    expect(focused.equals(unfocused), 'focus ring').toBe(false);
    expect(pressed.equals(unpressed), 'pressed bar').toBe(false);
});

for (const theme of ['light', 'dark'] as const) {
    test(`SPEC-rich-text-react/AC-053 draws the bubble toolbar on the Fondue overlay surface in the ${theme} theme`, async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe theme={theme} />);
        await ready(page);
        await surfaceOf(page).focus();
        await select(page, 'two');
        await expect(bubbleOf(page)).toBeVisible();

        const shown = await bubbleOf(page).evaluate((toolbar) => {
            const flyout = toolbar.closest('[role="dialog"]');
            const colors = (element: Element | null) => {
                if (element === null) {
                    throw new Error('no flyout around the bubble toolbar');
                }
                const style = getComputedStyle(element);
                return { background: style.backgroundColor, color: style.color };
            };
            const probe = document.createElement('span');
            probe.style.color = 'var(--color-surface-default)';
            toolbar.append(probe);
            const surface = getComputedStyle(probe).color;
            probe.remove();
            return { toolbar: colors(toolbar), flyout: colors(flyout), surface };
        });

        // The toolbar adds no colour of its own to the flyout, and the flyout takes the surface token of the theme.
        expect(shown.toolbar.background).toMatch(/^rgba\(0, 0, 0, 0\)$|^transparent$/);
        expect(shown.flyout.background).toBe(shown.surface);
    });
}

test('SPEC-rich-text-react/AC-096 SPEC-rich-text-accessibility/AC-027 runs Bold from a mouse click on the bubble toolbar without the surface losing focus', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();
    await watchFocusOut(page);

    await bubbleOf(page).getByRole('button', { name: 'Bold' }).click();

    await expect.poll(() => documentHtml(page)).toBe('<p>one <strong>two</strong> three</p>');
    expect(await focusOuts(page)).toBe(0);
    expect(await focusedName(page)).toBe('Notes');
});

test.describe('SPEC-rich-text-react/AC-043 SPEC-rich-text-accessibility/AC-016 the Overlay focus table', () => {
    test('SPEC-rich-text-react/AC-043 SPEC-rich-text-accessibility/AC-016 bubble toolbar: stays out of focus, Alt+F10 enters, Escape closes with focus in the surface', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe />);
        await ready(page);
        await surfaceOf(page).focus();
        await select(page, 'two');
        await expect(bubbleOf(page)).toBeVisible();
        expect(await focusedName(page)).toBe('Notes');

        await page.keyboard.press('Alt+F10');
        await expectFocus(page, 'Bold');
        await page.keyboard.press('ArrowRight');
        await expectFocus(page, 'Italic');
        // The first Escape closes the tooltip that focus opened (SPEC-rich-text-react/AC-035).
        await expect(page.getByRole('tooltip')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('tooltip')).toHaveCount(0);
        await expectFocus(page, 'Italic');
        // Radix hands Escape back to the toolbar's layer in an effect once the tooltip's layer is gone.
        await frames(page);
        await page.keyboard.press('Escape');

        await expect(bubbleOf(page)).toBeHidden();
        await expectFocus(page, 'Notes');
        expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('two');
        await select(page, 'three');
        await expect(bubbleOf(page)).toBeVisible();
        await frames(page);
        await page.keyboard.press('Escape');
        await expect(bubbleOf(page)).toBeHidden();
        await expectFocus(page, 'Notes');
    });

    test('SPEC-rich-text-react/AC-043 SPEC-rich-text-accessibility/AC-016 link popover: focuses its field, Tab moves through and out, Escape closes with no change at the target', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe bubble={false} />);
        await ready(page);
        await surfaceOf(page).focus();
        await select(page, 'two');
        await open(page, 'link');

        await expectFocus(page, 'URL');
        await page.keyboard.press('Tab');
        await expectFocus(page, 'Apply');
        await page.keyboard.press('Tab');
        await expectFocus(page, 'After');
        await expect(popoverOf(page)).toBeHidden();

        await surfaceOf(page).focus();
        await select(page, 'two');
        await open(page, 'link');
        await expectFocus(page, 'URL');
        await page.keyboard.press('Escape');

        await expect(popoverOf(page)).toBeHidden();
        await expectFocus(page, 'Notes');
        expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('two');
        expect(await documentHtml(page)).toBe('<p>one two three</p>');
    });

    test('SPEC-rich-text-react/AC-043 SPEC-rich-text-accessibility/AC-016 mention list: keeps focus in the surface, Tab accepts the active option, Escape keeps the typed text', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe bubble={false} texts={['Hi @']} />);
        await ready(page);
        await page.evaluate(() => window.overlayProbe?.handle.focus('end'));
        await open(page, 'suggestions');
        await expect(suggestionsOf(page)).toBeVisible();
        expect(await focusedName(page)).toBe('Notes');

        await page.keyboard.press('ArrowDown');
        await expect(page.getByRole('option', { name: 'Grace' })).toHaveAttribute('aria-selected', 'true');
        await page.keyboard.press('Tab');

        await expect(suggestionsOf(page)).toBeHidden();
        await expectFocus(page, 'Notes');
        expect(await documentHtml(page)).toBe('<p>Hi @Grace</p>');
        await open(page, 'suggestions');
        await expect(suggestionsOf(page)).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(suggestionsOf(page)).toBeHidden();
        await expectFocus(page, 'Notes');
        expect(await documentHtml(page)).toBe('<p>Hi @Grace</p>');
    });

    test('SPEC-rich-text-react/AC-043 SPEC-rich-text-accessibility/AC-016 alternative text dialog: focuses its field, keeps focus until closed, Escape returns to its chrome button', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe bubble={false} blocks={[paragraph('one'), image]} />);
        await ready(page);
        await openAltText(page);

        await expectFocus(page, 'Description');
        for (let press = 0; press < 4; press += 1) {
            await page.keyboard.press('Tab');
            expect(await dialogOf(page).evaluate((dialog) => dialog.contains(document.activeElement))).toBe(true);
        }
        expect(await imageAlt(page)).toBe('');
        await dialogOf(page).getByRole('textbox', { name: 'Description' }).fill('A dog');
        await page.keyboard.press('Escape');

        await expect(dialogOf(page)).toBeHidden();
        await expectFocus(page, 'Alternative text');
        expect(await imageAlt(page)).toBe('');
    });

    test('SPEC-rich-text-react/AC-043 SPEC-rich-text-accessibility/AC-016 context menu: focuses its first item, Escape closes with focus in the surface', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe bubble={false} />);
        await ready(page);
        await surfaceOf(page).focus();
        await select(page, 'two');
        await page.keyboard.press('Shift+F10');

        await expectFocus(page, 'Duplicate');
        await page.keyboard.press('Escape');

        await expect(menuOf(page)).toBeHidden();
        await expectFocus(page, 'Notes');
        expect(await documentHtml(page)).toBe('<p>one two three</p>');
    });
});

test('SPEC-rich-text-react/AC-044 leaves focus on a host button that took it while the link popover was open', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');

    await page.getByRole('button', { name: 'After' }).focus();

    await expect(popoverOf(page)).toBeHidden();
    // Radix returns focus in a timeout after the content unmounts.
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
    expect(await focusedName(page)).toBe('After');
});

test('SPEC-rich-text-react/AC-046 keeps the link popover and the mention list usable inside a host dialog', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe within="dialog" bubble={false} texts={['one two three', 'Hi @']} />);
    await ready(page);
    const host = page.getByRole('dialog', { name: 'Host dialog' });
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');
    await page.keyboard.type('/typed');
    await popoverOf(page).getByRole('button', { name: 'Apply' }).click();
    await expect(popoverOf(page)).toBeHidden();

    await page.evaluate(() => window.overlayProbe?.select({ text: 'Hi @', from: 4 }));
    await open(page, 'suggestions');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(suggestionsOf(page)).toBeHidden();
    await open(page, 'suggestions');
    await page.getByRole('option', { name: 'Linus' }).click();

    await expect(suggestionsOf(page)).toBeHidden();
    await expect(host).toBeVisible();
    expect(await documentHtml(page)).toBe(
        '<p>one <a href="https://example.com/fixture">two</a> three</p><p>Hi @GraceLinus</p>',
    );
});

test('SPEC-rich-text-react/AC-046 leaves the host dialog open when Escape or a click outside closes an editor overlay inside it', async ({
    mount,
    page,
}) => {
    await mount(
        <OverlayProbe within="dialog" bubble={false} blocks={[paragraph('one two three'), paragraph('Hi @'), image]} />,
    );
    await ready(page);
    const host = page.getByRole('dialog', { name: 'Host dialog' });
    const hostChanges = () => page.evaluate(() => window.overlayProbe?.hostDialogChanges);
    // The corner of the host dialog is outside every editor overlay and inside the host.
    const clickHostCorner = async () => {
        const box = await boxOf(host);
        await page.mouse.click(box.left + 6, box.top + 6);
    };
    const overlays = [
        {
            name: 'popover',
            overlay: popoverOf(page),
            show: async () => {
                await surfaceOf(page).focus();
                await select(page, 'two');
                await open(page, 'link');
                await expectFocus(page, 'URL');
            },
        },
        {
            name: 'list',
            overlay: suggestionsOf(page),
            show: async () => {
                await surfaceOf(page).focus();
                await page.evaluate(() => window.overlayProbe?.select({ text: 'Hi @', from: 4 }));
                await open(page, 'suggestions');
            },
        },
        {
            name: 'menu',
            overlay: menuOf(page),
            show: async () => {
                await surfaceOf(page).focus();
                await select(page, 'two');
                await page.keyboard.press('Shift+F10');
                await expectFocus(page, 'Duplicate');
            },
        },
        { name: 'alt-text dialog', overlay: dialogOf(page), show: () => openAltText(page) },
    ];

    for (const { name, overlay, show } of overlays) {
        await show();
        await expect(overlay, `${name} opens`).toBeVisible();
        await frames(page);
        await page.keyboard.press('Escape');
        await expect(overlay, `${name} closes on Escape`).toBeHidden();
        await frames(page);
        await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
        expect(await hostChanges(), `${name} Escape`).toEqual([]);
        await expect(host).toBeVisible();

        await show();
        await expect(overlay, `${name} opens again`).toBeVisible();
        await frames(page);
        await clickHostCorner();
        await expect(overlay, `${name} closes on a click outside`).toBeHidden();
        await frames(page);
        expect(await hostChanges(), `${name} click outside`).toEqual([]);
        await expect(host).toBeVisible();
    }
});

for (const kind of ['bubble', 'link', 'suggestions', 'menu'] as const) {
    test(`SPEC-rich-text-react/AC-063 keeps the ${kind} overlay on its anchor and inside the viewport while its container scrolls and the viewport resizes`, async ({
        mount,
        page,
    }) => {
        await page.setViewportSize({ width: 800, height: 600 });
        await mount(<OverlayProbe bubble={kind === 'bubble'} texts={lines(30)} scrollHeight={200} spacer="45vh" />);
        await ready(page);
        await surfaceOf(page).focus();
        await select(page, 'Line 2');
        const overlay = {
            bubble: bubbleOf(page),
            link: popoverOf(page),
            suggestions: suggestionsOf(page),
            menu: menuOf(page),
        }[kind];
        if (kind !== 'bubble') {
            await open(page, kind);
        }
        await expect(overlay).toBeVisible();
        const placements: { touches: boolean; inside: boolean }[] = [];
        const measure = async () => {
            // Floating UI places the overlay in the next frame.
            await page.evaluate(
                () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
            );
            const anchor = await textBox(page, 'Line 2');
            const box = await boxOf(overlay);
            const viewport = page.viewportSize() ?? { width: 0, height: 0 };
            placements.push({
                touches: Math.abs(box.bottom - anchor.top) <= 16 || Math.abs(box.top - anchor.bottom) <= 16,
                inside: box.top >= 0 && box.left >= 0 && box.bottom <= viewport.height && box.right <= viewport.width,
            });
        };

        await measure();
        await page.locator('[data-scroller]').evaluate((scroller) => scroller.scrollTo({ top: 60 }));
        await measure();
        const beforeResize = await textBox(page, 'Line 2');
        await page.setViewportSize({ width: 640, height: 500 });
        await measure();
        const afterResize = await textBox(page, 'Line 2');
        // Text above the anchor wraps to more lines, which pushes the anchor down while the overlay is open.
        await page.evaluate(() => window.overlayProbe?.insert('wrapping words '.repeat(30), 1));
        await measure();
        const afterEdit = await textBox(page, 'Line 2');

        expect(afterResize.top).not.toBe(beforeResize.top);
        expect(afterEdit.top).toBeGreaterThan(afterResize.top);
        expect(placements).toEqual(Array.from({ length: 4 }, () => ({ touches: true, inside: true })));
    });
}

test('SPEC-rich-text-react/AC-064 hides the bubble toolbar and the mention list while the selection is scrolled out of its container, keeping the active option', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe texts={lines(40)} scrollHeight={200} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'Line 3');
    await open(page, 'suggestions');
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('option', { name: 'Grace' })).toHaveAttribute('aria-selected', 'true');
    const scrollTo = (top: number) =>
        page.locator('[data-scroller]').evaluate((scroller, value) => scroller.scrollTo({ top: value }), top);

    // A scroll that clips only part of the selection keeps both overlays.
    const scroller = page.locator('[data-scroller]');
    const anchor = await textBox(page, 'Line 3');
    const scrollerBox = await boxOf(scroller);
    const current = await scroller.evaluate((element) => element.scrollTop);
    await scrollTo(current + (anchor.top - scrollerBox.top) + 8);
    const clipped = await textBox(page, 'Line 3');
    expect(clipped.top).toBeLessThan(scrollerBox.top);
    expect(clipped.bottom).toBeGreaterThan(scrollerBox.top);
    await frames(page);
    await expect(bubbleOf(page)).toBeVisible();
    await expect(suggestionsOf(page)).toBeVisible();
    await scrollTo(current);

    await scrollTo(600);
    await expect(bubbleOf(page)).toBeHidden();
    await expect(suggestionsOf(page)).toBeHidden();
    await scrollTo(0);

    await expect(bubbleOf(page)).toBeVisible();
    await expect(suggestionsOf(page)).toBeVisible();
    await expect(page.getByRole('option', { name: 'Grace' })).toHaveAttribute('aria-selected', 'true');
});

test('SPEC-rich-text-react/AC-064 SPEC-rich-text-accessibility/AC-041 keeps focus in the link field of a popover that its container scrolled out of view and back', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} texts={lines(40)} scrollHeight={200} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'Line 3');
    await open(page, 'link');
    await expectFocus(page, 'URL');
    const scrollTo = (top: number) =>
        page.locator('[data-scroller]').evaluate((scroller, value) => scroller.scrollTo({ top: value }), top);

    await scrollTo(600);
    await expect(popoverOf(page)).toBeHidden();
    await scrollTo(0);

    await expect(popoverOf(page)).toBeVisible();
    await expectFocus(page, 'URL');
});

test('SPEC-rich-text-accessibility/AC-041 moves the held bubble toolbar by the scroll of its container', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe texts={lines(40)} scrollHeight={200} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'Line 3');
    await expect(bubbleOf(page)).toBeVisible();
    await frames(page);
    await bubbleOf(page).hover({ position: { x: 8, y: 4 } });
    const start = await boxOf(bubbleOf(page));

    await page.locator('[data-scroller]').evaluate((scroller) => scroller.scrollBy({ top: 20 }));
    await frames(page);

    await expect(bubbleOf(page)).toBeVisible();
    const end = await boxOf(bubbleOf(page));
    expect(end.top).toBeCloseTo(start.top - 20, 0);
});

test('SPEC-rich-text-react/AC-068 keeps the node chrome of an image, a table and a code block out of the Tab order', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe blocks={[paragraph('one'), image, table, codeBlock]} />);
    await ready(page);
    await expect(page.getByRole('toolbar', { name: 'Image' })).toBeAttached();
    await expect(page.getByRole('toolbar', { name: 'Table' })).toBeAttached();
    await expect(page.getByRole('toolbar', { name: 'plain' })).toBeAttached();
    await surfaceOf(page).focus();
    // A visited Radix Toolbar item becomes its tab stop, so each chrome is entered and left first.
    for (const [target, name] of [
        [{ nodeId: 'image-1' }, 'Alternative text'],
        [{ text: 'cell' }, 'Table'],
        [{ text: 'code' }, 'plain'],
    ] as const) {
        await page.evaluate((selection) => window.overlayProbe?.select(selection), target);
        await page.keyboard.press('Alt+F10');
        await expectFocus(page, name);
        await page.keyboard.press('Escape');
        await expectFocus(page, 'Notes');
    }

    await page.keyboard.press('Tab');
    await expectFocus(page, 'After');
    await surfaceOf(page).focus();
    await page.keyboard.press('Shift+Tab');
    await expectFocus(page, 'Bold');
});

for (const within of ['shadow', 'iframe'] as const) {
    test(`SPEC-rich-text-react/AC-077 SPEC-rich-text-react/AC-047 keeps every overlay open while focus moves between the surface, toolbars and overlays in ${within === 'shadow' ? 'a shadow root' : 'an iframe'}`, async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe within={within} />);
        let root = page.locator(':root');
        if (within === 'iframe') {
            root = page.frameLocator('iframe').locator(':root');
        }
        const surface = root.getByRole('textbox', { name: 'Notes' });
        await expect(surface).toHaveAttribute('contenteditable', 'true');
        await expect.poll(() => page.evaluate(() => window.overlayProbe !== undefined)).toBe(true);
        const bubble = root.getByRole('toolbar', { name: 'Selection formatting' });
        const popover = root.getByTestId('fixture-link-popover');

        await surface.focus();
        await select(page, 'two');
        await expect(bubble).toBeVisible();
        await open(page, 'link');
        await expect(popover).toBeVisible();
        // Radix compares `document.activeElement` to find whether its first field took focus, which a shadow root hides.
        await popover.getByRole('textbox', { name: 'URL' }).focus();
        await expectFocus(page, 'URL');
        await surface.focus();
        await page.keyboard.press('Alt+F10');
        await expectFocus(page, 'Bold');
        // Without the page's styles every fixed toolbar item may sit in More, so any of them may take focus.
        await page.keyboard.press('Alt+F10');
        await expect
            .poll(() =>
                root
                    .getByRole('toolbar', { name: 'Text formatting' })
                    .evaluate((toolbar) =>
                        toolbar.contains((toolbar.getRootNode() as Document | ShadowRoot).activeElement),
                    ),
            )
            .toBe(true);
        await popover.getByRole('textbox', { name: 'URL' }).focus();
        await expectFocus(page, 'URL');

        await expect(bubble).toBeVisible();
        await expect(popover).toBeVisible();
        const sameDocument = await surface.evaluate((element) => {
            const rootNode = element.getRootNode();
            const overlays = [
                ...(rootNode as Document | ShadowRoot).querySelectorAll(
                    '[data-test-id="fixture-link-popover"], [data-rte-bubble-toolbar]',
                ),
            ];
            return overlays.map(
                (overlay) => overlay.ownerDocument === element.ownerDocument && overlay.getRootNode() === rootNode,
            );
        });
        expect(sameDocument).toEqual([true, true]);
    });
}

for (const within of ['shadow', 'iframe'] as const) {
    test(`SPEC-rich-text-react/AC-045 SPEC-rich-text-react/AC-077 renders the tooltip, the More menu, the menu and the alternative text dialog into the editor's overlay root in the same document in ${within === 'shadow' ? 'a shadow root' : 'an iframe'}`, async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe within={within} bubble={false} blocks={[paragraph('one two three'), image]} />);
        let root = page.locator(':root');
        if (within === 'iframe') {
            root = page.frameLocator('iframe').locator(':root');
        }
        const surface = root.getByRole('textbox', { name: 'Notes' });
        await expect(surface).toHaveAttribute('contenteditable', 'true');
        await expect.poll(() => page.evaluate(() => window.overlayProbe !== undefined)).toBe(true);
        const placement = (overlay: Locator) =>
            overlay.first().evaluate((element) => ({
                inOverlayRoot: element.closest('[data-rte-overlays]') !== null,
                inEditor: element.closest('[data-test-id="fondue-rich-text-editor"]') !== null,
                sameDocument: element.ownerDocument === document,
            }));
        const expected = { inOverlayRoot: true, inEditor: true, sameDocument: true };
        const toolbar = root.getByRole('toolbar', { name: 'Text formatting' });

        await surface.focus();
        await select(page, 'two');
        await toolbar.locator('[data-rte-toolbar-item]').first().hover();
        const tooltip = root.getByRole('tooltip');
        await expect(tooltip.first()).toBeAttached();
        expect(await placement(tooltip)).toEqual(expected);
        // Radix tracks a hover tooltip's pointer on the top document, so in an iframe it stays open after the pointer
        // leaves; left open it is an older layer that the menus below wait behind for Escape. Escape closes it first.
        await page.keyboard.press('Escape');
        await expect(tooltip).toHaveCount(0);

        await toolbar.locator('[data-rte-toolbar-more]').click();
        const more = root.getByRole('menu');
        await expect(more).toBeVisible();
        expect(await placement(more)).toEqual(expected);
        await page.keyboard.press('Escape');
        await expect(more).toBeHidden();

        await surface.focus();
        await select(page, 'two');
        await page.keyboard.press('Shift+F10');
        const menu = root.getByRole('menu', { name: 'Block actions' });
        await expect(menu).toBeVisible();
        expect(await placement(menu)).toEqual(expected);
        await page.keyboard.press('Escape');
        await expect(menu).toBeHidden();

        await root.getByRole('button', { name: 'Alternative text' }).click();
        const dialog = root.getByRole('dialog', { name: 'Alternative text' });
        await expect(dialog).toBeVisible();
        expect(await placement(dialog)).toEqual(expected);
    });
}

test('SPEC-rich-text-react/AC-083 focuses the surface at the mapped target when the link target was deleted while the popover was open', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');

    await page.evaluate(() => window.overlayProbe?.handle.execute('text.insert', { text: '' }));
    await page.keyboard.press('Escape');

    await expectFocus(page, 'Notes');
    expect(await summary(page)).toMatchObject({ kind: 'text', collapsed: true });
    await page.keyboard.type('X');
    expect(await documentHtml(page)).toBe('<p>one X three</p>');
});

test('SPEC-rich-text-react/AC-083 focuses the surface at the mapped target when the image whose chrome opened the dialog was deleted', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} blocks={[paragraph('one'), image, paragraph('two')]} />);
    await ready(page);
    await openAltText(page);
    await expectFocus(page, 'Description');

    await page.evaluate(() => window.overlayProbe?.remove('image-1'));

    await expect(dialogOf(page)).toBeHidden();
    await expectFocus(page, 'Notes');
    expect(await summary(page)).toMatchObject({ collapsed: true });
    await page.keyboard.type('X');
    expect(await documentHtml(page)).toMatch(/^<p>one<\/p><p>(X)?two(X)?<\/p>$|^<p>oneX<\/p><p>two<\/p>$/);
});

for (const width of [320, 1280] as const) {
    test.describe(`at ${width} CSS pixels`, () => {
        test.use({ viewport: { width, height: 600 } });

        for (const line of ['Line 1', 'Line 12'] as const) {
            test(`SPEC-rich-text-react/AC-088 places the bubble toolbar clear of a selection at ${line === 'Line 1' ? 'the top' : 'the middle'} of a scrolling editor`, async ({
                mount,
                page,
            }) => {
                await mount(<OverlayProbe texts={lines(30)} scrollHeight={300} spacer="25vh" />);
                await ready(page);
                await surfaceOf(page).focus();
                await select(page, line);
                await page.locator('[data-scroller]').evaluate(
                    (scroller, value) => {
                        scroller.scrollTo({ top: value });
                    },
                    Number(line === 'Line 12') * 150,
                );
                await expect(bubbleOf(page)).toBeVisible();
                const topsOfAnchor: number[] = [];
                const expectClear = async () => {
                    await frames(page);
                    const toolbar = await boxOf(bubbleOf(page));
                    const rects = await page.evaluate(() => {
                        const selection = window.getSelection();
                        if (selection === null || selection.rangeCount === 0) {
                            return [];
                        }
                        return [...selection.getRangeAt(0).getClientRects()].map(({ top, bottom, left, right }) => ({
                            top,
                            bottom,
                            left,
                            right,
                        }));
                    });

                    expect(rects.length).toBeGreaterThan(0);
                    const [first] = rects;
                    if (first !== undefined) {
                        topsOfAnchor.push(first.top);
                    }
                    for (const rect of rects) {
                        const overlaps =
                            rect.left < toolbar.right &&
                            rect.right > toolbar.left &&
                            rect.top < toolbar.bottom &&
                            rect.bottom > toolbar.top;
                        expect(overlaps).toBe(false);
                        // The bubble toolbar sits above the selection.
                        expect(toolbar.bottom).toBeLessThanOrEqual(rect.top);
                        // And close to it, so the toolbar follows the selection when the page moves it.
                        expect(rect.top - toolbar.bottom).toBeLessThanOrEqual(24);
                    }
                };

                await expectClear();
                await page.setViewportSize({ width, height: 520 });
                await expectClear();
                if (line === 'Line 12') {
                    // Text above the selection wraps to more lines, which pushes it down while the toolbar is open.
                    let repeat = 5;
                    if (width === 1280) {
                        repeat = 40;
                    }
                    await page.evaluate(
                        (count) => window.overlayProbe?.insert('wrapping words '.repeat(count), 1),
                        repeat,
                    );
                    await expectClear();
                    expect(topsOfAnchor[2]).toBeGreaterThan(topsOfAnchor[1] ?? 0);
                }

                expect(topsOfAnchor[1]).not.toBe(topsOfAnchor[0]);
            });
        }
    });
}

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

    test('SPEC-rich-text-react/AC-096 docks the toolbar above the on-screen keyboard inside a host dialog, whose transform moves the origin of fixed positioning', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe within="dialog" bubble={false} />);
        await ready(page);
        await surfaceOf(page).tap();

        await openKeyboard(page);

        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(350, 0);
    });

    test('SPEC-rich-text-react/AC-096 follows the visual viewport when it pans above the on-screen keyboard', async ({
        mount,
        page,
    }) => {
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

    test('SPEC-rich-text-react/AC-096 SPEC-rich-text-accessibility/AC-027 docks the toolbar with undo and redo above the on-screen keyboard, and a tap leaves focus in the surface', async ({
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

    test('SPEC-rich-text-react/AC-096 SPEC-rich-text-runtime/AC-032 ends a composition and runs Bold once tapped on the docked toolbar', async ({
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

    test('SPEC-rich-text-accessibility/AC-024 scrolls the caret clear of the docked toolbar above the on-screen keyboard', async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe bubble={false} toolbar={TOUCH_TOOLBAR} texts={lines(60)} />);
        await ready(page);
        await surfaceOf(page).tap();
        await openKeyboard(page);
        await expect.poll(() => bottomOf(toolbarOf(page))).toBeCloseTo(350, 0);
        const margin = await page.evaluate(() => window.overlayProbe?.bottomMargin());
        // A visual viewport scroll measures the keyboard again, which must keep the docked toolbar's part.
        await page.evaluate(() => window.visualViewport?.dispatchEvent(new Event('scroll')));
        expect(await page.evaluate(() => window.overlayProbe?.bottomMargin())).toBe(margin);

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

    test('SPEC-rich-text-accessibility/AC-024 drops the docked toolbar from the bottom scroll margin when bubble mode replaces it', async ({
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

    test('SPEC-rich-text-react/AC-041 gives every bubble toolbar item a 44 by 44 CSS pixel target', async ({
        mount,
        page,
    }) => {
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

    test('SPEC-rich-text-accessibility/AC-076 closes the alternative text dialog with its visible close control, with no change and focus on its chrome button', async ({
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

test('SPEC-rich-text-accessibility/AC-041 holds the bubble toolbar in place while the content next to its anchor changes under hover and focus', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();
    const settle = () =>
        page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await settle();
    const start = await boxOf(bubbleOf(page));

    await bubbleOf(page).hover();
    await page.evaluate(() => window.overlayProbe?.insert('wide words ', 1));
    await settle();
    const hovered = await boxOf(bubbleOf(page));
    await page.keyboard.press('Alt+F10');
    await expectFocus(page, 'Bold');
    await page.mouse.move(0, 0);
    await page.evaluate(() => window.overlayProbe?.insert('more ', 1));
    await settle();
    const focused = await boxOf(bubbleOf(page));
    // The first Escape closes Bold's tooltip, the second the toolbar.
    await expect(page.getByRole('tooltip')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toHaveCount(0);
    await frames(page);
    await page.keyboard.press('Escape');
    await expectFocus(page, 'Notes');
    await select(page, 'three');
    await select(page, 'two');
    await settle();
    const released = await boxOf(bubbleOf(page));

    expect([hovered.left, focused.left]).toEqual([start.left, start.left]);
    expect(released.left).toBeGreaterThan(start.left);
});

test('SPEC-rich-text-accessibility/AC-022 outlines the focused bubble toolbar item', async ({ mount, page }) => {
    await mount(<OverlayProbe />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();
    const bold = bubbleOf(page).getByRole('button', { name: 'Bold' });
    const before = await bold.evaluate((item) => getComputedStyle(item).outlineStyle);

    await page.keyboard.press('Alt+F10');
    await expectFocus(page, 'Bold');

    const outline = await bold.evaluate((item) => {
        const style = getComputedStyle(item);
        return { style: style.outlineStyle, width: Number.parseFloat(style.outlineWidth) };
    });
    expect(before).toBe('none');
    expect(outline.style).toBe('solid');
    expect(outline.width).toBeGreaterThanOrEqual(2);
});

test('SPEC-rich-text-react/AC-069 SPEC-rich-text-react/AC-034 cycles Alt+F10 through node chrome, the bubble toolbar and the fixed toolbar, then Escape keeps the selection', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe blocks={[codeBlock]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'code');
    await expect(bubbleOf(page)).toBeVisible();

    for (const [name, inBubble] of [
        ['plain', false],
        ['Bold', true],
        ['Bold', false],
        ['plain', false],
    ] as const) {
        await page.keyboard.press('Alt+F10');
        await expectFocus(page, name);
        expect(await bubbleOf(page).evaluate((bubble) => bubble.contains(document.activeElement))).toBe(inBubble);
    }
    // The bubble toolbar's layer takes Escape again once the fixed toolbar's tooltip has closed.
    await expect(page.getByRole('tooltip')).toHaveCount(0);
    await frames(page);
    await page.keyboard.press('Escape');

    await expectFocus(page, 'Notes');
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('code');
});

test('SPEC-rich-text-react/AC-079 walks node chrome, the bubble toolbar and the fixed toolbar with the presentation toolbarShortcut', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe blocks={[codeBlock]} toolbarShortcut="Mod-Alt-t" />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'code');
    await expect(bubbleOf(page)).toBeVisible();
    await expect(bubbleOf(page)).toHaveAttribute('aria-keyshortcuts', /^(Control|Meta)\+Alt\+T$/);

    for (const name of ['plain', 'Bold', 'Bold', 'plain']) {
        await page.keyboard.press('ControlOrMeta+Alt+t');
        await expectFocus(page, name);
    }
});

test('SPEC-rich-text-react/AC-034 opens the bubble toolbar at the caret in bubble mode and moves focus to it', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe defaultToolbarMode="bubble" />);
    await ready(page);
    await expect(toolbarOf(page)).toHaveCount(0);
    await surfaceOf(page).focus();
    await page.keyboard.press('End');
    await expect(bubbleOf(page)).toBeHidden();

    await page.keyboard.press('Alt+F10');

    await expect(bubbleOf(page)).toBeVisible();
    await expectFocus(page, 'Bold');
});

test('SPEC-rich-text-react/AC-036 returns focus to the surface with the link applied from the link popover', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');

    await popoverOf(page).getByRole('button', { name: 'Apply' }).click();

    await expect(popoverOf(page)).toBeHidden();
    await expectFocus(page, 'Notes');
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('two');
    expect(await documentHtml(page)).toBe('<p>one <a href="https://example.com/fixture">two</a> three</p>');
});

test('SPEC-rich-text-accessibility/AC-014 closes the bubble toolbar on Escape without moving focus, and keeps it while hovered or focused until both leave', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();
    await frames(page);
    await page.keyboard.press('Escape');
    await expect(bubbleOf(page)).toBeHidden();
    await expectFocus(page, 'Notes');

    await select(page, 'three');
    await expect(bubbleOf(page)).toBeVisible();
    await bubbleOf(page).hover();
    await page.evaluate(() => window.overlayProbe?.select({ text: 'three', from: 5, to: 5 }));
    await frames(page);
    const whileHovered = await bubbleOf(page).isVisible();
    await page.mouse.move(0, 0);
    await expect(bubbleOf(page)).toBeHidden();

    await select(page, 'one');
    await page.keyboard.press('Alt+F10');
    await expectFocus(page, 'Bold');
    await page.evaluate(() => window.overlayProbe?.select({ text: 'one', from: 0, to: 0 }));
    await frames(page);
    const whileFocused = await bubbleOf(page).isVisible();
    await page.getByRole('button', { name: 'After' }).focus();

    await expect(bubbleOf(page)).toBeHidden();
    expect([whileHovered, whileFocused]).toEqual([true, true]);
});

test('SPEC-rich-text-accessibility/AC-014 keeps a toolbar tooltip open while the pointer is over it, until the pointer leaves', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} />);
    await ready(page);
    const bold = toolbarOf(page).getByRole('button', { name: 'Bold' });
    await bold.hover();
    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toBeVisible();

    const box = await boxOf(tooltip);
    await page.mouse.move((box.left + box.right) / 2, (box.top + box.bottom) / 2, { steps: 8 });
    await page.waitForTimeout(400);
    const whileOver = await tooltip.isVisible();
    await page.mouse.move(0, 400, { steps: 4 });

    await expect(tooltip).toBeHidden();
    expect(whileOver).toBe(true);
});

// Sampled as soon as each part shows, inside the 150 ms a Fondue transition would run.
const running = (page: Page) =>
    page.evaluate(() =>
        document
            .getAnimations()
            .filter((animation) => animation.playState === 'running')
            .map((animation) => animation.constructor.name),
    );

/** Opens the toolbars, overlays and node chrome in turn, and returns the animations running as each one showed. */
const sampleMotion = async (page: Page, reducedMotion: 'reduce' | 'no-preference') => {
    const seen: Record<string, string[]> = {};
    await page.emulateMedia({ reducedMotion });
    await surfaceOf(page).focus();
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();
    seen['bubble toolbar'] = await running(page);
    await page.keyboard.press('Alt+F10');
    await expect(page.getByRole('tooltip')).toBeVisible();
    seen.tooltip = await running(page);
    await page.keyboard.press('Escape');
    await frames(page);
    await page.keyboard.press('Escape');
    await expect(bubbleOf(page)).toBeHidden();
    await toolbarOf(page).getByRole('button', { name: 'Bold', exact: true }).hover();
    seen['hovered item'] = await running(page);
    await toolbarOf(page).getByRole('button', { name: 'Bold', exact: true }).click();
    await expect(toolbarOf(page).getByRole('button', { name: 'Bold', exact: true })).toHaveAttribute(
        'aria-pressed',
        'true',
    );
    seen['pressed item'] = await running(page);
    await toolbarOf(page).getByRole('button', { name: 'More' }).click();
    await expect(page.getByRole('menu')).toBeVisible();
    seen['More menu'] = await running(page);
    await page.keyboard.press('Escape');
    for (const [kind, testId] of [
        ['link', 'fixture-link-popover'],
        ['suggestions', 'fixture-suggestions'],
        ['menu', 'fixture-menu'],
    ] as const) {
        await surfaceOf(page).focus();
        await select(page, 'two');
        await open(page, kind);
        await expect(page.getByTestId(testId)).toBeVisible();
        seen[kind] = await running(page);
        await page.keyboard.press('Escape');
    }
    await surfaceOf(page).focus();
    await select(page, 'two');
    await page.keyboard.press('Shift+F10');
    await expect(menuOf(page)).toBeVisible();
    seen['block actions menu'] = await running(page);
    await page.keyboard.press('Escape');
    await openAltText(page);
    seen['node chrome and dialog'] = await running(page);
    return seen;
};

test('SPEC-rich-text-react/AC-055 runs no animation while the toolbars, overlays and node chrome open', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe blocks={[paragraph('one two three'), image]} />);
    await ready(page);

    const seen = await sampleMotion(page, 'reduce');

    expect(Object.keys(seen)).toHaveLength(10);
    expect(seen).toEqual(Object.fromEntries(Object.keys(seen).map((part) => [part, []])));
});

// Nothing in the package or in Fondue's chrome starts a transition or animation when it opens, so the control is a probe element
// whose transition only the no-preference query allows; it shows the sampler sees motion that the preference lets run.
const probeMotion = (page: Page) =>
    page.evaluate(async () => {
        const style = document.createElement('style');
        style.textContent =
            '@media (prefers-reduced-motion: no-preference) { [data-motion-probe] { transition: margin-inline-start 2s; } } [data-motion-probe][data-moved] { margin-inline-start: 40px; }';
        const probe = document.createElement('div');
        probe.setAttribute('data-motion-probe', '');
        document.body.append(style, probe);
        // Reading the style commits the start value, so the next change runs as a transition.
        probe.getBoundingClientRect();
        probe.setAttribute('data-moved', '');
        await new Promise((resolve) => requestAnimationFrame(resolve));
    });

for (const [reducedMotion, expected] of [
    ['no-preference', ['CSSTransition']],
    ['reduce', []],
] as const) {
    test(`SPEC-rich-text-react/AC-055 samples ${expected.length} running transitions of a probe with reduced motion ${reducedMotion}`, async ({
        mount,
        page,
    }) => {
        await mount(<OverlayProbe blocks={[paragraph('one two three'), image]} />);
        await ready(page);
        await page.emulateMedia({ reducedMotion });

        await probeMotion(page);

        expect(await running(page)).toEqual(expected);
    });
}

test('SPEC-rich-text-react/AC-033 moves through the bubble toolbar in visual order under an rtl theme', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe dir="rtl" />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();

    await expect(bubbleOf(page)).toHaveAttribute('dir', 'rtl');
    await page.keyboard.press('Alt+F10');
    await expectFocus(page, 'Bold');
    // Italic sits to the left of Bold under rtl.
    await page.keyboard.press('ArrowLeft');
    await expectFocus(page, 'Italic');
});

for (const [where, blocks, name] of [
    ['the toolbar', undefined, 'Bold'],
    ['node chrome', [paragraph('one'), codeBlock], 'plain'],
] as const) {
    test(`SPEC-rich-text-react/AC-035 SPEC-rich-text-react/AC-046 returns to the surface on Escape from ${where} inside a host dialog, which stays open`, async ({
        mount,
        page,
    }) => {
        let probe = <OverlayProbe within="dialog" bubble={false} />;
        if (blocks !== undefined) {
            probe = <OverlayProbe within="dialog" bubble={false} blocks={blocks} />;
        }
        await mount(probe);
        await ready(page);
        await surfaceOf(page).focus();
        if (blocks !== undefined) {
            await select(page, 'code');
        }
        await page.keyboard.press('Alt+F10');
        await expectFocus(page, name);
        if (blocks === undefined) {
            // The first Escape closes the tooltip that focus opened, once Radix has made its layer the highest.
            await expect(page.getByRole('tooltip')).toBeVisible();
            await frames(page);
            await page.keyboard.press('Escape');
            await expect(page.getByRole('tooltip')).toHaveCount(0);
            await frames(page);
        }

        await page.keyboard.press('Escape');

        await expectFocus(page, 'Notes');
        expect(await page.evaluate(() => window.overlayProbe?.hostDialogChanges)).toEqual([]);
    });
}

test('SPEC-rich-text-react/AC-083 returns focus to the opener after a rerender gave the open overlay a new onOpenChange', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} />);
    await ready(page);
    const opener = page.getByRole('button', { name: 'Open link' });
    await opener.focus();
    await page.keyboard.press('Enter');
    await expectFocus(page, 'URL');
    await page.evaluate(() => window.overlayProbe?.rerender());

    await page.keyboard.press('Escape');

    await expect(popoverOf(page)).toBeHidden();
    await expectFocus(page, 'Open link');
});
