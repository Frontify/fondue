/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { definePlugin } from '#/bridge/definePlugin';
import { createCodecs } from '#/codecs';
import {
    defineEditorPart,
    defineReactPresentation,
    type EditorPart,
    type EditorPartSpec,
    type EditorSuggestion,
    NodeViewContent,
    type SuggestionPage,
    type SuggestionRules,
    useRichTextNodeView,
} from '#/entries/authoring';
import { codeBlock, core, heading, language, mentions, outline } from '#/features';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import { type UnitCommands, unitsOf } from '#/features/__tests__/fixtures/units';
import { corePlugin } from '#/features/core';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON, type RichTextDocument, textRule } from '#/model';
import { type DocumentChange } from '#/runtime/types';
import { pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = compileContentModel([core(), heading(), codeBlock(), spotlight()], { id: 'fixture.parts', version: 1 });

const para = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content,
});
const text = (value: string): ContentNodeJSON => ({ type: 'text', text: value });
const title: ContentNodeJSON = {
    type: 'heading',
    attrs: { nodeId: 'heading-1', level: 2, lang: null },
    content: [text('Title')],
};
const code = (value: string, languageId: string | null): ContentNodeJSON => ({
    type: 'code_block',
    attrs: { languageId },
    content: [text(value)],
});

const storedOf = (blocks: readonly ContentNodeJSON[]) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;

const mount = (blocks: readonly ContentNodeJSON[], plugins: readonly EditorPart[]) => {
    const definition = defineEditor({ id: 'fixture.parts', model, plugins: unitsOf(model, plugins) });
    const document = storedOf(blocks);
    const ref = createRef<EditorHandle<UnitCommands>>();
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
        const plugin = defineEditorPart(spotlight, {
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
        const plugin = defineEditorPart(spotlight, {
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

    it('derives a block split off a heading again with the nodeId it is given', () => {
        const plugin = defineEditorPart(spotlight, {
            decorations: [
                {
                    id: 'fixture.ids',
                    nodes: ['heading'],
                    derive: (block) => [{ from: 0, to: 1, attributes: { 'data-node': block.nodeId ?? 'none' } }],
                },
            ],
        });
        const { handle, container } = mount([title], [plugin]);

        setSelection(handle, { text: 'Title', from: 2, to: 2 });
        act(() => {
            pressKey(handle, 'Enter');
        });

        const blocks = handle.getSnapshot().document.content.content ?? [];
        const ids = blocks.map((block) => (block.attrs as { nodeId?: unknown } | undefined)?.nodeId);
        expect(ids).toHaveLength(2);
        expect(new Set(ids).size).toBe(2);
        expect(
            [...container.querySelectorAll('[data-node]')].map((element) => element.getAttribute('data-node')),
        ).toEqual(ids);
    });

    it('refuses a source over a node that is no textblock of the model', () => {
        const plugin = defineEditorPart(spotlight, {
            decorations: [{ id: 'fixture.none', nodes: ['doc'], derive: () => [] }],
        });

        expect(() => defineEditor({ id: 'fixture.parts', model, plugins: unitsOf(model, [plugin]) })).toThrow(
            expect.objectContaining({
                code: 'definition.orphan-behavior',
                details: {
                    feature: 'fixture.spotlight',
                    path: '/decorations/0/nodes',
                    reason: 'decoration sources cover textblocks',
                },
            }),
        );
        expect(() => defineEditor({ id: 'fixture.parts', model, plugins: unitsOf(model, [plugin]) })).toThrow(
            /decoration sources cover textblocks/u,
        );
    });

    it('keeps the shipped highlighting and view of blocks.code under an empty host part', async () => {
        const { container } = mount([code('const a = 1;', 'typescript')], [defineEditorPart(codeBlock, {})]);

        await vi.waitFor(() => {
            expect(container.querySelector('[class*="hljs-"]')).not.toBeNull();
        });

        expect(container.querySelector('[data-rte-chrome]')).not.toBeNull();
    });

    it('leaves code blocks plain under a host part that replaces the code-syntax source by its id', async () => {
        const plain = defineEditorPart(codeBlock, {
            decorations: [{ id: 'code-syntax', nodes: ['code_block'], derive: () => [] }],
        });
        const shipped = mount([code('const a = 1;', 'typescript')], []);
        const replaced = mount([code('const a = 1;', 'typescript')], [plain]);

        await vi.waitFor(() => {
            expect(shipped.container.querySelector('[class*="hljs-"]')).not.toBeNull();
        });

        expect(replaced.container.querySelector('[class*="hljs-"]')).toBeNull();
    });
});

describe('the node views of an editor part', () => {
    it('renders its chrome around the content element it places, and rerenders only for its own node', async () => {
        const renders: unknown[] = [];
        const Frame = () => {
            const { attrs, selected } = useRichTextNodeView();
            renders.push([attrs.level, selected]);

            return (
                <div className="fixture-frame">
                    <span contentEditable={false}>Level {JSON.stringify(attrs.level)}</span>
                    <NodeViewContent className="fixture-content" />
                </div>
            );
        };

        const plugin = defineEditorPart(spotlight, { views: [{ node: 'heading', component: Frame }] });
        const { handle, container } = mount([title, para(text('Body'))], [plugin]);
        await vi.waitFor(() => {
            expect(container.querySelector('.fixture-content')?.textContent).toBe('Title');
        });
        const content = container.querySelector('.fixture-frame .fixture-content');
        renders.length = 0;

        setSelection(handle, { text: 'Body', from: 1, to: 1 });
        act(() => {
            typeText(handle, 'X');
        });
        setSelection(handle, { text: 'Title', from: 1, to: 1 });
        act(() => {
            typeText(handle, 'Y');
        });

        expect(content?.textContent).toBe('TYitle');
        const chrome = content?.closest('[data-rte-chrome]');
        const first = handle.getSnapshot().document.content.content?.[0];
        expect(chrome?.hasAttribute('contenteditable')).toBe(false);
        expect(first?.content).toEqual([text('TYitle')]);
        expect(renders).toEqual([]);
    });

    it('puts the content of a view that places none in the hole of its HTML spec, with the attributes the spec writes', async () => {
        const Bar = () => <span>Bar</span>;
        const plugin = defineEditorPart(codeBlock, { views: [{ node: 'code_block', component: Bar }] });
        const { handle, container } = mount([code('one', 'typescript')], [plugin]);
        await vi.waitFor(() => {
            expect(container.querySelector('[data-rte-chrome]')?.textContent).toBe('Bar');
        });

        act(() => {
            handle.execute('code-block.language.set', { languageId: 'python' });
        });

        const pre = container.querySelector('pre');
        expect(pre?.getAttribute('data-language')).toBe('python');
        const chrome = pre?.querySelector(':scope > [data-rte-chrome]');
        const source = pre?.querySelector(':scope > code');
        expect(chrome?.textContent).toBe('Bar');
        expect(source?.textContent).toBe('one');
    });

    it('gives the code element of the editor, never the HTML of the document, the editing attributes of the code view', async () => {
        const block = code('one', 'typescript');
        const { container } = mount([block], []);
        await vi.waitFor(() => {
            expect(container.querySelector('pre > code')).not.toBeNull();
        });
        const html = createCodecs(model).toHTML(storedOf([block])).html;

        const element = container.querySelector('pre > code');
        expect(element?.getAttribute('spellcheck')).toBe('false');
        expect(element?.getAttribute('autocorrect')).toBe('off');
        expect(element?.getAttribute('autocapitalize')).toBe('off');
        expect(html).toContain('<code>one</code>');
        expect(html).not.toMatch(/spellcheck|autocorrect|autocapitalize/);
    });
});

describe('a host part over a shipped part', () => {
    const hostModel = compileContentModel([core(), heading(), mentions(), outline()], {
        id: 'fixture.host',
        version: 1,
    });
    const mountHost = (blocks: readonly ContentNodeJSON[], plugins: readonly EditorPart[]) =>
        render(
            <RichTextEditor
                aria-label="Notes"
                definition={defineEditor({
                    id: 'fixture.host',
                    model: hostModel,
                    plugins: unitsOf(hostModel, plugins),
                })}
                presentation={defineReactPresentation({ toolbar: [['outline.toggle']] })}
                defaultValue={{
                    documentId: 'document-1',
                    revision: null,
                    document: {
                        ...storedOf(blocks),
                        model: hostModel.ref,
                        requiredCapabilities: hostModel.capabilities,
                    } as RichTextDocument,
                }}
            />,
        );
    const ada: ContentNodeJSON = {
        type: 'mention',
        attrs: { nodeId: 'mention-1', resourceType: 'user', resourceId: 'user-1', labelSnapshot: 'Ada' },
    };

    it('renders its view of the mention in place of the shipped chip', async () => {
        const Chip = () => <span className="fixture-chip">Host chip</span>;
        const plugin = defineEditorPart(mentions, { views: [{ node: 'mention', component: Chip }] });
        const { container, unmount } = mountHost([para(text('Hi '), ada)], [plugin]);

        await vi.waitFor(() => {
            expect(container.querySelector('.fixture-chip')).not.toBeNull();
        });
        expect(container.querySelector('[data-rte-chrome]')?.textContent).toBe('Host chip');
        unmount();
    });

    it('opens its panel in place of the shipped panel of the same id', () => {
        const Panel = () => <p>Host outline</p>;
        const plugin = defineEditorPart(outline, {
            panels: [{ control: 'outline', component: Panel }],
        });
        const { unmount } = mountHost([title], [plugin]);
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        fireEvent.click(screen.getByRole('button', { name: 'Outline' }));

        expect(screen.getByText('Host outline')).toBeInTheDocument();
        expect(screen.queryByRole('navigation', { name: 'Outline' })).toBeNull();
        unmount();
    });
});

describe('the keys of an editor part', () => {
    const press = (container: HTMLElement, key: string) => {
        const event = new KeyboardEvent('keydown', { key, altKey: true, bubbles: true, cancelable: true });
        container.querySelector('[contenteditable="true"]')?.dispatchEvent(event);

        return event.defaultPrevented;
    };

    it('runs a key handler as the input it replaces: no command ID, and one undo step with the typing before it', () => {
        const plugin = defineEditorPart(spotlight, {
            needs: ['insert'],
            keys: { 'Alt-j': (api) => api.insert.text('!') },
        });
        const { handle, container, changes } = mount([para(text('one'))], [plugin]);
        setSelection(handle, { text: 'one', from: 3, to: 3 });

        typeText(handle, 'x');
        const prevented = press(container, 'j');
        const reported = changes.map(({ origin, commandId }) => [origin, commandId]);
        const typed = handle.getSnapshot().document;
        handle.execute('history.undo');

        expect(prevented).toBe(true);
        expect(JSON.stringify(typed)).toContain('onex!');
        expect(reported).toEqual([
            ['input', null],
            ['unknown', null],
        ]);
        expect(JSON.stringify(handle.getSnapshot().document)).toContain('"one"');
    });

    it('hands the key on and changes nothing when a key handler returns false', () => {
        const ran: string[] = [];
        const plugin = defineEditorPart(spotlight, {
            keys: {
                'Alt-j': (api) => {
                    ran.push(api.selectedText());

                    return false;
                },
            },
        });
        const { handle, container, changes } = mount([para(text('one'))], [plugin]);
        setSelection(handle, { text: 'one', from: 0, to: 3 });
        const before = handle.getSnapshot().document;

        const prevented = press(container, 'j');

        expect([ran, prevented, changes]).toEqual([['one'], false, []]);
        expect(handle.getSnapshot().document).toEqual(before);
    });

    it('runs a key handler before a key binding of the same key', () => {
        const binding = defineEditorPart(heading, {
            needs: ['insert'],
            commands: { 'fixture.heading.mark': { run: (api) => api.insert.text('binding') } },
            keys: { Enter: 'fixture.heading.mark' },
        });
        const handler = defineEditorPart(spotlight, {
            needs: ['insert'],
            keys: { Enter: (api) => api.insert.text('handler') },
        });
        const { handle } = mount([para(text('one'))], [binding, handler]);
        setSelection(handle, { text: 'one', from: 3, to: 3 });

        pressKey(handle, 'Enter');

        expect(JSON.stringify(handle.getSnapshot().document)).toContain('onehandler');
    });

    it('reports the command ID of a key that names a command', () => {
        const plugin = defineEditorPart(spotlight, {
            needs: ['marks'],
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

describe('the input rules of an editor part', () => {
    it('refuses two rules of one ID', () => {
        const plugin = defineEditorPart(spotlight, {
            inputRules: [
                textRule({ id: 'fixture.twice', match: /aa$/u, replace: 'b' }),
                textRule({ id: 'fixture.twice', match: /cc$/u, replace: 'd' }),
            ],
        });

        expect(() => defineEditor({ id: 'fixture.parts', model, plugins: unitsOf(model, [plugin]) })).toThrow(
            'definition.duplicate-id {"kind":"input-rule","id":"fixture.twice","features":["fixture.spotlight","fixture.spotlight"]}',
        );
    });
});

const RULES = { afterPunctuation: false, maxQuery: 20, spaces: false, leadingLetters: 1 };
const tag = (key: string, label = `Tag ${key}`) => ({ key, label, glyph: null, payload: { text: key } });
const tagPart = (search: EditorSuggestion<never>['search'], rules: SuggestionRules = RULES) =>
    defineEditorPart(spotlight, {
        suggestions: [{ trigger: '#', labelKey: 'RichTextEditor_suggestions', rules, search, command: 'text.insert' }],
    });
const shownOptions = () => screen.queryAllByRole('option').map((option) => option.textContent);

/** Every text the editor's live region is given from now on, in order, without the clears before each message. */
const announcements = () => {
    const region = screen.getByTestId('fondue-rich-text-editor-announcer');
    const spoken: string[] = [];
    const append = region.append.bind(region);
    region.append = (...nodes) => {
        for (const node of nodes) {
            if (typeof node === 'string') {
                spoken.push(node);
            } else {
                spoken.push(node.textContent ?? '');
            }
        }

        append(...nodes);
    };

    return spoken;
};

describe('the suggestions of an editor part', () => {
    it('lists what its search finds after its own trigger, and runs its command with the accepted option', async () => {
        const asked: unknown[] = [];
        const plugin = tagPart((query, { api, cursor }) => {
            asked.push({ query, locale: api.locale(), cursor });

            return Promise.resolve({ items: [tag('a'), tag('b')], nextCursor: null });
        });
        const { handle } = mount([para()], [plugin]);

        act(() => {
            typeText(handle, '#t');
        });
        await vi.waitFor(() => {
            expect(shownOptions()).toEqual(['Tag a', 'Tag b']);
        });
        expect(screen.getByRole('listbox', { name: 'Suggestions' })).not.toBeNull();
        act(() => {
            pressKey(handle, 'Enter');
        });

        expect(asked).toEqual([{ query: 't', locale: 'en-US', cursor: null }]);
        const first = handle.getSnapshot().document.content.content?.[0];
        expect(first?.content).toEqual([text('a')]);
    });

    it('keeps the shown options and offers Retry when a further page fails, and says both by their visible labels', async () => {
        const plugin = tagPart((_query, { cursor }) => {
            if (cursor === null) {
                return Promise.resolve({ items: [tag('a'), tag('b')], nextCursor: 'page-2' });
            }

            return Promise.reject(new Error('offline'));
        });
        const { handle } = mount([para()], [plugin]);
        const spoken = announcements();

        act(() => {
            typeText(handle, '#t');
        });
        await vi.waitFor(() => {
            expect(shownOptions()).toEqual(['Tag a', 'Tag b', 'Load more']);
        });
        act(() => {
            pressKey(handle, 'ArrowUp');
        });
        await vi.waitFor(() => {
            expect(spoken.at(-1)).toBe('Load more, 3 of 3');
        });
        act(() => {
            pressKey(handle, 'Enter');
        });
        await vi.waitFor(() => {
            expect(shownOptions()).toEqual(['Tag a', 'Tag b', 'Retry']);
        });

        expect(document.querySelector('[data-row="failed"]')?.textContent).toBe('Search failed');
        await vi.waitFor(() => {
            expect(spoken.at(-1)).toBe('Search failed. Retry, 3 of 3');
        });
    });

    it('shows each key of a page once, and an option whose key names Load more or Retry beside Load more', async () => {
        const plugin = tagPart(() =>
            Promise.resolve({
                items: [tag('a'), tag('a', 'Tag a again'), tag('load-more'), tag('retry')],
                nextCursor: 'page-2',
            }),
        );
        const { handle } = mount([para()], [plugin]);

        act(() => {
            typeText(handle, '#t');
        });
        await vi.waitFor(() => {
            expect(shownOptions()).toEqual(['Tag a', 'Tag load-more', 'Tag retry', 'Load more']);
        });

        const ids = screen.getAllByRole('option').map((option) => option.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('opens no list and asks no search while it is not available, and leaves Escape to the host', async () => {
        const search = vi.fn(() => Promise.resolve({ items: [tag('a')], nextCursor: null }));
        const plugin = defineEditorPart(spotlight, {
            needs: ['services'],
            suggestions: [
                {
                    trigger: '#',
                    labelKey: 'RichTextEditor_suggestions',
                    rules: RULES,
                    available: (api) => api.services.references() !== undefined,
                    search,
                    command: 'text.insert',
                },
            ],
        });
        const { handle, container } = mount([para()], [plugin]);
        const escapes: boolean[] = [];
        container.addEventListener('keydown', (event) => escapes.push(event.defaultPrevented));

        act(() => {
            typeText(handle, '#t');
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(500);
        });
        act(() => {
            pressKey(handle, 'Escape');
        });

        expect(search).not.toHaveBeenCalled();
        expect(screen.queryByRole('listbox')).toBeNull();
        expect(escapes).toEqual([false]);
    });

    it('keeps the last option active when a further page adds only keys already shown, so Enter accepts it', async () => {
        const plugin = tagPart((_query, { cursor }) => {
            if (cursor === null) {
                return Promise.resolve({ items: [tag('a'), tag('b')], nextCursor: 'page-2' });
            }

            return Promise.resolve({ items: [tag('a'), tag('b')], nextCursor: null });
        });
        const { handle } = mount([para()], [plugin]);

        act(() => {
            typeText(handle, '#t');
        });
        await vi.waitFor(() => {
            expect(shownOptions()).toEqual(['Tag a', 'Tag b', 'Load more']);
        });
        act(() => {
            pressKey(handle, 'ArrowUp');
        });
        act(() => {
            pressKey(handle, 'Enter');
        });
        await vi.waitFor(() => {
            expect(shownOptions()).toEqual(['Tag a', 'Tag b']);
        });
        act(() => {
            pressKey(handle, 'Enter');
        });

        const first = handle.getSnapshot().document.content.content?.[0];
        expect(first?.content).toEqual([text('b')]);
    });

    it.each([
        ['maxQuery', { ...RULES, maxQuery: 0 }],
        ['maxQuery', { ...RULES, maxQuery: 2.5 }],
        ['maxQuery', { ...RULES, maxQuery: Number.POSITIVE_INFINITY }],
        ['leadingLetters', { ...RULES, leadingLetters: -1 }],
        ['leadingLetters', { ...RULES, leadingLetters: 0.5 }],
        ['leadingLetters', { ...RULES, maxQuery: 2, leadingLetters: 3 }],
    ])('refuses a %s of %j', (field, rules) => {
        const plugin = tagPart(() => Promise.resolve({ items: [], nextCursor: null }), rules);

        expect(() => defineEditor({ id: 'fixture.parts', model, plugins: unitsOf(model, [plugin]) })).toThrow(
            expect.objectContaining({
                code: 'definition.invalid-declaration',
                details: { feature: 'fixture.spotlight', path: `/suggestions/0/rules/${field}` },
            }),
        );
    });

    it('builds the pattern of its leading letters once, however many queries it reads', () => {
        const built = vi.fn();
        const Original = RegExp;
        vi.stubGlobal(
            'RegExp',
            new Proxy(Original, {
                construct: (target, args: [string, string?]) => {
                    built(args[0]);

                    return Reflect.construct(target, args);
                },
            }),
        );
        try {
            const plugin = tagPart(() => Promise.resolve({ items: [], nextCursor: null }));
            const { handle } = mount([para()], [plugin]);

            act(() => {
                typeText(handle, '#tags');
            });
        } finally {
            vi.unstubAllGlobals();
        }

        // An earlier list of the same count may have built it already.
        expect(built.mock.calls.filter(([source]) => source === String.raw`^\p{L}{1}`).length).toBeLessThanOrEqual(1);
    });

    it('drops a page that resolves after a newer query, and applies no page of a search the list aborted', async () => {
        const pending: Array<{ query: string; signal: AbortSignal; resolve: (value: SuggestionPage) => void }> = [];
        const plugin = tagPart(
            (query, { signal }) =>
                new Promise((resolve) => {
                    pending.push({ query, signal, resolve });
                }),
        );
        const { handle } = mount([para()], [plugin]);

        act(() => {
            typeText(handle, '#t');
        });
        await vi.waitFor(() => {
            expect(pending.map(({ query }) => query)).toEqual(['t']);
        });
        act(() => {
            typeText(handle, 'a');
        });
        await vi.waitFor(() => {
            expect(pending.map(({ query }) => query)).toEqual(['t', 'ta']);
        });
        await act(async () => {
            pending[0]?.resolve({ items: [tag('old')], nextCursor: null });
            await Promise.resolve();
        });

        expect(pending[0]?.signal.aborted).toBe(true);
        expect(shownOptions()).toEqual([]);

        act(() => {
            pressKey(handle, 'Escape');
        });
        await act(async () => {
            pending[1]?.resolve({ items: [tag('late')], nextCursor: null });
            await Promise.resolve();
        });

        expect(pending[1]?.signal.aborted).toBe(true);
        expect(shownOptions()).toEqual([]);
        expect(screen.queryByRole('listbox')).toBeNull();
    });
});

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
        ['node view', { views: [{ node: 'ghost', component: () => null }] }, '/nodeViews/ghost'],
        [
            'decoration source',
            { decorations: [{ id: 'fixture.ghost', nodes: ['ghost'], derive: () => [] }] },
            '/decorations/0/nodes',
        ],
    ] as const)('refuses a %s that names what no part or feature of the definition has', (_kind, parts, path) => {
        const plugin = defineEditorPart(spotlight, parts as unknown as EditorPartSpec);

        expect(() => defineEditor({ id: 'fixture.parts', model, plugins: unitsOf(model, [plugin]) })).toThrow(
            expect.objectContaining({
                code: 'definition.orphan-behavior',
                details: expect.objectContaining({ feature: 'fixture.spotlight', path }) as unknown,
            }),
        );
    });

    it('refuses a model that installs the feature of a content check repair when no part registers its command', () => {
        const languages = compileContentModel([core(), language()], { id: 'fixture.parts', version: 1 });
        const plugin = defineEditorPart(language, {});

        const bare = definePlugin({ feature: language, editor: plugin })();

        expect(() => defineEditor({ id: 'fixture.parts', model: languages, plugins: [corePlugin(), bare] })).toThrow(
            expect.objectContaining({
                code: 'definition.orphan-behavior',
                details: { feature: 'marks.language', path: '/repairs/mark.language.edit' },
            }),
        );
    });
});
