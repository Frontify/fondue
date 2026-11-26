/* (c) Copyright Frontify Ltd., all rights reserved. */

// Whether a text block's Markdown reads back as the inlines the document holds.

import { INLINE_PLACEHOLDER, type RteInlineNode } from '#/core';

import { canonicalOf, sameValue } from './canonical';
import { isWhitespace } from './escape';
import { type OverriddenForms } from './forms';
import { isBlank, isEdgeSpace } from './inlineTokens';
import { INLINE_TOKEN, isTrimmedAtBlockEdge, PARAGRAPH_CLOSE, PARAGRAPH_OPEN, type Tokenize } from './markdownIt';
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
 * Text with the marks it carries, or an inline element with its type and values, and the text its form wrote when
 * that is plain text. Whitespace carries no marks, and neighbouring text with the same marks is one run, so two
 * sides compare equal when they read the same.
 */
export type Run =
    | { kind: 'text'; text: string; marks: readonly RunMark[] }
    | { kind: 'inline'; type: string; value: unknown; path: Path; written: string | null };

type InlineRun = Extract<Run, { kind: 'inline' }>;

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
        let stretchMarks: readonly RunMark[] = carried;
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

export const addInlineRun = (runs: Run[], type: string, value: unknown, path: Path, written: string | null): void => {
    runs.push({ kind: 'inline', type, value: canonicalOf(value), path, written });
};

const runsOfNodes = (nodes: readonly RteInlineNode[]): Run[] => {
    const runs: Run[] = [];
    for (const node of nodes) {
        if (node.text === undefined) {
            const { type, ...value } = node;
            addInlineRun(runs, type, value, NO_PATH, null);
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
        inline?.type !== INLINE_TOKEN ||
        close?.type !== PARAGRAPH_CLOSE
    ) {
        return null;
    }

    return runsOfNodes(withoutPlaceholder(readInlines(inline.children, context)));
};

type Edge = 'start' | 'end';

/** The characters without the edge space at their start, which the writer leaves out and a reader trims. */
const withoutLeadingEdgeSpace = (chars: readonly string[]): string[] => {
    let start = 0;
    for (const char of chars) {
        if (!isTrimmedAtBlockEdge(char)) {
            break;
        }
        start++;
    }

    return [...chars.slice(0, start).filter((char) => !isEdgeSpace(char)), ...chars.slice(start)];
};

const withoutEdgeSpace = (text: string, edge: Edge): string => {
    const chars = [...text];
    if (edge === 'start') {
        return withoutLeadingEdgeSpace(chars).join('');
    }

    return withoutLeadingEdgeSpace(chars.reverse()).reverse().join('');
};

const trimEdgeRun = (runs: Run[], edge: Edge): void => {
    let index = 0;
    if (edge === 'end') {
        index = runs.length - 1;
    }

    const run = runs[index];
    if (run?.kind !== 'text') {
        return;
    }

    const text = withoutEdgeSpace(run.text, edge);
    if (text === '') {
        runs.splice(index, 1);
    } else {
        runs[index] = { ...run, text };
    }
};

/** The runs of a block without the whitespace the writer leaves out at the start of its first line and the end of its last. */
const withoutBlockEdgeSpace = (runs: readonly Run[]): Run[] => {
    // A block of only blanks is the empty block.
    if (runs.every((run) => run.kind === 'text' && [...run.text].every(isBlank))) {
        return [];
    }

    const trimmed = [...runs];
    trimEdgeRun(trimmed, 'start');
    trimEdgeRun(trimmed, 'end');

    return trimmed;
};

/** A mark or an inline element of the document that the Markdown does not read back as it was. */
export type Lost = { type: string; path: Path };

/** Either the Markdown reads back as the document, or it differs, with what is known to be lost: none when that cannot be told. */
export type ReadBackResult = { kind: 'same' } | { kind: 'differs'; lost: readonly Lost[] };

/** What an inline element stands for in the plain text of its runs. */
type StandIn = (run: InlineRun) => string;

const placeholder: StandIn = () => INLINE_PLACEHOLDER;

const writtenTextOrPlaceholder: StandIn = ({ written }) => written ?? INLINE_PLACEHOLDER;

const plainTextOf = (runs: readonly Run[], standIn: StandIn): string => {
    let text = '';
    for (const run of runs) {
        switch (run.kind) {
            case 'text':
                text += run.text;
                break;
            case 'inline':
                text += standIn(run);
                break;
        }
    }

    return text;
};

/** The run each position of the plain text belongs to. */
const runsByPosition = (runs: readonly Run[], standIn: StandIn): Run[] => {
    const positions: Run[] = [];
    for (const run of runs) {
        let length = 0;
        if (run.kind === 'inline') {
            length = standIn(run).length;
        } else {
            length = run.text.length;
        }

        for (let index = 0; index < length; index++) {
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

/** What a node is: a mark a run carries, or an inline element. */
type NodeKind = 'mark' | 'inline';

type LostCollector = {
    /** What the Markdown does not read back. */
    lost: Lost[];
    /** What the Markdown does not read back, and a host's override wrote. */
    overridden: Lost[];
    report: (kind: NodeKind, type: string, path: Path) => void;
};

const createLostCollector = (overriddenForms: OverriddenForms): LostCollector => {
    const lost: Lost[] = [];
    const overridden: Lost[] = [];
    const reported = new Set<string>();
    const report = (kind: NodeKind, type: string, path: Path): void => {
        const key = `${kind}:${type}:${path.join('.')}`;
        if (reported.has(key)) {
            return;
        }

        reported.add(key);
        if (kind === 'mark' && overriddenForms.marks.has(type)) {
            overridden.push({ type, path });
        } else if (kind === 'inline' && overriddenForms.inlines.has(type)) {
            overridden.push({ type, path });
        } else {
            lost.push({ type, path });
        }
    };

    return { lost, overridden, report };
};

type LostAtPositionParams = {
    run: Run;
    index: number;
    plain: string;
    readPositions: readonly (Run | undefined)[];
    report: LostCollector['report'];
};

const lostAtPosition = ({ run, index, plain, readPositions, report }: LostAtPositionParams): void => {
    if (run.kind === 'inline') {
        const read = readPositions[index];
        if (read === undefined || !sameRun(run, read)) {
            report('inline', run.type, run.path);
        }

        return;
    }

    if (isWhitespace(plain.charAt(index))) {
        return;
    }

    for (const mark of run.marks) {
        if (!carriesMark(readPositions[index], mark)) {
            for (const path of mark.paths) {
                report('mark', mark.name, path);
            }
        }
    }
};

/**
 * What the document holds that the Markdown does not read back, by position: a mark that is missing or has another
 * value on a character that is not whitespace, and an inline element that is not the one read. When the plain texts
 * differ, an inline element that wrote plain text stands for that text, so it is lost by itself and the marks around it
 * still line up. None when they differ still, as the two sides cannot be lined up then.
 */
const lostOf = (
    reference: readonly Run[],
    read: readonly Run[],
    overriddenForms: OverriddenForms,
): Pick<LostCollector, 'lost' | 'overridden'> => {
    let standIn = placeholder;
    if (plainTextOf(reference, placeholder) !== plainTextOf(read, placeholder)) {
        standIn = writtenTextOrPlaceholder;
    }

    const plain = plainTextOf(reference, standIn);
    if (plain !== plainTextOf(read, standIn)) {
        return { lost: [], overridden: [] };
    }

    const readPositions = runsByPosition(read, standIn);
    const collector = createLostCollector(overriddenForms);

    for (const [index, run] of runsByPosition(reference, standIn).entries()) {
        lostAtPosition({ run, index, plain, readPositions, report: collector.report });
    }

    return { lost: collector.lost, overridden: collector.overridden };
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

    const written = withoutBlockEdgeSpace(reference);
    if (sameRuns(runs, written)) {
        return { kind: 'same' };
    }

    const { lost, overridden } = lostOf(written, runs, context.forms.overridden);
    // Everything that differs is what an override wrote, which is the host's to answer for.
    if (lost.length === 0 && overridden.length > 0) {
        return { kind: 'same' };
    }

    return { kind: 'differs', lost };
};
