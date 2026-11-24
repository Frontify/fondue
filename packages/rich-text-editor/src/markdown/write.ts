/* (c) Copyright Frontify Ltd., all rights reserved. */

// A document as Markdown. Each block writes its lines, and the block holding it adds its prefix to them,
// so a quote inside a list item reads `  > text` without either knowing the other.

import {
    blockValueOf,
    type ContentRegistry,
    type MarkdownInlineOutput,
    type MarkdownLinePrefix,
    type MarkdownMarkForm,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineElementNode,
    type RteInlineNode,
    type RteTextNode,
} from '#/core';

import { escapeText } from './escape';
import { type MarkdownForms } from './forms';

/** What a node lost on write: `path` is the index of each block, child and inline from `document.blocks` down to it. */
export type MarkdownLoss = {
    path: readonly number[];
    /** The block type, mark key, inline type or block attribute name that has no Markdown form. */
    type: string;
};

export type WriteContext = {
    registry: ContentRegistry;
    forms: MarkdownForms;
    breaks: boolean;
};

export type WriteResult = {
    markdown: string;
    losses: MarkdownLoss[];
};

type WriteState = WriteContext & { losses: MarkdownLoss[] };

type NodeValue = Record<string, unknown>;

type Path = readonly number[];

const NBSP_ENTITY = '&nbsp;';

const LINE_SEPARATOR = '\n';
const HARD_BREAK = '\\\n';

const NO_PREFIX: MarkdownLinePrefix = { first: '', rest: '' };

/** What goes between two blocks' lines: a blank line, except where a list item's list follows its paragraph. */
type BlockGap = 'blankLine' | 'itemChildren';

const BLANK_LINE: readonly string[] = [''];
const NO_LINES: readonly string[] = [];

/** Whether a line break stays one, or the block holds a single line and the break writes as a space. */
type LineMode = 'multiline' | 'singleLine';

const SPACE = ' ';

// --- Inlines ---

type CarriedMark = { name: string; value: NodeValue; form: MarkdownMarkForm };

/** What a text block's inlines are once the runs sharing a mark sit inside one piece, as the marks nest. */
type Piece =
    | { kind: 'text'; text: string }
    | { kind: 'output'; output: MarkdownInlineOutput }
    | { kind: 'mark'; mark: CarriedMark; path: Path; pieces: Piece[] };

type OpenMark = Extract<Piece, { kind: 'mark' }>;

/** Whether the text a mark wraps is escaped, or written as is (inline code). */
type TextMode = 'escaped' | 'literal';

/** Whether anything has been written on the current line yet, which decides how text at its start is escaped. */
type LineCursor = { atLineStart: boolean };

/** A stored mark value that puts the mark on: `false` and `null` say it is off, as if left out. */
const isCarried = (stored: unknown): boolean => stored !== undefined && stored !== null && stored !== false;

const markValueOf = (stored: unknown): NodeValue => {
    if (typeof stored === 'object' && stored !== null) {
        return stored as NodeValue;
    }

    return {};
};

/** The marks a text run carries that have a form, outermost first. The rest are losses, and stay as their text. */
const carriedMarks = (text: RteTextNode, path: Path, state: WriteState): CarriedMark[] => {
    const carried: CarriedMark[] = [];
    for (const name of state.registry.marks.keys()) {
        if (!isCarried(text[name])) {
            continue;
        }

        const form = state.forms.marks.get(name);
        if (form === undefined) {
            state.losses.push({ path, type: name });
        } else {
            carried.push({ name, value: markValueOf(text[name]), form });
        }
    }

    for (const name of Object.keys(text)) {
        if (name !== 'text' && name !== 'type' && isCarried(text[name]) && !state.registry.marks.has(name)) {
            state.losses.push({ path, type: name });
        }
    }

    return carried;
};

const sameMark = (left: CarriedMark, right: CarriedMark): boolean =>
    left.name === right.name && JSON.stringify(left.value) === JSON.stringify(right.value);

/** How many of the open marks the run carries too, in the same order and with the same values. */
const sharedMarkCount = (open: readonly OpenMark[], marks: readonly CarriedMark[]): number => {
    let shared = 0;
    for (const [index, mark] of marks.entries()) {
        const opened = open[index];
        if (opened === undefined || !sameMark(opened.mark, mark)) {
            break;
        }
        shared++;
    }

    return shared;
};

const closeMarks = (root: Piece[], open: OpenMark[], keep: number): void => {
    while (open.length > keep) {
        const mark = open.pop();
        if (mark === undefined) {
            return;
        }

        (open[open.length - 1]?.pieces ?? root).push(mark);
    }
};

/** What an inline element writes, or null for one that has no Markdown form: a loss, written as nothing. */
const outputOf = (
    inline: RteInlineElementNode,
    path: Path,
    lineMode: LineMode,
    state: WriteState,
): MarkdownInlineOutput | null => {
    const { type, text: _text, ...value } = inline;
    const output = state.forms.inlines.get(type)?.write(value) ?? null;
    if (output === null) {
        state.losses.push({ path, type });

        return null;
    }
    if (output.kind === 'lineBreak' && lineMode === 'singleLine') {
        state.losses.push({ path, type });

        return { kind: 'text', text: SPACE };
    }

    return output;
};

/**
 * A text block's inlines, with each mark opened once around the whole stretch of neighbours sharing it, as the
 * renderer does, so a bold link that is partly italic is still one link.
 */
const piecesOf = (
    inlines: readonly RteInlineNode[],
    parentPath: Path,
    lineMode: LineMode,
    state: WriteState,
): Piece[] => {
    const root: Piece[] = [];
    const open: OpenMark[] = [];

    for (const [index, inline] of inlines.entries()) {
        const path = [...parentPath, index];

        if (inline.text === undefined) {
            closeMarks(root, open, 0);
            const output = outputOf(inline, path, lineMode, state);
            if (output !== null) {
                root.push({ kind: 'output', output });
            }
            continue;
        }

        if (inline.text === '') {
            continue;
        }

        const marks = carriedMarks(inline, path, state);
        const keep = sharedMarkCount(open, marks);

        closeMarks(root, open, keep);
        for (const mark of marks.slice(keep)) {
            open.push({ kind: 'mark', mark, path, pieces: [] });
        }

        (open[open.length - 1]?.pieces ?? root).push({ kind: 'text', text: inline.text });
    }

    closeMarks(root, open, 0);

    return root;
};

/** The text a mark wraps, as the mark's form reads it to choose its delimiters. */
const plainTextOf = (pieces: readonly Piece[]): string => {
    let text = '';
    for (const piece of pieces) {
        switch (piece.kind) {
            case 'text':
                text += piece.text;
                break;
            case 'output':
                if (piece.output.kind === 'text') {
                    text += piece.output.text;
                }
                break;
            case 'mark':
                text += plainTextOf(piece.pieces);
                break;
        }
    }

    return text;
};

const renderText = (text: string, mode: TextMode, cursor: LineCursor): string => {
    if (text === '') {
        return text;
    }

    let written = text;
    if (mode === 'escaped') {
        let position: 'lineStart' | 'inline' = 'inline';
        if (cursor.atLineStart) {
            position = 'lineStart';
        }
        written = escapeText(text, position);
    }
    cursor.atLineStart = false;

    return written;
};

const renderOutput = (output: MarkdownInlineOutput, mode: TextMode, cursor: LineCursor, state: WriteState): string => {
    switch (output.kind) {
        case 'text':
            return renderText(output.text, mode, cursor);
        case 'markdown':
            if (output.markdown !== '') {
                cursor.atLineStart = false;
            }
            return output.markdown;
        case 'lineBreak':
            cursor.atLineStart = true;
            if (state.breaks) {
                return LINE_SEPARATOR;
            }
            return HARD_BREAK;
    }
};

/** The marked text with the whitespace at its edges outside the delimiters, where Markdown reads them as emphasis. */
const wrapped = (inner: string, open: string, close: string): string => {
    const start = inner.length - inner.trimStart().length;
    const end = inner.trimEnd().length;
    if (start >= end) {
        return inner;
    }

    return `${inner.slice(0, start)}${open}${inner.slice(start, end)}${close}${inner.slice(end)}`;
};

const renderPieces = (pieces: readonly Piece[], mode: TextMode, cursor: LineCursor, state: WriteState): string => {
    let written = '';
    for (const piece of pieces) {
        switch (piece.kind) {
            case 'text':
                written += renderText(piece.text, mode, cursor);
                break;
            case 'output':
                written += renderOutput(piece.output, mode, cursor, state);
                break;
            case 'mark':
                written += renderMark(piece, mode, cursor, state);
                break;
        }
    }

    return written;
};

const renderMark = (piece: OpenMark, mode: TextMode, cursor: LineCursor, state: WriteState): string => {
    const { mark, path, pieces } = piece;
    const delimiters = mark.form.write(mark.value, plainTextOf(pieces));
    if (delimiters === null) {
        state.losses.push({ path, type: mark.name });

        return renderPieces(pieces, mode, cursor, state);
    }

    let innerMode = mode;
    if (mark.form.literal === true) {
        innerMode = 'literal';
    }
    // The opening delimiter comes first, so the text inside does not start the line.
    cursor.atLineStart = false;

    return wrapped(renderPieces(pieces, innerMode, cursor, state), delimiters.open, delimiters.close);
};

const writeInlines = (inlines: readonly RteInlineNode[], path: Path, lineMode: LineMode, state: WriteState): string => {
    const cursor: LineCursor = { atLineStart: true };

    return renderPieces(piecesOf(inlines, path, lineMode, state), 'escaped', cursor, state);
};

// --- Blocks ---

/** How a block is written, from what its plugin declares or, for a block no plugin declares, what it holds. */
type BlockKind = 'text' | 'list' | 'container' | 'void';

const childrenOf = (block: RteBlockNode): unknown[] => {
    if (Array.isArray(block.children)) {
        return block.children;
    }

    return [];
};

const isBlockLike = (child: unknown, registry: ContentRegistry): boolean => {
    const { type, children } = child as { type?: unknown; children?: unknown };

    return Array.isArray(children) || (typeof type === 'string' && registry.blocks.has(type));
};

/** A block no plugin declares: its text, its blocks, or nothing, by what its children are. */
const unknownKindOf = (block: RteBlockNode, registry: ContentRegistry): BlockKind => {
    const children = childrenOf(block);
    if (children.length === 0) {
        return 'void';
    }
    if (children.every((child) => isBlockLike(child, registry))) {
        return 'container';
    }

    return 'text';
};

const kindOf = (block: RteBlockNode, registry: ContentRegistry): BlockKind => {
    const definition = registry.blocks.get(block.type);
    if (definition === undefined) {
        return unknownKindOf(block, registry);
    }

    const { content } = definition;
    if (content === 'text') {
        return 'text';
    }
    if (content === undefined) {
        return 'void';
    }
    if ('items' in content) {
        return 'list';
    }

    return 'container';
};

const prefixed = (lines: readonly string[], prefix: MarkdownLinePrefix): string[] => {
    if (lines.length === 0) {
        const marker = prefix.first.trimEnd();
        if (marker === '') {
            return [];
        }

        return [marker];
    }

    // A block with no `rest` holds one line, so there is no later line to prefix.
    const rest = prefix.rest ?? '';

    return lines.map((line, index) => {
        if (index === 0) {
            return `${prefix.first}${line}`;
        }
        if (line === '') {
            return rest.trimEnd();
        }

        return `${rest}${line}`;
    });
};

/** The block's prefix, or none and a loss when the block has no form or its form has none for this value. */
const prefixOf = (block: RteBlockNode, path: Path, state: WriteState): MarkdownLinePrefix => {
    const definition = state.registry.blocks.get(block.type);
    const form = state.forms.blocks.get(block.type);
    if (definition !== undefined && form !== undefined) {
        const prefix = form.write(blockValueOf(definition, block as NodeValue), { index: 0 });
        if (prefix !== null) {
            return prefix;
        }
    }

    state.losses.push({ path, type: block.type });

    return NO_PREFIX;
};

/** A block attribute a text block carries (its alignment) has no Markdown form, so it is a loss. */
const reportBlockAttributes = (block: RteBlockNode, path: Path, state: WriteState): void => {
    for (const name of state.registry.blockAttributes.keys()) {
        const value = (block as NodeValue)[name];
        if (typeof value === 'string' && value !== '') {
            state.losses.push({ path, type: name });
        }
    }
};

const writeTextBlock = (block: RteBlockNode, path: Path, state: WriteState): string[] => {
    const prefix = prefixOf(block, path, state);
    reportBlockAttributes(block, path, state);

    const inlines = childrenOf(block) as RteInlineNode[];
    let lineMode: LineMode = 'multiline';
    if (prefix.rest === null) {
        lineMode = 'singleLine';
    }

    let text = writeInlines(inlines, path, lineMode, state);
    if (text === '') {
        text = NBSP_ENTITY;
    }

    return prefixed(text.split(LINE_SEPARATOR), prefix);
};

/** In a list item, a list follows its paragraph on the next line, and any other two blocks keep the blank line. */
const linesBetween = (
    gap: BlockGap,
    previous: RteBlockNode,
    next: RteBlockNode,
    state: WriteState,
): readonly string[] => {
    switch (gap) {
        case 'blankLine':
            return BLANK_LINE;
        case 'itemChildren':
            if (kindOf(previous, state.registry) === 'list' || kindOf(next, state.registry) === 'list') {
                return NO_LINES;
            }

            return BLANK_LINE;
    }
};

const writeBlocks = (blocks: readonly RteBlockNode[], parentPath: Path, gap: BlockGap, state: WriteState): string[] => {
    const lines: string[] = [];
    let previous: RteBlockNode | null = null;
    for (const [index, block] of blocks.entries()) {
        const blockLines = writeBlock(block, [...parentPath, index], state);
        if (blockLines.length === 0) {
            continue;
        }
        if (previous !== null) {
            lines.push(...linesBetween(gap, previous, block, state));
        }
        for (const line of blockLines) {
            lines.push(line);
        }
        previous = block;
    }

    return lines;
};

/** A block holding blocks: the prefix of its form on all their lines, or none and a loss without a form. */
const writeContainer = (block: RteBlockNode, path: Path, state: WriteState): string[] => {
    const prefix = prefixOf(block, path, state);
    let gap: BlockGap = 'blankLine';
    if (state.forms.itemTypes.has(block.type)) {
        gap = 'itemChildren';
    }

    return prefixed(writeBlocks(childrenOf(block) as RteBlockNode[], path, gap, state), prefix);
};

type ListItemLines = { item: RteBlockNode; prefix: MarkdownLinePrefix };

/** The prefix of every item, or null when the list or any of its items has none. */
const itemPrefixesOf = (
    block: RteBlockNode,
    items: readonly RteBlockNode[],
    state: WriteState,
): ListItemLines[] | null => {
    const definition = state.registry.blocks.get(block.type);
    const form = state.forms.blocks.get(block.type);
    if (definition === undefined || form === undefined) {
        return null;
    }

    const value = blockValueOf(definition, block as NodeValue);
    const entries: ListItemLines[] = [];
    for (const [index, item] of items.entries()) {
        const prefix = form.write(value, { index });
        if (prefix === null) {
            return null;
        }
        entries.push({ item, prefix });
    }

    return entries;
};

/** A list: each item's lines carry the item's own prefix. Without one for every item, the items are written as blocks. */
const writeList = (block: RteBlockNode, path: Path, state: WriteState): string[] => {
    const items = childrenOf(block) as RteBlockNode[];
    const entries = itemPrefixesOf(block, items, state);
    if (entries === null) {
        state.losses.push({ path, type: block.type });

        return writeBlocks(items, path, 'blankLine', state);
    }

    const lines: string[] = [];
    for (const [index, { item, prefix }] of entries.entries()) {
        for (const line of prefixed(writeBlock(item, [...path, index], state), prefix)) {
            lines.push(line);
        }
    }

    return lines;
};

const writeBlock = (block: RteBlockNode, path: Path, state: WriteState): string[] => {
    switch (kindOf(block, state.registry)) {
        case 'text':
            return writeTextBlock(block, path, state);
        case 'list':
            return writeList(block, path, state);
        case 'container':
            return writeContainer(block, path, state);
        case 'void':
            state.losses.push({ path, type: block.type });

            return [];
    }
};

export const writeDocument = <TBlock extends RteBlockNode>(
    document: RteDocumentOf<TBlock>,
    context: WriteContext,
): WriteResult => {
    const state: WriteState = { ...context, losses: [] };
    const markdown = writeBlocks(document.blocks, [], 'blankLine', state).join(LINE_SEPARATOR);

    // The empty document is one empty paragraph, which is the empty string, not an empty-paragraph entity.
    if (document.blocks.length === 1 && markdown === NBSP_ENTITY) {
        return { markdown: '', losses: state.losses };
    }

    return { markdown, losses: state.losses };
};
