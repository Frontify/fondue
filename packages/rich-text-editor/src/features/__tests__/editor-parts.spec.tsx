/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { core } from '#/features';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import {
    type CommandsOfModel,
    defineEditor,
    defineEditorPlugin,
    type EditorHandle,
    type EditorPlugin,
    type EditorPluginParts,
    RichTextEditor,
} from '#/index';
import { compileContentModel, type ContentNodeJSON, type RichTextDocument } from '#/model';
import { type DocumentChange } from '#/runtime/types';
import { pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = compileContentModel([core(), spotlight()], { id: 'fixture.parts', version: 1 });

const para = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content,
});
const text = (value: string): ContentNodeJSON => ({ type: 'text', text: value });

const storedOf = (blocks: readonly ContentNodeJSON[]) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;

const mount = (blocks: readonly ContentNodeJSON[], plugins: readonly EditorPlugin[]) => {
    const definition = defineEditor({ id: 'fixture.parts', model, plugins });
    const document = storedOf(blocks);
    const ref = createRef<EditorHandle<CommandsOfModel<typeof model>>>();
    const changes: DocumentChange[] = [];
    const { container } = render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            onDocumentChange={(change) => changes.push(change)}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    if (ref.current === null) {
        throw new Error('The editor did not mount.');
    }
    return { handle: ref.current, container, changes };
};

const textsOf = (container: HTMLElement, selector: string) =>
    [...container.querySelectorAll(selector)].map((element) => element.textContent);

describe('the decorations of an editor part', () => {
    it('draws its ranges by character, with each inline leaf as one character, with their class and attributes', () => {
        const seen: unknown[] = [];
        const plugin = defineEditorPlugin(spotlight, {
            decorations: [
                {
                    id: 'fixture.hits',
                    nodes: ['paragraph'],
                    derive: (block) => {
                        seen.push(block);
                        return [{ from: 3, to: 5, className: 'fixture-hit', attributes: { 'data-hit': 'yes' } }];
                    },
                },
            ],
        });

        const { container } = mount([para(text('ab'), { type: 'hard_break' }, text('cd'))], [plugin]);

        expect(seen).toMatchObject([{ nodeId: null, attrs: { lang: null }, text: 'ab\uFFFCcd' }]);
        expect(textsOf(container, '.fixture-hit[data-hit="yes"]')).toEqual(['cd']);
    });

    it('derives again only the block a change touched, and keeps the ranges of the others on their text', () => {
        const derived: string[] = [];
        const plugin = defineEditorPlugin(spotlight, {
            decorations: [
                {
                    id: 'fixture.first',
                    nodes: ['paragraph'],
                    derive: (block) => {
                        derived.push(block.text);
                        return [{ from: 0, to: 1, className: 'fixture-first' }];
                    },
                },
            ],
        });
        const { handle, container } = mount([para(text('one')), para(text('two')), para(text('three'))], [plugin]);
        derived.length = 0;

        setSelection(handle, { text: 'one', from: 1, to: 1 });
        act(() => {
            typeText(handle, 'X');
        });

        expect(derived).toEqual(['oXne']);
        expect(textsOf(container, '.fixture-first')).toEqual(['o', 't', 't']);
    });

    it('refuses a source over a node that is no textblock of the model', () => {
        const plugin = defineEditorPlugin(spotlight, {
            decorations: [{ id: 'fixture.none', nodes: ['doc'], derive: () => [] }],
        });

        expect(() => defineEditor({ id: 'fixture.parts', model, plugins: [plugin] })).toThrow(
            expect.objectContaining({
                code: 'definition.orphan-behavior',
                details: {
                    feature: 'fixture.spotlight',
                    path: '/decorations/0/nodes',
                    reason: 'decoration sources cover textblocks',
                },
            }),
        );
        expect(() => defineEditor({ id: 'fixture.parts', model, plugins: [plugin] })).toThrow(
            /decoration sources cover textblocks/u,
        );
    });
});

describe('the keys of an editor part', () => {
    const press = (container: HTMLElement, key: string) => {
        const event = new KeyboardEvent('keydown', { key, altKey: true, bubbles: true, cancelable: true });
        container.querySelector('[contenteditable="true"]')?.dispatchEvent(event);
        return event.defaultPrevented;
    };

    it('hands the key on and changes nothing when a key handler returns false', () => {
        const ran: string[] = [];
        const plugin = defineEditorPlugin(spotlight, {
            keys: {
                'Alt-j': (api) => {
                    ran.push(api.selectedText());
                    return false;
                },
            },
        });
        const { handle, container, changes } = mount([para(text('one'))], [plugin]);
        setSelection(handle, { text: 'one', from: 0, to: 3 });

        const prevented = press(container, 'j');

        expect([ran, prevented, changes]).toEqual([['one'], false, []]);
    });

    it('reports the command ID of a key that names a command', () => {
        const plugin = defineEditorPlugin(spotlight, {
            commands: { 'fixture.spotlight.toggle': { run: (api) => api.marks.toggle('fixture_spotlight') } },
            keys: { 'Alt-j': 'fixture.spotlight.toggle' },
        });
        const { handle, changes } = mount([para(text('one'))], [plugin]);
        setSelection(handle, { text: 'one', from: 0, to: 3 });

        pressKey(handle, 'Alt-j');

        expect(changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['command', 'fixture.spotlight.toggle'],
        ]);
    });
});

const RULES = { afterPunctuation: false, maxQuery: 20, spaces: false, leadingLetters: 1 };

describe('the orphan checks of an editor part', () => {
    it.each([
        ['key binding', { keys: { 'Mod-q': 'fixture.missing' } }, '/keys/Mod-q'],
        [
            'toolbar entry',
            {
                toolbar: [
                    {
                        id: 'missing',
                        kind: 'button',
                        command: 'fixture.missing',
                        labelKey: 'RichTextEditor_suggestions',
                        icon: 'IconHeading',
                    },
                ],
            },
            '/toolbar/0/command',
        ],
        [
            'input rule',
            { inputRules: [{ id: 'fixture.stars', kind: 'mark-delimiter', open: '*', close: '*', mark: 'ghost' }] },
            '/inputRules/0/mark',
        ],
        [
            'suggestion list',
            {
                suggestions: [
                    {
                        trigger: '#',
                        labelKey: 'RichTextEditor_suggestions',
                        rules: RULES,
                        search: () => Promise.resolve({ items: [], nextCursor: null }),
                        command: 'fixture.missing',
                    },
                ],
            },
            '/suggestions/0/command',
        ],
        [
            'decoration source',
            { decorations: [{ id: 'fixture.ghost', nodes: ['ghost'], derive: () => [] }] },
            '/decorations/0/nodes',
        ],
    ] as const)('refuses a %s that names what no part or feature of the definition has', (_kind, parts, path) => {
        const plugin = defineEditorPlugin(spotlight, parts as unknown as EditorPluginParts);

        expect(() => defineEditor({ id: 'fixture.parts', model, plugins: [plugin] })).toThrow(
            expect.objectContaining({
                code: 'definition.orphan-behavior',
                details: expect.objectContaining({ feature: 'fixture.spotlight', path }) as unknown,
            }),
        );
    });
});
