/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { spawnSync } from 'node:child_process';
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const packageRoot = fileURLToPath(new URL('../../..', import.meta.url));

describe('the skeleton usage fixture', () => {
    it('typechecks with every expected error in place', () => {
        const scratch = realpathSync(mkdtempSync(join(tmpdir(), 'rte-skeleton-usage-')));
        const config = join(scratch, 'tsconfig.json');
        writeFileSync(
            config,
            JSON.stringify({
                extends: join(packageRoot, 'tsconfig.json'),
                // The package program gets the Node types through its test files, which this program does not hold.
                compilerOptions: { typeRoots: [join(packageRoot, 'node_modules/@types')], types: ['node'] },
                include: [],
                files: [
                    join(packageRoot, 'src/react/__tests__/fixtures/skeleton-usage.tsx'),
                    join(packageRoot, 'src/styles/css.d.ts'),
                ],
            }),
        );
        const result = spawnSync(join(packageRoot, 'node_modules/.bin/tsgo'), ['--noEmit', '-p', config], {
            encoding: 'utf8',
        });
        rmSync(scratch, { recursive: true, force: true });

        expect(result.stdout).toBe('');
        expect(result.status).toBe(0);
    }, 120_000);
});
