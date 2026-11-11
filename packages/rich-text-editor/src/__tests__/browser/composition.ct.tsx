/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { RichTextEditor } from '../../index';

// Composition (IME) is driven through the DevTools protocol, the closest
// thing to a real input method a test has: the browser fires the composition
// events itself.

// The DevTools protocol is Chromium's: playwright.config.ts leaves tests with this tag out of the other engines.
const NEEDS_DEVTOOLS_PROTOCOL = { tag: '@devtools-protocol' };

/** Starts a composition showing `text`, as an IME does while the user is still choosing. */
const compose = async (page: Page, text: string): Promise<void> => {
    const client = await page.context().newCDPSession(page);
    await client.send('Input.imeSetComposition', { text, selectionStart: text.length, selectionEnd: text.length });
};

/** Lets the rewrite `compositionend` queues run first, so a test can see that nothing changed. */
const settle = (page: Page): Promise<void> => page.evaluate(() => new Promise<void>((resolve) => setTimeout(resolve)));

/** `Mod` as the engine reads it: Command on a Mac, Control elsewhere. */
const modifier = (page: Page): Promise<'metaKey' | 'ctrlKey'> =>
    page.evaluate(() => (/Mac|iP(hone|[oa]d)/.test(navigator.platform) ? 'metaKey' : 'ctrlKey'));

// Mobile keyboards compose ordinary typing, so the rewrites wait for the
// composition to end rather than skipping composed text.
test.describe('composed text', () => {
    test('is not rewritten while the composition is open', NEEDS_DEVTOOLS_PROTOCOL, async ({ mount, page }) => {
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
        test(
            `"${composed}" is rewritten once the composition ends`,
            NEEDS_DEVTOOLS_PROTOCOL,
            async ({ mount, page }) => {
                const component = await mount(<RichTextEditor />);
                const editable = component.getByRole('textbox');

                await editable.click();
                await compose(page, composed);
                await page.keyboard.insertText(composed);

                await expect(editable.locator(element)).toHaveText(marked);
                expect(await editable.textContent()).toBe(text);
            },
        );
    }

    test(
        'stays as typed after Backspace took a rewrite back and a composition ends empty',
        NEEDS_DEVTOOLS_PROTOCOL,
        async ({ mount, page }) => {
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
        },
    );

    test('still gets rewritten when typed with the keyboard', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await page.keyboard.type('**bold**');

        await expect(editable.locator('strong')).toHaveText('bold');
    });
});

test.describe('keys that belong to an input method', () => {
    test(
        'the Enter that commits a composition does not split the block',
        NEEDS_DEVTOOLS_PROTOCOL,
        async ({ mount, page }) => {
            const component = await mount(<RichTextEditor />);
            const editable = component.getByRole('textbox');

            await editable.click();
            await compose(page, 'あ');
            await page.keyboard.insertText('あ');
            // Safari and Firefox send the Enter after `compositionend`, still marked as the input method's.
            await editable.dispatchEvent('keydown', { key: 'Enter', keyCode: 229, isComposing: true });
            await editable.dispatchEvent('keydown', { key: 'Enter', keyCode: 229, isComposing: false });

            await expect(editable.locator('p')).toHaveCount(1);
        },
    );

    test(
        'Enter that commits a composition does not split a list item',
        NEEDS_DEVTOOLS_PROTOCOL,
        async ({ mount, page }) => {
            const component = await mount(<RichTextEditor />);
            const editable = component.getByRole('textbox');

            await editable.click();
            await page.keyboard.type('- ');
            await compose(page, 'あ');
            await page.keyboard.insertText('あ');
            await editable.dispatchEvent('keydown', { key: 'Enter', keyCode: 229, isComposing: true });

            await expect(editable.locator('li')).toHaveCount(1);
        },
    );

    // Without the DevTools protocol there is no composition, but the Enter keydowns are the same.
    test("an Enter marked as the input method's does not split the block", async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await page.keyboard.insertText('あ');
        await editable.dispatchEvent('keydown', { key: 'Enter', keyCode: 229, isComposing: true });
        await editable.dispatchEvent('keydown', { key: 'Enter', keyCode: 229, isComposing: false });

        await expect(editable.locator('p')).toHaveCount(1);

        // The control: a plain Enter dispatched the same way does split, so the two above reached the editor.
        await editable.dispatchEvent('keydown', { key: 'Enter', keyCode: 13 });
        await expect(editable.locator('p')).toHaveCount(2);
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
            await editable.dispatchEvent('keydown', { key: 'b', ...init, [mod]: true });
            await page.keyboard.type('more');

            await expect(editable.locator('strong')).toHaveCount(0);
        });
    }
});

test.describe('AltGr', () => {
    // AltGr arrives as Ctrl+Alt on Windows, so `AltGr+1` ("¡") looks like the
    // Mod-Alt-1 heading hotkey; `modifierAltGraph` is what tells them apart.
    const altGrKey = { key: '¡', code: 'Digit1', keyCode: 49, altKey: true };

    test('a Mod-Alt hotkey still runs (control for the AltGr case)', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');
        const mod = await modifier(page);

        await editable.click();
        await page.keyboard.type('title');
        await editable.dispatchEvent('keydown', { ...altGrKey, [mod]: true });

        await expect(editable.locator('h1')).toHaveCount(1);
    });

    test('AltGr plus a key does not run a Mod-Alt hotkey', async ({ mount, page, browserName }) => {
        // Safari runs only on Apple systems, which have no AltGr key.
        test.skip(browserName === 'webkit', "WebKit's KeyboardEvent drops modifierAltGraph, so AltGr cannot be sent");
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');
        const mod = await modifier(page);
        // A Mac has no AltGr key, so the engine heeds AltGraph only elsewhere; it reads the platform per key.
        await page.evaluate(() => Object.defineProperty(navigator, 'platform', { get: () => 'Win32' }));

        await editable.click();
        await page.keyboard.type('title');
        // `dispatchEvent` returns false once a handler called `preventDefault`, which would stop the character.
        const claimed = await editable.evaluate(
            (element, init) => !element.dispatchEvent(new KeyboardEvent('keydown', { ...init, cancelable: true })),
            { ...altGrKey, [mod]: true, modifierAltGraph: true },
        );

        expect(claimed).toBe(false);
        await expect(editable.locator('h1')).toHaveCount(0);
    });
});
