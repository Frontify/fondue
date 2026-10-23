/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants } from 'node:zlib';

import { build, type Rollup } from 'vite';

const root = fileURLToPath(new URL('../../../..', import.meta.url));

/** The budgets of the Bundle budgets table in bytes, from `size-budgets.json` alone. */
export const budgets = JSON.parse(readFileSync(join(root, 'size-budgets.json'), 'utf8')) as Readonly<
    Record<string, number>
>;

export const brotliBytes = (code: string): number =>
    brotliCompressSync(code, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length;

// React, React DOM and the Fondue workspace packages are what host apps already load.
const HOST_LOADED = /^(?:react|react-dom|@frontify\/fondue-(?:components|icons|tokens))(?:\/|$)/;

export interface ChunkInfo {
    readonly fileName: string;
    readonly bytes: number;
    readonly imports: readonly string[];
    readonly dynamicImports: readonly string[];
    readonly modules: readonly string[];
    readonly isEntry: boolean;
}

export interface Measured {
    /** Minified Brotli bytes of every JavaScript chunk. */
    readonly bytes: number;
    readonly chunks: readonly ChunkInfo[];
    /** Minified Brotli bytes of every stylesheet. */
    readonly cssBytes: number;
    readonly code: string;
    /** The ID of each module that went into a chunk. */
    readonly modules: readonly string[];
}

/** Builds `source`, the lines of an entry module, as a minified library and measures what it emits. */
export const measure = async (
    source: string,
    options: {
        readonly external?: (id: string) => boolean;
        /** Replaces the module a specifier names, as `[{ find: '#/features/marks-strike/feature', replacement: path }]`. */
        readonly alias?: readonly { readonly find: string; readonly replacement: string }[];
    } = {},
): Promise<Measured> => {
    const directory = mkdtempSync(join(tmpdir(), 'rte-bundle-'));
    const entry = join(directory, 'entry.ts');
    writeFileSync(entry, `${source}\n`);
    try {
        const result = await build({
            configFile: false,
            root,
            logLevel: 'silent',
            resolve: { alias: [...(options.alias ?? []), { find: /^#\//, replacement: `${join(root, 'src')}/` }] },
            build: {
                write: false,
                minify: true,
                emptyOutDir: false,
                outDir: directory,
                lib: { entry, formats: ['es'], fileName: 'size' },
                rollupOptions: {
                    external: (id) => HOST_LOADED.test(id) || options.external?.(id) === true,
                },
            },
        });
        const output = ((Array.isArray(result) ? result : [result]) as Rollup.RollupOutput[]).flatMap(
            ({ output: files }) => files,
        );
        const chunks = output.filter((file) => file.type === 'chunk');
        const styles = output.filter(
            (file): file is Rollup.OutputAsset => file.type === 'asset' && file.fileName.endsWith('.css'),
        );
        return {
            bytes: chunks.reduce((total, chunk) => total + brotliBytes(chunk.code), 0),
            chunks: chunks.map((chunk) => ({
                fileName: chunk.fileName,
                bytes: brotliBytes(chunk.code),
                imports: chunk.imports,
                dynamicImports: chunk.dynamicImports,
                modules: Object.keys(chunk.modules),
                isEntry: chunk.isEntry,
            })),
            cssBytes: styles.reduce((total, style) => total + brotliBytes(String(style.source)), 0),
            code: chunks.map((chunk) => chunk.code).join('\n'),
            modules: chunks.flatMap((chunk) => Object.keys(chunk.modules)),
        };
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
};

export type ProfileName = 'inline' | 'comment' | 'document' | 'brand-document';

/**
 * The Brotli bytes of the JavaScript a host loads to mount `profile` before it can render: the chunks its entry
 * imports statically, and the profile's own module, which the editor reaches through one dynamic `import()`. Chunks
 * behind another `import()`, such as the code highlighter, the emoji data and the other locales, load on first use.
 */
export const profileBytes = async (
    profile: ProfileName,
    alias: readonly { readonly find: string; readonly replacement: string }[] = [],
): Promise<{ readonly bytes: number; readonly modules: readonly string[] }> => {
    const { chunks } = await measure(`import '#/features/profiles/__tests__/fixtures/${profile}.entry';`, { alias });
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
        for (const name of chunk.dynamicImports) {
            const next = byName.get(name);
            if (next?.modules.some((id) => id.endsWith(`/react/profiles/${profile}.ts`)) === true) {
                visit(next);
            }
        }
    };
    visit(chunks.find((chunk) => chunk.isEntry));
    return {
        bytes: [...loaded].reduce((total, chunk) => total + chunk.bytes, 0),
        modules: [...loaded].flatMap((chunk) => chunk.modules),
    };
};
