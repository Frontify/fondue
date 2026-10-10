/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { ToolbarProbe } from '../../fixtures/editor/ToolbarProbe';

/** A code block stand-in holding `text`, whose node chrome is a toolbar. */
const codeBlock = (text: string) =>
    ({
        type: 'chrome_code',
        attrs: { nodeId: 'code-1', language: 'plain' },
        content: [{ type: 'text', text }],
    }) as never;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const toolbarOf = (page: Page) => page.getByRole('toolbar', { name: 'Text formatting' });
const itemOf = (page: Page, name: string) => toolbarOf(page).getByRole('button', { name, exact: true });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', /true|false/);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
};
const select = (page: Page, text: string) =>
    page.evaluate((target) => window.toolbarEditor?.setSelection(window.toolbarEditor.handle, { text: target }), text);
/** The accessible name of the focused element, as its `aria-label` or text. */
const focusedName = (page: Page) =>
    page.evaluate(() => {
        const active = document.activeElement;
        if (active === null) {
            return null;
        }
        return active.getAttribute('aria-label') ?? active.textContent;
    });
// Radix Toolbar moves focus in a timeout after the key, so focus is read once it settles. Tests focus the surface
// rather than click it before they select, since the click's own selection may land after theirs.
const expectFocus = (page: Page, name: string) => expect.poll(() => focusedName(page)).toBe(name);
const domSelection = (page: Page) =>
    page.evaluate(() => ({
        text: window.getSelection()?.toString(),
        inSurface: document.activeElement?.getAttribute('role') === 'textbox',
    }));
// More rows are menu items, and checkbox items for toggles, above the toolbar mode switch.
const menuRows = (page: Page) =>
    page
        .locator('[role="menuitem"], [role="menuitemcheckbox"]')
        .filter({ hasNotText: 'Show toolbar on selection only' });
const documentHtml = (page: Page) => page.evaluate(() => window.toolbarEditor?.html());

/** WCAG relative luminance of a computed `rgb()` colour. */
const luminance = (color: string) => {
    const [r = 0, g = 0, b = 0] = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
    const channel = (value: number) => {
        const scaled = value / 255;
        if (scaled <= 0.040_45) {
            return scaled / 12.92;
        }
        return ((scaled + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};
const contrast = (a: string, b: string) => {
    const lighter = Math.max(luminance(a), luminance(b));
    const darker = Math.min(luminance(a), luminance(b));
    return (lighter + 0.05) / (darker + 0.05);
};
/** The box of a rendered element, which every element these tests measure has. */
const boxOf = async (locator: Locator) => {
    const box = await locator.boundingBox();
    if (box === null) {
        throw new Error('the element is not rendered');
    }
    return box;
};
/** The focused element's outline and the colour behind it once it lost focus. */
const outlineOf = (locator: Locator) =>
    locator.evaluate((element) => {
        const style = getComputedStyle(element);
        let behind: Element | null = element.parentElement;
        let background = 'rgba(0, 0, 0, 0)';
        while (behind !== null && background === 'rgba(0, 0, 0, 0)') {
            background = getComputedStyle(behind).backgroundColor;
            behind = behind.parentElement;
        }
        return {
            width: Number.parseFloat(style.outlineWidth),
            style: style.outlineStyle,
            color: style.outlineColor,
            background,
        };
    });

test('SPEC-rich-text-react/AC-032 is one tab stop with a label, aria-controls and arrow, Home and End keys', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe />);
    await ready(page);
    const surfaceId = await surfaceOf(page).getAttribute('id');

    await expect(toolbarOf(page)).toHaveAttribute('aria-controls', surfaceId ?? 'none');
    await page.getByRole('button', { name: 'Before' }).focus();
    await page.keyboard.press('Tab');
    await expectFocus(page, 'Bold');
    for (const [key, name] of [
        ['ArrowRight', 'Italic'],
        ['ArrowRight', 'Link'],
        ['End', 'More'],
        ['Home', 'Bold'],
        ['ArrowLeft', 'More'],
    ] as const) {
        await page.keyboard.press(key);
        await expectFocus(page, name);
    }
    await page.keyboard.press('Home');
    await expectFocus(page, 'Bold');
    await page.keyboard.press('ArrowRight');
    await expectFocus(page, 'Italic');
    const tabStops = await toolbarOf(page).locator('button[tabindex="0"]').count();
    await page.keyboard.press('Tab');
    await expectFocus(page, 'Notes');
    await page.keyboard.press('Shift+Tab');

    await expectFocus(page, 'Italic');
    expect(tabStops).toBe(1);
    await expect(page.locator('[role="toolbar"] button[tabindex="0"]')).toHaveCount(1);
});

test('SPEC-rich-text-react/AC-033 moves with ArrowRight and ArrowLeft in visual order under rtl', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe dir="rtl" />);
    await ready(page);
    const bold = await boxOf(itemOf(page, 'Bold'));
    const italic = await boxOf(itemOf(page, 'Italic'));

    await page.getByRole('button', { name: 'Before' }).focus();
    await page.keyboard.press('Tab');
    await expectFocus(page, 'Bold');
    await page.keyboard.press('ArrowLeft');
    await expectFocus(page, 'Italic');
    await page.keyboard.press('ArrowRight');

    await expectFocus(page, 'Bold');
    expect(italic.x < bold.x).toBe(true);
});

test('SPEC-rich-text-react/AC-034 SPEC-rich-text-runtime/AC-059 moves focus with Alt+F10 to the first item, then to the last focused one, also when read-only', async ({
    mount,
    page,
}) => {
    for (const readOnly of [false, true]) {
        const component = await mount(<ToolbarProbe readOnly={readOnly} />);
        await ready(page);
        await surfaceOf(page).click();

        await page.keyboard.press('Alt+F10');
        await expectFocus(page, 'Bold');
        await page.keyboard.press('ArrowRight');
        await expectFocus(page, 'Italic');
        await surfaceOf(page).click();
        await page.keyboard.press('Alt+F10');

        await expectFocus(page, 'Italic');
        await component.unmount();
    }
});

test('SPEC-rich-text-react/AC-035 SPEC-rich-text-accessibility/AC-014 closes an open tooltip first, then returns to the surface with the selection', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');

    await page.keyboard.press('Alt+F10');
    await expect(page.getByRole('tooltip')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toHaveCount(0);
    const kept = await focusedName(page);
    await page.keyboard.press('Escape');

    expect(kept).toBe('Bold');
    expect(await domSelection(page)).toEqual({ text: 'two', inSurface: true });
});

test('SPEC-rich-text-react/AC-036 returns focus to the surface with the resulting selection after bold, link and list items', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe />);
    await ready(page);
    for (const name of ['Bold', 'Link', 'List']) {
        await surfaceOf(page).focus();
        await select(page, 'two');
        await itemOf(page, name).click();
        await expect.poll(() => domSelection(page)).toEqual({ text: 'two', inSurface: true });
    }

    expect(await documentHtml(page)).toBe(
        '<blockquote>one <a href="https://example.com/fixture"><strong>two</strong></a> three</blockquote>',
    );
});

test('SPEC-rich-text-react/AC-029 disables every item and keeps the toolbar out of the Tab order, with typing, paste and execute refused', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe disabled />);
    await ready(page);
    const before = await documentHtml(page);

    await expect(surfaceOf(page)).toHaveAttribute('aria-disabled', 'true');
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'false');
    for (const name of ['Bold', 'Italic', 'Link', 'List']) {
        await expect(itemOf(page, name)).toBeDisabled();
        await expect(itemOf(page, name)).toHaveAttribute('tabindex', '-1');
    }
    await expect(toolbarOf(page)).toHaveAttribute('tabindex', '-1');
    await page.getByRole('button', { name: 'Before' }).focus();
    await page.keyboard.press('Tab');
    const tabbed = await page.evaluate(() => document.activeElement?.closest('[role="toolbar"]') !== null);
    // Tab skips the disabled surface as well as its toolbar.
    await expectFocus(page, 'After');
    await surfaceOf(page).focus();
    await page.keyboard.type('x');
    await page.evaluate(() => {
        const data = new DataTransfer();
        data.setData('text/plain', 'pasted');
        document
            .querySelector('[role="textbox"]')
            ?.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
    });
    const executed = await page.evaluate(() => window.toolbarEditor?.handle.execute('mark.bold.toggle'));

    expect(tabbed).toBe(false);
    expect(executed).toEqual({ status: 'rejected', code: 'readonly' });
    expect(await documentHtml(page)).toBe(before);
});

test('SPEC-rich-text-react/AC-029 takes a read-only surface out of the Tab order when disabled turns on and back in when it turns off', async ({
    mount,
    page,
}) => {
    const component = await mount(<ToolbarProbe readOnly />);
    await ready(page);
    /** The surface's tabindex and where the first two Tab presses from the host button before the editor land. */
    const afterRender = async () => {
        const tabindex = await surfaceOf(page).getAttribute('tabindex');
        await page.getByRole('button', { name: 'Before' }).focus();
        await page.keyboard.press('Tab');
        const first = await focusedName(page);
        await page.keyboard.press('Tab');
        return { tabindex, landed: [first, await focusedName(page)] };
    };

    const enabled = await afterRender();
    await component.update(<ToolbarProbe readOnly disabled />);
    await expect(surfaceOf(page)).toHaveAttribute('aria-disabled', 'true');
    const disabled = await afterRender();
    await component.update(<ToolbarProbe readOnly />);
    await expect(surfaceOf(page)).not.toHaveAttribute('aria-disabled');
    const again = await afterRender();

    expect(enabled).toEqual({ tabindex: '0', landed: ['Bold', 'Notes'] });
    expect(disabled.tabindex).toBeNull();
    expect(disabled.landed[0]).toBe('After');
    expect(again).toEqual(enabled);
});

test('SPEC-rich-text-react/AC-031 tabs out of the surface in both directions from a paragraph and a code block', async ({
    mount,
    page,
}) => {
    const paragraph = { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'para' }] };
    await mount(<ToolbarProbe blocks={[paragraph as never, codeBlock('code')]} />);
    await ready(page);
    for (const target of ['para', 'code']) {
        for (const [key, name] of [
            ['Tab', 'After'],
            ['Shift+Tab', 'Bold'],
        ] as const) {
            await surfaceOf(page).focus();
            await select(page, target);
            await page.keyboard.press(key);
            await expectFocus(page, name);
        }
    }
});

test.describe('at 320 CSS pixels', () => {
    test.use({ viewport: { width: 320, height: 640 } });

    test('SPEC-rich-text-react/AC-040 moves the items that do not fit into More, with no horizontal scrolling and every command reachable', async ({
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
        ]);
    });

    test('SPEC-rich-text-accessibility/AC-028 starts the name of every More row with its visible text', async ({
        mount,
        page,
    }) => {
        await mount(<ToolbarProbe wide />);
        await ready(page);
        await itemOf(page, 'More').click();
        const rows = await menuRows(page).evaluateAll((items) =>
            items.map((item) => {
                const label = [...item.childNodes]
                    .filter((node) => !(node instanceof HTMLElement && node.tagName === 'KBD'))
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

test.describe('with a coarse pointer', () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });

    test('SPEC-rich-text-react/AC-040 SPEC-rich-text-react/AC-095 opens More on a tap', async ({ mount, page }) => {
        await mount(<ToolbarProbe />);
        await ready(page);

        await itemOf(page, 'More').tap();

        await expect(page.getByRole('menu')).toBeVisible();
        await expect(page.getByRole('menuitem', { name: 'Show toolbar on selection only' })).toBeVisible();
    });

    test('SPEC-rich-text-react/AC-029 opens no More on a tap in a disabled editor', async ({ mount, page }) => {
        await mount(<ToolbarProbe disabled />);
        await ready(page);

        await itemOf(page, 'More').tap({ force: true });
        await page.evaluate(
            () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        );

        await expect(page.getByRole('menu')).toHaveCount(0);
    });

    test('SPEC-rich-text-accessibility/AC-026 does not open More when a touch slides off it before release', async ({
        mount,
        page,
    }) => {
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

    test('SPEC-rich-text-react/AC-041 gives every toolbar item a 44 by 44 CSS pixel target', async ({
        mount,
        page,
    }) => {
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

    test('SPEC-rich-text-react/AC-041 gives every node chrome button a 44 by 44 CSS pixel target', async ({
        mount,
        page,
    }) => {
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

test('SPEC-rich-text-react/AC-069 SPEC-rich-text-react/AC-079 cycles Alt+F10 through node chrome and the toolbar, then Escape keeps the selection', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe compose blocks={[codeBlock('let code = 1')]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'code');

    for (const name of ['plain', 'Bold', 'plain']) {
        await page.keyboard.press('Alt+F10');
        await expectFocus(page, name);
    }
    await page.keyboard.press('Escape');

    await expectFocus(page, 'Notes');
    expect(await domSelection(page)).toEqual({ text: 'code', inSurface: true });
});

test('SPEC-rich-text-react/AC-103 sticks to the top of its scrolling container while the document scrolls', async ({
    mount,
    page,
}) => {
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

test('SPEC-rich-text-accessibility/AC-001 SPEC-rich-text-accessibility/AC-033 names every item as its tooltip label, from the one registry label', async ({
    mount,
    page,
}) => {
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

test('SPEC-rich-text-accessibility/AC-006 shows a pressed toggle by shape, which a grayscale screenshot still tells apart', async ({
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

test('SPEC-rich-text-accessibility/AC-006 shows half bold text as mixed with a dashed bar, not the solid one of pressed', async ({
    mount,
    page,
}) => {
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

test('SPEC-rich-text-accessibility/AC-026 does not run Bold when the pointer leaves it before release', async ({
    mount,
    page,
}) => {
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
    test(`SPEC-rich-text-accessibility/AC-022 SPEC-rich-text-accessibility/AC-023 SPEC-rich-text-accessibility/AC-082 outlines the focused surface and items by 2 px at 3:1 in the ${theme} theme`, async ({
        mount,
        page,
    }) => {
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
    test(`SPEC-rich-text-accessibility/AC-023 keeps the 2 px outline of every item, More included, inside the toolbar box at width ${width}`, async ({
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

test('SPEC-rich-text-accessibility/AC-082 keeps the focus outlines in forced colours', async ({ mount, page }) => {
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
    test(`SPEC-rich-text-accessibility/AC-067 keeps the selection visible while focus is in the toolbar, forced colours ${forcedColors}`, async ({
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

test('SPEC-rich-text-react/AC-089 prints no toolbar', async ({ mount, page }) => {
    await mount(<ToolbarProbe />);
    await ready(page);
    await expect(toolbarOf(page)).toBeVisible();
    await page.emulateMedia({ media: 'print' });

    await expect(toolbarOf(page)).toBeHidden();
    await expect(surfaceOf(page)).toBeVisible();
});

test('SPEC-rich-text-runtime/AC-032 ends a composition and runs Bold when its toolbar item is clicked', async ({
    mount,
    page,
    browserName,
}) => {
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

test.describe('on a phone with a sticky toolbar', () => {
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 700 } });

    test('SPEC-rich-text-accessibility/AC-024 scrolls the caret clear of the sticky toolbar, also once it grows and the viewport halves', async ({
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

test('SPEC-rich-text-accessibility/AC-039 clears the live region in one record and adds each message in the next', async ({
    mount,
    page,
}) => {
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

test('SPEC-rich-text-react/AC-079 walks node chrome and the toolbar with the presentation toolbarShortcut', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe compose toolbarShortcut="Mod-Alt-t" blocks={[codeBlock('let code = 1')]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'code');

    await expect(toolbarOf(page)).toHaveAttribute('aria-keyshortcuts', /^(Meta|Control)\+Alt\+T$/);
    for (const name of ['plain', 'Bold', 'plain']) {
        await page.keyboard.press('ControlOrMeta+Alt+t');
        await expectFocus(page, name);
    }
    await page.keyboard.press('Escape');

    await expectFocus(page, 'Notes');
});

/** Pretends to be a platform before the editor mounts, through both sources the toolbar reads. */
const onPlatform = (page: Page, platform: string, uaPlatform: string) =>
    page.evaluate(
        ([legacy, modern]) => {
            Object.defineProperty(navigator, 'platform', { value: legacy, configurable: true });
            Object.defineProperty(navigator, 'userAgentData', { value: { platform: modern }, configurable: true });
        },
        [platform, uaPlatform],
    );

for (const [platform, uaPlatform, shown, aria] of [
    ['MacIntel', 'macOS', ['⌘B', '⇧⌘8'], ['Meta+B', 'Meta+Shift+8']],
    ['Win32', 'Windows', ['Ctrl+B', 'Ctrl+Shift+8'], ['Control+B', 'Control+Shift+8']],
] as const) {
    test(`SPEC-rich-text-react/AC-039 shows the compiled shortcut in the tooltip and the More row on ${uaPlatform}`, async ({
        mount,
        page,
    }) => {
        await onPlatform(page, platform, uaPlatform);
        await mount(<ToolbarProbe width={140} />);
        await ready(page);
        await surfaceOf(page).focus();

        await page.keyboard.press('Alt+F10');
        await expectFocus(page, 'Bold');
        await expect(page.getByRole('tooltip').locator('kbd')).toHaveText(shown[0]);
        await expect(itemOf(page, 'Bold')).toHaveAttribute('aria-keyshortcuts', aria[0]);
        await itemOf(page, 'More').click();
        const row = page.getByRole('menuitemcheckbox', { name: 'List' });

        await expect(row.locator('kbd')).toHaveText(shown[1]);
        await expect(row).toHaveAttribute('aria-keyshortcuts', aria[1]);
    });
}

for (const [platform, uaPlatform, expected] of [
    ['MacIntel', 'macOS', 'Meta+Alt+T'],
    ['Win32', 'Windows', 'Control+Alt+T'],
] as const) {
    test(`SPEC-rich-text-react/AC-079 names the presentation toolbarShortcut as ${expected} on the toolbar on ${uaPlatform}`, async ({
        mount,
        page,
    }) => {
        await onPlatform(page, platform, uaPlatform);
        await mount(<ToolbarProbe toolbarShortcut="Mod-Alt-t" />);
        await ready(page);

        await expect(toolbarOf(page)).toHaveAttribute('aria-keyshortcuts', expected);
    });
}

/** Each item's name and icon, from the toolbar, or from the More menu when `inMore`. */
const namesAndIcons = async (page: Page, inMore: boolean) => {
    let items = toolbarOf(page).getByRole('button');
    if (inMore) {
        await itemOf(page, 'More').click();
        items = menuRows(page);
    }
    return items.evaluateAll((elements) =>
        elements
            .map((element) => {
                // A More row's shortcut is hidden from its name.
                const copy = element.cloneNode(true) as HTMLElement;
                copy.querySelector('kbd')?.remove();
                return {
                    name: element.getAttribute('aria-label') ?? copy.textContent,
                    icon: element.querySelector('svg')?.getAttribute('data-test-id'),
                };
            })
            .filter(({ name }) => name !== 'More'),
    );
};

test('SPEC-rich-text-accessibility/AC-033 shows each command with the same registry label and icon in the toolbar and in More', async ({
    mount,
    page,
}) => {
    const component = await mount(<ToolbarProbe />);
    await ready(page);
    const inToolbar = await namesAndIcons(page, false);
    await component.unmount();
    await mount(<ToolbarProbe width={60} />);
    await ready(page);
    const inMore = await namesAndIcons(page, true);

    expect(inToolbar.map(({ name }) => name)).toEqual(['Bold', 'Italic', 'Link', 'List']);
    expect(inMore).toEqual(inToolbar);
});

test('SPEC-rich-text-react/AC-094 uses the presentation controls label and icon for bold in the toolbar and in More', async ({
    mount,
    page,
}) => {
    const controls = { 'mark.bold.toggle': { labelKey: 'RichTextEditor_fixtureStrong', icon: 'IconTextFormatItalic' } };
    const component = await mount(<ToolbarProbe controls={controls} />);
    await ready(page);
    const [inToolbar, italic] = await namesAndIcons(page, false);
    await component.unmount();
    await mount(<ToolbarProbe controls={controls} width={60} />);
    await ready(page);
    const [inMore] = await namesAndIcons(page, true);

    expect(inToolbar).toEqual({ name: 'Strong', icon: italic?.icon });
    expect(inMore).toEqual(inToolbar);
});

for (const lands of ['body', 'toolbar'] as const) {
    test(`SPEC-rich-text-react/AC-036 returns focus to the surface when a click leaves focus on the ${lands}, as Firefox and Safari on macOS do`, async ({
        mount,
        page,
    }) => {
        await mount(<ToolbarProbe />);
        await ready(page);
        await surfaceOf(page).focus();
        await select(page, 'two');
        // A press that does not focus the button: focus goes to the body, or to the toolbar root after the press.
        await itemOf(page, 'Bold').evaluate((button, where) => {
            button.addEventListener('mousedown', (event) => {
                event.preventDefault();
                (document.activeElement as HTMLElement | null)?.blur();
                if (where === 'toolbar') {
                    // A mousedown on the root first, so Radix takes the focus as a click and keeps it on the root.
                    const toolbar = button.closest('[role="toolbar"]') as HTMLElement;
                    toolbar.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                    toolbar.focus();
                }
            });
        }, lands);

        await itemOf(page, 'Bold').click();

        await expect.poll(() => domSelection(page)).toEqual({ text: 'two', inSurface: true });
        await expect(surfaceOf(page).locator('strong')).toHaveText('two');
    });
}

test('SPEC-rich-text-react/AC-035 returns to the surface on Escape in node chrome away from the selection', async ({
    mount,
    page,
}) => {
    const paragraph = { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'para' }] };
    await mount(<ToolbarProbe blocks={[paragraph as never, codeBlock('code')]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'para');
    await surfaceOf(page).getByRole('button', { name: 'plain' }).focus();

    await page.keyboard.press('Escape');

    await expectFocus(page, 'Notes');
    expect(await domSelection(page)).toEqual({ text: 'para', inSurface: true });
});

test('SPEC-rich-text-react/AC-037 SPEC-rich-text-react/AC-038 shows checked toggles and keeps an unavailable row focusable with its reason in More', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe width={60} blocks={[codeBlock('code')]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'code');
    await itemOf(page, 'More').click();
    await page.keyboard.press('ArrowDown');

    const bold = page.getByRole('menuitemcheckbox', { name: 'Bold' });
    await expect(bold).toBeFocused();
    await expect(bold).toHaveAttribute('aria-disabled', 'true');
    await expect(bold).toHaveAttribute('aria-checked', 'false');
    await expect(bold).toHaveAccessibleDescription('Not available at the current selection');
    await page.keyboard.press('Enter');
    await expect(bold).toBeVisible();
});

test('SPEC-rich-text-react/AC-037 checks the toggle row of the block at the caret in More', async ({ mount, page }) => {
    const heading = { type: 'toggled_heading', attrs: { level: 6 }, content: [{ type: 'text', text: 'title' }] };
    await mount(<ToolbarProbe wide width={60} blocks={[heading as never]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'title');
    await itemOf(page, 'More').click();

    await expect(page.getByRole('menuitemcheckbox', { name: 'Heading 6' })).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByRole('menuitemcheckbox', { name: 'Heading 5' })).toHaveAttribute('aria-checked', 'false');
    const checkMark = (name: string) =>
        page.getByRole('menuitemcheckbox', { name }).locator('svg[data-test-id="fondue-icons-check-mark"]');
    await expect(checkMark('Heading 6')).toHaveCount(1);
    await expect(checkMark('Heading 5')).toHaveCount(0);
});

test('SPEC-rich-text-accessibility/AC-026 does not open More when the pointer leaves it before release', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe width={140} />);
    await ready(page);
    const box = await boxOf(itemOf(page, 'More'));

    await page.mouse.move(box.x + 4, box.y + 4);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();

    await expect(page.getByRole('menu')).toHaveCount(0);
});

test('SPEC-rich-text-react/AC-040 runs Bold on the selection from its More row and leaves focus in the surface', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe width={60} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');

    await itemOf(page, 'More').click();
    await menuRows(page).filter({ hasText: 'Bold' }).click();

    await expect.poll(() => documentHtml(page)).toContain('<strong>two</strong>');
    await expect(page.getByRole('menu')).toHaveCount(0);
    const selection = await domSelection(page);
    expect(selection.inSurface).toBe(true);
});

test('SPEC-rich-text-accessibility/AC-026 opens More with Enter after a pointer opened and Escape closed it', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe width={60} />);
    await ready(page);

    await itemOf(page, 'More').click();
    await expect(page.getByRole('menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu')).toHaveCount(0);
    await expectFocus(page, 'More');
    await page.keyboard.press('Enter');

    await expect(page.getByRole('menu')).toBeVisible();
});

test('SPEC-rich-text-accessibility/AC-024 scrolls node chrome that Alt+F10 focuses clear of the sticky toolbar', async ({
    mount,
    page,
}) => {
    const line = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });
    const lines = (from: number) => Array.from({ length: 30 }, (_, index) => line(`Line ${from + index}`));
    await mount(<ToolbarProbe blocks={[...lines(1), codeBlock('code'), ...lines(31)] as never[]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'code');
    const chrome = surfaceOf(page).getByRole('button', { name: 'plain' });
    // The chrome sits under the stuck toolbar, inside the viewport.
    await chrome.evaluate((button) => {
        const toolbar = document.querySelector('[role="toolbar"]') as HTMLElement;
        window.scrollBy(0, button.getBoundingClientRect().top - toolbar.offsetHeight / 2);
    });

    await page.keyboard.press('Alt+F10');

    await expectFocus(page, 'plain');
    const [button, toolbar] = await Promise.all([boxOf(chrome), boxOf(toolbarOf(page))]);
    expect(button.y).toBeGreaterThanOrEqual(toolbar.y + toolbar.height);
});

test.describe('from 1000 to 320 CSS pixels', () => {
    test.use({ viewport: { width: 1000, height: 640 } });

    test('SPEC-rich-text-react/AC-040 moves focus to More when a refit moves the focused item into it', async ({
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
        await page.keyboard.press('ArrowLeft');
        await expectFocus(page, 'Heading 6');

        await page.setViewportSize({ width: 320, height: 640 });

        await expectFocus(page, 'More');
    });

    test('SPEC-rich-text-react/AC-040 shows every item again, with only More for the mode switch, when the toolbar widens again', async ({
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
        // More shows at every width, so the refit is read from the last heading leaving.
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

test('SPEC-rich-text-accessibility/AC-022 SPEC-rich-text-accessibility/AC-023 outlines a focused node chrome button by 2 px at 3:1', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe blocks={[codeBlock('code')]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'code');

    await page.keyboard.press('Alt+F10');
    await expectFocus(page, 'plain');
    const outline = await outlineOf(surfaceOf(page).getByRole('button', { name: 'plain' }));

    expect(outline.style).toBe('solid');
    expect(outline.width).toBeGreaterThanOrEqual(2);
    expect(contrast(outline.color, outline.background)).toBeGreaterThanOrEqual(3);
});

test('SPEC-rich-text-react/AC-037 shows no check on a More row of a command that is no toggle, even while it is active', async ({
    mount,
    page,
}) => {
    const link = {
        type: 'link',
        attrs: { href: 'https://example.com/fixture', openInNewWindow: false, styleId: null },
    };
    const paragraph = {
        type: 'paragraph',
        attrs: { lang: null },
        content: [{ type: 'text', text: 'linked', marks: [link] }],
    };
    await mount(<ToolbarProbe width={60} blocks={[paragraph as never]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'linked');
    await itemOf(page, 'More').click();

    const row = page.getByRole('menuitem', { name: 'Link' });
    await expect(row).toBeVisible();
    await expect(row.locator('[data-test-id^="fondue-icons-check"]')).toHaveCount(0);
});

test('SPEC-rich-text-react/AC-040 opens More on a click with no pointer or key press before it, as browse mode and voice control send', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe width={60} />);
    await ready(page);

    await itemOf(page, 'More').dispatchEvent('click');

    await expect(page.getByRole('menu')).toBeVisible();
});

test.describe('from 320 to 1000 CSS pixels', () => {
    test.use({ viewport: { width: 320, height: 640 } });

    test('SPEC-rich-text-react/AC-040 keeps focus on More through a widening refit, and moves it to a toolbar item when the refit empties the menu row that held it', async ({
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
