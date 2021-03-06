/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH, TDescendant, createPlateEditor, deserializeHtml, parseHtmlDocument } from '@udecode/plate';
import { getEditorConfig } from './editorConfig';

export const EMPTY_RICH_TEXT_VALUE: TDescendant[] = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

export const parseRawValue = (raw?: string): TDescendant[] => {
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
        });
        if (parsedHtml) {
            parsedValue = parsedHtml;
        }
    }

    return parsedValue;
};
