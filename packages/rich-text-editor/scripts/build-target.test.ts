/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build, resolveConfig, type Rollup } from 'vite';
import { describe, expect, it } from 'vitest';

import { scanFile } from './check-platform';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const fixture = join(packageRoot, 'fixtures/build-target/modern.ts');

describe('build target', () => {
    it('SPEC-rich-text-quality/AC-039 lowers syntax newer than the browserslist floor in JavaScript and CSS', async () => {
        const { build: options } = await resolveConfig(
            { configFile: join(packageRoot, 'vite.config.ts'), logLevel: 'silent' },
            'build',
        );
        const output = (await build({
            configFile: false,
            logLevel: 'silent',
            build: {
                target: options.target,
                cssTarget: options.cssTarget,
                write: false,
                lib: { entry: fixture, formats: ['es'], cssFileName: 'style' },
            },
        })) as Rollup.RollupOutput[];
        const files = output.flatMap(({ output: chunks }) => chunks);
        const code = files.flatMap((file) => (file.type === 'chunk' ? [file.code] : [])).join('\n');
        const css = files
            .flatMap((file) => (file.type === 'asset' && file.fileName.endsWith('.css') ? [String(file.source)] : []))
            .join('\n');

        expect(readFileSync(fixture, 'utf8')).toMatch(/\busing resource\b/);
        expect(
            scanFile('modern.css', readFileSync(join(packageRoot, 'fixtures/build-target/modern.css'), 'utf8')),
        ).toEqual(['modern.css:4 uses nesting']);
        expect(code).not.toMatch(/\busing\s+\w+\s*=/);
        expect(code).toMatch(/\bstatic\s*\{/);
        expect(css).toContain('.toolbar .item');
        expect(scanFile('style.css', css)).toEqual([]);
    }, 60_000);
});
