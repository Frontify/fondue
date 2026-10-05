/* (c) Copyright Frontify Ltd., all rights reserved. */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export type PackageJson = {
    readonly name?: string;
    readonly version?: string;
    readonly type?: string;
    readonly publishConfig?: { readonly access?: string };
    readonly exports?: Record<string, unknown>;
    readonly peerDependencies?: Record<string, string>;
    readonly devDependencies?: Record<string, string>;
};

// SPEC-rich-text, Package layout.
export const LAYOUT_ENTRIES = [
    '.',
    './model',
    './features',
    './reader',
    './codecs',
    './html',
    './testing',
    './locales/*',
    './styles',
];
const STYLES = './styles';
const WORKSPACE_PEERS = ['@frontify/fondue-components', '@frontify/fondue-icons', '@frontify/fondue-tokens'];

const isScriptTarget = (target: unknown): target is { types: string; import: string } =>
    typeof target === 'object' &&
    target !== null &&
    Object.keys(target).join() === 'types,import' &&
    Object.values(target).every((value) => typeof value === 'string');

const scriptEntries = (pkg: PackageJson) =>
    Object.entries(pkg.exports ?? {}).flatMap(([entry, target]) =>
        isScriptTarget(target) && !entry.includes('*') ? [[entry, target] as const] : [],
    );

/** SPEC-rich-text/AC-001, AC-004 and AC-058: the manifest, its entries and its peers. */
export const checkManifest = (pkg: PackageJson): string[] => {
    const violations: string[] = [];
    if (pkg.name !== '@frontify/fondue-rich-text-editor') {
        violations.push(`name is ${pkg.name}, not @frontify/fondue-rich-text-editor`);
    }
    if (pkg.type !== 'module') {
        violations.push('type is not "module"');
    }
    if (pkg.publishConfig?.access !== 'public') {
        violations.push('publishConfig.access is not "public"');
    }
    for (const [entry, target] of Object.entries(pkg.exports ?? {})) {
        if (!LAYOUT_ENTRIES.includes(entry)) {
            violations.push(`exports ${entry} is not in the Package layout table`);
        } else if (entry === STYLES && target !== './dist/style.css') {
            violations.push(`exports ${STYLES} does not map straight to ./dist/style.css`);
        } else if (entry !== STYLES && !isScriptTarget(target)) {
            violations.push(`exports ${entry} does not have exactly the types and import conditions`);
        }
    }
    const [major = 0] = (pkg.version ?? '0.0.0').split('.').map(Number);
    if (major >= 1) {
        for (const entry of LAYOUT_ENTRIES.filter((name) => pkg.exports?.[name] === undefined)) {
            violations.push(`version ${pkg.version} lacks the Package layout entry ${entry}`);
        }
    }
    const peers = pkg.peerDependencies ?? {};
    for (const name of ['react', 'react-dom']) {
        if (peers[name] !== '^18.2.0') {
            violations.push(`peerDependencies.${name} is ${peers[name]}, not ^18.2.0`);
        }
    }
    for (const name of Object.keys(peers).filter((peer) => peer.startsWith('prosemirror-'))) {
        violations.push(`${name} is a peer dependency`);
    }
    for (const name of WORKSPACE_PEERS) {
        if (peers[name] !== 'workspace:^' || pkg.devDependencies?.[name] !== 'workspace:^') {
            violations.push(`${name} is not a workspace:^ peer and dev dependency`);
        }
    }
    return violations;
};

/** SPEC-rich-text/AC-001 and AC-002: each entry is built with an export, as ES modules with no bundled dependency. */
export const checkDist = async (root: string, pkg: PackageJson): Promise<string[]> => {
    const violations: string[] = [];
    for (const [entry, target] of scriptEntries(pkg)) {
        const missing = [target.types, target.import].filter((path) => !existsSync(join(root, path)));
        if (missing.length > 0) {
            violations.push(`exports ${entry} points at missing ${missing.join(', ')}`);
            continue;
        }
        const module = (await import(pathToFileURL(join(root, target.import)).href)) as Record<string, unknown>;
        if (Object.keys(module).length === 0) {
            violations.push(`exports ${entry} has no export`);
        }
    }
    if (typeof pkg.exports?.[STYLES] === 'string' && !existsSync(join(root, pkg.exports[STYLES]))) {
        violations.push(`exports ${STYLES} points at missing ${pkg.exports[STYLES]}`);
    }
    for await (const file of glob('**/*', { cwd: join(root, 'dist') })) {
        if (file.split('/').includes('node_modules')) {
            violations.push(`dist/${file} is a bundled dependency`);
        }
        if (/\.(cjs|umd\.js)$/.test(file)) {
            violations.push(`dist/${file} is not an ES module`);
            continue;
        }
        if (
            file.endsWith('.js') &&
            /\bmodule\.exports\b|\bexports\.\w+\s*=|\bdefine\.amd\b/.test(
                readFileSync(join(root, 'dist', file), 'utf8'),
            )
        ) {
            violations.push(`dist/${file} holds CommonJS or UMD code`);
        }
        if (file.endsWith('.map')) {
            const { sources = [] } = JSON.parse(readFileSync(join(root, 'dist', file), 'utf8')) as {
                sources?: string[];
            };
            for (const source of sources.filter((path) => path.includes('node_modules'))) {
                violations.push(`dist/${file} maps a bundled dependency: ${source}`);
            }
        }
    }
    return violations;
};

const run = (command: string, args: string[], cwd: string) => {
    try {
        execFileSync(command, args, { cwd, encoding: 'utf8', stdio: 'pipe' });
        return undefined;
    } catch (error) {
        const { stdout = '', stderr = '' } = error as { stdout?: string; stderr?: string };
        return `${command} ${args.join(' ')} failed:\n${stdout}${stderr}`.trim();
    }
};

/** SPEC-rich-text/AC-001: a scratch consumer installs the packed tarball, imports each entry in Node and typechecks it. */
export const checkConsumer = (root: string, pkg: PackageJson): string[] => {
    const scratch = realpathSync(mkdtempSync(join(tmpdir(), 'rte-consumer-')));
    try {
        const packFailure = run('pnpm', ['pack', '--pack-destination', scratch], root);
        const tarball = readdirSync(scratch).find((file) => file.endsWith('.tgz'));
        if (packFailure !== undefined || tarball === undefined) {
            return [packFailure ?? 'pnpm pack wrote no tarball'];
        }
        writeFileSync(
            join(scratch, 'package.json'),
            JSON.stringify({ name: 'rte-consumer', private: true, type: 'module' }),
        );
        const installFailure = run(
            'npm',
            [
                'install',
                join(scratch, tarball),
                '--legacy-peer-deps',
                '--ignore-scripts',
                '--no-audit',
                '--no-fund',
                '--no-package-lock',
            ],
            scratch,
        );
        if (installFailure !== undefined) {
            return [installFailure];
        }
        const specifiers = scriptEntries(pkg).map(([entry]) => `${pkg.name}${entry.slice(1)}`);
        const violations: string[] = [];
        for (const specifier of specifiers) {
            const script = `const module = await import(${JSON.stringify(specifier)}); if (Object.keys(module).length === 0) { throw new Error('no export'); }`;
            const failure = run(process.execPath, ['--input-type=module', '--eval', script], scratch);
            if (failure !== undefined) {
                violations.push(`Node ${process.version} cannot import ${specifier}: ${failure}`);
            }
        }
        writeFileSync(
            join(scratch, 'index.ts'),
            `${specifiers.map((specifier, index) => `import * as entry${index} from ${JSON.stringify(specifier)};`).join('\n')}\nexport const entries = [${specifiers.map((_, index) => `entry${index}`).join(', ')}];\n`,
        );
        for (const [module, moduleResolution] of [
            ['nodenext', 'nodenext'],
            ['esnext', 'bundler'],
        ] as const) {
            const config = `tsconfig.${moduleResolution}.json`;
            const compilerOptions = {
                module,
                moduleResolution,
                strict: true,
                noEmit: true,
                skipLibCheck: false,
                lib: ['ES2022', 'DOM'],
                types: [],
            };
            writeFileSync(join(scratch, config), JSON.stringify({ compilerOptions, files: ['index.ts'] }));
            const failure = run(join(root, 'node_modules/.bin/tsgo'), ['-p', config], scratch);
            if (failure !== undefined) {
                violations.push(`the entries do not typecheck under moduleResolution ${moduleResolution}: ${failure}`);
            }
        }
        return violations;
    } finally {
        rmSync(scratch, { recursive: true, force: true });
    }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = fileURLToPath(new URL('..', import.meta.url));
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as PackageJson;
    const violations = [...checkManifest(pkg), ...(await checkDist(root, pkg))];
    if (violations.length === 0) {
        violations.push(...checkConsumer(root, pkg));
    }
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    const entries = Object.keys(pkg.exports ?? {}).join(', ');
    console.log(
        `check-exports: ${entries} match the Package layout, import under Node ${process.version} and typecheck under nodenext and bundler.`,
    );
}
