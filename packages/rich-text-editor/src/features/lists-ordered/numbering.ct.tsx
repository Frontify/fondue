/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { listItem, numbered } from '../../../fixtures/editor/list-blocks';
import { ListProbe } from '../../../fixtures/editor/ListProbe';

type ListRte = NonNullable<Window['listRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = (page: Page) =>
    expect(page.locator('[data-test-id="fondue-rich-text-editor"]').first()).not.toHaveAttribute('aria-busy');
// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const startsOf = (page: Page) =>
    page.evaluate(() =>
        (window.listRte as ListRte).changes.map(({ commandId, content }) => [
            commandId,
            (content as { content: { attrs: { start: number } }[] }).content[0]?.attrs.start,
        ]),
    );

/** Opens Start numbering at from the More menu by keyboard, with the caret in "two". */
const openNumbering = async (page: Page) => {
    await surfaceOf(page).focus();
    await settleFocus(page);
    await page.evaluate(() => {
        const rte = window.listRte as ListRte;
        rte.setSelection(rte.handle, { text: 'two', from: 1, to: 1 });
    });
    await page.keyboard.press('Alt+F10');
    await page.keyboard.press('End');
    await expect(page.getByRole('button', { name: 'More' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitem', { name: 'Move up' })).toBeFocused();
    await page.getByRole('menuitem', { name: 'Start numbering at' }).focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Start numbering at' });
    await expect(dialog.getByRole('spinbutton', { name: 'First number' })).toBeFocused();
    // The closing menu hands focus on in a timer, so keys wait for it as for the surface.
    await settleFocus(page);
    return dialog;
};

const blocks = [numbered(1, listItem('one'), listItem('two'))];

test('SPEC-rich-text-editing/AC-090 SPEC-rich-text-react/AC-043 sets the start by keyboard in the numbering dialog as one undo step', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);

    const dialog = await openNumbering(page);
    await expect(dialog.getByRole('spinbutton', { name: 'First number' })).toHaveValue('1');
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('5');
    await page.keyboard.press('Enter');

    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'More' })).toBeFocused();
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '5');
    expect(await startsOf(page)).toEqual([['list.ordered.start.set', 5]]);
    await page.evaluate(() => (window.listRte as ListRte).handle.execute('history.undo'));
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '1');
});

test('SPEC-rich-text-editing/AC-090 SPEC-rich-text-react/AC-043 refuses 1,000,001 in the numbering dialog with a field error, and Escape closes it with no change', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);

    const dialog = await openNumbering(page);
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('1000001');
    await page.keyboard.press('Enter');

    await expect(dialog.getByRole('alert')).toHaveText('Enter a whole number from 0 to 1000000.');
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'More' })).toBeFocused();
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '1');
    expect(await startsOf(page)).toEqual([]);
});

test('SPEC-rich-text-editing/AC-090 opens the numbering dialog from a host execute of list.ordered.start.edit, whose confirmation sets the start as one undo step', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);
    await page.evaluate(() => {
        const rte = window.listRte as ListRte;
        rte.setSelection(rte.handle, { text: 'two', from: 1, to: 1 });
        rte.handle.execute('list.ordered.start.edit');
    });

    const field = page
        .getByRole('dialog', { name: 'Start numbering at' })
        .getByRole('spinbutton', { name: 'First number' });
    await expect(field).toBeFocused();
    await expect(field).toHaveValue('1');
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('5');
    await page.keyboard.press('Enter');

    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '5');
    expect(await startsOf(page)).toEqual([['list.ordered.start.set', 5]]);
    await page.evaluate(() => (window.listRte as ListRte).handle.execute('history.undo'));
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '1');
});
