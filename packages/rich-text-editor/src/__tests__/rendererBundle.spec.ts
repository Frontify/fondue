/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';
import { expect, it } from 'vitest';

const PACKAGE_ROOT = fileURLToPath(new URL('../..', import.meta.url));
// Workspace layout (`../icons/...`) or an install from the registry
const EDITING_UI_PATH = /^\.\.\/(icons|components)\/|node_modules\/@frontify\/fondue-(icons|components)\//;

const bundleInputs = async (exportLine: string): Promise<string[]> => {
    const result = await build({
        stdin: {
            contents: exportLine,
            resolveDir: PACKAGE_ROOT,
            sourcefile: 'entry.ts',
        },
        // Makes metafile input paths relative to the package, so the matcher is stable
        absWorkingDir: PACKAGE_ROOT,
        bundle: true,
        minify: true,
        format: 'esm',
        platform: 'browser',
        write: false,
        metafile: true,
        logLevel: 'silent',
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        loader: { '.scss': 'empty', '.css': 'empty' },
        tsconfig: fileURLToPath(new URL('../../tsconfig.json', import.meta.url)),
    });

    // Only what lands in the output: `metafile.inputs` also lists every file esbuild parsed and then shook out.
    const [output] = Object.values(result.metafile.outputs);
    const shipped = Object.entries(output?.inputs ?? {}).filter(([, input]) => input.bytesInOutput > 0);
    return shipped.map(([path]) => path).filter((path) => EDITING_UI_PATH.test(path));
};

/**
 * Guards the renderer's bundle size. Each plugin file marks its top-level calls
 * `/* @__PURE__ *\/` so a bundler drops the plugin and keeps its content; a
 * computed key or other side effect in a `definePlugin` argument silently
 * defeats that and drags the editing UI into the renderer.
 */
it(
    'bundles RichTextRenderer and serializeToHtml without the icon or component libraries',
    { timeout: 30_000 },
    async () => {
        const editingUiInputs = await bundleInputs(
            `export { RichTextRenderer, serializeToHtml } from './src/index.ts';`,
        );

        expect(editingUiInputs).toEqual([]);
    },
);

// Proves the matcher can match, so the renderer check cannot pass by matching nothing
it('sees the icon library when the editor is bundled', { timeout: 30_000 }, async () => {
    const editingUiInputs = await bundleInputs(`export { RichTextEditor } from './src/index.ts';`);

    expect(editingUiInputs.length).toBeGreaterThan(0);
});
