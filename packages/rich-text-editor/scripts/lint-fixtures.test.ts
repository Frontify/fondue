/* (c) Copyright Frontify Ltd., all rights reserved. */

import { spawnSync } from 'node:child_process';
import { globSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { beforeAll, describe, expect, it } from 'vitest';

type Diagnostic = {
    readonly code: string;
    readonly severity: string;
    readonly filename: string;
    readonly labels: readonly { readonly span: { readonly line: number } }[];
};

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const oxlint = join(packageRoot, 'node_modules', '.bin', 'oxlint');
const fixtures = globSync('src/**/__lint-fixtures__/**/*.{ts,tsx}', { cwd: packageRoot }).sort();

const ANNOTATION = /expect-lint:\s*(\S+)(?:\s+@(\d+))?/;

// `// expect-lint: <code>` names an error on the next line that is not an annotation; `@<line>` names the line itself.
const expectedErrors = (source: string): string[] => {
    const lines = source.split('\n');
    return lines.flatMap((text, index) => {
        const match = ANNOTATION.exec(text);
        if (match === null) {
            return [];
        }
        const [, code, line] = match;
        if (line !== undefined) {
            return [`${line} ${code}`];
        }
        const target = lines.findIndex((candidate, next) => next > index && !ANNOTATION.test(candidate));
        return [`${target + 1} ${code}`];
    });
};

// As the `lint` script does: oxlint-tsgolint 0.23 sometimes loses the `vitest` types when its Go runtime runs in parallel.
const lint = (files: readonly string[]) => {
    const result = spawnSync(oxlint, ['--format', 'json', ...files.map((file) => join(packageRoot, file))], {
        cwd: packageRoot,
        encoding: 'utf8',
        env: { ...process.env, GOMAXPROCS: '1' },
    });
    const { diagnostics } = JSON.parse(result.stdout) as { diagnostics: Diagnostic[] };
    return { status: result.status, diagnostics };
};

const requirementIds = (source: string) =>
    [...new Set(source.match(/SPEC-rich-text(?:-[a-z]+)?\/AC-\d{3}/g))].join(' ');

describe('lint fixtures', () => {
    const reported = new Map<string, string[]>();

    beforeAll(() => {
        for (const diagnostic of lint(fixtures).diagnostics) {
            if (diagnostic.severity !== 'error') {
                continue;
            }
            const errors = reported.get(diagnostic.filename) ?? [];
            for (const { span } of diagnostic.labels) {
                errors.push(`${span.line} ${diagnostic.code}`);
            }
            reported.set(diagnostic.filename, errors);
        }
    }, 120_000);

    it('SPEC-rich-text/AC-010 finds the lint fixtures', () => {
        expect(fixtures.length).toBeGreaterThan(0);
    });

    for (const fixture of fixtures) {
        const source = readFileSync(join(packageRoot, fixture), 'utf8');
        it(`${requirementIds(source)} ${fixture} reports exactly its expected errors`, () => {
            const actual = [...new Set(reported.get(fixture))].sort();

            expect(actual).toEqual([...new Set(expectedErrors(source))].sort());
        });
    }

    it('SPEC-rich-text/AC-083 fails lint with a non-zero exit on the shared-config fixture', () => {
        expect(lint(['src/__lint-fixtures__/shared-config.tsx']).status).toBe(1);
    }, 60_000);
});
