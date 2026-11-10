/* (c) Copyright Frontify Ltd., all rights reserved. */

// Export without the stylesheet: each node's looks written into its own `style`,
// from what the plugins declared for the classes it carries.

import { type HtmlSpec, type StyleMap } from '#/core';

import { type DrawnNode } from './documentTree';

const CLASS_SEPARATOR = /\s+/;

/** The style of every class the element carries that has one, later classes over earlier. */
const classStyle = (className: string, contentStyles: Record<string, StyleMap>): StyleMap | undefined => {
    let merged: StyleMap | undefined;
    for (const name of className.split(CLASS_SEPARATOR)) {
        // Own keys only: a class named `constructor` is not a style.
        if (Object.prototype.hasOwnProperty.call(contentStyles, name)) {
            merged = { ...merged, ...contentStyles[name] };
        }
    }
    return merged;
};

/** The spec with its classes' styles under its own `style`, so alignment and a font colour still win. */
const inlineSpec = (spec: HtmlSpec, contentStyles: Record<string, StyleMap>): HtmlSpec => {
    const className = spec.attrs?.class;
    if (className === undefined) {
        return spec;
    }
    const looked = classStyle(className, contentStyles);
    if (looked === undefined) {
        return spec;
    }
    return { ...spec, attrs: { ...spec.attrs, style: { ...looked, ...spec.attrs?.style } } };
};

const inlineNode = (node: Exclude<DrawnNode, string>, contentStyles: Record<string, StyleMap>): DrawnNode => {
    switch (node.kind) {
        case 'html':
            return {
                kind: 'html',
                spec: inlineSpec(node.spec, contentStyles),
                content: inlineLooks(node.content, contentStyles),
            };
        case 'component':
            return { ...node, content: inlineLooks(node.content, contentStyles) };
    }
};

/**
 * The nodes with each element's looks written into its `style`, the classes left in place.
 *
 * @param contentStyles - The style of each class, by class name (`registry.contentStyles`).
 */
export const inlineLooks = (nodes: readonly DrawnNode[], contentStyles: Record<string, StyleMap>): DrawnNode[] =>
    nodes.map((node) => {
        if (typeof node === 'string') {
            return node;
        }
        return inlineNode(node, contentStyles);
    });
