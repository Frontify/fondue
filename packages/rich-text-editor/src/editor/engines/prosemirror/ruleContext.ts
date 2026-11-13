/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputRule } from 'prosemirror-inputrules';
import { type MarkType as PmMarkType, type Schema } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import { type PluginRegistry, type RteInputRule } from '#/core';

export type RuleHandler = (
    state: EditorState,
    match: RegExpMatchArray,
    start: number,
    end: number,
) => Transaction | null;

type RulePattern = { pattern: RegExp; handler: RuleHandler };

/** What every kind's translation needs: the schema, the registry, and the marks that opt out of rules. */
export type RuleContext = {
    schema: Schema;
    registry: PluginRegistry;
    excludedMarks: readonly PmMarkType[];
};

export type RuleOfKind<Kind extends RteInputRule['kind']> = Extract<RteInputRule, { kind: Kind }>;

export const ruleContext = (registry: PluginRegistry, schema: Schema): RuleContext => {
    const excludedMarks = [...registry.marks]
        .filter(([, definition]) => definition.excludesInputRules === true)
        .flatMap(([type]) => schema.marks[type] ?? []);
    return { schema, registry, excludedMarks };
};

/** Text carrying a mark that opts out (for example, inline code) is typed as is: the rule steps aside. */
export const isInExcludedMark = (state: EditorState, excluded: readonly PmMarkType[], position: number): boolean => {
    const marks = state.storedMarks ?? state.doc.resolve(position).marks();
    return excluded.some((markType) => markType.isInSet(marks));
};

/**
 * Whether text a rule would delete or replace carries a mark that opts out: a non-inclusive mark such as code ends at the caret, but a match may still reach back into it.
 */
export const touchesExcludedMark = (
    state: EditorState,
    excluded: readonly PmMarkType[],
    from: number,
    to: number,
): boolean => excluded.some((markType) => state.doc.rangeHasMark(from, to, markType));

const unlessInExcludedMark =
    (excluded: readonly PmMarkType[], handler: RuleHandler): RuleHandler =>
    (state, match, start, end) => {
        if (isInExcludedMark(state, excluded, end)) {
            return null;
        }
        return handler(state, match, start, end);
    };

/**
 * A text rule leaves text alone when any of it carries a mark that opts out of rules (for example, inline code).
 */
export const unlessRangeHasExcludedMark =
    (excluded: readonly PmMarkType[], handler: RuleHandler): RuleHandler =>
    (state, match, start, end) => {
        if (touchesExcludedMark(state, excluded, start, end)) {
            return null;
        }
        return handler(state, match, start, end);
    };

export const withoutStateFlags = (pattern: RegExp): string => pattern.flags.replaceAll(/[gy]/g, '');

export const toInputRule = ({ pattern, handler }: RulePattern, { excludedMarks }: RuleContext): InputRule =>
    new InputRule(pattern, unlessInExcludedMark(excludedMarks, handler));
