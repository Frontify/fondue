/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkIgnoreRule, type ParseRule } from './plugin';

/** A rule that matches an element by its tag: a value rule, or a mark's ignore rule. */
export type TagRule<TValue> = (ParseRule<TValue> & { ignore?: undefined }) | MarkIgnoreRule;

/**
 * What a tag rule does with an element its selector matched: reads nothing from it, drops it with its content, or
 * reads a value (`{}` when the rule has no `value`).
 */
export type TagRuleReading<TValue> =
    | { kind: 'unread' }
    | { kind: 'ignored' }
    | { kind: 'read'; value: TValue | Record<string, never> };

/**
 * Whether `rule` reads `element`, which its selector already matched, and with what value. An ignore rule reads
 * every element and carries no value; a `value` that returns null reads none.
 */
export const readTagRule = <TValue>(rule: TagRule<TValue>, element: HTMLElement): TagRuleReading<TValue> => {
    if (rule.ignore === true) {
        return { kind: 'ignored' };
    }
    if (rule.value === undefined) {
        return { kind: 'read', value: {} };
    }
    const value = rule.value(element);
    if (value === null) {
        return { kind: 'unread' };
    }
    return { kind: 'read', value };
};
