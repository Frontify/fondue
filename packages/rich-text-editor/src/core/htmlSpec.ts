/* (c) Copyright Frontify Ltd., all rights reserved. */

// The static markup a node becomes (editor, readonly view, export, copy), as a
// plain description rather than DOM or React, so every surface reads the same thing.

/** CSS properties by their CSS name: `{ 'text-align': 'center' }`. */
export type StyleMap = Record<string, string>;

/** The attributes markup may carry. Closed on purpose: every surface maps them to its own form, and a short list can't be read differently. */
export type HtmlAttributes = {
    class?: string;
    style?: StyleMap;
    href?: string;
    src?: string;
    alt?: string;
    title?: string;
    target?: string;
    rel?: string;
    type?: string;
    role?: string;
    id?: string;
    /** As HTML spells it; the readonly view passes it to React as `tabIndex`. */
    tabindex?: string;
    /** Boolean attributes: present when true, absent otherwise. */
    checked?: boolean;
    disabled?: boolean;
    [data: `data-${string}`]: string | undefined;
    [aria: `aria-${string}`]: string | undefined;
};

/**
 * One element. `children: true` is where the node's content goes (the text of
 * a paragraph, the items of a list); a string, or a mix of strings and nested
 * elements, is fixed content — a mention's `@jane`.
 */
export type HtmlSpec = {
    tag: keyof HTMLElementTagNameMap;
    attrs?: HtmlAttributes;
    children?: true | string | readonly (HtmlSpec | string)[];
};

/** A property name as CSS writes one, custom properties (`--rte-columns`) included. */
const CSS_PROPERTY = /^-{0,2}[a-zA-Z][a-zA-Z0-9-]*$/;

/**
 * What could end a declaration, open a rule, load a resource or leave the
 * attribute. Values come from stored documents (a font colour), so this is a
 * backstop behind each plugin's own checks, not the only one.
 */
const UNSAFE_CSS_VALUE = /[;{}\\<]|url\(|expression\(/i;

/**
 * The declarations safe to write: a property that is a property name, a value
 * that cannot break out of its declaration. The rest are dropped. Every
 * surface (DOM, HTML string, React) reads the style through this.
 */
export const safeStyleEntries = (style: StyleMap): [string, string][] =>
    Object.entries(style).filter(
        ([property, value]) =>
            CSS_PROPERTY.test(property) && typeof value === 'string' && !UNSAFE_CSS_VALUE.test(value),
    );

/** `{ 'text-align': 'center' }` → `text-align: center;`, the way browsers write a style attribute. */
export const cssText = (style: StyleMap): string =>
    safeStyleEntries(style)
        .map(([property, value]) => `${property}: ${value};`)
        .join(' ');

/**
 * The attributes as DOM and HTML strings spell them: style as CSS text, a true
 * boolean as `''`, false or undefined left out. Shared by engine and HTML printer.
 */
export const attributeEntries = (attrs: HtmlAttributes = {}): [string, string][] =>
    Object.entries(attrs).flatMap(([name, value]): [string, string][] => {
        if (value === undefined || value === false) {
            return [];
        }
        if (value === true) {
            return [[name, '']];
        }
        if (name === 'style') {
            const text = cssText(value as StyleMap);
            return text === '' ? [] : [[name, text]];
        }
        return [[name, value as string]];
    });

/** Merges styles onto the outermost element, so a block-wide attribute (alignment) lands without the block knowing. */
export const withRootStyle = (spec: HtmlSpec, style: StyleMap): HtmlSpec =>
    Object.keys(style).length === 0
        ? spec
        : { ...spec, attrs: { ...spec.attrs, style: { ...spec.attrs?.style, ...style } } };
