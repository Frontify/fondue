/* (c) Copyright Frontify Ltd., all rights reserved. */

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

/**
 * Proves the layer rings in `oxlint.config.ts`. `src/` here mirrors the
 * package's own layout with one fixture file per ring; every import a ring must
 * reject is marked `// banned`, every other import must pass. The fixtures are
 * linted through `rings.oxlint.config.ts` next to this file, which is the package
 * config with the fixture folder un-ignored and type-aware rules off (the
 * fixtures import modules that don't exist).
 */

const fixtureRoot = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(fixtureRoot, '..');

type Diagnostic = {
    code: string;
    filename: string;
    labels: { span: { line: number } }[];
};

const listFiles = (directory: string): string[] =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory() ? listFiles(join(directory, entry.name)) : [join(directory, entry.name)],
    );

const expectedViolations = (): string[] =>
    listFiles(join(fixtureRoot, 'src')).flatMap((file) =>
        readFileSync(file, 'utf8')
            .split('\n')
            .flatMap((line, index) =>
                line.endsWith('// banned') ? [`${relative(packageRoot, file)}:${index + 1}`] : [],
            ),
    );

const reportedViolations = (): string[] => {
    let output: string;
    try {
        output = execFileSync(
            join(packageRoot, 'node_modules/.bin/oxlint'),
            ['-c', join(fixtureRoot, 'rings.oxlint.config.ts'), '--format', 'json', join(fixtureRoot, 'src')],
            { cwd: packageRoot, encoding: 'utf8' },
        );
    } catch (error) {
        // oxlint exits non-zero when it reports errors, which the banned imports are.
        output = (error as { stdout: string }).stdout;
    }
    const { diagnostics } = JSON.parse(output) as { diagnostics: Diagnostic[] };

    return diagnostics
        .filter((diagnostic) => diagnostic.code === 'eslint(no-restricted-imports)')
        .flatMap((diagnostic) =>
            diagnostic.labels.map(
                (label) => `${relative(packageRoot, resolve(packageRoot, diagnostic.filename))}:${label.span.line}`,
            ),
        );
};

describe('the import rings', () => {
    it('reject exactly the imports the fixtures mark as banned', () => {
        expect(reportedViolations().sort()).toEqual(expectedViolations().sort());
    });
});
