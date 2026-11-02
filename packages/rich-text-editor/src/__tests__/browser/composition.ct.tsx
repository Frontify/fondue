/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { RichTextEditor } from '../../index';

// Composition (IME) is driven through the DevTools protocol, the closest
// thing to a real input method a test has: the browser fires the composition
// events itself.

/** Starts a composition showing `text`, as an IME does while the user is still choosing. */
const compose = async (page: Page, text: string): Promise<void> => {
    const client = await page.context().newCDPSession(page);
    await client.send('Input.imeSetComposition', { text, selectionStart: text.length, selectionEnd: text.length });
};

/** Commits `text`: the composition ends and the text is in the document. */
const commit = async (page: Page, text: string): Promise<void> => {
    const client = await page.context().newCDPSession(page);
    await client.send('Input.insertText', { text });
};

/** Lets timers queued by `compositionend` run first: input rules rewrite composed text from a timeout. */
const settle = (page: Page): Promise<void> => page.evaluate(() => new Promise<void>((resolve) => setTimeout(resolve)));

const keyInit = { bubbles: true, cancelable: true };

// Plain data only: the full `KeyboardEventInit` makes the page-function types too deep to resolve.
type KeyInit = Record<string, boolean | number | string>;

/** Runs in the page: a keydown on the element, and whether anything claimed it (called `preventDefault`). */
const dispatchKeydown = (element: Element, init: KeyInit): boolean => {
    const event = new KeyboardEvent('keydown', init);
    element.dispatchEvent(event);
    return event.defaultPrevented;
};

const keydown = (editable: Locator, init: KeyInit): Promise<boolean> =>
    editable.evaluate<boolean, KeyInit>(dispatchKeydown, init);

/** `Mod` as the engine reads it: Command on a Mac, Control elsewhere. */
const modifier = (page: Page): Promise<'metaKey' | 'ctrlKey'> =>
    page.evaluate(() => (/Mac|iP(hone|[oa]d)/.test(navigator.platform) ? 'metaKey' : 'ctrlKey'));

// Mobile keyboards compose ordinary typing, so the rewrites wait for the
// composition to end rather than skipping composed text.
test.describe('composed text', () => {
    test('is not rewritten while the composition is open', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await compose(page, '**bold**');
        await settle(page);

        await expect(editable).toHaveText('**bold**');
        await expect(editable.locator('strong')).toHaveCount(0);
    });

    // After a composition the last character is in the document already; typed, it is still to come.
    for (const [composed, element, marked, text] of [
        ['**bold**', 'strong', 'bold', 'bold'],
        ['https://example.com ', 'a', 'https://example.com', 'https://example.com '],
        ['- ', 'ul > li', '', ''],
    ] as const) {
        test(`"${composed}" is rewritten once the composition ends`, async ({ mount, page }) => {
            const component = await mount(<RichTextEditor />);
            const editable = component.getByRole('textbox');

            await editable.click();
            await compose(page, composed);
            await commit(page, composed);
            await settle(page);

            await expect(editable.locator(element)).toHaveText(marked);
            expect(await editable.textContent()).toBe(text);
        });
    }

    test('stays as typed after Backspace took a rewrite back and a composition ends empty', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await page.keyboard.type('**bold**');
        await page.keyboard.press('Backspace');
        await expect(editable).toHaveText('**bold**');
        await compose(page, 'x');
        await compose(page, '');
        await settle(page);

        await expect(editable).toHaveText('**bold**');
        await expect(editable.locator('strong')).toHaveCount(0);
    });

    test('still gets rewritten when typed with the keyboard', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await page.keyboard.type('**bold**');

        await expect(editable.locator('strong')).toHaveText('bold');
    });
});

test.describe('keys that belong to an input method', () => {
    test('the Enter that commits a composition does not split the block', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await compose(page, 'あ');
        await commit(page, 'あ');
        // Safari and Firefox send the Enter after `compositionend`, still marked as the input method's.
        await keydown(editable, { ...keyInit, key: 'Enter', keyCode: 229, isComposing: true });
        await keydown(editable, { ...keyInit, key: 'Enter', keyCode: 229, isComposing: false });

        await expect(editable.locator('p')).toHaveCount(1);
    });

    test('Enter that commits a composition does not split a list item', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await page.keyboard.type('- ');
        await compose(page, 'あ');
        await commit(page, 'あ');
        await keydown(editable, { ...keyInit, key: 'Enter', keyCode: 229, isComposing: true });

        await expect(editable.locator('li')).toHaveCount(1);
    });

    for (const [name, init] of [
        ['marked as composing', { isComposing: true }],
        ['reported as keyCode 229', { keyCode: 229 }],
    ] as const) {
        test(`a hotkey is not run by a key ${name}`, async ({ mount, page }) => {
            const component = await mount(<RichTextEditor />);
            const editable = component.getByRole('textbox');
            const mod = await modifier(page);

            await editable.click();
            await page.keyboard.type('text');
            await keydown(editable, { ...keyInit, key: 'b', ...init, [mod]: true });
            await page.keyboard.type('more');

            await expect(editable.locator('strong')).toHaveCount(0);
        });
    }
});

test.describe('AltGr', () => {
    // AltGr arrives as Ctrl+Alt on Windows, so `AltGr+1` ("¡") looks like the
    // Mod-Alt-1 heading hotkey; `modifierAltGraph` is what tells them apart.
    const altGrKey = { ...keyInit, key: '¡', code: 'Digit1', keyCode: 49, altKey: true };

    test('a Mod-Alt hotkey still runs (control for the AltGr case)', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');
        const mod = await modifier(page);

        await editable.click();
        await page.keyboard.type('title');
        await keydown(editable, { ...altGrKey, [mod]: true });

        await expect(editable.locator('h1')).toHaveCount(1);
    });

    test('AltGr plus a key does not run a Mod-Alt hotkey', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');
        test.skip(
            (await modifier(page)) === 'metaKey',
            'A Mac has no AltGr key, so the engine leaves Option to its hotkeys',
        );

        await editable.click();
        await page.keyboard.type('title');
        const claimed = await keydown(editable, { ...altGrKey, ctrlKey: true, modifierAltGraph: true });

        expect(claimed).toBe(false);
        await expect(editable.locator('h1')).toHaveCount(0);
    });
});
