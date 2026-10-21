/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TagParseRule } from 'prosemirror-model';

import { type BlockAttributeDefinition, type BlockDefinition, type ParseRule } from '#/core';

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
export const valueParseRules = (rules: readonly ParseRule<unknown>[], priority: number): TagParseRule[] =>
    rules.map((rule) => ({
        tag: rule.tag,
        priority,
        getAttrs: (element: HTMLElement) => {
            const value = rule.value ? rule.value(element) : {};
            return value === null ? false : { [VALUE_ATTR]: value };
        },
    }));

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
