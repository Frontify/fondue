/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Descendant } from "slate";
import { jsx } from "slate-hyperscript";
import { BlockStyleTypes } from "../renderer/renderBlockStyles";
import { InlineStyles } from "../renderer/renderInlineStyles";

const BLOCK_MAP: { [key: string]: (el: HTMLElement) => { type: string } } = {
    A: (el) => ({ type: BlockStyleTypes.Link, url: el.getAttribute("href") }),
    P: () => ({ type: BlockStyleTypes.Paragraph }),
    UL: () => ({ type: BlockStyleTypes.UnorderedList }),
    OL: () => ({ type: BlockStyleTypes.OrderedList }),
    LI: () => ({ type: BlockStyleTypes.ListItem }),
};

const STYLE_MAP: { [key: string]: () => { [key: string]: boolean } } = {
    I: () => ({ [InlineStyles.Italic]: true }),
    S: () => ({ [InlineStyles.Strikethrough]: true }),
    STRONG: () => ({ [InlineStyles.Bold]: true }),
    BOLD: () => ({ [InlineStyles.Bold]: true }),
    B: () => ({ [InlineStyles.Bold]: true }),
    U: () => ({ [InlineStyles.Underline]: true }),
    CODE: () => ({ [InlineStyles.Code]: true }),
};

export const parseRawValue = (raw?: string): Descendant[] => {
    let parsedValue: Descendant[] = [{ type: BlockStyleTypes.Paragraph, children: [{ text: "" }] }];

    if (!raw) {
        return parsedValue;
    }

    try {
        parsedValue = JSON.parse(raw);
    } catch {
        const parsedDoc = new DOMParser().parseFromString(raw, "text/html");
        const parsedHtml = deserializeHTML(parsedDoc.body) as Descendant[];
        if (parsedHtml) {
            parsedValue = parsedHtml;
        }
    }

    return parsedValue;
};

const deserializeHTML = (element: HTMLElement | ChildNode): Descendant | Descendant[] | string | null => {
    if (element.nodeType === 3) {
        return element.textContent;
    } else if (element.nodeType !== 1) {
        return null;
    }
    let children = Array.from(element.childNodes)
        .filter((el) => (el.textContent ? el.textContent.trim().length > 0 : false))
        .map(deserializeHTML);

    if (children.length === 0) {
        children = [{ text: "" }];
    }

    if (element.nodeName === "BODY") {
        return jsx("fragment", {}, children);
    }

    if (element.nodeName === "BR") {
        return "\n";
    }

    if (STYLE_MAP[element.nodeName]) {
        return jsx("text", STYLE_MAP[element.nodeName](), children);
    }

    if (element instanceof HTMLElement && BLOCK_MAP[element.nodeName]) {
        return jsx("element", BLOCK_MAP[element.nodeName](element), children);
    }

    return element.textContent?.trim() ?? null;
};
