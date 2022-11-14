/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH, Value, createPlateEditor, deserializeHtml, parseHtmlDocument } from '@udecode/plate';
import { createPlatePlugins, defaultPlugins } from '../Plugins';

const wrapTextInHtml = (text: string) => {
    const htmlDocRegex = /^<\w+>.*<\/\w+>$/;

    return htmlDocRegex.test(text) ? text : `<p>${text}</p>`;
};

export const EMPTY_RICH_TEXT_VALUE: Value = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

type ParseRawValueOptions = {
    editorId?: string;
    raw?: string;
};

export const parseRawValue = ({ editorId = 'parseRawValue', raw }: ParseRawValueOptions): Value => {
    let parsedValue = EMPTY_RICH_TEXT_VALUE;

    if (!raw) {
        return parsedValue;
    }

    try {
        parsedValue = JSON.parse(raw);
    } catch {
        const editor = createPlateEditor({
            id: `${editorId}_parseRawValue`,
            plugins: createPlatePlugins(defaultPlugins),
        });
        const trimmed = raw.trim().replace(/>\s+</g, '><');
        const htmlDocumentString = wrapTextInHtml(trimmed);
        const document = parseHtmlDocument(htmlDocumentString);
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
