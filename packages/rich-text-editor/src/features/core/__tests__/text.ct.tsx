/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { TextProbe } from '#/react/__tests__/fixtures/TextProbe';

import { cspViolationsOf } from '../../../../playwright/csp';

import graphemes from './fixtures/graphemes.json' with { type: 'json' };

test.afterEach(async ({ page }) => {
    // Quality AC-032: no paste or render path needs inline script, `eval` or a foreign origin.
    expect(await cspViolationsOf(page)).toEqual([]);
});

type TextRte = NonNullable<Window['textRte']>;

const surfaceOf = (page: Page, name = 'Notes') => page.getByRole('textbox', { name });
const ready = (page: Page) =>
    expect(page.locator('[data-test-id="fondue-rich-text-editor"]').first()).not.toHaveAttribute('aria-busy');
const isApple = (page: Page) => page.evaluate(() => /Mac|iP(hone|[oa]d)/.test(navigator.platform));
// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const focusSurface = async (page: Page) => {
    await surfaceOf(page).focus();
    await settleFocus(page);
};
const changesOf = (page: Page) => page.evaluate(() => [...(window.textRte as TextRte).changes]);
const textOf = (page: Page) => page.evaluate(() => (window.textRte as TextRte).text());
const select = (page: Page, text: string, from = 0, to = text.length) =>
    page.evaluate(
        ([value, start, end]) => {
            const rte = window.textRte as TextRte;
            rte.setSelection(rte.handle, { text: value, from: start, to: end });
        },
        [text, from, to] as const,
    );

test('selects the whole document with Mod+A when it starts with a node view @engine', async ({ mount, page }) => {
    await mount(<TextProbe texts={['After the code']} nodeViewFirst />);
    await ready(page);
    await focusSurface(page);
    await select(page, 'After the code', 3, 3);

    await page.keyboard.press('ControlOrMeta+a');
    const kind = await page.evaluate(() => (window.textRte as TextRte).handle.getSummary().selection.kind);
    await page.keyboard.type('x');

    expect(kind).toBe('all');
    await expect.poll(() => textOf(page)).toBe('x');
});

test('inserts German and Polish AltGr characters with no command running @engine', async ({ mount, page }) => {
    await mount(<TextProbe texts={['ab']} />);
    await ready(page);
    await focusSurface(page);
    await select(page, 'ab', 1, 1);
    // Each character, the physical key that types it with AltGr, and that key's legacy `keyCode`.
    const characters = [
        ['{', 'Digit7', 55],
        ['[', 'Digit8', 56],
        [']', 'Digit9', 57],
        ['}', 'Digit0', 48],
        ['²', 'Digit2', 50],
        ['³', 'Digit3', 51],
        ['ą', 'KeyA', 65],
        ['ł', 'KeyL', 76],
    ] as const;
    const prevented: boolean[] = [];
    for (const asCtrlAlt of [false, true]) {
        for (const [key, code, keyCode] of characters) {
            prevented.push(
                await page.evaluate(
                    ([character, physical, legacy, ctrlAlt]) => {
                        const surface = document.activeElement as HTMLElement;
                        const event = new KeyboardEvent('keydown', {
                            key: character,
                            code: physical,
                            ctrlKey: ctrlAlt,
                            altKey: ctrlAlt,
                            bubbles: true,
                            cancelable: true,
                        });
                        // Chromium and WebKit take no `keyCode` or AltGraph state in the event init.
                        Object.defineProperty(event, 'keyCode', { get: () => legacy });
                        Object.defineProperty(event, 'getModifierState', {
                            value: (name: string) => name === 'AltGraph' && !ctrlAlt,
                        });
                        surface.dispatchEvent(event);
                        return event.defaultPrevented;
                    },
                    [key, code, keyCode, asCtrlAlt] as const,
                ),
            );
            // The browser inserts the character of a keydown that no handler prevented.
            await page.keyboard.insertText(key);
        }
    }

    expect(prevented.filter(Boolean)).toEqual([]);
    expect(await textOf(page)).toBe('a{[]}²³ął{[]}²³ąłb');
    const changes = await changesOf(page);
    expect(changes.filter((change) => !change.startsWith('input'))).toEqual([]);
});

/** Dispatches a keydown at the focused surface, with the legacy `keyCode` and AltGraph state that no event init takes. */
const dispatchKey = (
    page: Page,
    init: { key: string; code: string; keyCode: number; ctrl?: boolean; meta?: boolean; alt?: boolean; graph: boolean },
) =>
    page.evaluate((pressed) => {
        const surface = document.activeElement as HTMLElement;
        const event = new KeyboardEvent('keydown', {
            key: pressed.key,
            code: pressed.code,
            ctrlKey: pressed.ctrl === true,
            metaKey: pressed.meta === true,
            altKey: pressed.alt === true,
            bubbles: true,
            cancelable: true,
        });
        Object.defineProperty(event, 'keyCode', { get: () => pressed.keyCode });
        Object.defineProperty(event, 'getModifierState', {
            value: (name: string) => name === 'AltGraph' && pressed.graph,
        });
        surface.dispatchEvent(event);
        return event.defaultPrevented;
    }, init);

test('runs the Meta and Alt shortcut of a key that reports AltGraph, as Firefox on macOS does @engine', async ({
    mount,
    page,
}) => {
    test.skip(!(await isApple(page)), 'Meta and Alt is the shortcut of Apple platforms.');
    await mount(<TextProbe texts={['ab']} />);
    await ready(page);
    await focusSurface(page);
    await select(page, 'ab', 1, 1);

    // Option+1 types `¡` on a Mac layout, which only AltGraph without ⌘ would hand to the browser.
    const prevented = await dispatchKey(page, {
        key: '¡',
        code: 'Digit1',
        keyCode: 49,
        meta: true,
        alt: true,
        graph: true,
    });

    expect(prevented).toBe(true);
    expect(await changesOf(page)).toEqual(['command heading.set']);
    await expect(surfaceOf(page).locator('h1')).toHaveText('ab');
});

test('runs a Ctrl and Alt binding of a digit key that types its own digit @engine', async ({ mount, page }) => {
    await mount(<TextProbe texts={['ab']} />);
    await ready(page);
    await focusSurface(page);
    await select(page, 'ab');

    const prevented = await dispatchKey(page, {
        key: '7',
        code: 'Digit7',
        keyCode: 55,
        ctrl: true,
        alt: true,
        graph: false,
    });

    expect(prevented).toBe(true);
    expect(await changesOf(page)).toEqual(['command fixture.alt-graph.run']);
    await expect(surfaceOf(page).locator('strong')).toHaveText('ab');
});

test('leaves the German backslash of AltGr to the browser, with no command running @engine', async ({
    mount,
    page,
}) => {
    await mount(<TextProbe texts={['ab']} />);
    await ready(page);
    await focusSurface(page);
    await select(page, 'ab', 1, 1);

    const prevented = [
        await dispatchKey(page, { key: '\\', code: 'Backslash', keyCode: 220, graph: true }),
        await dispatchKey(page, { key: '\\', code: 'Backslash', keyCode: 220, ctrl: true, alt: true, graph: false }),
    ];
    await page.keyboard.insertText('\\');

    expect(prevented).toEqual([false, false]);
    expect(await textOf(page)).toBe('a\\b');
    const changes = await changesOf(page);
    expect(changes.filter((change) => !change.startsWith('input'))).toEqual([]);
});

test('runs no key handler, keymap or toolbar shortcut for a keydown of a composition @engine', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only.');
    await mount(<TextProbe texts={['one', 'two']} />);
    await ready(page);
    await focusSurface(page);
    await select(page, 'two');
    const apple = await isApple(page);
    // Enter, Backspace, Tab, Escape, the toolbar shortcut and each Shortcuts table row of the delivered features.
    const mod = { meta: apple, ctrl: !apple };
    const keys: readonly {
        readonly key: string;
        readonly meta?: boolean;
        readonly ctrl?: boolean;
        readonly alt?: boolean;
        readonly shift?: boolean;
    }[] = [
        { key: 'Enter' },
        { key: 'Enter', shift: true },
        { key: 'Enter', ...mod },
        { key: 'Backspace' },
        { key: 'Tab' },
        { key: 'Escape' },
        { key: 'F10', alt: true },
        { key: 'a', ...mod },
        { key: 'z', ...mod },
        { key: 'z', shift: true, ...mod },
        { key: 'y', ctrl: true },
        ...['b', 'i', 'u', 'e', ',', '.'].map((key) => ({ key, ...mod })),
        { key: 'x', shift: true, ...mod },
        ...['0', '1', '2', '3', '4', '5', '6'].map((key) => ({ key, ...mod, alt: apple, shift: !apple })),
        { key: 'ArrowUp', alt: true, ...mod },
        { key: 'ArrowDown', alt: true, ...mod },
    ];
    // A composition keydown reports itself by `isComposing` alone or by `keyCode` 229 alone, which each must be enough.
    const pressComposing = (signal: 'isComposing' | 'keyCode') =>
        page.evaluate(
            ([pressed, by]) => {
                const surface = document.activeElement as HTMLElement;
                for (const { key, meta = false, ctrl = false, alt = false, shift = false } of pressed) {
                    const init = { key, metaKey: meta, ctrlKey: ctrl, altKey: alt, shiftKey: shift };
                    const event = new KeyboardEvent('keydown', {
                        ...init,
                        isComposing: by === 'isComposing',
                        bubbles: true,
                        cancelable: true,
                    });
                    if (by === 'keyCode') {
                        // An IME's keydown carries `keyCode` 229, which Chromium takes from no event init.
                        Object.defineProperty(event, 'keyCode', { get: () => 229 });
                    }
                    surface.dispatchEvent(event);
                }
                return document.activeElement === surface;
            },
            [keys, signal] as const,
        );
    const cdp = await page.context().newCDPSession(page);

    // Chromium sends a 229 keydown before `compositionstart`, while ProseMirror still sees no composition.
    const focusedBefore = [await pressComposing('isComposing'), await pressComposing('keyCode')];
    await cdp.send('Input.imeSetComposition', { text: 'é', selectionStart: 1, selectionEnd: 1 });
    const focusedDuring = [await pressComposing('isComposing'), await pressComposing('keyCode')];
    await cdp.send('Input.insertText', { text: 'é' });
    await expect
        .poll(() => page.evaluate(() => (window.textRte as TextRte).handle.getSnapshot().compositionActive))
        .toBe(false);

    expect([...focusedBefore, ...focusedDuring]).toEqual([true, true, true, true]);
    expect(await textOf(page)).toBe('oneé');
    const changes = await changesOf(page);
    expect(changes.filter((change) => !change.startsWith('input'))).toEqual([]);
});

test('fires no rule for composed **x**, then bold for typed **y** @engine', async ({ mount, page, browserName }) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only.');
    await mount(<TextProbe texts={['ab ']} />);
    await ready(page);
    await focusSurface(page);
    await select(page, 'ab ', 3, 3);
    const cdp = await page.context().newCDPSession(page);

    await cdp.send('Input.imeSetComposition', { text: '**x*', selectionStart: 4, selectionEnd: 4 });
    await cdp.send('Input.imeSetComposition', { text: '**x**', selectionStart: 5, selectionEnd: 5 });
    await cdp.send('Input.insertText', { text: '**x**' });
    await expect
        .poll(() => page.evaluate(() => (window.textRte as TextRte).handle.getSnapshot().compositionActive))
        .toBe(false);
    const composed = await surfaceOf(page).locator('strong').count();
    await page.keyboard.type(' **y**');

    expect(composed).toBe(0);
    await expect(surfaceOf(page).locator('strong')).toHaveText(['y']);
    expect(await textOf(page)).toBe('ab **x** y');
});

for (const { name, text } of graphemes) {
    test(`removes or selects the whole ${name} grapheme cluster in one step @engine`, async ({ mount, page }) => {
        const line = `a${text}b`;
        await mount(<TextProbe texts={[line]} />);
        await ready(page);
        await focusSurface(page);

        await select(page, line, 1 + text.length, 1 + text.length);
        await page.keyboard.press('Backspace');
        const backspaced = await textOf(page);
        await page.keyboard.insertText(text);
        await select(page, line, 1, 1);
        await page.keyboard.press('Delete');
        const deleted = await textOf(page);
        await page.keyboard.insertText(text);
        await select(page, line, 1, 1);
        await page.keyboard.press('Shift+ArrowRight');
        const selected = await page.evaluate(() => window.getSelection()?.toString());

        expect([backspaced, deleted, selected]).toEqual(['ab', 'ab', text]);
    });
}

test.describe('block moves', () => {
    test('moves a paragraph with the More menu by keyboard', async ({ mount, page }) => {
        await mount(<TextProbe texts={['one', 'two', 'three']} />);
        await ready(page);
        await focusSurface(page);
        await select(page, 'two', 1, 1);

        await page.keyboard.press('Alt+F10');
        await page.keyboard.press('End');
        await expect(page.getByRole('button', { name: 'More' })).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(page.getByRole('menuitem', { name: 'Move up' })).toBeFocused();
        await page.keyboard.press('Enter');

        await expect(surfaceOf(page).locator('p')).toHaveText(['two', 'one', 'three']);
        await expect(surfaceOf(page)).toBeFocused();
        expect(await changesOf(page)).toEqual(['command block.move.up']);
    });

    test.describe('on a touch screen', () => {
        test.use({ hasTouch: true });

        test('moves a paragraph with the More menu by pointer taps', async ({ mount, page }) => {
            await mount(<TextProbe texts={['one', 'two', 'three']} />);
            await ready(page);
            await focusSurface(page);
            await select(page, 'two', 1, 1);

            await page.getByRole('button', { name: 'More' }).tap();
            await page.getByRole('menuitem', { name: 'Move down' }).tap();

            await expect(surfaceOf(page).locator('p')).toHaveText(['one', 'three', 'two']);
            expect(await changesOf(page)).toEqual(['command block.move.down']);
        });
    });
});

test('mirrors the shipped quote under rtl', async ({ mount, page }, testInfo) => {
    /** How far the quote's text sits in from the surface edge where the line starts. */
    const startGap = async (dir: 'ltr' | 'rtl') => {
        const editor = await mount(<TextProbe texts={['ציטוט קצר']} quoted dir={dir} />);
        await ready(page);
        const gap = await surfaceOf(page).evaluate((surface, rtl) => {
            const text = surface.querySelector('blockquote p')?.firstChild as Node;
            const range = document.createRange();
            range.selectNodeContents(text);
            const line = range.getBoundingClientRect();
            const box = surface.getBoundingClientRect();
            if (rtl) {
                return box.right - line.right;
            }
            return line.left - box.left;
        }, dir === 'rtl');
        const direction = await surfaceOf(page)
            .locator('blockquote')
            .evaluate((quote) => getComputedStyle(quote).direction);
        await testInfo.attach(`quote under ${dir}`, {
            body: await surfaceOf(page).screenshot(),
            contentType: 'image/png',
        });
        await editor.unmount();
        return { gap, direction };
    };
    const ltr = await startGap('ltr');
    const rtl = await startGap('rtl');

    expect([ltr.direction, rtl.direction]).toEqual(['ltr', 'rtl']);
    expect(ltr.gap).toBeGreaterThan(20);
    expect(rtl.gap).toBeCloseTo(ltr.gap, 0);
});
