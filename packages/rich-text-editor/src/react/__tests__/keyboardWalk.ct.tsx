/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import {
    execute,
    focusedName,
    press,
    pressUntil,
    PROFILES,
    ready,
    select,
    selectImage,
    surfaceOf,
    toolbarOf,
} from './fixtures/layout';
import { ProfileProbe } from './fixtures/ProfileProbe';

/** What a run can change: the content, the open overlays and panels, the toolbars shown and where focus is. */
const signature = (page: Page) =>
    page.evaluate(() => {
        const surface = document.querySelector('[role="textbox"]');
        const shown = (selector: string) =>
            [...document.querySelectorAll(selector)].filter((element) => element.getClientRects().length > 0).length;
        const content = surface?.innerHTML;
        const focus = document.activeElement?.outerHTML.slice(0, 200);

        return JSON.stringify({
            content,
            overlays: shown('[role="dialog"], [role="menu"], [role="listbox"], [role="region"], nav'),
            toolbars: shown('[role="toolbar"]'),
            focus,
        });
    });

/** Three paragraphs typed into the empty document, with the word `two` of the second selected. */
const seed = async (page: Page) => {
    await surfaceOf(page).focus();
    await page.keyboard.insertText('Alpha one');
    await press(page, 'Enter');
    await page.keyboard.insertText('Beta two');
    await press(page, 'Enter');
    await page.keyboard.insertText('Gamma three');
    await select(page, { text: 'two' });
};

/** The state each item needs beyond the seeded selection, set up without the item itself. */
const prepare = async (page: Page, name: string) => {
    if (name === 'Redo') {
        await execute(page, 'history.undo');
    }

    if (name === 'Clear formatting') {
        await execute(page, 'mark.bold.toggle');
    }

    if (name === 'Start numbering at') {
        await execute(page, 'list.ordered.toggle', { start: 1 });
    }
};

/** Moves focus from the surface to the toolbar item `name` by Alt+F10 and the arrows only. */
const reachToolbarItem = async (page: Page, name: string) => {
    await surfaceOf(page).focus();
    await press(page, 'Alt+F10');
    await press(page, 'Home');
    await pressUntil(page, 'ArrowRight', name);
};

/** Opens More from the surface by Alt+F10, End and Enter, and moves focus to its row `name` by ArrowDown only. */
const reachMoreRow = async (page: Page, name: string) => {
    await surfaceOf(page).focus();
    await press(page, 'Alt+F10');
    await press(page, 'End');
    await expect.poll(() => focusedName(page)).toBe('More');
    await press(page, 'Enter');
    await expect(page.getByRole('menu')).toBeVisible();
    await pressUntil(page, 'ArrowDown', name);
};

for (const profile of PROFILES) {
    test.describe(`the keyboard-only walk of the ${profile} profile`, () => {
        // Each item runs on a freshly mounted editor, so one run never sets up the next.
        test.setTimeout(180_000);

        test('runs every toolbar item from the surface', async ({ mount, page }) => {
            let component = await mount(<ProfileProbe profile={profile} withServices />);
            await ready(page);
            const names = await toolbarOf(page)
                .locator('[data-rte-toolbar-item]')
                .evaluateAll((items) => items.map((item) => item.getAttribute('aria-label') ?? item.textContent ?? ''));
            expect(names.length).toBeGreaterThan(0);
            for (const name of names) {
                await component.unmount();
                component = await mount(<ProfileProbe profile={profile} withServices />);
                await ready(page);
                await seed(page);
                await prepare(page, name);
                await reachToolbarItem(page, name);
                await expect(page.locator(':focus'), `${name} is unavailable`).not.toHaveAttribute(
                    'aria-disabled',
                    'true',
                );
                const before = await signature(page);

                await press(page, 'Enter');

                await expect.poll(() => signature(page), { message: `${name} ran nothing` }).not.toBe(before);
            }
        });

        test('runs every More row from the surface', async ({ mount, page }) => {
            let component = await mount(<ProfileProbe profile={profile} withServices />);
            await ready(page);
            await toolbarOf(page).getByRole('button', { name: 'More', exact: true }).click();
            // More loads its rows on first use.
            await expect(page.getByRole('menu')).toBeVisible();
            const rows = await page.getByRole('menu').locator('[role^="menuitem"]').allInnerTexts();
            const names = rows.map((row) => row.split('\n')[0] ?? '');
            expect(names.length).toBeGreaterThan(0);
            for (const name of names) {
                await component.unmount();
                component = await mount(<ProfileProbe profile={profile} withServices />);
                await ready(page);
                await seed(page);
                await prepare(page, name);
                await reachMoreRow(page, name);
                await expect(page.locator(':focus'), `${name} is unavailable`).not.toHaveAttribute(
                    'aria-disabled',
                    'true',
                );
                const before = await signature(page);

                await press(page, 'Enter');

                await expect.poll(() => signature(page), { message: `${name} ran nothing` }).not.toBe(before);
            }
        });
    });
}

/** Inserts an image after the seeded second paragraph and selects it, as a right click or the arrows would. */
const insertImage = async (page: Page) => {
    await execute(page, 'image.insert');
    await expect(surfaceOf(page).locator('figure')).toHaveCount(1);
    await selectImage(page);
};

for (const profile of ['document', 'brand-document'] as const) {
    test(`runs every context menu row of a selected image in the ${profile} profile from Shift+F10, reaching the unavailable ones`, async ({
        mount,
        page,
    }) => {
        test.setTimeout(120_000);
        let component = await mount(<ProfileProbe profile={profile} withServices />);
        await ready(page);
        await seed(page);
        await insertImage(page);
        await press(page, 'Shift+F10');
        const menu = page.getByRole('menu', { name: 'Selection actions' });
        await expect(menu).toBeVisible();
        const rows = await menu.locator('[role^="menuitem"]').evaluateAll((items) =>
            items.map((item) => {
                const label = item.querySelector(':scope > span');
                const labelText = label?.textContent;
                const text = labelText?.trim();

                return { name: text ?? '', enabled: item.getAttribute('aria-disabled') !== 'true' };
            }),
        );
        expect(rows.filter(({ enabled }) => enabled).length).toBeGreaterThan(0);
        for (const { name, enabled } of rows) {
            await component.unmount();
            component = await mount(<ProfileProbe profile={profile} withServices />);
            await ready(page);
            await seed(page);
            await insertImage(page);
            await press(page, 'Shift+F10');
            await expect(menu).toBeVisible();
            await pressUntil(page, 'ArrowDown', name);
            if (!enabled) {
                continue;
            }

            const before = await signature(page);

            await press(page, 'Enter');

            await expect.poll(() => signature(page), { message: `${name} ran nothing` }).not.toBe(before);
        }
    });
}
