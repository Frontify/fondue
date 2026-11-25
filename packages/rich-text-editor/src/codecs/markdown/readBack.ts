/* (c) Copyright Frontify Ltd., all rights reserved. */

// Whether a text block's Markdown reads back as the inlines the writer meant it to.

import { type RteInlineNode } from '#/core';

import { type InlineToken } from './inlineTokens';
import { type Tokenize } from './markdownIt';
import { readInlines, type ReadContext } from './read';

/** Text with the names of the marks it carries, or the type of an inline element. Neighbouring text with the same marks is one run. */
type Run = { kind: 'text'; text: string; marks: readonly string[] } | { kind: 'inline'; type: string };

const PARAGRAPH_OPEN = 'paragraph_open';
const PARAGRAPH_CLOSE = 'paragraph_close';
const INLINE = 'inline';
const TEXT_KEY = 'text';

const addText = (runs: Run[], text: string, marks: readonly string[]): void => {
    if (text === '') {
        return;
    }

    const sorted = [...marks].sort();
    const previous = runs[runs.length - 1];
    if (previous?.kind === 'text' && JSON.stringify(previous.marks) === JSON.stringify(sorted)) {
        previous.text += text;

        return;
    }

    runs.push({ kind: 'text', text, marks: sorted });
};

/** The runs the writer means its tokens to read as. */
const runsOfTokens = (tokens: readonly InlineToken[]): Run[] => {
    const runs: Run[] = [];
    const open: string[] = [];
    for (const token of tokens) {
        switch (token.kind) {
            case 'char':
                addText(runs, token.char, open);
                break;
            case 'delimiter':
                if (token.open) {
                    open.push(token.pair.mark);
                } else {
                    open.pop();
                }
                break;
            case 'literal':
            case 'break':
                runs.push({ kind: 'inline', type: token.type });
                break;
        }
    }

    return runs;
};

const runsOfNodes = (nodes: readonly RteInlineNode[]): Run[] => {
    const runs: Run[] = [];
    for (const node of nodes) {
        if (node.text === undefined) {
            runs.push({ kind: 'inline', type: node.type });
            continue;
        }

        addText(
            runs,
            node.text,
            Object.keys(node).filter((name) => name !== TEXT_KEY),
        );
    }

    return runs;
};

/** The runs the Markdown reads as, or null when it does not read as one paragraph. */
const readRuns = (markdown: string, context: ReadContext, tokenize: Tokenize): Run[] | null => {
    const blocks = tokenize(markdown, { breaks: context.breaks });
    const [open, inline, close] = blocks;
    if (
        blocks.length !== 3 ||
        open?.type !== PARAGRAPH_OPEN ||
        inline?.type !== INLINE ||
        close?.type !== PARAGRAPH_CLOSE
    ) {
        return null;
    }

    return runsOfNodes(readInlines(inline.children, context));
};

/** Reads the Markdown again as one paragraph with the reader's own parser, and compares what it gives with the tokens. */
export const readsBack = (
    markdown: string,
    tokens: readonly InlineToken[],
    context: ReadContext,
    tokenize: Tokenize,
): boolean => {
    const runs = readRuns(markdown, context, tokenize);
    if (runs === null) {
        return false;
    }

    return JSON.stringify(runs) === JSON.stringify(runsOfTokens(tokens));
};
