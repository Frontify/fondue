/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cpSync, mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { checkEntryGraph, checkPackageEntries, entrySources } from './check-entry-graph';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));

describe('check-entry-graph', () => {
    let root = '';
    let violations: string[] = [];

    beforeAll(async () => {
        root = realpathSync(mkdtempSync(join(tmpdir(), 'rte-entry-graph-')));
        cpSync(join(packageRoot, 'fixtures/entry-graph'), root, { recursive: true });
        // An installed package whose own dependencies pull in the engine.
        mkdirSync(join(root, 'node_modules/editor-kit'), { recursive: true });
        writeFileSync(
            join(root, 'node_modules/editor-kit/package.json'),
            JSON.stringify({ name: 'editor-kit', dependencies: { 'prosemirror-view': '^1.42.6' } }),
        );
        writeFileSync(join(root, 'node_modules/editor-kit/index.js'), 'export const kit = 1;\n');
        violations = await checkEntryGraph(root, {
            './model': 'src/model/index.ts',
            './features': 'src/features/index.ts',
            './reader': 'src/reader/index.ts',
            './codecs': 'src/codecs/index.ts',
        });
    }, 60_000);

    afterAll(() => {
        rmSync(root, { recursive: true, force: true });
    });

    it('SPEC-rich-text/AC-012 passes on an entry that reaches only model modules', () => {
        expect(violations.filter((violation) => violation.startsWith('./model'))).toEqual([]);
    });

    it('SPEC-rich-text/AC-012 fails with the import chain when an entry reaches an editor layer', () => {
        expect(violations).toContain(
            `./features reaches ${root}/src/runtime/session.ts: src/features/index.ts -> src/runtime/session.ts`,
        );
    });

    it('SPEC-rich-text/AC-012 follows dynamic imports to a prosemirror module', () => {
        expect(violations).toContain(
            './reader reaches prosemirror-model: src/reader/index.ts -> src/reader/render.ts -> prosemirror-model',
        );
    });

    it('SPEC-rich-text-output/AC-027 fails on react-dom/client and on an engine reached through a dependency', () => {
        expect(violations).toContain('./codecs reaches react-dom/client: src/codecs/index.ts -> react-dom/client');
        expect(violations).toContain(
            './codecs reaches prosemirror-view: src/codecs/index.ts -> editor-kit -> prosemirror-view',
        );
    });

    it('SPEC-rich-text/AC-012 passes on the package entries', async () => {
        const entries = entrySources(packageRoot);

        expect(Object.keys(entries)).toContain('./model');
        expect(await checkEntryGraph(packageRoot, entries)).toEqual([]);
    }, 60_000);

    it('SPEC-rich-text/AC-012 fails when an exports entry with rules has no source module', async () => {
        const { violations: found, checked } = await checkPackageEntries(
            join(packageRoot, 'fixtures/entry-graph/unmapped'),
        );

        expect(checked).toEqual([]);
        expect(found).toContain('./model has rules but its import target maps to no src/**/*.ts(x) source');
        expect(found).toContain('no exports entry with rules was checked');
        expect(found.join('\n')).not.toContain('./other');
    });
});
