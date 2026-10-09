/* (c) Copyright Frontify Ltd., all rights reserved. */

import { execFileSync } from 'node:child_process';
import {
    existsSync,
    mkdirSync,
    mkdtempSync,
    readdirSync,
    readFileSync,
    realpathSync,
    rmSync,
    statSync,
    writeFileSync,
} from 'node:fs';
import { glob } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export type PackageJson = {
    readonly name?: string;
    readonly version?: string;
    readonly type?: string;
    readonly publishConfig?: { readonly access?: string };
    readonly exports?: Record<string, unknown>;
    readonly dependencies?: Record<string, string>;
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
const TOKENS = '@frontify/fondue-tokens';
// SPEC-rich-text.conventions.md, ProseMirror lines: the floor of each caret range.
export const PROSEMIRROR_FLOORS: Record<string, string> = {
    'prosemirror-model': '1.25.12',
    'prosemirror-state': '1.4.4',
    'prosemirror-transform': '1.12.2',
    'prosemirror-commands': '1.7.2',
    'prosemirror-keymap': '1.2.3',
    'prosemirror-inputrules': '1.5.1',
    'prosemirror-history': '1.5.1',
    'prosemirror-schema-list': '1.5.1',
    'prosemirror-view': '1.42.6',
    'prosemirror-tables': '1.8.5',
    'prosemirror-dropcursor': '1.8.4',
    'prosemirror-gapcursor': '1.4.1',
};
// One resolved copy of each in the scratch consumer (SPEC-rich-text/AC-005, AC-058).
const SINGLE_COPY = ['prosemirror-model', 'prosemirror-view', ...WORKSPACE_PEERS];

const versionParts = (version: string) => version.split('.').map(Number);
const compareVersions = (a: string, b: string) => {
    const [left, right] = [versionParts(a), versionParts(b)];
    const index = left.findIndex((part, position) => part !== right[position]);
    return index === -1 ? 0 : (left[index] ?? 0) - (right[index] ?? 0);
};

/** SPEC-rich-text/AC-005: each `prosemirror-*` dependency is a caret range from its floor that holds the lockfile version. */
export const checkProseMirrorRanges = (pkg: PackageJson, lockfile: string): string[] => {
    const importer = /\n {2}packages\/rich-text-editor:\n([\s\S]*?)(?=\n {2}\S|\npackages:)/.exec(lockfile)?.[1] ?? '';
    const violations: string[] = [];
    for (const [name, range] of Object.entries(pkg.dependencies ?? {}).filter(([dep]) =>
        dep.startsWith('prosemirror-'),
    )) {
        const floor = PROSEMIRROR_FLOORS[name];
        const lower = /^\^(\d+\.\d+\.\d+)$/.exec(range)?.[1];
        const locked = new RegExp(`\\n {6}${name}:\\n {8}specifier: [^\\n]+\\n {8}version: (\\d+\\.\\d+\\.\\d+)`).exec(
            importer,
        )?.[1];
        if (floor === undefined || lower === undefined) {
            violations.push(`${name} ${range} is not a caret range of a package with a floor in the conventions`);
        } else if (compareVersions(lower, floor) < 0) {
            violations.push(`${name} ${range} starts below its floor ${floor}`);
        } else if (
            locked === undefined ||
            compareVersions(locked, lower) < 0 ||
            versionParts(locked)[0] !== versionParts(lower)[0]
        ) {
            violations.push(`${name} ${range} does not hold the lockfile version ${locked ?? 'none'}`);
        }
    }
    return violations;
};

// The range `pnpm pack` writes for `workspace:^`; the npm `latest` tag can be a prerelease outside it.
const peerSpec = (root: string, name: string) => {
    const { version } = JSON.parse(
        readFileSync(join(root, 'node_modules', name, 'package.json'), 'utf8'),
    ) as PackageJson;
    return `${name}@^${version}`;
};

/** A workspace peer packed from its own build, as it releases with the editor. */
const packWorkspacePeer = (root: string, name: string, scratch: string) => {
    const destination = join(scratch, 'peers', name.replace('/', '-'));
    mkdirSync(destination, { recursive: true });
    execFileSync('pnpm', ['pack', '--pack-destination', destination], {
        cwd: realpathSync(join(root, 'node_modules', name)),
        stdio: 'pipe',
    });
    const tarball = readdirSync(destination).find((file) => file.endsWith('.tgz'));
    if (tarball === undefined) {
        throw new Error(`pnpm pack wrote no tarball for ${name}`);
    }
    return join(destination, tarball);
};

/** What the consumer installs for a workspace peer: its workspace build, except tokens. */
const peerSource = (root: string, name: string, scratch: string) => {
    // The tokens build needs a Figma token CI does not have, and its published version equals the workspace one.
    if (name === TOKENS) {
        return peerSpec(root, name);
    }
    return packWorkspacePeer(root, name, scratch);
};

/** SPEC-rich-text/AC-005 and AC-058: in a pnpm host that also installs the Fondue peers, `pnpm why` finds one version of each. */
const checkSingleCopies = (root: string, scratch: string, tarball: string): string[] => {
    const consumer = join(scratch, 'pnpm-consumer');
    mkdirSync(consumer);
    writeFileSync(join(consumer, 'package.json'), JSON.stringify({ name: 'rte-pnpm-consumer', private: true }));
    const flags = ['--ignore-scripts', '--config.auto-install-peers=false', '--ignore-workspace'];
    const args = ['add', tarball, ...WORKSPACE_PEERS.map((name) => peerSource(root, name, scratch)), ...flags];
    const installFailure = run('pnpm', args, consumer);
    if (installFailure !== undefined) {
        return [installFailure];
    }
    return SINGLE_COPY.flatMap((name) => {
        const output = execFileSync('pnpm', ['why', name, '--json'], { cwd: consumer, encoding: 'utf8' });
        const versions = new Set((JSON.parse(output || '[]') as { version: string }[]).map(({ version }) => version));
        return versions.size === 1 ? [] : [`pnpm why ${name} resolves ${[...versions].join(', ') || 'no version'}`];
    });
};

const isScriptTarget = (target: unknown): target is { types: string; import: string } =>
    typeof target === 'object' &&
    target !== null &&
    Object.keys(target).join() === 'types,import' &&
    Object.values(target).every((value) => typeof value === 'string');

type ScriptTarget = { readonly types: string; readonly import: string };

const scriptEntries = (pkg: PackageJson) =>
    Object.entries(pkg.exports ?? {}).flatMap(([entry, target]) =>
        isScriptTarget(target) && !entry.includes('*') ? [[entry, target] as const] : [],
    );

/** Expands each `*` entry against the built files; `unmatched` lists the patterns that match none. */
const expandWildcards = (root: string, pkg: PackageJson) => {
    const entries: (readonly [string, ScriptTarget])[] = [];
    const unmatched: string[] = [];
    for (const [entry, target] of Object.entries(pkg.exports ?? {})) {
        if (!isScriptTarget(target) || !entry.includes('*')) {
            continue;
        }
        const [head = '', tail = ''] = target.import.split('*');
        const directory = join(root, head.slice(0, head.lastIndexOf('/') + 1));
        const files =
            target.import.includes('*') && existsSync(directory)
                ? readdirSync(directory, { recursive: true, encoding: 'utf8' })
                : [];
        const matches = files
            .map((file) => `./${relative(root, join(directory, file))}`)
            .filter((path) => path.length > head.length + tail.length && path.startsWith(head) && path.endsWith(tail))
            .filter((path) => statSync(join(root, path)).isFile())
            .map((path) => path.slice(head.length, path.length - tail.length));
        if (matches.length === 0) {
            unmatched.push(entry);
        }
        for (const star of matches.sort()) {
            entries.push([
                entry.replace('*', star),
                { types: target.types.replace('*', star), import: target.import.replace('*', star) },
            ]);
        }
    }
    return { entries, unmatched };
};

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
    const wildcards = expandWildcards(root, pkg);
    for (const entry of wildcards.unmatched) {
        violations.push(`exports ${entry} matches no built file`);
    }
    for (const [entry, target] of [...scriptEntries(pkg), ...wildcards.entries]) {
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

/**
 * What a host installs next to the package besides the Fondue workspace peers, so an entry that imports a peer loads
 * and typechecks in the scratch consumer: each other peer at its range, and the React types the declarations import.
 */
export const consumerDependencies = (pkg: PackageJson): string[] => {
    const peers = Object.entries(pkg.peerDependencies ?? {})
        .filter(([, range]) => !range.startsWith('workspace:'))
        .map(([name, range]) => `${name}@${range}`);
    return [...peers, `@types/react@${pkg.devDependencies?.['@types/react'] ?? 'latest'}`];
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
                ...consumerDependencies(pkg),
                ...WORKSPACE_PEERS.map((name) => peerSource(root, name, scratch)),
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
        // Each wildcard match is imported and typechecked, not one representative.
        const specifiers = [...scriptEntries(pkg), ...expandWildcards(root, pkg).entries].map(
            ([entry]) => `${pkg.name}${entry.slice(1)}`,
        );
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
        violations.push(...checkSingleCopies(root, scratch, join(scratch, tarball)));
        return violations;
    } finally {
        rmSync(scratch, { recursive: true, force: true });
    }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = fileURLToPath(new URL('..', import.meta.url));
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as PackageJson;
    const lockfile = readFileSync(join(root, '../../pnpm-lock.yaml'), 'utf8');
    const violations = [
        ...checkManifest(pkg),
        ...checkProseMirrorRanges(pkg, lockfile),
        ...(await checkDist(root, pkg)),
    ];
    if (violations.length === 0) {
        violations.push(...checkConsumer(root, pkg));
    }
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    const entries = Object.keys(pkg.exports ?? {}).join(', ');
    console.log(
        `check-exports: ${entries} match the Package layout, import under Node ${process.version} and typecheck under nodenext and bundler; the prosemirror-* ranges start at their floors and pnpm why finds one copy of ${SINGLE_COPY.join(', ')}.`,
    );
}
