/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { TablePasteFrame } from './TablePasteFrame';
import { CELL_TEXTS, ROW_TEXTS, TABLE_HTML } from './tablePasteValues';

// A table pasted from another application stays a table where a plugin reads tables,
// and reads as one line per row where none does.

const EDITABLE = '[contenteditable="true"]';
const HTML_TYPE = 'text/html';
const HAS_TEXT = /\S/;

/** Paste as the browser does, with a real event that carries the clipboard. */
const pasteHtml = async (editor: Locator, html: string): Promise<void> => {
    const editable = editor.locator(EDITABLE);
    await editable.focus();
    await editable.evaluate(
        (node, { html, type }) => {
            const clipboardData = new DataTransfer();
            clipboardData.setData(type, html);
            node.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
        },
        { html, type: HTML_TYPE },
    );
};

test('a pasted table stays a table where a plugin reads tables', async ({ mount }) => {
    const component = await mount(<TablePasteFrame />);
    const editor = component.getByTestId('with-table');

    await pasteHtml(editor, TABLE_HTML);

    await expect(editor.locator('table')).toHaveCount(1);
    await expect(editor.locator('td, th')).toHaveText(CELL_TEXTS);
});

test('a pasted table reads as one line per row where no plugin reads tables', async ({ mount }) => {
    const component = await mount(<TablePasteFrame />);
    const editor = component.getByTestId('without-table');

    await pasteHtml(editor, TABLE_HTML);

    await expect(editor.locator('table')).toHaveCount(0);
    await expect(editor.locator(`${EDITABLE} > p`).filter({ hasText: HAS_TEXT })).toHaveText(ROW_TEXTS);
});
