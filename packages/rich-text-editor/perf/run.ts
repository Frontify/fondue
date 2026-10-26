/* (c) Copyright Frontify Ltd., all rights reserved. */

import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { availableParallelism } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import budgets from './budgets.json' with { type: 'json' };
import { RESULTS } from './measure';
import method from './method.json' with { type: 'json' };
import { type BudgetRow, evaluate, failed, readResults, render } from './report';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

// The pinned performance job: the Node rows as Vitest bench, then the browser rows, then every row against its budget.
const node = Number(process.versions.node.split('.')[0]);
if (node !== method.node) {
    throw new Error(`The perf job runs on Node ${method.node}, not ${node}.`);
}

// Budgets gate only the pinned runner, while a local run on any machine stays a measurement.
if (process.env.CI === 'true' && availableParallelism() !== method.vcpus) {
    throw new Error(`The perf job runs on ${method.vcpus} vCPUs, not ${availableParallelism()}.`);
}

rmSync(RESULTS, { recursive: true, force: true });
let broken = false;
for (const args of [
    ['vitest', 'bench', '--run', '--config', 'perf/vitest.config.ts'],
    ['playwright', 'test', '--config', 'perf/playwright.config.ts', '--project', method.browser],
]) {
    const { status } = spawnSync('pnpm', ['exec', ...args], { cwd: packageRoot, stdio: 'inherit' });
    if (status !== 0) {
        broken = true;
    }
}

const rows = budgets.rows as readonly BudgetRow[];
const lines = evaluate(rows, readResults(RESULTS, rows));
process.stdout.write(`${render(lines)}\n`);
if (broken || failed(lines)) {
    process.exitCode = 1;
}
