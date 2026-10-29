/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkType, type Schema } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import {
    type AttributeDeclarations,
    DefinitionError,
    type HrefPolicy,
    type InputRule,
    type PayloadDeclaration,
    hrefPolicyOf,
} from '#/model';
import { type CompiledFeature } from '#/model/internal';

import { requireMarkType } from './schema';

const ruleCommand = (commandOf: (id: string) => RuleCommand | undefined, id: string): RuleCommand => {
    const command = commandOf(id);
    if (command === undefined) {
        throw new DefinitionError('definition.invalid-declaration', { command: id });
    }

    return command;
};

/** A command as a line-start rule runs it, with the payload of its marker, and whether its target is active there. */
type RuleCommand = {
    run: (state: EditorState, dispatch?: (transaction: Transaction) => void, payload?: unknown) => boolean;
    active: (state: EditorState, payload?: unknown) => boolean | 'mixed';
    /** Whether running would drop content its target cannot hold, so the rule does not fire. */
    refuses?: (state: EditorState, payload?: unknown) => boolean;
    payload?: PayloadDeclaration;
};

type RuleOf = {
    id: string;
    /** The feature that declares the rule, whose authoring policy decides whether it fires. */
    featureId: string;
};
/** A marker at the block start, such as `-` or `1.`, whose typing runs `command` with the marker's payload. */
export type LineStartRule = {
    kind: 'line-start';
    marker: string;
    command: RuleCommand;
    payload: unknown;
} & RuleOf;
/** A code feature's pattern over the text from the block start to the caret, whose named groups fill the payload. */
export type BlockRule = {
    kind: 'block-rule';
    match: RegExp;
    command: RuleCommand;
} & RuleOf;
/**
 * A code feature's pattern before the caret whose match, without the whitespace that ends it, gets `mark`, with the
 * attributes its named groups fill; `enter` also tests it when Enter ends the match.
 */
export type MarkRule = {
    kind: 'mark-rule';
    match: RegExp;
    mark: MarkType;
    /** The mark's attribute declarations, which convert the named groups. */
    attrs: AttributeDeclarations;
    onInput: boolean;
    onEnter: boolean;
    /** The declaring feature's `allowedSchemes` and `allowedHosts`, which a `url` group must also pass. */
    policy: HrefPolicy | undefined;
} & RuleOf;
/** A pair of delimiters around text, such as `**`, that gives the text `mark` once the closing one is typed. */
export type MarkDelimiterRule = {
    kind: 'mark-delimiter';
    open: string;
    close: string;
    mark: MarkType;
} & RuleOf;
/** A fixed string, or a code feature's pattern, that ends at the caret and becomes `replace`. */
export type TextReplaceRule = {
    kind: 'text-replace';
    match: RegExp;
    replace: string;
    /** Fires on the next typed character when it is no word character, which stays after the replacement. */
    boundary: boolean;
} & RuleOf;
/** Typed `"` or `'` that becomes a typographic quote. */
export type QuotesRule = {
    kind: 'quotes';
    marker: '"' | "'";
} & RuleOf;
/** An input rule as the package's rule engine runs it. */
export type CompiledInputRule = LineStartRule | BlockRule | MarkRule | MarkDelimiterRule | TextReplaceRule | QuotesRule;

const escaped = (text: string) => text.replaceAll(/[$()*+.?[\\\]^{|}]/g, String.raw`\$&`);

/**
 * The rules each feature's editor part adds, one per marker, with mark rules longest delimiter first, so `**x**` is
 * bold, never italic. Two rules of one ID are refused.
 */
export const compileInputRules = (
    features: readonly (CompiledFeature & { inputRules: readonly InputRule[] })[],
    schema: Schema,
    commandOf: (id: string) => RuleCommand | undefined,
): readonly CompiledInputRule[] => {
    const lines: LineStartRule[] = [];
    const blocks: BlockRule[] = [];
    const patterns: MarkRule[] = [];
    const marks: MarkDelimiterRule[] = [];
    const texts: (TextReplaceRule | QuotesRule)[] = [];
    const markAttrs = new Map(
        features.flatMap(({ declaration }) =>
            Object.entries(declaration.marks ?? {}).map(([name, mark]) => [name, mark.attrs] as const),
        ),
    );
    const owners = new Map<string, string>();
    for (const { id: featureId, inputRules, options } of features) {
        for (const rule of inputRules) {
            const { id } = rule;
            const owner = owners.get(id);
            // A host part and the `inputRules` prop pick a rule by its ID.
            if (owner !== undefined) {
                throw new DefinitionError('definition.duplicate-id', {
                    kind: 'input-rule',
                    id,
                    features: [owner, featureId],
                });
            }

            owners.set(id, featureId);
            if (rule.kind === 'mark-rule') {
                // Compilation checked that the model declares the mark.
                const mark = requireMarkType(schema, rule.mark);
                patterns.push({
                    id,
                    featureId,
                    kind: rule.kind,
                    match: rule.match,
                    mark,
                    attrs: markAttrs.get(rule.mark) ?? {},
                    onInput: rule.on.includes('input'),
                    onEnter: rule.on.includes('enter'),
                    policy: hrefPolicyOf(options),
                });
            }

            if (rule.kind === 'mark-delimiter') {
                // Compilation checked that the model declares the mark.
                const mark = requireMarkType(schema, rule.mark);
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

            if (rule.kind === 'block-rule') {
                // Compilation checked that a part registers the command.
                const command = ruleCommand(commandOf, rule.command);
                blocks.push({ id, featureId, kind: rule.kind, match: rule.match, command });
            }

            if (rule.kind !== 'line-start') {
                continue;
            }

            // Compilation checked that a part registers the command.
            const command = ruleCommand(commandOf, rule.command);
            for (const marker of rule.markers) {
                if (typeof marker === 'string') {
                    lines.push({ id, featureId, kind: rule.kind, marker, command, payload: undefined });
                } else {
                    const { payload } = marker;
                    lines.push({ id, featureId, kind: rule.kind, marker: marker.marker, command, payload });
                }
            }
        }
    }

    marks.sort((left, right) => right.open.length - left.open.length);

    return [...lines, ...blocks, ...patterns, ...marks, ...texts];
};
