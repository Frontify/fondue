/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { defineBlock, type MarkParseRule, type ParsePrecedence } from '#/core';

import { blockParseRules, INLINE_PRIORITY, markParseRules, MARK_PRIORITY, valueParseRules } from './pasteRules';

describe('rule priorities', () => {
    const blockPriority = (tag: string, precedence?: ParsePrecedence): number | undefined => {
        const block = defineBlock({
            content: 'text',
            toHtml: () => ({ tag: 'div', children: true }),
            parse: [{ tag, precedence }],
        });
        return blockParseRules(block, [])[0]?.priority;
    };
    const markPriority = (rule: MarkParseRule<unknown>): number | undefined =>
        markParseRules('note', [rule], [])[0]?.priority;
    const inlinePriority = (tag: string, precedence?: ParsePrecedence): number | undefined =>
        valueParseRules([{ tag, precedence }], INLINE_PRIORITY)[0]?.priority;

    it('leaves a bare block rule to the engine default, below a mark tag rule', () => {
        expect(blockPriority('div')).toBeUndefined();
        expect(markPriority({ tag: 'div' })).toBe(MARK_PRIORITY);
    });

    it('ties a qualified block rule with a mark tag rule, as before precedence existed', () => {
        expect(blockPriority('div[data-kind]')).toBe(markPriority({ tag: 'div' }));
    });

    it('puts an inline rule above a mark tag rule', () => {
        expect(inlinePriority('a')).toBe(INLINE_PRIORITY);
        expect(INLINE_PRIORITY).toBeGreaterThan(MARK_PRIORITY);
    });

    it('leaves a rule with the normal precedence where it was without one', () => {
        expect(blockPriority('div[data-kind]', 'normal')).toBe(blockPriority('div[data-kind]'));
        expect(markPriority({ tag: 'div' })).toBe(MARK_PRIORITY);
        expect(inlinePriority('a', 'normal')).toBe(inlinePriority('a'));
    });

    it('lets a high precedence beat the qualified selector of a normal one, and a low one lose to a bare one', () => {
        const normalQualified = blockPriority('div[data-kind]', 'normal') ?? 0;
        const normalBare = blockPriority('div', 'normal') ?? 0;

        expect(blockPriority('div', 'high') ?? 0).toBeGreaterThan(normalQualified);
        expect(blockPriority('div[data-kind]', 'low') ?? 0).toBeLessThan(normalBare);
    });
});
