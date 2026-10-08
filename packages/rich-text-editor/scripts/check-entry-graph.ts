/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build, type Plugin } from 'vite';

type Rule = { readonly packages: RegExp; readonly folders: readonly string[] };
/** `from` is the folder whose `node_modules` resolves `id` when it is a package. */
type Node = { readonly id: string; readonly parent: Node | undefined; readonly from: string };

const ENGINE_FREE: Rule = {
    // ProseMirror, Slate and Plate (SPEC-rich-text/AC-012).
    packages: /^(prosemirror-[\w-]+|slate|slate-[\w-]+|platejs|@platejs\/.+|@udecode\/.+)$/,
    folders: ['runtime', 'bridge', 'react', 'ui'],
};
// The reader and codecs read no live DOM, so they never load a React DOM root (SPEC-rich-text-output/AC-027).
const DOM_FREE: Rule = { packages: /^(prosemirror-[\w-]+|react-dom\/client)$/, folders: [] };

export const RULES: Record<string, readonly Rule[]> = {
    './model': [ENGINE_FREE],
    './features': [ENGINE_FREE],
    './reader': [ENGINE_FREE, DOM_FREE],
    './codecs': [ENGINE_FREE, DOM_FREE],
};

const isBare = (id: string) => !/^(\.|\/|#|\0|[a-zA-Z]:)/.test(id);
const packageName = (id: string) =>
    id
        .split('/')
        .slice(0, id.startsWith('@') ? 2 : 1)
        .join('/');

/** Builds `entries` with Rollup and returns each module's static and dynamic imports. */
const collectGraph = async (root: string, entries: Record<string, string>): Promise<Map<string, string[]>> => {
    const graph = new Map<string, string[]>();
    const capture: Plugin = {
        name: 'capture-module-graph',
        enforce: 'pre',
        resolveId: (source) => (isBare(source) ? { id: source, external: true } : null),
        generateBundle() {
            for (const id of this.getModuleIds()) {
                const info = this.getModuleInfo(id);
                graph.set(id, info === null ? [] : [...info.importedIds, ...info.dynamicallyImportedIds]);
            }
        },
    };
    await build({
        configFile: false,
        root,
        logLevel: 'silent',
        resolve: { alias: [{ find: /^#\//, replacement: `${join(root, 'src')}/` }] },
        plugins: [capture],
        build: { write: false, minify: false, modulePreload: false, rollupOptions: { input: entries } },
    });
    return graph;
};

/** An installed package: where it is, and the names in its `dependencies`. */
type Installed = { readonly directory: string; readonly dependencies: readonly string[] };

/**
 * The package `name` as `from` resolves it, or none when it is not installed. A dependency of a dependency is
 * not linked into the package root under pnpm, so each package resolves its own dependencies from its own folder.
 */
const installedPackage = (from: string, name: string): Installed | undefined => {
    const require = createRequire(join(from, 'package.json'));
    let manifest: string | undefined;
    try {
        manifest = require.resolve(`${name}/package.json`);
    } catch {
        try {
            for (
                let directory = dirname(require.resolve(name));
                directory !== dirname(directory);
                directory = dirname(directory)
            ) {
                if (existsSync(join(directory, 'package.json'))) {
                    manifest = join(directory, 'package.json');
                    break;
                }
            }
        } catch {
            return undefined;
        }
    }
    if (manifest === undefined) {
        return undefined;
    }
    const { dependencies } = JSON.parse(readFileSync(manifest, 'utf8')) as { dependencies?: Record<string, string> };
    return { directory: dirname(realpathSync(manifest)), dependencies: Object.keys(dependencies ?? {}) };
};

const chainOf = (root: string, node: Node) => {
    const ids: string[] = [];
    for (let current: Node | undefined = node; current !== undefined; current = current.parent) {
        ids.unshift(isBare(current.id) ? current.id : relative(root, current.id));
    }
    return ids.join(' -> ');
};

const violates = (root: string, rule: Rule, id: string) => {
    if (isBare(id)) {
        return rule.packages.test(id) || rule.packages.test(packageName(id));
    }
    const path = relative(join(root, 'src'), id);
    return rule.folders.some((folder) => path === folder || path.startsWith(`${folder}/`));
};

/** Walks each entry's module graph, then each external package's installed dependencies, and reports every forbidden module with its import chain. */
export const checkEntryGraph = async (root: string, entries: Record<string, string>): Promise<string[]> => {
    const checked = Object.entries(entries).filter(([entry]) => RULES[entry] !== undefined);
    if (checked.length === 0) {
        return [];
    }
    const inputs = Object.fromEntries(
        checked.map(([entry, source]) => [entry.replace(/^\.\//, ''), join(root, source)]),
    );
    const graph = await collectGraph(root, inputs);
    const violations: string[] = [];

    for (const [entry, source] of checked) {
        const queue: Node[] = [{ id: join(root, source), parent: undefined, from: root }];
        const seen = new Set<string>();
        for (let node = queue.shift(); node !== undefined; node = queue.shift()) {
            const { id, from } = node;
            let installed: Installed | undefined;
            if (isBare(id)) {
                installed = installedPackage(from, packageName(id));
            }
            // An installed copy is walked once, wherever it is imported from; two versions are two copies.
            let key = id;
            if (installed !== undefined) {
                key = installed.directory;
            }
            if (seen.has(key)) {
                continue;
            }
            seen.add(key);
            for (const rule of RULES[entry] ?? []) {
                if (violates(root, rule, id)) {
                    violations.push(`${entry} reaches ${id}: ${chainOf(root, node)}`);
                }
            }
            if (installed !== undefined) {
                const { directory, dependencies } = installed;
                queue.push(...dependencies.map((child) => ({ id: child, parent: node, from: directory })));
            } else if (!isBare(id)) {
                queue.push(...(graph.get(id) ?? []).map((child) => ({ id: child, parent: node, from: root })));
            }
        }
    }
    return [...new Set(violations)];
};

type ExportTarget = string | { readonly import?: string };

const readExports = (root: string) =>
    (JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { exports: Record<string, ExportTarget> }).exports;

/** The `src/**` module that an `exports` target builds from, or undefined when none exists. */
const sourceOf = (root: string, target: ExportTarget): string | undefined => {
    if (typeof target === 'string' || target.import === undefined) {
        return undefined;
    }
    const base = target.import.replace(/^\.\/dist\//, 'src/').replace(/\.js$/, '');
    return [`${base}.ts`, `${base}.tsx`].find((path) => existsSync(join(root, path)));
};

/** Maps each script entry of the `exports` map to its source module. */
export const entrySources = (root: string): Record<string, string> =>
    Object.fromEntries(
        Object.entries(readExports(root)).flatMap(([entry, target]) => {
            const source = sourceOf(root, target);
            return source === undefined ? [] : [[entry, source]];
        }),
    );

/** Checks every `exports` entry that has rules; an entry whose import target has no source module is a violation. */
export const checkPackageEntries = async (root: string): Promise<{ violations: string[]; checked: string[] }> => {
    const exportsMap = readExports(root);
    const ruleEntries = Object.keys(exportsMap).filter((entry) => RULES[entry] !== undefined);
    const entries = entrySources(root);
    const checked = Object.keys(entries).filter((entry) => RULES[entry] !== undefined);
    const violations = ruleEntries
        .filter((entry) => !checked.includes(entry))
        .map((entry) => `${entry} has rules but its import target maps to no src/**/*.ts(x) source`);
    violations.push(...(await checkEntryGraph(root, entries)));
    if (ruleEntries.length > 0 && checked.length === 0) {
        violations.push('no exports entry with rules was checked');
    }
    return { violations, checked };
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = fileURLToPath(new URL('..', import.meta.url));
    const { violations, checked } = await checkPackageEntries(root);
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log(
        `check-entry-graph: checked ${checked.join(', ') || 'no entry'}; none reaches an engine, editor layer or live DOM module.`,
    );
}
