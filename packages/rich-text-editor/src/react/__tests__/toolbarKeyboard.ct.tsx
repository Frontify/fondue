/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { toolbarOf } from './fixtures/layout';
import {
    codeBlock,
    surfaceOf,
    itemOf,
    ready,
    select,
    focusedName,
    expectFocus,
    domSelection,
    documentHtml,
    contrast,
    boxOf,
    outlineOf,
} from './fixtures/toolbarHarness';
import { ToolbarProbe } from './fixtures/ToolbarProbe';

test('is one tab stop with a label, aria-controls and arrow, Home and End keys', async ({ mount, page }) => {
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

test('moves with ArrowRight and ArrowLeft in visual order under rtl', async ({ mount, page }) => {
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

test('moves focus with Alt+F10 to the first item, then to the last focused one, also when read-only', async ({
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

test('closes an open tooltip first, then returns to the surface with the selection', async ({ mount, page }) => {
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

test('returns focus to the surface with the resulting selection after bold, link and list items', async ({
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
        '<blockquote>one <a href="https://example.com/fixture" rel="noopener"><strong>two</strong></a> three</blockquote>',
    );
});

test('disables every item and keeps the toolbar out of the Tab order, with typing, paste and execute refused', async ({
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

test('takes a read-only surface out of the Tab order when disabled turns on and back in when it turns off', async ({
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

test('tabs out of the surface in both directions from a paragraph and a code block', async ({ mount, page }) => {
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

test('cycles Alt+F10 through node chrome and the toolbar, then Escape keeps the selection', async ({ mount, page }) => {
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

test('walks node chrome and the toolbar with the presentation toolbarShortcut', async ({ mount, page }) => {
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
    test(`shows the compiled shortcut in the tooltip and the More row on ${uaPlatform}`, async ({ mount, page }) => {
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
    test(`names the presentation toolbarShortcut as ${expected} on the toolbar on ${uaPlatform}`, async ({
        mount,
        page,
    }) => {
        await onPlatform(page, platform, uaPlatform);
        await mount(<ToolbarProbe toolbarShortcut="Mod-Alt-t" />);
        await ready(page);

        await expect(toolbarOf(page)).toHaveAttribute('aria-keyshortcuts', expected);
    });
}

for (const lands of ['body', 'toolbar'] as const) {
    test(`returns focus to the surface when a click leaves focus on the ${lands}, as Firefox and Safari on macOS do`, async ({
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

test('returns to the surface on Escape in node chrome away from the selection', async ({ mount, page }) => {
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

test('scrolls node chrome that Alt+F10 focuses clear of the sticky toolbar', async ({ mount, page }) => {
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

test('outlines a focused node chrome button by 2 px at 3:1', async ({ mount, page }) => {
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
