/* (c) Copyright Frontify Ltd., all rights reserved. */

// The static markup a node becomes (editor, readonly view, export, copy), as a
// plain description rather than DOM or React, so every surface reads the same thing.

/** CSS properties by their CSS name: `{ 'text-align': 'center' }`. */
export type StyleMap = Record<string, string>;

/** The attributes markup may carry: `class` and `style` by name, any other HTML attribute by its name; true writes a boolean attribute, false or undefined leaves it out. */
export type HtmlAttributes = { class?: string; style?: StyleMap } & Record<
    string,
    string | boolean | StyleMap | undefined
>;

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

/** An attribute name as HTML spells it here: lowercase letters, digits and hyphens, starting with a letter. */
const ATTRIBUTE_NAME = /^[a-z][a-z0-9-]*$/;

/** Event-handler attributes (`onclick`) run script, so no markup may carry one. */
const EVENT_HANDLER_PREFIX = 'on';

const STYLE_ATTRIBUTE = 'style';

/** One attribute that passed `checkedAttributes`, by what it holds. */
export type CheckedAttribute =
    | { kind: 'text'; name: string; value: string }
    /** A boolean attribute, present. */
    | { kind: 'flag'; name: string }
    | { kind: 'style'; name: string; value: StyleMap };

const isStyleMap = (value: unknown): value is StyleMap =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const attributeError = (name: string, tag: string, reason: string): TypeError =>
    new TypeError(`Attribute "${name}" on <${tag}> ${reason}.`);

const checkedAttribute = (
    name: string,
    value: string | boolean | StyleMap,
    tag: string,
): CheckedAttribute | undefined => {
    if (name === STYLE_ATTRIBUTE) {
        if (!isStyleMap(value)) {
            throw attributeError(name, tag, 'must be a map of CSS properties');
        }
        return { kind: 'style', name, value };
    }
    if (typeof value === 'string') {
        return { kind: 'text', name, value };
    }
    if (value === true) {
        return { kind: 'flag', name };
    }
    if (value === false) {
        return undefined;
    }
    throw attributeError(name, tag, 'must be a string or a boolean');
};

/**
 * The attributes an element is written with, checked once for every surface
 * (engine DOM, HTML string, React). A name that is no lowercase attribute name,
 * or starts with `on`, throws; so does `style` holding anything but a map of
 * CSS properties. An undefined or false value leaves the attribute out.
 */
export const checkedAttributes = (tag: string, attrs: HtmlAttributes = {}): CheckedAttribute[] => {
    const checked: CheckedAttribute[] = [];
    for (const [name, value] of Object.entries(attrs)) {
        if (!ATTRIBUTE_NAME.test(name) || name.startsWith(EVENT_HANDLER_PREFIX)) {
            throw attributeError(name, tag, 'is not a valid attribute name');
        }
        if (value === undefined) {
            continue;
        }
        const attribute = checkedAttribute(name, value, tag);
        if (attribute !== undefined) {
            checked.push(attribute);
        }
    }
    return checked;
};

/**
 * The attributes as DOM and HTML strings spell them: style as CSS text, a true
 * boolean as `''`, false or undefined left out. Shared by engine and HTML printer.
 */
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

/** Merges styles onto the outermost element, so a block-wide attribute (alignment) lands without the block knowing. */
export const withRootStyle = (spec: HtmlSpec, style: StyleMap): HtmlSpec =>
    Object.keys(style).length === 0
        ? spec
        : { ...spec, attrs: { ...spec.attrs, style: { ...spec.attrs?.style, ...style } } };
