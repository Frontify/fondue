/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { toolbarOf } from './fixtures/layout';
import {
    codeBlock,
    surfaceOf,
    itemOf,
    ready,
    select,
    focusedName,
    expectFocus,
    menuRows,
    documentHtml,
    contrast,
    boxOf,
    outlineOf,
    shotAround,
    barOf,
    computedColor,
    linked,
    session,
    frames,
} from './fixtures/toolbarHarness';
import { ToolbarProbe } from './fixtures/ToolbarProbe';

test.describe('at 320 CSS pixels', () => {
    test.use({ viewport: { width: 320, height: 640 } });

    test('moves the items that do not fit into More, with no horizontal scrolling and every command reachable', async ({
        mount,
        page,
    }) => {
        await mount(<ToolbarProbe wide />);
        await ready(page);
        const visible = await toolbarOf(page)
            .getByRole('button')
            .evaluateAll((buttons) => buttons.map((button) => button.getAttribute('aria-label')));
        const scrolls = await page.evaluate(() => ({
            page: document.documentElement.scrollWidth > document.documentElement.clientWidth,
            toolbar: (() => {
                const toolbar = document.querySelector('[role="toolbar"]');

                return toolbar !== null && toolbar.scrollWidth > toolbar.clientWidth;
            })(),
        }));

        await itemOf(page, 'More').click();
        // More loads its rows on first use.
        await expect(page.getByRole('menu')).toBeVisible();
        const rows = await menuRows(page).allInnerTexts();
        const reachable = [...visible.filter((name) => name !== 'More'), ...rows.map((row) => row.split('\n')[0])];

        expect(visible).toContain('More');
        expect(scrolls).toEqual({ page: false, toolbar: false });
        expect(reachable).toEqual([
            'Bold',
            'Italic',
            'Link',
            'List',
            ...[1, 2, 3, 4, 5, 6].map((level) => `Heading ${level}`),
            // The labelled key routes of `core` that only More holds.
            'Move up',
            'Move down',
            // The shipped `link.edit`, which opens the link popover; the probe's toolbar shows the link stand-in instead.
            'Link',
        ]);
    });

    test('starts the name of every More row with its visible text', async ({ mount, page }) => {
        await mount(<ToolbarProbe wide />);
        await ready(page);
        await itemOf(page, 'More').click();
        // More loads its rows on first use.
        await expect(page.getByRole('menu')).toBeVisible();
        const rows = await menuRows(page).evaluateAll((items) =>
            items.map((item) => {
                // The shortcut and the hidden reason of an unavailable row follow the label.
                const label = [...item.childNodes]
                    .filter(
                        (node) =>
                            !(node instanceof HTMLElement && (node.tagName === 'KBD' || node.ariaHidden === 'true')),
                    )
                    .map((node) => node.textContent ?? '')
                    .join('')
                    .trim();

                return { label, starts: (item.textContent ?? '').trim().startsWith(label) && label !== '' };
            }),
        );
        const names = await menuRows(page).evaluateAll((items) => items.length);

        expect(rows.every(({ starts }) => starts)).toBe(true);
        expect(names).toBeGreaterThan(0);
        for (const [index, { label }] of rows.entries()) {
            await expect(menuRows(page).filter({ hasText: label })).toHaveCount(1);
            await expect(menuRows(page).nth(index)).toHaveAccessibleName(
                new RegExp(`^${label.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)}`),
            );
        }
    });
});

test('sticks to the top of its scrolling container while the document scrolls', async ({ mount, page }) => {
    const texts = Array.from({ length: 40 }, (_, index) => `Line ${index + 1}`);
    await mount(<ToolbarProbe texts={texts} scrollHeight={240} />);
    await ready(page);
    const scroller = page.locator('[data-scroller]');
    const top = async () => {
        const [toolbar, container] = await Promise.all([boxOf(toolbarOf(page)), boxOf(scroller)]);

        return Math.round(toolbar.y - container.y);
    };

    const offsets = [await top()];
    for (const scrollTop of [200, 600]) {
        await scroller.evaluate((element, value) => element.scrollTo({ top: value }), scrollTop);
        offsets.push(await top());
    }

    expect(offsets).toEqual([0, 0, 0]);
});

test('names every item as its tooltip label, from the one registry label', async ({ mount, page }) => {
    await mount(<ToolbarProbe />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.press('Alt+F10');
    for (const name of ['Bold', 'Italic', 'Link', 'List']) {
        await expectFocus(page, name);
        await expect(page.locator('[data-rte-tooltip-label]').first()).toHaveText(name);
        await page.keyboard.press('ArrowRight');
    }
});

test('shows a pressed toggle by shape, which a grayscale screenshot still tells apart', async ({
    mount,
    page,
}, testInfo) => {
    await mount(<ToolbarProbe />);
    await ready(page);
    await page.addStyleTag({ content: 'html { filter: grayscale(1); }' });
    await surfaceOf(page).focus();
    await select(page, 'two');
    const before = await itemOf(page, 'Bold').screenshot();
    const shapeBefore = await itemOf(page, 'Bold').evaluate((item) => getComputedStyle(item).borderBlockEndWidth);
    await page.evaluate(() => window.toolbarEditor?.handle.execute('mark.bold.toggle'));
    await expect(itemOf(page, 'Bold')).toHaveAttribute('aria-pressed', 'true');
    await page.mouse.move(0, 0);
    const pressed = await itemOf(page, 'Bold').screenshot();
    const shapePressed = await itemOf(page, 'Bold').evaluate((item) => getComputedStyle(item).borderBlockEndWidth);
    await testInfo.attach('pressed bold in grayscale', { body: pressed, contentType: 'image/png' });

    expect(Number.parseFloat(shapeBefore)).toBe(0);
    expect(Number.parseFloat(shapePressed)).toBeGreaterThan(0);
    expect(pressed.equals(before)).toBe(false);
});

test('shows half bold text as mixed with a dashed bar, not the solid one of pressed', async ({ mount, page }) => {
    const halfBold = {
        type: 'paragraph',
        attrs: { lang: null },
        content: [
            { type: 'text', text: 'half ' },
            { type: 'text', text: 'bold', marks: [{ type: 'bold', attrs: {} }] },
        ],
    };
    await mount(<ToolbarProbe blocks={[halfBold as never]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'half bold');
    const barStyle = () => itemOf(page, 'Bold').evaluate((item) => getComputedStyle(item).borderBlockEndStyle);

    await expect(itemOf(page, 'Bold')).toHaveAttribute('aria-pressed', 'mixed');
    expect(await barStyle()).toBe('dashed');
    await select(page, 'bold');
    await expect(itemOf(page, 'Bold')).toHaveAttribute('aria-pressed', 'true');
    expect(await barStyle()).toBe('solid');
});

test('does not run Bold when the pointer leaves it before release', async ({ mount, page }) => {
    await mount(<ToolbarProbe />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    const box = await boxOf(itemOf(page, 'Bold'));

    await page.mouse.move(box.x + 4, box.y + 4);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();

    expect(await documentHtml(page)).toBe('<p>one two three</p>');
});

for (const theme of ['light', 'dark'] as const) {
    test(`outlines the focused surface and items by 2 px at 3:1 in the ${theme} theme`, async ({ mount, page }) => {
        await mount(<ToolbarProbe theme={theme} />);
        await ready(page);
        await page.getByRole('button', { name: 'Before' }).focus();
        const outlines: Awaited<ReturnType<typeof outlineOf>>[] = [];
        const changed: boolean[] = [];

        await page.keyboard.press('Tab');
        for (const name of ['Bold', 'Italic', 'Link', 'List']) {
            const unfocused = await itemOf(page, name).evaluate((item) => getComputedStyle(item).outlineStyle);
            if (name !== 'Bold') {
                await page.keyboard.press('ArrowRight');
            }

            await expectFocus(page, name);
            outlines.push(await outlineOf(itemOf(page, name)));
            changed.push(unfocused === 'none' || name === 'Bold');
        }

        await page.keyboard.press('Tab');
        await expectFocus(page, 'Notes');
        outlines.push(await outlineOf(surfaceOf(page)));

        expect(changed.every(Boolean)).toBe(true);
        for (const outline of outlines) {
            expect(outline.style).toBe('solid');
            expect(outline.width).toBeGreaterThanOrEqual(2);
            expect(contrast(outline.color, outline.background)).toBeGreaterThanOrEqual(3);
        }
    });
}

for (const [width, size] of [
    ['auto', {}],
    ['100', { width: 100 }],
] as const) {
    test(`keeps the 2 px outline of every item, More included, inside the toolbar box at width ${width}`, async ({
        mount,
        page,
    }) => {
        await mount(<ToolbarProbe {...size} />);
        await ready(page);
        const toolbar = await boxOf(toolbarOf(page));
        const items = toolbarOf(page).getByRole('button');
        const count = await items.count();

        expect(count).toBeGreaterThan(0);
        for (let index = 0; index < count; index += 1) {
            const box = await boxOf(items.nth(index));
            expect(box.x - 4).toBeGreaterThanOrEqual(toolbar.x);
            expect(box.y - 4).toBeGreaterThanOrEqual(toolbar.y);
            expect(box.x + box.width + 4).toBeLessThanOrEqual(toolbar.x + toolbar.width);
            expect(box.y + box.height + 4).toBeLessThanOrEqual(toolbar.y + toolbar.height);
        }
    });
}

test('keeps the focus outlines in forced colours', async ({ mount, page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await mount(<ToolbarProbe />);
    await ready(page);
    await page.getByRole('button', { name: 'Before' }).focus();
    await page.keyboard.press('Tab');
    const item = await outlineOf(itemOf(page, 'Bold'));
    await page.keyboard.press('Tab');
    const surface = await outlineOf(surfaceOf(page));

    expect([item.style, surface.style]).toEqual(['solid', 'solid']);
    expect(Math.min(item.width, surface.width)).toBeGreaterThanOrEqual(2);
});

for (const forcedColors of ['none', 'active'] as const) {
    test(`keeps the selection visible while focus is in the toolbar, forced colours ${forcedColors}`, async ({
        mount,
        page,
    }, testInfo) => {
        await page.emulateMedia({ forcedColors });
        await mount(<ToolbarProbe />);
        await ready(page);
        await surfaceOf(page).focus();
        await select(page, 'two');

        await page.keyboard.press('Alt+F10');
        const decoration = surfaceOf(page).locator('[data-rte-selection]');
        await expect(decoration).toHaveText('two');
        const shown = await decoration.evaluate((element) => {
            const style = getComputedStyle(element);

            return style.backgroundColor !== 'rgba(0, 0, 0, 0)' || style.outlineStyle === 'solid';
        });
        await testInfo.attach('selection with focus in the toolbar', {
            body: await surfaceOf(page).screenshot(),
            contentType: 'image/png',
        });
        await page.keyboard.press('Escape');
        await page.keyboard.press('Escape');

        expect(shown).toBe(true);
        await expect(decoration).toHaveCount(0);
    });
}

test('prints no toolbar', async ({ mount, page }) => {
    await mount(<ToolbarProbe />);
    await ready(page);
    await expect(toolbarOf(page)).toBeVisible();
    await page.emulateMedia({ media: 'print' });

    await expect(toolbarOf(page)).toBeHidden();
    await expect(surfaceOf(page)).toBeVisible();
});

test('ends a composition and runs Bold when its toolbar item is clicked', async ({ mount, page, browserName }) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only');
    await mount(<ToolbarProbe texts={['one ']} />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.press('End');
    const client = await page.context().newCDPSession(page);
    await client.send('Input.imeSetComposition', { text: 'two', selectionStart: 3, selectionEnd: 3 });

    await itemOf(page, 'Bold').click();
    await expect(itemOf(page, 'Bold')).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.type('x');

    await expect.poll(() => documentHtml(page)).toBe('<p>one two<strong>x</strong></p>');
    const composing = await page.evaluate(() => window.toolbarEditor?.handle.getSnapshot().compositionActive);
    expect(composing).toBe(false);
});

test('clears the live region in one record and adds each message in the next', async ({ mount, page }) => {
    await mount(<ToolbarProbe announce="Saved" />);
    await ready(page);
    const region = page.getByTestId('fondue-rich-text-editor-announcer');
    await page.evaluate(() => {
        const target = document.querySelector('[data-test-id="fondue-rich-text-editor-announcer"]');
        const seen: { removed: number; added: (string | null)[] }[] = [];
        new MutationObserver((records) => {
            for (const record of records) {
                seen.push({
                    removed: record.removedNodes.length,
                    added: [...record.addedNodes].map((node) => node.textContent),
                });
            }
        }).observe(target as Element, { childList: true });
        (window as unknown as { announced: typeof seen }).announced = seen;
    });

    for (let press = 0; press < 3; press += 1) {
        await page.locator('[data-announce]').click();
    }

    await expect(region).toHaveText('Saved');
    expect(await page.evaluate(() => (window as unknown as { announced: unknown }).announced)).toEqual([
        { removed: 0, added: ['Saved'] },
        { removed: 1, added: [] },
        { removed: 0, added: ['Saved\u00A0'] },
        { removed: 1, added: [] },
        { removed: 0, added: ['Saved'] },
    ]);
});

test.describe('from 1000 to 320 CSS pixels', () => {
    test.use({ viewport: { width: 1000, height: 640 } });

    test('moves focus to More when a refit moves the focused item into it', async ({ mount, page }) => {
        await mount(<ToolbarProbe wide />);
        await ready(page);
        await surfaceOf(page).focus();
        await page.keyboard.press('Alt+F10');
        await expectFocus(page, 'Bold');
        await page.keyboard.press('End');
        await expectFocus(page, 'More');
        await page.keyboard.press('ArrowLeft');
        await expectFocus(page, 'Heading 6');

        await page.setViewportSize({ width: 320, height: 640 });

        await expectFocus(page, 'More');
    });

    test('shows every item again, with only More for the mode switch, when the toolbar widens again', async ({
        mount,
        page,
    }) => {
        await mount(<ToolbarProbe wide />);
        await ready(page);
        const names = () =>
            toolbarOf(page)
                .getByRole('button')
                .evaluateAll((buttons) => buttons.map((button) => button.getAttribute('aria-label')));
        const wideNames = await names();

        await page.setViewportSize({ width: 320, height: 640 });
        // More shows at every width, so the narrow names are read once the refit moved the last heading into it.
        await expect(itemOf(page, 'Heading 6')).toHaveCount(0);
        const narrowNames = await names();
        await page.setViewportSize({ width: 1000, height: 640 });

        await expect(itemOf(page, 'Heading 6')).toBeVisible();
        expect(await names()).toEqual(wideNames);
        expect(wideNames.at(-1)).toBe('More');
        expect(wideNames).toContain('Heading 6');
        expect(narrowNames).not.toContain('Heading 6');
    });
});

test.describe('from 320 to 1000 CSS pixels', () => {
    test.use({ viewport: { width: 320, height: 640 } });

    test('keeps focus on More through a widening refit, and moves it to a toolbar item when the refit empties the menu row that held it', async ({
        mount,
        page,
    }) => {
        await mount(<ToolbarProbe wide />);
        await ready(page);
        await surfaceOf(page).focus();
        await page.keyboard.press('Alt+F10');
        await expectFocus(page, 'Bold');
        await page.keyboard.press('End');
        await expectFocus(page, 'More');
        await page.setViewportSize({ width: 1000, height: 640 });
        await expect(itemOf(page, 'Heading 6')).toBeVisible();
        const onMore = await focusedName(page);
        await page.setViewportSize({ width: 320, height: 640 });
        await expect(itemOf(page, 'Heading 6')).toHaveCount(0);
        await page.keyboard.press('Enter');
        await expect(menuRows(page).first()).toBeFocused();

        await page.setViewportSize({ width: 1000, height: 640 });

        await expect
            .poll(() => page.evaluate(() => document.activeElement?.hasAttribute('data-rte-toolbar-item')))
            .toBe(true);
        expect(onMore).toBe('More');
    });
});

test('keeps focus rings, text selection and pressed toggles visible in forced colours', async ({
    mount,
    page,
}, testInfo) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await mount(<ToolbarProbe blocks={[linked]} />);
    await ready(page);
    const shots: Record<string, readonly [Buffer, Buffer]> = {};

    await page.getByRole('button', { name: 'Before' }).focus();
    const unfocused = await shotAround(page, itemOf(page, 'Bold'));
    await page.keyboard.press('Tab');
    await expectFocus(page, 'Bold');
    shots['focus ring'] = [unfocused, await shotAround(page, itemOf(page, 'Bold'))];
    // Forced colours drops a box-shadow, so only a real outline is a ring that stays.
    expect(await outlineOf(itemOf(page, 'Bold'))).toMatchObject({ style: 'solid', width: 2 });

    await surfaceOf(page).focus();
    await select(page, 'one');
    await page.mouse.move(0, 0);
    const plain = await surfaceOf(page).screenshot();
    const unpressed = await barOf(page, itemOf(page, 'Bold'));
    await select(page, 'two');
    shots['text selection'] = [plain, await surfaceOf(page).screenshot()];
    await page.evaluate(() => window.toolbarEditor?.handle.execute('mark.bold.toggle'));
    await expect(itemOf(page, 'Bold')).toHaveAttribute('aria-pressed', 'true');
    shots['pressed toggle'] = [unpressed, await barOf(page, itemOf(page, 'Bold'))];

    for (const [part, [before, after]] of Object.entries(shots)) {
        await testInfo.attach(`${part} in forced colours`, { body: after, contentType: 'image/png' });
        expect(after.equals(before), part).toBe(false);
    }
});

test('draws the surface focus ring in forced colours', async ({ mount, page }, testInfo) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await mount(<ToolbarProbe />);
    await ready(page);

    await page.getByRole('button', { name: 'Before' }).focus();
    const unfocused = await shotAround(page, surfaceOf(page));
    await surfaceOf(page).focus();
    await expect(surfaceOf(page)).toBeFocused();
    await page.mouse.move(0, 0);
    const focused = await shotAround(page, surfaceOf(page));
    await testInfo.attach('focused surface in forced colours', { body: focused, contentType: 'image/png' });

    expect(await outlineOf(surfaceOf(page))).toMatchObject({ style: 'solid', width: 2 });
    expect(focused.equals(unfocused)).toBe(false);
});

test('draws links in the LinkText system colour in forced colours', async ({ mount, page, browserName }, testInfo) => {
    test.skip(
        browserName === 'webkit',
        'WebKit has no forced colours mode: its emulation matches the query and keeps author colours',
    );
    await page.emulateMedia({ forcedColors: 'active' });
    await mount(<ToolbarProbe blocks={[linked]} />);
    await ready(page);
    const link = surfaceOf(page).getByRole('link', { name: 'guide' });
    await testInfo.attach('link in forced colours', {
        body: await surfaceOf(page).screenshot(),
        contentType: 'image/png',
    });

    const color = await link.evaluate((element) => getComputedStyle(element).color);
    expect(color).toBe(await computedColor(page, 'LinkText'));
    expect(color).not.toBe(await surfaceOf(page).evaluate((surface) => getComputedStyle(surface).color));
});

test('keeps the document through zoom, text size, theme, forced colours and reduced motion changes', async ({
    mount,
    page,
}) => {
    const editor = await mount(<ToolbarProbe />);
    await ready(page);
    const before = { session: await session(page), html: await documentHtml(page) };
    const changes: Record<string, () => Promise<unknown>> = {
        zoom: () => page.evaluate(() => (document.documentElement.style.zoom = '4')),
        'text size': () => page.evaluate(() => (document.documentElement.style.fontSize = '32px')),
        theme: () => editor.update(<ToolbarProbe theme="dark" />),
        'forced colours': () => page.emulateMedia({ forcedColors: 'active' }),
        'reduced motion': () => page.emulateMedia({ reducedMotion: 'reduce' }),
    };
    const seen: Record<string, unknown> = {};

    for (const [change, apply] of Object.entries(changes)) {
        await apply();
        await frames(page);
        seen[change] = { session: await session(page), html: await documentHtml(page) };
    }

    expect(seen).toEqual(Object.fromEntries(Object.keys(changes).map((change) => [change, before])));
    expect(before.session.sameView).toBe(true);
});

test('follows a theme switch in the toolbar without a transaction or a new view', async ({ mount, page }) => {
    const editor = await mount(<ToolbarProbe />);
    await ready(page);
    const shown = async () => ({
        toolbar: await toolbarOf(page).evaluate((toolbar) => getComputedStyle(toolbar).backgroundColor),
        item: await itemOf(page, 'Bold').evaluate((item) => getComputedStyle(item).color),
        surface: await surfaceOf(page).evaluate((surface) => {
            const style = getComputedStyle(surface);

            return { background: style.backgroundColor, color: style.color };
        }),
        tokens: {
            toolbar: await computedColor(page, 'var(--color-surface-default)'),
            item: await computedColor(page, 'var(--color-primary-default)'),
        },
    });
    const before = { session: await session(page), shown: await shown() };

    await editor.update(<ToolbarProbe theme="dark" />);
    await expect
        .poll(() => toolbarOf(page).evaluate((toolbar) => getComputedStyle(toolbar).backgroundColor))
        .not.toBe(before.shown.toolbar);
    const after = { session: await session(page), shown: await shown() };

    for (const { shown: colors } of [before, after]) {
        expect({ toolbar: colors.toolbar, item: colors.item }).toEqual(colors.tokens);
    }

    // The surface draws the surface token behind the primary text token, in each theme.
    for (const { shown: colors } of [before, after]) {
        expect(colors.surface).toEqual({ background: colors.tokens.toolbar, color: colors.tokens.item });
    }

    expect(after.shown.surface.background).not.toBe(before.shown.surface.background);
    expect(after.shown.surface.color).not.toBe(before.shown.surface.color);
    expect(after.shown.item).not.toBe(before.shown.item);
    expect(after.session).toEqual(before.session);
    expect(after.session.sameView).toBe(true);
});

test('mirrors a nested list and a quote under rtl, the selected item frame included', async ({
    mount,
    page,
}, testInfo) => {
    const item = (text: string, ...nested: readonly object[]) => ({
        type: 'list_item',
        attrs: {},
        content: [{ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] }, ...nested],
    });
    const list = (...items: readonly object[]) => ({ type: 'bullet_list', attrs: {}, content: items });
    const quote = { type: 'toggled_block', attrs: {}, content: [{ type: 'text', text: 'ציטוט' }] };
    const blocks = [list(item('אחת', list(item('שתיים'))), item('שלוש')), quote] as never[];
    const sides = async () =>
        surfaceOf(page)
            .locator('li li')
            .evaluate((nested) => {
                const parent = nested.parentElement?.closest('li');
                const outer = parent?.getBoundingClientRect();
                const inner = nested.getBoundingClientRect();
                // A selected list item draws its frame from `::after`, which the class shows.
                nested.classList.add('ProseMirror-selectednode');
                const frame = getComputedStyle(nested, '::after');
                const insets = { left: Number.parseFloat(frame.left), right: Number.parseFloat(frame.right) };
                nested.classList.remove('ProseMirror-selectednode');
                if (outer === undefined) {
                    throw new Error('no parent item');
                }

                return {
                    insets,
                    // How far the nested item sits in from the parent's left and right edges.
                    gaps: { left: inner.left - outer.left, right: outer.right - inner.right },
                };
            });
    const rendered = async (dir: 'ltr' | 'rtl') => {
        const editor = await mount(<ToolbarProbe blocks={blocks} dir={dir} />);
        await ready(page);
        const found = await sides();
        await editor.unmount();

        return found;
    };

    const ltr = await rendered('ltr');
    const rtl = await rendered('rtl');
    await mount(<ToolbarProbe blocks={blocks} dir="rtl" />);
    await ready(page);
    await testInfo.attach('nested list and quote under rtl', {
        body: await surfaceOf(page).screenshot(),
        contentType: 'image/png',
    });

    // The indent and the selected frame swap sides between the two directions, by the same distance.
    expect(ltr.gaps.left).toBeGreaterThan(0);
    expect(ltr.gaps.right).toBeCloseTo(0, 0);
    expect(rtl.gaps.right).toBeCloseTo(ltr.gaps.left, 0);
    expect(rtl.gaps.left).toBeCloseTo(0, 0);
    expect(ltr.insets.left).not.toBe(ltr.insets.right);
    expect(rtl.insets).toEqual({ left: ltr.insets.right, right: ltr.insets.left });
    await expect(surfaceOf(page).locator('blockquote')).toHaveCSS('direction', 'rtl');
});

for (const forcedColors of ['none', 'active'] as const) {
    test(`shows a pressed node chrome button with the toolbar's bar, forced colours ${forcedColors}`, async ({
        mount,
        page,
    }, testInfo) => {
        await page.emulateMedia({ forcedColors });
        await mount(<ToolbarProbe blocks={[codeBlock('let a')]} />);
        await ready(page);
        const button = surfaceOf(page).locator('[data-rte-chrome] button');
        await expect(button).toHaveAttribute('aria-pressed', 'false');
        const unpressed = await barOf(page, button);

        await button.click();
        await expect(button).toHaveAttribute('aria-pressed', 'true');
        await page.mouse.move(0, 0);
        await surfaceOf(page).focus();
        const pressed = await barOf(page, button);
        await testInfo.attach(`pressed node chrome button, forced colours ${forcedColors}`, {
            body: pressed,
            contentType: 'image/png',
        });

        await expect(button).toHaveCSS('border-block-end-style', 'solid');
        await expect(button).toHaveCSS('border-block-end-width', '2px');
        expect(pressed.equals(unpressed)).toBe(false);
    });
}
