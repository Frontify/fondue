/* (c) Copyright Frontify Ltd., all rights reserved. */

// The one place markdown-it is imported: it turns Markdown into tokens of this package's own type.

import MarkdownItParser, { type Env, type MarkdownIt, type Token } from 'markdown-it/browser';

import { type MarkdownToken } from '#/core';

/** Whether a token opens a container, closes one, or stands alone. */
export type TokenNesting = -1 | 0 | 1;

/** A token with what the reader walks by: its nesting, and the tokens inside an `inline` one. */
export type MarkdownTokenNode = MarkdownToken & {
    nesting: TokenNesting;
    children: readonly MarkdownTokenNode[];
    line: number;
};

/** The tokens of a document and the labels of the link reference definitions it holds, which produce no token. */
export type Tokenized = {
    tokens: MarkdownTokenNode[];
    referenceLabels: string[];
};

export type TokenizeOptions = {
    /** A single newline reads as a `softbreak` token that the reader turns into a break. */
    breaks: boolean;
};

/** The markdown-it token names the codec reads by. */
export const INLINE_TOKEN = 'inline';
export const PARAGRAPH_OPEN = 'paragraph_open';
export const PARAGRAPH_CLOSE = 'paragraph_close';

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

const TRIMMED_AT_BLOCK_EDGE = new Set([' ', '\t', '\n', '\r']);

/** Whether the reader strips the character at the edge of a paragraph or heading: it trims ASCII space, tab, line feed and carriage return only. */
export const isTrimmedAtBlockEdge = (char: string): boolean => TRIMMED_AT_BLOCK_EDGE.has(char);

/** Whether a numeric character reference reads back as this code point, and not as U+FFFD. */
export const canBeReferenced = (codePoint: number): boolean => isValidEntityCode(codePoint);

const parsers = new Map<boolean, MarkdownIt>();

type LinkMatch = NonNullable<ReturnType<MarkdownIt['linkify']['matchAtStart']>>;

/** An address that starts with `www.`, which GFM autolinks without a scheme. */
const WWW_ADDRESS = /^www\./i;

/** The schemes GFM's autolink extension links: web addresses and email addresses. */
const AUTOLINK_SCHEMAS: ReadonlySet<string> = new Set(['http:', 'https:', 'mailto:']);

/** Whether GFM's autolink extension links the match: it has a web or email scheme, or starts with `www.`. */
const isAutolink = ({ schema, raw }: LinkMatch): boolean => AUTOLINK_SCHEMAS.has(schema) || WWW_ADDRESS.test(raw);

// By the time the reader gets an address, markdown-it has decoded its escapes and entities, so it is kept as written.
const asWritten = (url: string): string => url;

const configureLinks = (parser: MarkdownIt): void => {
    parser.linkify.set({ fuzzyLink: true });

    const match = parser.linkify.match.bind(parser.linkify);
    parser.linkify.match = (text) => (match(text) ?? []).filter(isAutolink);

    const matchAtStart = parser.linkify.matchAtStart.bind(parser.linkify);
    parser.linkify.matchAtStart = (text) => {
        const found = matchAtStart(text);
        if (found === null || !isAutolink(found)) {
            return null;
        }

        return found;
    };

    parser.normalizeLink = asWritten;
    parser.normalizeLinkText = asWritten;
};

const parserFor = (breaks: boolean): MarkdownIt => {
    let parser = parsers.get(breaks);
    if (parser === undefined) {
        parser = new MarkdownItParser(PRESET, { html: false, linkify: true, breaks })
            .enable(ENABLED_RULES)
            .disable(DISABLED_RULES);
        configureLinks(parser);
        parsers.set(breaks, parser);
    }

    return parser;
};

const FIRST_SOURCE_LINE = 1;

const sourceLineOf = (token: Token, precedingLine: number): number => {
    const start = token.map?.[0];
    if (start === undefined) {
        return precedingLine;
    }

    return start + FIRST_SOURCE_LINE;
};

const nodeOf = (token: Token, line: number): MarkdownTokenNode => ({
    type: token.type,
    tag: token.tag,
    attrs: Object.fromEntries((token.attrs ?? []).map(([name, value]) => [name, String(value)])),
    content: token.content,
    info: token.info,
    nesting: token.nesting,
    children: (token.children ?? []).map((child) => nodeOf(child, line)),
    line,
});

/** The Markdown as a flat token stream: block tokens, each `inline` one holding its inline tokens. */
export const tokenize = (markdown: string, { breaks }: TokenizeOptions): Tokenized => {
    const env: Env = {};
    const tokens: MarkdownTokenNode[] = [];
    let line = FIRST_SOURCE_LINE;
    for (const token of parserFor(breaks).parse(markdown, env)) {
        line = sourceLineOf(token, line);
        tokens.push(nodeOf(token, line));
    }

    return { tokens, referenceLabels: Object.keys(env.references ?? {}) };
};

export type Tokenize = typeof tokenize;
