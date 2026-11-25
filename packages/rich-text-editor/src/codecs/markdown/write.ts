/* (c) Copyright Frontify Ltd., all rights reserved. */

// A document as Markdown. Each block writes its lines, and the block holding it adds its prefix to them,
// so a quote inside a list item reads `  > text` without either knowing the other.

import {
    blockValueOf,
    type ContentRegistry,
    type MarkdownDelimiters,
    type MarkdownInlineOutput,
    type MarkdownLinePrefix,
    type MarkdownMarkForm,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineElementNode,
    type RteInlineNode,
    type RteTextNode,
} from '#/core';

import { MAX_DEPTH, sameValue } from './canonical';
import { EMPTY_BLOCK_ENTITY } from './emptyBlock';
import { entityOf, escapeClosingHashes, escapeText, escapeTrailingBang, type TextPosition } from './escape';
import { fixFlanking, isEmphasisDelimiter } from './flanking';
import { type MarkdownForms } from './forms';
import {
    type DelimiterPair,
    type DelimiterToken,
    encodeLineEdges,
    type InlineToken,
    isSpaceToken,
} from './inlineTokens';
import { type Tokenize } from './markdownIt';
import {
    addInlineRun,
    addTextRun,
    type Lost,
    readBackOf,
    type ReadBackResult,
    type Run,
    type RunMark,
} from './readBack';

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
    /** Reads what a text block wrote back, to check that it reads as the block. */
    tokenize: Tokenize;
};

export type WriteResult = {
    markdown: string;
    losses: MarkdownLoss[];
};

type WriteState = WriteContext & { losses: MarkdownLoss[] };

type NodeValue = Record<string, unknown>;

type Path = readonly number[];

const LINE_SEPARATOR = '\n';
const CARRIAGE_RETURN = '\r';
const HARD_BREAK = '\\\n';

const NO_PREFIX: MarkdownLinePrefix = { first: '', rest: '' };

/** What goes between two blocks' lines: a blank line, except where a list item's list follows its paragraph. */
type BlockGap = 'blankLine' | 'itemChildren';

const BLANK_LINE: readonly string[] = [''];
const NO_LINES: readonly string[] = [];

/** Whether a line break stays one, or the block holds a single line and the break writes as a space. */
type LineMode = 'multiline' | 'singleLine';

const SPACE = ' ';

const UNKNOWN_TYPE = 'unknown';

// --- Inlines ---

type CarriedMark = { name: string; value: NodeValue; form: MarkdownMarkForm };

/** What a text block's inlines are once the runs sharing a mark sit inside one piece, as the marks nest. */
type Piece =
    | { kind: 'text'; text: string }
    | { kind: 'output'; output: MarkdownInlineOutput; path: Path; type: string; value: NodeValue }
    | { kind: 'mark'; mark: CarriedMark; path: Path; paths: Path[]; pieces: Piece[] };

type OpenMark = Extract<Piece, { kind: 'mark' }>;

type OutputPiece = Extract<Piece, { kind: 'output' }>;

/** Whether the text a mark wraps is escaped, or written as is (inline code). */
type TextMode = 'escaped' | 'literal';

/** The delimiter a mark that writes `*` is written with: `*`, or `_` on the retry where `*` did not read back. */
type EmphasisDelimiter = '*' | '_';

type TokenContext = {
    /** Where the marks that give no delimiters are lost. */
    losses: MarkdownLoss[];
    emphasis: EmphasisDelimiter;
};

const ASTERISK = '*';
const UNDERSCORE = '_';
const LINK_OPEN = '[';

/** A stored mark value that puts the mark on: `false` and `null` say it is off, as if left out. */
const isCarried = (stored: unknown): boolean => stored !== undefined && stored !== null && stored !== false;

const isNode = <TNode extends object>(value: unknown): value is TNode =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

/** What a loss names a node by: its type, or `unknown` for one a host sent without a usable type. */
const typeNameOf = (node: unknown): string => {
    if (isNode<{ type?: unknown }>(node) && typeof node.type === 'string') {
        return node.type;
    }

    return UNKNOWN_TYPE;
};

const samePath = (left: Path, right: Path): boolean =>
    left.length === right.length && left.every((step, index) => step === right[index]);

/** Adds the loss unless the node is already in `losses`, so a node is reported once however many rules find it. */
const reportLoss = (losses: MarkdownLoss[], loss: MarkdownLoss): void => {
    if (!losses.some((reported) => reported.type === loss.type && samePath(reported.path, loss.path))) {
        losses.push(loss);
    }
};

/** A mark lost is reported at every text it covered, as a mark with no form is. */
const reportMarkLoss = (losses: MarkdownLoss[], mark: string, paths: readonly Path[]): void => {
    for (const path of paths) {
        reportLoss(losses, { path, type: mark });
    }
};

const isTextRun = (inline: RteInlineNode): inline is RteTextNode => typeof inline.text === 'string';

const isInlineElement = (inline: RteInlineNode): inline is RteInlineElementNode =>
    inline.text === undefined && typeof inline.type === 'string';

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
            reportLoss(state.losses, { path, type: name });
        } else {
            carried.push({ name, value: markValueOf(text[name]), form });
        }
    }

    for (const name of Object.keys(text)) {
        if (name !== 'text' && name !== 'type' && isCarried(text[name]) && !state.registry.marks.has(name)) {
            reportLoss(state.losses, { path, type: name });
        }
    }

    return carried;
};

const sameMark = (left: CarriedMark, right: CarriedMark): boolean =>
    left.name === right.name && sameValue(left.value, right.value);

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
const inlinePieceOf = (
    inline: RteInlineElementNode,
    path: Path,
    lineMode: LineMode,
    state: WriteState,
): Piece | null => {
    const { type, text: _text, ...value } = inline;
    const output = state.forms.inlines.get(type)?.write(value) ?? null;
    if (output === null) {
        reportLoss(state.losses, { path, type });

        return null;
    }
    if (output.kind === 'lineBreak' && lineMode === 'singleLine') {
        reportLoss(state.losses, { path, type });

        return { kind: 'text', text: SPACE };
    }

    return { kind: 'output', output, path, type, value };
};

/** A break that ends the block, or is followed only by breaks, would start a line that holds nothing: it is left out. */
const withoutTrailingBreaks = (pieces: Piece[], state: WriteState): Piece[] => {
    let end = pieces.length;
    while (end > 0) {
        const last = pieces[end - 1];
        if (last?.kind !== 'output' || last.output.kind !== 'lineBreak') {
            break;
        }
        end--;
    }

    for (const piece of pieces.slice(end)) {
        if (piece.kind === 'output') {
            reportLoss(state.losses, { path: piece.path, type: piece.type });
        }
    }

    return pieces.slice(0, end);
};

type AddTextPieceParams = {
    root: Piece[];
    open: OpenMark[];
    inline: RteTextNode;
    path: Path;
    state: WriteState;
};

const addTextPiece = ({ root, open, inline, path, state }: AddTextPieceParams): void => {
    const marks = carriedMarks(inline, path, state);
    const keep = sharedMarkCount(open, marks);

    closeMarks(root, open, keep);
    for (const mark of marks.slice(keep)) {
        open.push({ kind: 'mark', mark, path, paths: [], pieces: [] });
    }
    for (const mark of open) {
        mark.paths.push(path);
    }

    (open[open.length - 1]?.pieces ?? root).push({ kind: 'text', text: inline.text });
};

/**
 * A text block's inlines, with each mark opened once around the whole stretch of neighbours sharing it, as the
 * renderer does, so a bold link that is partly italic is still one link.
 */
const piecesOf = (inlines: readonly unknown[], parentPath: Path, lineMode: LineMode, state: WriteState): Piece[] => {
    const root: Piece[] = [];
    const open: OpenMark[] = [];

    for (const [index, inline] of inlines.entries()) {
        const path = [...parentPath, index];

        if (!isNode<RteInlineNode>(inline)) {
            reportLoss(state.losses, { path, type: typeNameOf(inline) });
            continue;
        }

        if (isInlineElement(inline)) {
            closeMarks(root, open, 0);
            const piece = inlinePieceOf(inline, path, lineMode, state);
            if (piece !== null) {
                root.push(piece);
            }
            continue;
        }

        if (!isTextRun(inline)) {
            reportLoss(state.losses, { path, type: typeNameOf(inline) });
            continue;
        }

        if (inline.text === '') {
            continue;
        }

        addTextPiece({ root, open, inline, path, state });
    }

    closeMarks(root, open, 0);

    return withoutTrailingBreaks(root, state);
};

const isDropped = ({ mark, path }: OpenMark, dropped: readonly MarkdownLoss[]): boolean =>
    dropped.some((loss) => loss.type === mark.name && samePath(loss.path, path));

/** The text an inline element wrote when its form writes plain text, which reads back as text and not as the element. */
const plainTextOutputOf = (output: MarkdownInlineOutput): string | null => {
    if (output.kind === 'text') {
        return output.text;
    }

    return null;
};

const addRuns = (
    runs: Run[],
    pieces: readonly Piece[],
    marks: readonly RunMark[],
    dropped: readonly MarkdownLoss[],
) => {
    for (const piece of pieces) {
        switch (piece.kind) {
            case 'text':
                addTextRun(runs, piece.text, marks);
                break;
            case 'output':
                addInlineRun(runs, piece.type, piece.value, piece.path, plainTextOutputOf(piece.output));
                break;
            case 'mark':
                if (isDropped(piece, dropped)) {
                    addRuns(runs, piece.pieces, marks, dropped);
                } else {
                    addRuns(
                        runs,
                        piece.pieces,
                        [...marks, { name: piece.mark.name, value: piece.mark.value, paths: piece.paths }],
                        dropped,
                    );
                }
                break;
        }
    }
};

/** What the document holds once the marks the writer reported lost are taken off: what its Markdown should read back as. */
const referenceOf = (pieces: readonly Piece[], dropped: readonly MarkdownLoss[]): Run[] => {
    const runs: Run[] = [];
    addRuns(runs, pieces, [], dropped);

    return runs;
};

/** The inline elements the pieces write, which are the ones a block's Markdown may not read back. */
const inlineElementsOf = (pieces: readonly Piece[]): MarkdownLoss[] => {
    const elements: MarkdownLoss[] = [];
    for (const piece of pieces) {
        switch (piece.kind) {
            case 'output':
                elements.push({ path: piece.path, type: piece.type });
                break;
            case 'mark':
                elements.push(...inlineElementsOf(piece.pieces));
                break;
            case 'text':
                break;
        }
    }

    return elements;
};

/** Whether the pieces hold a mark or an inline element, which the text of a run does not show. */
const hasInnerMarkup = (pieces: readonly Piece[]): boolean => pieces.some((piece) => piece.kind !== 'text');

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

const appendAll = (tokens: InlineToken[], added: readonly InlineToken[]): void => {
    for (const token of added) {
        tokens.push(token);
    }
};

const appendChars = (tokens: InlineToken[], text: string, mode: TextMode): void => {
    for (const char of text) {
        // A line separator is a reference, so it never ends a line of the Markdown.
        const entity = mode === 'escaped' && (char === LINE_SEPARATOR || char === CARRIAGE_RETURN);
        tokens.push({ kind: 'char', char, entity, verbatim: mode === 'literal' });
    }
};

const appendOutput = (tokens: InlineToken[], { output, type }: OutputPiece, mode: TextMode): void => {
    switch (output.kind) {
        case 'text':
            appendChars(tokens, output.text, mode);
            break;
        case 'markdown':
            if (output.markdown !== '') {
                tokens.push({ kind: 'literal', text: output.markdown, type });
            }
            break;
        case 'lineBreak':
            tokens.push({ kind: 'break', type });
            break;
    }
};

/**
 * The delimiters the mark's form writes, except that a mark writing `*` and `*` is written with `_` and `_` on the
 * retry, where `*` did not read back.
 */
const delimitersOf = (written: MarkdownDelimiters, emphasis: EmphasisDelimiter): MarkdownDelimiters => {
    if (emphasis === UNDERSCORE && written.open === ASTERISK && written.close === ASTERISK) {
        return { open: UNDERSCORE, close: UNDERSCORE };
    }

    return written;
};

const delimiterOf = (text: string, open: boolean, pair: DelimiterPair, literal: boolean): InlineToken => ({
    kind: 'delimiter',
    text,
    open,
    pair,
    emphasis: !literal && isEmphasisDelimiter(text),
});

const appendMark = (tokens: InlineToken[], piece: OpenMark, mode: TextMode, context: TokenContext): void => {
    const { mark, paths, pieces } = piece;
    const written = mark.form.write(mark.value, { text: plainTextOf(pieces), marked: hasInnerMarkup(pieces) });
    if (written === null) {
        reportMarkLoss(context.losses, mark.name, paths);
        appendTokens(tokens, pieces, mode, context);

        return;
    }

    const literal = written.literal === true;
    let innerMode = mode;
    if (literal) {
        innerMode = 'literal';
    }

    const inner: InlineToken[] = [];
    appendTokens(inner, pieces, innerMode, context);

    // The whitespace at the edges of the marked text goes outside the delimiters, where Markdown reads them as emphasis.
    let start = 0;
    while (start < inner.length && isSpaceToken(inner[start])) {
        start++;
    }
    let end = inner.length;
    while (end > start && isSpaceToken(inner[end - 1])) {
        end--;
    }
    if (start === end) {
        appendAll(tokens, inner);

        return;
    }

    const delimiters = delimitersOf(written, context.emphasis);
    const pair: DelimiterPair = { mark: mark.name, paths };
    appendAll(tokens, inner.slice(0, start));
    tokens.push(delimiterOf(delimiters.open, true, pair, literal));
    appendAll(tokens, inner.slice(start, end));
    tokens.push(delimiterOf(delimiters.close, false, pair, literal));
    appendAll(tokens, inner.slice(end));
};

const appendTokens = (tokens: InlineToken[], pieces: readonly Piece[], mode: TextMode, context: TokenContext): void => {
    for (const piece of pieces) {
        switch (piece.kind) {
            case 'text':
                appendChars(tokens, piece.text, mode);
                break;
            case 'output':
                appendOutput(tokens, piece, mode);
                break;
            case 'mark':
                appendMark(tokens, piece, mode, context);
                break;
        }
    }
};

/** What is escaped as one stretch of text, or written as is, or the end of a line. */
type Segment = { kind: 'text'; text: string } | { kind: 'written'; text: string } | { kind: 'break' };

const writtenTextOf = (token: Exclude<InlineToken, { kind: 'break' }>): string => {
    switch (token.kind) {
        case 'char':
            if (token.entity) {
                return entityOf(token.char);
            }

            return token.char;
        case 'literal':
        case 'delimiter':
            return token.text;
    }
};

const segmentsOf = (tokens: readonly InlineToken[]): Segment[] => {
    const segments: Segment[] = [];
    let text = '';
    for (const token of tokens) {
        if (token.kind === 'char' && !token.entity && !token.verbatim) {
            text += token.char;
            continue;
        }

        if (text !== '') {
            segments.push({ kind: 'text', text });
            text = '';
        }
        if (token.kind === 'break') {
            segments.push({ kind: 'break' });
        } else {
            segments.push({ kind: 'written', text: writtenTextOf(token) });
        }
    }

    if (text !== '') {
        segments.push({ kind: 'text', text });
    }

    return segments;
};

const writeSegments = (segments: readonly Segment[], state: WriteState): string => {
    let written = '';
    let atLineStart = true;
    for (const [index, segment] of segments.entries()) {
        switch (segment.kind) {
            case 'text': {
                let position: TextPosition = 'inline';
                if (atLineStart) {
                    position = 'lineStart';
                }

                let text = escapeText(segment.text, position);
                const next = segments[index + 1];
                if (next?.kind === 'written' && next.text.startsWith(LINK_OPEN)) {
                    text = escapeTrailingBang(text);
                }
                written += text;
                atLineStart = false;
                break;
            }
            case 'written':
                written += segment.text;
                atLineStart = false;
                break;
            case 'break':
                // A bare newline at a line start would make a blank line, so it is the hard break.
                if (state.breaks && !atLineStart) {
                    written += LINE_SEPARATOR;
                } else {
                    written += HARD_BREAK;
                }
                atLineStart = true;
                break;
        }
    }

    return written;
};

/** One way of writing a text block's inlines, and whether the Markdown reads back as they were meant to. */
type Attempt = {
    text: string;
    /** What the attempt lost that the pieces did not: a mark whose form gave no delimiters, or no reference could fix. */
    losses: MarkdownLoss[];
    /** The marks written with delimiters. */
    marks: DelimiterPair[];
    /** Whether a mark is written with `*` and `*`, which the retry writes with `_`. */
    writesAsterisks: boolean;
    readBack: ReadBackResult;
};

const isOpeningDelimiter = (token: InlineToken): token is DelimiterToken => token.kind === 'delimiter' && token.open;

const isAsteriskPair = (tokens: readonly InlineToken[], pair: DelimiterPair): boolean =>
    tokens.every((token) => token.kind !== 'delimiter' || token.pair !== pair || token.text === ASTERISK);

const attemptOf = (
    pieces: readonly Piece[],
    emphasis: EmphasisDelimiter,
    lineMode: LineMode,
    state: WriteState,
): Attempt => {
    const losses: MarkdownLoss[] = [];
    const laidOut: InlineToken[] = [];
    appendTokens(laidOut, pieces, 'escaped', { losses, emphasis });
    encodeLineEdges(laidOut);

    const { tokens, dropped } = fixFlanking(laidOut);
    for (const { paths, mark } of dropped) {
        reportMarkLoss(losses, mark, paths);
    }
    const marks = tokens.filter(isOpeningDelimiter).map(({ pair }) => pair);
    const writesAsterisks = marks.some((pair) => isAsteriskPair(tokens, pair));

    // A block with no text at all is the empty block, which is its only spelling.
    let text = EMPTY_BLOCK_ENTITY;
    if (tokens.length > 0) {
        text = writeSegments(segmentsOf(tokens), state);
        if (lineMode === 'singleLine') {
            text = escapeClosingHashes(text);
        }
    }

    return {
        text,
        losses,
        marks,
        writesAsterisks,
        readBack: readBackOf(text, referenceOf(pieces, losses), state, state.tokenize),
    };
};

/** What a block lost when its Markdown does not read back as written: what differs where that is known, else each mark and inline element it holds, or the block itself. */
const unreadableLosses = (
    lost: readonly Lost[],
    marks: readonly DelimiterPair[],
    inlineElements: readonly MarkdownLoss[],
    block: RteBlockNode,
    path: Path,
): MarkdownLoss[] => {
    if (lost.length > 0) {
        return [...lost];
    }

    const losses: MarkdownLoss[] = [];
    for (const { mark, paths } of marks) {
        reportMarkLoss(losses, mark, paths);
    }
    losses.push(...inlineElements);
    if (losses.length === 0) {
        return [{ path, type: typeNameOf(block) }];
    }

    return losses;
};

const writeInlines = (block: RteBlockNode, path: Path, lineMode: LineMode, state: WriteState): string => {
    const pieces = piecesOf(childrenOf(block), path, lineMode, state);
    const first = attemptOf(pieces, ASTERISK, lineMode, state);
    let chosen = first;
    if (first.readBack.kind === 'differs' && first.writesAsterisks) {
        const retry = attemptOf(pieces, UNDERSCORE, lineMode, state);
        if (retry.readBack.kind === 'same') {
            chosen = retry;
        }
    }

    for (const loss of chosen.losses) {
        reportLoss(state.losses, loss);
    }
    if (chosen.readBack.kind === 'differs') {
        for (const loss of unreadableLosses(
            chosen.readBack.lost,
            chosen.marks,
            inlineElementsOf(pieces),
            block,
            path,
        )) {
            reportLoss(state.losses, loss);
        }
    }

    return chosen.text;
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
    if (!isNode<{ type?: unknown; children?: unknown }>(child)) {
        return false;
    }

    const { type, children } = child;

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
        const prefix = form.write(blockValueOf(definition, block as NodeValue), { index: 0, alternate: false });
        if (prefix !== null) {
            return prefix;
        }
    }

    reportLoss(state.losses, { path, type: typeNameOf(block) });

    return NO_PREFIX;
};

/** A block attribute a text block carries (its alignment) has no Markdown form, so it is a loss. */
const reportBlockAttributes = (block: RteBlockNode, path: Path, state: WriteState): void => {
    for (const name of state.registry.blockAttributes.keys()) {
        const value = (block as NodeValue)[name];
        if (typeof value === 'string' && value !== '') {
            reportLoss(state.losses, { path, type: name });
        }
    }
};

const writeTextBlock = (block: RteBlockNode, path: Path, state: WriteState): string[] => {
    const prefix = prefixOf(block, path, state);
    reportBlockAttributes(block, path, state);

    let lineMode: LineMode = 'multiline';
    if (prefix.rest === null) {
        lineMode = 'singleLine';
    }

    const text = writeInlines(block, path, lineMode, state);

    return prefixed(text.split(LINE_SEPARATOR), prefix);
};

/** A void block writes only its prefix; a form that writes no line, or children it cannot hold, are a loss. */
const writeVoidBlock = (block: RteBlockNode, path: Path, state: WriteState): string[] => {
    const lines = prefixed([], prefixOf(block, path, state));
    if (lines.length === 0 || childrenOf(block).length > 0) {
        reportLoss(state.losses, { path, type: typeNameOf(block) });
    }

    return lines;
};

/** The first number of an ordered list's marker, which decides whether the list can interrupt a paragraph. */
const ORDINAL_MARKER = /^(\d+)[.)]/;

const FIRST_ORDINAL = '1';

/** A bullet can; an ordered list can only when it starts at 1. */
const canInterruptParagraph = (firstLine: string): boolean => {
    const ordinal = ORDINAL_MARKER.exec(firstLine);

    return ordinal === null || ordinal[1] === FIRST_ORDINAL;
};

/** In a list item, a list follows its paragraph on the next line where it can interrupt it; any other two blocks keep the blank line. */
const linesBetween = (
    gap: BlockGap,
    previous: RteBlockNode,
    next: { block: RteBlockNode; lines: readonly string[] },
    state: WriteState,
): readonly string[] => {
    switch (gap) {
        case 'blankLine':
            return BLANK_LINE;
        case 'itemChildren':
            if (
                kindOf(next.block, state.registry) === 'list' &&
                kindOf(previous, state.registry) !== 'list' &&
                canInterruptParagraph(next.lines[0] ?? '')
            ) {
                return NO_LINES;
            }

            return BLANK_LINE;
    }
};

type WrittenBlock = { block: RteBlockNode; alternate: boolean };

/** A list that directly follows a list of the same type writes with the other marker, and the one after it switches back. */
const isAlternate = (block: RteBlockNode, previous: WrittenBlock | null, state: WriteState): boolean => {
    if (previous?.block.type !== block.type || kindOf(block, state.registry) !== 'list') {
        return false;
    }

    return !previous.alternate;
};

const writeBlocks = (blocks: readonly unknown[], parentPath: Path, gap: BlockGap, state: WriteState): string[] => {
    const lines: string[] = [];
    let previous: WrittenBlock | null = null;
    for (const [index, block] of blocks.entries()) {
        const path = [...parentPath, index];
        if (!isNode<RteBlockNode>(block)) {
            reportLoss(state.losses, { path, type: typeNameOf(block) });
            continue;
        }

        const alternate = isAlternate(block, previous, state);
        const blockLines = writeBlock(block, path, alternate, state);
        if (blockLines.length === 0) {
            continue;
        }
        if (previous !== null) {
            lines.push(...linesBetween(gap, previous.block, { block, lines: blockLines }, state));
        }
        for (const line of blockLines) {
            lines.push(line);
        }
        previous = { block, alternate };
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

    return prefixed(writeBlocks(childrenOf(block), path, gap, state), prefix);
};

type ListItemLines = { item: unknown; prefix: MarkdownLinePrefix };

/** The prefix of every item, or null when the list or any of its items has none. */
const itemPrefixesOf = (
    block: RteBlockNode,
    items: readonly unknown[],
    alternate: boolean,
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
        const prefix = form.write(value, { index, alternate });
        if (prefix === null) {
            return null;
        }
        entries.push({ item, prefix });
    }

    return entries;
};

/** A list: each item's lines carry the item's own prefix. Without one for every item, the items are written as blocks. */
const writeList = (block: RteBlockNode, path: Path, alternate: boolean, state: WriteState): string[] => {
    const items = childrenOf(block);
    if (items.length === 0) {
        reportLoss(state.losses, { path, type: typeNameOf(block) });

        return [];
    }

    const entries = itemPrefixesOf(block, items, alternate, state);
    if (entries === null) {
        reportLoss(state.losses, { path, type: typeNameOf(block) });

        return writeBlocks(items, path, 'blankLine', state);
    }

    const lines: string[] = [];
    for (const [index, { item, prefix }] of entries.entries()) {
        if (!isNode<RteBlockNode>(item)) {
            reportLoss(state.losses, { path: [...path, index], type: typeNameOf(item) });
            continue;
        }

        // A bare marker would read as a setext underline under a paragraph line, so an item with no lines holds the empty block.
        let itemLines = writeBlock(item, [...path, index], false, state);
        if (itemLines.length === 0) {
            itemLines = [EMPTY_BLOCK_ENTITY];
        }

        for (const line of prefixed(itemLines, prefix)) {
            lines.push(line);
        }
    }

    return lines;
};

const writeBlock = (block: RteBlockNode, path: Path, alternate: boolean, state: WriteState): string[] => {
    if (path.length > MAX_DEPTH) {
        reportLoss(state.losses, { path, type: typeNameOf(block) });

        return [];
    }

    if (block.children !== undefined && !Array.isArray(block.children)) {
        reportLoss(state.losses, { path, type: typeNameOf(block) });
    }

    switch (kindOf(block, state.registry)) {
        case 'text':
            return writeTextBlock(block, path, state);
        case 'list':
            return writeList(block, path, alternate, state);
        case 'container':
            return writeContainer(block, path, state);
        case 'void':
            return writeVoidBlock(block, path, state);
    }
};

export const writeDocument = <TBlock extends RteBlockNode>(
    document: RteDocumentOf<TBlock>,
    context: WriteContext,
): WriteResult => {
    const state: WriteState = { ...context, losses: [] };
    const markdown = writeBlocks(document.blocks, [], 'blankLine', state).join(LINE_SEPARATOR);

    // The empty document is one empty paragraph, which is the empty string, not an empty-paragraph entity.
    if (document.blocks.length === 1 && markdown === EMPTY_BLOCK_ENTITY) {
        return { markdown: '', losses: state.losses };
    }

    return { markdown, losses: state.losses };
};
