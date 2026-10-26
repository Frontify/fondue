/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { cspViolationsOf } from '../../../playwright/csp';

import {
    surfaceOf,
    bubbleOf,
    popoverOf,
    suggestionsOf,
    menuOf,
    dialogOf,
    ready,
    select,
    open,
    focusedName,
    expectFocus,
    frames,
    documentHtml,
    imageAlt,
    summary,
    paragraph,
    image,
    table,
    codeBlock,
    openAltText,
} from './fixtures/overlayHarness';
import { OverlayProbe } from './fixtures/OverlayProbe';

test.afterEach(async ({ page }) => {
    // No paste or render path needs inline script, `eval` or a foreign origin.
    expect(await cspViolationsOf(page)).toEqual([]);
});

test.describe('the Overlay focus table', () => {
    test('bubble toolbar: shows for a selection and Alt+F10 enters it before any idle prefetch ran', async ({
        mount,
        page,
    }) => {
        // An idle callback that never runs leaves the lazy code unloaded until its first use.
        await page.addInitScript(() => {
            window.requestIdleCallback = () => 0;
        });
        await mount(<OverlayProbe />);
        await ready(page);
        await surfaceOf(page).focus();
        await select(page, 'two');
        await expect(bubbleOf(page)).toBeVisible();

        await page.keyboard.press('Alt+F10');

        await expectFocus(page, 'Bold');
    });

    test('bubble toolbar: stays out of focus, Alt+F10 enters, Escape closes with focus in the surface', async ({
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
        // The first Escape closes the tooltip that focus opened.
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

    test('link popover: focuses its field, Tab moves through and out, Escape closes with no change at the target', async ({
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

    test('mention list: keeps focus in the surface, Tab accepts the active option, Escape keeps the typed text', async ({
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

    test('alternative text dialog: focuses its field, keeps focus until closed, Escape returns to its chrome button', async ({
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

    test('context menu: focuses its first item, Escape closes with focus in the surface', async ({ mount, page }) => {
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

test('keeps the node chrome of an image, a table and a code block out of the Tab order', async ({ mount, page }) => {
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
    test(`keeps every overlay open while focus moves between the surface, toolbars and overlays in ${within === 'shadow' ? 'a shadow root' : 'an iframe'}`, async ({
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
    test(`renders the tooltip, the More menu, the menu and the alternative text dialog into the editor's overlay root in the same document in ${within === 'shadow' ? 'a shadow root' : 'an iframe'}`, async ({
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

test('focuses the surface at the mapped target when the image whose chrome opened the dialog was deleted', async ({
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
