/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type ParseRule as PmParseRule,
    type StyleParseRule as PmStyleParseRule,
    type TagParseRule,
} from 'prosemirror-model';

import {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type DefaultStyle,
    type MarkClearRule,
    type MarkParseRule,
    type ParsePrecedence,
    type ParseRule,
    type PluginRegistry,
    readTagRule,
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
 * Style rules run before the mark tag rules, which consume their element, so `<strong style="font-style:italic">` is italic too.
 */
const STYLE_PRIORITY = 65;

/**
 * A qualified selector (`p[data-text-style=imageCaption]`, `ul[data-check-list]`)
 * outranks a bare tag. Otherwise the paragraph baseline, registered first,
 * claims every pasted `<p>` and `<ul>` and drops text styles and check marks.
 */
const qualifiedPriority = (tag: string): number | undefined => (/[[.#:]/.test(tag) ? MARK_PRIORITY : undefined);

/** What the engine gives a rule with no priority. */
const DEFAULT_PRIORITY = 50;
/** Larger than the 10 a qualified block rule gains over a bare one, so a precedence always decides before the selector does. */
const PRECEDENCE_STEP = 11;

/** How far a precedence moves a rule's priority; `normal` leaves it where it was. */
const precedenceShift = (precedence: ParsePrecedence): number => {
    switch (precedence) {
        case 'low':
            return -PRECEDENCE_STEP;
        case 'normal':
            return 0;
        case 'high':
            return PRECEDENCE_STEP;
    }
};

/** A block rule's priority: raised by a qualified selector, then moved by its declared precedence. */
const blockPriority = (rule: ParseRule<unknown>): number | undefined => {
    const qualified = qualifiedPriority(rule.tag);
    if (rule.precedence === undefined) {
        return qualified;
    }
    return (qualified ?? DEFAULT_PRIORITY) + precedenceShift(rule.precedence);
};

/**
 * Wraps a parsed value as the node's single value attribute, or false when the value is null.
 */
const valueAttrs = (value: unknown) => (value === null ? false : { [VALUE_ATTR]: value });

/**
 * A tag rule's value: what its `value` reads off the element, no attributes when it has none, and null when it reads none.
 */
const tagRuleValue = <TValue>(rule: ParseRule<TValue>, element: HTMLElement): TValue | Record<string, never> | null => {
    const reading = readTagRule(rule, element);
    switch (reading.kind) {
        case 'unread':
            return null;
        case 'read':
            return reading.value;
        case 'ignored':
            // A value rule never ignores; the engine handles a mark's ignore rule without reading it.
            throw new Error(`The rule for "${rule.tag}" ignores its element, so it has no value to read.`);
    }
};

const valueParseRule = (rule: ParseRule<unknown>, priority: number): TagParseRule => ({
    tag: rule.tag,
    priority: priority + precedenceShift(rule.precedence ?? 'normal'),
    getAttrs: (element: HTMLElement) => valueAttrs(tagRuleValue(rule, element)),
});

/**
 * Inline rules keep their whole value in one attribute; a null value means "not this node".
 */
export const valueParseRules = (rules: readonly ParseRule<unknown>[], priority: number): TagParseRule[] =>
    rules.map((rule) => valueParseRule(rule, priority));

/**
 * A mounted node's default style, with the selector of the tags that show it: the node's own parse tags.
 */
export type DefaultStyleRule = DefaultStyle & {
    within: string;
};

const showsDefault = (element: HTMLElement, defaults: DefaultStyleRule): boolean => {
    switch (defaults.scope) {
        case 'self':
            return element.matches(defaults.within);
        case 'inside':
            return element.closest(defaults.within) !== null;
    }
};

const declaredValue = (element: HTMLElement, property: string, defaultStyles: readonly DefaultStyleRule[]): string => {
    let value = element.style.getPropertyValue(property);
    for (const defaults of defaultStyles) {
        if (defaults.property === property && showsDefault(element, defaults)) {
            value = defaults.strip(value);
        }
    }
    return value;
};

/**
 * A parse rule seen only by the tag it matches; style and clear rules have none.
 */
type TagOfRule = {
    tag?: string;
};

/**
 * The tags a node's parse rules read, as one selector; empty when it reads none.
 */
const ownSelector = (rules: readonly TagOfRule[]): string =>
    rules.flatMap((rule) => (rule.tag === undefined ? [] : [rule.tag])).join(', ');

/**
 * What each mounted mark and block shows by default, matched against its own tags.
 * A node whose plugin is not mounted strips nothing.
 */
export const defaultStyleRules = (registry: PluginRegistry): DefaultStyleRule[] => {
    const rules: DefaultStyleRule[] = [];
    for (const node of [...registry.marks.values(), ...registry.blocks.values()]) {
        const within = ownSelector(node.parse);
        if (within === '') {
            continue;
        }
        for (const style of node.defaultStyles ?? []) {
            rules.push({ ...style, within });
        }
    }
    return rules;
};

/**
 * Any element with a `style` attribute.
 */
const STYLED_ELEMENT = '[style]';

/**
 * ProseMirror style rules only see the CSS value, not the element, so a style rule
 * is a tag rule on any styled element that reads the declared value itself.
 */
const markStyleRule = (rule: StyleParseRule<unknown>, defaultStyles: readonly DefaultStyleRule[]): TagParseRule => ({
    tag: STYLED_ELEMENT,
    priority: STYLE_PRIORITY,
    // One declaration, such as `text-decoration: underline line-through`, can set two marks.
    consuming: false,
    getAttrs: (element: HTMLElement) => {
        const cssValue = declaredValue(element, rule.style, defaultStyles);
        if (cssValue.trim() === '') {
            return false;
        }
        return valueAttrs(rule.value(cssValue));
    },
});

/**
 * A CSS property name as a style attribute writes it: lowercase words joined by hyphens, `font-weight`.
 */
const CSS_PROPERTY = /^-?[a-z]+(?:-[a-z]+)*$/;

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
 * @param type - the mark's name in the schema
 * @param defaultStyles - what mounted nodes show by default, stripped from the values style rules read
 */
export const markParseRules = (
    type: string,
    rules: readonly MarkParseRule<unknown>[],
    defaultStyles: readonly DefaultStyleRule[],
): PmParseRule[] =>
    rules.map((rule) => {
        if (rule.style !== undefined && !CSS_PROPERTY.test(rule.style)) {
            throw new Error(
                `The "${type}" mark reads "${rule.style}", which is not a CSS property name such as font-weight.`,
            );
        }
        if ('clears' in rule) {
            return markClearRule(type, rule);
        }
        if ('ignore' in rule && rule.ignore === true) {
            return { tag: rule.tag, priority: MARK_PRIORITY, ignore: true };
        }
        if (rule.style === undefined) {
            return valueParseRule(rule, MARK_PRIORITY);
        }
        return markStyleRule(rule, defaultStyles);
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
        priority: blockPriority(rule),
        getAttrs: (element: HTMLElement) => {
            const value = tagRuleValue(rule, element);
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
