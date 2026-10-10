/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build } from 'vite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const packageRoot = fileURLToPath(new URL('../..', import.meta.url)).replace(/\/$/, '');

const STYLE_FILE = /\.(css|scss|sass|less|styl)(\?|$)/;

const LAYOUT_ENTRIES = new Set([
    '.',
    './model',
    './features',
    './reader',
    './codecs',
    './html',
    './testing',
    './styles',
]);

const EXPORTED_NOW = ['./model', './testing'];

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
    publishConfig?: { access?: string };
    exports?: Record<string, string | ExportTarget>;
    dependencies?: Record<string, string>;
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
                const file = path.slice('./dist/'.length);
                expect(built.has(file)).toBe(true);
                expect(readFileSync(join(outDir, file), 'utf8')).toMatch(/\bexport\b/);
            }
        }
    });

    it('emits ES modules that follow the source tree and leaves dependency JavaScript external', () => {
        const declared = new Set([
            ...Object.keys(manifest.dependencies ?? {}),
            ...Object.keys(manifest.peerDependencies ?? {}),
        ]);
        const jsFiles = builtFiles.filter((file) => file.endsWith('.js')).sort();
        const sourceModules = new Set(
            listFiles(join(packageRoot, 'src'))
                .filter((file) => /\.tsx?$/.test(file) && !file.endsWith('.d.ts'))
                .map((file) => file.replace(/\.tsx?$/, '.js')),
        );
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

    it('keeps React out of dependencies, peers it at ^18.2.0, and never peers ProseMirror', () => {
        const dependencies = manifest.dependencies ?? {};
        const peers = manifest.peerDependencies ?? {};
        expect(dependencies.react).toBeUndefined();
        expect(dependencies['react-dom']).toBeUndefined();
        expect(peers.react ?? '^18.2.0').toBe('^18.2.0');
        expect(peers['react-dom'] ?? '^18.2.0').toBe('^18.2.0');
        expect(Object.keys(peers).filter((name) => name.startsWith('prosemirror-'))).toEqual([]);
    });

    it('gives each ProseMirror dependency a caret range that meets its floor', () => {
        for (const [name, range] of Object.entries(manifest.dependencies ?? {})) {
            if (!name.startsWith('prosemirror-')) {
                continue;
            }
            const lower = /^\^(\d+\.\d+\.\d+)$/.exec(range)?.[1] ?? '';
            const floor = PROSEMIRROR_FLOORS[name] ?? '';
            expect(lower).toMatch(/^\d+\.\d+\.\d+$/);
            expect(floor !== '' && lower.localeCompare(floor, undefined, { numeric: true }) >= 0).toBe(true);
        }
    });
});
