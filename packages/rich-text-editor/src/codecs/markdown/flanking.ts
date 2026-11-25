/* (c) Copyright Frontify Ltd., all rights reserved. */

// Where an emphasis delimiter opens or closes, by CommonMark's flanking rules, and what makes it do so: a
// character next to it written as a numeric reference, which counts as punctuation and reads back as itself.

import { isWhitespace } from './escape';
import { type DelimiterPair, type DelimiterToken, type InlineToken } from './inlineTokens';

type CharClass = 'space' | 'punctuation' | 'other';

type Side = 'before' | 'after';

/** A run of one emphasis character, with what is written on each side of it. */
type DelimiterRun = {
    delimiters: DelimiterToken[];
    before: InlineToken | undefined;
    after: InlineToken | undefined;
};

/** Unicode punctuation and symbols, which flank like the punctuation of CommonMark. */
const PUNCTUATION = /^[\p{P}\p{S}]$/u;

const EMPHASIS_DELIMITER = /^([*_~])\1*$/;

const UNDERSCORE = '_';

export const isEmphasisDelimiter = (text: string): boolean => EMPHASIS_DELIMITER.test(text);

const classOf = (char: string | undefined): CharClass => {
    if (char === undefined || isWhitespace(char)) {
        return 'space';
    }
    if (PUNCTUATION.test(char)) {
        return 'punctuation';
    }

    return 'other';
};

/** The class of what a token writes next to a delimiter run: a reference starts and ends with punctuation. */
const classNextTo = (token: InlineToken | undefined, side: Side): CharClass => {
    if (token === undefined || token.kind === 'break') {
        return 'space';
    }
    if (token.kind === 'char') {
        if (token.entity) {
            return 'punctuation';
        }

        return classOf(token.char);
    }

    const chars = [...token.text];
    if (side === 'before') {
        return classOf(chars[chars.length - 1]);
    }

    return classOf(chars[0]);
};

const isSameRun = (token: InlineToken | undefined, first: DelimiterToken): token is DelimiterToken =>
    token?.kind === 'delimiter' && token.emphasis && token.text.startsWith(first.text.charAt(0));

const runsOf = (tokens: readonly InlineToken[]): DelimiterRun[] => {
    const runs: DelimiterRun[] = [];
    let index = 0;
    while (index < tokens.length) {
        const first = tokens[index];
        if (first?.kind !== 'delimiter' || !first.emphasis) {
            index++;
            continue;
        }

        const delimiters = [first];
        let end = index + 1;
        let next = tokens[end];
        while (isSameRun(next, first)) {
            delimiters.push(next);
            end++;
            next = tokens[end];
        }

        runs.push({ delimiters, before: tokens[index - 1], after: next });
        index = end;
    }

    return runs;
};

const opens = (run: DelimiterRun): boolean => run.delimiters.some((delimiter) => delimiter.open);

const closes = (run: DelimiterRun): boolean => run.delimiters.some((delimiter) => !delimiter.open);

const isUnderscoreRun = (run: DelimiterRun): boolean => run.delimiters[0]?.text.startsWith(UNDERSCORE) === true;

/** Whether the run opens where it opens and closes where it closes. */
const flanks = (run: DelimiterRun): boolean => {
    const left = classNextTo(run.before, 'before');
    const right = classNextTo(run.after, 'after');
    const leftFlanking = right !== 'space' && (right !== 'punctuation' || left !== 'other');
    const rightFlanking = left !== 'space' && (left !== 'punctuation' || right !== 'other');

    let canOpen = leftFlanking;
    let canClose = rightFlanking;
    // An underscore never opens or closes inside a word.
    if (isUnderscoreRun(run)) {
        canOpen = leftFlanking && (!rightFlanking || left === 'punctuation');
        canClose = rightFlanking && (!leftFlanking || right === 'punctuation');
    }

    return (!opens(run) || canOpen) && (!closes(run) || canClose);
};

/** The characters next to the run that, written as references, would make it flank. */
const neighboursToEncode = (run: DelimiterRun): (InlineToken | undefined)[] => {
    const left = classNextTo(run.before, 'before');
    const right = classNextTo(run.after, 'after');
    const underscore = isUnderscoreRun(run);
    const targets: (InlineToken | undefined)[] = [];

    if (closes(run) && left === 'space') {
        targets.push(run.before);
    }
    if (opens(run) && right === 'space') {
        targets.push(run.after);
    }
    if (closes(run) && left === 'punctuation' && right === 'other') {
        targets.push(run.after);
    }
    if (opens(run) && right === 'punctuation' && left === 'other') {
        targets.push(run.before);
    }
    if (underscore && opens(run) && left === 'other') {
        targets.push(run.before);
    }
    if (underscore && closes(run) && right === 'other') {
        targets.push(run.after);
    }

    return targets;
};

const encode = (token: InlineToken | undefined): boolean => {
    if (token?.kind === 'char' && !token.entity) {
        token.entity = true;

        return true;
    }

    return false;
};

/** Writes neighbours as references until no run changes, and returns the first run that still does not flank. */
const firstUnflankedRun = (tokens: readonly InlineToken[]): DelimiterRun | undefined => {
    // A reference written for one run changes the neighbour of the next, so this repeats until nothing changes.
    let changed = true;
    while (changed) {
        changed = false;
        for (const run of runsOf(tokens)) {
            for (const target of neighboursToEncode(run)) {
                if (encode(target)) {
                    changed = true;
                }
            }
        }
    }

    return runsOf(tokens).find((run) => !flanks(run));
};

export type FlankingResult = {
    tokens: InlineToken[];
    /** The marks that no reference could make open or close: their delimiters are left out. */
    dropped: DelimiterPair[];
};

/**
 * Makes each emphasis delimiter run open or close where it should, by setting `entity` on a character next to
 * it. A mark whose run cannot be fixed has both its delimiters taken out.
 */
export const fixFlanking = (tokens: readonly InlineToken[]): FlankingResult => {
    let kept = [...tokens];
    const dropped: DelimiterPair[] = [];

    let unflanked = firstUnflankedRun(kept);
    while (unflanked !== undefined) {
        const pairs = new Set(unflanked.delimiters.map((delimiter) => delimiter.pair));
        for (const pair of pairs) {
            dropped.push(pair);
        }
        kept = kept.filter((token) => token.kind !== 'delimiter' || !pairs.has(token.pair));
        unflanked = firstUnflankedRun(kept);
    }

    return { tokens: kept, dropped };
};
