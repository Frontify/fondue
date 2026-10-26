/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkdownIt as Parser } from 'markdown-it';

import { checkHref, mentionLabel, unavailableNote } from '#/model';
import {
    isIsland,
    type TreeMark,
    type TreeNode,
    pointer,
    islandText,
    attrsOf,
    groupRun,
    type Item,
    markPath,
    textOf,
} from '#/model/internal';

import { codeSpan, destination, joinRuns, type Piece, readInline, type Run, serialize } from './markdownEscape';
import { Losses, type MarkPlan, type NodePlan, setShared } from './plan';
import { reportFailure, type WalkState } from './walk';

export type MarkdownState = {
    /** Reads written inline Markdown back, to find emphasis that the delimiters cannot express. */
    readonly parser: Parser;
    /** `*`, or `_` where `*` runs of italic and bold would meet and parse as other emphasis. */
    readonly italic: '*' | '_';
} & WalkState;

/** Where inline content sits: a heading or a table cell holds one line, so a hard break there cannot be written. */
type Line = 'block' | 'heading' | 'cell';

const DELIMITERS: Readonly<Record<string, string>> = { bold: '**', italic: '*', strike: '~~' };

type MarkdownItem = {
    /** Written as a code span. */
    readonly code: boolean;
} & Item;

const markLost = (state: MarkdownState, plan: MarkPlan) => state.losses.add(plan.featureId);

/**
 * What a mark writes: nothing, a code span, its feature's own syntax, a delimiter pair, or a link to `target`, which
 * is `undefined` for an href that fails `checkHref`. `lost` says whether writing it loses part of the mark.
 */
type MarkSyntax =
    | { readonly kind: 'none' | 'code' | 'custom' | 'delimiter'; readonly lost: boolean }
    | { readonly kind: 'link'; readonly lost: boolean; readonly target: string | undefined };

const markSyntax = (mark: TreeMark, plan: MarkPlan): MarkSyntax => {
    if (plan.formats.markdown === 'unsupported') {
        return { kind: 'none', lost: true };
    }
    if (plan.markdown !== undefined || plan.form !== undefined) {
        return { kind: 'custom', lost: plan.formats.markdown === 'lossy' };
    }
    if (Object.hasOwn(DELIMITERS, mark.type)) {
        return { kind: 'delimiter', lost: false };
    }
    if (mark.type === 'code') {
        return { kind: 'code', lost: false };
    }
    if (mark.type !== 'link') {
        return { kind: 'none', lost: true };
    }
    const href = attrsOf(mark.attrs).href;
    if (typeof href !== 'string') {
        return { kind: 'link', lost: true, target: undefined };
    }
    const checked = checkHref(href);
    if (!checked.ok) {
        return { kind: 'link', lost: true, target: undefined };
    }
    return { kind: 'link', lost: false, target: checked.href };
};

/** Each child with the marks that write syntax around its text; a mark that writes nothing is counted as lost here. */
const markdownItems = (state: MarkdownState, node: TreeNode, path: string): MarkdownItem[] =>
    (node.content ?? []).map((child, index): MarkdownItem => {
        let code = false;
        const marks = (child.marks ?? []).flatMap((mark, markIndex) => {
            const plan = state.plan.marks.get(mark.type);
            if (plan === undefined) {
                return [];
            }
            const { kind, lost } = markSyntax(mark, plan);
            // A link's losses depend on its whole run, so `linkPieces` counts them once per run.
            if (lost && kind !== 'link') {
                markLost(state, plan);
            }
            if (kind === 'code') {
                code = true;
            }
            if (kind === 'none' || kind === 'code') {
                return [];
            }
            return [{ mark, index: markIndex }];
        });
        return { node: child, path: `${path}${pointer('content', index)}`, marks, code };
    });

/** The feature of a node type; a type the model lacks is an island, which `core` reads. */
export const featureOf = (state: MarkdownState, type: string): string => {
    const plan = state.plan.nodes.get(type);
    if (plan === undefined) {
        return 'core';
    }
    return plan.featureId;
};

export const overrideFailed = (state: MarkdownState, plan: NodePlan | MarkPlan, path: string, name: string) =>
    reportFailure(state, plan.featureId, path, name, 'markdown');

/** The runs a textblock should read back as, or `undefined` when it holds syntax the check does not cover. */
const expectedRuns = (state: MarkdownState, node: TreeNode, line: Line): Run[] | undefined => {
    const runs: Run[] = [];
    for (const child of node.content ?? []) {
        const names: string[] = [];
        for (const mark of child.marks ?? []) {
            const plan = state.plan.marks.get(mark.type);
            if (plan === undefined) {
                continue;
            }
            const syntax = markSyntax(mark, plan);
            if (syntax.kind === 'custom') {
                return undefined;
            }
            if (syntax.kind === 'link' && syntax.target !== undefined) {
                names.push(`link:${syntax.target}`);
            } else if (syntax.kind === 'code' || syntax.kind === 'delimiter') {
                names.push(mark.type);
            }
        }
        const marks = names.sort().join(' ');
        if (child.type === 'text') {
            runs.push({ text: child.text ?? '', marks });
        } else if (child.type === 'hard_break' && line !== 'block') {
            runs.push({ text: ' ', marks });
        } else if (child.type === 'hard_break') {
            runs.push({ break: true, marks });
        } else {
            return undefined;
        }
    }
    while (runs.at(-1) !== undefined && !('text' in (runs.at(-1) as Run))) {
        runs.pop();
    }
    return joinRuns(runs);
};

/**
 * A textblock's inline Markdown. Where reading it back gives other emphasis than the document holds, italic is
 * written with `_`, and where that fails too, every feature whose marks the block holds is reported as lost.
 */
export const writeInline = (state: MarkdownState, node: TreeNode, path: string, line: Line): string => {
    const attempt = (italic: '*' | '_') => {
        const scratch: MarkdownState = { ...state, italic, losses: new Losses(), diagnostics: [] };
        const text = serialize(inlinePieces(scratch, node, path, line), (featureId) => scratch.losses.add(featureId));
        return { scratch, text };
    };
    const expected = expectedRuns(state, node, line);
    const readsBack = (text: string) => {
        let markdown = text;
        if (line === 'cell') {
            // A table cell drops the backslash of every escaped pipe before it parses the cell.
            markdown = text.replaceAll('\\|', '|');
        }
        return JSON.stringify(readInline(state.parser, markdown, line === 'block')) === JSON.stringify(expected);
    };
    let chosen = attempt('*');
    if (expected !== undefined && !readsBack(chosen.text)) {
        // Only italic takes the other delimiter, so a block with no italic writes the same text again.
        const holdsItalic = (node.content ?? []).some((child) =>
            (child.marks ?? []).some(({ type }) => type === 'italic'),
        );
        let underscore: ReturnType<typeof attempt> | undefined;
        if (holdsItalic) {
            underscore = attempt('_');
        }
        if (underscore !== undefined && readsBack(underscore.text)) {
            chosen = underscore;
        } else {
            let marked = false;
            for (const child of node.content ?? []) {
                for (const mark of child.marks ?? []) {
                    const plan = state.plan.marks.get(mark.type);
                    if (plan !== undefined) {
                        chosen.scratch.losses.add(plan.featureId);
                        marked = true;
                    }
                }
            }
            if (!marked) {
                chosen.scratch.losses.add(featureOf(state, node.type));
            }
        }
    }
    state.losses.merge(chosen.scratch.losses);
    state.diagnostics.push(...chosen.scratch.diagnostics);
    return chosen.text;
};

/** Inline pieces of a textblock's children; `line` says whether a hard break can be written. */
const inlinePieces = (state: MarkdownState, node: TreeNode, path: string, line: Line): Piece[] => {
    const lost = (featureId: string) => state.losses.add(featureId);
    const leaf = (item: Item): Piece[] => leafPieces(state, item as MarkdownItem, line);
    let pairs = 0;
    const marked = (items: readonly Item[], depth: number): Piece[] =>
        groupRun(items, depth, leaf, (group, { mark, index }): Piece[] => {
            const inner = marked(group, depth + 1);
            const plan = state.plan.marks.get(mark.type) as MarkPlan;
            const attrs = attrsOf(mark.attrs);
            if (plan.markdown !== undefined) {
                try {
                    return [{ kind: 'literal', text: plan.markdown(serialize(inner, lost), attrs, state.context) }];
                } catch {
                    overrideFailed(state, plan, markPath(group, index), mark.type);
                    return inner;
                }
            }
            if (plan.form !== undefined) {
                return [
                    { kind: 'literal', text: plan.form.open },
                    ...inner,
                    { kind: 'literal', text: plan.form.close },
                ];
            }
            let delimiter = DELIMITERS[mark.type];
            if (mark.type === 'italic') {
                delimiter = state.italic;
            }
            if (delimiter !== undefined) {
                const { featureId } = plan;
                pairs += 1;
                return [
                    { kind: 'delimiter', text: delimiter, open: true, featureId, pair: pairs },
                    ...inner,
                    { kind: 'delimiter', text: delimiter, open: false, featureId, pair: pairs },
                ];
            }
            return linkPieces(state, plan, mark, inner, line);
        }).flat();
    const pieces = marked(markdownItems(state, node, path), 0);
    // A hard break at the end of a block, closing delimiters aside, writes nothing that parses back.
    let last = pieces.length - 1;
    while (last >= 0) {
        const piece = pieces[last];
        if (piece?.kind === 'delimiter' && !piece.open) {
            last -= 1;
        } else if (piece?.kind === 'break') {
            pieces.splice(last, 1);
            lost(featureOf(state, 'hard_break'));
            last -= 1;
        } else {
            break;
        }
    }
    return pieces;
};

const linkPieces = (state: MarkdownState, plan: MarkPlan, mark: TreeMark, inner: Piece[], line: Line): Piece[] => {
    const attrs = attrsOf(mark.attrs);
    if (attrs.openInNewWindow === true || (attrs.styleId !== undefined && attrs.styleId !== null)) {
        markLost(state, plan);
    }
    const syntax = markSyntax(mark, plan);
    if (syntax.lost) {
        markLost(state, plan);
    }
    if (syntax.kind !== 'link' || syntax.target === undefined) {
        return inner;
    }
    let target = destination(syntax.target);
    if (line === 'cell') {
        target = target.replaceAll('|', '\\|');
    }
    return [{ kind: 'literal', text: '[' }, ...inner, { kind: 'literal', text: `](${target})` }];
};

const leafPieces = (state: MarkdownState, { node, path, code }: MarkdownItem, line: Line): Piece[] => {
    if (node.type === 'text') {
        if (code && line === 'cell') {
            // A table row splits at every pipe a backslash does not escape, code spans included.
            return [{ kind: 'literal', text: codeSpan(node.text ?? '').replaceAll('|', '\\|') }];
        }
        if (code) {
            return [{ kind: 'literal', text: codeSpan(node.text ?? '') }];
        }
        return [{ kind: 'text', text: node.text ?? '' }];
    }
    if (isIsland(node)) {
        return [{ kind: 'text', text: islandText(node.attrs?.original) }];
    }
    const plan = state.plan.nodes.get(node.type);
    if (plan === undefined) {
        return [];
    }
    noteShared(state, plan, node);
    if (plan.formats.markdown === 'unsupported') {
        state.losses.add(plan.featureId);
        return [{ kind: 'text', text: textOf(node) }];
    }
    const attrs = attrsOf(node.attrs);
    if (plan.markdown !== undefined) {
        try {
            const inner = serialize([{ kind: 'text', text: textOf(node) }], (featureId) => state.losses.add(featureId));
            const text = plan.markdown(inner, attrs, state.context);
            if (plan.formats.markdown === 'lossy') {
                state.losses.add(plan.featureId);
            }
            return [{ kind: 'literal', text }];
        } catch {
            overrideFailed(state, plan, path, node.type);
            return [{ kind: 'text', text: textOf(node) }];
        }
    }
    if (node.type === 'hard_break') {
        if (line !== 'block') {
            state.losses.add(plan.featureId);
            return [{ kind: 'text', text: ' ' }];
        }
        return [{ kind: 'break' }];
    }
    state.losses.add(plan.featureId);
    if (node.type === 'mention') {
        const shown = mentionLabel(attrs, { t: state.context.t });
        return [
            { kind: 'literal', text: '@' },
            { kind: 'text', text: `${shown.label}${unavailableNote(shown, state.context.t)}` },
        ];
    }
    return [{ kind: 'text', text: textOf(node) }];
};

/** Counts each shared attribute that holds a value, since Markdown writes none (Markdown rules: `align`, `indent`, `styleId`). */
export const noteShared = (state: MarkdownState, plan: NodePlan, node: TreeNode) => {
    for (const shared of setShared(plan, node)) {
        state.losses.add(shared.featureId);
    }
};
