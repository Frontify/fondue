/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants } from 'node:zlib';

import { build, type Rollup } from 'vite';

export type Budget = { readonly build: string; readonly fixture: string; readonly maxBytes: number };

// Host apps already load these, so no budget counts them (SPEC-rich-text-quality, Bundle budgets).
const HOST_PACKAGES = /^(react|react-dom|@frontify\/fondue-(components|icons|tokens))(\/|$)/;

const brotliBytes = (code: string) =>
    brotliCompressSync(code, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length;

/** Builds one size fixture with Vite, minified; returns its Brotli level 11 bytes and whether it bundles any module under `directory`. */
export const measure = async (root: string, fixture: string, directory: string) => {
    const result = await build({
        configFile: false,
        root,
        logLevel: 'silent',
        resolve: { alias: [{ find: /^#\//, replacement: `${join(root, 'src')}/` }] },
        build: {
            write: false,
            minify: true,
            lib: { entry: join(root, fixture), formats: ['es'], fileName: 'size' },
            rollupOptions: { external: (id) => HOST_PACKAGES.test(id) },
        },
    });
    const chunks = ((Array.isArray(result) ? result : [result]) as Rollup.RollupOutput[])
        .flatMap(({ output }) => output)
        .filter((chunk) => chunk.type === 'chunk');
    return {
        bytes: chunks.reduce((bytes, chunk) => bytes + brotliBytes(chunk.code), 0),
        // A pure re-export entry such as `src/model/index.ts` is dropped from the graph, so its folder is the signal.
        pullsBuild: chunks.some((chunk) =>
            chunk.moduleIds.some((id) => id.startsWith(`${realpathSync(join(root, directory))}${sep}`)),
        ),
    };
};

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value !== '';

const isBudget = (row: unknown): row is Budget => {
    if (typeof row !== 'object' || row === null) {
        return false;
    }
    const { build: name, fixture, maxBytes } = row as Record<string, unknown>;
    return (
        isNonEmptyString(name) &&
        isNonEmptyString(fixture) &&
        typeof maxBytes === 'number' &&
        Number.isFinite(maxBytes) &&
        maxBytes > 0
    );
};

// `./model` is built from `src/model/index.ts`; the `.tsx` index is the other accepted entry.
const entryDirectory = (root: string, name: string) => {
    const path = /^\.\/([\w-]+(?:\/[\w-]+)*)$/.exec(name)?.[1];
    const directory = path === undefined ? undefined : join('src', path);
    return directory !== undefined &&
        ['index.ts', 'index.tsx'].some((entry) => existsSync(join(root, directory, entry)))
        ? directory
        : undefined;
};

/** SPEC-rich-text-quality/AC-020: every build in `size-budgets.json` is at or below its budget. */
export const checkBundleSizes = async (root: string, budgets: readonly unknown[]) => {
    const rows = await Promise.all(
        budgets.map(async (row, index) => {
            if (!isBudget(row)) {
                return {
                    violations: [
                        `size-budgets.json row ${index} needs a build, a fixture and a finite positive maxBytes`,
                    ],
                };
            }
            const directory = entryDirectory(root, row.build);
            if (directory === undefined) {
                return { violations: [`${row.build} has no src/<name>/index.ts or index.tsx entry`] };
            }
            const { bytes, pullsBuild } = await measure(root, row.fixture, directory);
            const violations = [
                ...(pullsBuild ? [] : [`${row.fixture} does not bundle ${row.build}`]),
                ...(bytes > row.maxBytes
                    ? [`${row.build} is ${bytes} Brotli bytes, over its budget of ${row.maxBytes}`]
                    : []),
            ];
            return { violations, report: `${row.build} ${bytes}/${row.maxBytes}` };
        }),
    );
    return {
        violations:
            budgets.length === 0 ? ['size-budgets.json holds no budget'] : rows.flatMap(({ violations }) => violations),
        report: rows.flatMap(({ report }) => (report === undefined ? [] : [report])),
    };
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = fileURLToPath(new URL('..', import.meta.url));
    const budgets = JSON.parse(readFileSync(join(root, 'size-budgets.json'), 'utf8')) as unknown[];
    const { violations, report } = await checkBundleSizes(root, budgets);
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log(`check-bundle-size: ${report.join(', ')} Brotli bytes, each within its budget.`);
}
