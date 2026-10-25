/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { cspViolationsOf } from '../../../playwright/csp';

import {
    surfaceOf,
    bubbleOf,
    toolbarOf,
    popoverOf,
    suggestionsOf,
    menuOf,
    ready,
    select,
    open,
    focusedName,
    expectFocus,
    textBox,
    boxOf,
    frames,
    documentHtml,
    watchFocusOut,
    focusOuts,
    paragraph,
    image,
    codeBlock,
    lines,
    openAltText,
    shownWhole,
} from './fixtures/overlay-harness';
import { OverlayProbe, ReorderProbe } from './fixtures/OverlayProbe';

test.afterEach(async ({ page }) => {
    // Quality AC-032: no paste or render path needs inline script, `eval` or a foreign origin.
    expect(await cspViolationsOf(page)).toEqual([]);
});

test('shows the bubble toolbar for a mouse selection and leaves focus in the surface', async ({ mount, page }) => {
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

test('keeps the bubble toolbar focus ring and pressed bar visible in forced colours', async ({
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
    test(`draws the bubble toolbar on the Fondue overlay surface in the ${theme} theme`, async ({ mount, page }) => {
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

test('runs Bold from a mouse click on the bubble toolbar without the surface losing focus', async ({ mount, page }) => {
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

test('shows the bubble toolbar of an editor that a keyed list moved', async ({ mount, page }) => {
    await mount(<ReorderProbe />);
    await expect(page.getByRole('textbox', { name: 'Editor A' })).toHaveAttribute('contenteditable', 'true');
    await page.getByRole('button', { name: 'Swap' }).click();
    await expect(page.getByRole('textbox').first()).toHaveAccessibleName('Editor B');

    const word = await page.getByRole('textbox', { name: 'Editor A' }).evaluate((surface) => {
        const range = document.createRange();
        const text = surface.querySelector('p')?.firstChild;
        if (text === null || text === undefined) {
            throw new Error('No text');
        }
        range.setStart(text, 0);
        range.setEnd(text, 'alpha'.length);
        const { top, bottom, left, right } = range.getBoundingClientRect();
        return { top, bottom, left, right };
    });
    const middle = (word.top + word.bottom) / 2;
    await page.mouse.move(word.left + 1, middle);
    await page.mouse.down();
    await page.mouse.move(word.right - 1, middle, { steps: 4 });
    await page.mouse.up();

    await expect(bubbleOf(page)).toBeVisible();
    expect(await shownWhole(bubbleOf(page))).toBe(true);
});

test('shows the bubble toolbar above a native modal dialog opened after the editor mounted', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe within="modal" hostButtons={false} />);
    await page.locator('dialog').evaluate((dialog: HTMLDialogElement) => dialog.showModal());
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');

    await expect(bubbleOf(page)).toBeVisible();
    await frames(page);
    expect(await shownWhole(bubbleOf(page))).toBe(true);
});

for (const kind of ['bubble', 'link', 'suggestions', 'menu'] as const) {
    test(`keeps the ${kind} overlay on its anchor and inside the viewport while its container scrolls and the viewport resizes`, async ({
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

test('hides the bubble toolbar and the mention list while the selection is scrolled out of its container, keeping the active option', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe texts={lines(40)} scrollHeight={200} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'Line 3');
    await open(page, 'suggestions');
    await expect(suggestionsOf(page)).toBeVisible();
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

test('moves the held bubble toolbar by the scroll of its container', async ({ mount, page }) => {
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

for (const width of [320, 1280] as const) {
    test.describe(`at ${width} CSS pixels`, () => {
        test.use({ viewport: { width, height: 600 } });

        for (const line of ['Line 1', 'Line 12'] as const) {
            test(`places the bubble toolbar clear of a selection at ${line === 'Line 1' ? 'the top' : 'the middle'} of a scrolling editor`, async ({
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

test('holds the bubble toolbar in place while the content next to its anchor changes under hover and focus', async ({
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

test('outlines the focused bubble toolbar item', async ({ mount, page }) => {
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

test('cycles Alt+F10 through node chrome, the bubble toolbar and the fixed toolbar, then Escape keeps the selection', async ({
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

test('walks node chrome, the bubble toolbar and the fixed toolbar with the presentation toolbarShortcut', async ({
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

test('opens the bubble toolbar at the caret in bubble mode and moves focus to it', async ({ mount, page }) => {
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

test('closes the bubble toolbar on Escape without moving focus, and keeps it while hovered or focused until both leave', async ({
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

test('prints the text without the bubble toolbar, a suggestion list or an open popover', async ({ mount, page }) => {
    await mount(<OverlayProbe />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();
    await page.emulateMedia({ media: 'print' });
    await expect(bubbleOf(page)).toBeHidden();
    await expect(surfaceOf(page)).toBeVisible();
    await expect(surfaceOf(page)).toContainText('one two three');

    for (const [kind, overlay] of [
        ['suggestions', suggestionsOf(page)],
        ['link', popoverOf(page)],
    ] as const) {
        await page.emulateMedia({ media: 'screen' });
        await open(page, kind);
        await expect(overlay).toBeVisible();
        await page.emulateMedia({ media: 'print' });
        await expect(overlay).toBeHidden();
    }
});

test('keeps a toolbar tooltip open while the pointer is over it, until the pointer leaves', async ({ mount, page }) => {
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

test('runs no animation while the toolbars, overlays and node chrome open', async ({ mount, page }) => {
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
    test(`samples ${expected.length} running transitions of a probe with reduced motion ${reducedMotion}`, async ({
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

test('moves through the bubble toolbar in visual order under an rtl theme', async ({ mount, page }) => {
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
