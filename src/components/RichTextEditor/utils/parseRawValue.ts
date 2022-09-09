/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH, TDescendant, createPlateEditor, deserializeHtml, parseHtmlDocument } from '@udecode/plate';
import { EditorConfigType, getEditorConfig } from './editorConfig';

const wrapTextInHtml = (text: string) => {
    const htmlDocRegex = /^<\w+>.*<\/\w+>$/;

    return htmlDocRegex.test(text) ? text : `<p>${text}</p>`;
};

export const EMPTY_RICH_TEXT_VALUE: TDescendant[] = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

export const parseRawValue = (
    raw?: string,
    editorConfig: EditorConfigType = EditorConfigType.DEFAULT,
): TDescendant[] => {
    let parsedValue = EMPTY_RICH_TEXT_VALUE;

    if (!raw) {
        return parsedValue;
    }

    try {
        parsedValue = JSON.parse(raw);
    } catch {
        const editor = createPlateEditor({ plugins: getEditorConfig(editorConfig) });
        const trimmed = raw.trim().replace(/>\s+</g, '><');
        const htmlDocumentString = wrapTextInHtml(trimmed);
        const document = parseHtmlDocument(htmlDocumentString);
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
