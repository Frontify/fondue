/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LI,
    ELEMENT_LINK,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    TDescendant,
} from "@udecode/plate";
import { jsx } from "slate-hyperscript";

const BLOCK_MAP: { [key: string]: (el: HTMLElement) => { type: string } } = {
    A: (el) => ({ type: ELEMENT_LINK, url: el.getAttribute("href") }),
    P: () => ({ type: ELEMENT_PARAGRAPH }),
    UL: () => ({ type: ELEMENT_UL }),
    OL: () => ({ type: ELEMENT_OL }),
    LI: () => ({ type: ELEMENT_LI }),
};

const STYLE_MAP: { [key: string]: () => { mark: string } } = {
    I: () => ({ mark: MARK_ITALIC }),
    S: () => ({ mark: MARK_STRIKETHROUGH }),
    STRONG: () => ({ mark: MARK_BOLD }),
    BOLD: () => ({ mark: MARK_BOLD }),
    B: () => ({ mark: MARK_BOLD }),
    U: () => ({ mark: MARK_UNDERLINE }),
    CODE: () => ({ mark: MARK_CODE }),
};

export const EMPTY_VALUE: TDescendant[] = [{ type: ELEMENT_PARAGRAPH, children: [{ text: "" }] }];

export const parseRawValue = (raw?: string): TDescendant[] => {
    let parsedValue = EMPTY_VALUE;

    if (!raw) {
        return parsedValue;
    }

    try {
        parsedValue = JSON.parse(raw);
    } catch {
        const parsedDoc = new DOMParser().parseFromString(raw, "text/html");
        const parsedHtml = deserializeHtml(parsedDoc.body) as TDescendant[];
        if (parsedHtml) {
            parsedValue = parsedHtml;
        }
    }

    return parsedValue;
};

const deserializeHtml = (element: HTMLElement | ChildNode): TDescendant | TDescendant[] | string | null => {
    if (element.nodeType === 3) {
        return element.textContent;
    } else if (element.nodeType !== 1) {
        return null;
    }
    let children = Array.from(element.childNodes)
        .filter((el) => (el.textContent ? el.textContent.trim().length > 0 : false))
        .map(deserializeHtml);

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
