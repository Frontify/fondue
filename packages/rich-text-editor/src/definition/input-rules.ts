/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkType, type Schema } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import { type CompiledFeature } from '#/model/compile';

/** A command as a line-start rule runs it, with the payload of its marker. */
type RuleCommand = (state: EditorState, dispatch?: (transaction: Transaction) => void, payload?: unknown) => boolean;

interface RuleOf {
    readonly id: string;
    /** The feature that declares the rule, whose authoring policy decides whether it fires. */
    readonly featureId: string;
}
export interface LineStartRule extends RuleOf {
    readonly kind: 'line-start';
    readonly marker: string;
    readonly run: RuleCommand;
    readonly payload: unknown;
}
export interface MarkDelimiterRule extends RuleOf {
    readonly kind: 'mark-delimiter';
    readonly open: string;
    readonly close: string;
    readonly mark: MarkType;
}
/** A fixed string, or a code feature's pattern, that ends at the caret and becomes `replace`. */
export interface TextReplaceRule extends RuleOf {
    readonly kind: 'text-replace';
    readonly match: RegExp;
    readonly replace: string;
    /** Fires on the next typed character when it is no word character, which stays after the replacement. */
    readonly boundary: boolean;
}
export interface QuotesRule extends RuleOf {
    readonly kind: 'quotes';
    readonly marker: '"' | "'";
}
/** An input rule as the package's rule engine runs it (SPEC-rich-text-editing, Input rules). */
export type CompiledInputRule = LineStartRule | MarkDelimiterRule | TextReplaceRule | QuotesRule;

const escaped = (text: string) => text.replaceAll(/[$()*+.?[\\\]^{|}]/g, String.raw`\$&`);

/**
 * The rules of `features`, one per marker, with mark rules longest delimiter first, so `**x**` is bold, never
 * italic. A line-start rule whose command is not compiled in does not fire.
 */
export const compileInputRules = (
    features: readonly CompiledFeature[],
    schema: Schema,
    commandOf: (id: string) => RuleCommand | undefined,
): readonly CompiledInputRule[] => {
    const lines: LineStartRule[] = [];
    const marks: MarkDelimiterRule[] = [];
    const texts: (TextReplaceRule | QuotesRule)[] = [];
    for (const { id: featureId, declaration } of features) {
        for (const rule of declaration.inputRules ?? []) {
            const { id } = rule;
            if (rule.kind === 'mark-delimiter') {
                // Compilation checked that the model declares the mark.
                const mark = schema.marks[rule.mark] as MarkType;
                marks.push({ id, featureId, kind: rule.kind, open: rule.open, close: rule.close, mark });
            }
            if (rule.kind === 'text-replace') {
                const match = new RegExp(`${escaped(rule.find)}$`, 'u');
                const boundary = rule.boundary === 'word';
                texts.push({ id, featureId, kind: rule.kind, match, replace: rule.replace, boundary });
            }
            if (rule.kind === 'text-rule') {
                texts.push({
                    id,
                    featureId,
                    kind: 'text-replace',
                    match: rule.match,
                    replace: rule.replace,
                    boundary: false,
                });
            }
            if (rule.kind === 'quotes') {
                texts.push({ id, featureId, kind: rule.kind, marker: rule.marker });
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
                    lines.push({ id, featureId, kind: rule.kind, marker, run, payload: undefined });
                } else {
                    lines.push({ id, featureId, kind: rule.kind, marker: marker.marker, run, payload: marker.payload });
                }
            }
        }
    }
    return [...lines, ...marks.sort((a, b) => b.open.length - a.open.length), ...texts];
};
