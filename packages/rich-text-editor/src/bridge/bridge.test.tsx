/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { EditorView } from 'prosemirror-view';
import { Profiler, StrictMode, createRef } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import { fixtureChrome } from '#/features/__fixtures__/chrome/feature';
import { fixtureChromeViews, popupListeners } from '#/features/__fixtures__/chrome/view';
import { fixtureList } from '#/features/__fixtures__/features';
import { fixtureProfiles } from '#/features/__fixtures__/profiles';
import { core } from '#/features/core/feature';
import {
    defineEditor,
    defineNodeView,
    defineReactPresentation,
    type EditorHandle,
    type NodeViewState,
    RichTextEditor,
    useRichTextNodeView,
} from '#/index';
import { deDE } from '#/locales/de-DE';
import { enUS } from '#/locales/en-US';
import {
    compileContentModel,
    DefinitionError,
    type Diagnostic,
    type Feature,
    type JsonValue,
    type RichTextLocale,
} from '#/model';
import { viewsOf } from '#/react/define';
import { defineReaderFeature, type ReaderNodeProps, RichTextReader } from '#/reader';
import { type EditorRuntime, type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { createTestEnvironment, setSelection, typeText } from '#/testing';
import { probeRuntimes } from '#/testing/probe';

import { createPortalStore, type PortalEntry, type PortalStore } from './portals';

vi.mock('#/bridge/portals', { spy: true });
vi.mock('react-dom/client', { spy: true });

const { createPortalStore: actualStore } = await vi.importActual<{
    readonly createPortalStore: typeof createPortalStore;
}>('./portals');

const modelOf = (features: readonly Feature[]) =>
    compileContentModel([core(), ...features], { id: 'test.bridge', version: 1 });
const model = modelOf([fixtureChromeViews(), fixtureList()]);
const definition = defineEditor({ id: 'test.bridge', model });

const text = (value: string) => ({ type: 'text', text: value });
const para = (...content: readonly JsonValue[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const mention = (nodeId: string, label = 'Ada') => ({ type: 'chrome_mention', attrs: { nodeId, label } });
const block = (nodeId: string, value = '', language = 'plain') => {
    const content: JsonValue[] = [];
    if (value !== '') {
        content.push(text(value));
    }
    return { type: 'chrome_block', attrs: { nodeId, language, checked: false }, content };
};
const list = (...items: readonly string[]) => ({
    type: 'bullet_list',
    attrs: {},
    content: items.map((item) => ({ type: 'list_item', attrs: {}, content: [para(text(item))] })),
});
const stored = (...blocks: readonly JsonValue[]) => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: model.ref,
        requiredCapabilities: [
            { id: 'core', version: 1 },
            { id: 'fixture.chrome', version: 1 },
            { id: 'fixture.list', version: 1 },
        ],
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    } as never,
});

/** The portal stores the editors mounted so far created, each with a count of its live subscribers. */
const stores: { readonly store: PortalStore; readonly subscribers: () => number }[] = [];
vi.mocked(createPortalStore).mockImplementation((scheduler) => {
    const store = actualStore(scheduler);
    let subscribers = 0;
    stores.push({ store, subscribers: () => subscribers });
    return {
        ...store,
        subscribe: (listener) => {
            subscribers += 1;
            const unsubscribe = store.subscribe(listener);
            return () => {
                subscribers -= 1;
                unsubscribe();
            };
        },
    };
});
const lastStore = () => {
    const last = stores.at(-1);
    if (last === undefined) {
        throw new Error('no portal store');
    }
    return last;
};

/** Mounts an editor of `blocks` with a test environment, then runs its portal flush and its first frame, as a browser does. */
const mount = async (
    blocks: readonly JsonValue[],
    props: { readonly definition?: typeof definition; readonly locale?: RichTextLocale } = {},
) => {
    const environment = createTestEnvironment({ seed: 1 });
    const ref = createRef<EditorHandle<object>>();
    const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
    const view = render(
        <RichTextEditor
            aria-label="Notes"
            definition={props.definition ?? definition}
            defaultValue={stored(...blocks)}
            locale={props.locale ?? enUS}
            environment={environment}
            onDiagnostic={onDiagnostic}
            ref={ref}
        />,
    );
    await act(() => environment.flushMicrotasks());
    act(() => environment.flushFrames());
    const handle = () => {
        if (ref.current === null) {
            throw new Error('no handle');
        }
        return ref.current;
    };
    const runtime = (): EditorRuntime => {
        const found = runtimeOf(handle());
        if (found === undefined) {
            throw new Error('no runtime');
        }
        return found;
    };
    const editorView = () => {
        const attached = runtime().view;
        if (attached === undefined) {
            throw new Error('no view');
        }
        return attached;
    };
    const flush = () => act(() => environment.flushMicrotasks());
    return { ...view, environment, handle, runtime, editorView, flush, onDiagnostic };
};

const mentions = (count: number) =>
    Array.from({ length: count }, (_, index) => `<span data-chrome-mention="m${index}" data-label="Ada"></span>`).join(
        '',
    );
const surface = () => screen.getByRole('textbox', { name: 'Notes' });
const commandsOf = (handle: EditorHandle<object>) => handle as unknown as Pick<RuntimeHandle, 'execute' | 'query'>;

describe('the React bridge', () => {
    it('SPEC-rich-text-react/AC-007 renders the chrome of 200 mentions from one portal host and no nested React root', async () => {
        const createRoot = vi.mocked(ReactDOMClient.createRoot);
        createRoot.mockClear();
        const ids = Array.from({ length: 200 }, (_, index) => mention(`m${index}`));
        const { unmount } = await mount([para(...ids)]);

        expect(surface().querySelectorAll('[data-chrome="mention"]')).toHaveLength(200);
        expect(lastStore().subscribers()).toBe(1);
        expect(createRoot).not.toHaveBeenCalled();
        unmount();
    });

    it('SPEC-rich-text-react/AC-008 notifies the portal store once for 500 pasted mentions', async () => {
        const { editorView, flush, unmount } = await mount([para(text('a'))]);
        const listener = vi.fn();
        const unsubscribe = lastStore().store.subscribe(listener);

        act(() => {
            editorView().pasteHTML(`<p>${mentions(500)}</p>`);
        });
        await flush();

        expect(surface().querySelectorAll('[data-chrome="mention"]')).toHaveLength(500);
        expect(listener).toHaveBeenCalledTimes(1);
        unsubscribe();
        unmount();
    });

    it('SPEC-rich-text-react/AC-010 pastes 500 mentions whose chrome sets state in a mount effect with no React error', async () => {
        const errors = vi.spyOn(console, 'error');
        const { editorView, flush, unmount } = await mount([para(text('a'))]);

        act(() => {
            editorView().pasteHTML(`<p>${mentions(500)}</p>`);
        });
        await flush();

        expect(surface().querySelectorAll('[data-mounted]')).toHaveLength(500);
        expect(errors).not.toHaveBeenCalled();
        errors.mockRestore();
        unmount();
    });

    it('SPEC-rich-text-react/AC-014 keeps the chrome element and its React state when a code block changes language', async () => {
        const { runtime, flush, unmount } = await mount([block('b1', 'code')]);
        const chrome = surface().querySelector('[data-chrome="block"]');
        fireEvent.click(surface().querySelector('[data-clicks]') as HTMLElement);

        act(() => {
            expect(runtime().nodeActions('b1').update({ language: 'typescript' })).toMatchObject({ status: 'applied' });
        });
        await flush();

        expect(surface().querySelector('[data-chrome="block"]')).toBe(chrome);
        expect(surface().querySelector('[data-clicks]')).toHaveTextContent('1');
        expect(surface().querySelector('[data-language]')).toHaveTextContent('typescript');
        unmount();
    });

    it('SPEC-rich-text-react/AC-019 runs delayed update, query, execute, select and remove actions on their own nodes after a preceding paragraph is deleted', async () => {
        type ChromeCommands = {
            readonly 'fixture.chrome-block.set': undefined;
            readonly 'fixture.chrome-block.unset': undefined;
        };
        const captured = new Map<string, NodeViewState<ChromeCommands>>();
        const Capture = () => {
            const state = useRichTextNodeView<ChromeCommands>();
            captured.set(state.nodeId, state);
            return null;
        };
        const capturing = defineEditor({
            id: 'test.bridge',
            model: modelOf([defineNodeView(fixtureChrome(), { node: 'chrome_block', component: Capture })]),
        });
        const { editorView, handle, unmount } = await mount(
            [para(text('first')), block('b1', 'code'), block('b2', 'two'), para(text('after'))],
            { definition: capturing },
        );
        const first = captured.get('b1') as NodeViewState<ChromeCommands>;
        const second = captured.get('b2') as NodeViewState<ChromeCommands>;

        act(() => {
            const view = editorView();
            view.dispatch(view.state.tr.delete(0, view.state.doc.child(0).nodeSize));
        });
        // The caret sits in another paragraph, so an action that took the selection would change that one.
        act(() => setSelection(handle(), { text: 'after', from: 5, to: 5 }));
        const results: unknown[] = [];
        act(() => {
            results.push(first.update({ language: 'rust' }));
        });
        const updated = handle().getSnapshot().document.content.content;
        const queried = second.query('fixture.chrome-block.set');
        act(() => {
            results.push(second.execute('fixture.chrome-block.unset'));
        });
        act(() => first.select());
        const selected = handle().getSummary().selection.selectedNodeId;
        act(() => {
            results.push(first.remove());
        });

        expect(results).toMatchObject([{ status: 'applied' }, { status: 'applied' }, { status: 'applied' }]);
        expect(updated).toMatchObject([{ attrs: { nodeId: 'b1', language: 'rust' } }, { attrs: { nodeId: 'b2' } }, {}]);
        expect(queried).toEqual({ enabled: false, active: true, disabledReason: 'not-applicable' });
        expect(selected).toBe('b1');
        expect(handle().getSnapshot().document.content.content).toEqual([para(text('two')), para(text('after'))]);
        unmount();
    });

    it('SPEC-rich-text-react/AC-019 types the node view state with no position', () => {
        expectTypeOf<keyof NodeViewState>().toEqualTypeOf<
            'nodeId' | 'attrs' | 'selected' | 'context' | 'update' | 'remove' | 'select' | 'execute' | 'query'
        >();
    });

    it('SPEC-rich-text-react/AC-020 releases every resource of a selected mention deleted with its popup open', async () => {
        const { editorView, handle, flush, unmount } = await mount([para(text('a'), mention('m1'))]);
        const before = probeRuntimes();
        fireEvent.click(surface().querySelector('[data-chrome="mention"] button') as HTMLElement);
        expect(surface().querySelector('[data-popup]')).not.toBeNull();
        const listening = popupListeners.count;

        act(() => {
            setSelection(handle(), { nodeId: 'm1' });
            const view = editorView();
            view.dispatch(view.state.tr.deleteSelection());
        });
        await flush();

        expect(listening).toBe(1);
        expect(popupListeners.count).toBe(0);
        expect(before).toMatchObject({ nodeViews: 1, portals: 1 });
        expect(probeRuntimes()).toMatchObject({ nodeViews: 0, portals: 0, frames: 0 });
        expect(document.querySelector('[data-popup]')).toBeNull();
        unmount();
    });

    it('SPEC-rich-text-react/AC-021 replaces only a throwing chrome with the localized fallback while editing goes on', async () => {
        const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const Throwing = () => {
            throw new Error('chrome failed');
        };
        const throwing = defineEditor({
            id: 'test.bridge',
            model: modelOf([defineNodeView(fixtureChromeViews(), { node: 'chrome_block', component: Throwing })]),
        });
        const { handle, unmount } = await mount([block('b1', 'code'), para(mention('m1'))], { definition: throwing });

        expect(surface().querySelector('[data-rte-chrome]')).toHaveTextContent(
            'This part of the content cannot be shown',
        );
        expect(surface().querySelector('[data-chrome="mention"]')).not.toBeNull();
        act(() => {
            setSelection(handle(), { text: 'code', from: 4, to: 4 });
            typeText(handle(), 'x');
        });

        expect(surface().querySelector('[data-rte-chrome] + div')).toHaveTextContent('codex');
        expect(handle().getSnapshot().document.content).toMatchObject({ content: [{ content: [text('codex')] }, {}] });
        errors.mockRestore();
        unmount();
    });

    it('SPEC-rich-text-react/AC-014 keeps chrome for new attributes of the same nodeId and, by DR-072, builds new chrome for a node with another nodeId', async () => {
        const { editorView, handle, runtime, flush, unmount } = await mount([para(text('a'), mention('m1'))]);
        fireEvent.click(surface().querySelector('[data-chrome="mention"] button') as HTMLElement);
        const chrome = surface().querySelector('[data-chrome="mention"]');

        act(() => {
            expect(runtime().nodeActions('m1').update({ label: 'Cy' })).toMatchObject({ status: 'applied' });
        });
        await flush();
        expect(surface().querySelector('[data-chrome="mention"]')).toBe(chrome);
        expect(surface().querySelector('[data-chrome="mention"] button')).toHaveTextContent('Cy');
        expect(surface().querySelector('[data-popup]')).not.toBeNull();

        act(() => {
            setSelection(handle(), { nodeId: 'm1' });
            editorView().pasteHTML('<span data-chrome-mention="m3" data-label="Bea"></span>');
        });
        await flush();

        expect(surface().querySelector('[data-chrome="mention"]')).not.toBe(chrome);
        expect(surface().querySelector('[data-chrome="mention"] button')).toHaveTextContent('Bea');
        expect(surface().querySelector('[data-popup]')).toBeNull();
        unmount();
    });

    it('SPEC-rich-text-react/AC-021 SPEC-rich-text-react/AC-102 runs a host command after chrome throws on an update', async () => {
        const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const BoomMention = () => {
            const { attrs } = useRichTextNodeView();
            if (attrs.label === 'boom') {
                throw new Error('chrome failed');
            }
            return <span data-chrome="boom-mention">mention</span>;
        };
        const booming = defineEditor({
            id: 'test.bridge',
            model: modelOf([defineNodeView(fixtureChromeViews(), { node: 'chrome_mention', component: BoomMention })]),
        });
        const { handle, runtime, flush, onDiagnostic, unmount } = await mount([para(text('ab'), mention('m1'))], {
            definition: booming,
        });

        act(() => {
            runtime().nodeActions('m1').update({ label: 'boom' });
        });
        await flush();

        expect(surface().querySelector('[data-rte-chrome]')).toHaveTextContent(
            'This part of the content cannot be shown',
        );
        expect(commandsOf(handle()).execute('text.insert', { text: 'x' }).status).toBe('applied');
        expect(onDiagnostic.mock.calls.map(([{ code }]) => code)).not.toContain('react.execute-in-render');
        errors.mockRestore();
        unmount();
    });

    it('SPEC-rich-text-react/AC-021 renders chrome again once an update changes the attribute it threw for', async () => {
        const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const Strict = () => {
            const { attrs } = useRichTextNodeView<object>();
            if (attrs.language === 'boom') {
                throw new Error('chrome failed');
            }
            return <span data-test-chrome="" />;
        };
        const strict = defineEditor({
            id: 'test.bridge',
            model: modelOf([defineNodeView(fixtureChrome(), { node: 'chrome_block', component: Strict })]),
        });
        const { runtime, handle, flush, unmount } = await mount([block('b1', 'code', 'boom')], {
            definition: strict,
            locale: deDE,
        });
        const fallback = deDE.translationStrings.RichTextEditor_nodeViewError;
        expect(surface().querySelector('[data-rte-chrome]')).toHaveTextContent(fallback);
        const thrown = errors.mock.calls.length;

        // A selection-only publish keeps the attributes, so the boundary keeps its fallback and renders nothing that throws.
        act(() => setSelection(handle(), { nodeId: 'b1' }));
        await flush();
        expect(surface().querySelector('[data-chrome="block"], [data-test-chrome]')).toBeNull();
        expect(surface().querySelector('[data-rte-chrome]')).toHaveTextContent(fallback);
        expect(errors.mock.calls.length).toBe(thrown);

        act(() => {
            runtime().nodeActions('b1').update({ language: 'typescript' });
        });
        await flush();

        expect(surface().querySelector('[data-test-chrome]')).not.toBeNull();
        errors.mockRestore();
        unmount();
    });

    it('SPEC-rich-text-react/AC-021 catches chrome that throws again after an update to another failing value', async () => {
        const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const Strict = () => {
            const { attrs } = useRichTextNodeView<object>();
            if (attrs.language === 'boom' || attrs.language === 'boom2') {
                throw new Error('chrome failed');
            }
            return <span data-test-chrome="" />;
        };
        const strict = defineEditor({
            id: 'test.bridge',
            model: modelOf([defineNodeView(fixtureChrome(), { node: 'chrome_block', component: Strict })]),
        });
        const { runtime, flush, unmount } = await mount([block('b1', 'code', 'boom')], { definition: strict });
        const fallback = enUS.translationStrings.RichTextEditor_nodeViewError;
        const firstRender = errors.mock.calls.length;

        act(() => {
            runtime().nodeActions('b1').update({ language: 'boom2' });
        });
        await flush();

        expect(firstRender).toBeGreaterThan(0);
        // The boundary tried the chrome once more and caught it, so the root logged one more failed render and kept the surface.
        expect(errors.mock.calls.length).toBe(2 * firstRender);
        expect(surface().querySelector('[data-rte-chrome]')).toHaveTextContent(fallback);
        expect(surface().querySelector('[data-rte-chrome] + div')).toHaveTextContent('code');
        errors.mockRestore();
        unmount();
    });

    it('SPEC-rich-text-react/AC-097 registers no node view for native nodes and renders nothing while typing in a list', async () => {
        const native = ['paragraph', 'heading', 'text', 'bullet_list', 'list_item', 'table_row', 'table_cell'];
        const lists = [...Object.values(fixtureProfiles()), [core(), fixtureChromeViews(), fixtureList()]];
        const registered = lists.map((features) =>
            viewsOf(defineEditor({ id: 'test.profile', model: modelOf(features.slice(1)) })),
        );
        for (const views of registered) {
            expect(native.filter((name) => views.has(name))).toEqual([]);
        }
        // The loop reads registered views, so a view on a native node would show here.
        const chromeViews = registered[registered.length - 1] as ReadonlyMap<string, unknown>;
        expect([...chromeViews.keys()].sort()).toEqual(['chrome_block', 'chrome_image', 'chrome_mention']);
        const commits = vi.fn();
        const environment = createTestEnvironment({ seed: 1 });
        const ref = createRef<EditorHandle<object>>();
        const { unmount } = render(
            <Profiler id="editor" onRender={commits}>
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={stored(list('one'), para(mention('m1')))}
                    environment={environment}
                    ref={ref}
                />
            </Profiler>,
        );
        await act(() => environment.flushMicrotasks());
        act(() => environment.flushFrames());
        const handle = ref.current as EditorHandle<object>;
        commits.mockClear();

        act(() => setSelection(handle, { text: 'one', from: 3, to: 3 }));
        for (const character of 'typed') {
            act(() => typeText(handle, character));
            await act(() => environment.flushMicrotasks());
        }

        expect(surface().querySelector('li')).toHaveTextContent('onetyped');
        // Only the mention has a node view, so a list or list item view would raise this count.
        expect(probeRuntimes().nodeViews).toBe(1);
        expect(commits).not.toHaveBeenCalled();
        unmount();
    });

    it('SPEC-rich-text/AC-014 keeps one editor unchanged while another from the same definition types, undoes and opens a popup', async () => {
        const first = await mount([para(text('a'), mention('m1'))]);
        const firstSurface = surface();
        const second = await mount([para(text('a'), mention('m1'))]);
        const surfaces = screen.getAllByRole('textbox', { name: 'Notes' });
        const otherSurface = surfaces.find((element) => element !== firstSurface) as HTMLElement;
        const before = {
            document: second.handle().getSnapshot().document,
            undo: commandsOf(second.handle()).query('history.undo'),
            selection: second.handle().getSummary().selection,
        };

        act(() => {
            setSelection(first.handle(), { text: 'a', from: 1, to: 1 });
            typeText(first.handle(), 'bc');
        });
        const typed = first.handle().getSnapshot().document.content;
        const undoable = commandsOf(first.handle()).query('history.undo').enabled;
        let undone: unknown;
        act(() => {
            undone = commandsOf(first.handle()).execute('history.undo');
        });
        fireEvent.click(firstSurface.querySelector('[data-chrome="mention"] button') as HTMLElement);
        await first.flush();
        await second.flush();

        expect(typed).toMatchObject({ content: [{ content: [text('abc'), { type: 'chrome_mention' }] }] });
        expect(undoable).toBe(true);
        expect(undone).toMatchObject({ status: 'applied' });
        expect(first.handle().getSnapshot().document.content).toMatchObject({
            content: [{ content: [text('a'), { type: 'chrome_mention' }] }],
        });
        expect(firstSurface.querySelector('[data-popup]')).not.toBeNull();
        expect(otherSurface.querySelector('[data-popup]')).toBeNull();
        expect(second.handle().getSnapshot().document).toEqual(before.document);
        expect(commandsOf(second.handle()).query('history.undo')).toEqual(before.undo);
        expect(second.handle().getSummary().selection).toEqual(before.selection);
        first.unmount();
        second.unmount();
    });

    it('SPEC-rich-text-output/AC-003 renders the reader override and the node view chrome of one feature that attaches both, in either order', async () => {
        const Chrome = () => <span data-test-chrome="" />;
        const Reader = ({ attrs }: ReaderNodeProps) => <span data-test-reader="">{attrs.label as string}</span>;
        const view = { node: 'chrome_mention', component: Chrome };
        const overrides = { chrome_mention: Reader };
        for (const feature of [
            defineReaderFeature(defineNodeView(fixtureChrome(), view), overrides),
            defineNodeView(defineReaderFeature(fixtureChrome(), overrides), view),
        ]) {
            const both = modelOf([feature]);
            const document = stored(para(mention('m1'))).document;
            const editor = await mount([para(mention('m1'))], {
                definition: defineEditor({ id: 'test.bridge', model: both }),
            });
            expect(surface().querySelector('[data-test-chrome]')).not.toBeNull();
            editor.unmount();

            const reader = render(<RichTextReader document={document} model={both} />);
            expect(reader.container.querySelector('[data-test-reader]')).toHaveTextContent('Ada');
            reader.unmount();
        }
    });

    it('SPEC-rich-text/AC-021 rejects a node view for a node that no installed feature declares', () => {
        const orphan = defineNodeView(core(), { node: 'chrome_block', component: () => null });
        let failure: unknown;
        try {
            defineEditor({
                id: 'test.orphan',
                model: compileContentModel([orphan], { id: 'test.orphan', version: 1 }),
            });
        } catch (error) {
            failure = error;
        }

        expect(failure).toBeInstanceOf(DefinitionError);
        expect(failure).toMatchObject({
            code: 'definition.orphan-behavior',
            details: { feature: 'core', path: '/nodeViews/chrome_block' },
        });
    });

    it('SPEC-rich-text-react/AC-006 keeps the portals of the view a remounted surface attaches', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const Layout = ({ surfaceKey }: { readonly surfaceKey: string }) => (
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={stored(para(mention('m1')))}
                environment={environment}
            >
                <RichTextEditor.Surface key={surfaceKey} />
            </RichTextEditor.Root>
        );
        const { rerender, unmount } = render(<Layout surfaceKey="a" />);
        await act(() => environment.flushMicrotasks());

        rerender(<Layout surfaceKey="b" />);
        await act(() => environment.flushMicrotasks());

        expect(probeRuntimes()).toMatchObject({ nodeViews: 1, portals: 1 });
        expect(surface().querySelector('[data-chrome="mention"]')).not.toBeNull();
        unmount();
    });

    it('SPEC-rich-text-runtime/AC-060 releases every node view and portal over 10 mount and unmount cycles, StrictMode included', async () => {
        for (let cycle = 0; cycle < 10; cycle += 1) {
            const environment = createTestEnvironment({ seed: 1 });
            const element = (
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={stored(block('b1', 'code'), para(mention('m1')))}
                    environment={environment}
                />
            );
            let wrapped = element;
            if (cycle % 2 === 1) {
                wrapped = <StrictMode>{element}</StrictMode>;
            }
            const { unmount } = render(wrapped);
            await act(() => environment.flushMicrotasks());
            expect(probeRuntimes()).toMatchObject({ nodeViews: 2, portals: 2 });
            unmount();
        }

        expect(probeRuntimes()).toMatchObject({ views: [], nodeViews: 0, portals: 0 });
    });

    it('SPEC-rich-text-react/AC-065 shows the label of a new presentation and the island label of a new locale with the same view and snapshot', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const ref = createRef<EditorHandle<object>>();
        const resolving = (label: string) =>
            defineReactPresentation({ resolveReference: () => ({ status: 'current', label }) });
        const editor = (label: string, locale: RichTextLocale) => (
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={stored(para(mention('m1')), { type: 'callout', content: [text('kept')] })}
                presentation={resolving(label)}
                locale={locale}
                environment={environment}
                ref={ref}
            />
        );
        const { rerender, unmount } = render(editor('Ada Lovelace', enUS));
        await act(() => environment.flushMicrotasks());
        act(() => environment.flushFrames());
        const mentionButton = () => surface().querySelector('[data-chrome="mention"] button');
        const handle = () => ref.current as EditorHandle<object>;
        const view = probeRuntimes().views[0];
        const snapshot = handle().getSnapshot();
        const { commitSequence } = handle().getSummary();
        expect(mentionButton()).toHaveTextContent('Ada Lovelace');
        expect(screen.getByRole('group')).toHaveAccessibleName('Unsupported content: callout');

        rerender(editor('Grace Hopper', deDE));

        expect(mentionButton()).toHaveTextContent('Grace Hopper');
        expect(screen.getByRole('group')).toHaveAccessibleName('Nicht unterstützter Inhalt: callout');
        expect(probeRuntimes().views).toEqual([view]);
        expect(handle().getSnapshot()).toBe(snapshot);
        expect(handle().getSummary().commitSequence).toBe(commitSequence);
        unmount();
    });

    it('SPEC-rich-text-runtime/AC-083 runs ready listeners after the first portal flush, with node chrome present', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const seen: boolean[] = [];
        const { unmount } = render(
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={stored(para(mention('m1')))}
                environment={environment}
                onReady={() => seen.push(document.querySelector('[data-chrome="mention"]') !== null)}
            />,
        );

        // A browser runs every microtask before the next frame.
        await act(() => environment.flushMicrotasks());
        act(() => environment.flushFrames());

        expect(seen).toEqual([true]);
        unmount();
    });
});

describe('node view faults', () => {
    /** Makes the next mounted editor's portal store throw when a node view publishes an entry `when` matches. */
    const throwingStore = (when: (state: PortalEntry['state']) => boolean) => {
        vi.mocked(createPortalStore).mockImplementationOnce((scheduler) => {
            const store = actualStore(scheduler);
            return {
                ...store,
                set: (entry) => {
                    if (when(entry.state)) {
                        throw new Error('node view failed');
                    }
                    store.set(entry);
                },
            };
        });
    };

    it('SPEC-rich-text-runtime/AC-014 faults once a node view update throws, with no error reaching ProseMirror', async () => {
        throwingStore((state) => state.attrs.language === 'boom');
        const updateState = vi.spyOn(EditorView.prototype, 'updateState');
        const { runtime, handle, onDiagnostic, flush, unmount } = await mount([block('b1', 'code')]);
        const { stamp } = handle().getSnapshot();
        updateState.mockClear();

        act(() => {
            runtime().nodeActions('b1').update({ language: 'boom' });
        });
        await flush();

        expect(handle().getSummary().phase).toBe('faulted');
        expect(onDiagnostic.mock.calls.filter(([{ code }]) => code === 'runtime.view-fault')).toHaveLength(1);
        expect(surface()).toHaveAttribute('contenteditable', 'false');
        expect(handle().getSnapshot().stamp).toEqual(stamp);
        expect(updateState.mock.results.map(({ type }) => type)).toEqual(['return']);
        expect(probeRuntimes().portals).toBe(0);
        expect(() => handle().dispose()).not.toThrow();
        updateState.mockRestore();
        unmount();
    });

    it('SPEC-rich-text-runtime/AC-071 faults when a node view constructor throws on first render and keeps the decoded document', async () => {
        throwingStore(() => true);
        const { handle, onDiagnostic, unmount } = await mount([block('b1', 'code')]);

        expect(handle().getSummary().phase).toBe('faulted');
        expect(onDiagnostic.mock.calls.map(([{ code }]) => code)).toEqual(['runtime.view-fault']);
        expect(handle().getSnapshot().stamp.sequence).toBe(0);
        expect(handle().getSnapshot().document.content.content).toEqual([
            {
                type: 'chrome_block',
                attrs: { nodeId: 'b1', language: 'plain', checked: false },
                content: [text('code')],
            },
        ]);
        unmount();
    });
});
