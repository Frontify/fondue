/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { enUS } from '#/locales/en-US';
import { toJsonSchema } from '#/model';
import {
    brandDocumentFeatures,
    brandDocumentModel,
    commentFeatures,
    commentModel,
    documentFeatures,
    documentModel,
    featuresById,
    inlineFeatures,
    inlineModel,
} from '#/plugins';
import { CONTENT_RULE_IDS } from '#/plugins/__tests__/fixtures/contentRules';
import { featureIdsByFolder, registry } from '#/plugins/registry';
import { UNSHIPPED_FEATURES } from '#/plugins/stages';

const PACKAGE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const read = (path: string) => readFileSync(join(PACKAGE, path), 'utf8');
const page = (name: string) => read(`src/docs/${name}.mdx`);

const PAGES = ['reader-codecs', 'accessibility', 'observability', 'authoring', 'limitations', 'compatibility'] as const;

/** Whether a Markdown table of `source` has a row that starts with `cell` in code, however the formatter padded it. */
const hasRow = (source: string, cell: string) =>
    new RegExp(`^\\| \`${cell.replaceAll(/[.*]/g, '\\$&')}\`\\s+\\|`, 'm').test(source);

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
    it('has one MDX page for each guide, titled under Rich Text Editor/Guides', () => {
        for (const name of PAGES) {
            expect(existsSync(join(PACKAGE, `src/docs/${name}.mdx`)), name).toBe(true);
            expect(page(name)).toMatch(/<Meta title="Rich Text Editor\/Guides\/[^"]+" \/>/);
        }
    });
});

describe('the package README', () => {
    const source = read('README.md');

    it('lists every entry that package.json exports in its entries table', () => {
        const { exports } = JSON.parse(read('package.json')) as { exports: Readonly<Record<string, unknown>> };

        for (const entry of Object.keys(exports)) {
            expect(hasRow(source, entry), entry).toBe(true);
        }
    });

    it('names every top-level folder of src exactly once across the two Layers tables', () => {
        const section = source.split(/^## Layers$/m)[1]?.split(/^## /m)[0] ?? '';
        const tables: string[][] = [];
        let current: string[] | undefined;
        for (const line of section.split('\n')) {
            if (line.startsWith('|')) {
                current ??= [];
                current.push(line);
            } else if (current !== undefined) {
                tables.push(current);
                current = undefined;
            }
        }

        if (current !== undefined) {
            tables.push(current);
        }

        const cellsOf = (line: string) =>
            line
                .split('|')
                .slice(1, -1)
                .map((cell) => cell.trim());
        const separator = (cells: readonly string[]) => cells.every((cell) => /^:?-+:?$/.test(cell));
        const foldersIn = (cell: string) => [...cell.matchAll(/`([^`]+)`/g)].map((match) => match[1] ?? '');
        const listed = tables.flatMap((table, index) => {
            const column = index === 0 ? 1 : 0;

            return table.flatMap((line) => {
                const cells = cellsOf(line);
                if (separator(cells)) {
                    return [];
                }

                return foldersIn(cells[column] ?? '');
            });
        });
        const folders = readdirSync(join(PACKAGE, 'src'), { withFileTypes: true })
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
            .sort();

        expect(tables).toHaveLength(2);
        expect([...listed].sort()).toEqual(folders);
        expect(new Set(listed).size).toBe(listed.length);
    });

    it('does not call the published package private or unreleased', () => {
        expect(source).not.toMatch(/\b(?:private|unreleased)\b/i);
    });
});

describe('the accessibility guide', () => {
    const source = page('accessibility');

    it('has a section for the keyboard model, the toolbar, the content checks, alternative text and language marking ', () => {
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

    it('names the toolbar shortcut and its default in the keyboard model and the toolbar ', () => {
        expect(source).toContain('Alt+F10');
        expect(source).toContain('toolbarShortcut');
        expect(source).toContain('tabMovesFocus');
    });

    it('lists every content check rule of the model in its content checks table ', () => {
        expect(CONTENT_RULE_IDS.length).toBeGreaterThan(0);
        for (const rule of CONTENT_RULE_IDS) {
            expect(hasRow(source, rule), rule).toBe(true);
        }
    });

    it('lists the locales the package ships in its language marking section ', () => {
        const shipped = readdirSync(join(PACKAGE, 'src/locales'))
            .filter((name) => /^[a-z]{2}-[A-Z]{2}\.ts$/.test(name))
            .map((name) => name.replace('.ts', ''));

        expect(shipped.length).toBeGreaterThan(0);
        for (const locale of shipped) {
            expect(source, locale).toContain(`\`${locale}\``);
        }
    });
});

describe('the compatibility guide', () => {
    const source = page('compatibility');
    const SHIPPED = [inlineModel, commentModel, documentModel, brandDocumentModel];

    it('has a matrix row for each shipped model with the versions it reads, the version it writes and the oldest package version that reads it', () => {
        for (const { ref } of SHIPPED) {
            const row = new RegExp(
                `^\\| \`${ref.id}\`\\s+\\| [^|]*\\b${ref.version}\\b[^|]*\\| ${ref.version}\\s+\\| \\d+\\.\\d+\\.\\d+\\s+\\|`,
                'm',
            );

            expect(source, ref.id).toMatch(row);
        }
    });

    it('publishes the toJsonSchema output of each shipped model as one file per model ID and version', () => {
        for (const model of SHIPPED) {
            const path = `src/docs/schemas/${model.ref.id}/${model.ref.version}.json`;

            expect(existsSync(join(PACKAGE, path)), path).toBe(true);
            expect(JSON.parse(read(path))).toEqual(toJsonSchema(model));
        }
    });

    it('links every schema file at the path Storybook serves it from', () => {
        const files = filesUnder('src/docs/schemas', ['.json']);

        expect(files.length).toBeGreaterThan(0);
        for (const file of files) {
            expect(source).toContain(`(${file.replace('src/docs/', '')})`);
        }
    });
});

describe('the reader and codecs guide', () => {
    const source = page('reader-codecs');
    const outside = source.slice(source.indexOf('## `toHTML` output outside the editor'));

    it('has the caching and outside-the-editor sections ', () => {
        expect(source).toContain('## Caching reader and codec output');
        expect(source).toContain('## `toHTML` output outside the editor');
    });

    it('names the stylesheet entry that the package exports ', () => {
        const { exports } = JSON.parse(read('package.json')) as { exports: Readonly<Record<string, unknown>> };

        expect(exports['./styles']).toBeDefined();
        expect(outside).toContain('@frontify/fondue-rich-text-editor/styles');
    });
});

describe('the observability guide', () => {
    const source = page('observability');
    const SECTIONS = [
        ['Import failures and unknown capabilities', 'importFailures', 'importFailures'],
        ['Renderer failures', 'rendererFailures', 'rendererFailures'],
        ['Save conflicts', 'saveConflicts', 'saveConflicts'],
        ['Latency and normalization counts', 'operationMetrics', 'operationMetrics'],
    ] as const;

    it('has one section for each row of the counter table ', () => {
        expect(headingsOf(source)).toEqual(expect.arrayContaining(SECTIONS.map(([heading]) => heading)));
    });

    it('shows the example module of each section, which a test runs ', () => {
        for (const [heading, file, name] of SECTIONS) {
            const body = source.slice(source.indexOf(`## ${heading}`)).split(/\n## /)[0] ?? '';

            expect(existsSync(join(PACKAGE, `src/docs/observability/${file}.ts`)), file).toBe(true);
            expect(body, heading).toContain(`<Source code={shown(${name})}`);
        }
    });
});

describe('the authoring guide', () => {
    const source = page('authoring');
    // Later sections. The pattern also matches the singular a reader would see.
    const OPENING_CONCEPTS = [
        'reader part',
        'commands',
        'keys',
        'input rules',
        'overlays',
        'panels',
        'decorations',
        'suggestion lists',
        'node views',
        'file drops',
        'facets',
        'policies',
        'profiles',
        'migrations',
    ] as const;

    const conceptPattern = (concept: string) => {
        const words = concept.split(' ');
        const last = words.at(-1) ?? concept;
        let token = `${last}s?`;
        if (last.endsWith('ies')) {
            token = `${last.slice(0, -3)}(?:y|ies)`;
        } else if (last.endsWith('s')) {
            token = `${last.slice(0, -1)}s?`;
        }

        words[words.length - 1] = token;

        return new RegExp(`\\b${words.join(' ')}\\b`, 'i');
    };

    const excerpts = [...source.matchAll(/Source: `([^`]+)`\n\n```(\w+)\n([\s\S]*?)\n```/g)].map(
        ([, path, language, code]) => ({ path: path ?? '', language: language ?? '', code: code ?? '' }),
    );

    it('names none of the later concepts before the first complete plugin example', () => {
        const example = source.indexOf('Source: `src/docs/authoring/highlight.ts`');
        const opening = source.slice(0, example);

        expect(example).toBeGreaterThan(0);
        for (const concept of OPENING_CONCEPTS) {
            expect(opening, concept).not.toMatch(conceptPattern(concept));
        }
    });

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

    it('takes every excerpt from a plugin folder, its components, hooks or helpers, or the authoring examples of the package', () => {
        for (const { path, language } of excerpts) {
            expect(path).toMatch(
                /^src\/(?:plugins\/[A-Za-z0-9]+(?:\/(?:components|hooks|helpers))?|docs\/authoring)\/[A-Za-z-]+\.tsx?$/,
            );
            expect(language).toBe(path.endsWith('.tsx') ? 'tsx' : 'ts');
        }
    });
});

describe('the imports the guides show', () => {
    const { exports } = JSON.parse(read('package.json')) as { exports: Readonly<Record<string, unknown>> };
    const PREFIX = '@frontify/fondue-rich-text-editor';

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

    it('lists every stage 1.x feature that no shipped profile installs ', () => {
        expect(UNSHIPPED_FEATURES.length).toBeGreaterThan(0);
        for (const id of UNSHIPPED_FEATURES) {
            expect(installed.has(id), id).toBe(false);
            expect(Object.hasOwn(registry, id), id).toBe(false);
            expect(hasRow(source, id), id).toBe(true);
        }
    });

    it('installs the feature of every story title and every feature tag in a shipped profile ', () => {
        const ids = new Set<string>();
        for (const file of filesUnder('src', ['.stories.tsx'])) {
            const story = read(file);
            for (const [, name] of story.matchAll(/title: 'Rich Text Editor\/Plugins\/([^']+)'/g)) {
                ids.add(featureIdsByFolder[name ?? ''] ?? '');
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

    it('lists every feature that a docs page names and no shipped profile installs ', () => {
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

    it('names only locale strings the locale holds ', () => {
        const keys = Object.keys(enUS.translationStrings);

        for (const [key] of source.matchAll(/RichTextEditor_\w+/g)) {
            expect(keys, key).toContain(key);
        }
    });

    it('throws definition.unknown-feature from featuresById for each of them ', () => {
        for (const id of UNSHIPPED_FEATURES) {
            expect(() => featuresById([id]), id).toThrow(
                expect.objectContaining({ code: 'definition.unknown-feature' }),
            );
        }
    });
});
