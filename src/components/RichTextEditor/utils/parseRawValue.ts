/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPlateEditor, deserializeHtml, ELEMENT_PARAGRAPH, parseHtmlDocument, Value } from '@udecode/plate';
import { getEditorConfig } from './editorConfig';

export const EMPTY_RICH_TEXT_VALUE: Value = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

export const parseRawValue = (raw?: string): Value => {
    let parsedValue = EMPTY_RICH_TEXT_VALUE;

    if (!raw) {
        return parsedValue;
    }

    try {
        parsedValue = JSON.parse(raw);
    } catch {
        const editor = createPlateEditor({ plugins: getEditorConfig() });
        const trimmed = raw.trim().replace(/>\s+</g, '><');
        const document = parseHtmlDocument(trimmed);
        const parsedHtml = deserializeHtml(editor, {
            element: document.body,
            stripWhitespace: true,
        }) as Value;
        if (parsedHtml) {
            parsedValue = parsedHtml;
        }
    }

    return parsedValue;
};
