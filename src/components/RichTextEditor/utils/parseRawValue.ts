/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH, Value, deserializeHtml } from '@udecode/plate';
import { InitPlateEditor } from './InitPlateEditor';

const isHtmlString = (string: string): boolean => {
    const fragment = new DOMParser().parseFromString(string, 'text/html');
    return fragment.body.children.length > 0;
};

const wrapTextInHtml = (text: string) => (isHtmlString(text) ? text : `<p>${text}</p>`);

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
        const editor = InitPlateEditor.init(`${editorId}_parseRawValue`).getInstance();
        const trimmed = raw.trim().replace(/>\s+</g, '><');
        const htmlDocumentString = wrapTextInHtml(trimmed);
        const parsedHtml = deserializeHtml(editor, {
            element: htmlDocumentString,
            stripWhitespace: true,
        }) as Value;
        if (parsedHtml) {
            parsedValue = parsedHtml;
        }
    }

    return parsedValue;
};
