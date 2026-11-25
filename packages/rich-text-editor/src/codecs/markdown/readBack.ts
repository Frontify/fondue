/* (c) Copyright Frontify Ltd., all rights reserved. */

// Whether a text block's Markdown reads back as the inlines the document holds.

import { INLINE_PLACEHOLDER, type RteInlineNode } from '#/core';

import { canonicalOf, sameValue } from './canonical';
import { isWhitespace } from './escape';
import { type Tokenize } from './markdownIt';
import { readInlines, type ReadContext, withoutPlaceholder } from './read';

type Path = readonly number[];

/** A mark a run carries: its name and what it stores, which `true` and `{}` both say as nothing. */
export type RunMark = {
    name: string;
    value: unknown;
    /** Where each text the mark covers is in the document, and empty for what is read back. */
    paths: readonly Path[];
};

/**
 * Text with the marks it carries, or an inline element with its type and values. Whitespace carries no marks, and
 * neighbouring text with the same marks is one run, so two sides compare equal when they read the same.
 */
export type Run =
    | { kind: 'text'; text: string; marks: readonly RunMark[] }
    | { kind: 'inline'; type: string; value: unknown; path: Path };

const PARAGRAPH_OPEN = 'paragraph_open';
const PARAGRAPH_CLOSE = 'paragraph_close';
const INLINE = 'inline';

/** A stretch of whitespace, or of anything else. */
const STRETCH = /\s+|\S+/gu;

const NO_MARKS: readonly RunMark[] = [];

const NO_PATH: Path = [];

const NO_PATHS: readonly Path[] = [];

const sameMark = (left: RunMark, right: RunMark): boolean =>
    left.name === right.name && sameValue(left.value, right.value);

const sameMarks = (left: readonly RunMark[], right: readonly RunMark[]): boolean =>
    left.length === right.length && left.every((mark) => right.some((other) => sameMark(mark, other)));

const canonicalMarksOf = (marks: readonly RunMark[]): RunMark[] =>
    marks
        .map(({ name, value, paths }) => {
            if (typeof value === 'object' && value !== null) {
                return { name, value: canonicalOf(value), paths };
            }

            return { name, value: {}, paths };
        })
        .sort((left, right) => left.name.localeCompare(right.name));

export const addTextRun = (runs: Run[], text: string, marks: readonly RunMark[]): void => {
    const carried = canonicalMarksOf(marks);
    for (const [stretch] of text.matchAll(STRETCH)) {
        let stretchMarks = carried;
        if (isWhitespace(stretch.charAt(0))) {
            stretchMarks = NO_MARKS;
        }

        const previous = runs[runs.length - 1];
        if (previous?.kind === 'text' && sameMarks(previous.marks, stretchMarks)) {
            previous.text += stretch;
            continue;
        }

        runs.push({ kind: 'text', text: stretch, marks: stretchMarks });
    }
};

export const addInlineRun = (runs: Run[], type: string, value: unknown, path: Path): void => {
    runs.push({ kind: 'inline', type, value: canonicalOf(value), path });
};

const runsOfNodes = (nodes: readonly RteInlineNode[]): Run[] => {
    const runs: Run[] = [];
    for (const node of nodes) {
        if (node.text === undefined) {
            const { type, ...value } = node;
            addInlineRun(runs, type, value, NO_PATH);
            continue;
        }

        const { text, ...stored } = node;
        addTextRun(
            runs,
            text,
            Object.entries(stored).map(([name, value]) => ({ name, value, paths: NO_PATHS })),
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

    return runsOfNodes(withoutPlaceholder(readInlines(inline.children, context)));
};

/** A mark or an inline element of the document that the Markdown does not read back as it was. */
export type Lost = { type: string; path: Path };

/** Either the Markdown reads back as the document, or it differs, with what is known to be lost: none when that cannot be told. */
export type ReadBackResult = { kind: 'same' } | { kind: 'differs'; lost: readonly Lost[] };

const plainTextOf = (runs: readonly Run[]): string =>
    runs.map((run) => (run.kind === 'text' ? run.text : INLINE_PLACEHOLDER)).join('');

/** The run each position of the plain text belongs to. */
const runsByPosition = (runs: readonly Run[]): Run[] => {
    const positions: Run[] = [];
    for (const run of runs) {
        if (run.kind === 'inline') {
            positions.push(run);
            continue;
        }

        for (let index = 0; index < run.text.length; index++) {
            positions.push(run);
        }
    }

    return positions;
};

const sameRun = (left: Run, right: Run): boolean => {
    if (left.kind === 'inline') {
        return right.kind === 'inline' && left.type === right.type && sameValue(left.value, right.value);
    }

    return right.kind === 'text' && left.text === right.text && sameMarks(left.marks, right.marks);
};

const carriesMark = (run: Run | undefined, mark: RunMark): boolean =>
    run?.kind === 'text' && run.marks.some((carried) => sameMark(carried, mark));

const sameRuns = (left: readonly Run[], right: readonly Run[]): boolean =>
    left.length === right.length &&
    left.every((run, index) => {
        const other = right[index];

        return other !== undefined && sameRun(run, other);
    });

/**
 * What the document holds that the Markdown does not read back, by position: a mark that is missing or has another
 * value on a character that is not whitespace, and an inline element that is not the one read. None when the plain
 * texts differ, as the two sides cannot be lined up then.
 */
const lostOf = (reference: readonly Run[], read: readonly Run[]): Lost[] => {
    const plain = plainTextOf(reference);
    if (plain !== plainTextOf(read)) {
        return [];
    }

    const readPositions = runsByPosition(read);
    const lost: Lost[] = [];
    const reported = new Set<string>();
    const report = (type: string, path: Path): void => {
        const key = `${type}:${path.join('.')}`;
        if (!reported.has(key)) {
            reported.add(key);
            lost.push({ type, path });
        }
    };

    for (const [index, run] of runsByPosition(reference).entries()) {
        if (run.kind === 'inline') {
            const read = readPositions[index];
            if (read === undefined || !sameRun(run, read)) {
                report(run.type, run.path);
            }
            continue;
        }

        if (isWhitespace(plain.charAt(index))) {
            continue;
        }

        for (const mark of run.marks) {
            if (!carriesMark(readPositions[index], mark)) {
                for (const path of mark.paths) {
                    report(mark.name, path);
                }
            }
        }
    }

    return lost;
};

/** Reads the Markdown again as one paragraph with the reader's own parser, and compares what it gives with the document's runs. */
export const readBackOf = (
    markdown: string,
    reference: readonly Run[],
    context: ReadContext,
    tokenize: Tokenize,
): ReadBackResult => {
    const runs = readRuns(markdown, context, tokenize);
    if (runs === null) {
        return { kind: 'differs', lost: [] };
    }
    if (sameRuns(runs, reference)) {
        return { kind: 'same' };
    }

    return { kind: 'differs', lost: lostOf(reference, runs) };
};
