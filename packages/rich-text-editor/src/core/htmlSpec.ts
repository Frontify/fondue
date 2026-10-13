/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The static markup a node becomes: what the editor draws for it, what the
 * readonly view shows by default, and what export and copy write out. A plain
 * description rather than DOM or React, so every surface reads the same thing.
 */

/** CSS properties by their CSS name: `{ 'text-align': 'center' }`. */
export type StyleMap = Record<string, string>;

/**
 * The attributes markup may carry. A closed list on purpose: every surface
 * turns these into its own form (DOM attributes, React props, an HTML string),
 * and a short list is one they cannot disagree on. Adding one is a change here
 * and in `renderer/toReact.ts`.
 */
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

/** `{ 'text-align': 'center' }` → `text-align: center;`, the way browsers write a style attribute. */
export const cssText = (style: StyleMap): string =>
    Object.entries(style)
        .map(([property, value]) => `${property}: ${value};`)
        .join(' ');

/**
 * The attributes as the DOM and HTML strings spell them: the style joined into
 * CSS text, a boolean attribute present as `''` or left out, an undefined one
 * left out. The engine and the HTML printer both write exactly this.
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

/**
 * Styles that land on the outermost element of a node's markup — how an
 * attribute every text block carries (alignment) reaches whatever element the
 * block renders, without the block knowing about it.
 */
export const withRootStyle = (spec: HtmlSpec, style: StyleMap): HtmlSpec =>
    Object.keys(style).length === 0
        ? spec
        : { ...spec, attrs: { ...spec.attrs, style: { ...spec.attrs?.style, ...style } } };
