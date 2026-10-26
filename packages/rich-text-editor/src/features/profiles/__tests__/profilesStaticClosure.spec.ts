/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { type ChunkInfo, measure } from '../../../__tests__/fixtures/size/bundle';

const MARKDOWN_MODULE =
    /\/node_modules\/(?:markdown-it|entities|linkify-it|mdurl|uc\.micro)\/|\/codecs\/(?:from|to)Markdown\.ts$/;

/** The modules of the chunks an app's entry reaches through static imports, never through an `import()`. */
const staticClosure = async (source: string): Promise<readonly string[]> => {
    const { chunks } = await measure(source, { sourceIsPure: true });
    const byName = new Map(chunks.map((chunk) => [chunk.fileName, chunk]));
    const loaded = new Set<ChunkInfo>();
    const visit = (chunk: ChunkInfo | undefined) => {
        if (chunk === undefined || loaded.has(chunk)) {
            return;
        }

        loaded.add(chunk);
        for (const name of chunk.imports) {
            visit(byName.get(name));
        }
    };

    visit(chunks.find((chunk) => chunk.isEntry));

    return [...loaded].flatMap((chunk) => chunk.modules);
};

// A bundler leaves the root out of the module list, since it only re-exports, so the modules it re-exports stand in.
const REACHED_THROUGH_ROOT = ['/src/react/define.ts', '/src/react/RichTextEditor.tsx'];

const reachesRoot = (modules: readonly string[]): boolean =>
    REACHED_THROUGH_ROOT.every((suffix) => modules.some((id) => id.endsWith(suffix)));

const featureFolders = (modules: readonly string[]): string[] => [
    ...new Set(modules.flatMap((id) => /\/src\/features\/([^/]+)\//.exec(id)?.[1] ?? [])),
];

describe('static closure of an app', () => {
    // The closure checks drop unused package modules, which a host's bundler does only while this holds.
    it('declares only the stylesheet as a side effect of the package', () => {
        const { sideEffects } = JSON.parse(
            readFileSync(new URL('../../../../package.json', import.meta.url), 'utf8'),
        ) as {
            sideEffects?: unknown;
        };

        expect(sideEffects).toEqual(['./dist/style.css']);
    });

    it('holds no Markdown parsing when it defines the Document profile', async () => {
        const modules = await staticClosure(`
import { defineEditor, RichTextEditor } from '#/index';
import { documentModel } from '#/features/profiles/document';
import { documentPlugins } from '#/react/profiles/document';

export const definition = defineEditor({ id: 'app.document', model: documentModel, plugins: documentPlugins });
export { RichTextEditor };
`);

        expect(modules.length).toBeGreaterThan(0);
        expect(reachesRoot(modules)).toBe(true);
        expect(modules.filter((id) => MARKDOWN_MODULE.test(id))).toEqual([]);
    }, 120_000);

    it('holds no other feature, code highlighter or emoji data when it defines core and bold only', async () => {
        const modules = await staticClosure(`
import { boldPlugin, corePlugin, defineEditor, modelOf, RichTextEditor } from '#/index';

const plugins = [corePlugin(), boldPlugin()] as const;
export const definition = defineEditor({
    id: 'app.bold',
    model: modelOf(plugins, { id: 'app.bold', version: 1 }),
    plugins,
});
export { RichTextEditor };
`);

        expect(modules.length).toBeGreaterThan(0);
        expect(reachesRoot(modules)).toBe(true);
        expect(featureFolders(modules).sort()).toEqual(['core', 'marksBold']);
        // No module sits loose in `features`, where the registries of every unit live.
        expect(modules.filter((id) => /\/src\/features\/[^/]+\.ts$/.test(id))).toEqual([]);
        expect(modules.filter((id) => /\/node_modules\/(?:lowlight|emojibase-data)\//.test(id))).toEqual([]);
    }, 120_000);
});
