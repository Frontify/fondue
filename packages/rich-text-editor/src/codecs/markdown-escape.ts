/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkdownIt as Parser, type Token as MarkdownToken } from 'markdown-it';

import { inlineToken } from './from-markdown';

/**
 * Inline output before escaping: text to escape, literal syntax, an emphasis delimiter run, or a hard break.
 * Delimiters carry their feature, which loses its mark when no escaping can make the run open or close.
 */
export type Piece =
    | { readonly kind: 'text'; readonly text: string }
    | { readonly kind: 'literal'; readonly text: string }
    | Delimiter
    | { readonly kind: 'break' };
/** One side of an emphasis pair; `pair` ties an opening delimiter to its closing one. */
export interface Delimiter {
    readonly kind: 'delimiter';
    readonly text: string;
    readonly open: boolean;
    readonly featureId: string;
    readonly pair: number;
}

// Character classes of CommonMark's flanking rules: Unicode whitespace, then Unicode punctuation and symbols.
const WHITESPACE = /^\s$/u;
const PUNCTUATION = /^[\p{P}\p{S}]$/u;
type CharClass = 'space' | 'punctuation' | 'other';
const classOf = (char: string | undefined): CharClass => {
    if (char === undefined || WHITESPACE.test(char)) {
        return 'space';
    }
    if (PUNCTUATION.test(char)) {
        return 'punctuation';
    }
    return 'other';
};

/** Characters that start or end syntax anywhere in a line. */
const ALWAYS_ESCAPED = new Set(['\\', '`', '*', '_', '[', ']', '<', '&', '|', '~', '#', '@']);
/** Characters that start a block at the start of a line. */
const LINE_START_ESCAPED = new Set(['-', '+', '=', '>']);

type Token =
    | { readonly kind: 'char'; readonly char: string; entity: boolean }
    | { readonly kind: 'literal'; readonly text: string }
    | Delimiter
    | { readonly kind: 'break' };

const entity = (char: string) => `&#x${(char.codePointAt(0) ?? 0).toString(16).toUpperCase()};`;

/** The class a neighbour of a delimiter run has once written: an entity starts and ends with punctuation. */
const neighbour = (token: Token | undefined, side: 'before' | 'after'): CharClass => {
    if (token === undefined || token.kind === 'break') {
        return 'space';
    }
    if (token.kind === 'char') {
        if (token.entity) {
            return 'punctuation';
        }
        return classOf(token.char);
    }
    if (token.kind === 'delimiter') {
        return 'punctuation';
    }
    if (side === 'before') {
        return classOf([...token.text].at(-1));
    }
    return classOf([...token.text][0]);
};

/** Each run of delimiters of one character, with the tokens around it. */
const runsOf = (tokens: readonly Token[]) => {
    const runs: {
        readonly run: readonly Delimiter[];
        readonly before: Token | undefined;
        readonly after: Token | undefined;
    }[] = [];
    let index = 0;
    while (index < tokens.length) {
        const first = tokens[index];
        if (first?.kind !== 'delimiter') {
            index += 1;
            continue;
        }
        let end = index;
        while (tokens[end + 1]?.kind === 'delimiter' && (tokens[end + 1] as Delimiter).text[0] === first.text[0]) {
            end += 1;
        }
        runs.push({
            run: tokens.slice(index, end + 1) as Delimiter[],
            before: tokens[index - 1],
            after: tokens[end + 1],
        });
        index = end + 1;
    }
    return runs;
};

/** Whether a run opens where it opens and closes where it closes, by CommonMark's flanking rules. */
const flanks = (run: readonly Delimiter[], before: Token | undefined, after: Token | undefined): boolean => {
    const left = neighbour(before, 'before');
    const right = neighbour(after, 'after');
    const leftFlanking = right !== 'space' && (right !== 'punctuation' || left !== 'other');
    const rightFlanking = left !== 'space' && (left !== 'punctuation' || right !== 'other');
    const opens = run.some((token) => token.open);
    const closes = run.some((token) => !token.open);
    let canOpen = leftFlanking;
    let canClose = rightFlanking;
    if (run[0]?.text.startsWith('_') === true) {
        // An underscore never opens or closes inside a word.
        canOpen = leftFlanking && (!rightFlanking || left === 'punctuation');
        canClose = rightFlanking && (!leftFlanking || right === 'punctuation');
    }
    return (!opens || canOpen) && (!closes || canClose);
};

/**
 * Makes every delimiter run open or close where it should, by writing an adjacent character as a numeric
 * reference, which counts as punctuation and is still the same text once parsed. Returns the first run that no
 * reference can fix.
 */
const fixFlanking = (tokens: readonly Token[]): readonly Delimiter[] | undefined => {
    const encode = (token: Token | undefined): boolean => {
        if (token?.kind === 'char' && !token.entity) {
            token.entity = true;
            return true;
        }
        return false;
    };
    // A reference written for one run changes the neighbour of the next, so this repeats until nothing changes.
    let changed = true;
    while (changed) {
        changed = false;
        for (const { run, before, after } of runsOf(tokens)) {
            const opens = run.some((token) => token.open);
            const closes = run.some((token) => !token.open);
            if (closes && neighbour(before, 'before') === 'space') {
                changed = encode(before) || changed;
            }
            if (opens && neighbour(after, 'after') === 'space') {
                changed = encode(after) || changed;
            }
            if (closes && neighbour(before, 'before') === 'punctuation' && neighbour(after, 'after') === 'other') {
                changed = encode(after) || changed;
            }
            if (opens && neighbour(after, 'after') === 'punctuation' && neighbour(before, 'before') === 'other') {
                changed = encode(before) || changed;
            }
            if (run[0]?.text.startsWith('_') === true && opens && neighbour(before, 'before') === 'other') {
                changed = encode(before) || changed;
            }
            if (run[0]?.text.startsWith('_') === true && closes && neighbour(after, 'after') === 'other') {
                changed = encode(after) || changed;
            }
        }
    }
    return runsOf(tokens).find(({ run, before, after }) => !flanks(run, before, after))?.run;
};

/** Writes inline pieces as Markdown text whose parsed text is the same: escapes, and references at line edges. */
export const serialize = (pieces: readonly Piece[], lost: (featureId: string) => void): string => {
    let tokens: Token[] = [];
    for (const piece of pieces) {
        if (piece.kind === 'text') {
            for (const char of piece.text) {
                tokens.push({ kind: 'char', char, entity: char === '\n' || char === '\r' });
            }
        } else {
            tokens.push(piece);
        }
    }
    // Leading and trailing whitespace of each line, as `trim` sees it, would be stripped, so it becomes references.
    const isEdgeSpace = (token: Token | undefined) => token?.kind === 'char' && /^\s$/u.test(token.char);
    let lineStart = 0;
    for (let index = 0; index <= tokens.length; index += 1) {
        if (index < tokens.length && tokens[index]?.kind !== 'break') {
            continue;
        }
        for (let at = lineStart; at < index && isEdgeSpace(tokens[at]); at += 1) {
            (tokens[at] as { entity: boolean }).entity = true;
        }
        for (let at = index - 1; at >= lineStart && isEdgeSpace(tokens[at]); at -= 1) {
            (tokens[at] as { entity: boolean }).entity = true;
        }
        lineStart = index + 1;
    }
    // A pair that cannot open or close writes no delimiters, and its mark is lost.
    let failed = fixFlanking(tokens);
    while (failed !== undefined) {
        const pairs = new Set(failed.map(({ pair }) => pair));
        for (const { featureId } of failed) {
            lost(featureId);
        }
        tokens = tokens.filter((token) => token.kind !== 'delimiter' || !pairs.has(token.pair));
        failed = fixFlanking(tokens);
    }
    let written = '';
    let atLineStart = true;
    for (const [index, token] of tokens.entries()) {
        if (token.kind === 'break') {
            written += '\\\n';
            atLineStart = true;
            continue;
        }
        if (token.kind !== 'char') {
            written += token.text;
            atLineStart = false;
            continue;
        }
        written += writeChar(tokens, index, atLineStart);
        atLineStart = false;
    }
    return written;
};

const charAt = (tokens: readonly Token[], index: number): string | undefined => {
    const token = tokens[index];
    if (token?.kind === 'char' && !token.entity) {
        return token.char;
    }
    return undefined;
};

/** One character, escaped where it could start syntax, so `fromMarkdown` reads it back as text. */
const writeChar = (tokens: readonly Token[], index: number, atLineStart: boolean): string => {
    const token = tokens[index] as Extract<Token, { kind: 'char' }>;
    const { char } = token;
    if (token.entity) {
        return entity(char);
    }
    if (ALWAYS_ESCAPED.has(char) || (atLineStart && LINE_START_ESCAPED.has(char))) {
        return `\\${char}`;
    }
    const next = charAt(tokens, index + 1);
    const following = tokens[index + 1];
    // `!` before a link's `[` would make it an image.
    if (char === '!' && following?.kind === 'literal' && following.text.startsWith('[')) {
        return '\\!';
    }
    // `scheme://` and `//` would be linked on import.
    if ((char === ':' || char === '/') && next === '/') {
        return `\\${char}`;
    }
    if ((char === '.' || char === ')') && /^\d$/.test(charAt(tokens, index - 1) ?? '')) {
        // An ordered list marker: digits at the start of a line, then `.` or `)`.
        let start = index - 1;
        while (start > 0 && /^\d$/.test(charAt(tokens, start - 1) ?? '')) {
            start -= 1;
        }
        const previous = tokens[start - 1];
        if (start === 0 || previous?.kind === 'break') {
            return `\\${char}`;
        }
    }
    if (
        char === '.' &&
        /www$/i.test(['w', 'w', 'w'].map((_, offset) => charAt(tokens, index - 3 + offset) ?? '').join(''))
    ) {
        return '\\.';
    }
    return char;
};

/** The length of the longest run of `char` in `text`, which a fence around it must exceed. */
export const longestRun = (text: string, char: string): number => {
    let longest = 0;
    let run = 0;
    for (const each of text) {
        if (each === char) {
            run += 1;
        } else {
            run = 0;
        }
        longest = Math.max(longest, run);
    }
    return longest;
};

/** A code span whose backtick fence is longer than any run inside, padded when the content starts or ends with a backtick or a space. */
export const codeSpan = (code: string): string => {
    // A line break would let the next line start a block, such as an HTML block, so it becomes the space CommonMark reads anyway.
    const text = code.replaceAll(/\r\n?|\n/g, ' ');
    const fence = '`'.repeat(longestRun(text, '`') + 1);
    let content = text;
    const spaced = text.startsWith(' ') && text.endsWith(' ') && text.trim() !== '';
    if (text.startsWith('`') || text.endsWith('`') || spaced) {
        content = ` ${text} `;
    }
    return `${fence}${content}${fence}`;
};

/** A link destination: bare when it holds no space, parenthesis or angle bracket, else in angle brackets. */
export const destination = (href: string): string => {
    if (/^[^\s()<>\\]*$/.test(href)) {
        return href;
    }
    return `<${href.replaceAll(/[<>\\]/g, (char) => `\\${char}`)}>`;
};

/** A stretch of inline content as `fromMarkdown` reads it: text with its mark names, or a hard break. */
export type Run = { readonly text: string; readonly marks: string } | { readonly break: true; readonly marks: string };

/** Joins neighbouring text with the same marks, as the document encoding joins text nodes. */
export const joinRuns = (runs: readonly Run[]): Run[] => {
    const joined: Run[] = [];
    for (const run of runs) {
        const previous = joined.at(-1);
        if ('text' in run && previous !== undefined && 'text' in previous && previous.marks === run.marks) {
            joined[joined.length - 1] = { text: previous.text + run.text, marks: run.marks };
        } else if (!('text' in run) || run.text !== '') {
            joined.push(run);
        }
    }
    return joined;
};

/**
 * The runs `parser` reads from inline Markdown, or `undefined` for syntax no codec writes, such as an image. With
 * `paragraph`, the text must also parse as one paragraph, so a line that reads as a link definition fails.
 */
export const readInline = (parser: Parser, markdown: string, paragraph: boolean): Run[] | undefined => {
    const runs: Run[] = [];
    const active: string[] = [];
    const key = (extra: readonly string[] = []) => [...active, ...extra].sort().join(' ');
    let tokens = parser.parseInline(markdown, {});
    if (paragraph) {
        const blocks = parser.parse(markdown, {});
        if (blocks.length > 0 && blocks.map(({ type }) => type).join(' ') !== 'paragraph_open inline paragraph_close') {
            return undefined;
        }
        tokens = blocks.slice(1, 2);
    }
    const [inline] = tokens;
    let children: readonly MarkdownToken[] = [];
    if (inline?.children) {
        children = inline.children;
    }
    for (const token of children) {
        const read = inlineToken(token);
        if (read === undefined) {
            return undefined;
        }
        if (read.kind === 'text') {
            runs.push({ text: read.text, marks: key() });
        } else if (read.kind === 'code') {
            runs.push({ text: read.text, marks: key(['code']) });
        } else if (read.kind === 'break') {
            runs.push({ break: true, marks: key() });
        } else if (read.kind === 'open' && read.mark === 'link') {
            active.push(`link:${read.href}`);
        } else if (read.kind === 'open') {
            active.push(read.mark);
        } else {
            active.pop();
        }
    }
    return joinRuns(runs);
};
