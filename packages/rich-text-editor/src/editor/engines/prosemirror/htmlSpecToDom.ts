/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DOMOutputSpec } from 'prosemirror-model';

import { attributeEntries, type HtmlSpec } from '#/core';

/**
 * `HtmlSpec` → ProseMirror `DOMOutputSpec`. `children: true` is the content
 * hole (`0`); strings and nested specs are static. Attributes are written as
 * `attributeEntries` spells them — the same as the HTML export.
 */
export const htmlSpecToDom = (spec: HtmlSpec): DOMOutputSpec => {
    const entries = attributeEntries(spec.attrs);
    // The attributes slot is optional; left out when there are none.
    const head: unknown[] = entries.length > 0 ? [spec.tag, Object.fromEntries(entries)] : [spec.tag];
    const { children } = spec;
    if (children === true) {
        head.push(0);
    } else if (typeof children === 'string') {
        head.push(children);
    } else if (children?.includes(true)) {
        // A content hole must be its parent's only child, so what sits beside it
        // (screen-reader text) stays out of the editor's DOM and its clipboard.
        head.push(0);
    } else if (children) {
        head.push(...children.map((child) => (typeof child === 'object' ? htmlSpecToDom(child) : child)));
    }
    return head as unknown as DOMOutputSpec;
};
