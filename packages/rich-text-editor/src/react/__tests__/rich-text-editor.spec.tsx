/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, render, screen } from '@testing-library/react';
import { createRef, Profiler, StrictMode, useEffect, useLayoutEffect, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useEditorSelection } from '#/bridge/hooks';
import * as schemaModule from '#/definition/schema';
import { doc, envelope, link, node, text } from '#/features/__tests__/fixtures/documents';
import { fixtureItalic, fixtureLink, fixtureMedia } from '#/features/__tests__/fixtures/features';
import { notesModel } from '#/features/__tests__/fixtures/notes';
import {
    vocabularyAlign,
    vocabularyBlocks,
    vocabularyColors,
    vocabularyIndent,
    vocabularyLink,
    vocabularyLists,
    vocabularyMarks,
    vocabularyMention,
    vocabularyStyles,
    vocabularyTables,
} from '#/features/__tests__/fixtures/vocabulary';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { deDE } from '#/locales/de-DE';
import { enUS } from '#/locales/en-US';
import {
    compileContentModel,
    type ContentNodeJSON,
    defaultLimits,
    DefinitionError,
    type Diagnostic,
    type JsonValue,
} from '#/model';
import * as model from '#/model';
import { type LoadedDocument, type PersistenceService } from '#/persistence/types';
import { fixturesIn } from '#/reader/__tests__/helpers/helpers';
import { type AsyncOperation } from '#/runtime/async';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { type CommandResult, type DocumentChange } from '#/runtime/types';
import { pressKey, probeRuntimes, setSelection, typeText } from '#/testing';

import { defineEditor } from '../define';
import { RichTextEditor } from '../rich-text-editor';
import { type EditorHandle, type RichTextEditorBaseProps } from '../types';

vi.mock('#/model', { spy: true });
vi.mock('#/definition/schema', { spy: true });

const features = [core(), bold()];
const boldModel = compileContentModel(features, { id: 'test.editor', version: 1 });
const definition = defineEditor({ id: 'test.editor', model: boldModel });
const otherDefinition = defineEditor({
    id: 'test.other',
    model: compileContentModel([core(), bold(), fixtureItalic()], { id: 'test.editor', version: 1 }),
});

const para = (...content: readonly JsonValue[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const defaultValue = (...blocks: readonly JsonValue[]): LoadedDocument => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.editor', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: (blocks.length === 0 ? [para()] : blocks) as unknown as readonly ContentNodeJSON[],
        },
    },
});

const ALLOWED = { create: true, edit: true, remove: true, paste: true };

type Props = Partial<RichTextEditorBaseProps<object>>;

beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    vi.useRealTimers();
});

/** Mounts an editor and runs its first frame, so it is `ready`. */
const mount = (props: Props = {}, strict = false) => {
    const ref = createRef<EditorHandle<object>>();
    const element = (extra: Props) => (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
            ref={ref}
            {...props}
            {...extra}
        />
    );
    const wrap = (extra: Props) => (strict ? <StrictMode>{element(extra)}</StrictMode> : element(extra));
    const view = render(wrap({}));
    act(() => {
        vi.runAllTimers();
    });
    const handle = () => {
        if (ref.current === null) {
            throw new Error('no handle');
        }
        return ref.current;
    };
    return { ...view, handle, rerender: (extra: Props = {}) => view.rerender(wrap(extra)) };
};

const surface = () => screen.getByRole('textbox', { name: 'Notes' });
/** Undoes once, and reads whether another undo step is left. */
const undoOnce = (handle: EditorHandle<object>) => {
    const commands = handle as unknown as Pick<RuntimeHandle, 'execute' | 'query'>;
    return [commands.execute('history.undo').status, commands.query('history.undo').enabled];
};
const viewOf = () => {
    const [view] = probeRuntimes().views;
    if (view === undefined) {
        throw new Error('no live view');
    }
    return view;
};

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
        const Layout = ({ surfaceKey }: { readonly surfaceKey: string }) => (
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

    it('compiles and builds the schema once across ten rerenders and a StrictMode remount', () => {
        const compile = vi.mocked(model.compileContentModel);
        const build = vi.mocked(schemaModule.buildSchema);
        compile.mockClear();
        build.mockClear();
        const once = defineEditor({
            id: 'test.once',
            model: compileContentModel(features, { id: 'test.editor', version: 1 }),
        });

        const { rerender, unmount } = mount({ definition: once }, true);
        for (let index = 0; index < 10; index += 1) {
            rerender({ definition: once, onReady: () => index });
        }

        expect(compile).toHaveBeenCalledTimes(1);
        expect(build).toHaveBeenCalledTimes(1);
        unmount();
    });

    it('runs a custom model with an outside feature in place of a profile', () => {
        const custom = defineEditor({
            id: 'test.custom',
            model: compileContentModel([core(), bold(), fixtureItalic()], { id: 'test.editor', version: 1 }),
        });
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
                defineEditor({ id: 'test.remote', model: boldModel, policy });
            } catch (error) {
                failure = error;
            }
            expect(failure).toBeInstanceOf(DefinitionError);
            expect(failure).toMatchObject({ code: 'definition.invalid-manifest', details: { path } });
        }
    });

    it('rejects a policy for a feature the model does not install', () => {
        let failure: unknown;
        try {
            defineEditor({ id: 'test.policy', model: boldModel, policy: { features: { 'marks.italic': ALLOWED } } });
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
        const limited = defineEditor({
            id: 'test.limits',
            model: boldModel,
            limits: { maxDepth: -1, maxTextLength: 10 },
            limitOverrides: { maxDocumentNodes: -5, maxPasteBytes: Number.NaN },
        });

        expect(limited.limits).toEqual({ ...defaultLimits, maxTextLength: 10 });
    });
});

describe('RichTextEditor host surface', () => {
    it('keeps a selector result with equal fields under a shallow equality function', () => {
        const ref = createRef<EditorHandle<object>>();
        const seen: { readonly active: boolean }[] = [];
        let renders = 0;
        const shallow = (a: { readonly active: boolean }, b: { readonly active: boolean }) => a.active === b.active;
        const Collapsed = () => {
            seen.push(useEditorSelection((selection) => ({ active: selection.collapsed }), shallow));
            return null;
        };
        const { unmount } = render(
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Profiler id="collapsed" onRender={() => (renders += 1)}>
                    <Collapsed />
                </Profiler>
            </RichTextEditor.Root>,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const handle = ref.current as EditorHandle<object>;
        const before = renders;

        // Each typed character is a commit with a new selection summary whose `collapsed` stays true.
        act(() => typeText(handle, 'xyz'));
        expect(renders).toBe(before);

        act(() => setSelection(handle, { text: 'ab' }));
        expect(renders).toBe(before + 1);
        expect(seen.at(-1)).toEqual({ active: false });
        unmount();
    });

    it('warns once from the second of two editors that share an accessible name', () => {
        const run = (first: Props, second: Props) => {
            const firstDiagnostics = vi.fn<(diagnostic: Diagnostic) => void>();
            const secondDiagnostics = vi.fn<(diagnostic: Diagnostic) => void>();
            const editor = (props: Props, onDiagnostic: (diagnostic: Diagnostic) => void) => (
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={defaultValue()}
                    onDiagnostic={onDiagnostic}
                    {...props}
                />
            );
            const { unmount } = render(
                <>
                    <span id="label-a">Meeting notes</span>
                    <span id="label-b">Meeting notes</span>
                    {editor(first, firstDiagnostics)}
                    {editor(second, secondDiagnostics)}
                </>,
            );
            act(() => {
                vi.advanceTimersToNextFrame();
            });
            const codes = (spy: typeof firstDiagnostics) => spy.mock.calls.map(([{ code }]) => code);
            unmount();
            return [codes(firstDiagnostics), codes(secondDiagnostics)];
        };

        expect(run({}, {})).toEqual([[], ['react.duplicate-accessible-name']]);
        const labelledBy = (id: string) => ({ 'aria-label': undefined, 'aria-labelledby': id }) as unknown as Props;
        expect(run(labelledBy('label-a'), labelledBy('label-b'))).toEqual([[], ['react.duplicate-accessible-name']]);
        expect(run({}, { 'aria-label': 'Summary' } as Props)).toEqual([[], []]);
    });

    it('warns from the editor mounted second even when it sits before the first', () => {
        const first = vi.fn<(diagnostic: Diagnostic) => void>();
        const second = vi.fn<(diagnostic: Diagnostic) => void>();
        const editor = (key: string, onDiagnostic: (diagnostic: Diagnostic) => void) => (
            <RichTextEditor
                key={key}
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue()}
                onDiagnostic={onDiagnostic}
            />
        );
        const { rerender, unmount } = render(<>{[editor('a', first)]}</>);
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        rerender(<>{[editor('b', second), editor('a', first)]}</>);
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        expect(first).not.toHaveBeenCalled();
        expect(second.mock.calls.map(([{ code }]) => code)).toEqual(['react.duplicate-accessible-name']);
        unmount();
    });

    it('warns from an editor mounted after another remounted its surface', () => {
        const first = vi.fn<(diagnostic: Diagnostic) => void>();
        const second = vi.fn<(diagnostic: Diagnostic) => void>();
        const tree = (surfaceKey: string, withSecond: boolean) => (
            <>
                <RichTextEditor.Root
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={defaultValue()}
                    onDiagnostic={first}
                >
                    <RichTextEditor.Surface key={surfaceKey} />
                </RichTextEditor.Root>
                {withSecond && (
                    <RichTextEditor
                        aria-label="Notes"
                        definition={definition}
                        defaultValue={defaultValue()}
                        onDiagnostic={second}
                    />
                )}
            </>
        );
        const { rerender, unmount } = render(tree('a', false));
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        rerender(tree('b', false));

        rerender(tree('b', true));
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        expect(first).not.toHaveBeenCalled();
        expect(second.mock.calls.map(([{ code }]) => code)).toEqual(['react.duplicate-accessible-name']);
        unmount();
    });

    it('reports no duplicate accessible name in a production build', () => {
        vi.stubEnv('NODE_ENV', 'production');
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const editor = () => (
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue()}
                onDiagnostic={onDiagnostic}
            />
        );
        const { unmount } = render(
            <>
                {editor()}
                {editor()}
            </>,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        expect(onDiagnostic).not.toHaveBeenCalled();
        unmount();
        vi.unstubAllEnvs();
    });

    it.each(['render', 'effect', 'layout effect'] as const)(
        'rejects execute from a React %s with one react.execute-in-render error and no change',
        (during) => {
            const ref = createRef<EditorHandle<object>>();
            const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
            const results: CommandResult[] = [];
            const insert = () => {
                const commands = ref.current as unknown as Pick<RuntimeHandle, 'execute'>;
                return commands.execute('text.insert', { text: 'x' });
            };
            const Caller = ({ calling }: { readonly calling: boolean }) => {
                if (calling && during === 'render') {
                    results.push(insert());
                }
                useEffect(() => {
                    if (calling && during === 'effect') {
                        results.push(insert());
                    }
                });
                useLayoutEffect(() => {
                    if (calling && during === 'layout effect') {
                        results.push(insert());
                    }
                });
                return null;
            };
            const tree = (calling: boolean) => (
                <RichTextEditor.Root
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                    onDiagnostic={onDiagnostic}
                    ref={ref}
                >
                    <RichTextEditor.Surface />
                    <Caller calling={calling} />
                </RichTextEditor.Root>
            );
            const { rerender, unmount } = render(tree(false));
            act(() => {
                vi.advanceTimersToNextFrame();
            });
            const before = (ref.current as EditorHandle<object>).getSnapshot();

            rerender(tree(true));

            expect(results).toEqual([{ status: 'rejected', code: 'busy' }]);
            expect(onDiagnostic.mock.calls.map(([{ code, severity }]) => [code, severity])).toEqual([
                ['react.execute-in-render', 'error'],
            ]);
            expect((ref.current as EditorHandle<object>).getSnapshot()).toBe(before);
            // The same call outside React's work, as from an event handler, runs.
            expect(insert().status).toBe('applied');
            unmount();
        },
    );

    it('rejects execute from the render of a part that rerenders from its own state', () => {
        const ref = createRef<EditorHandle<object>>();
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const results: CommandResult[] = [];
        let flip: (calling: boolean) => void = () => undefined;
        const Caller = () => {
            const [calling, setCalling] = useState(false);
            flip = setCalling;
            const kind = useEditorSelection((selection) => selection.kind);
            if (calling) {
                const commands = ref.current as unknown as Pick<RuntimeHandle, 'execute'>;
                results.push(commands.execute('text.insert', { text: kind }));
            }
            return null;
        };
        const { unmount } = render(
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                onDiagnostic={onDiagnostic}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Caller />
            </RichTextEditor.Root>,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const before = (ref.current as EditorHandle<object>).getSnapshot();

        // Only the part renders: its own setter runs inside `act`, and the root does not.
        act(() => flip(true));

        expect(results).toEqual([{ status: 'rejected', code: 'busy' }]);
        expect(onDiagnostic.mock.calls.map(([{ code }]) => code)).toEqual(['react.execute-in-render']);
        expect((ref.current as EditorHandle<object>).getSnapshot()).toBe(before);
        unmount();
    });

    it('reports once when the diagnostic listener itself calls execute', () => {
        const ref = createRef<EditorHandle<object>>();
        const insert = () =>
            (ref.current as unknown as Pick<RuntimeHandle, 'execute'>).execute('text.insert', { text: 'x' });
        const inner: CommandResult[] = [];
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>(() => {
            inner.push(insert());
        });
        const Caller = ({ calling }: { readonly calling: boolean }) => {
            if (calling) {
                insert();
            }
            return null;
        };
        const tree = (calling: boolean) => (
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                onDiagnostic={onDiagnostic}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Caller calling={calling} />
            </RichTextEditor.Root>
        );
        const { rerender, unmount } = render(tree(false));
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        rerender(tree(true));

        expect(onDiagnostic).toHaveBeenCalledTimes(1);
        expect(inner).toEqual([{ status: 'rejected', code: 'busy' }]);
        unmount();
    });

    it('runs execute from a render with no diagnostic in a production build', () => {
        vi.stubEnv('NODE_ENV', 'production');
        const ref = createRef<EditorHandle<object>>();
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const results: CommandResult[] = [];
        const Caller = ({ calling }: { readonly calling: boolean }) => {
            if (calling) {
                results.push(
                    (ref.current as unknown as Pick<RuntimeHandle, 'execute'>).execute('text.insert', { text: 'x' }),
                );
            }
            return null;
        };
        const tree = (calling: boolean) => (
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                onDiagnostic={onDiagnostic}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Caller calling={calling} />
            </RichTextEditor.Root>
        );
        const { rerender, unmount } = render(tree(false));
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        rerender(tree(true));

        expect(results.map(({ status }) => status)).toEqual(['applied']);
        expect(onDiagnostic).not.toHaveBeenCalled();
        unmount();
        vi.unstubAllEnvs();
    });
});

describe('RichTextEditor documents', () => {
    // A path, not a `URL`: happy-dom replaces the global `URL`, which rejects a `file:` URL.
    const fixtures = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'model', '__tests__', 'fixtures');
    const load = (...path: readonly string[]) => JSON.parse(readFileSync(join(fixtures, ...path), 'utf8')) as unknown;
    // The engine builds no figure stand-in, whose `asset_image` has required attributes and no default, so it opens as an island.
    const vocabulary = defineEditor({
        id: 'test.vocabulary',
        model: compileContentModel(
            [
                core(),
                vocabularyStyles(),
                vocabularyAlign(),
                vocabularyIndent(),
                vocabularyBlocks(),
                vocabularyLists(),
                vocabularyTables(),
                vocabularyMention(),
                vocabularyMarks(),
                vocabularyLink(),
                vocabularyColors(),
            ],
            { id: 'fixture.vocabulary', version: 1 },
        ),
    });
    const notes = defineEditor({ id: 'test.notes', model: notesModel(3) });
    const opened = [
        ...fixturesIn('valid').map(([name, document]) => [`model/valid/${name}`, document, vocabulary] as const),
        ...readdirSync(join(fixtures, 'migration'), { recursive: true, encoding: 'utf8' })
            .filter((name) => name.endsWith('.json'))
            .sort()
            .map((name) => [`migration/${name}`, load('migration', name), notes] as const)
            .filter(([, document]) => (document as { readonly model: { readonly version: number } }).model.version < 3),
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

    const urls = load('urls.json') as readonly { readonly input: string; readonly ok: boolean }[];
    const linked = defineEditor({
        id: 'test.urls',
        model: compileContentModel([core(), fixtureLink(), fixtureMedia()], { id: 'fixture.vocabulary', version: 1 }),
    });
    const withUrl = (url: string) =>
        envelope(doc(para(text('Go', link(url))), node('embed', { nodeId: 'e-1', url })), [
            'core',
            'fixture.link',
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
