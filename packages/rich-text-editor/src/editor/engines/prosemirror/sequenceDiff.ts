/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Past this many inserted and removed items, two sequences are not matched up: matching costs the square of it. */
const MATCH_LIMIT = 100;

/** `items[index]`, which the caller has already bounded: a miss is a bug in the diff, not a case to handle. */
export const at = <T>(items: readonly T[], index: number): T => {
    const item = items[index];
    if (item === undefined) {
        throw new Error(`No item at index ${index} of ${items.length}.`);
    }

    return item;
};

/** The furthest index into `before` reached on `diagonal`, in a frontier row centred on its middle. */
const reach = (row: readonly number[], diagonal: number): number => at(row, (row.length - 1) / 2 + diagonal);

/** Whether the edit path reaching `diagonal` with `count` changes comes from `diagonal + 1` rather than `diagonal - 1`. */
const fromHigherDiagonal = (row: readonly number[], count: number, diagonal: number): boolean =>
    diagonal === -count || (diagonal !== count && reach(row, diagonal - 1) < reach(row, diagonal + 1));

export type Same = (indexInA: number, indexInB: number) => boolean;

/**
 * Myers' forward pass: the frontier before each number of changes, the last one reaching both ends.
 * Empty when that takes more than `MATCH_LIMIT` changes.
 */
const frontierRows = (lengthA: number, lengthB: number, same: Same): number[][] => {
    const limit = Math.min(lengthA + lengthB, MATCH_LIMIT);
    const centre = limit + 1;
    const frontier = Array.from({ length: 2 * centre + 1 }, () => 0);
    const rows: number[][] = [];

    for (let count = 0; count <= limit; count++) {
        rows.push([...frontier]);

        for (let diagonal = -count; diagonal <= count; diagonal += 2) {
            let x = reach(frontier, diagonal - 1) + 1;
            if (fromHigherDiagonal(frontier, count, diagonal)) {
                x = reach(frontier, diagonal + 1);
            }

            let y = x - diagonal;
            while (x < lengthA && y < lengthB && same(x, y)) {
                x += 1;
                y += 1;
            }

            frontier[centre + diagonal] = x;
            if (x >= lengthA && y >= lengthB) {
                return rows;
            }
        }
    }

    return [];
};

/** Myers' backward pass: the equal pairs on the edit path the rows describe, from the ends back to the start. */
const pathPairs = (rows: readonly number[][], lengthA: number, lengthB: number): [number, number][] => {
    const matched: [number, number][] = [];
    let x = lengthA;
    let y = lengthB;

    for (let count = rows.length - 1; count > 0; count--) {
        const row = at(rows, count);
        const diagonal = x - y;
        let previous = diagonal - 1;
        if (fromHigherDiagonal(row, count, diagonal)) {
            previous = diagonal + 1;
        }

        const previousX = reach(row, previous);
        const previousY = previousX - previous;
        while (x > previousX && y > previousY) {
            matched.push([x - 1, y - 1]);
            x -= 1;
            y -= 1;
        }

        x = previousX;
        y = previousY;
    }

    while (x > 0 && y > 0) {
        matched.push([x - 1, y - 1]);
        x -= 1;
        y -= 1;
    }

    return matched;
};

/**
 * The equal items of two sequences, as index pairs in order, by Myers' diff.
 * Its cost grows with the number of changes, not the length, so a few changes in a long sequence stay cheap.
 */
export const matchStretch = (lengthA: number, lengthB: number, same: Same): [number, number][] => {
    if (lengthA === 0 || lengthB === 0) {
        return [];
    }

    const rows = frontierRows(lengthA, lengthB, same);
    if (rows.length === 0) {
        return [];
    }

    const matched = pathPairs(rows, lengthA, lengthB);
    matched.reverse();

    return matched;
};
