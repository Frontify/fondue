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
const CODEC_EXPORTS = ['serializeToHtml', 'toPlainText'];
const ROOT_EXTERNALS = ['react', 'react-dom', 'react/jsx-runtime'];
const BUNDLE_TIMEOUT = 30_000;

type BundleOptions = {
    /** What the bundle leaves to the host; a package left out is bundled, so its files show up as inputs. */
    external: string[];
};

const bundle = async (exportLine: string, { external }: BundleOptions) => {
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

    const [output] = Object.values(result.metafile.outputs);
    if (output === undefined) {
        throw new Error('Expected a JavaScript bundle.');
    }

    // The input list also includes files that the bundler removed.
    const shippedInputs = Object.entries(output.inputs).filter(([, input]) => input.bytesInOutput > 0);

    return { inputPaths: shippedInputs.map(([path]) => path), exportedNames: output.exports };
};

describe('the bundles', () => {
    it('keeps the Markdown parser out of the root bundle', { timeout: BUNDLE_TIMEOUT }, async () => {
        const { inputPaths } = await bundle(ROOT_ENTRY, { external: ROOT_EXTERNALS });

        expect(inputPaths.filter((path) => MARKDOWN_IT.test(path))).toEqual([]);
    });

    it('exports the HTML and plain text codecs without editor dependencies', { timeout: BUNDLE_TIMEOUT }, async () => {
        const { inputPaths, exportedNames } = await bundle(CODECS_ENTRY, { external: [] });

        expect(exportedNames).toEqual(expect.arrayContaining(CODEC_EXPORTS));
        expect(inputPaths.some((path) => MARKDOWN_IT.test(path))).toBe(true);
        expect(inputPaths.filter((path) => PROSEMIRROR.test(path))).toEqual([]);
        expect(inputPaths.filter((path) => REACT.test(path) || EDITOR_LAYER.test(path))).toEqual([]);
    });
});
