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
    } else if (children) {
        head.push(...children.map((child) => (typeof child === 'string' ? child : htmlSpecToDom(child))));
    }
    return head as unknown as DOMOutputSpec;
};
