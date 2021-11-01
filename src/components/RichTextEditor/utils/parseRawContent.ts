/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Descendant } from "slate";
import { jsx } from "slate-hyperscript";
import { BlockStyleTypes } from "../renderer/renderBlockStyles";
import { Styles } from "../renderer/renderInlineStyles";

const BLOCK_MAP: { [key: string]: (el: HTMLElement) => { type: string } } = {
    A: (el) => ({ type: BlockStyleTypes.Link, url: el.getAttribute("href") }),
    P: () => ({ type: BlockStyleTypes.Paragraph }),
    PRE: () => ({ type: BlockStyleTypes.Code }),
    UL: () => ({ type: BlockStyleTypes.UnorderedList }),
    OL: () => ({ type: BlockStyleTypes.OrderedList }),
    LI: () => ({ type: BlockStyleTypes.ListItem }),
};

const STYLE_MAP: { [key: string]: () => { [key: string]: boolean } } = {
    I: () => ({ [Styles.Italic]: true }),
    S: () => ({ [Styles.Strikethrough]: true }),
    STRONG: () => ({ [Styles.Bold]: true }),
    BOLD: () => ({ [Styles.Bold]: true }),
    U: () => ({ [Styles.Underline]: true }),
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

const deserializeHTML = (el: HTMLElement | ChildNode): Descendant | Descendant[] | string | null => {
    if (el.nodeType === 3) {
        return el.textContent;
    } else if (el.nodeType !== 1) {
        return null;
    }
    let children = Array.from(el.childNodes)
        .filter((el) => (el.textContent ? el.textContent.trim().length > 0 : false))
        .map(deserializeHTML);

    if (children.length === 0) {
        children = [{ text: "" }];
    }

    if (el.nodeName === "BODY") {
        return jsx("fragment", {}, children);
    }

    if (el.nodeName === "BR") {
        return "\n";
    }

    if (STYLE_MAP[el.nodeName]) {
        return jsx("text", STYLE_MAP[el.nodeName](), children);
    }

    if (el instanceof HTMLElement && BLOCK_MAP[el.nodeName]) {
        return jsx("element", BLOCK_MAP[el.nodeName](el), children);
    }

    return el.textContent?.trim() ?? null;
};
