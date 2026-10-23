/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { brandDocumentFeatures, commentFeatures, documentFeatures, featuresById, inlineFeatures } from '#/features';
import { registry } from '#/features/registry';
import { UNSHIPPED_FEATURES } from '#/features/stages';
import { enUS } from '#/locales/en-US';
import { CONTENT_RULE_IDS } from '#/model/checks';

const PACKAGE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const read = (path: string) => readFileSync(join(PACKAGE, path), 'utf8');
const page = (name: string) => read(`src/docs/${name}.mdx`);

const PAGES = ['reader-codecs', 'accessibility', 'observability', 'authoring', 'limitations'] as const;

/** Whether a Markdown table of `source` has a row that starts with `cell` in code, however the formatter padded it. */
const hasRow = (source: string, cell: string) =>
    new RegExp(`^\\| \`${cell.replaceAll('.', '\\.')}\`\\s+\\|`, 'm').test(source);

/** The level 2 headings of a page. */
const headingsOf = (source: string) =>
    [...source.matchAll(/^## (.+)$/gm)].map(([, heading]) => heading).filter((heading) => heading !== undefined);

/** Every file under `directory` that ends with one of `suffixes`, relative to the package root. */
const filesUnder = (directory: string, suffixes: readonly string[]): string[] =>
    readdirSync(join(PACKAGE, directory), { withFileTypes: true }).flatMap((entry) => {
        const path = `${directory}/${entry.name}`;
        if (entry.isDirectory()) {
            return filesUnder(path, suffixes);
        }
        if (suffixes.some((suffix) => entry.name.endsWith(suffix))) {
            return [path];
        }
        return [];
    });

describe('the docs pages', () => {
    it('has one MDX page for each guide, titled under Rich Text Editor/Guides (DR-104)', () => {
        for (const name of PAGES) {
            expect(existsSync(join(PACKAGE, `src/docs/${name}.mdx`)), name).toBe(true);
            expect(page(name)).toMatch(/<Meta title="Rich Text Editor\/Guides\/[^"]+" \/>/);
        }
    });
});

describe('the accessibility guide', () => {
    const source = page('accessibility');

    it('has a section for the keyboard model, the toolbar, the content checks, alternative text and language marking (SPEC-rich-text-accessibility/AC-064)', () => {
        expect(headingsOf(source)).toEqual(
            expect.arrayContaining([
                'Keyboard model',
                'Toolbar',
                'Content checks',
                'Alternative text',
                'Language marking',
            ]),
        );
    });

    it('names the toolbar shortcut and its default in the keyboard model and the toolbar (SPEC-rich-text-accessibility/AC-064)', () => {
        expect(source).toContain('Alt+F10');
        expect(source).toContain('toolbarShortcut');
        expect(source).toContain('tabMovesFocus');
    });

    it('lists every content check rule of the model in its content checks table (SPEC-rich-text-accessibility/AC-064)', () => {
        expect(CONTENT_RULE_IDS.length).toBeGreaterThan(0);
        for (const rule of CONTENT_RULE_IDS) {
            expect(hasRow(source, rule), rule).toBe(true);
        }
    });

    it('lists the locales the package ships in its language marking section (SPEC-rich-text-accessibility/AC-064)', () => {
        const shipped = readdirSync(join(PACKAGE, 'src/locales'))
            .filter((name) => /^[a-z]{2}-[A-Z]{2}\.ts$/.test(name))
            .map((name) => name.replace('.ts', ''));

        expect(shipped.length).toBeGreaterThan(0);
        for (const locale of shipped) {
            expect(source, locale).toContain(`\`${locale}\``);
        }
    });
});

describe('the reader and codecs guide', () => {
    const source = page('reader-codecs');
    const outside = source.slice(source.indexOf('## `toHTML` output outside the editor'));

    it('has the caching and outside-the-editor sections (SPEC-rich-text-output/AC-037, AC-039)', () => {
        expect(source).toContain('## Caching reader and codec output');
        expect(source).toContain('## `toHTML` output outside the editor');
    });

    it('names the stylesheet entry that the package exports (SPEC-rich-text-output/AC-039)', () => {
        const { exports } = JSON.parse(read('package.json')) as { readonly exports: Readonly<Record<string, unknown>> };

        expect(exports['./styles']).toBeDefined();
        expect(outside).toContain('@frontify/rich-text-editor/styles');
    });
});

describe('the observability guide', () => {
    const source = page('observability');
    const SECTIONS = [
        ['Import failures and unknown capabilities', 'import-failures', 'importFailures'],
        ['Renderer failures', 'renderer-failures', 'rendererFailures'],
        ['Save conflicts', 'save-conflicts', 'saveConflicts'],
        ['Latency and normalization counts', 'operation-metrics', 'operationMetrics'],
    ] as const;

    it('has one section for each row of the counter table (SPEC-rich-text-quality/AC-031)', () => {
        expect(headingsOf(source)).toEqual(expect.arrayContaining(SECTIONS.map(([heading]) => heading)));
    });

    it('shows the example module of each section, which a test runs (SPEC-rich-text-quality/AC-031)', () => {
        for (const [heading, file, name] of SECTIONS) {
            const body = source.slice(source.indexOf(`## ${heading}`)).split(/\n## /)[0] ?? '';

            expect(existsSync(join(PACKAGE, `src/docs/observability/${file}.ts`)), file).toBe(true);
            expect(body, heading).toContain(`<Source code={shown(${name})}`);
        }
    });
});

describe('the authoring guide', () => {
    const source = page('authoring');
    const excerpts = [...source.matchAll(/Source: `([^`]+)`\n\n```(\w+)\n([\s\S]*?)\n```/g)].map(
        ([, path, language, code]) => ({ path: path ?? '', language: language ?? '', code: code ?? '' }),
    );

    it('shows each excerpt as it stands in the shipped feature it names', () => {
        expect(excerpts.length).toBeGreaterThan(0);
        for (const { path, code } of excerpts) {
            const file = read(path)
                .split('\n')
                .map((line) => line.trim());
            const shown = code.split('\n').map((line) => line.trim());
            const found = file.some((_, start) => shown.every((line, offset) => file[start + offset] === line));

            expect(found, `${path}\n${code}`).toBe(true);
        }
    });

    it('takes every excerpt from a feature folder or the authoring examples of the package', () => {
        for (const { path, language } of excerpts) {
            expect(path).toMatch(/^src\/(?:features\/[a-z0-9-]+|docs\/authoring)\/[A-Za-z-]+\.tsx?$/);
            expect(language).toBe(path.endsWith('.tsx') ? 'tsx' : 'ts');
        }
    });
});

describe('the imports the guides show', () => {
    const { exports } = JSON.parse(read('package.json')) as { readonly exports: Readonly<Record<string, unknown>> };
    const PREFIX = '@frontify/rich-text-editor';

    const check = (label: string, source: string) => {
        for (const [, specifier] of source.matchAll(/from '([^']+)'/g)) {
            if (specifier === undefined || !specifier.startsWith(PREFIX)) {
                continue;
            }
            const subpath = specifier.slice(PREFIX.length);
            let key = '.';
            if (subpath.startsWith('/locales/')) {
                key = './locales/*';
            } else if (subpath !== '') {
                key = `.${subpath}`;
            }
            expect(Object.hasOwn(exports, key), `${label}: ${specifier}`).toBe(true);
        }
    };

    it('names only package entries that package.json exports, in the pages and the example modules', () => {
        for (const name of PAGES) {
            check(name, page(name));
        }
        for (const file of filesUnder('src/docs/observability', ['.ts'])) {
            check(file, read(file));
        }
    });
});

describe('the limitations guide', () => {
    const source = page('limitations');
    const installed = new Set(
        [inlineFeatures, commentFeatures, documentFeatures, brandDocumentFeatures].flatMap((features) =>
            features.map(({ id }) => id),
        ),
    );

    it('lists every stage 1.x feature that no shipped profile installs (SPEC-rich-text/AC-048)', () => {
        expect(UNSHIPPED_FEATURES.length).toBeGreaterThan(0);
        for (const id of UNSHIPPED_FEATURES) {
            expect(installed.has(id), id).toBe(false);
            expect(Object.hasOwn(registry, id), id).toBe(false);
            expect(hasRow(source, id), id).toBe(true);
        }
    });

    it('installs the feature of every story title and every feature tag in a shipped profile (SPEC-rich-text/AC-048)', () => {
        const ids = new Set<string>();
        for (const file of filesUnder('src', ['.stories.tsx'])) {
            const story = read(file);
            for (const [, id] of story.matchAll(/title: 'Rich Text Editor\/Features\/([^']+)'/g)) {
                ids.add(id ?? '');
            }
            for (const [, id] of story.matchAll(/'feature:([^']+)'/g)) {
                ids.add(id ?? '');
            }
        }

        expect(ids.size).toBeGreaterThan(0);
        for (const id of ids) {
            expect(installed.has(id), id).toBe(true);
        }
    });

    it('lists every feature that a docs page names and no shipped profile installs (SPEC-rich-text/AC-048)', () => {
        const known = new Set([...Object.keys(registry), ...UNSHIPPED_FEATURES]);
        for (const name of PAGES) {
            for (const [, id] of page(name).matchAll(/`([a-z0-9]+(?:[.-][a-z0-9]+)*)`/g)) {
                if (id === undefined || !known.has(id) || installed.has(id)) {
                    continue;
                }
                expect(hasRow(source, id), `${name} names ${id}`).toBe(true);
            }
        }
    });

    it('names only locale strings the locale holds (SPEC-rich-text/AC-048)', () => {
        const keys = Object.keys(enUS.translationStrings);

        for (const [key] of source.matchAll(/RichTextEditor_\w+/g)) {
            expect(keys, key).toContain(key);
        }
    });

    it('throws definition.unknown-feature from featuresById for each of them (SPEC-rich-text/AC-048)', () => {
        for (const id of UNSHIPPED_FEATURES) {
            expect(() => featuresById([id]), id).toThrow(
                expect.objectContaining({ code: 'definition.unknown-feature' }),
            );
        }
    });
});
