/* (c) Copyright Frontify Ltd., all rights reserved. */

// The static markup a node becomes (editor, readonly view, export, copy), as a
// plain description rather than DOM or React, so every surface reads the same thing.

import { warnOnce } from './warnings';

/** CSS properties by their CSS name: `{ 'text-align': 'center' }`. */
export type StyleMap = Record<string, string>;

/** Any HTML attribute by its name. `true` writes a boolean attribute, and `false` or `undefined` leaves it out. */
export type HtmlAttributes = { class?: string; style?: StyleMap } & Record<
    string,
    string | boolean | StyleMap | undefined
>;

/**
 * One element. `children: true` is where the node's content goes (the text of
 * a paragraph, the items of a list); a string, or a mix of strings and nested
 * elements, is fixed content, for example a mention's `@jane`.
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
 * attribute. Values come from stored documents (for example, a font colour), so this is a
 * backstop behind each plugin's own checks, not the only one.
 */
const UNSAFE_CSS_VALUE = /[;{}\\<]|url\(|expression\(/i;

/** Whether a value cannot break out of its declaration. */
export const isSafeCssValue = (value: string): boolean => !UNSAFE_CSS_VALUE.test(value);

/**
 * The declarations safe to write: a property that is a property name, a value
 * that cannot break out of its declaration. The rest are dropped. Every
 * surface (DOM, HTML string, React) reads the style through this.
 */
export const safeStyleEntries = (style: StyleMap): [string, string][] =>
    Object.entries(style).filter(
        ([property, value]) => CSS_PROPERTY.test(property) && typeof value === 'string' && isSafeCssValue(value),
    );

/** `{ 'text-align': 'center' }` → `text-align: center;`, the way browsers write a style attribute. */
export const cssText = (style: StyleMap): string =>
    safeStyleEntries(style)
        .map(([property, value]) => `${property}: ${value};`)
        .join(' ');

/** Lowercase only, so `OnClick` cannot pass the `on` check. */
const ATTRIBUTE_NAME = /^[a-z][a-z0-9-]*$/;

/** Event-handler attributes (`onclick`) run script, so no markup may carry one. */
const EVENT_HANDLER_PREFIX = 'on';

const STYLE_ATTRIBUTE = 'style';

export type CheckedAttribute =
    | { kind: 'text'; name: string; value: string }
    | { kind: 'flag'; name: string }
    | { kind: 'style'; name: string; value: StyleMap };

const isStyleMap = (value: unknown): value is StyleMap =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const attributeError = (name: string, tag: string, reason: string): TypeError =>
    new TypeError(`Attribute "${name}" on <${tag}> ${reason}.`);

/** A stored value is data, not an author mistake, so a bad one is left out and the document still draws. */
const skippedAttribute = (name: string, tag: string, value: unknown): undefined => {
    warnOnce(
        `attribute-value:${tag}:${name}`,
        `Attribute "${name}" on <${tag}> was left out: its value is not a string, a number, a boolean or, for style, a map of CSS properties.`,
        value,
    );
    return undefined;
};

const checkedAttribute = (name: string, storedValue: unknown, tag: string): CheckedAttribute | undefined => {
    if (storedValue === undefined || storedValue === null || storedValue === false) {
        return undefined;
    }
    if (name === STYLE_ATTRIBUTE) {
        if (!isStyleMap(storedValue)) {
            return skippedAttribute(name, tag, storedValue);
        }
        return { kind: 'style', name, value: storedValue };
    }
    if (typeof storedValue === 'string') {
        return { kind: 'text', name, value: storedValue };
    }
    if (typeof storedValue === 'number' && Number.isFinite(storedValue)) {
        return { kind: 'text', name, value: String(storedValue) };
    }
    if (storedValue === true) {
        return { kind: 'flag', name };
    }
    return skippedAttribute(name, tag, storedValue);
};

/**
 * One check for every surface (DOM, HTML string, React). A bad name throws,
 * because it is an author mistake. A bad value is left out.
 */
export const checkedAttributes = (tag: string, attrs: HtmlAttributes = {}): CheckedAttribute[] => {
    const checked: CheckedAttribute[] = [];
    for (const [name, value] of Object.entries(attrs)) {
        if (!ATTRIBUTE_NAME.test(name) || name.startsWith(EVENT_HANDLER_PREFIX)) {
            throw attributeError(name, tag, 'is not a valid attribute name');
        }
        const attribute = checkedAttribute(name, value, tag);
        if (attribute !== undefined) {
            checked.push(attribute);
        }
    }
    return checked;
};

/** The checked attributes as the DOM and HTML strings spell them, for the engine and the HTML printer. */
export const attributeEntries = (tag: string, attrs?: HtmlAttributes): [string, string][] => {
    const entries: [string, string][] = [];
    for (const attribute of checkedAttributes(tag, attrs)) {
        switch (attribute.kind) {
            case 'text':
                entries.push([attribute.name, attribute.value]);
                break;
            case 'flag':
                entries.push([attribute.name, '']);
                break;
            case 'style': {
                const text = cssText(attribute.value);
                if (text !== '') {
                    entries.push([attribute.name, text]);
                }
                break;
            }
        }
    }
    return entries;
};

/** Merges styles onto the outermost element, so a block-wide attribute (for example, alignment) lands without the block knowing. */
export const withRootStyle = (spec: HtmlSpec, style: StyleMap): HtmlSpec =>
    Object.keys(style).length === 0
        ? spec
        : { ...spec, attrs: { ...spec.attrs, style: { ...spec.attrs?.style, ...style } } };
