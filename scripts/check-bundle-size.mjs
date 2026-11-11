/* (c) Copyright Frontify Ltd., all rights reserved. */

import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

import { build } from 'esbuild';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PACKAGE_DIRECTORIES = {
    '@frontify/fondue-icons': 'packages/icons',
    '@frontify/fondue-components': 'packages/components',
    '@frontify/fondue-rich-text-editor': 'packages/rich-text-editor',
};

// Each limit is the measured minified size plus about 20%, rounded up to a whole kB.
const ENTRIES = [
    {
        name: 'One icon',
        code: "export { IconCheckMark } from '@frontify/fondue-icons';",
        limitKb: 2,
    },
    {
        name: 'One component',
        code: "export { Button } from '@frontify/fondue-components';",
        limitKb: 1,
    },
    {
        name: 'Icon and component',
        code: "export { IconCheckMark } from '@frontify/fondue-icons';\nexport { Button } from '@frontify/fondue-components';",
        limitKb: 3,
    },
    {
        name: 'Rich text renderer',
        code: "export { RichTextRenderer } from '@frontify/fondue-rich-text-editor';",
        limitKb: 23,
    },
];

// Resolves each package to its built entry, so the package's own package.json (and its sideEffects) still applies.
const workspacePackagesPlugin = {
    name: 'workspace-packages',
    setup(pluginBuild) {
        pluginBuild.onResolve(
            {
                filter: /^@frontify\/(fondue-icons|fondue-components|fondue-rich-text-editor)$/,
            },
            (args) => {
                const packageDirectory = join(repoRoot, PACKAGE_DIRECTORIES[args.path]);
                const manifest = JSON.parse(readFileSync(join(packageDirectory, 'package.json'), 'utf8'));
                const entryPath = join(packageDirectory, manifest.exports['.'].import);
                if (!existsSync(entryPath)) {
                    throw new Error(`${args.path} is not built: run its build first`);
                }
                return { path: entryPath };
            },
        );
    },
};

const toKb = (bytes) => (bytes / 1024).toFixed(1);

const measure = async (code) => {
    const result = await build({
        stdin: { contents: code, resolveDir: repoRoot, loader: 'js' },
        bundle: true,
        minify: true,
        format: 'esm',
        platform: 'browser',
        write: false,
        outfile: 'out.js',
        logLevel: 'error',
        // A consumer ships ProseMirror and the Radix packages, so only React is left out.
        external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
        plugins: [workspacePackagesPlugin],
    });
    const output = result.outputFiles.find((file) => file.path.endsWith('.js'));
    return {
        bytes: output.contents.length,
        gzipBytes: gzipSync(output.contents).length,
    };
};

const rows = [];
for (const entry of ENTRIES) {
    const { bytes, gzipBytes } = await measure(entry.code);
    let status = 'ok';
    if (bytes > entry.limitKb * 1024) {
        status = 'over';
    }
    rows.push({
        name: entry.name,
        size: toKb(bytes),
        gzip: toKb(gzipBytes),
        limit: entry.limitKb.toFixed(1),
        status,
    });
}

const nameWidth = Math.max(...rows.map((row) => row.name.length));
for (const row of rows) {
    console.log(
        `${row.name.padEnd(nameWidth)}  ${row.size.padStart(8)} kB  gzip ${row.gzip.padStart(8)} kB  limit ${row.limit.padStart(8)} kB  ${row.status}`,
    );
}

if (process.env.GITHUB_STEP_SUMMARY) {
    const lines = ['| Entry | Size (kB) | Gzip (kB) | Limit (kB) | Status |', '| --- | ---: | ---: | ---: | --- |'];
    for (const row of rows) {
        lines.push(`| ${row.name} | ${row.size} | ${row.gzip} | ${row.limit} | ${row.status} |`);
    }
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join('\n')}\n`);
}

if (rows.some((row) => row.status === 'over')) {
    console.error(
        'Bundle over its limit. If the growth is intended, raise its limitKb in scripts/check-bundle-size.mjs.',
    );
    process.exit(1);
}
