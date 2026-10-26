/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';
import { type ReactElement } from 'react';

import { HostDialogProfileProbe } from '#/react/__tests__/fixtures/HostDialogProfileProbe';
import { moreOf, pressUntil, ready, surfaceOf } from '#/react/__tests__/fixtures/layout';
import { ProfileProbe } from '#/react/__tests__/fixtures/ProfileProbe';

// The tags the accessibility suite checks.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const LABELS = [
    'Normal text',
    'Heading 1',
    'Heading 2',
    'Heading 3',
    'Heading 4',
    'Heading 5',
    'Heading 6',
    'Quote',
    'Code block',
    'Bulleted list',
    'Numbered list',
    'Task list',
];

const chromeButton = (page: Page) => page.getByRole('button', { name: 'Turn into, Code block' });
const menuOf = (page: Page) => page.getByRole('menu');
const contextMenuOf = (page: Page) => page.getByRole('menu', { name: 'Selection actions' });
// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const contentOf = (page: Page) =>
    page.evaluate(() => window.profileProbe?.handle?.getSnapshot().document.content.content);

// A code block holding `code`, made by the command so the fence rule is not under test.
const withCodeBlock = async (
    mount: (component: ReactElement) => Promise<unknown>,
    page: Page,
    editor: ReactElement = <ProfileProbe profile="document" />,
) => {
    await mount(editor);
    await ready(page);
    await surfaceOf(page).focus();
    await settleFocus(page);
    await page.keyboard.type('const a = 1;');
    await page.evaluate(() => window.profileProbe?.execute('code-block.toggle'));
    await expect(surfaceOf(page).locator('code')).toHaveCount(1);
};

const typesOf = async (page: Page) => ((await contentOf(page)) ?? []).map(({ type }) => type);

test.describe('the node chrome Turn into menu', () => {
    test('is named by the current type, lists what the block takes and marks the current type', async ({
        mount,
        page,
    }) => {
        await withCodeBlock(mount, page);

        await chromeButton(page).click();

        await expect(menuOf(page).getByRole('menuitemradio')).toHaveText(LABELS);
        await expect(menuOf(page).getByRole('menuitemradio', { checked: true })).toHaveText(['Code block']);
    });

    test('converts the block as one undo step when a pointer picks an entry, and returns focus to the surface', async ({
        mount,
        page,
    }) => {
        await withCodeBlock(mount, page);
        await chromeButton(page).click();

        await menuOf(page).getByRole('menuitemradio', { name: 'Heading 2' }).click();

        await expect(menuOf(page)).toHaveCount(0);
        await expect(surfaceOf(page).locator('h2')).toHaveText('const a = 1;');
        await expect(surfaceOf(page)).toBeFocused();
        await page.keyboard.press('ControlOrMeta+z');
        await expect(surfaceOf(page).locator('h2')).toHaveCount(0);
        expect(await typesOf(page)).toEqual(['code_block']);
    });

    test('opens and picks by keyboard, and Escape returns focus to the surface', async ({ mount, page }) => {
        await withCodeBlock(mount, page);
        await chromeButton(page).focus();

        await page.keyboard.press('Enter');
        await expect(menuOf(page)).toBeVisible();
        await expect(menuOf(page).getByRole('menuitemradio', { name: 'Code block' })).toBeFocused();
        await page.keyboard.press('Escape');

        await expect(menuOf(page)).toHaveCount(0);
        await expect(surfaceOf(page)).toBeFocused();

        await chromeButton(page).focus();
        await page.keyboard.press('Enter');
        await expect(menuOf(page).getByRole('menuitemradio', { name: 'Code block' })).toBeFocused();
        await page.keyboard.press('ArrowUp');
        await expect(menuOf(page).getByRole('menuitemradio', { name: 'Quote' })).toBeFocused();
        await page.keyboard.press('Enter');

        await expect(surfaceOf(page).locator('blockquote')).toHaveCount(1);
        await expect(surfaceOf(page)).toBeFocused();
    });

    test('changes nothing when the current type is picked, and returns focus to the surface', async ({
        mount,
        page,
    }) => {
        await withCodeBlock(mount, page);
        const before = await contentOf(page);
        await chromeButton(page).click();

        await menuOf(page).getByRole('menuitemradio', { name: 'Code block' }).click();

        await expect(menuOf(page)).toHaveCount(0);
        await expect(surfaceOf(page)).toBeFocused();
        expect(await contentOf(page)).toEqual(before);
        // The picked block is still the code block, not toggled off to a paragraph.
        await expect(surfaceOf(page).locator('code')).toHaveCount(1);
    });

    test('has no accessibility violation with the menu open', async ({ mount, page }) => {
        await withCodeBlock(mount, page);
        await chromeButton(page).click();
        await expect(menuOf(page)).toBeVisible();

        const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

        expect(results.violations.map(({ id }) => id)).toEqual([]);
    });
});

test.describe('the context menu Turn into row', () => {
    const openOnNode = async (page: Page) => {
        await page.evaluate(() => window.profileProbe?.selectNode('code_block'));
        await surfaceOf(page).focus();
        await page.keyboard.press('Shift+F10');
        await expect(contextMenuOf(page)).toBeVisible();
    };

    test('offers a group of the same entries on a node-selected code block, marking the current type', async ({
        mount,
        page,
    }) => {
        await withCodeBlock(mount, page);
        await openOnNode(page);

        const items = contextMenuOf(page).getByRole('menuitemradio');
        await expect(items).toHaveText(LABELS);
        await expect(contextMenuOf(page).getByRole('menuitemradio', { checked: true })).toHaveText(['Code block']);
    });

    test('converts the block as one undo step and returns focus to the surface', async ({ mount, page }) => {
        await withCodeBlock(mount, page);
        await openOnNode(page);

        await contextMenuOf(page).getByRole('menuitemradio', { name: 'Quote' }).click();

        await expect(contextMenuOf(page)).toHaveCount(0);
        await expect(surfaceOf(page).locator('blockquote')).toHaveCount(1);
        await expect(surfaceOf(page)).toBeFocused();
        await page.keyboard.press('ControlOrMeta+z');
        expect(await typesOf(page)).toEqual(['code_block']);
    });

    test('changes nothing when the current type is picked', async ({ mount, page }) => {
        await withCodeBlock(mount, page);
        const before = await contentOf(page);
        await openOnNode(page);

        await contextMenuOf(page).getByRole('menuitemradio', { name: 'Code block' }).click();

        await expect(contextMenuOf(page)).toHaveCount(0);
        await expect(surfaceOf(page)).toBeFocused();
        expect(await contentOf(page)).toEqual(before);
    });

    test('picks by keyboard from the group', async ({ mount, page }) => {
        await withCodeBlock(mount, page);
        await openOnNode(page);

        await contextMenuOf(page).getByRole('menuitemradio', { name: 'Code block' }).focus();
        await page.keyboard.press('ArrowUp');
        await expect(contextMenuOf(page).getByRole('menuitemradio', { name: 'Quote' })).toBeFocused();
        await page.keyboard.press('Enter');

        await expect(contextMenuOf(page)).toHaveCount(0);
        await expect(surfaceOf(page).locator('blockquote')).toHaveCount(1);
        await expect(surfaceOf(page)).toBeFocused();
    });

    test('leaves a text selection to the browser menu', async ({ mount, page }) => {
        await withCodeBlock(mount, page);
        await page.evaluate(() => window.profileProbe?.select({ text: 'const' }));

        const prevented = await surfaceOf(page)
            .locator('code')
            .evaluate((element) => {
                const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, button: 2 });
                element.dispatchEvent(event);
                return event.defaultPrevented;
            });

        expect(prevented).toBe(false);
        await expect(contextMenuOf(page)).toHaveCount(0);
    });

    test('has no accessibility violation with the menu open', async ({ mount, page }) => {
        await withCodeBlock(mount, page);
        await openOnNode(page);
        await expect(contextMenuOf(page).getByRole('menuitemradio').first()).toBeVisible();

        const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

        expect(results.violations.map(({ id }) => id)).toEqual([]);
    });

    test('keeps the items inside a host modal dialog and picks them by pointer and keyboard', async ({
        mount,
        page,
    }) => {
        await withCodeBlock(mount, page, <HostDialogProfileProbe />);
        const dialog = page.getByRole('dialog', { name: 'Host dialog' });
        await openOnNode(page);

        const items = contextMenuOf(page).getByRole('menuitemradio');
        await expect(dialog.getByRole('menuitemradio')).toHaveText(LABELS);
        await expect(dialog.getByRole('menu', { name: 'Selection actions' })).toHaveCount(1);
        await expect(items).toHaveCount(LABELS.length);
        await expect(dialog.getByRole('group', { name: 'Turn into' }).getByRole('menuitemradio')).toHaveCount(
            LABELS.length,
        );

        await items.filter({ hasText: 'Quote' }).click();
        await expect(surfaceOf(page).locator('blockquote')).toHaveCount(1);
        await expect(surfaceOf(page)).toBeFocused();

        await page.keyboard.press('ControlOrMeta+z');
        await expect(surfaceOf(page).locator('code')).toHaveCount(1);
        await openOnNode(page);
        await expect(dialog.getByRole('menu', { name: 'Selection actions' })).toBeVisible();
        // The menu moves focus to its first row on a frame, after which the arrows walk down to Quote.
        await expect(contextMenuOf(page).locator(':focus')).toHaveCount(1);
        await pressUntil(page, 'ArrowDown', 'Quote');
        await expect(contextMenuOf(page).getByRole('menuitemradio', { name: 'Quote' })).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(surfaceOf(page).locator('blockquote')).toHaveCount(1);
    });
});

test.describe('the More Turn into row', () => {
    const openFromMore = async (page: Page) => {
        await moreOf(page).click();
        await page.getByRole('menuitem', { name: 'Turn into' }).click();
        await expect(page.getByRole('menu', { name: 'Turn into' })).toBeVisible();
        await expect(page.getByRole('menuitemradio', { name: 'Code block' })).toBeFocused();
    };

    for (const profile of ['comment', 'document'] as const) {
        test(`converts a ${profile} code block by keyboard and returns focus to the surface`, async ({
            mount,
            page,
        }) => {
            await withCodeBlock(mount, page, <ProfileProbe profile={profile} />);
            await openFromMore(page);

            await page.keyboard.press('ArrowUp');
            await expect(page.getByRole('menuitemradio', { name: 'Quote' })).toBeFocused();
            await page.keyboard.press('Enter');

            await expect(menuOf(page)).toHaveCount(0);
            await expect(surfaceOf(page).locator('blockquote')).toHaveCount(1);
            await expect(surfaceOf(page)).toBeFocused();
        });

        test(`changes nothing in a ${profile} code block when the current type is picked`, async ({ mount, page }) => {
            await withCodeBlock(mount, page, <ProfileProbe profile={profile} />);
            const before = await contentOf(page);
            await openFromMore(page);

            await page.getByRole('menuitemradio', { name: 'Code block' }).click();

            await expect(menuOf(page)).toHaveCount(0);
            await expect(surfaceOf(page)).toBeFocused();
            expect(await contentOf(page)).toEqual(before);
            await expect(surfaceOf(page).locator('code')).toHaveCount(1);
        });
    }
});
