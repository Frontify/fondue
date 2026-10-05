/* (c) Copyright Frontify Ltd., all rights reserved. */

import { spawnSync } from 'node:child_process';
import {
    copyFileSync,
    cpSync,
    existsSync,
    mkdirSync,
    mkdtempSync,
    readdirSync,
    readFileSync,
    realpathSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const { scripts } = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')) as {
    scripts: Record<string, string>;
};

// The package as the typecheck job sees it, without build output.
const COPIED = [
    'package.json',
    'tsconfig.json',
    'tsconfig.node.json',
    'vite.config.ts',
    'playwright.config.ts',
    'oxlint.config.ts',
    'oxfmt.config.ts',
    'scripts',
    'lint',
    'src',
    'playwright',
    '.storybook',
];

const runTypecheck = (cwd: string) => {
    const bin = join(packageRoot, 'node_modules', '.bin');
    const result = spawnSync(scripts.typecheck ?? 'false', {
        cwd,
        shell: true,
        encoding: 'utf8',
        env: { ...process.env, PATH: `${bin}${delimiter}${process.env.PATH ?? ''}` },
    });
    return { status: result.status, output: `${result.stdout}${result.stderr}` };
};

describe('typecheck', () => {
    let copy = '';

    beforeAll(() => {
        copy = realpathSync(mkdtempSync(join(tmpdir(), 'rte-typecheck-')));
        for (const path of COPIED.filter((name) => existsSync(join(packageRoot, name)))) {
            cpSync(join(packageRoot, path), join(copy, path), {
                recursive: true,
                filter: (source) => !source.endsWith('.cache'),
            });
        }
        // Linked entry by entry, so the copy keeps its own `.cache` and its own incremental build info.
        mkdirSync(join(copy, 'node_modules'));
        for (const entry of readdirSync(join(packageRoot, 'node_modules')).filter((name) => name !== '.cache')) {
            symlinkSync(join(packageRoot, 'node_modules', entry), join(copy, 'node_modules', entry));
        }
    });

    afterAll(() => {
        rmSync(copy, { recursive: true, force: true });
    });

    it('SPEC-rich-text/AC-093 passes on the package as it is', () => {
        const { status, output } = runTypecheck(copy);

        expect(output).not.toContain('error');
        expect(status).toBe(0);
    }, 120_000);

    it('SPEC-rich-text/AC-093 fails on a type error in scripts/', () => {
        const target = join(copy, 'scripts', 'type-error.ts');
        copyFileSync(join(packageRoot, 'fixtures/types/script-error.ts'), target);
        const result = runTypecheck(copy);
        rmSync(target);

        expect(result.status).not.toBe(0);
        expect(result.output).toContain('scripts/type-error.ts');
    }, 120_000);

    it('SPEC-rich-text/AC-093 fails on a type error in lint/', () => {
        const target = join(copy, 'lint', 'type-error.js');
        copyFileSync(join(packageRoot, 'fixtures/types/lint-error.js'), target);
        const result = runTypecheck(copy);
        rmSync(target);

        expect(result.status).not.toBe(0);
        expect(result.output).toContain('lint/type-error.js');
    }, 120_000);

    it('SPEC-rich-text/AC-043 fails on an unchecked index access under the package tsconfig', () => {
        const config = join(copy, 'tsconfig.fixture.json');
        const fixture = join(packageRoot, 'fixtures/types/unchecked-index.ts');
        writeFileSync(config, JSON.stringify({ extends: './tsconfig.json', include: [], files: [fixture] }));
        const result = spawnSync(join(packageRoot, 'node_modules/.bin/tsgo'), ['--noEmit', '-p', config], {
            cwd: copy,
            encoding: 'utf8',
        });

        expect(result.status).not.toBe(0);
        expect(result.stdout).toMatch(
            /unchecked-index\.ts\(3,14\): error TS2322: Type 'string \| undefined' is not assignable to type 'string'/,
        );
    }, 120_000);
});
