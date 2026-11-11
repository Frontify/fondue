/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type ParseRule as PmParseRule,
    type StyleParseRule as PmStyleParseRule,
    type TagParseRule,
} from 'prosemirror-model';

import {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type MarkClearRule,
    type MarkParseRule,
    type ParseRule,
    type StyleParseRule,
} from '#/core';

import { VALUE_ATTR } from './documentConversion';

// Turns each plugin's `parse` rules into the engine's `parseDOM`, once at mount.

/**
 * Priorities for rules that match the same element; the engine otherwise tries
 * equal priorities in schema order. An inline element's markup may also match a
 * mark's rule (a mention `<a href data-mention-id>` matches a link's `a[href]`),
 * so inline rules outrank mark rules.
 */
export const MARK_PRIORITY = 60;
export const INLINE_PRIORITY = 70;

/**
 * A qualified selector (`p[data-text-style=imageCaption]`, `ul[data-check-list]`)
 * outranks a bare tag. Otherwise the paragraph baseline, registered first,
 * claims every pasted `<p>` and `<ul>` and drops text styles and check marks.
 */
const qualifiedPriority = (tag: string): number | undefined => (/[[.#:]/.test(tag) ? MARK_PRIORITY : undefined);

/** Mark and inline rules keep their whole value in one attribute; a null value means "not this node". */
const valueAttrs = (value: unknown) => (value === null ? false : { [VALUE_ATTR]: value });

const valueParseRule = (rule: ParseRule<unknown>, priority: number): TagParseRule => ({
    tag: rule.tag,
    priority,
    getAttrs: (element: HTMLElement) => valueAttrs(rule.value ? rule.value(element) : {}),
});

export const valueParseRules = (rules: readonly ParseRule<unknown>[], priority: number): TagParseRule[] =>
    rules.map((rule) => valueParseRule(rule, priority));

/**
 * A style an element shows by default is not formatting when it sits in that element:
 * Word and Google Docs underline a link's text and bold a heading's text in a span.
 * `strip` removes what the enclosing element already shows from the declared value.
 */
type DefaultStyle = {
    property: string;
    /** The enclosing elements that show the style by default. */
    within: string;
    strip: RegExp;
};

/**
 * What an enclosing element already shows by default: a link's underline, a heading's bold. Pasted text repeating it is not formatting.
 */
const DEFAULT_STYLES: readonly DefaultStyle[] = [
    { property: 'text-decoration', within: 'a', strip: /\bunderline\b/gi },
    { property: 'text-decoration-line', within: 'a', strip: /\bunderline\b/gi },
    { property: 'font-weight', within: 'h1, h2, h3, h4, h5, h6, th', strip: /^\s*(?:bold|bolder|[6-9]00)\s*$/i },
];

const declaredValue = (element: HTMLElement, property: string): string => {
    let value = element.style.getPropertyValue(property);
    for (const defaults of DEFAULT_STYLES) {
        if (defaults.property === property && element.closest(defaults.within) !== null) {
            value = value.replace(defaults.strip, '');
        }
    }
    return value;
};

/**
 * ProseMirror style rules only see the CSS value, not the element, so a style rule
 * is a tag rule on any styled element that reads the declared value itself.
 */
const markStyleRule = (rule: StyleParseRule<unknown>): TagParseRule => ({
    tag: '[style]',
    priority: MARK_PRIORITY,
    // One declaration, such as `text-decoration: underline line-through`, can set two marks.
    consuming: false,
    getAttrs: (element: HTMLElement) => {
        const cssValue = declaredValue(element, rule.style);
        if (cssValue.trim() === '') {
            return false;
        }
        return valueAttrs(rule.value ? rule.value(cssValue) : {});
    },
});

const markClearRule = (type: string, rule: MarkClearRule): PmStyleParseRule => ({
    style: rule.style,
    priority: MARK_PRIORITY,
    consuming: false,
    clearMark: (mark) => mark.type.name === type,
    // Null makes the rule match with no attributes; false skips it.
    getAttrs: (cssValue: string) => (rule.clears(cssValue) ? null : false),
});

/**
 * A mark's rules: tag and style rules put it on with its value, clear rules take it off the element's content, ignore rules drop the element.
 */
export const markParseRules = (type: string, rules: readonly MarkParseRule<unknown>[]): PmParseRule[] =>
    rules.map((rule) => {
        if ('clears' in rule) {
            return markClearRule(type, rule);
        }
        if ('ignore' in rule && rule.ignore === true) {
            return { tag: rule.tag, priority: MARK_PRIORITY, ignore: true };
        }
        if (rule.style === undefined) {
            return valueParseRule(rule, MARK_PRIORITY);
        }
        if (typeof rule.style === 'string') {
            return markStyleRule(rule);
        }
        throw new Error(`Unhandled mark parse rule: ${JSON.stringify(rule satisfies never)}`);
    });

/**
 * Block rules: the value the element carries becomes the block's attributes,
 * plus whatever the attributes every text block carries read off it.
 */
export const blockParseRules = (
    definition: BlockDefinition,
    carried: readonly (readonly [string, BlockAttributeDefinition])[],
): TagParseRule[] =>
    definition.parse.map((rule) => ({
        tag: rule.tag,
        priority: qualifiedPriority(rule.tag),
        getAttrs: (element: HTMLElement) => {
            const value = rule.value ? rule.value(element) : {};
            if (value === null) {
                return false;
            }
            const read = carried.flatMap(([name, attribute]) => {
                const found = attribute.parse?.(element);
                return found ? [[name, found] as const] : [];
            });
            return { ...value, ...Object.fromEntries(read) };
        },
    }));
