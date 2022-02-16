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
    console.log({ raw });

    let parsedValue = EMPTY_VALUE;

    if (!raw) {
        return parsedValue;
    }

    try {
        parsedValue = JSON.parse(raw);
    } catch {
        const editor = createPlateUIEditor({ plugins: plugins });
        const document = parseHtmlDocument(raw);
        console.log({ document });
        const parsedHtml = deserializeHtml(editor, {
            element: document.body,
            stripWhitespace: true,
        });
        console.log({ parsedHtml });
        if (parsedHtml) {
            parsedValue = parsedHtml;
        }
    }

    return parsedValue;
};
