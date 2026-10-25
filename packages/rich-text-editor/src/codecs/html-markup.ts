/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HtmlSpec } from '#/model';
import { type HtmlTemplate } from '#/model/html-spec';
import { VOID_TAGS, writesAttribute } from '#/model/output';
import { isStyleAttribute } from '#/model/values';

const ESCAPES: Readonly<Record<string, string>> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
};

/** Escapes text and attribute values as React's server renderer does, so the output equals the reader's markup. */
export const escapeHtml = (text: string): string => text.replaceAll(/[&<>"']/g, (char) => ESCAPES[char] ?? char);

/** The `style` text a spec writes, serialized as React serializes the reader's style object. */
const styleText = (text: string): string => {
    const style = new Map<string, string>();
    for (const declaration of text.split(';')) {
        const colon = declaration.indexOf(':');
        if (colon > 0) {
            const name = declaration.slice(0, colon).trim();
            let property = name;
            if (!name.startsWith('--')) {
                property = name
                    .replaceAll(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
                    .replaceAll(/([A-Z])/g, '-$1')
                    .toLowerCase();
            }
            const value = declaration.slice(colon + 1).trim();
            style.delete(property);
            if (value !== '') {
                style.set(property, value);
            }
        }
    }
    return [...style].map(([property, value]) => `${property}:${value}`).join(';');
};

const attributes = (attrs: Readonly<Record<string, string>>): string => {
    let written = '';
    for (const [name, value] of Object.entries(attrs)) {
        // A name that would run as an event handler is never written.
        if (!writesAttribute(name)) {
            continue;
        }
        let text = value;
        if (isStyleAttribute(name)) {
            text = styleText(value);
            if (text === '') {
                continue;
            }
        }
        written += ` ${name}="${escapeHtml(text)}"`;
    }
    return written;
};

/** The elements of a resolved spec around `inner`; a leaf spec, or a void element, drops it. */
export const build = (template: HtmlTemplate, inner: string): string => {
    let html = '';
    if (template.content) {
        html = inner;
    }
    for (const layer of [...template.layers].reverse()) {
        if (VOID_TAGS.has(layer.tag)) {
            html = `<${layer.tag}${attributes(layer.attrs)}/>`;
        } else {
            html = `<${layer.tag}${attributes(layer.attrs)}>${html}</${layer.tag}>`;
        }
    }
    return html;
};

/** An override's spec may not bind a stored value to `style`, as compilation checks for declared specs. */
export const checkOverrideSpec = (spec: HtmlSpec): void => {
    const [, second, third] = spec;
    let content: unknown = second;
    if (typeof second === 'object' && !Array.isArray(second)) {
        content = third;
        for (const [name, value] of Object.entries(second)) {
            if (isStyleAttribute(name) && typeof value !== 'string') {
                throw new TypeError(`a codec override binds ${name}`);
            }
        }
    }
    if (Array.isArray(content)) {
        checkOverrideSpec(content as unknown as HtmlSpec);
    }
};

// Elements that run script, load a document or resource, or post data; an override may write none of them.
const UNSAFE_TAGS = new Set('script style iframe object embed template meta link base form'.split(' '));
const TAG_NAME = /^[a-z][a-z0-9-]*$/;

/** An override's elements must be plain HTML names outside `UNSAFE_TAGS`, which declared specs never reach unchecked. */
export const checkOverrideTags = (template: HtmlTemplate): void => {
    for (const { tag } of template.layers) {
        if (!TAG_NAME.test(tag) || UNSAFE_TAGS.has(tag)) {
            throw new TypeError(`a codec override writes ${tag}`);
        }
    }
};
