/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { RichTextReader } from '#/entries/reader';
import {
    type ContentModel,
    type ContentNodeJSON,
    type Diagnostic,
    type FeatureDeclaration,
    type JsonValue,
    type RichTextDocument,
} from '#/model';

/** Every node and mark type the content holds. */
export const typesIn = (node: ContentNodeJSON, types: Set<string>): Set<string> => {
    types.add(node.type);
    for (const mark of node.marks ?? []) {
        types.add(mark.type);
    }
    for (const child of node.content ?? []) {
        typesIn(child, types);
    }
    return types;
};

/**
 * The shared attributes of `declaration` that the content sets to a value other than their default, on a node the
 * attribute targets: one it lists, or any textblock for `'textblocks'`.
 */
export const setAttributesIn = (
    node: ContentNodeJSON,
    declaration: FeatureDeclaration,
    isTextblock: (type: string) => boolean,
    found: Set<string>,
): Set<string> => {
    for (const [name, shared] of Object.entries(declaration.attributes ?? {})) {
        let targeted: boolean;
        if (shared.on === 'textblocks') {
            targeted = isTextblock(node.type);
        } else {
            targeted = shared.on.includes(node.type);
        }
        if (!targeted) {
            continue;
        }
        let fallback: JsonValue | undefined;
        if ('default' in shared.value) {
            fallback = shared.value.default as JsonValue;
        }
        const value = node.attrs?.[name];
        if (value !== undefined && JSON.stringify(value) !== JSON.stringify(fallback)) {
            found.add(name);
        }
    }
    for (const child of node.content ?? []) {
        setAttributesIn(child, declaration, isTextblock, found);
    }
    return found;
};

export type SharedDefault = {
    readonly name: string;
    readonly on: readonly string[] | 'textblocks';
    readonly fallback: JsonValue;
};

/**
 * `node` with each attribute that a feature of the model adds to its type and that it leaves out, at its default: a
 * fixture written for its own feature holds no attribute that another feature of the model adds.
 */
export const withSharedDefaults = (
    node: ContentNodeJSON,
    shared: readonly SharedDefault[],
    isTextblock: (type: string) => boolean,
): ContentNodeJSON => {
    const attrs: Record<string, JsonValue> = {};
    for (const [name, value] of Object.entries(node.attrs ?? {})) {
        attrs[name] = value;
    }
    let added = false;
    for (const { name, on, fallback } of shared) {
        const targeted = on === 'textblocks' ? isTextblock(node.type) : on.includes(node.type);
        if (targeted && !Object.hasOwn(attrs, name)) {
            attrs[name] = fallback;
            added = true;
        }
    }
    const copy: Record<string, unknown> = { ...node };
    if (added) {
        copy.attrs = attrs;
    }
    if (node.content !== undefined) {
        copy.content = node.content.map((child) => withSharedDefaults(child, shared, isTextblock));
    }
    // The copy is built by spreading fixture JSON, which the node type cannot express.
    return copy as unknown as ContentNodeJSON;
};

/** Collapses each whitespace run to one space, outside `pre`, whose text keeps every character. */
export const normalized = (html: string) =>
    html
        .split(/(<pre[\s>][\s\S]*?<\/pre>)/)
        .map((part, index) => {
            if (index % 2 === 1) {
                return part;
            }
            return part.replaceAll(/\s+/g, ' ');
        })
        .join('')
        .trim();

// Screen-reader-only text holds text alone, so its element closes before any other tag opens.
const HIDDEN_TEXT = /<(\w+)(?:\s[^>]*)?\sdata-rte-hidden-text(?:="[^"]*")?(?:\s[^>]*)?>[^<]*<\/\1>/g;

/** The reader's markup without its visually hidden text, which `toHTML` leaves out so pasted output adds no text. */
export const withoutHiddenText = (markup: string) => markup.replaceAll(HIDDEN_TEXT, '');

/** The reader's static markup of a document, with the diagnostics it reported. */
export const readerOutput = (document: RichTextDocument, model: ContentModel) => {
    const diagnostics: Diagnostic[] = [];
    const reader = createElement(RichTextReader, {
        document,
        model,
        onDiagnostic: (diagnostic) => diagnostics.push(diagnostic),
    });
    return { markup: renderToStaticMarkup(reader), diagnostics };
};
