/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants } from 'node:zlib';

import { build, type Rollup } from 'vite';

export type Budget = { readonly build: string; readonly fixture: string; readonly maxBytes: number };

// Host apps already load these, so no budget counts them (SPEC-rich-text-quality, Bundle budgets).
const HOST_PACKAGES = /^(react|react-dom|@frontify\/fondue-(components|icons|tokens))(\/|$)/;

const brotliBytes = (code: string) =>
    brotliCompressSync(code, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length;

/** Builds one size fixture with Vite, minified, and returns the Brotli level 11 bytes of its JavaScript. */
export const measure = async (root: string, fixture: string): Promise<number> => {
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
    const outputs = (Array.isArray(result) ? result : [result]) as Rollup.RollupOutput[];
    return outputs
        .flatMap(({ output }) => output)
        .reduce((bytes, chunk) => bytes + (chunk.type === 'chunk' ? brotliBytes(chunk.code) : 0), 0);
};

/** SPEC-rich-text-quality/AC-020: every build in `size-budgets.json` is at or below its budget. */
export const checkBundleSizes = async (root: string, budgets: readonly Budget[]) => {
    const measured = await Promise.all(
        budgets.map(async (budget) => ({ budget, bytes: await measure(root, budget.fixture) })),
    );
    const violations = measured
        .filter(({ budget, bytes }) => bytes > budget.maxBytes)
        .map(({ budget, bytes }) => `${budget.build} is ${bytes} Brotli bytes, over its budget of ${budget.maxBytes}`);
    const report = measured.map(({ budget, bytes }) => `${budget.build} ${bytes}/${budget.maxBytes}`);
    return { violations: budgets.length === 0 ? ['size-budgets.json holds no budget'] : violations, report };
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = fileURLToPath(new URL('..', import.meta.url));
    const budgets = JSON.parse(readFileSync(join(root, 'size-budgets.json'), 'utf8')) as Budget[];
    const { violations, report } = await checkBundleSizes(root, budgets);
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log(`check-bundle-size: ${report.join(', ')} Brotli bytes, each within its budget.`);
}
