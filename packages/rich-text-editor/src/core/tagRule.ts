/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkIgnoreRule, type ParseRule } from './plugin';

export type TagRule<TValue> = (ParseRule<TValue> & { ignore?: undefined }) | MarkIgnoreRule;

/** `read` carries `{}` when the rule has no `value`; `ignored` drops the element with its content. */
export type TagRuleReading<TValue> =
    | { kind: 'unread' }
    | { kind: 'ignored' }
    | { kind: 'read'; value: TValue | Record<string, never> };

/** Assumes `rule.tag` already matched `element`. */
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
