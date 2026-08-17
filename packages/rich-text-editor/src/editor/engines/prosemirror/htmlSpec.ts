/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DOMOutputSpec } from 'prosemirror-model';

import { type HtmlSpec } from '#/core';

/**
 * `HtmlSpec` → ProseMirror `DOMOutputSpec`. `children: true` is the content
 * hole (`0`); strings and nested specs are static.
 */
export const htmlSpecToDom = (spec: HtmlSpec): DOMOutputSpec => {
    const attrs = spec.attrs && Object.keys(spec.attrs).length > 0 ? spec.attrs : null;
    if (spec.children === true) {
        return attrs ? [spec.tag, attrs, 0] : [spec.tag, 0];
    }
    if (typeof spec.children === 'string') {
        return attrs ? [spec.tag, attrs, spec.children] : [spec.tag, spec.children];
    }
    if (Array.isArray(spec.children)) {
        const mapped = spec.children.map((child) => (typeof child === 'string' ? child : htmlSpecToDom(child)));
        return attrs ? [spec.tag, attrs, ...mapped] : [spec.tag, {}, ...mapped];
    }
    return attrs ? [spec.tag, attrs] : [spec.tag];
};

/** Injected CSS lands on the outermost element. */
export const withRootStyle = (spec: DOMOutputSpec, declarations: readonly string[]): DOMOutputSpec => {
    if (declarations.length === 0 || !Array.isArray(spec)) {
        return spec;
    }
    const [tag, second, ...rest] = spec as unknown[];
    const extra = declarations.join('; ');
    if (second !== null && typeof second === 'object' && !Array.isArray(second)) {
        const attrs = second as Record<string, string>;
        const style = [attrs.style, extra].filter(Boolean).join('; ');
        return [tag as string, { ...attrs, style }, ...(rest as DOMOutputSpec[])];
    }
    return [tag as string, { style: extra }, ...(second === undefined ? [] : [second, ...rest])] as DOMOutputSpec;
};
