/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type Bench, describe, expect, it } from 'vitest';

import budgets from '../../perf/budgets.json';
import { SETTINGS } from '../../perf/measure';
import method from '../../perf/method.json';
import { measureNode } from '../../perf/node';
import { type BudgetRow, evaluate, failed, percentile, render } from '../../perf/report';

const packageRoot = fileURLToPath(new URL('../..', import.meta.url)).replace(/\/$/, '');
const read = (path: string) => readFileSync(join(packageRoot, path), 'utf8');
const workflow = readFileSync(
    join(packageRoot, '..', '..', '.github', 'workflows', 'rich-text-editor-pull-requests.yaml'),
    'utf8',
);

const rows = budgets.rows as readonly BudgetRow[];

/** The Performance budgets table of `SPEC-rich-text-quality`, as `[id, budget in ms or null]`. */
const TABLE: readonly (readonly [string, number | null])[] = [
    ['keystroke-typical-p95', 50],
    ['keystroke-typical-p99', 100],
    ['keystroke-large-p95', 100],
    ['keystroke-small-p95', 50],
    ['keystroke-words10k-p99', 50],
    ['commit-words10k-p95', 10],
    ['commit-typical-p95', 16],
    ['commit-large-p95', 50],
    ['selector-typical-p95', 16],
    ['mount-typical-p95', 150],
    ['mount-large-p95', 1100],
    ['paste-100kb-typical-p95', 500],
    ['paste-1mib-typical-p95', 2100],
    ['snapshot-large-p95', 50],
    ['mount-many-p95', 2000],
    ['keystroke-many-p95', 50],
    ['command-large-p95', 80],
    ['dialog-typical-p95', 30],
    ['codecs-large-p95', 100],
    ['reader-large-p95', 100],
    ['checks-large-p95', 100],
    ['decode-large-p95', 100],
];

describe('the performance budgets', () => {
    it('hold exactly the rows of the Performance budgets table', () => {
        expect(rows.map(({ id, budgetMs }) => [id, budgetMs])).toEqual(TABLE);
    });

    it('have a measurement for every row, in a bench or a browser test', () => {
        const folders = ['perf', 'src'];
        const sources: string[] = [];
        const visit = (directory: string) => {
            for (const entry of readdirSync(join(packageRoot, directory), { withFileTypes: true })) {
                const path = join(directory, entry.name);
                if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'results') {
                    visit(path);
                } else if (/\.(?:bench\.ts|perf\.tsx)$/.test(entry.name)) {
                    sources.push(read(path));
                }
            }
        };
        for (const folder of folders) {
            visit(folder);
        }

        for (const { id } of rows) {
            expect(
                sources.some((source) => source.includes(`'${id}'`)),
                id,
            ).toBe(true);
        }
    });
});

describe('the performance report', () => {
    const row = (budgetMs: number | null): BudgetRow => ({
        id: 'row',
        metric: 'Metric',
        fixture: 'large',
        percentile: 'p95',
        budgetMs,
    });
    const hundred = Array.from({ length: 100 }, (_, index) => index + 1);

    it('takes the nearest-rank percentile of the samples', () => {
        expect(percentile(hundred, 'p95')).toBe(95);
        expect(percentile(hundred, 'p99')).toBe(99);
        expect(percentile([5, 1, 3], 'p95')).toBe(5);
    });

    it('passes a value at its budget and fails one over it', () => {
        const at = evaluate([row(95)], { row: { parts: { samples: hundred } } });
        const over = evaluate([row(94)], { row: { parts: { samples: hundred } } });

        expect(at.map(({ verdict }) => verdict)).toEqual(['pass']);
        expect(over.map(({ verdict }) => verdict)).toEqual(['over']);
        expect([failed(at), failed(over)]).toEqual([false, true]);
    });

    it('counts the slowest part of a row, so no codec hides behind another', () => {
        const [line] = evaluate([row(100)], { row: { parts: { fast: [1, 2, 3], slow: [200, 210, 220] } } });

        expect(line?.verdict).toBe('over');
        expect(line?.value).toBe(220);
    });

    it('fails a row with a budget and no measurement, and records a row with none', () => {
        const missing = evaluate([row(100)], {});
        const recorded = evaluate([row(null)], {});

        expect(missing.map(({ verdict }) => verdict)).toEqual(['missing']);
        expect(failed(missing)).toBe(true);
        expect(recorded.map(({ verdict }) => verdict)).toEqual(['recorded']);
        expect(failed(recorded)).toBe(false);
    });

    it("prints each row's metric, fixture, percentile, value and budget", () => {
        const text = render(
            evaluate([row(100), { ...row(null), id: 'other', metric: 'Other' }], {
                row: { parts: { samples: hundred } },
            }),
        );

        expect(text).toContain('PASS     Metric | large | p95 | 95.00 ms | budget 100 ms');
        expect(text).toContain('RECORDED Other | large | p95 | not measured | budget recorded, no budget');
    });
});

describe('the performance job', () => {
    it('measures with the runner, browser, throttling, warm-up and sample count of the Method paragraph', () => {
        expect(method).toEqual({
            runner: 'ubuntu-24.04',
            vcpus: 4,
            node: 24,
            browser: 'chromium',
            cpuThrottlingRate: 4,
            warmup: 30,
            samples: 200,
            eventTiming: { durationThreshold: 16, granularityMs: 8 },
            missingKeystrokeMs: 8,
        });
        expect(SETTINGS).toEqual({ warmup: 30, samples: 200 });
    });

    it('runs on the pinned runner and Node version, and its workflow step passes no inline value', () => {
        const job = workflow.slice(workflow.indexOf('\n  performance:'));
        const [, step = ''] = job.split('      - name: Performance budgets\n');

        expect(job).toContain(`runs-on: ${method.runner}`);
        expect(read('../../.nvmrc').trim()).toBe(String(method.node));
        expect(step.trim()).toBe('run: pnpm --stream --filter {packages/rich-text-editor} perf');
    });

    it('reads every other setting of the Method paragraph from its file', () => {
        const job = ['perf/run.ts', 'perf/measure.ts', 'perf/playwright.config.ts', 'perf/performance.perf.tsx']
            .map(read)
            .join('\n');

        // A workflow's `runs-on` cannot read a file, so the test above pins the runner.
        for (const key of Object.keys(method).filter((name) => name !== 'runner')) {
            expect(job, key).toMatch(new RegExp(`method\\.${key}\\b|\\{[^}]*\\b${key}\\b[^}]*\\} = method`));
        }
    });

    it('fails a Node row that retained another number of samples than the method sets', async () => {
        const bench = (() => ({
            run: () => Promise.resolve({ latency: { samples: Array.from({ length: SETTINGS.samples - 1 }, () => 1) } }),
        })) as unknown as Bench;

        await expect(measureNode(bench, 'short-row', { part: () => undefined })).rejects.toThrow();
    });
});
