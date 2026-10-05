/* (c) Copyright Frontify Ltd., all rights reserved. */

import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

type Report = {
    readonly stats: { readonly expected: number; readonly flaky: number; readonly unexpected: number };
    readonly errors: readonly { readonly message: string }[];
};

const packageRoot = fileURLToPath(new URL('..', import.meta.url));

// The component build logs to stdout, so the JSON report goes to a file.
const runFixture = (spec: string) => {
    const directory = mkdtempSync(join(tmpdir(), 'rte-playwright-'));
    const reportFile = join(directory, 'report.json');
    try {
        const result = spawnSync(
            join(packageRoot, 'node_modules/.bin/playwright'),
            [
                'test',
                '--config',
                'fixtures/playwright/playwright.config.ts',
                '--project',
                'chromium',
                '--reporter',
                'json',
                spec,
            ],
            {
                cwd: packageRoot,
                encoding: 'utf8',
                env: { ...process.env, CI: '1', PLAYWRIGHT_JSON_OUTPUT_FILE: reportFile },
            },
        );
        return { status: result.status, report: JSON.parse(readFileSync(reportFile, 'utf8')) as Report };
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
};

describe('Playwright CT config under CI', () => {
    it('SPEC-rich-text/AC-092 fails the run on a test.only', () => {
        const { status, report } = runFixture('only.ct.tsx');

        expect(status).not.toBe(0);
        expect(report.errors.map(({ message }) => message).join('\n')).toContain(
            "Error: item focused with '.only' is not allowed due to the 'forbidOnly' option",
        );
    }, 180_000);

    it('SPEC-rich-text-quality/AC-008 fails the run and reports a test that passes only on retry as flaky', () => {
        const { status, report } = runFixture('flaky.ct.tsx');

        expect(status).not.toBe(0);
        expect(report.stats).toMatchObject({ flaky: 1, unexpected: 0, expected: 0 });
    }, 180_000);
});
