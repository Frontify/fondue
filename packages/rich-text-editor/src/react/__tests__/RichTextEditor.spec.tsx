/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { doc, envelope, link, node, text } from '#/features/__tests__/fixtures/documents';
import { fixtureMedia } from '#/features/__tests__/fixtures/features';
import { notesModel } from '#/features/__tests__/fixtures/notes';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import {
    vocabularyAlign,
    vocabularyBlocks,
    vocabularyColors,
    vocabularyIndent,
    vocabularyLink,
    vocabularyLists,
    vocabularyMarks,
    vocabularyMedia,
    vocabularyMention,
    vocabularyStyles,
    vocabularyTables,
} from '#/features/__tests__/fixtures/vocabulary';
import { core } from '#/features/core/feature';
import { links } from '#/features/links/feature';
import { deDE } from '#/locales/de-DE';
import { enUS } from '#/locales/en-US';
import { compileContentModel, defaultLimits, DefinitionError, type Diagnostic } from '#/model';
import * as model from '#/model';
import { type LoadedDocument, type PersistenceService } from '#/persistence/types';
import { fixturesIn } from '#/reader/__tests__/helpers/helpers';
import { type ReaderPresentation } from '#/reader/reader';
import { type AsyncOperation } from '#/runtime/async';
import * as schemaModule from '#/runtime/definition/schema';
import { runtimeOf } from '#/runtime/runtime';
import { type DocumentChange } from '#/runtime/types';
import { pressKey, probeRuntimes, setSelection, typeText } from '#/testing';

import { defineEditor } from '../define';
import { RichTextEditor } from '../RichTextEditor';
import { type EditorHandle, type ReactPresentation, type RichTextEditorProps } from '../types';

import {
    features,
    boldWith,
    definition,
    italicModel,
    otherDefinition,
    para,
    defaultValue,
    ALLOWED,
    mount,
    surface,
    undoOnce,
    viewOf,
} from './fixtures/editorHarness';

vi.mock('#/model', { spy: true });
vi.mock('#/runtime/definition/schema', { spy: true });

beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    vi.useRealTimers();
});

describe('RichTextEditor', () => {
    it('throws an error naming the missing root for a part outside it', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        expect(() => render(<RichTextEditor.Surface />)).toThrow(
            'RichTextEditor.Surface must be rendered inside RichTextEditor.Root.',
        );
        vi.mocked(console.error).mockRestore();
    });

    it('keeps the view, selection and plugins across 50 rerenders with new callbacks and locale', () => {
        const { handle, rerender, unmount } = mount();
        act(() => typeText(handle(), 'c'));
        setSelection(handle(), { text: 'b' });
        const view = viewOf();
        const { plugins, selection } = view.state;

        for (let index = 0; index < 50; index += 1) {
            rerender({
                onDocumentChange: () => index,
                onReady: () => index,
                locale: index % 2 === 0 ? deDE : enUS,
            });
        }

        expect(probeRuntimes().views).toEqual([view]);
        expect(view.state.plugins).toBe(plugins);
        expect(view.state.selection.eq(selection)).toBe(true);
        // The typed step is still the one undo step.
        expect(undoOnce(handle())).toEqual(['applied', false]);
        unmount();
    });

    it('keeps the view, selection, plugins and undo step across 50 rerenders that switch the Fondue theme', () => {
        const { handle, rerender, unmount } = mount({}, false, 'light');
        act(() => typeText(handle(), 'c'));
        setSelection(handle(), { text: 'b' });
        const view = viewOf();
        const { plugins, selection } = view.state;

        for (let index = 0; index < 50; index += 1) {
            rerender({ onDocumentChange: () => index }, index % 2 === 0 ? 'dark' : 'light');
        }

        expect(document.querySelector('.fondue-theme-provider')?.className).toMatch(/light|dark/);
        expect(probeRuntimes().views).toEqual([view]);
        expect(view.state.plugins).toBe(plugins);
        expect(view.state.selection.eq(selection)).toBe(true);
        expect(undoOnce(handle())).toEqual(['applied', false]);
        unmount();
    });

    it('calls the newest onDocumentChange', () => {
        const first = vi.fn();
        const second = vi.fn();
        const { handle, rerender, unmount } = mount({ onDocumentChange: first });

        rerender({ onDocumentChange: second });
        act(() => typeText(handle(), 'c'));

        expect(first).not.toHaveBeenCalled();
        expect(second).toHaveBeenCalledTimes(1);
        unmount();
    });

    it('aborts only the operations of the services member a rerender replaces', () => {
        const uploads = { upload: vi.fn(), releaseUnused: vi.fn() };
        const { handle, rerender, unmount } = mount({ services: { references: { search: vi.fn() }, uploads } });
        const view = viewOf();
        const start = (service: string) => {
            let started: AsyncOperation | undefined;
            act(() => {
                started = runtimeOf(handle())?.startAsync({
                    key: service,
                    service,
                    featureId: 'core',
                    action: 'create',
                    command: 'text.insert',
                    run: () => new Promise(() => undefined),
                });
            });

            return started;
        };

        const search = start('references');
        const upload = start('uploads');

        rerender({ services: { references: { search: vi.fn() }, uploads } });

        expect(search?.controller.signal.aborted).toBe(true);
        expect(upload?.controller.signal.aborted).toBe(false);
        expect(viewOf()).toBe(view);
        unmount();
    });

    it('leaves one view under StrictMode and nothing from the replayed attachment', () => {
        const plain = mount();
        const once = probeRuntimes();
        plain.unmount();

        const strict = mount({}, true);
        const twice = probeRuntimes();

        expect(twice.views).toHaveLength(1);
        expect({ subscriptions: twice.subscriptions, frames: twice.frames }).toEqual({
            subscriptions: once.subscriptions,
            frames: once.frames,
        });
        strict.unmount();
        expect(probeRuntimes()).toMatchObject({ views: [], installedFeatures: [], subscriptions: 0, frames: 0 });
    });

    it('destroys the view of a detached surface at once and attaches a new one', () => {
        const Layout = ({ surfaceKey }: { surfaceKey: string }) => (
            <RichTextEditor.Root aria-label="Notes" definition={definition} defaultValue={defaultValue()}>
                <RichTextEditor.Surface key={surfaceKey} />
            </RichTextEditor.Root>
        );
        const { rerender, unmount } = render(<Layout surfaceKey="a" />);
        const first = viewOf();

        rerender(<Layout surfaceKey="b" />);

        expect(first.isDestroyed).toBe(true);
        expect(probeRuntimes().views).toHaveLength(1);
        expect(viewOf().dom.isConnected).toBe(true);
        unmount();
    });

    it.each([
        ['the bold stand-in', definition],
        ['the italic stand-in', otherDefinition],
    ])('gives the surface its textbox semantics with %s', (_name, used) => {
        const { unmount } = mount({
            definition: used,
            id: 'notes',
            'aria-describedby': 'hint',
            'aria-errormessage': 'problem',
            status: 'error',
            required: true,
        });

        const textbox = surface();
        expect(textbox.getAttribute('id')).toBe('notes');
        expect(textbox.getAttribute('aria-multiline')).toBe('true');
        expect(textbox.getAttribute('aria-describedby')).toBe('hint');
        expect(textbox.getAttribute('aria-invalid')).toBe('true');
        expect(textbox.getAttribute('aria-errormessage')).toBe('problem');
        expect(textbox.getAttribute('aria-required')).toBe('true');
        expect(textbox.getAttribute('translate')).toBe('no');
        expect(textbox.getAttribute('contenteditable')).toBe('true');
        unmount();
    });

    it('keeps a read-only surface focusable with aria-readonly and tabindex 0', () => {
        const { unmount } = mount({ readOnly: true });

        expect(surface().getAttribute('aria-readonly')).toBe('true');
        expect(surface().getAttribute('tabindex')).toBe('0');
        expect(surface().getAttribute('contenteditable')).toBe('false');
        unmount();
    });

    it('shows the placeholder through attributes, never as document text', () => {
        const { container, unmount } = mount({ placeholder: 'Write a note', defaultValue: defaultValue() });

        expect(surface().getAttribute('aria-placeholder')).toBe('Write a note');
        expect(surface().hasAttribute('data-rte-empty')).toBe(true);
        expect(surface().textContent).toBe('');
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });

    it('keeps the mounted definition when the prop changes, and a new key mounts the new one', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const { handle, rerender, unmount } = mount();
        act(() => typeText(handle(), 'c'));
        const view = viewOf();
        const { schema } = view.state;

        rerender({ definition: otherDefinition });
        expect(viewOf()).toBe(view);
        expect(viewOf().state.schema).toBe(schema);
        expect(undoOnce(handle())).toEqual(['applied', false]);

        unmount();
        const remounted = mount({ definition: otherDefinition });
        expect(viewOf().state.schema).not.toBe(schema);
        expect(viewOf().state.schema.marks.italic).toBeDefined();
        expect(schema.marks.italic).toBeUndefined();
        remounted.unmount();
        vi.mocked(console.error).mockRestore();
    });

    it('reports one react.definition-changed warning per change after mount', () => {
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const { rerender, unmount } = mount({ onDiagnostic });

        rerender({ onDiagnostic, definition: otherDefinition });
        rerender({ onDiagnostic, definition, profile: 'comment' });

        expect(onDiagnostic.mock.calls.map(([diagnostic]) => diagnostic)).toEqual([
            { code: 'react.definition-changed', severity: 'warning', messageKey: 'react.definition-changed' },
            { code: 'react.definition-changed', severity: 'warning', messageKey: 'react.definition-changed' },
        ]);
        unmount();
    });

    it('reports no definition change in a production build', () => {
        vi.stubEnv('NODE_ENV', 'production');
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const { rerender, unmount } = mount({ onDiagnostic });

        rerender({ onDiagnostic, definition: otherDefinition });

        expect(onDiagnostic).not.toHaveBeenCalled();
        unmount();
        vi.unstubAllEnvs();
    });

    it('keeps the surface uneditable and the root busy until the first frame', () => {
        const { container, unmount } = render(
            <RichTextEditor aria-label="Notes" definition={definition} defaultValue={defaultValue()} />,
        );

        expect(container.querySelector('[contenteditable="true"]')).toBeNull();
        expect(container.firstElementChild?.getAttribute('aria-busy')).toBe('true');
        act(() => {
            vi.runAllTimers();
        });
        expect(surface().getAttribute('contenteditable')).toBe('true');
        expect(container.firstElementChild?.hasAttribute('aria-busy')).toBe(false);
        unmount();
    });

    it('spellchecks by default, in the document language, and not when turned off', () => {
        const first = mount();
        expect(surface().getAttribute('spellcheck')).toBe('true');
        expect(surface().getAttribute('lang')).toBe('en-US');
        first.unmount();

        const off = mount({ spellCheck: false, locale: deDE });
        expect(surface().getAttribute('spellcheck')).toBe('false');
        expect(surface().getAttribute('lang')).toBe('de-DE');
        off.unmount();

        const french = defaultValue(para({ type: 'text', text: 'ab' }));
        const stored = {
            ...french.document,
            content: { ...french.document.content, attrs: { lang: 'fr-FR', dir: 'auto' } },
        };
        const declared = mount({ defaultValue: { ...french, document: stored }, locale: deDE });
        expect(surface().getAttribute('lang')).toBe('fr-FR');
        declared.unmount();
    });

    it('reads tabMovesFocus and scrollSelectionIntoView on each use, with no new view', () => {
        const { rerender, unmount } = mount();
        const view = viewOf();
        const skipsScroll = () => view.someProp('handleScrollToSelection', (handle) => handle(view)) === true;
        const tab = () => {
            const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
            view.dom.dispatchEvent(event);

            return event.defaultPrevented;
        };

        const keyDown = vi.fn(() => true);
        view.setProps({ handleKeyDown: keyDown });
        expect(skipsScroll()).toBe(false);
        tab();
        expect(keyDown).toHaveBeenCalledTimes(1);

        rerender({ scrollSelectionIntoView: false, tabMovesFocus: true });
        expect(skipsScroll()).toBe(true);
        expect(tab()).toBe(false);
        expect(keyDown).toHaveBeenCalledTimes(1);

        rerender({ scrollSelectionIntoView: true, tabMovesFocus: false });
        expect(skipsScroll()).toBe(false);
        tab();
        expect(keyDown).toHaveBeenCalledTimes(2);
        expect(probeRuntimes().views).toEqual([view]);
        unmount();
    });

    it('takes no focus callback beyond onFocus and onBlur', () => {
        expectTypeOf<Extract<keyof RichTextEditorProps, `on${string}${'Focus' | 'Blur'}${string}`>>().toEqualTypeOf<
            'onFocus' | 'onBlur'
        >();
    });

    it('keeps the presentation fields it shares with the reader at the types the reader declares', () => {
        type Shared = 'styles' | 'colorTokens' | 'listLevels' | 'columns' | 'columnGap' | 'contentClassName';
        expectTypeOf<Pick<ReactPresentation, Shared>>().toEqualTypeOf<Pick<ReaderPresentation, Shared>>();
        expectTypeOf<ReactPresentation>().toExtend<ReaderPresentation>();
    });

    it('compiles and builds the schema once across ten rerenders and a StrictMode remount', () => {
        const compile = vi.mocked(model.compileContentModel);
        const build = vi.mocked(schemaModule.buildSchema);
        compile.mockClear();
        build.mockClear();
        const onceModel = compileContentModel(features, { id: 'test.editor', version: 1 });
        const once = defineEditor({ id: 'test.once', model: onceModel, plugins: unitsOf(onceModel) });

        const { rerender, unmount } = mount({ definition: once }, true);
        for (let index = 0; index < 10; index += 1) {
            rerender({ definition: once, onReady: () => index });
        }

        expect(compile).toHaveBeenCalledTimes(1);
        expect(build).toHaveBeenCalledTimes(1);
        unmount();
    });

    it('runs a custom model with an outside feature in place of a profile', () => {
        const custom = defineEditor({ id: 'test.custom', model: italicModel, plugins: unitsOf(italicModel) });
        const changes: DocumentChange[] = [];
        const italic = { type: 'text', text: 'ab', marks: [{ type: 'italic' }] };
        const { handle, unmount } = mount({
            definition: custom,
            defaultValue: defaultValue(para(italic)),
            onDocumentChange: (change) => changes.push(change),
        });
        expect(surface().querySelector('em')?.textContent).toBe('ab');

        act(() => {
            setSelection(handle(), { text: 'ab' });
            pressKey(handle(), 'Mod-b');
        });

        expect(surface().querySelector('strong em, em strong')?.textContent).toBe('ab');
        expect(changes).toHaveLength(1);
        expect(changes[0]?.readDocument().content.content).toEqual([
            para({ type: 'text', text: 'ab', marks: [{ type: 'bold' }, { type: 'italic' }] }),
        ]);
        unmount();
    });

    it('rejects a function, a regular expression and a component in remote policy values', () => {
        for (const [value, path] of [
            [() => true, '/policy/features/core/create'],
            [/x/, '/policy/features/core/create'],
            [{ $$typeof: Symbol.for('react.element') }, '/policy/features/core/create/$$typeof'],
        ] as const) {
            const policy = { features: { core: { create: value } } } as never;
            let failure: unknown;
            try {
                boldWith('test.remote', { policy });
            } catch (error) {
                failure = error;
            }

            expect(failure).toBeInstanceOf(DefinitionError);
            expect(failure).toMatchObject({ code: 'definition.invalid-option', details: { path } });
        }
    });

    it('rejects a policy for a feature the model does not install', () => {
        let failure: unknown;
        try {
            boldWith('test.policy', { policy: { features: { 'marks.italic': ALLOWED } } });
        } catch (error) {
            failure = error;
        }

        expect(failure).toBeInstanceOf(DefinitionError);
        expect(failure).toMatchObject({
            code: 'definition.unknown-policy-feature',
            details: { feature: 'marks.italic' },
        });
    });

    it('keeps the engine out of the definition a host holds', () => {
        expect(Object.keys(definition)).toEqual(['id', 'model', 'capabilities', 'authoring', 'limits']);
        expect(Object.getOwnPropertySymbols(definition)).toEqual([]);
    });

    it('keeps negative or non-finite limits out of the definition', () => {
        const limited = boldWith('test.limits', {
            limits: { maxDepth: -1, maxTextLength: 10 },
            limitOverrides: { maxDocumentNodes: -5, maxPasteBytes: Number.NaN },
        });

        expect(limited.limits).toEqual({ ...defaultLimits, maxTextLength: 10 });
    });

    it.each([
        ['maxAttributeLength', 3, { minimum: 4 }],
        ['maxDepth', 1, {}],
        ['maxDocumentNodes', 1, {}],
        ['maxDocumentBytes', 100, {}],
    ] as const)('rejects a %s of %d, below what the installed features need', (name, value, details) => {
        let failure: unknown;
        try {
            boldWith('test.limits', { limits: { [name]: value } });
        } catch (error) {
            failure = error;
        }

        expect(failure).toBeInstanceOf(DefinitionError);
        expect(failure).toMatchObject({
            code: 'definition.invalid-option',
            details: { path: `/limits/${name}`, ...details },
        });
    });

    it.each([
        ['maxAttributeLength', 3],
        ['maxDepth', 1],
    ] as const)('names limitOverrides when an override sets a %s of %d', (name, value) => {
        let failure: unknown;
        try {
            boldWith('test.limits', { limitOverrides: { [name]: value } });
        } catch (error) {
            failure = error;
        }

        expect(failure).toMatchObject({
            code: 'definition.invalid-option',
            details: { path: `/limitOverrides/${name}` },
        });
    });

    it('accepts a maxAttributeLength equal to the longest default or enum value of the installed attributes', () => {
        const limited = boldWith('test.limits', { limits: { maxAttributeLength: 4 } });

        expect(limited.limits.maxAttributeLength).toBe(4);
    });
});

describe('RichTextEditor documents', () => {
    // A path, not a `URL`: happy-dom replaces the global `URL`, which rejects a `file:` URL.
    const fixtures = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'model', '__tests__', 'fixtures');
    const load = (...path: readonly string[]) => JSON.parse(readFileSync(join(fixtures, ...path), 'utf8')) as unknown;
    const vocabularyModel = compileContentModel(
        [
            core(),
            vocabularyStyles(),
            vocabularyAlign(),
            vocabularyIndent(),
            vocabularyBlocks(),
            vocabularyLists(),
            vocabularyTables(),
            vocabularyMedia(),
            vocabularyMention(),
            vocabularyMarks(),
            vocabularyLink(),
            vocabularyColors(),
        ],
        { id: 'fixture.vocabulary', version: 1 },
    );
    const vocabulary = defineEditor({
        id: 'test.vocabulary',
        model: vocabularyModel,
        plugins: unitsOf(vocabularyModel),
    });
    const notesOf3 = notesModel(3);
    const notes = defineEditor({ id: 'test.notes', model: notesOf3, plugins: unitsOf(notesOf3) });
    const opened = [
        ...fixturesIn('valid').map(([name, document]) => [`model/valid/${name}`, document, vocabulary] as const),
        ...readdirSync(join(fixtures, 'migration'), { recursive: true, encoding: 'utf8' })
            .filter((name) => name.endsWith('.json'))
            .sort()
            .map((name) => [`migration/${name}`, load('migration', name), notes] as const)
            .filter(([, document]) => (document as { model: { version: number } }).model.version < 3),
    ];

    it.each(opened)('opens %s with no document change or save for 2 seconds', (_name, document, used) => {
        const save = vi.fn();
        const onDocumentChange = vi.fn();
        const ref = createRef<EditorHandle<object>>();
        const { unmount } = render(
            <RichTextEditor
                aria-label="Notes"
                definition={used}
                defaultValue={{ documentId: 'document-1', revision: null, document } as LoadedDocument}
                services={{ persistence: { save, read: vi.fn() } as unknown as PersistenceService }}
                onDocumentChange={onDocumentChange}
                ref={ref}
            />,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
            vi.advanceTimersByTime(2000);
            vi.advanceTimersToNextFrame();
        });

        expect(ref.current?.getSummary().phase).toBe('ready');
        expect(onDocumentChange).not.toHaveBeenCalled();
        expect(save).not.toHaveBeenCalled();
        unmount();
    });

    const urls = load('urls.json') as readonly { input: string; ok: boolean }[];
    const urlModel = compileContentModel([core(), links(), fixtureMedia()], { id: 'fixture.vocabulary', version: 1 });
    const linked = defineEditor({ id: 'test.urls', model: urlModel, plugins: unitsOf(urlModel) });
    const withUrl = (url: string) =>
        envelope(doc(para(text('Go', link(url))), node('embed', { nodeId: 'e-1', url })), [
            'core',
            'links',
            'fixture.media',
        ]);
    const surfaceOf = (url: string) => {
        const view = render(
            <RichTextEditor
                aria-label="Notes"
                definition={linked}
                defaultValue={
                    { documentId: 'document-1', revision: null, document: withUrl(url) } as unknown as LoadedDocument
                }
            />,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        return view;
    };

    // oxlint-disable-next-line rte-style/no-view-internals -- `input` is a field of the URL fixture, not of an editor view.
    it.each(urls.filter(({ ok }) => !ok).map(({ input }) => input))(
        'renders no href from the unsafe input %j in the editor, as a link or an embed',
        (input) => {
            const { unmount } = surfaceOf(input);

            expect(surface().innerHTML).not.toContain('href=');
            expect(surface().innerHTML).not.toContain('alert(1)');
            expect(surface()).toHaveTextContent('Go');
            unmount();
        },
    );

    it('renders the link of a checked href in the editor', () => {
        const { unmount } = surfaceOf('https://example.com/');

        expect(surface().querySelector('a')).toHaveAttribute('href', 'https://example.com/');
        unmount();
    });
});
