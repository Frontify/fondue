/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkdownIt as Parser } from 'markdown-it';

import { type CodecContext, checkHref, type Diagnostic, type JsonObject, altOf } from '#/model';
import {
    imageSource,
    leavesOutUnresolved,
    isIsland,
    type TreeNode,
    pointer,
    islandText,
    attrsOf,
    textOf,
} from '#/model/internal';

import { destination, longestRun, serialize } from './markdownEscape';
import { type CodecPlan, Losses, MARKDOWN_NODES, type CodecNodePlan } from './plan';
import { type CodecLoss } from './types';
import { headingIds, itemMarker, prefixLines } from './walk';
import { featureOf, type MarkdownState, noteShared, overrideFailed, writeInline } from './writeInline';

const LISTS = new Set(['bullet_list', 'ordered_list', 'task_list']);

/** Blocks joined by a blank line; a list right after a list of the same kind switches its marker so the two stay apart. */
const renderBlocks = (state: MarkdownState, parent: TreeNode, path: string): string => {
    const children = parent.content ?? [];
    const written: string[] = [];
    let previous: { family: string; alternate: boolean } | undefined;
    for (const [index, child] of children.entries()) {
        const childPath = `${path}${pointer('content', index)}`;
        let family = child.type;
        if (child.type === 'task_list') {
            family = 'bullet_list';
        }

        let alternate = false;
        if (LISTS.has(child.type) && previous?.family === family) {
            alternate = !previous.alternate;
        }

        const block = renderBlock(state, child, childPath, alternate);
        if (block === null) {
            continue;
        }

        if (block === '' && children.length > 1) {
            // An empty block that is not alone in its parent has no Markdown that parses back.
            state.losses.add(featureOf(state, child.type));
            continue;
        }

        written.push(block);
        previous = { family, alternate };
        if (!LISTS.has(child.type)) {
            previous = { family: child.type, alternate: false };
        }
    }

    return written.join('\n\n');
};

/** One list item: its marker, then its blocks indented under it; `alternate` switches the marker so adjacent lists stay apart. */
const renderItem = (
    state: MarkdownState,
    list: TreeNode,
    item: TreeNode,
    path: string,
    index: number,
    alternate: boolean,
): string => {
    const plan = state.plan.nodes.get(item.type);
    if (plan !== undefined) {
        noteShared(state, plan, item);
    }

    let bullet = '-';
    let delimiter = '.';
    if (alternate) {
        bullet = '+';
        delimiter = ')';
    }

    const marker = itemMarker(list, item, index, item.type === 'task_item', bullet, delimiter);
    let indent = 2;
    if (list.type === 'ordered_list') {
        indent = marker.length;
    }

    const content = item.content ?? [];
    const [first] = content;
    if (first !== undefined && content.length > 1 && (first.content ?? []).length === 0) {
        // An empty first paragraph followed by more blocks ends the item in Markdown.
        state.losses.add(featureOf(state, item.type));
    }

    return prefixLines(renderBlocks(state, item, path), marker, ' '.repeat(indent), true);
};

/** Whether a GFM table can hold the cell at all: one paragraph, no span. */
const isGfmCell = (cell: TreeNode) => {
    const attrs = cell.attrs ?? {};
    const [paragraph, ...rest] = cell.content ?? [];

    return attrs.colspan === 1 && attrs.rowspan === 1 && paragraph?.type === 'paragraph' && rest.length === 0;
};

/** A cell a GFM table holds with no loss: no width, no hard break, and a `col` header exactly in the first row. */
const isExactCell = (cell: TreeNode, first: boolean): boolean => {
    const header = cell.type === 'table_header' && cell.attrs?.scope === 'col';
    const breaks = (cell.content ?? []).some((block) =>
        (block.content ?? []).some((child) => child.type === 'hard_break'),
    );

    return cell.attrs?.colwidth === null && !breaks && header === first && (header || cell.type === 'table_cell');
};

/** A GFM table, or its cells' blocks when a cell is beyond GFM; either way a loss is noted when content cannot be kept exactly. */
const renderTable = (state: MarkdownState, table: TreeNode, plan: CodecNodePlan, path: string): string => {
    const rows = table.content ?? [];
    const cells = rows.map((row) => row.content ?? []);
    const columns = Math.max(0, ...cells.map((row) => row.length));
    const gfm = cells.every((row) => row.every(isGfmCell));
    if (!gfm) {
        state.losses.add(plan.featureId);
        const blocks = cells.flatMap((row, rowIndex) =>
            row.map((cell, cellIndex) =>
                renderBlocks(state, cell, `${path}${pointer('content', rowIndex, 'content', cellIndex)}`),
            ),
        );

        return blocks.filter((block) => block !== '').join('\n\n');
    }

    const exact = cells.every(
        (row, rowIndex) => row.length === columns && row.every((cell) => isExactCell(cell, rowIndex === 0)),
    );
    if (!exact) {
        state.losses.add(plan.featureId);
    }

    const lines = cells.map((row, rowIndex) => {
        const written = row.map((cell, cellIndex) => {
            const paragraph = cell.content?.[0];
            const paragraphPath = `${path}${pointer('content', rowIndex, 'content', cellIndex, 'content', 0)}`;
            if (paragraph === undefined) {
                return '';
            }

            const paragraphPlan = state.plan.nodes.get(paragraph.type);
            if (paragraphPlan !== undefined) {
                noteShared(state, paragraphPlan, paragraph);
            }

            return writeInline(state, paragraph, paragraphPath, 'cell');
        });

        while (written.length < columns) {
            written.push('');
        }

        return `| ${written.join(' | ')} |`;
    });
    const [head = '', ...body] = lines;

    return [head, `|${' --- |'.repeat(columns)}`, ...body].join('\n');
};

/** The `![alt](url)` of an image through `resolveAssetUrl` after `checkHref`, or `null` when unresolved or unsafe. */
const imageOf = (state: MarkdownState, node: TreeNode): string | null => {
    const attrs = attrsOf(node.attrs);
    const src = imageSource(attrs, state.context);
    if (src === undefined) {
        return null;
    }

    const alt = altOf(attrs) ?? '';
    const lost = (featureId: string) => state.losses.add(featureId);

    return `![${serialize([{ kind: 'text', text: alt }], lost)}](${destination(src)})`;
};

/** `[title](url)`, or `<url>` when the title is null. */
const embedOf = (state: MarkdownState, attrs: JsonObject): string | null => {
    if (typeof attrs.url !== 'string') {
        return null;
    }

    const checked = checkHref(attrs.url);
    if (!checked.ok) {
        return null;
    }

    const lost = (featureId: string) => state.losses.add(featureId);
    if (typeof attrs.title !== 'string' && /^[a-z][a-z\d+.-]{1,31}:[^\s<>]*$/i.test(checked.href)) {
        return `<${checked.href}>`;
    }

    let title = checked.href;
    if (typeof attrs.title === 'string') {
        title = attrs.title;
    }

    return `[${serialize([{ kind: 'text', text: title }], lost)}](${destination(checked.href)})`;
};

/** The inline Markdown of a textblock. */
const paragraphOf = (state: MarkdownState, node: TreeNode, path: string): string =>
    writeInline(state, node, path, 'block');

/** Whether the node holds inline content, so it writes as one paragraph rather than as blocks. */
const isTextblock = (state: MarkdownState, node: TreeNode, plan: CodecNodePlan) => {
    const content = node.content ?? [];
    if (content.length === 0) {
        return !plan.leaf;
    }

    return content.some((child) => child.type === 'text' || state.plan.nodes.get(child.type)?.inline === true);
};

/** What a node writes from its content alone, when no rule, form or override names it. */
const fallbackOf = (state: MarkdownState, node: TreeNode, plan: CodecNodePlan, path: string): string | null => {
    if (isTextblock(state, node, plan)) {
        return paragraphOf(state, node, path);
    }

    if (plan.leaf) {
        return null;
    }

    return renderBlocks(state, node, path);
};

/** Its own attributes that the Markdown rules drop: `lang`, `dir` and a list `marker`. */
const dropsOwnAttributes = (node: TreeNode): boolean => {
    const attrs = node.attrs ?? {};
    if (node.type === 'doc') {
        return typeof attrs.lang === 'string' || (typeof attrs.dir === 'string' && attrs.dir !== 'auto');
    }

    return typeof attrs.lang === 'string' || typeof attrs.marker === 'string';
};

/** The Markdown the package writes for a node it names, or `null` when the node writes nothing. */
const ruleOf = (
    state: MarkdownState,
    node: TreeNode,
    plan: CodecNodePlan,
    path: string,
    alternate: boolean,
): string | null => {
    const attrs = attrsOf(node.attrs);
    if (dropsOwnAttributes(node)) {
        state.losses.add(plan.featureId);
    }

    switch (node.type) {
        case 'paragraph':
            return paragraphOf(state, node, path);
        case 'heading': {
            let level = 1;
            if (typeof attrs.level === 'number') {
                level = attrs.level;
            }

            const text = writeInline(state, node, path, 'heading');

            return `${'#'.repeat(level)} ${text}`.trimEnd();
        }

        case 'blockquote':
            return prefixLines(renderBlocks(state, node, path), '> ', '> ');
        case 'bullet_list':
        case 'ordered_list':
        case 'task_list':
            return (node.content ?? [])
                .map((item, index) =>
                    renderItem(state, node, item, `${path}${pointer('content', index)}`, index, alternate),
                )
                .join('\n');
        case 'code_block': {
            const text = textOf(node);
            const fence = '`'.repeat(Math.max(3, longestRun(text, '`') + 1));
            let info = '';
            if (typeof attrs.languageId === 'string') {
                info = attrs.languageId;
            }

            if (text === '') {
                return `${fence}${info}\n${fence}`;
            }

            return `${fence}${info}\n${text}\n${fence}`;
        }

        case 'horizontal_rule':
            return '---';
        case 'table':
            return renderTable(state, node, plan, path);
        case 'figure':
            state.losses.add(plan.featureId);
            for (const child of node.content ?? []) {
                const image = imageOf(state, child);
                if (image !== null) {
                    return image;
                }
            }

            return null;
        case 'asset_image':
            state.losses.add(plan.featureId);

            return imageOf(state, node);
        case 'embed':
            state.losses.add(plan.featureId);

            return embedOf(state, attrs);
        default:
            // `column_break` and any other named node outside a textblock write nothing.
            state.losses.add(plan.featureId);

            return null;
    }
};

/**
 * A fence form's block: a backtick or tilde fence becomes a code fence longer than any run of its character in the
 * body; any other fence holds the body escaped line by line, so stored text never becomes HTML or a link.
 */
const fencedOf = (fence: string, text: string): string => {
    const [char = '`'] = fence;
    if (/^(`{3,}|~{3,})$/.test(fence)) {
        const written = char.repeat(Math.max(fence.length, longestRun(text, char) + 1));

        return `${written}\n${text}\n${written}`;
    }

    const lines = text.split(/\r\n?|\n/).map((line) => serialize([{ kind: 'text', text: line }], () => undefined));

    return [fence, ...lines, fence].join('\n');
};

/** One block's Markdown, or `null` for a block that writes nothing. */
const renderBlock = (state: MarkdownState, node: TreeNode, path: string, alternate = false): string | null => {
    if (isIsland(node)) {
        const text = islandText(node.attrs?.original);
        if (text === '') {
            return null;
        }

        return serialize([{ kind: 'text', text }], () => undefined);
    }

    const plan = state.plan.nodes.get(node.type);
    if (plan === undefined) {
        return null;
    }

    if (leavesOutUnresolved(state, plan.featureId, node, path)) {
        return null;
    }

    noteShared(state, plan, node);
    if (plan.formats.markdown === 'unsupported') {
        state.losses.add(plan.featureId);

        return fallbackOf(state, node, plan, path);
    }

    if (plan.markdown !== undefined) {
        try {
            let inner = '';
            if (isTextblock(state, node, plan)) {
                inner = paragraphOf(state, node, path);
            } else if (!plan.leaf) {
                inner = renderBlocks(state, node, path);
            }

            const text = plan.markdown(inner, attrsOf(node.attrs), state.context);
            if (plan.formats.markdown === 'lossy') {
                state.losses.add(plan.featureId);
            }

            return text;
        } catch {
            overrideFailed(state, plan, path, node.type);
            const text = textOf(node);
            if (text === '') {
                return null;
            }

            return serialize([{ kind: 'text', text }], () => undefined);
        }
    }

    if (MARKDOWN_NODES.has(node.type)) {
        return ruleOf(state, node, plan, path, alternate);
    }

    if (plan.form !== undefined) {
        if (plan.formats.markdown === 'lossy') {
            state.losses.add(plan.featureId);
        }

        const inner = fallbackOf(state, node, plan, path) ?? '';
        if ('fence' in plan.form) {
            return fencedOf(plan.form.fence, textOf(node));
        }

        return prefixLines(inner, plan.form.prefix, plan.form.prefix, true, '');
    }

    state.losses.add(plan.featureId);

    return fallbackOf(state, node, plan, path);
};

/** Markdown for the document, with one loss entry per feature that lost content. */
export const writeMarkdown = (
    plan: CodecPlan,
    root: TreeNode,
    context: CodecContext,
    parser: Parser,
): {
    markdown: string;
    losses: readonly CodecLoss[];
    diagnostics: readonly Diagnostic[];
} => {
    const state: MarkdownState = {
        plan,
        context,
        losses: new Losses(),
        diagnostics: [],
        headings: headingIds(root),
        parser,
        italic: '*',
        lostMarks: new Set(),
    };
    const rootPlan = plan.nodes.get(root.type);
    if (rootPlan !== undefined && dropsOwnAttributes(root)) {
        state.losses.add(rootPlan.featureId);
    }

    const markdown = renderBlocks(state, root, '/content');

    return { markdown, losses: state.losses.list(), diagnostics: state.diagnostics };
};
