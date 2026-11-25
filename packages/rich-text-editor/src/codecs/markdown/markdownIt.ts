/* (c) Copyright Frontify Ltd., all rights reserved. */

// The one place markdown-it is imported: it turns Markdown into tokens of this package's own type.

import MarkdownItParser, { type MarkdownIt, type Token } from 'markdown-it';

import { type MarkdownToken } from '#/core';

/** Whether a token opens a container, closes one, or stands alone. */
export type TokenNesting = -1 | 0 | 1;

/** A token with what the reader walks by: its nesting, and the tokens inside an `inline` one. */
export type MarkdownTokenNode = MarkdownToken & {
    nesting: TokenNesting;
    children: readonly MarkdownTokenNode[];
};

export type TokenizeOptions = {
    /** A single newline reads as a `softbreak` token that the reader turns into a break. */
    breaks: boolean;
};

const PRESET = 'commonmark';

const ENABLED_RULES = ['table', 'strikethrough', 'linkify'];

// Left on, it merges the characters an escape or an entity produced into the text around them,
// so a text pattern could match what the writer escaped.
const DISABLED_RULES = ['text_join'];

const { isMdAsciiPunct, isPunctCharCode, isValidEntityCode, isWhiteSpace } = new MarkdownItParser().utils;

const REPLACEMENT_CHARACTER_CODE = 0xff_fd;

const isSurrogateCode = (code: number): boolean => code >= 0xd8_00 && code <= 0xdf_ff;

// The reader sees a lone surrogate as U+FFFD when it scans for emphasis delimiters.
const scannedCodeOf = (char: string): number | undefined => {
    const code = char.codePointAt(0);
    if (code !== undefined && isSurrogateCode(code)) {
        return REPLACEMENT_CHARACTER_CODE;
    }

    return code;
};

const isPunctuationCode = (code: number): boolean => isMdAsciiPunct(code) || isPunctCharCode(code);

const scannedCodeIs = (char: string, test: (code: number) => boolean): boolean => {
    const code = scannedCodeOf(char);
    if (code === undefined) {
        return false;
    }

    return test(code);
};

/** Whether the reader counts the character as whitespace when it decides where emphasis opens and closes. */
export const isMarkdownWhitespace = (char: string): boolean => scannedCodeIs(char, isWhiteSpace);

/** Whether the reader counts the character as punctuation when it decides where emphasis opens and closes. */
export const isMarkdownPunctuation = (char: string): boolean => scannedCodeIs(char, isPunctuationCode);

/** Whether a numeric character reference reads back as this code point, and not as U+FFFD. */
export const canBeReferenced = (codePoint: number): boolean => isValidEntityCode(codePoint);

const parsers = new Map<boolean, MarkdownIt>();

const parserFor = (breaks: boolean): MarkdownIt => {
    let parser = parsers.get(breaks);
    if (parser === undefined) {
        parser = new MarkdownItParser(PRESET, { html: false, linkify: true, breaks })
            .enable(ENABLED_RULES)
            .disable(DISABLED_RULES);
        parsers.set(breaks, parser);
    }

    return parser;
};

const nodeOf = (token: Token): MarkdownTokenNode => ({
    type: token.type,
    tag: token.tag,
    attrs: Object.fromEntries((token.attrs ?? []).map(([name, value]) => [name, String(value)])),
    content: token.content,
    nesting: token.nesting,
    children: (token.children ?? []).map(nodeOf),
});

/** The Markdown as a flat token stream: block tokens, each `inline` one holding its inline tokens. */
export const tokenize = (markdown: string, { breaks }: TokenizeOptions): MarkdownTokenNode[] =>
    parserFor(breaks).parse(markdown, {}).map(nodeOf);

export type Tokenize = typeof tokenize;
