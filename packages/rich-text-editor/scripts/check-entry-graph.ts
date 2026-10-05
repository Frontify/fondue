/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build, type Plugin } from 'vite';

type Rule = { readonly packages: RegExp; readonly folders: readonly string[] };
type Node = { readonly id: string; readonly parent: Node | undefined };

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

/** The `dependencies` of an installed package, or none when it is not installed. */
const dependenciesOf = (root: string, name: string): string[] => {
    const require = createRequire(join(root, 'package.json'));
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
            return [];
        }
    }
    if (manifest === undefined) {
        return [];
    }
    const { dependencies } = JSON.parse(readFileSync(manifest, 'utf8')) as { dependencies?: Record<string, string> };
    return Object.keys(dependencies ?? {});
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
        const queue: Node[] = [{ id: join(root, source), parent: undefined }];
        const seen = new Set<string>();
        for (let node = queue.shift(); node !== undefined; node = queue.shift()) {
            const { id } = node;
            if (seen.has(id)) {
                continue;
            }
            seen.add(id);
            for (const rule of RULES[entry] ?? []) {
                if (violates(root, rule, id)) {
                    violations.push(`${entry} reaches ${id}: ${chainOf(root, node)}`);
                }
            }
            const next = isBare(id) ? dependenciesOf(root, packageName(id)) : (graph.get(id) ?? []);
            queue.push(...next.map((child) => ({ id: child, parent: node })));
        }
    }
    return [...new Set(violations)];
};

/** Maps each script entry of the `exports` map to its source module. */
export const entrySources = (root: string): Record<string, string> => {
    const { exports } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
        exports: Record<string, string | { readonly import?: string }>;
    };
    return Object.fromEntries(
        Object.entries(exports).flatMap(([entry, target]) => {
            if (typeof target === 'string' || target.import === undefined) {
                return [];
            }
            const base = target.import.replace(/^\.\/dist\//, 'src/').replace(/\.js$/, '');
            const source = [`${base}.ts`, `${base}.tsx`].find((path) => existsSync(join(root, path)));
            return source === undefined ? [] : [[entry, source]];
        }),
    );
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = fileURLToPath(new URL('..', import.meta.url));
    const entries = entrySources(root);
    const violations = await checkEntryGraph(root, entries);
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    const checked = Object.keys(entries).filter((entry) => RULES[entry] !== undefined);
    console.log(
        `check-entry-graph: checked ${checked.join(', ') || 'no entry'}; none reaches an engine, editor layer or live DOM module.`,
    );
}
