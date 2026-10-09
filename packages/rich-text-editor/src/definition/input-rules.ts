/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkType, type Schema } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import { type CompiledFeature } from '#/model/compile';

/** A command as a line-start rule runs it, with the payload of its marker. */
type RuleCommand = (state: EditorState, dispatch?: (transaction: Transaction) => void, payload?: unknown) => boolean;

export interface LineStartRule {
    readonly id: string;
    readonly kind: 'line-start';
    readonly marker: string;
    readonly run: RuleCommand;
    readonly payload: unknown;
}
export interface MarkDelimiterRule {
    readonly id: string;
    readonly kind: 'mark-delimiter';
    readonly open: string;
    readonly close: string;
    readonly mark: MarkType;
}
/** An input rule as the package's rule engine runs it (SPEC-rich-text-editing, Input rules). */
export type CompiledInputRule = LineStartRule | MarkDelimiterRule;

/**
 * The line-start and mark rules of `features`, one per marker, with mark rules longest delimiter first, so `**x**` is
 * bold, never italic. A line-start rule whose command is not compiled in does not fire.
 */
export const compileInputRules = (
    features: readonly CompiledFeature[],
    schema: Schema,
    commandOf: (id: string) => RuleCommand | undefined,
): readonly CompiledInputRule[] => {
    const lines: LineStartRule[] = [];
    const marks: MarkDelimiterRule[] = [];
    for (const rule of features.flatMap(({ declaration }) => declaration.inputRules ?? [])) {
        if (rule.kind === 'mark-delimiter') {
            // Compilation checked that the model declares the mark.
            const mark = schema.marks[rule.mark] as MarkType;
            marks.push({ id: rule.id, kind: rule.kind, open: rule.open, close: rule.close, mark });
        }
        if (rule.kind !== 'line-start') {
            continue;
        }
        const run = commandOf(rule.command);
        if (run === undefined) {
            continue;
        }
        for (const marker of rule.markers) {
            if (typeof marker === 'string') {
                lines.push({ id: rule.id, kind: rule.kind, marker, run, payload: undefined });
            } else {
                lines.push({ id: rule.id, kind: rule.kind, marker: marker.marker, run, payload: marker.payload });
            }
        }
    }
    return [...lines, ...marks.sort((a, b) => b.open.length - a.open.length)];
};
