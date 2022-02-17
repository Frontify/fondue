/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    createPlateUIEditor,
    deserializeHtml,
    ELEMENT_PARAGRAPH,
    parseHtmlDocument,
    TDescendant,
} from "@udecode/plate";
import { plugins } from "../config";

export const EMPTY_VALUE: TDescendant[] = [{ type: ELEMENT_PARAGRAPH, children: [{ text: "" }] }];

export const parseRawValue = (raw?: string): TDescendant[] => {
    let parsedValue = EMPTY_VALUE;

    if (!raw) {
        return parsedValue;
    }

    try {
        parsedValue = JSON.parse(raw);
    } catch {
        const editor = createPlateUIEditor({ plugins: plugins });
        const trimmed = raw.trim().replace(/>\s+</g, "><");
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
