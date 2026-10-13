/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TagParseRule } from 'prosemirror-model';

import { type BlockAttributeDefinition, type BlockDefinition, type ParseRule } from '#/core';

import { VALUE_ATTR } from './valueAttr';

/**
 * How pasted HTML is recognized as one of our blocks, inlines or marks: each
 * plugin's `parse` turned into the engine's `parseDOM`. It runs once, at mount
 * — the rules are then fixed for the editor's life.
 *
 * Invariant (1): a qualified block selector must outrank a bare tag. The engine
 * keeps rules of equal priority in schema order, and the paragraph baseline is
 * registered first, so without this every pasted `<p>` became a plain paragraph
 * (losing text styles) and every `<ul>` became a bullet list (losing check
 * marks). Hence `qualifiedPriority` below.
 */

/**
 * Which block rule claims an element when more than one matches it. A
 * qualified selector (`p[data-text-style=imageCaption]`, `ul[data-check-list]`)
 * describes exactly what one feature wrote; a bare tag is a fallback for
 * anything of that shape — so the qualified one wins. See invariant (1).
 */
const qualifiedPriority = (tag: string): number | undefined => (/[[.#:]/.test(tag) ? 60 : undefined);

/**
 * Mark rules, and inline rules above them. An inline element's markup may
 * also match a mark's rule — a mention is written as `<a href data-mention-id>`,
 * which a link's `a[href]` reads too — and on equal priority the engine tries
 * mark rules first, so a pasted mention came back as linked text.
 */
export const MARK_PRIORITY = 60;
export const INLINE_PRIORITY = 70;

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
