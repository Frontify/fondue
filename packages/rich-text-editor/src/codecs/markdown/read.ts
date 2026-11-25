/* (c) Copyright Frontify Ltd., all rights reserved. */

// Markdown as a document, built from the token stream alone, never through the editor's schema.

import {
    ANY_LIST,
    type ContentModel,
    type ContentRegistry,
    DOCUMENT_VERSION,
    emptyDocument,
    PARAGRAPH,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type RteTextNode,
    type StoredMarkValue,
} from '#/core';

import { sameValue } from './canonical';
import { EMPTY_BLOCK_TEXT } from './emptyBlock';
import { matchToken, type MarkdownForms, type TextReader } from './forms';
import { INLINE_TOKEN, type MarkdownTokenNode, tokenize } from './markdownIt';

export type ReadContext = {
    registry: ContentRegistry;
    forms: MarkdownForms;
    breaks: boolean;
};

const OPENING = 1;
const CLOSING = -1;
const SELF_CLOSING = 0;

const TEXT = 'text';
const TEXT_SPECIAL = 'text_special';
const SOFT_BREAK = 'softbreak';
const HARD_BREAK = 'hardbreak';
const FENCE = 'fence';
const CODE_BLOCK = 'code_block';

/** What a line break reads as when no plugin has a break. */
const LINE_BREAK_TEXT = ' ';

const LINE_SEPARATOR = '\n';

const TRAILING_NEWLINE = /\n$/;

type NodeValue = Record<string, unknown>;

type MarkSet = Record<string, StoredMarkValue>;

// --- Inlines ---

/** A mark token still open: the mark it reads as, or none when no plugin has a form for it. */
type OpenMark = { kind: 'mark'; name: string; stored: StoredMarkValue } | { kind: 'ignored' };

type InlineState = {
    nodes: RteInlineNode[];
    open: OpenMark[];
};

type PatternHit = { index: number; length: number; node: RteInlineNode };

const isTextNode = (node: RteInlineNode): node is RteTextNode => node.text !== undefined;

const marksOf = (open: readonly OpenMark[]): MarkSet => {
    const marks: MarkSet = {};
    for (const mark of open) {
        if (mark.kind === 'mark') {
            marks[mark.name] = mark.stored;
        }
    }

    return marks;
};

const sameMarks = (left: NodeValue, right: NodeValue): boolean => {
    const names = Object.keys(left);

    return (
        names.length === Object.keys(right).length &&
        names.every((name) => name in right && sameValue(left[name], right[name]))
    );
};

/** Adds the text to the run before it when both carry the same marks. */
const addText = (nodes: RteInlineNode[], text: string, marks: MarkSet): void => {
    if (text === '') {
        return;
    }

    const previous = nodes[nodes.length - 1];
    if (previous !== undefined && isTextNode(previous)) {
        const { text: previousText, ...previousMarks } = previous;
        if (sameMarks(previousMarks, marks)) {
            previous.text = `${previousText}${text}`;
            return;
        }
    }

    nodes.push({ text, ...marks });
};

/** A mark that carries nothing is stored as `true`. */
const storedMarkOf = (value: NodeValue): StoredMarkValue => {
    if (Object.keys(value).length === 0) {
        return true;
    }

    return value;
};

const openMark = (token: MarkdownTokenNode, forms: MarkdownForms): OpenMark => {
    const match = matchToken(forms.markReaders, token);
    if (match === null) {
        return { kind: 'ignored' };
    }

    return { kind: 'mark', name: match.name, stored: storedMarkOf(match.value) };
};

const patternHitsIn = (text: string, readers: readonly TextReader[]): PatternHit[] => {
    const hits: PatternHit[] = [];
    for (const { name, pattern, value } of readers) {
        for (const match of text.matchAll(pattern)) {
            const attributes = value(match);
            if (attributes !== null && match[0].length > 0) {
                hits.push({ index: match.index, length: match[0].length, node: { type: name, ...attributes } });
            }
        }
    }

    // A stable sort, so patterns that match at the same place keep registry order.
    return hits.sort((left, right) => left.index - right.index);
};

/** Text patterns split the text of a `text` token only: escaped characters and code are tokens of their own. */
const readText = (state: InlineState, text: string, readers: readonly TextReader[]): void => {
    const marks = marksOf(state.open);
    let cursor = 0;
    for (const hit of patternHitsIn(text, readers)) {
        if (hit.index >= cursor) {
            addText(state.nodes, text.slice(cursor, hit.index), marks);
            state.nodes.push(hit.node);
            cursor = hit.index + hit.length;
        }
    }

    addText(state.nodes, text.slice(cursor), marks);
};

/** What a token with no form keeps: its text, and a space for a hard break. */
const plainTextOf = (token: MarkdownTokenNode): string => {
    if (token.type === HARD_BREAK) {
        return LINE_BREAK_TEXT;
    }

    return token.content;
};

/** A token standing alone that is not text: an inline element, a mark on its own content (code), or its content. */
const readLeaf = (state: InlineState, token: MarkdownTokenNode, forms: MarkdownForms): void => {
    const inline = matchToken(forms.inlineReaders, token);
    if (inline !== null) {
        state.nodes.push({ type: inline.name, ...inline.value });
        return;
    }

    const mark = matchToken(forms.markReaders, token);
    if (mark !== null) {
        addText(state.nodes, token.content, { ...marksOf(state.open), [mark.name]: storedMarkOf(mark.value) });
        return;
    }

    addText(state.nodes, plainTextOf(token), marksOf(state.open));
};

const readSelfClosing = (state: InlineState, token: MarkdownTokenNode, context: ReadContext): void => {
    switch (token.type) {
        case TEXT:
            readText(state, token.content, context.forms.textReaders);
            break;
        case TEXT_SPECIAL:
            addText(state.nodes, token.content, marksOf(state.open));
            break;
        case SOFT_BREAK:
            if (context.breaks) {
                readLeaf(state, { ...token, type: HARD_BREAK }, context.forms);
            } else {
                addText(state.nodes, LINE_BREAK_TEXT, marksOf(state.open));
            }
            break;
        default:
            readLeaf(state, token, context.forms);
    }
};

export const readInlines = (tokens: readonly MarkdownTokenNode[], context: ReadContext): RteInlineNode[] => {
    const state: InlineState = { nodes: [], open: [] };
    for (const token of tokens) {
        switch (token.nesting) {
            case OPENING:
                state.open.push(openMark(token, context.forms));
                break;
            case CLOSING:
                state.open.pop();
                break;
            case SELF_CLOSING:
                readSelfClosing(state, token, context);
                break;
        }
    }

    return state.nodes;
};

/** A text block holding only a non-breaking space is the empty one, as the writer spells it. */
export const withoutPlaceholder = (nodes: RteInlineNode[]): RteInlineNode[] => {
    const texts = nodes.filter(isTextNode);
    if (texts.length === nodes.length && texts.map((node) => node.text).join('') === EMPTY_BLOCK_TEXT) {
        return [];
    }

    return nodes;
};

// --- Blocks ---

/** A block as a plugin's form reads it from a token: its type and attributes. */
type ReadBlock = { type: string; attributes: NodeValue };

type FrameKind =
    | { kind: 'root' }
    /** A container no plugin reads, or one the place does not allow: its blocks go to the parent as they are. */
    | { kind: 'passthrough' }
    /** A block holding other blocks (a list, an item): its blocks become its children. */
    | { kind: 'container'; block: ReadBlock }
    /** A text block whose tokens hold one `inline` token (a paragraph, a heading). */
    | { kind: 'text'; block: ReadBlock }
    /** A text block's token that holds paragraphs (a quote): each becomes one block of its type. */
    | { kind: 'textContainer'; block: ReadBlock };

/** A container token still open; the frames link up through `parent` to the root, as a stack. */
type Frame = { blocks: RteBlockNode[] } & (
    | { kind: 'root'; parent: null }
    | ({ parent: Frame } & Exclude<FrameKind, { kind: 'root' }>)
);

type TextContainerFrame = Extract<Frame, { kind: 'textContainer' }>;

const PARAGRAPH_BLOCK: ReadBlock = { type: PARAGRAPH, attributes: {} };

const containerAllows = (content: ContentModel | undefined, type: string, registry: ContentRegistry): boolean => {
    if (typeof content !== 'object') {
        return false;
    }
    if ('items' in content) {
        return content.items === type;
    }
    if ('blocks' in content) {
        return (
            content.blocks.includes(type) || (content.blocks.includes(ANY_LIST) && registry.itemTypeByList.has(type))
        );
    }

    return content.parts.includes(type);
};

/** Whether the nearest block that holds blocks takes this type; an item is only ever held by a list. */
const allowedIn = (frame: Frame, type: string, context: ReadContext): boolean => {
    switch (frame.kind) {
        case 'root':
            return !context.forms.itemTypes.has(type);
        case 'container':
            return containerAllows(context.registry.blocks.get(frame.block.type)?.content, type, context.registry);
        case 'passthrough':
        case 'text':
        case 'textContainer':
            return allowedIn(frame.parent, type, context);
    }
};

const textContainerOf = (frame: Frame): TextContainerFrame | null => {
    switch (frame.kind) {
        case 'textContainer':
            return frame;
        case 'passthrough':
        case 'text':
            return textContainerOf(frame.parent);
        case 'root':
        case 'container':
            return null;
    }
};

const resolveBlock = (token: MarkdownTokenNode, context: ReadContext): ReadBlock | null => {
    const match = matchToken(context.forms.blockReaders, token);
    if (match === null) {
        return null;
    }

    return { type: match.name, attributes: match.value };
};

const openFrame = (
    parent: Frame,
    token: MarkdownTokenNode,
    next: MarkdownTokenNode | undefined,
    context: ReadContext,
): Frame => {
    const holdsInline = next?.type === INLINE_TOKEN;
    const block = resolveBlock(token, context);

    if (block === null) {
        // A heading, or a table cell, that no plugin reads is a paragraph.
        if (holdsInline) {
            return { kind: 'text', parent, block: PARAGRAPH_BLOCK, blocks: [] };
        }

        return { kind: 'passthrough', parent, blocks: [] };
    }

    const content = context.registry.blocks.get(block.type)?.content;
    if (content === 'text') {
        if (holdsInline) {
            return { kind: 'text', parent, block, blocks: [] };
        }

        return { kind: 'textContainer', parent, block, blocks: [] };
    }
    if (typeof content === 'object' && allowedIn(parent, block.type, context)) {
        return { kind: 'container', parent, block, blocks: [] };
    }

    return { kind: 'passthrough', parent, blocks: [] };
};

/** A list item holds one or more blocks, so an item with none (`-` alone) holds one empty paragraph. */
const childrenOfContainer = (frame: Extract<Frame, { kind: 'container' }>, context: ReadContext): RteBlockNode[] => {
    if (frame.blocks.length === 0 && context.forms.itemTypes.has(frame.block.type)) {
        return [{ type: PARAGRAPH, children: [] }];
    }

    return frame.blocks;
};

const finishedBlocks = (frame: Frame, context: ReadContext): RteBlockNode[] => {
    switch (frame.kind) {
        case 'container':
            return [
                { type: frame.block.type, ...frame.block.attributes, children: childrenOfContainer(frame, context) },
            ];
        case 'root':
        case 'passthrough':
        case 'text':
        case 'textContainer':
            return frame.blocks;
    }
};

const closeFrame = (frame: Frame, context: ReadContext): Frame => {
    // Every closing token follows its opening one, so the root is never closed.
    if (frame.kind === 'root') {
        return frame;
    }

    for (const block of finishedBlocks(frame, context)) {
        frame.parent.blocks.push(block);
    }

    return frame.parent;
};

/** Puts a text block in the frame, as the block its place makes of it. */
const emitText = (frame: Frame, block: ReadBlock, children: RteInlineNode[], context: ReadContext): void => {
    let placed = block;
    if (placed.type === PARAGRAPH) {
        const container = textContainerOf(frame);
        if (container !== null) {
            placed = container.block;
        }
    }
    // A list item holds paragraphs and lists only.
    if (!allowedIn(frame, placed.type, context)) {
        placed = PARAGRAPH_BLOCK;
    }

    frame.blocks.push({ type: placed.type, ...placed.attributes, children });
};

const readInline = (frame: Frame, token: MarkdownTokenNode, context: ReadContext): void => {
    let block = PARAGRAPH_BLOCK;
    if (frame.kind === 'text') {
        block = frame.block;
    }

    emitText(frame, block, withoutPlaceholder(readInlines(token.children, context)), context);
};

const lineInlines = (line: string): RteInlineNode[] => {
    if (line === '') {
        return [];
    }

    return [{ text: line }];
};

/** The block of code's text, which has the line break the token ends with dropped, or no text at all when it is empty. */
const codeChildrenOf = (token: MarkdownTokenNode): RteTextNode[] => {
    const text = token.content.replace(TRAILING_NEWLINE, '');
    if (text === '') {
        return [];
    }

    return [{ text }];
};

/** A block of code: a block of its own where a plugin reads it and the place allows it, else one paragraph per line. */
const readCode = (frame: Frame, token: MarkdownTokenNode, context: ReadContext): void => {
    const match = matchToken(context.forms.codeReaders, token);
    if (match !== null && allowedIn(frame, match.name, context)) {
        frame.blocks.push({ type: match.name, ...match.value, children: codeChildrenOf(token) });
        return;
    }

    if (token.content === '') {
        return;
    }

    for (const line of token.content.replace(TRAILING_NEWLINE, '').split(LINE_SEPARATOR)) {
        emitText(frame, PARAGRAPH_BLOCK, lineInlines(line), context);
    }
};

/** A token standing alone: its text, or a block of code. A rule (`hr`) is dropped, as no plugin reads it. */
const readSelfClosingBlock = (frame: Frame, token: MarkdownTokenNode, context: ReadContext): void => {
    switch (token.type) {
        case INLINE_TOKEN:
            readInline(frame, token, context);
            break;
        case FENCE:
        case CODE_BLOCK:
            readCode(frame, token, context);
            break;
    }
};

const readBlocks = (tokens: readonly MarkdownTokenNode[], context: ReadContext): RteBlockNode[] => {
    let frame: Frame = { kind: 'root', parent: null, blocks: [] };
    for (const [index, token] of tokens.entries()) {
        switch (token.nesting) {
            case OPENING:
                frame = openFrame(frame, token, tokens[index + 1], context);
                break;
            case CLOSING:
                frame = closeFrame(frame, context);
                break;
            case SELF_CLOSING:
                readSelfClosingBlock(frame, token, context);
                break;
        }
    }

    return frame.blocks;
};

export const readDocument = (markdown: string, context: ReadContext): RteDocumentOf => {
    const blocks = readBlocks(tokenize(markdown, { breaks: context.breaks }), context);
    if (blocks.length === 0) {
        return emptyDocument();
    }

    return { version: DOCUMENT_VERSION, blocks };
};
