/* (c) Copyright Frontify Ltd., all rights reserved. */

import { attributeEntries, type HtmlSpec } from '#/core';

import { type DrawnNode } from './documentTree';

/**
 * The drawn tree as an HTML string, for export. Plain string building — no
 * React, no DOM — so it runs anywhere, a server included.
 */

/** Elements HTML writes without a closing tag. */
const VOID_ELEMENTS = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'source',
    'track',
    'wbr',
]);

const escapeText = (text: string): string =>
    text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const escapeAttribute = (value: string): string => escapeText(value).replaceAll('"', '&quot;');

const specToString = (spec: HtmlSpec, content: string): string => {
    const attributes = attributeEntries(spec.attrs)
        .map(([name, value]) => ` ${name}="${escapeAttribute(value)}"`)
        .join('');
    if (VOID_ELEMENTS.has(spec.tag)) {
        // Self-closed, which HTML and XHTML-minded email clients both read.
        return `<${spec.tag}${attributes}/>`;
    }
    const open = `<${spec.tag}${attributes}>`;
    const { children } = spec;
    let inner = '';
    if (children === true) {
        inner = content;
    } else if (typeof children === 'string') {
        inner = escapeText(children);
    } else if (children) {
        inner = children
            .map((child) => (typeof child === 'string' ? escapeText(child) : specToString(child, content)))
            .join('');
    }
    return `${open}${inner}</${spec.tag}>`;
};

const nodeToString = (node: DrawnNode): string => {
    if (typeof node === 'string') {
        return escapeText(node);
    }
    if (node.kind === 'component') {
        throw new Error('Export draws from `toHtml` only; a `render.component` cannot be written as HTML.');
    }
    return specToString(node.spec, node.content.map(nodeToString).join(''));
};

export const toHtmlString = (nodes: readonly DrawnNode[]): string => nodes.map(nodeToString).join('');
