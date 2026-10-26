/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Properties as CssProperties } from 'csstype';

import { sha256 } from './hash';
import { drawsBox } from './stylesBox';
import { isRecord, ownValue } from './values';

/** Resting declarations are csstype's `Properties<string | number>`. `hover` is optional and is not a CSS property. */
export type StyleRecipe = CssProperties<string | number> & {
    readonly hover?: CssProperties<string | number>;
};
/** A named style a host offers for paragraphs, headings or links, with the recipe that draws it. */
export type PresentationStyle = {
    readonly id: string;
    readonly label: string;
    readonly appliesTo: readonly ('paragraph' | 'heading' | 'link')[];
    readonly deprecated: boolean;
    readonly recipe: StyleRecipe;
};
/** A named colour a host offers, stored by id, with its label and the colour it resolves to. */
export type ColorToken = {
    /** Stored as `tokenId`. */
    readonly id: string;
    /** The swatch's accessible name. */
    readonly label: string;
    /** CSS colour for rendering and contrast checks. */
    readonly value: string;
    readonly usage: readonly ('font_color' | 'highlight')[];
};

/** A recipe as the editor, the reader and `toHTML` apply it: its class in the generated stylesheet and its checked declarations. */
export type ResolvedStyle = {
    readonly className: string;
    /** Resting declarations as CSS property and value, in recipe order. */
    readonly declarations: readonly (readonly [string, string])[];
    readonly hover: readonly (readonly [string, string])[];
};
/** The result of looking up a stored style id: the style to apply and whether a default replaced it. */
export type StyleResolution = {
    /** The recipe to apply, or `undefined` for the node type's own look. */
    readonly style: ResolvedStyle | undefined;
    /** The stored ID is missing from the styles or deprecated, so the default style applies in its place. */
    readonly unknown: boolean;
};

/** The feature that adds `styleId`, which the unknown-style diagnostic names. */
export const STYLES_FEATURE = 'styles.brand';
const CLASS_PREFIX = 'rte-style-';
// The style IDs that style every node of their type whose `styleId` is null.
const DEFAULT_STYLE_IDS: Readonly<Record<string, string>> = { paragraph: 'paragraph', link: 'link' };

// React's unitless properties, so a number recipe value reads as it does in a React `style` prop.
const UNITLESS = new Set(
    (
        'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup ' +
        'boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea ' +
        'gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight ' +
        'lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity ' +
        'stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth'
    ).split(' '),
);
// CSS functions a recipe value may call: none of them loads a resource.
const FUNCTIONS = new Set(
    (
        'rgb rgba hsl hsla hwb lab lch oklab oklch color color-mix light-dark var calc min max clamp env ' +
        'linear-gradient radial-gradient conic-gradient repeating-linear-gradient repeating-radial-gradient ' +
        'repeating-conic-gradient cubic-bezier steps translate translatex translatey rotate scale skew matrix'
    ).split(' '),
);
const PROPERTY = /^(?:Webkit|Moz|ms)?[a-zA-Z]+$/;
const VALUE = /^[\w #%.,+\-/()!'"]*$/;

/** `fontSize` as `font-size`, and the vendor forms `WebkitBackgroundClip` and `msFlex` as `-webkit-background-clip` and `-ms-flex`. */
const cssProperty = (name: string): string | undefined => {
    if (!PROPERTY.test(name) || name === 'hover') {
        return undefined;
    }
    let property = name.replaceAll(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    if (name.startsWith('ms')) {
        property = `-${property}`;
    }
    return property;
};

/** Whether every quote closes, every parenthesis pairs, and every function is one that loads nothing. */
const balanced = (value: string): boolean => {
    let depth = 0;
    let quote: string | undefined;
    for (const char of value) {
        if (quote !== undefined) {
            if (char === quote) {
                quote = undefined;
            }
            continue;
        }
        if (char === '"' || char === "'") {
            quote = char;
        } else if (char === '(') {
            depth += 1;
        } else if (char === ')') {
            depth -= 1;
            if (depth < 0) {
                return false;
            }
        }
    }
    if (quote !== undefined || depth !== 0) {
        return false;
    }
    const unquoted = value.replaceAll(/"[^"]*"|'[^']*'/g, '');
    for (const [, name] of unquoted.matchAll(/([\w-]*)\(/g)) {
        if (name === undefined || !FUNCTIONS.has(name.toLowerCase())) {
            return false;
        }
    }
    return !unquoted.includes('!');
};

/** A host CSS value as the text a stylesheet or `style` attribute may hold, or `undefined` when it could escape its declaration or load a resource. */
export const cssValue = (property: string, value: unknown): string | undefined => {
    if (typeof value === 'number') {
        if (!Number.isFinite(value)) {
            return undefined;
        }
        if (value === 0 || UNITLESS.has(property)) {
            return String(value);
        }
        return `${value}px`;
    }
    if (typeof value !== 'string') {
        return undefined;
    }
    const text = value.trim();
    if (text === '' || !VALUE.test(text) || text.includes('/*') || !balanced(text)) {
        return undefined;
    }
    return text;
};

// A recipe styles text in the content flow, so it never places, layers or transforms its element.
const PLACING = new Set(
    (
        'position inset inset-block inset-block-start inset-block-end inset-inline inset-inline-start ' +
        'inset-inline-end top right bottom left z-index transform translate rotate scale'
    ).split(' '),
);
// `before`, `after`, `start` and `end` are the legacy WebKit names of the logical margins, which browsers still alias.
const MARGIN =
    /^margin(?:-(?:top|right|bottom|left|block|inline|block-start|block-end|inline-start|inline-end|before|after|start|end))?$/;
// Only `auto` and non-negative lengths, since a function or a variable may still resolve below zero.
const NON_NEGATIVE = /^(?:auto|[\d.]+(?:[a-z]+|%)?)(?:\s+(?:auto|[\d.]+(?:[a-z]+|%)?))*$/i;

/** Whether a checked declaration may stay: none positions or transforms its element or pulls it over its neighbours. */
const allowed = (property: string, text: string): boolean => {
    const unprefixed = property.replace(/^-(?:webkit|moz|ms)-/, '');
    if (PLACING.has(unprefixed)) {
        return false;
    }
    return !MARGIN.test(unprefixed) || NON_NEGATIVE.test(text);
};

/** The recipe name, CSS property and value of each declaration that passes `cssValue` and `allowed`, in recipe order. */
const entriesOf = (recipe: object): [string, string, string][] => {
    const entries: [string, string, string][] = [];
    for (const [name, value] of Object.entries(recipe)) {
        const property = cssProperty(name);
        const text = cssValue(name, value);
        if (property !== undefined && text !== undefined && allowed(property, text)) {
            entries.push([name, property, text]);
        }
    }
    return entries;
};

/** The declarations of a recipe that pass `cssValue` and `allowed`, in recipe order; any other is dropped. */
const declarationsOf = (recipe: object): [string, string][] =>
    entriesOf(recipe).map(([, property, text]) => [property, text]);

const resolved = (recipe: StyleRecipe, link: boolean): ResolvedStyle => {
    const entries = entriesOf(recipe);
    let declarations = entries.map(([, property, text]): [string, string] => [property, text]);
    // A link stays underlined unless the look it renders with gives a cue other than colour.
    if (link && !drawsBox(Object.fromEntries(entries.map(([name, , text]) => [name, text])))) {
        declarations = declarations.filter(([property]) => property !== 'text-decoration-line');
        declarations.push(['text-decoration-line', 'underline']);
    }
    let hover: [string, string][] = [];
    if (typeof recipe.hover === 'object' && recipe.hover !== null) {
        hover = declarationsOf(recipe.hover);
    }
    const key = JSON.stringify([declarations, hover]);
    return { className: `${CLASS_PREFIX}${sha256(key).slice(0, 12)}`, declarations, hover };
};

/**
 * Whether a host `styles` entry can resolve: an object whose `recipe` is one; any other entry is skipped.
 * Public so the shipped features and the core share it.
 */
export const isPresentationStyle = (style: unknown): style is PresentationStyle =>
    isRecord(style) && typeof style.id === 'string' && Array.isArray(style.appliesTo) && isRecord(style.recipe);

const usable = (styles: readonly PresentationStyle[], id: string): PresentationStyle | undefined =>
    styles.find((style) => isPresentationStyle(style) && style.id === id && style.deprecated !== true);

/** The node and mark types the style `id` applies to, or `undefined` when the styles hold no such style. */
export const appliesToOf = (styles: readonly PresentationStyle[], id: string): readonly string[] | undefined =>
    styles.find((style) => isPresentationStyle(style) && style.id === id)?.appliesTo;

/**
 * The style a node or mark of `target` renders with: the style `styleId` names, else, for a null or unknown ID, the
 * `paragraph` style on a paragraph and the `link` style on a link. A link recipe gets `text-decoration-line: underline`
 * unless it draws a box.
 */
export const resolveStyle = (
    styles: readonly PresentationStyle[],
    target: string,
    styleId: string | null,
): StyleResolution => {
    const link = target === 'link';
    let unknown = false;
    if (styleId !== null) {
        const found = usable(styles, styleId);
        if (found !== undefined) {
            return { style: resolved(found.recipe, link), unknown };
        }
        unknown = true;
    }
    const defaultId = ownValue(DEFAULT_STYLE_IDS, target);
    let fallback: PresentationStyle | undefined;
    if (defaultId !== undefined) {
        fallback = usable(styles, defaultId);
    }
    if (fallback === undefined) {
        return { style: undefined, unknown };
    }
    return { style: resolved(fallback.recipe, link), unknown };
};

const block = (declarations: readonly (readonly [string, string])[]) =>
    declarations.map(([property, value]) => `${property}:${value}`).join(';');

/** The resting declarations as `style` attribute text. */
export const inlineStyleText = (style: ResolvedStyle): string => block(style.declarations);

/** One stylesheet with a class for every recipe the styles can render, with its `hover` rule; empty for no styles. */
export const styleSheetOf = (styles: readonly PresentationStyle[]): string => {
    const rules = new Map<string, string>();
    for (const style of styles) {
        if (!isPresentationStyle(style) || style.deprecated === true) {
            continue;
        }
        for (const link of [false, true]) {
            const { className, declarations, hover } = resolved(style.recipe, link);
            if (rules.has(className)) {
                continue;
            }
            let css = `.${className}{${block(declarations)}}`;
            if (hover.length > 0) {
                css += `.${className}:hover{${block(hover)}}`;
            }
            rules.set(className, css);
        }
    }
    return [...rules.values()].join('\n');
};

/** The colour a `font_color` or `highlight` renders with: its literal `value`, else its token's value; `undefined` when neither resolves to a safe value. */
export const colorOf = (
    tokens: readonly ColorToken[],
    attrs: { readonly tokenId?: unknown; readonly value?: unknown },
): string | undefined => {
    if (typeof attrs.value === 'string') {
        return cssValue('color', attrs.value);
    }
    if (typeof attrs.tokenId !== 'string') {
        return undefined;
    }
    const token = tokens.find(({ id }) => id === attrs.tokenId);
    if (token === undefined) {
        return undefined;
    }
    return cssValue('color', token.value);
};
