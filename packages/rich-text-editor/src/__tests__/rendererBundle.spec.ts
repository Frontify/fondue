/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';
import { expect, it } from 'vitest';

const PACKAGE_ROOT = fileURLToPath(new URL('../..', import.meta.url));
// A plugin's own top-level file, its helpers and its styles; never components/, another package or node_modules
const CONTENT_CODE =
    /^src\/(index\.ts$|core\/|renderer\/|plugins\/(defaultContent\.ts$|shared\/helpers\/|[A-Za-z]+\/([A-Z]\w*\.tsx?$|helpers\/|\w+\.module\.scss$)))/;
const MENTION_READ_VIEW = 'src/plugins/Mention/components/MentionLink.tsx';

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
    return shipped.map(([path]) => path);
};

/**
 * Guards the renderer's bundle size with an allowlist. Each plugin file marks its top-level
 * calls `/* @__PURE__ *\/` so a bundler drops the plugin and keeps its content; a computed
 * key or other side effect in a `definePlugin` argument keeps the plugin, and its editing UI,
 * in the renderer.
 */
it(
    'bundles the renderer, serializeToHtml, toPlainText and columnBreakContent from content code only',
    { timeout: 30_000 },
    async () => {
        const inputs = await bundleInputs(
            `export { RichTextRenderer, serializeToHtml, toPlainText, columnBreakContent } from './src/index.ts';`,
        );

        expect(inputs.filter((path) => !CONTENT_CODE.test(path))).toEqual([]);
    },
);

// The read view of a mention links with the icon and component libraries, so only src/ is checked
it('bundles mentionContent without the mention picker', { timeout: 30_000 }, async () => {
    const inputs = await bundleInputs(`export { mentionContent } from './src/index.ts';`);

    const sourceInputs = inputs.filter((path) => path.startsWith('src/'));
    expect(sourceInputs.filter((path) => !CONTENT_CODE.test(path) && path !== MENTION_READ_VIEW)).toEqual([]);
});

// Proves the allowlist can reject, so the renderer checks cannot pass by matching everything
it('ships code outside content code when the editor is bundled', { timeout: 30_000 }, async () => {
    const inputs = await bundleInputs(`export { RichTextEditor } from './src/index.ts';`);

    expect(inputs.filter((path) => !CONTENT_CODE.test(path)).length).toBeGreaterThan(0);
});
