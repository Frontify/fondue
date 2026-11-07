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

const markStyleRule = (rule: StyleParseRule<unknown>): PmStyleParseRule => ({
    style: rule.style,
    priority: MARK_PRIORITY,
    // One declaration, such as `text-decoration: underline line-through`, can set two marks.
    consuming: false,
    getAttrs: (cssValue: string) => valueAttrs(rule.value ? rule.value(cssValue) : {}),
});

const markClearRule = (type: string, rule: MarkClearRule): PmStyleParseRule => ({
    style: rule.style,
    priority: MARK_PRIORITY,
    consuming: false,
    clearMark: (mark) => mark.type.name === type,
    // Null makes the rule match with no attributes; false skips it.
    getAttrs: (cssValue: string) => (rule.clears(cssValue) ? null : false),
});

/** A mark's rules: tag and style rules put it on with its value, clear rules take it off the element's content. */
export const markParseRules = (type: string, rules: readonly MarkParseRule<unknown>[]): PmParseRule[] =>
    rules.map((rule) => {
        if ('clears' in rule) {
            return markClearRule(type, rule);
        }
        if (rule.style === undefined) {
            return valueParseRule(rule, MARK_PRIORITY);
        }
        return markStyleRule(rule);
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
