/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { TableInsertFrame } from './TableInsertFrame';

// The Insert table button puts a table with a header row after the text,
// leaves the caret in its first cell, and gives way to the Table menu inside it.

const EDITABLE = '[contenteditable="true"]';
const INSERT_TABLE = 'Insert table';
const TABLE_MENU = 'Table';
const BOLD = 'Bold';
const TYPED_TEXT = 'Intro';
const ROW_COUNT = 3;
const COLUMN_COUNT = 3;
const FOCUS_TOOLBAR = 'Alt+F10';
const NEXT_BUTTON = 'ArrowRight';

const insertButton = (page: Page): Locator => page.getByRole('button', { name: INSERT_TABLE, exact: true });

const expectInsertedTable = async (page: Page): Promise<void> => {
    const editable = page.locator(EDITABLE);

    await expect(editable.locator('table')).toHaveCount(1);
    await expect(editable.locator('tr')).toHaveCount(ROW_COUNT);
    await expect(editable.locator('tr').first().locator('th')).toHaveCount(COLUMN_COUNT);
    await expect(editable.locator('tr').first().locator('td')).toHaveCount(0);
};

test('the Insert table button inserts a table after the text and puts the caret in its first header', async ({
    mount,
    page,
}) => {
    await mount(<TableInsertFrame />);
    const editable = page.locator(EDITABLE);
    await editable.click();
    await page.keyboard.type(TYPED_TEXT);

    await insertButton(page).click();

    await expectInsertedTable(page);
    await expect(editable.locator('p').first()).toHaveText(TYPED_TEXT);
    const caretCell = await editable.evaluate((node) => {
        const anchor = window.getSelection()?.anchorNode ?? null;
        const cell = anchor === null ? null : (anchor.parentElement?.closest('th, td') ?? null);
        return {
            editableHasFocus: document.activeElement === node,
            isFirstHeader: cell !== null && cell === node.querySelector('th'),
        };
    });
    expect(caretCell).toEqual({ editableHasFocus: true, isFirstHeader: true });
});

test('inside a table the Insert table button is gone and the Table menu is there', async ({ mount, page }) => {
    await mount(<TableInsertFrame />);
    await page.locator(EDITABLE).click();
    await insertButton(page).click();
    await expectInsertedTable(page);

    await expect(insertButton(page)).toHaveCount(0);
    await expect(page.getByRole('button', { name: TABLE_MENU, exact: true })).toBeVisible();
});

test('the Insert table button works from the keyboard', async ({ mount, page }) => {
    await mount(<TableInsertFrame />);
    await page.locator(EDITABLE).focus();

    await page.keyboard.press(FOCUS_TOOLBAR);
    await expect(page.getByRole('button', { name: BOLD, exact: true })).toBeFocused();
    await page.keyboard.press(NEXT_BUTTON);
    await expect(insertButton(page)).toBeFocused();
    await page.keyboard.press('Enter');

    await expectInsertedTable(page);
});
