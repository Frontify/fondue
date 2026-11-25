/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';
import { describe, expect, it } from 'vitest';

const PACKAGE_ROOT = fileURLToPath(new URL('../..', import.meta.url));
const ROOT_ENTRY = `export * from './src/index.ts';`;
const CODECS_ENTRY = `export * from './src/codecs/index.ts';`;
const MARKDOWN_IT = /node_modules\/markdown-it\//;
const PROSEMIRROR = /node_modules\/prosemirror-/;
const REACT = /node_modules\/react(-dom)?\//;
const EDITOR_LAYER = /^src\/editor\//;
const SERIALIZE_TO_HTML_FILE = 'src/codecs/html/serializeToHtml.ts';
const TO_PLAIN_TEXT_FILE = 'src/codecs/text/toPlainText.ts';
const ROOT_EXTERNALS = ['react', 'react-dom', 'react/jsx-runtime'];
const BUNDLE_TIMEOUT = 30_000;

type BundleInputsOptions = {
    /** What the bundle leaves to the host; a package left out is bundled, so its files show up as inputs. */
    external: string[];
};

const bundleInputs = async (exportLine: string, { external }: BundleInputsOptions): Promise<string[]> => {
    const result = await build({
        stdin: {
            contents: exportLine,
            resolveDir: PACKAGE_ROOT,
            sourcefile: 'entry.ts',
        },
        // Makes metafile input paths relative to the package, so the matchers are stable
        absWorkingDir: PACKAGE_ROOT,
        bundle: true,
        minify: true,
        format: 'esm',
        platform: 'browser',
        write: false,
        metafile: true,
        logLevel: 'silent',
        external,
        loader: { '.scss': 'empty', '.css': 'empty' },
        tsconfig: fileURLToPath(new URL('../../tsconfig.json', import.meta.url)),
    });

    // Only what lands in the output: `metafile.inputs` also lists every file esbuild parsed and then shook out.
    const [output] = Object.values(result.metafile.outputs);
    const shipped = Object.entries(output?.inputs ?? {}).filter(([, input]) => input.bytesInOutput > 0);
    return shipped.map(([path]) => path);
};

describe('the bundles', () => {
    it('stays out of the root bundle: it holds no markdown-it', { timeout: BUNDLE_TIMEOUT }, async () => {
        const inputs = await bundleInputs(ROOT_ENTRY, { external: ROOT_EXTERNALS });

        expect(inputs.filter((path) => MARKDOWN_IT.test(path))).toEqual([]);
    });

    // Proves the matchers can match, so the checks below cannot pass by matching nothing
    it('bundles markdown-it', { timeout: BUNDLE_TIMEOUT }, async () => {
        const inputs = await bundleInputs(CODECS_ENTRY, { external: [] });

        expect(inputs.filter((path) => MARKDOWN_IT.test(path)).length).toBeGreaterThan(0);
    });

    // Proves the HTML and plain text codecs are in the bundle the checks below inspect
    it('bundles the HTML and plain text codecs', { timeout: BUNDLE_TIMEOUT }, async () => {
        const inputs = await bundleInputs(CODECS_ENTRY, { external: [] });

        expect(inputs).toContain(SERIALIZE_TO_HTML_FILE);
        expect(inputs).toContain(TO_PLAIN_TEXT_FILE);
    });

    it('bundles without ProseMirror', { timeout: BUNDLE_TIMEOUT }, async () => {
        const inputs = await bundleInputs(CODECS_ENTRY, { external: [] });

        expect(inputs.filter((path) => PROSEMIRROR.test(path))).toEqual([]);
    });

    it('bundles without React or the editor', { timeout: BUNDLE_TIMEOUT }, async () => {
        const inputs = await bundleInputs(CODECS_ENTRY, { external: [] });

        expect(inputs.filter((path) => REACT.test(path) || EDITOR_LAYER.test(path))).toEqual([]);
    });
});
