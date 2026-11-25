/* (c) Copyright Frontify Ltd., all rights reserved. */

// A text block's inlines laid out as the tokens of one stretch of Markdown, before any of it is written.

import { isWhitespace } from './escape';

/** The open and the close delimiter of one mark, which share it: `path` is where the mark starts. */
export type DelimiterPair = { mark: string; path: readonly number[] };

export type CharToken = {
    kind: 'char';
    char: string;
    /** Written as a numeric character reference. */
    entity: boolean;
    /** Written as is, never escaped (inline code). */
    verbatim: boolean;
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

export const isSpaceToken = (token: InlineToken | undefined): token is CharToken =>
    token?.kind === 'char' && isWhitespace(token.char);

const encodeEdgesOf = (line: readonly InlineToken[]): void => {
    for (const token of line) {
        if (!isSpaceToken(token)) {
            break;
        }
        token.entity = true;
    }

    for (let index = line.length - 1; index >= 0; index--) {
        const token = line[index];
        if (!isSpaceToken(token)) {
            break;
        }
        token.entity = true;
    }
};

/** Marks the whitespace at the start and end of every line as a reference, as a reader strips it otherwise. */
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
