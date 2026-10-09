/* (c) Copyright Frontify Ltd., all rights reserved. */

import { checkHref, type CodecContext, type Diagnostic, type JsonObject } from '#/model';
import { isIsland, type TreeMark, type TreeNode } from '#/model/content';
import { pointer } from '#/model/errors';
import { islandText } from '#/model/html-spec';
import { attrsOf, groupRun, type Item, itemsOf, markPath, textOf } from '#/model/output';

import { type CodecPlan, Losses } from './plan';
import { type CodecLoss } from './types';
import { headingIds, itemMarker, keepMark, noteNode, prefixLines, reportFailure, type WalkState } from './walk';

/** The href a link writes after its text, or `undefined` for one that fails `checkHref` or targets a heading of this document. */
const linkTarget = (state: WalkState, attrs: TreeMark['attrs']): string | undefined => {
    const href = attrs.href;
    if (typeof href !== 'string' || (href.startsWith('#') && state.headings.has(href.slice(1)))) {
        return undefined;
    }
    const checked = checkHref(href);
    if (!checked.ok) {
        return undefined;
    }
    return checked.href;
};

const INDENT = '  ';
const LISTS = new Set(['bullet_list', 'ordered_list', 'task_list']);

const renderInline = (state: WalkState, node: TreeNode, path: string): string => {
    const renderMarked = (items: readonly Item[], depth: number): string =>
        groupRun(
            items,
            depth,
            (item) => renderLeaf(state, item),
            (group, { mark, index }) => {
                const inner = renderMarked(group, depth + 1);
                const plan = state.plan.marks.get(mark.type);
                const attrs = attrsOf(mark.attrs);
                if (plan !== undefined && plan.text !== undefined) {
                    try {
                        return plan.text(inner, attrs);
                    } catch {
                        reportFailure(state, plan.featureId, markPath(group, index), mark.type, 'text');
                        return inner;
                    }
                }
                if (mark.type !== 'link') {
                    return inner;
                }
                const href = linkTarget(state, mark.attrs);
                if (href === undefined || href === inner) {
                    return inner;
                }
                return `${inner} (${href})`;
            },
        ).join('');
    return renderMarked(itemsOf(node, path, keepMark(state, 'text')), 0);
};

const renderLeaf = (state: WalkState, { node, path }: Item): string => {
    if (node.type === 'text') {
        return node.text ?? '';
    }
    return renderBlock(state, node, path, 0) ?? '';
};

const renderItem = (state: WalkState, item: TreeNode, path: string, marker: string, depth: number): string => {
    noteNode(state, item, 'text');
    const indent = INDENT.repeat(depth);
    const lines: string[] = [];
    let marked = false;
    for (const [index, child] of (item.content ?? []).entries()) {
        const childPath = `${path}${pointer('content', index)}`;
        const text = renderBlock(state, child, childPath, depth + 1);
        if (text === null) {
            continue;
        }
        if (LISTS.has(child.type)) {
            if (!marked) {
                lines.push(`${indent}${marker}`.trimEnd());
                marked = true;
            }
            lines.push(text);
        } else if (marked) {
            lines.push(prefixLines(text, `${indent}${INDENT}`, `${indent}${INDENT}`));
        } else {
            lines.push(prefixLines(text, `${indent}${marker}`, `${indent}${INDENT}`, true));
            marked = true;
        }
    }
    if (!marked) {
        lines.push(`${indent}${marker}`.trimEnd());
    }
    return lines.join('\n');
};

/** Its title, then ` (url)`, or the URL alone when the title is null; a URL that fails `checkHref` is left out. */
const embedText = (attrs: JsonObject): string | null => {
    let url = '';
    if (typeof attrs.url === 'string') {
        const checked = checkHref(attrs.url);
        if (checked.ok) {
            url = checked.href;
        }
    }
    if (typeof attrs.title !== 'string') {
        return url;
    }
    if (url === '') {
        return attrs.title;
    }
    return `${attrs.title} (${url})`;
};

const joinBlocks = (blocks: readonly (string | null)[], separator: string): string | null => {
    const written = blocks.filter((block): block is string => block !== null);
    if (written.length === 0) {
        return null;
    }
    return written.join(separator);
};

/** A node no rule names: a textblock writes its inline text, a container its blocks, and an empty node nothing. */
const defaultText = (state: WalkState, node: TreeNode, path: string, depth: number): string | null => {
    const plan = state.plan.nodes.get(node.type);
    const content = node.content ?? [];
    if (plan !== undefined && plan.leaf) {
        return null;
    }
    const isInline = (child: TreeNode) => child.type === 'text' || state.plan.nodes.get(child.type)?.inline === true;
    if (content.some(isInline)) {
        return renderInline(state, node, path);
    }
    if (content.length === 0) {
        return null;
    }
    return joinBlocks(
        content.map((child, index) => renderBlock(state, child, `${path}${pointer('content', index)}`, depth)),
        '\n\n',
    );
};

/** One block's text, or `null` for a block that writes nothing. */
const renderBlock = (state: WalkState, node: TreeNode, path: string, depth: number): string | null => {
    if (isIsland(node)) {
        const text = islandText(node.attrs?.original);
        if (text === '') {
            return null;
        }
        return text;
    }
    const plan = state.plan.nodes.get(node.type);
    if (plan === undefined) {
        return null;
    }
    noteNode(state, node, 'text');
    const attrs = attrsOf(node.attrs);
    let text: string | null;
    switch (node.type) {
        case 'hard_break':
            text = '\n';
            break;
        case 'mention':
            text = '@';
            if (typeof attrs.labelSnapshot === 'string') {
                text = `@${attrs.labelSnapshot}`;
            }
            break;
        case 'asset_image':
            text = null;
            if (attrs.altIntent === 'meaningful' && typeof attrs.altText === 'string' && attrs.altText !== '') {
                text = attrs.altText;
            }
            break;
        case 'embed':
            text = embedText(attrs);
            break;
        case 'horizontal_rule':
            text = '---';
            break;
        case 'column_break':
            text = null;
            break;
        case 'code_block':
            text = textOf(node);
            break;
        case 'bullet_list':
        case 'ordered_list':
        case 'task_list':
            text = joinBlocks(
                (node.content ?? []).map((item, index) =>
                    renderItem(
                        state,
                        item,
                        `${path}${pointer('content', index)}`,
                        itemMarker(node, item, index, node.type === 'task_list'),
                        depth,
                    ),
                ),
                '\n',
            );
            break;
        case 'table':
            text = joinBlocks(
                (node.content ?? []).map((row, rowIndex) => {
                    const rowPath = `${path}${pointer('content', rowIndex)}`;
                    noteNode(state, row, 'text');
                    return (row.content ?? [])
                        .map((cell, cellIndex) => {
                            const cellPath = `${rowPath}${pointer('content', cellIndex)}`;
                            noteNode(state, cell, 'text');
                            const blocks = (cell.content ?? []).map((block, index) =>
                                renderBlock(state, block, `${cellPath}${pointer('content', index)}`, depth),
                            );
                            return joinBlocks(blocks, ' ') ?? '';
                        })
                        .join('\t');
                }),
                '\n',
            );
            break;
        default:
            text = defaultText(state, node, path, depth);
    }
    if (plan.text === undefined) {
        return text;
    }
    try {
        return plan.text(text ?? '', attrs, state.context);
    } catch {
        reportFailure(state, plan.featureId, path, node.type, 'text');
        return textOf(node);
    }
};

/** Plain text by the Plain text rules table (SPEC-rich-text-output/AC-019): one blank line between top-level blocks. */
export const writeText = (
    plan: CodecPlan,
    root: TreeNode,
    context: CodecContext,
): { readonly text: string; readonly losses: readonly CodecLoss[]; readonly diagnostics: readonly Diagnostic[] } => {
    const state: WalkState = { plan, context, losses: new Losses(), diagnostics: [], headings: headingIds(root) };
    const text = joinBlocks(
        (root.content ?? []).map((child, index) =>
            renderBlock(state, child, `/content${pointer('content', index)}`, 0),
        ),
        '\n\n',
    );
    return { text: text ?? '', losses: state.losses.list(), diagnostics: state.diagnostics };
};
