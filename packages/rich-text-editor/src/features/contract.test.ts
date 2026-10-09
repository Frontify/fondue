/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { highlight, highlightDocument } from '@frontify/fondue-rich-text-editor-fixture-feature';
import { act, render, screen } from '@testing-library/react';
import { createElement, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { type CapabilityImplementation, type EngineCommand, type Normalizer, NORMALIZERS } from '#/definition';
import { bold, featuresById } from '#/features';
import { commandCases, normalizerCases } from '#/features/__fixtures__/contract.cases';
import { fixtureHeadingSet, fixtureMedia, fixtureMention, fixtureTable } from '#/features/__fixtures__/features';
import { vocabularyLists } from '#/features/__fixtures__/vocabulary';
import { featureFixtures } from '#/features/conformance/fixtures';
import { core } from '#/features/core/feature';
import { registry } from '#/features/registry';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, defineFeature, type Feature, type RichTextDocument, toggleMark } from '#/model';
import { CAPABILITIES } from '#/runtime/capabilities';
import { type DocumentChange } from '#/runtime/types';
import { createTestEnvironment, pressKey, runFeatureContract, setSelection } from '#/testing';

vi.mock('#/codecs', { spy: true });

runFeatureContract([...featuresById(Object.keys(registry)), highlight()], { fixtures: [highlightDocument] });
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
const failingCases = (features: readonly Feature[], fixtures?: readonly unknown[]): Promise<string[]> =>
    failingTitles(() => {
        if (fixtures === undefined) {
            runFeatureContract(features);
            return;
        }
        runFeatureContract(features, { fixtures });
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

const DECODES = (name: string) => `SPEC-rich-text/AC-017 decodes and encodes ${name} to itself`;
const RENDERS = (name: string) =>
    `SPEC-rich-text/AC-017 renders ${name} in the reader and writes it through every codec`;
const AXE = (name: string) => `SPEC-rich-text/AC-017 passes axe on the reader output of ${name}`;
const LABELS =
    'SPEC-rich-text/AC-016 SPEC-rich-text/AC-017 resolves the label of each toolbar entry and menu item in enUS';
const COVERS = 'SPEC-rich-text/AC-016 brings fixtures that hold each of its nodes, marks and shared attributes';

/** Makes every `toggleMark` query over a range dispatch, as if its `dispatch === undefined` guard were gone. */
const dispatchRangeQueries = () => {
    const original = CAPABILITIES.toggleMark as CapabilityImplementation;
    const spy = vi.spyOn(CAPABILITIES as Record<string, CapabilityImplementation>, 'toggleMark');
    spy.mockImplementation((args, schema) => {
        const command = original(args, schema);
        const run: typeof command.run = (state, dispatch, payload) => {
            if (!state.selection.empty) {
                (dispatch as NonNullable<typeof dispatch>)(state.tr);
            }
            return command.run(state, dispatch, payload);
        };
        return { run, active: command.active };
    });
    return spy;
};

describe('the feature contract suite', () => {
    it.each([
        [
            'setTimeout',
            (run: EngineCommand['run']): EngineCommand['run'] =>
                (state, dispatch, payload) => {
                    setTimeout(() => undefined, 0);
                    return run(state, dispatch, payload);
                },
        ],
        [
            'setImmediate',
            (run: EngineCommand['run']): EngineCommand['run'] =>
                (state, dispatch, payload) => {
                    setImmediate(() => undefined);
                    return run(state, dispatch, payload);
                },
        ],
        [
            'fetch',
            (run: EngineCommand['run']): EngineCommand['run'] =>
                (state, dispatch, payload) => {
                    // oxlint-disable-next-line no-restricted-globals -- the case proves the suite fails a capability that calls `fetch`.
                    fetch('https://frontify.com').catch(() => undefined);
                    return run(state, dispatch, payload);
                },
        ],
        [
            'a second dispatch',
            (run: EngineCommand['run']): EngineCommand['run'] =>
                (state, dispatch, payload) => {
                    dispatch?.(state.tr.insertText('a', 1));
                    return run(state, dispatch, payload);
                },
        ],
        [
            'a returned promise',
            (run: EngineCommand['run']): EngineCommand['run'] =>
                (state, dispatch, payload) =>
                    Promise.resolve(run(state, dispatch, payload)) as unknown as boolean,
        ],
    ])('SPEC-rich-text-runtime/AC-038 fails a command whose capability runs %s', async (_name, wrap) => {
        const original = CAPABILITIES.toggleMark as CapabilityImplementation;
        const spy = vi.spyOn(CAPABILITIES as Record<string, CapabilityImplementation>, 'toggleMark');
        spy.mockImplementation((args, schema) => {
            const command = original(args, schema);
            return { run: wrap(command.run), active: command.active };
        });
        try {
            expect(await failingTitles(() => commandCases([core(), bold()]))).toEqual([
                'SPEC-rich-text-runtime/AC-038 runs mark.bold.toggle synchronously with no I/O or timer, dispatching at most once',
            ]);
        } finally {
            spy.mockRestore();
        }
    });

    it.each([
        [
            'toggles an attribute',
            'SPEC-rich-text/AC-057 runs the node-ids normalizer to equal steps on equal states and to nothing on its output',
            (): Normalizer => (state) => {
                let found: { readonly pos: number; readonly nodeId: unknown } | undefined;
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
            'SPEC-rich-text/AC-059 runs the node-ids normalizer synchronously with no I/O or timer',
            (original: Normalizer): Normalizer =>
                (state, ids) => {
                    setTimeout(() => undefined, 0);
                    return original(state, ids);
                },
        ],
        [
            'schedules promise work',
            'SPEC-rich-text/AC-059 runs the node-ids normalizer synchronously with no I/O or timer',
            (original: Normalizer): Normalizer =>
                (state, ids) => {
                    Promise.resolve()
                        .then(() => undefined)
                        .catch(() => undefined);
                    return original(state, ids);
                },
        ],
        [
            'draws IDs from the clock',
            'SPEC-rich-text/AC-057 runs the node-ids normalizer to equal steps on equal states and to nothing on its output',
            (original: Normalizer): Normalizer =>
                (state) => {
                    let drawn = 0;
                    return original(state, {
                        next: () => {
                            drawn += 1;
                            return `node-${Date.now()}-${drawn}`;
                        },
                    });
                },
        ],
    ])('SPEC-rich-text/AC-057 SPEC-rich-text/AC-059 fails a normalizer that %s', async (_name, title, replace) => {
        const plugin = NORMALIZERS['node-ids'] as { normalize: Normalizer };
        const original = plugin.normalize;
        const spy = vi.spyOn(plugin, 'normalize').mockImplementation(replace(original));
        try {
            expect(await failingTitles(() => normalizerCases(nodeIdFeatures(), [nodeIdDocument]))).toEqual([title]);
        } finally {
            spy.mockRestore();
        }
    });

    it('SPEC-rich-text/AC-017 fails the fixture cases of an outside document that misspells its mark', async () => {
        const misspelled = stored([paragraph(text('Read', 'highlite'))], ['core', 'fixture.highlight']);

        expect(await failingCases([core(), highlight()], [misspelled])).toEqual([
            DECODES('fixture 1'),
            RENDERS('fixture 1'),
        ]);
    });

    it('SPEC-rich-text/AC-016 fails a menu item whose labelKey enUS does not hold', async () => {
        const menu = defineFeature({
            id: 'fixture.menu',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            marks: { fixture_menu: { attrs: {}, html: ['mark', 0], parse: [{ tag: 'mark' }] } },
            commands: { 'fixture.menu.toggle': toggleMark('fixture_menu') },
            toolbar: [
                {
                    kind: 'menu',
                    command: 'fixture.menu.toggle',
                    labelKey: 'RichTextEditor_bold',
                    icon: 'IconTextFormatBold',
                    items: [{ command: 'fixture.menu.toggle', labelKey: 'RichTextEditor_missing' }],
                },
            ],
        });

        expect(await failingCases([core(), menu()])).toEqual([LABELS]);
    });

    it('SPEC-rich-text/AC-017 fails a command whose query over a range dispatches', async () => {
        const spy = dispatchRangeQueries();
        try {
            expect(await failingCases([core(), bold()])).toEqual([
                'SPEC-rich-text/AC-017 queries mark.bold.toggle without dispatching',
            ]);
        } finally {
            spy.mockRestore();
        }
    });

    it('SPEC-rich-text/AC-017 fails an outside command whose query over a range of a given fixture dispatches', async () => {
        const spy = dispatchRangeQueries();
        try {
            expect(await failingCases([core(), highlight()], [highlightDocument])).toEqual([
                'SPEC-rich-text/AC-017 queries fixture.highlight.toggle without dispatching',
            ]);
        } finally {
            spy.mockRestore();
        }
    });

    it('SPEC-rich-text/AC-016 fails a shipped feature with no fixture, or none that sets its shared attribute', async () => {
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

    it('SPEC-rich-text/AC-016 counts a shared attribute only on the nodes it targets, never on another node of that name', async () => {
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

    it('SPEC-rich-text/AC-017 fails a toHTML that drops a space between tags or a newline in pre', async () => {
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
        const spaced = stored([paragraph(text('a', 'bold'), text(' '), text('b', 'bold'))], ['core', 'marks.bold']);
        const indented = stored(
            [{ type: 'fixture_code', content: [text('if (a) {\n    b();\n}')] }],
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
            const intact = await failingCases([core(), bold(), code()], [spaced, indented]);
            breaking('</strong> <strong>', '</strong><strong>');
            const space = await failingCases([core(), bold(), code()], [spaced, indented]);
            breaking('\n    ', ' ');
            const newline = await failingCases([core(), bold(), code()], [spaced, indented]);

            expect([intact, space, newline]).toEqual([[], [RENDERS('fixture 1')], [RENDERS('fixture 2')]]);
        } finally {
            vi.mocked(createCodecs).mockRestore();
        }
    });

    it('SPEC-rich-text/AC-017 fails the axe case of reader output with an invalid ARIA value', async () => {
        const hidden = defineFeature({
            id: 'fixture.hidden',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            marks: { fixture_hidden: { attrs: {}, html: ['strong', { 'aria-hidden': 'maybe' }, 0], parse: [] } },
        });
        const document = stored([paragraph(text('Make '), text('this', 'fixture_hidden'))], ['core', 'fixture.hidden']);

        expect(await failingCases([core(), hidden()], [document])).toEqual([AXE('fixture 1')]);
    });
});

describe('the outside fixture feature', () => {
    it('SPEC-rich-text/AC-017 shows and toggles its mark in the editor', () => {
        const model = compileContentModel([core(), highlight()], { id: 'fixture.highlight', version: 1 });
        const environment = createTestEnvironment({ seed: 1 });
        const ref = createRef<EditorHandle<object>>();
        const changes: DocumentChange[] = [];
        render(
            createElement(RichTextEditor, {
                'aria-label': 'Notes',
                definition: defineEditor({ id: 'fixture.highlight', model }),
                defaultValue: { documentId: 'document-1', revision: null, document: highlightDocument },
                environment,
                onDocumentChange: (change: DocumentChange) => changes.push(change),
                ref,
            }),
        );
        act(() => environment.flushFrames());
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
                    attrs: { lang: null },
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
