/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';
import { expect, it } from 'vitest';

const PACKAGE_ROOT = fileURLToPath(new URL('../..', import.meta.url));
// A plugin's own top-level file, its helpers and its styles; never components/, another package or node_modules
const OWN_LAYERS = String.raw`index\.ts$|core/|renderer/`;
const SHARED_PLUGIN_CODE = String.raw`defaultContent\.ts$|shared/helpers/`;
const PLUGIN_FILES = String.raw`(?<plugin>[A-Za-z]+)/(\k<plugin>\.tsx?$|helpers/|types\.ts$|\w+\.module\.scss$)`;
const CONTENT_CODE = new RegExp(`^src/(${OWN_LAYERS}|plugins/(${SHARED_PLUGIN_CODE}|${PLUGIN_FILES}))`);
const MENTION_READ_VIEW = 'src/plugins/Mention/components/MentionLink.tsx';
const RENDERER_ENTRY = `export { RichTextRenderer, serializeToHtml, toPlainText, columnBreakContent } from './src/index.ts';`;
// The editing registry and the CSS colour parser: only the editor needs them
const EDITING_ONLY_CORE = /^src\/core\/(registry|hotkeys|cssColor)\.ts$/;

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

// An allowlist, not a blocklist: a side effect in a plugin file keeps the plugin and its editing UI in the renderer.
it(
    'bundles the renderer, serializeToHtml, toPlainText and columnBreakContent from content code only',
    { timeout: 30_000 },
    async () => {
        const inputs = await bundleInputs(RENDERER_ENTRY);

        expect(inputs.filter((path) => !CONTENT_CODE.test(path))).toEqual([]);
    },
);

it(
    'bundles the renderer, serializeToHtml and toPlainText without the editing registry or the colour parser',
    { timeout: 30_000 },
    async () => {
        const inputs = await bundleInputs(RENDERER_ENTRY);

        expect(inputs.filter((path) => EDITING_ONLY_CORE.test(path))).toEqual([]);
    },
);

// The read view of a mention links with the icon and component libraries, so only src/ is checked
it('bundles mentionContent without the mention picker', { timeout: 30_000 }, async () => {
    const inputs = await bundleInputs(`export { mentionContent } from './src/index.ts';`);

    const isAllowed = (path: string): boolean => CONTENT_CODE.test(path) || path === MENTION_READ_VIEW;
    const sourceInputs = inputs.filter((path) => path.startsWith('src/'));
    expect(sourceInputs.filter((path) => !isAllowed(path))).toEqual([]);
});

// Proves the allowlist can reject, so the renderer checks cannot pass by matching everything
it('ships code outside content code when the editor is bundled', { timeout: 30_000 }, async () => {
    const inputs = await bundleInputs(`export { RichTextEditor } from './src/index.ts';`);

    expect(inputs.filter((path) => !CONTENT_CODE.test(path)).length).toBeGreaterThan(0);
});
