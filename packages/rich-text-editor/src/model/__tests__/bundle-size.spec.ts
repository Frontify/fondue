/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants } from 'node:zlib';

import { build, type Rollup } from 'vite';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../../..', import.meta.url));

const brotliBytes = (code: string) =>
    brotliCompressSync(code, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length;

describe('model bundle', () => {
    it('stays within 30,000 Brotli bytes and ships no prosemirror import', async () => {
        const directory = mkdtempSync(join(tmpdir(), 'model-bundle-'));
        const entry = join(directory, 'entry.ts');
        writeFileSync(entry, "export * from '#/model';\n");
        try {
            const result = await build({
                configFile: false,
                root,
                logLevel: 'silent',
                resolve: { alias: [{ find: /^#\//, replacement: `${join(root, 'src')}/` }] },
                build: {
                    write: false,
                    minify: true,
                    emptyOutDir: false,
                    outDir: directory,
                    lib: { entry, formats: ['es'], fileName: 'size' },
                },
            });
            const chunks = ((Array.isArray(result) ? result : [result]) as Rollup.RollupOutput[])
                .flatMap(({ output }) => output)
                .filter((chunk) => chunk.type === 'chunk');
            const code = chunks.map((chunk) => chunk.code).join('\n');
            const bytes = chunks.reduce((total, chunk) => total + brotliBytes(chunk.code), 0);

            expect(code).not.toMatch(/['"]prosemirror-/);
            expect(bytes).toBeLessThanOrEqual(30_000);
        } finally {
            rmSync(directory, { recursive: true, force: true });
        }
    }, 60_000);
});
