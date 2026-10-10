/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { MarkedAndPlainProbe, TextProbe } from '../../../fixtures/editor/TextProbe';
import graphemes from '../../../fixtures/text/graphemes.json' with { type: 'json' };

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

test('SPEC-rich-text-editing/AC-001 moves, selects and deletes across marks, links and blocks as in the same plain text', async ({
    mount,
    page,
}) => {
    const lines = ['Read *the* whole _guide_ before [you] start.', 'A *second* line with [more] text.'];
    const apple = await isApple(page);
    let word = 'Control';
    let line = 'Home';
    if (apple) {
        word = 'Alt';
        line = 'Control+a';
    }
    // Each case: the block and offset the caret starts at, then the keys pressed.
    const cases: readonly (readonly [number, number, readonly string[]])[] = [
        [0, 3, ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft']],
        [0, 3, ['Shift+ArrowRight', 'Shift+ArrowRight', 'Shift+ArrowRight', 'Shift+ArrowRight']],
        [0, 0, [`${word}+ArrowRight`, `${word}+ArrowRight`, `${word}+ArrowRight`, `${word}+ArrowRight`]],
        [0, 30, [`Shift+${word}+ArrowLeft`, `Shift+${word}+ArrowLeft`]],
        [0, 12, [line]],
        [0, 12, ['ArrowDown']],
        [1, 0, ['ArrowLeft', 'ArrowLeft']],
        [1, 0, ['Backspace']],
        [0, 38, ['Delete']],
        [0, 21, [`${word}+Backspace`]],
        [0, 17, ['Backspace', 'Backspace', 'Delete', 'Delete']],
        [1, 2, ['Shift+ArrowDown', 'Shift+End']],
        [1, 2, ['Shift+ControlOrMeta+ArrowUp']],
        [1, 2, ['Shift+ControlOrMeta+ArrowDown']],
    ];
    /** The DOM selection in the editor named `name` as block and offset, then the text of each block. */
    const stateOf = (name: string) =>
        page.evaluate((label) => {
            const surface = document.querySelector(`[aria-label="${label}"][contenteditable]`) as HTMLElement;
            const pointOf = (node: Node | null, offset: number) => {
                const block = [...surface.children].findIndex((child) => node !== null && child.contains(node));
                const range = document.createRange();
                range.setStart(surface.children[block] as Node, 0);
                range.setEnd(node as Node, offset);
                return [block, range.toString().length];
            };
            const selection = window.getSelection() as Selection;
            return {
                anchor: pointOf(selection.anchorNode, selection.anchorOffset),
                focus: pointOf(selection.focusNode, selection.focusOffset),
                blocks: [...surface.children].map((child) => child.textContent),
            };
        }, name);
    /** Focuses the editor named `name` and puts the caret at `offset` characters into its block `block`. */
    const caretAt = (name: 'Marked' | 'Plain', block: number, offset: number) =>
        page.evaluate(
            ([label, index, at, text]) => {
                const surface = document.querySelector(`[aria-label="${label}"][contenteditable]`) as HTMLElement;
                surface.focus();
                if (label === 'Marked') {
                    const probe = window.markedAndPlain as NonNullable<Window['markedAndPlain']>;
                    probe.setSelection(probe.Marked, { text, from: at, to: at });
                    return;
                }
                const line = surface.children[index]?.firstChild as Node;
                window.getSelection()?.collapse(line, at);
            },
            [name, block, offset, (lines[block] ?? '').replaceAll(/[*_[\]]/g, '')] as const,
        );
    const results: Record<string, unknown[]> = { Marked: [], Plain: [] };
    for (const [block, offset, keys] of cases) {
        for (const name of ['Marked', 'Plain'] as const) {
            const component = await mount(<MarkedAndPlainProbe lines={lines} />);
            await ready(page);
            await caretAt(name, block, offset);
            await settleFocus(page);
            for (const key of keys) {
                await page.keyboard.press(key);
            }
            results[name]?.push(await stateOf(name));
            await component.unmount();
        }
    }

    expect(results.Marked).toEqual(results.Plain);
});

test('SPEC-rich-text-editing/AC-001 selects the whole document with Mod+A when it starts with a node view', async ({
    mount,
    page,
}) => {
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

test('SPEC-rich-text-editing/AC-003 inserts German and Polish AltGr characters with no command running', async ({
    mount,
    page,
}) => {
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

test('SPEC-rich-text-editing/AC-003 runs the Meta and Alt shortcut of a key that reports AltGraph, as Firefox on macOS does', async ({
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

test('SPEC-rich-text-editing/AC-003 runs a Ctrl and Alt binding of a digit key that types its own digit', async ({
    mount,
    page,
}) => {
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

test('SPEC-rich-text-editing/AC-003 leaves the German backslash of AltGr to the browser, with no command running', async ({
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

test('SPEC-rich-text-editing/AC-074 runs no key handler, keymap or toolbar shortcut for a keydown of a composition', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only (SPEC-rich-text-quality/AC-012).');
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

test('SPEC-rich-text-editing/AC-038 fires no rule for composed **x**, then bold for typed **y**', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only (SPEC-rich-text-quality/AC-012).');
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
    test(`SPEC-rich-text-editing/AC-046 removes or selects the whole ${name} grapheme cluster in one step`, async ({
        mount,
        page,
    }) => {
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
    test('SPEC-rich-text-editing/AC-069 moves a paragraph with the More menu by keyboard', async ({ mount, page }) => {
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

        test('SPEC-rich-text-editing/AC-069 moves a paragraph with the More menu by pointer taps', async ({
            mount,
            page,
        }) => {
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

test('SPEC-rich-text-react/AC-104 mirrors the shipped quote under rtl', async ({ mount, page }, testInfo) => {
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
