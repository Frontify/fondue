/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createElement, createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type EditorApi, type EditorCommand, type EditorPart } from '#/bridge/plugin';
import { createCodecs } from '#/codecs';
import { defineEditorPart, defineReactPresentation } from '#/entries/authoring';
import { RichTextReader } from '#/entries/reader';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, defineFeature, type Diagnostic, type Feature, type RichTextDocument } from '#/model';
import {
    align as blockAlign,
    bold,
    bulletList,
    codeBlock,
    featuresById,
    heading,
    listItem,
    mentions,
    quote,
    taskList,
} from '#/plugins';
import { fixtureChrome } from '#/plugins/__tests__/fixtures/chrome/feature';
import { chromeEditorWith, fixtureChromeEditor } from '#/plugins/__tests__/fixtures/chrome/view';
import { commandCases, nodeViewCases, normalizerCases } from '#/plugins/__tests__/fixtures/contract.cases';
import { fixtureHeadingSet, fixtureMedia, fixtureMention, fixtureTable } from '#/plugins/__tests__/fixtures/features';
import { highlightEditor } from '#/plugins/__tests__/fixtures/outsideEditor';
import { badgeDocument, highlight, highlightDocument } from '#/plugins/__tests__/fixtures/outsideFeature';
import { spotlight } from '#/plugins/__tests__/fixtures/spotlight/feature';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';
import { vocabularyLists } from '#/plugins/__tests__/fixtures/vocabulary';
import { core } from '#/plugins/Core/feature';
import { mediaImage } from '#/plugins/Image/feature';
import { links } from '#/plugins/Link/feature';
import { registry } from '#/plugins/registry';
import { type Normalizer, NORMALIZERS } from '#/runtime/definition';
import { fromHTML } from '#/runtime/import/fromHtml';
import { type DocumentChange } from '#/runtime/types';
import { pressKey, runFeatureContract, setSelection } from '#/testing';
import { featureFixtures } from '#/testing/conformance/fixtures';

vi.mock('#/codecs', { spy: true });
vi.mock('#/model/compile', { spy: true });

runFeatureContract([...featuresById(Object.keys(registry)), highlight()], {
    fixtures: [highlightDocument, badgeDocument],
    plugins: [highlightEditor],
});
commandCases(featuresById(Object.keys(registry)));
normalizerCases(featuresById(Object.keys(registry)));

/** Registers cases on a stand-in runner, runs each one and returns the titles of those that fail. */
const failingTitles = async (register: () => void): Promise<string[]> => {
    const cases = new Map<string, () => unknown>();
    vi.stubGlobal('describe', (_name: string, body: () => void) => body());
    vi.stubGlobal('it', (name: string, body: () => unknown) => cases.set(name, body));
    try {
        register();
    } finally {
        vi.unstubAllGlobals();
    }

    const failing: string[] = [];
    for (const [name, body] of cases) {
        try {
            await body();
        } catch {
            failing.push(name);
        }
    }

    return failing;
};

const failingCases = (
    features: readonly Feature[],
    fixtures?: readonly unknown[],
    plugins: readonly EditorPart[] = [],
): Promise<string[]> =>
    failingTitles(() => {
        if (fixtures === undefined) {
            runFeatureContract(features, { plugins });

            return;
        }

        runFeatureContract(features, { fixtures, plugins });
    });

/** A stored document of one paragraph with `content`, or of the given blocks. */
const stored = (blocks: readonly unknown[], capabilities: readonly string[] = ['core']): RichTextDocument =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: { id: 'feature-contract', version: 1 },
        requiredCapabilities: capabilities.map((id) => ({ id, version: 1 })),
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as RichTextDocument;
const paragraph = (...content: readonly unknown[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const text = (value: string, ...marks: readonly string[]) => {
    if (marks.length === 0) {
        return { type: 'text', text: value };
    }

    return { type: 'text', text: value, marks: marks.map((type) => ({ type })) };
};

/** The stand-ins with a `nodeId` node and one document that holds each, for the normalizer cases. */
const nodeIdFeatures = () => [
    core(),
    fixtureHeadingSet(),
    fixtureMention(),
    fixtureTable(),
    fixtureMedia(),
    vocabularyLists(),
];
const nodeIdDocument = stored([
    { type: 'heading', attrs: { nodeId: 'h-1', level: 2 }, content: [text('Title')] },
    paragraph(text('Hi '), { type: 'mention', attrs: { nodeId: 'm-1', label: 'Ada' } }),
    { type: 'table', attrs: { nodeId: 't-1' }, content: [paragraph(text('Cell'))] },
    {
        type: 'task_list',
        content: [{ type: 'task_item', attrs: { nodeId: 'k-1', checked: false }, content: [paragraph(text('Todo'))] }],
    },
    { type: 'figure', attrs: { nodeId: 'f-1' }, content: [paragraph(text('Logo'))] },
    { type: 'embed', attrs: { nodeId: 'e-1', url: 'https://www.youtube.com/watch?v=1' } },
]);
normalizerCases(nodeIdFeatures(), [nodeIdDocument]);

// The stand-ins, then each shipped feature that attaches a node view, alone and in one document of every parent.
const chromeDocument = stored(
    [
        paragraph(text('Hi '), { type: 'chrome_mention', attrs: { nodeId: 'm-1', label: 'Ada' } }),
        { type: 'chrome_block', attrs: { nodeId: 'b-1', language: 'ts', checked: false }, content: [text('code')] },
        { type: 'chrome_image', attrs: { nodeId: 'i-1', assetId: null } },
    ],
    ['core', 'fixture.chrome'],
);
nodeViewCases([core(), fixtureChrome()], [chromeDocument], [fixtureChromeEditor]);
nodeViewCases([core(), mediaImage()], [featureFixtures['media.image']?.images as RichTextDocument]);
nodeViewCases([core(), codeBlock()], [featureFixtures['blocks.code']?.code as RichTextDocument]);
nodeViewCases([core(), mentions()], [featureFixtures.mentions?.mentions as RichTextDocument]);
nodeViewCases([core(), taskList()], [featureFixtures['lists.task']?.tasks as RichTextDocument]);
const mention = {
    type: 'mention',
    attrs: { nodeId: 'm-1', resourceType: 'user', resourceId: 'u-1', labelSnapshot: 'Ada' },
};
const codeIn = (id: string) => ({ type: 'code_block', attrs: { languageId: null }, content: [text(id)] });
const nestedDocument = stored(
    [
        paragraph(mention),
        codeIn('top'),
        { type: 'blockquote', content: [paragraph(mention), codeIn('quoted')] },
        {
            type: 'bullet_list',
            attrs: { marker: null },
            content: [{ type: 'list_item', content: [paragraph(mention), codeIn('item')] }],
        },
        {
            type: 'task_list',
            content: [
                {
                    type: 'task_item',
                    attrs: { nodeId: 'k-1', checked: false },
                    content: [paragraph(mention), codeIn('task')],
                },
            ],
        },
    ],
    ['core', 'blocks.quote', 'lists.item', 'lists.bullet', 'lists.task', 'blocks.code', 'mentions'],
);
nodeViewCases([core(), quote(), listItem(), bulletList(), taskList(), codeBlock(), mentions()], [nestedDocument]);
nodeViewCases([core(), highlight()], [badgeDocument], [highlightEditor]);

const DECODES = (name: string) => `decodes and encodes ${name} to itself`;
const RENDERS = (name: string) => `renders ${name} in the reader and writes it through every codec`;
const AXE = (name: string) => `passes axe on the reader output of ${name}`;
const COVERS = 'brings fixtures that hold each of its nodes, marks and shared attributes';

describe('the feature contract suite', () => {
    it('fails the node view cases of an inline view whose chrome hides a button in a div', async () => {
        const Hidden = () =>
            createElement('div', { 'aria-hidden': 'true' }, createElement('button', { type: 'button' }));
        const hidden = chromeEditorWith([{ node: 'chrome_mention', component: Hidden }]);

        const failing = await failingTitles(() => nodeViewCases([core(), fixtureChrome()], [chromeDocument], [hidden]));

        expect(failing).toEqual([
            'keeps valid HTML nesting for the chrome_mention view under each parent its schema allows',
            'keeps every control in the chrome of the chrome_mention view out of aria-hidden',
        ]);
    });

    type Run = (api: EditorApi<'marks'>) => boolean;
    it.each([
        [
            'setTimeout',
            (run: Run): Run =>
                (api) => {
                    setTimeout(() => undefined, 0);

                    return run(api);
                },
        ],
        [
            'setImmediate',
            (run: Run): Run =>
                (api) => {
                    setImmediate(() => undefined);

                    return run(api);
                },
        ],
        [
            'fetch',
            (run: Run): Run =>
                (api) => {
                    fetch('https://frontify.com').catch(() => undefined);

                    return run(api);
                },
        ],
    ])('fails a command that runs %s', async (_name, wrap) => {
        const plugin = defineEditorPart(highlight, {
            needs: ['marks'],
            commands: { 'fixture.highlight.toggle': { run: wrap((api) => api.marks.toggle('fixture_highlight')) } },
        });

        expect(await failingTitles(() => commandCases([core(), heading(), highlight()], [plugin]))).toEqual([
            'runs fixture.highlight.toggle synchronously with no I/O or timer, dispatching at most once',
        ]);
    });

    it.each([
        ['run', { run: (api: EditorApi) => Promise.resolve(api.marks.toggle('fixture_highlight')) }],
        [
            'enabled',
            {
                run: (api: EditorApi) => api.marks.toggle('fixture_highlight'),
                enabled: () => Promise.resolve(true),
            },
        ],
    ])('fails a command whose %s returns a promise', async (_name, spec) => {
        const plugin = defineEditorPart(highlight, {
            needs: ['marks'],
            commands: { 'fixture.highlight.toggle': spec as unknown as EditorCommand<undefined, 'marks'> },
        });

        expect(await failingTitles(() => commandCases([core(), heading(), highlight()], [plugin]))).toEqual([
            'runs fixture.highlight.toggle synchronously with no I/O or timer, dispatching at most once',
        ]);
    });

    it('fails a plugin command that applies without a change or anything it opens', async () => {
        const plugin = defineEditorPart(spotlight, {
            needs: ['marks', 'panels'],
            commands: {
                'fixture.spotlight.claim': { run: () => true },
                'fixture.spotlight.panel': {
                    readOnly: true,
                    run: (api) => {
                        api.panels.open('fixture.spotlight');

                        return true;
                    },
                },
                'fixture.spotlight.toggle': { run: (api) => api.marks.toggle('fixture_spotlight') },
            },
        });

        expect(await failingTitles(() => commandCases([core(), heading(), spotlight()], [plugin]))).toEqual([
            'runs fixture.spotlight.claim synchronously with no I/O or timer, dispatching at most once',
        ]);
    });

    it('fails a command and a toolbar label of a part given as a function of its feature options', async () => {
        const plugin = defineEditorPart(spotlight, () => ({
            commands: { 'fixture.spotlight.claim': { run: () => true } },
            toolbar: [
                {
                    id: 'claim',
                    kind: 'button' as const,
                    command: 'fixture.spotlight.claim',
                    labelKey: 'RichTextEditor_fixtureMissing',
                    icon: 'IconHeading',
                },
            ],
        }));
        const features = [core(), heading(), blockAlign(), spotlight()];

        expect(await failingTitles(() => commandCases(features, [plugin]))).toEqual([
            'runs fixture.spotlight.claim synchronously with no I/O or timer, dispatching at most once',
        ]);
        expect(await failingTitles(() => runFeatureContract(features, { plugins: [plugin] }))).toEqual([
            'resolves the label of each toolbar entry and menu item in enUS',
        ]);
    });

    it.each([
        [
            'toggles an attribute',
            'runs the node-ids normalizer to equal steps on equal states and to nothing on its output',
            (): Normalizer => (state) => {
                let found: { pos: number; nodeId: unknown } | undefined;
                state.doc.descendants((node, pos) => {
                    if (found === undefined && 'nodeId' in node.attrs) {
                        found = { pos, nodeId: node.attrs.nodeId };
                    }

                    return found === undefined;
                });
                if (found === undefined) {
                    return null;
                }

                let next = 'on';
                if (found.nodeId === 'on') {
                    next = 'off';
                }

                return state.tr.setNodeAttribute(found.pos, 'nodeId', next);
            },
        ],
        [
            'calls setTimeout',
            'runs the node-ids normalizer synchronously with no I/O or timer',
            (original: Normalizer): Normalizer =>
                (state, ids) => {
                    setTimeout(() => undefined, 0);

                    return original(state, ids);
                },
        ],
        [
            'schedules promise work',
            'runs the node-ids normalizer synchronously with no I/O or timer',
            (original: Normalizer): Normalizer =>
                (state, ids) => {
                    Promise.resolve()
                        .then(() => undefined)
                        .catch(() => undefined);

                    return original(state, ids);
                },
        ],
        [
            'draws IDs from the current time',
            'runs the node-ids normalizer to equal steps on equal states and to nothing on its output',
            (original: Normalizer): Normalizer =>
                (state) => {
                    let drawn = 0;

                    return original(state, () => {
                        drawn += 1;

                        return `node-${Date.now()}-${drawn}`;
                    });
                },
        ],
    ])('fails a normalizer that %s', async (_name, title, replace) => {
        const plugin = NORMALIZERS['node-ids'] as { normalize: Normalizer };
        const original = plugin.normalize;
        const spy = vi.spyOn(plugin, 'normalize').mockImplementation(replace(original));
        try {
            expect(await failingTitles(() => normalizerCases(nodeIdFeatures(), [nodeIdDocument]))).toEqual([title]);
        } finally {
            spy.mockRestore();
        }
    });

    it('fails the fixture cases of an outside document that misspells its mark', async () => {
        const misspelled = stored([paragraph(text('Read', 'highlite'))], ['core', 'fixture.highlight']);

        expect(await failingCases([core(), heading(), blockAlign(), highlight()], [misspelled])).toEqual([
            DECODES('fixture 1'),
            RENDERS('fixture 1'),
        ]);
    });

    it('fails a shipped feature with no fixture, or none that sets its shared attribute', async () => {
        const align = defineFeature({
            id: 'fixture.align',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            attributes: {
                align: {
                    on: ['paragraph'],
                    value: { type: 'enum', values: ['center', 'end'], nullable: true, default: null },
                    html: { style: 'text-align' },
                    parse: { style: 'text-align' },
                },
            },
        });
        const shipped = registry as Record<string, () => Feature>;
        const fixtures = featureFixtures as Record<string, Readonly<Record<string, RichTextDocument>>>;
        const aligned = (value: string | null) =>
            stored([{ type: 'paragraph', attrs: { lang: null, align: value }, content: [text('Centred')] }]);
        shipped['fixture.align'] = align;
        try {
            const none = await failingCases([core(), align()]);
            fixtures['fixture.align'] = { plain: aligned(null) };
            const unset = await failingCases([core(), align()]);
            fixtures['fixture.align'] = { centred: aligned('center') };
            const set = await failingCases([core(), align()]);

            expect([none.includes(COVERS), unset.includes(COVERS), set.includes(COVERS)]).toEqual([true, true, false]);
        } finally {
            delete shipped['fixture.align'];
            delete fixtures['fixture.align'];
        }
    });

    it('counts a shared attribute only on the nodes it targets, never on another node of that name', async () => {
        const direction = defineFeature({
            id: 'fixture.direction',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            attributes: {
                dir: {
                    on: ['paragraph'],
                    value: { type: 'enum', values: ['ltr', 'rtl'], nullable: true, default: null },
                    html: { attr: 'dir' },
                    parse: { attr: 'dir' },
                },
            },
        });
        const shipped = registry as Record<string, () => Feature>;
        const fixtures = featureFixtures as Record<string, Readonly<Record<string, RichTextDocument>>>;
        const directed = (value: string | null) =>
            stored([{ type: 'paragraph', attrs: { lang: null, dir: value }, content: [text('Directed')] }]);
        shipped['fixture.direction'] = direction;
        try {
            // Only the root's own `dir`, which `stored` sets to `auto`, differs from the shared default.
            fixtures['fixture.direction'] = { root: directed(null) };
            const root = await failingCases([core(), direction()]);
            fixtures['fixture.direction'] = { paragraph: directed('rtl') };
            const paragraph = await failingCases([core(), direction()]);

            expect([root.includes(COVERS), paragraph.includes(COVERS)]).toEqual([true, false]);
        } finally {
            delete shipped['fixture.direction'];
            delete fixtures['fixture.direction'];
        }
    });

    it('fails a toHTML that drops a space between tags or a newline in pre', async () => {
        const code = defineFeature({
            id: 'fixture.code',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            nodes: {
                fixture_code: {
                    group: 'block',
                    content: 'text*',
                    whitespace: 'pre',
                    attrs: {},
                    html: ['pre', 0],
                    parse: [{ tag: 'pre' }],
                },
            },
            formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
        });
        const spaced = stored(
            [
                {
                    type: 'paragraph',
                    attrs: { lang: null, align: null },
                    content: [text('a', 'bold'), text(' '), text('b', 'bold')],
                },
            ],
            ['core', 'marks.bold'],
        );
        const indented = stored(
            [{ type: 'fixture_code', content: [text('if (a) {\n b();\n}')] }],
            ['core', 'fixture.code'],
        );
        const { createCodecs: actual } = await vi.importActual<{ createCodecs: typeof createCodecs }>('#/codecs');
        const breaking = (from: string, to: string) =>
            vi.mocked(createCodecs).mockImplementation((model, options) => {
                const codecs = actual(model, options);

                return {
                    ...codecs,
                    toHTML: (document, htmlOptions) => {
                        const output = codecs.toHTML(document, htmlOptions);

                        return { ...output, html: output.html.replace(from, to) };
                    },
                };
            });
        try {
            breaking('', '');
            const intact = await failingCases([core(), heading(), blockAlign(), bold(), code()], [spaced, indented]);
            breaking('</strong> <strong>', '</strong><strong>');
            const space = await failingCases([core(), heading(), blockAlign(), bold(), code()], [spaced, indented]);
            breaking('\n ', ' ');
            const newline = await failingCases([core(), heading(), blockAlign(), bold(), code()], [spaced, indented]);

            expect([intact, space, newline]).toEqual([[], [RENDERS('fixture 1')], [RENDERS('fixture 2')]]);
        } finally {
            vi.mocked(createCodecs).mockRestore();
        }
    });

    it('accepts the lossy-output info that a codec owes a feature declaring its format lossy, and fails any other diagnostic', async () => {
        const note = defineFeature({
            id: 'fixture.note',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            marks: { fixture_note: { attrs: {}, html: ['mark', 0], parse: [] } },
            formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
        });
        const document = stored(
            [{ type: 'paragraph', attrs: { lang: null, align: null }, content: [text('See', 'fixture_note')] }],
            ['core', 'fixture.note'],
        );
        const { createCodecs: actual } = await vi.importActual<{ createCodecs: typeof createCodecs }>('#/codecs');
        const adding = (extra: readonly Diagnostic[]) =>
            vi.mocked(createCodecs).mockImplementation((model, options) => {
                const codecs = actual(model, options);

                return {
                    ...codecs,
                    toHTML: (input, htmlOptions) => {
                        const output = codecs.toHTML(input, htmlOptions);
                        if (!JSON.stringify(input).includes('fixture_note')) {
                            return output;
                        }

                        return { ...output, diagnostics: [...output.diagnostics, ...extra] };
                    },
                };
            });
        const lossy = (featureId: string, severity: Diagnostic['severity'] = 'info'): Diagnostic => ({
            code: 'codecs.lossy-output',
            severity,
            messageKey: 'codecs.lossy-output',
            featureId,
            details: { count: 1 },
        });
        const failed: Diagnostic = {
            code: 'codecs.override-failed',
            severity: 'error',
            messageKey: 'codecs.override-failed',
            featureId: 'fixture.note',
        };
        try {
            const cases = [[], [lossy('core')], [lossy('fixture.note', 'warning')], [failed]];
            const failing: string[][] = [];
            for (const extra of cases) {
                adding(extra);
                failing.push(await failingCases([core(), heading(), blockAlign(), note()], [document]));
            }

            expect(failing).toEqual([[], [RENDERS('fixture 1')], [RENDERS('fixture 1')], [RENDERS('fixture 1')]]);
        } finally {
            vi.mocked(createCodecs).mockRestore();
        }
    });

    it('passes a new-window link whose reader text is visually hidden, and fails any other difference from toHTML', async () => {
        const opened = stored(
            [
                paragraph(text('Read '), {
                    type: 'text',
                    text: 'the guide',
                    marks: [
                        { type: 'link', attrs: { href: 'https://frontify.com', openInNewWindow: true, styleId: null } },
                    ],
                }),
            ],
            ['core', 'links'],
        );
        const features = [core(), heading(), blockAlign(), links()];
        const { createCodecs: actual } = await vi.importActual<{ createCodecs: typeof createCodecs }>('#/codecs');
        const breaking = (from: string, to: string) =>
            vi.mocked(createCodecs).mockImplementation((model, options) => {
                const codecs = actual(model, options);

                return {
                    ...codecs,
                    toHTML: (document, htmlOptions) => {
                        const output = codecs.toHTML(document, htmlOptions);

                        return { ...output, html: output.html.replace(from, to) };
                    },
                };
            });
        // The shipped fixtures need features this list leaves out, so only the cases of the given document count.
        const failingOfDocument = async () => {
            const failing = await failingCases(features, [opened]);

            return failing.filter((title) => title.endsWith('fixture 1') || title.includes('fixture 1 '));
        };

        try {
            breaking('', '');
            const intact = await failingOfDocument();
            breaking(' rel="noopener noreferrer"', '');
            const attribute = await failingOfDocument();
            breaking('the guide', 'the guide (opens in a new window)');
            const shown = await failingOfDocument();
            breaking('the guide', 'the guide<span data-rte-hidden-text=""> (opens in a new window)</span>');
            const hidden = await failingOfDocument();

            expect([intact, attribute, shown, hidden]).toEqual([
                [],
                [RENDERS('fixture 1')],
                [RENDERS('fixture 1')],
                [RENDERS('fixture 1')],
            ]);
        } finally {
            vi.mocked(createCodecs).mockRestore();
        }
    });

    it('fails the axe case of reader output with an invalid ARIA value', async () => {
        const hidden = defineFeature({
            id: 'fixture.hidden',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            marks: { fixture_hidden: { attrs: {}, html: ['strong', { 'aria-hidden': 'maybe' }, 0], parse: [] } },
        });
        const document = stored(
            [
                {
                    type: 'paragraph',
                    attrs: { lang: null, align: null },
                    content: [text('Make '), text('this', 'fixture_hidden')],
                },
            ],
            ['core', 'fixture.hidden'],
        );

        expect(await failingCases([core(), heading(), blockAlign(), hidden()], [document])).toEqual([AXE('fixture 1')]);
    });
});

const FEATURES_FOLDER = join(dirname(fileURLToPath(import.meta.url)), '..');
const PACKAGE_FOLDER = join(FEATURES_FOLDER, '..', '..');
const packageJson = (path: string) =>
    JSON.parse(readFileSync(join(PACKAGE_FOLDER, path), 'utf8')) as {
        license?: string;
        dependencies?: Readonly<Record<string, string>>;
        peerDependencies?: Readonly<Record<string, string>>;
    };

/** The packages, other than the host's peer packages and Node built-ins, that a feature folder's shipped files import. */
const dependenciesOf = (folder: string, peers: ReadonlySet<string>): string[] => {
    const root = join(FEATURES_FOLDER, folder);
    const files = readdirSync(root, { recursive: true, encoding: 'utf8' }).filter(
        (file) =>
            /\.tsx?$/.test(file) &&
            !file.includes('__tests__') &&
            !file.startsWith('fixtures') &&
            !file.endsWith('.stories.tsx'),
    );
    const found = new Set<string>();
    for (const file of files) {
        const source = readFileSync(join(root, file), 'utf8');
        for (const [, specifier = ''] of source.matchAll(/(?:from\s+|import\s*\(\s*)'([^'.#][^']*)'/g)) {
            const parts = specifier.split('/');
            let name = parts[0] ?? '';
            if (name.startsWith('@')) {
                name = `${name}/${parts[1] ?? ''}`;
            }

            if (!peers.has(name) && !name.startsWith('node:')) {
                found.add(name);
            }
        }
    }

    return [...found].sort();
};

// Every installed dependency is MIT today; widen this only after a license review.
const ALLOWED_LICENSES = ['MIT'];

const patternExpression = (rule: string): RegExp => {
    const anchored = rule.slice(0, -1).includes('/');
    const body = rule.replace(/^\//, '').replace(/\/$/, '');
    const source = body.replaceAll(/\*\*\/|\/\*\*$|\*\*|\*|\?|[.+^${}()|[\]\\]/g, (token) => {
        if (token === '**/') {
            return '(?:.*/)?';
        }

        if (token === '/**') {
            return '/.+';
        }

        if (token === '**') {
            return '.*';
        }

        if (token === '*') {
            return '[^/]*';
        }

        if (token === '?') {
            return '[^/]';
        }

        return `\\${token}`;
    });

    return new RegExp(anchored ? `^${source}$` : `(?:^|/)${source}$`);
};

/** The owners of a directory under gitignore-style CODEOWNERS matching: the last matching rule wins. */
const ownersOf = (codeowners: string, directory: string): string[] => {
    const segments = directory.split('/');
    const folders = segments.map((_, index) => segments.slice(0, index + 1).join('/'));
    let owners: string[] = [];
    for (const line of codeowners.split('\n')) {
        const [rule, ...names] = line.replace(/#.*$/, '').trim().split(/\s+/);
        if (rule !== undefined && rule !== '' && folders.some((folder) => patternExpression(rule).test(folder))) {
            owners = names;
        }
    }

    return owners;
};

describe('the CODEOWNERS matching', () => {
    const rules = ['* @all', '/packages/a/ @a', 'docs/ @docs', '/packages/**/src/ @src', '/packages/b/* @b', ''].join(
        '\n',
    );

    it('lets the last matching rule win, anchors a leading slash and matches a directory rule at any depth', () => {
        expect(ownersOf(rules, 'packages/a/src/x')).toEqual(['@src']);
        expect(ownersOf(rules, 'packages/a/lib')).toEqual(['@a']);
        expect(ownersOf(rules, 'packages/b/lib')).toEqual(['@b']);
        expect(ownersOf(rules, 'other/docs/x')).toEqual(['@docs']);
        expect(ownersOf(rules, 'other/x')).toEqual(['@all']);
        expect(ownersOf('/packages/a/ @a', 'other/packages/a/x')).toEqual([]);
    });
});

describe('every feature folder', () => {
    const manifest = packageJson('package.json');
    const peers = new Set(Object.keys(manifest.peerDependencies ?? {}));
    const codeowners = readFileSync(join(PACKAGE_FOLDER, '..', '..', '.github', 'CODEOWNERS'), 'utf8');
    const featuresPath = relative(join(PACKAGE_FOLDER, '..', '..'), FEATURES_FOLDER)
        .split(sep)
        .join('/');
    const folders = readdirSync(FEATURES_FOLDER, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && existsSync(join(FEATURES_FOLDER, entry.name, 'feature.ts')))
        .map((entry) => entry.name);

    it('is registered as exactly one feature', () => {
        expect(folders).toHaveLength(Object.keys(registry).length);
    });

    it.each(folders)('%s lists each imported package in dependencies with an allowed license', (folder) => {
        for (const name of dependenciesOf(folder, peers)) {
            expect(Object.keys(manifest.dependencies ?? {})).toContain(name);
            expect(ALLOWED_LICENSES).toContain(packageJson(`node_modules/${name}/package.json`).license);
        }
    });

    it.each(folders)('%s has a CODEOWNERS owner', (folder) => {
        expect(ownersOf(codeowners, `${featuresPath}/${folder}`).length).toBeGreaterThan(0);
    });
});

describe('the outside fixture feature', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders its fixture in the editor, the reader and every codec from one compiled model', () => {
        vi.mocked(compileContentModel).mockClear();
        const model = compileContentModel([core(), heading(), blockAlign(), highlight()], {
            id: 'fixture.highlight',
            version: 1,
        });
        const editor = render(
            createElement(RichTextEditor, {
                'aria-label': 'Notes',
                definition: defineEditor({
                    id: 'fixture.highlight',
                    model,
                    plugins: unitsOf(model, [highlightEditor]),
                }),
                defaultValue: { documentId: 'document-1', revision: null, document: highlightDocument },
            }),
        );
        act(() => {
            vi.runAllTimers();
        });
        const reader = render(createElement(RichTextReader, { document: highlightDocument, model }));
        const codecs = createCodecs(model);
        const { html } = codecs.toHTML(highlightDocument);
        const imported = fromHTML(html, model, { window });

        const editorMark = screen.getByRole('textbox', { name: 'Notes' }).querySelector('mark');
        const readerMark = reader.container.querySelector('mark');
        const editorText = editorMark?.textContent;
        const readerText = readerMark?.textContent;

        expect([
            editorText,
            readerText,
            html.includes('<mark>highlighted</mark>'),
            codecs.toPlainText(highlightDocument).text,
            codecs.toMarkdown(highlightDocument).markdown,
            imported.status === 'editable' && imported.document.content,
        ]).toEqual([
            'highlighted',
            'highlighted',
            true,
            'Read the highlighted part.',
            'Read the highlighted part.',
            highlightDocument.content,
        ]);
        expect(vi.mocked(compileContentModel)).toHaveBeenCalledTimes(1);
        editor.unmount();
    });

    it('runs its command from its toolbar entry, inserts its node from its key handler and draws that node in its view', async () => {
        const model = compileContentModel([core(), heading(), blockAlign(), highlight()], {
            id: 'fixture.highlight',
            version: 1,
        });
        const ref = createRef<EditorHandle<object>>();
        const changes: DocumentChange[] = [];
        render(
            createElement(RichTextEditor, {
                'aria-label': 'Notes',
                definition: defineEditor({
                    id: 'fixture.highlight',
                    model,
                    plugins: unitsOf(model, [highlightEditor]),
                }),
                presentation: defineReactPresentation({ toolbar: [['fixture.highlight.toggle']] }),
                defaultValue: { documentId: 'document-1', revision: null, document: highlightDocument },
                onDocumentChange: (change: DocumentChange) => changes.push(change),
                ref,
            }),
        );
        act(() => {
            vi.runAllTimers();
        });
        const handle = ref.current;
        if (handle === null) {
            throw new Error('no handle');
        }

        act(() => setSelection(handle, { text: 'part' }));
        fireEvent.click(screen.getByRole('button', { name: 'Highlight' }));
        act(() => setSelection(handle, { text: 'Read', from: 4 }));
        act(() => pressKey(handle, 'Mod-Shift-y'));
        // Node view chrome renders through a portal the view queues as a microtask.
        await act(async () => {
            await Promise.resolve();
        });

        expect(changes[0]?.commandId).toBe('fixture.highlight.toggle');
        const last = changes.at(-1);
        const blocks = last?.readDocument().content.content;
        const first = blocks?.[0];
        expect(first?.content).toEqual([
            { type: 'text', text: 'Read' },
            { type: 'fixture_badge', attrs: { label: 'New' } },
            { type: 'text', text: ' the ' },
            { type: 'text', text: 'highlighted', marks: [{ type: 'fixture_highlight' }] },
            { type: 'text', text: ' ' },
            { type: 'text', text: 'part', marks: [{ type: 'fixture_highlight' }] },
            { type: 'text', text: '.' },
        ]);
        expect(screen.getByRole('button', { name: 'Badge New' })).toBeDefined();
    });

    it('shows and toggles its mark in the editor', () => {
        const model = compileContentModel([core(), heading(), blockAlign(), highlight()], {
            id: 'fixture.highlight',
            version: 1,
        });
        const ref = createRef<EditorHandle<object>>();
        const changes: DocumentChange[] = [];
        render(
            createElement(RichTextEditor, {
                'aria-label': 'Notes',
                definition: defineEditor({
                    id: 'fixture.highlight',
                    model,
                    plugins: unitsOf(model, [highlightEditor]),
                }),
                defaultValue: { documentId: 'document-1', revision: null, document: highlightDocument },
                onDocumentChange: (change: DocumentChange) => changes.push(change),
                ref,
            }),
        );
        act(() => {
            vi.runAllTimers();
        });
        const handle = ref.current;
        if (handle === null) {
            throw new Error('no handle');
        }

        const marked = screen.getByRole('textbox', { name: 'Notes' }).querySelector('mark');

        expect(marked?.textContent).toBe('highlighted');

        act(() => setSelection(handle, { text: 'part' }));
        act(() => pressKey(handle, 'Mod-Shift-m'));

        expect(changes.map(({ commandId }) => commandId)).toEqual(['fixture.highlight.toggle']);
        expect(changes[0]?.readDocument().content).toEqual({
            ...highlightDocument.content,
            content: [
                {
                    type: 'paragraph',
                    attrs: { lang: null, align: null },
                    content: [
                        { type: 'text', text: 'Read the ' },
                        { type: 'text', text: 'highlighted', marks: [{ type: 'fixture_highlight' }] },
                        { type: 'text', text: ' ' },
                        { type: 'text', text: 'part', marks: [{ type: 'fixture_highlight' }] },
                        { type: 'text', text: '.' },
                    ],
                },
            ],
        });
    });
});
