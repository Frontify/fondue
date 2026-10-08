/* (c) Copyright Frontify Ltd., all rights reserved. */

import { checkHref, type CodecContext, type Diagnostic, type JsonObject } from '#/model';
import { isIsland, type TreeMark, type TreeNode } from '#/model/content';
import { pointer } from '#/model/errors';
import { islandText } from '#/model/html-spec';

import { attrsOf, type CodecPlan, type Format, Losses, setShared } from './plan';
import { type CodecLoss } from './types';
import { groupRun, headingIds, type Item, itemsOf, markPath, reportFailure, textOf, type WalkState } from './walk';

/** Counts a use of a node, with its shared attributes, when its feature declares `format` other than `lossless`. */
const noteNode = (state: WalkState, node: TreeNode, format: Format): void => {
    const plan = state.plan.nodes.get(node.type);
    if (plan === undefined) {
        return;
    }
    if (plan.formats[format] !== 'lossless') {
        state.losses.add(plan.featureId);
    }
    for (const shared of setShared(plan, node)) {
        if (state.plan.formats.get(shared.featureId)?.[format] !== 'lossless') {
            state.losses.add(shared.featureId);
        }
    }
};

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

const indentLines = (text: string, indent: string) =>
    text
        .split('\n')
        .map((line) => {
            if (line === '') {
                return line;
            }
            return `${indent}${line}`;
        })
        .join('\n');

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
    const keep = (mark: TreeMark) => {
        const plan = state.plan.marks.get(mark.type);
        if (plan === undefined) {
            return false;
        }
        if (plan.formats.text !== 'lossless') {
            state.losses.add(plan.featureId);
        }
        return true;
    };
    return renderMarked(itemsOf(node, path, keep), 0);
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
    for (const [index, child] of (item.content ?? []).entries()) {
        const childPath = `${path}${pointer('content', index)}`;
        if (LISTS.has(child.type)) {
            const list = renderBlock(state, child, childPath, depth + 1);
            if (list !== null) {
                lines.push(list);
            }
            continue;
        }
        const text = renderBlock(state, child, childPath, depth + 1);
        if (text === null) {
            continue;
        }
        if (index === 0) {
            const [first = '', ...rest] = text.split('\n');
            lines.push(
                `${indent}${marker}${first}`.trimEnd(),
                ...rest.map((line) => indentLines(line, `${indent}${INDENT}`)),
            );
        } else {
            lines.push(indentLines(text, `${indent}${INDENT}`));
        }
    }
    if (lines.length === 0) {
        lines.push(`${indent}${marker}`.trimEnd());
    }
    return lines.join('\n');
};

const markerOf = (list: TreeNode, item: TreeNode, index: number): string => {
    if (list.type === 'ordered_list') {
        let start = 1;
        if (typeof list.attrs?.start === 'number') {
            start = list.attrs.start;
        }
        return `${start + index}. `;
    }
    if (list.type === 'task_list' && item.attrs?.checked === true) {
        return '- [x] ';
    }
    if (list.type === 'task_list') {
        return '- [ ] ';
    }
    return '- ';
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
                    renderItem(state, item, `${path}${pointer('content', index)}`, markerOf(node, item, index), depth),
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
