/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { copyFileSync, cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import postcss from 'postcss';
import ts from 'typescript';
import { build, type Rollup } from 'vite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { insideAtRule, literalColorsIn } from './css';

const packageRoot = fileURLToPath(new URL('../..', import.meta.url)).replace(/\/$/, '');

const STYLE_FILE = /\.(css|scss|sass|less|styl)(\?|$)/;

const LAYOUT_ENTRIES = new Set([
    '.',
    './model',
    './features',
    './reader',
    './authoring',
    './codecs',
    './html',
    './testing',
    './styles',
]);

const EXPORTED_NOW = [
    '.',
    './authoring',
    './codecs',
    './features',
    './html',
    './locales/*',
    './model',
    './reader',
    './styles',
    './testing',
];

const PROSEMIRROR_FLOORS: Record<string, string> = {
    'prosemirror-commands': '1.7.2',
    'prosemirror-dropcursor': '1.8.4',
    'prosemirror-gapcursor': '1.4.1',
    'prosemirror-history': '1.5.1',
    'prosemirror-inputrules': '1.5.1',
    'prosemirror-keymap': '1.2.3',
    'prosemirror-model': '1.25.12',
    'prosemirror-schema-list': '1.5.1',
    'prosemirror-state': '1.4.4',
    'prosemirror-tables': '1.8.5',
    'prosemirror-transform': '1.12.2',
    'prosemirror-view': '1.42.6',
};

type ExportTarget = { types?: string; import?: string; require?: string };

type Manifest = {
    name?: string;
    type?: string;
    sideEffects?: boolean | string[];
    publishConfig?: { access?: string };
    exports?: Record<string, string | ExportTarget>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
};

const manifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')) as Manifest;

const slash = (value: string): string => value.split(sep).join('/');

const isLayoutEntry = (entry: string): boolean => LAYOUT_ENTRIES.has(entry) || /^\.\/locales\/[^/]+$/.test(entry);

const listFiles = (root: string, dir = root): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            return entry.name === '__tests__' ? [] : listFiles(root, full);
        }
        return [slash(relative(root, full))];
    });

const packageNameOf = (specifier: string): string =>
    specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : (specifier.split('/')[0] ?? specifier);

const LOCALES = readdirSync(join(packageRoot, 'src/locales'))
    .filter((name) => /^[a-z]{2}-[A-Z]{2}\.ts$/.test(name))
    .map((name) => name.slice(0, -3));

/** The built files a published path names: one per source locale for the `./locales/*` pattern. */
const filesOf = (path: string): string[] => {
    if (!path.includes('*')) {
        return [path];
    }
    return LOCALES.map((locale) => path.replace('*', locale));
};

/** Every literal colour in the declaration values of `css`, outside a `var()` fallback and, for system colours, forced colours. */
const literalColorsOf = (css: string): string[] => {
    const colors: string[] = [];
    postcss.parse(css).walkDecls((declaration) => {
        colors.push(...literalColorsIn(declaration.value, insideAtRule(declaration, /forced-colors/)));
    });
    return colors;
};

const outDir = mkdtempSync(join(tmpdir(), 'fondue-rte-'));
let builtFiles: string[] = [];

describe('package manifest and built output', () => {
    beforeAll(async () => {
        await build({
            build: { emptyOutDir: true, outDir },
            configFile: join(packageRoot, 'vite.config.ts'),
            logLevel: 'warn',
            mode: 'production',
        });
        builtFiles = listFiles(outDir);
    }, 180_000);

    afterAll(() => rmSync(outDir, { recursive: true, force: true }));

    it('declares the package name, an ES module type, public publish access, and the entries that export code', () => {
        expect(manifest.name).toBe('@frontify/fondue-rich-text-editor');
        expect(manifest.type).toBe('module');
        expect(manifest.publishConfig?.access).toBe('public');
        const exportsMap = manifest.exports ?? {};
        const entries = Object.keys(exportsMap).sort();
        expect(entries.filter((entry) => !isLayoutEntry(entry))).toEqual([]);
        expect(entries).toEqual([...EXPORTED_NOW].sort());
        const built = new Set(builtFiles);
        for (const entry of entries) {
            const value = exportsMap[entry];
            if (entry === './styles') {
                expect(value).toBe('./dist/style.css');
                expect(built.has('style.css')).toBe(true);
                continue;
            }
            const target: ExportTarget = typeof value === 'object' && value !== null ? value : {};
            expect(typeof value).toBe('object');
            expect(target.require).toBeUndefined();
            for (const published of [target.types, target.import]) {
                const path = published ?? '';
                expect(path.startsWith('./dist/') && !path.includes('..')).toBe(true);
                for (const file of filesOf(path.slice('./dist/'.length))) {
                    expect(built.has(file)).toBe(true);
                    expect(readFileSync(join(outDir, file), 'utf8')).toMatch(/\bexport\b/);
                }
            }
        }
    });

    it('builds each shipped locale as its own module with its named export', () => {
        expect(LOCALES).toContain('en-US');
        for (const locale of LOCALES) {
            const name = locale.replace('-', '');
            for (const file of [`locales/${locale}.js`, `locales/${locale}.d.ts`]) {
                expect(readFileSync(join(outDir, file), 'utf8')).toMatch(new RegExp(`\\bexport\\b[^;]*\\b${name}\\b`));
            }
        }
    });

    it('emits ES modules that follow the source tree and leaves dependency JavaScript external', () => {
        const dependencies = manifest.dependencies ?? {};
        const peerDependencies = manifest.peerDependencies ?? {};
        const declared = new Set([...Object.keys(dependencies), ...Object.keys(peerDependencies)]);
        const jsFiles = builtFiles.filter((file) => file.endsWith('.js')).sort();
        const sourceModules = new Set([
            ...listFiles(join(packageRoot, 'src'))
                .filter((file) => /\.(tsx?|json|scss)$/.test(file) && !file.endsWith('.d.ts'))
                .map((file) =>
                    file
                        .replace(/\.tsx?$/, '.js')
                        .replace(/\.json$/, '.json.js')
                        .replace(/\.scss$/, '.scss.js'),
                ),
            'package.json.js',
        ]);
        expect(builtFiles.some((file) => file.endsWith('.cjs'))).toBe(false);
        expect(jsFiles.filter((file) => !sourceModules.has(file))).toEqual([]);
        const emitted = new Set(builtFiles);
        const bare: string[] = [];
        for (const file of jsFiles) {
            const code = readFileSync(join(outDir, file), 'utf8');
            expect(code).toMatch(/\b(?:import|export)\b/);
            expect(code).not.toMatch(/\brequire\s*\(|module\.exports/);
            for (const match of code.matchAll(/(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g)) {
                const specifier = match[1] ?? '';
                const filePart = specifier.split('?')[0] ?? specifier;
                if (specifier.startsWith('.')) {
                    expect(emitted.has(slash(relative(outDir, join(outDir, dirname(file), filePart))))).toBe(true);
                } else {
                    bare.push(specifier);
                }
            }
        }
        expect(
            bare.filter((specifier) => !declared.has(packageNameOf(specifier)) || STYLE_FILE.test(specifier)),
        ).toEqual([]);
    });

    it('keeps React out of dependencies, holds a React peer at ^18.2.0, and never peers ProseMirror', () => {
        const dependencies = manifest.dependencies ?? {};
        const peers = manifest.peerDependencies ?? {};
        expect(dependencies.react).toBeUndefined();
        expect(dependencies['react-dom']).toBeUndefined();
        expect(peers.react ?? '^18.2.0').toBe('^18.2.0');
        expect(peers['react-dom'] ?? '^18.2.0').toBe('^18.2.0');
        expect(Object.keys(peers).filter((name) => name.startsWith('prosemirror-'))).toEqual([]);
    });

    it('holds the Fondue packages as workspace:^ peer dependencies and dev dependencies', () => {
        for (const name of ['@frontify/fondue-components', '@frontify/fondue-icons', '@frontify/fondue-tokens']) {
            expect(manifest.peerDependencies?.[name]).toBe('workspace:^');
            expect(manifest.devDependencies?.[name]).toBe('workspace:^');
        }
    });

    it('gives each ProseMirror dependency a caret range that meets its floor', () => {
        for (const [name, range] of Object.entries(manifest.dependencies ?? {})) {
            if (!name.startsWith('prosemirror-')) {
                continue;
            }
            const match = /^\^(\d+\.\d+\.\d+)$/.exec(range);
            const captured = match?.[1];
            const lower = captured ?? '';
            const floor = PROSEMIRROR_FLOORS[name] ?? '';
            expect(lower).toMatch(/^\d+\.\d+\.\d+$/);
            expect(floor !== '' && lower.localeCompare(floor, undefined, { numeric: true }) >= 0).toBe(true);
        }
    });

    // ProseMirror, Slate and Plate stay out of every headless entry. The reader and codecs also stay off a live DOM root.
    const ENGINE_PACKAGES = /^(?:prosemirror-[\w-]+|slate|slate-[\w-]+|platejs|@platejs\/.+|@udecode\/.+)$/;
    const DOM_PACKAGES = /^(?:prosemirror-[\w-]+|react-dom\/client)$/;
    // `./html` runs on a server with a DOM implementation, so it keeps `prosemirror-model` and `prosemirror-transform` but no other ProseMirror package or React.
    const HTML_FORBIDDEN = /^(?:prosemirror-(?!(?:model|transform)$)[\w-]+|react|react-dom)$/;
    const HEADLESS_FORBIDDEN: Record<string, readonly RegExp[]> = {
        './model': [ENGINE_PACKAGES],
        './features': [ENGINE_PACKAGES],
        './reader': [ENGINE_PACKAGES, DOM_PACKAGES],
        './codecs': [ENGINE_PACKAGES, DOM_PACKAGES],
        './html': [HTML_FORBIDDEN],
    };
    // `./reader` is built from the module that wires the shipped feature readers, outside `reader/` and `features/`.
    const HEADLESS_FILES: Record<string, string> = { './reader': 'entries/reader.js' };
    const EDITOR_FILES = /^(?:runtime|bridge|react|ui)\//;

    const bareName = (id: string): string =>
        id
            .split('/')
            .slice(0, id.startsWith('@') ? 2 : 1)
            .join('/');

    const reachedImports = (entryFile: string) => {
        const seen = new Set<string>();
        const bare: string[] = [];
        const queue = [entryFile];
        for (let file = queue.pop(); file !== undefined; file = queue.pop()) {
            if (seen.has(file)) {
                continue;
            }
            seen.add(file);
            const code = readFileSync(join(outDir, file), 'utf8');
            for (const match of code.matchAll(/(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g)) {
                const specifier = match[1] ?? '';
                const filePart = specifier.split('?')[0] ?? specifier;
                if (specifier.startsWith('.')) {
                    queue.push(slash(relative(outDir, join(outDir, dirname(file), filePart))));
                } else if (specifier !== '') {
                    bare.push(specifier);
                }
            }
        }
        return { bare, files: [...seen] };
    };

    it('keeps engine packages, a live DOM root and the editor folders out of the headless entries', () => {
        for (const [entry, rules] of Object.entries(HEADLESS_FORBIDDEN)) {
            const { bare, files } = reachedImports(HEADLESS_FILES[entry] ?? `${entry.slice('./'.length)}/index.js`);
            const forbidden = bare.filter((specifier) =>
                rules.some((rule) => rule.test(specifier) || rule.test(bareName(specifier))),
            );
            expect(forbidden).toEqual([]);
            expect(files.filter((file) => EDITOR_FILES.test(file))).toEqual([]);
        }
    });

    it('lets the editor entry load the engine', () => {
        const { bare } = reachedImports('index.js');
        expect(bare.some((specifier) => ENGINE_PACKAGES.test(bareName(specifier)))).toBe(true);
    });

    // A host without the optional `axe-core` peer must still load `./testing` for its other helpers.
    it('loads axe-core in ./testing only through a dynamic import', () => {
        const { files } = reachedImports('testing/index.js');
        const sources = files.map((file) => ({ file, code: readFileSync(join(outDir, file), 'utf8') }));
        const isStatic = /(?:\bfrom|\bimport)\s*['"]axe-core['"]/;
        expect(sources.filter(({ code }) => isStatic.test(code)).map(({ file }) => file)).toEqual([]);
        expect(sources.some(({ code }) => /\bimport\s*\(\s*['"]axe-core['"]\s*\)/.test(code))).toBe(true);
    });

    it('lists the stylesheet alone as having side effects', () => {
        expect(manifest.sideEffects).toEqual(['./dist/style.css']);
    });

    /** Each `any` and each `prosemirror-*` import in the declaration files that the published `types` reach. */
    const publicTypeFaults = (): string[] => {
        const faults: string[] = [];
        const seen = new Set<string>();
        const queue = Object.values(manifest.exports ?? {}).flatMap((value) => {
            if (typeof value !== 'object') {
                return [];
            }
            return filesOf((value.types ?? '').slice('./dist/'.length));
        });
        for (let file = queue.pop(); file !== undefined; file = queue.pop()) {
            if (seen.has(file)) {
                continue;
            }
            seen.add(file);
            const source = ts.createSourceFile(
                file,
                readFileSync(join(outDir, file), 'utf8'),
                ts.ScriptTarget.Latest,
                true,
            );
            const follow = (specifier: string) => {
                if (specifier.startsWith('prosemirror-')) {
                    faults.push(`${file} imports ${specifier}`);
                } else if (specifier.startsWith('.')) {
                    const base = slash(join(dirname(file), specifier.replace(/\.js$/, '')));
                    const found = [`${base}.d.ts`, `${base}/index.d.ts`].find((path) => builtFiles.includes(path));
                    queue.push(found ?? `${base}.d.ts`);
                }
            };
            const visit = (node: ts.Node) => {
                if (node.kind === ts.SyntaxKind.AnyKeyword) {
                    faults.push(`${file} has any: ${node.parent.getText(source)}`);
                }
                if (
                    (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
                    node.moduleSpecifier !== undefined &&
                    ts.isStringLiteral(node.moduleSpecifier)
                ) {
                    follow(node.moduleSpecifier.text);
                }
                if (
                    ts.isImportTypeNode(node) &&
                    ts.isLiteralTypeNode(node.argument) &&
                    ts.isStringLiteral(node.argument.literal)
                ) {
                    follow(node.argument.literal.text);
                }
                ts.forEachChild(node, visit);
            };
            visit(source);
        }
        return faults;
    };

    it('holds no any and no prosemirror import in the declaration files of any entry', () => {
        expect(publicTypeFaults()).toEqual([]);
    });

    // React AC-052: every colour of the built stylesheet comes from a token variable.
    it('holds no literal colour in the built stylesheet outside a var() fallback', () => {
        expect(literalColorsOf(readFileSync(join(outDir, 'style.css'), 'utf8'))).toEqual([]);
    });

    /** A consumer app that imports `entry` from the built package, as a bundler resolves it from `node_modules`. */
    const buildApp = async (entry: string) => {
        const app = mkdtempSync(join(tmpdir(), 'fondue-rte-app-'));
        try {
            const installed = join(app, 'node_modules', '@frontify', 'fondue-rich-text-editor');
            mkdirSync(installed, { recursive: true });
            copyFileSync(join(packageRoot, 'package.json'), join(installed, 'package.json'));
            cpSync(outDir, join(installed, 'dist'), { recursive: true });
            const main = join(app, 'main.js');
            copyFileSync(join(packageRoot, 'src', '__tests__', 'fixtures', 'apps', entry), main);
            const result = await build({
                configFile: false,
                root: app,
                logLevel: 'silent',
                build: {
                    write: false,
                    minify: false,
                    rollupOptions: {
                        input: main,
                        // Other packages are the host's own, so only the editor package is bundled.
                        external: (id) =>
                            !id.startsWith('.') &&
                            !id.startsWith('/') &&
                            !id.startsWith('@frontify/fondue-rich-text-editor'),
                    },
                },
            });
            const files = ((Array.isArray(result) ? result : [result]) as Rollup.RollupOutput[]).flatMap(
                ({ output }) => output,
            );
            return {
                modules: files.flatMap((file) => (file.type === 'chunk' ? Object.keys(file.modules) : [])),
                stylesheets: files.filter(
                    (file): file is Rollup.OutputAsset => file.type === 'asset' && file.fileName.endsWith('.css'),
                ),
            };
        } finally {
            rmSync(app, { recursive: true, force: true });
        }
    };

    it('drops the editor modules and every locale but en-US from an app that imports only ./reader', async () => {
        const { modules } = await buildApp('reader-only.js');
        const bundled = modules.map((id) => slash(id.split('/dist/')[1] ?? id));

        expect(bundled.some((id) => id.startsWith('reader/'))).toBe(true);
        expect(bundled.filter((id) => /^(?:react|runtime|bridge|clipboard|persistence|ui)\//.test(id))).toEqual([]);
        expect(bundled.filter((id) => id.startsWith('locales/') && id !== 'locales/en-US.js')).toEqual([]);
    }, 120_000);

    it('keeps dist/style.css in the output of an app that imports ./styles', async () => {
        const { stylesheets } = await buildApp('styles-only.js');

        expect(stylesheets).toHaveLength(1);
        expect(String(stylesheets[0]?.source).length).toBeGreaterThan(0);
    }, 120_000);
});
