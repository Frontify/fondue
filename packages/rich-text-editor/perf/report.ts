/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export type BudgetRow = {
    id: string;
    metric: string;
    fixture: string;
    percentile: 'p95' | 'p99';
    /** The ceiling in ms, or `null` for a row the spec only records. */
    budgetMs: number | null;
};

/** What a measurement wrote: the samples in ms of each part of one row, where the slowest part counts. */
export type Measurement = {
    parts: Readonly<Record<string, readonly number[]>>;
};

export type Verdict = 'pass' | 'over' | 'missing' | 'recorded';

export type Line = {
    row: BudgetRow;
    value: number | null;
    verdict: Verdict;
};

const RANKS = { p95: 0.95, p99: 0.99 } as const;

/** The nearest-rank percentile, since no tinybench version reports p95 (CL-1960). */
export const percentile = (samples: readonly number[], rank: keyof typeof RANKS): number => {
    const sorted = [...samples].sort((left, right) => left - right);
    const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * RANKS[rank]) - 1);

    return sorted[index] ?? Number.NaN;
};

const valueOf = (measurement: Measurement, rank: keyof typeof RANKS): number =>
    Math.max(...Object.values(measurement.parts).map((samples) => percentile(samples, rank)));

/** One line per row of `budgets.json`: a row with no measurement, or an empty one, is a breach, never a pass. */
export const evaluate = (rows: readonly BudgetRow[], results: Readonly<Record<string, Measurement>>): Line[] =>
    rows.map((row) => {
        const measurement = Object.hasOwn(results, row.id) ? results[row.id] : undefined;
        let value: number | null = null;
        if (measurement !== undefined) {
            const measured = valueOf(measurement, row.percentile);
            if (Number.isFinite(measured)) {
                value = measured;
            }
        }

        if (row.budgetMs === null) {
            return { row, value, verdict: 'recorded' };
        }

        if (value === null) {
            return { row, value, verdict: 'missing' };
        }

        if (value > row.budgetMs) {
            return { row, value, verdict: 'over' };
        }

        return { row, value, verdict: 'pass' };
    });

/** Every row's metric, fixture, percentile, value and budget, one per line. */
export const render = (lines: readonly Line[]): string =>
    lines
        .map(({ row, value, verdict }) => {
            let shown = 'not measured';
            if (value !== null) {
                shown = `${value.toFixed(2)} ms`;
            }

            let budget = 'recorded, no budget';
            if (row.budgetMs !== null) {
                budget = `${row.budgetMs} ms`;
            }

            return `${verdict.toUpperCase().padEnd(8)} ${row.metric} | ${row.fixture} | ${row.percentile} | ${shown} | budget ${budget}`;
        })
        .join('\n');

export const failed = (lines: readonly Line[]): boolean =>
    lines.some(({ verdict }) => verdict === 'over' || verdict === 'missing');

/** The measurements the Node and browser runs wrote to `directory`, by row ID. */
export const readResults = (directory: string, rows: readonly BudgetRow[]): Record<string, Measurement> => {
    const results: Record<string, Measurement> = {};
    for (const { id } of rows) {
        const file = join(directory, `${id}.json`);
        if (existsSync(file)) {
            results[id] = JSON.parse(readFileSync(file, 'utf8')) as Measurement;
        }
    }

    return results;
};
