/* (c) Copyright Frontify Ltd., all rights reserved. */

// A text block's inlines laid out as the tokens of one stretch of Markdown, before any of it is written.

import { type TextScope } from './escape';
import { canBeReferenced, isMarkdownWhitespace } from './markdownIt';

/** The open and the close delimiter of one mark, which share it: `paths` is every text the mark covers. */
export type DelimiterPair = { mark: string; paths: readonly (readonly number[])[] };

export type CharToken = {
    kind: 'char';
    char: string;
    /** Written as a numeric character reference. */
    entity: boolean;
    /** Written as is, never escaped (inline code). */
    verbatim: boolean;
    scope: TextScope;
};

export type DelimiterToken = {
    kind: 'delimiter';
    text: string;
    open: boolean;
    /** Made of `*`, `_` or `~` only, so it opens and closes by the flanking rules. */
    emphasis: boolean;
    pair: DelimiterPair;
};

export type InlineToken =
    | CharToken
    /** What an inline element writes as Markdown, as is. */
    | { kind: 'literal'; text: string; type: string }
    | DelimiterToken
    | { kind: 'break'; type: string };

/** Whether the character is whitespace to the reader's emphasis rules. */
export const isSpaceToken = (token: InlineToken | undefined): token is CharToken =>
    token?.kind === 'char' && isMarkdownWhitespace(token.char);

/** Whether a reference reads back as the character: a reader turns one for a control or a noncharacter into U+FFFD. */
export const isReferenceable = (token: CharToken): boolean => {
    const codePoint = token.char.codePointAt(0);
    if (codePoint === undefined) {
        return false;
    }

    return canBeReferenced(codePoint);
};

/** Whether a reader strips the character at the edge of a line: markdown-it trims it with `String.prototype.trim`. */
export const isTrimmed = (char: string): boolean => char.trim() === '';

/** Whether the character is trimmed at the edge of a block and a reference could spell it, so the writer leaves it out there. */
export const isEdgeSpace = (char: string): boolean => {
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) {
        return false;
    }

    return isTrimmed(char) && canBeReferenced(codePoint);
};

const isTrimmedToken = (token: InlineToken | undefined): token is CharToken =>
    token?.kind === 'char' && isTrimmed(token.char);

// A trimmed character no reference can spell stays as it is: nothing makes it survive.
const encodeTrimmedRun = (run: readonly InlineToken[]): void => {
    for (const token of run) {
        if (!isTrimmedToken(token)) {
            break;
        }
        if (isReferenceable(token)) {
            token.entity = true;
        }
    }
};

const encodeEdgesOf = (line: readonly InlineToken[]): void => {
    encodeTrimmedRun(line);
    encodeTrimmedRun([...line].reverse());
};

/** Marks the whitespace at the start and end of every line as a reference, as a reader trims it otherwise. */
export const encodeLineEdges = (tokens: readonly InlineToken[]): void => {
    let lineStart = 0;
    for (const [index, token] of tokens.entries()) {
        if (token.kind === 'break') {
            encodeEdgesOf(tokens.slice(lineStart, index));
            lineStart = index + 1;
        }
    }

    encodeEdgesOf(tokens.slice(lineStart));
};

const isEdgeSpaceToken = (token: InlineToken): boolean => token.kind === 'char' && isEdgeSpace(token.char);

/** The tokens without the whitespace at the start of the first line and the end of the last, which a reader trims. */
export const withoutBlockEdgeSpace = (tokens: readonly InlineToken[]): InlineToken[] => {
    let start = 0;
    while (isTrimmedToken(tokens[start])) {
        start++;
    }

    let end = tokens.length;
    while (end > start && isTrimmedToken(tokens[end - 1])) {
        end--;
    }

    return [
        ...tokens.slice(0, start).filter((token) => !isEdgeSpaceToken(token)),
        ...tokens.slice(start, end),
        ...tokens.slice(end).filter((token) => !isEdgeSpaceToken(token)),
    ];
};
