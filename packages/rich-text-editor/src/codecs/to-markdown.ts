/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkdownIt as Parser } from 'markdown-it';

import { checkHref, type CodecContext, type Diagnostic, type JsonObject } from '#/model';
import { isIsland, type TreeMark, type TreeNode } from '#/model/content';
import { pointer } from '#/model/errors';
import { islandText } from '#/model/html-spec';

import { codeSpan, destination, joinRuns, type Piece, readInline, type Run, serialize } from './markdown-escape';
import { attrsOf, type CodecPlan, Losses, MARKDOWN_NODES, type MarkPlan, type NodePlan, setShared } from './plan';
import { type CodecLoss } from './types';
import { groupRun, headingIds, type Item, markPath, reportFailure, textOf, type WalkState } from './walk';

interface MarkdownState extends WalkState {
    /** The GitHub slug of each heading, by `nodeId`. */
    readonly slugs: ReadonlyMap<string, string>;
    /** Reads written inline Markdown back, to find emphasis that the delimiters cannot express. */
    readonly parser: Parser;
    /** `*`, or `_` where `*` runs of italic and bold would meet and parse as other emphasis. */
    readonly italic: '*' | '_';
}

/** Where inline content sits: a heading or a table cell holds one line, so a hard break there cannot be written. */
type Line = 'block' | 'heading' | 'cell';

const DELIMITERS: Readonly<Record<string, string>> = { bold: '**', italic: '*', strike: '~~' };
const LISTS = new Set(['bullet_list', 'ordered_list', 'task_list']);

// GitHub's slugger keeps letters, marks, numbers, connector punctuation, spaces and hyphens.
const SLUG_DROPPED = /[^\p{L}\p{M}\p{N}\p{Pc} -]/gu;

/** `github-slugger` slugs for every heading in document order, with `-1`, `-2` for repeats. */
const slugsOf = (root: TreeNode): ReadonlyMap<string, string> => {
    const slugs = new Map<string, string>();
    const occurrences = new Map<string, number>();
    const visit = (node: TreeNode) => {
        const nodeId = node.attrs?.nodeId;
        if (node.type === 'heading' && typeof nodeId === 'string') {
            const base = textOf(node).toLowerCase().replaceAll(SLUG_DROPPED, '').replaceAll(' ', '-');
            let slug = base;
            const seen = occurrences.get(base);
            if (seen !== undefined) {
                let count = seen;
                do {
                    count += 1;
                    slug = `${base}-${count}`;
                } while (occurrences.has(slug));
                occurrences.set(base, count);
            }
            occurrences.set(slug, 0);
            slugs.set(nodeId, slug);
        }
        for (const child of node.content ?? []) {
            visit(child);
        }
    };
    visit(root);
    return slugs;
};

interface MarkdownItem extends Item {
    /** Written as a code span. */
    readonly code: boolean;
}

const markLost = (state: MarkdownState, plan: MarkPlan) => state.losses.add(plan.featureId);

/** Whether a mark writes syntax that groups its text; a mark that writes nothing is counted as lost here. */
const writesSyntax = (state: MarkdownState, mark: TreeMark, plan: MarkPlan): boolean => {
    if (plan.formats.markdown === 'unsupported') {
        markLost(state, plan);
        return false;
    }
    if (plan.markdown !== undefined || plan.form !== undefined) {
        if (plan.formats.markdown === 'lossy') {
            markLost(state, plan);
        }
        return true;
    }
    if (mark.type === 'link' || Object.hasOwn(DELIMITERS, mark.type)) {
        return true;
    }
    if (mark.type !== 'code') {
        markLost(state, plan);
    }
    return false;
};

const markdownItems = (state: MarkdownState, node: TreeNode, path: string): MarkdownItem[] =>
    (node.content ?? []).map((child, index): MarkdownItem => {
        let code = false;
        const marks = (child.marks ?? []).flatMap((mark, markIndex) => {
            const plan = state.plan.marks.get(mark.type);
            if (plan === undefined) {
                return [];
            }
            if (mark.type === 'code' && plan.markdown === undefined && plan.form === undefined) {
                code = plan.formats.markdown !== 'unsupported';
            }
            if (!writesSyntax(state, mark, plan)) {
                return [];
            }
            return [{ mark, index: markIndex }];
        });
        return { node: child, path: `${path}${pointer('content', index)}`, marks, code };
    });

/** The feature of a node type; a type the model lacks is an island, which `core` reads. */
const featureOf = (state: MarkdownState, type: string): string => {
    const plan = state.plan.nodes.get(type);
    if (plan === undefined) {
        return 'core';
    }
    return plan.featureId;
};

const overrideFailed = (state: MarkdownState, plan: NodePlan | MarkPlan, path: string, name: string) =>
    reportFailure(state, plan.featureId, path, name, 'markdown');

/** The runs a textblock should read back as, or `undefined` when it holds syntax the check does not cover. */
const expectedRuns = (state: MarkdownState, node: TreeNode, line: Line): Run[] | undefined => {
    const runs: Run[] = [];
    for (const child of node.content ?? []) {
        const names: string[] = [];
        for (const mark of child.marks ?? []) {
            const plan = state.plan.marks.get(mark.type);
            if (plan === undefined || plan.formats.markdown === 'unsupported') {
                continue;
            }
            if (plan.markdown !== undefined || plan.form !== undefined) {
                return undefined;
            }
            if (mark.type === 'link') {
                const href = attrsOf(mark.attrs).href;
                if (typeof href !== 'string') {
                    continue;
                }
                const slug = state.slugs.get(href.slice(1));
                if (href.startsWith('#') && slug !== undefined) {
                    names.push(`link:#${slug}`);
                } else {
                    const checked = checkHref(href);
                    if (checked.ok) {
                        names.push(`link:${checked.href}`);
                    }
                }
            } else if (mark.type === 'code' || Object.hasOwn(DELIMITERS, mark.type)) {
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
const writeInline = (state: MarkdownState, node: TreeNode, path: string, line: Line): string => {
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
        const underscore = attempt('_');
        if (readsBack(underscore.text)) {
            chosen = underscore;
        } else {
            for (const child of node.content ?? []) {
                for (const mark of child.marks ?? []) {
                    const plan = state.plan.marks.get(mark.type);
                    if (plan !== undefined) {
                        chosen.scratch.losses.add(plan.featureId);
                    }
                }
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
    const href = attrs.href;
    if (typeof href !== 'string') {
        markLost(state, plan);
        return inner;
    }
    const slug = state.slugs.get(href.slice(1));
    if (href.startsWith('#') && slug !== undefined) {
        return [{ kind: 'literal', text: '[' }, ...inner, { kind: 'literal', text: `](#${slug})` }];
    }
    const checked = checkHref(href);
    if (!checked.ok) {
        markLost(state, plan);
        return inner;
    }
    let target = destination(checked.href);
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
            const text = plan.markdown(textOf(node), attrs, state.context);
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
        let label = '';
        if (typeof attrs.labelSnapshot === 'string') {
            label = attrs.labelSnapshot;
        }
        return [
            { kind: 'literal', text: '@' },
            { kind: 'text', text: label },
        ];
    }
    return [{ kind: 'text', text: textOf(node) }];
};

/** Counts each shared attribute that holds a value, since Markdown writes none (Markdown rules: `align`, `indent`, `styleId`). */
const noteShared = (state: MarkdownState, plan: NodePlan, node: TreeNode) => {
    for (const shared of setShared(plan, node)) {
        state.losses.add(shared.featureId);
    }
};

const prefixLines = (text: string, first: string, rest: string): string =>
    text
        .split('\n')
        .map((line, index) => {
            if (index === 0) {
                return `${first}${line}`.trimEnd();
            }
            if (line === '') {
                return line;
            }
            return `${rest}${line}`;
        })
        .join('\n');

const quote = (text: string): string =>
    text
        .split('\n')
        .map((line) => {
            if (line === '') {
                return '>';
            }
            return `> ${line}`;
        })
        .join('\n');

/** Blocks joined by a blank line; a list right after a list of the same kind switches its marker so the two stay apart. */
const renderBlocks = (state: MarkdownState, parent: TreeNode, path: string): string => {
    const children = parent.content ?? [];
    const written: string[] = [];
    let previous: { readonly family: string; readonly alternate: boolean } | undefined;
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
    if (alternate) {
        bullet = '+';
    }
    let marker = `${bullet} `;
    let indent = 2;
    if (list.type === 'ordered_list') {
        let start = 1;
        if (typeof list.attrs?.start === 'number') {
            start = list.attrs.start;
        }
        let delimiter = '.';
        if (alternate) {
            delimiter = ')';
        }
        marker = `${start + index}${delimiter} `;
        indent = marker.length;
    } else if (item.type === 'task_item' && item.attrs?.checked === true) {
        marker = `${bullet} [x] `;
    } else if (item.type === 'task_item') {
        marker = `${bullet} [ ] `;
    }
    const content = item.content ?? [];
    const [first] = content;
    if (first !== undefined && content.length > 1 && (first.content ?? []).length === 0) {
        // An empty first paragraph followed by more blocks ends the item in Markdown.
        state.losses.add(featureOf(state, item.type));
    }
    return prefixLines(renderBlocks(state, item, path), marker, ' '.repeat(indent));
};

const fenceOf = (text: string): string => {
    const longest = Math.max(0, ...[...text.matchAll(/`+/g)].map(([run]) => run.length));
    return '`'.repeat(Math.max(3, longest + 1));
};

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

const renderTable = (state: MarkdownState, table: TreeNode, plan: NodePlan, path: string): string => {
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
    const { resolveAssetUrl } = state.context;
    if (typeof attrs.assetId !== 'string' || resolveAssetUrl === undefined) {
        return null;
    }
    const options: { width?: number } = {};
    if (typeof attrs.width === 'number') {
        options.width = attrs.width;
    }
    const url = resolveAssetUrl(attrs.assetId, options);
    if (url === null) {
        return null;
    }
    const checked = checkHref(url);
    if (!checked.ok) {
        return null;
    }
    let alt = '';
    if (attrs.altIntent === 'meaningful' && typeof attrs.altText === 'string') {
        alt = attrs.altText;
    }
    const lost = (featureId: string) => state.losses.add(featureId);
    return `![${serialize([{ kind: 'text', text: alt }], lost)}](${destination(checked.href)})`;
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

const paragraphOf = (state: MarkdownState, node: TreeNode, path: string): string =>
    writeInline(state, node, path, 'block');

const isTextblock = (state: MarkdownState, node: TreeNode, plan: NodePlan) => {
    const content = node.content ?? [];
    if (content.length === 0) {
        return !plan.leaf;
    }
    return content.some((child) => child.type === 'text' || state.plan.nodes.get(child.type)?.inline === true);
};

/** What a node writes from its content alone, when no rule, form or override names it. */
const fallbackOf = (state: MarkdownState, node: TreeNode, plan: NodePlan, path: string): string | null => {
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

const ruleOf = (
    state: MarkdownState,
    node: TreeNode,
    plan: NodePlan,
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
            return quote(renderBlocks(state, node, path));
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
            const fence = fenceOf(text);
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
            return `${plan.form.fence}\n${textOf(node)}\n${plan.form.fence}`;
        }
        return prefixLines(inner, plan.form.prefix, plan.form.prefix);
    }
    state.losses.add(plan.featureId);
    return fallbackOf(state, node, plan, path);
};

/** Markdown by the Markdown rules table (SPEC-rich-text-output/AC-020), with one loss entry per feature that lost content. */
export const writeMarkdown = (
    plan: CodecPlan,
    root: TreeNode,
    context: CodecContext,
    parser: Parser,
): {
    readonly markdown: string;
    readonly losses: readonly CodecLoss[];
    readonly diagnostics: readonly Diagnostic[];
} => {
    const state: MarkdownState = {
        plan,
        context,
        losses: new Losses(),
        diagnostics: [],
        headings: headingIds(root),
        slugs: slugsOf(root),
        parser,
        italic: '*',
    };
    const rootPlan = plan.nodes.get(root.type);
    if (rootPlan !== undefined && dropsOwnAttributes(root)) {
        state.losses.add(rootPlan.featureId);
    }
    const markdown = renderBlocks(state, root, '/content');
    return { markdown, losses: state.losses.list(), diagnostics: state.diagnostics };
};
