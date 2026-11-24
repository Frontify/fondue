/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { LinkPasteFrame } from './LinkPasteFrame';

// A link pasted from another application keeps its new tab target: `_blank` in any letter case, or `_new`.

const EDITABLE = '[contenteditable="true"]';
const HTML_TYPE = 'text/html';
const NEW_TAB_DESCRIPTION = 'Opens in a new tab';
const UPPERCASE_NEW_TAB_LINK_HTML = '<a href="https://example.com" target="_BLANK">link</a>';
const NEW_WINDOW_NAME_LINK_HTML = '<a href="https://example.com" target="_new">link</a>';

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

test('a pasted link with an uppercase new tab target opens a new tab', async ({ mount }) => {
    const component = await mount(<LinkPasteFrame />);
    const editor = component.getByTestId('link-paste');

    await pasteHtml(editor, UPPERCASE_NEW_TAB_LINK_HTML);

    await expect(editor.locator('a')).toHaveAccessibleDescription(NEW_TAB_DESCRIPTION);
});

test('a pasted link with a _new target opens a new tab', async ({ mount }) => {
    const component = await mount(<LinkPasteFrame />);
    const editor = component.getByTestId('link-paste');

    await pasteHtml(editor, NEW_WINDOW_NAME_LINK_HTML);

    await expect(editor.locator('a')).toHaveAccessibleDescription(NEW_TAB_DESCRIPTION);
});
