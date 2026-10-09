/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, render, screen } from '@testing-library/react';
import { createRef, Profiler, StrictMode, useEffect, useLayoutEffect, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useEditorSelection } from '#/bridge/hooks';
import * as schemaModule from '#/definition/schema';
import { doc, envelope, link, node, text } from '#/features/__fixtures__/documents';
import { fixtureItalic, fixtureLink, fixtureMedia } from '#/features/__fixtures__/features';
import { notesModel } from '#/features/__fixtures__/notes';
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
} from '#/features/__fixtures__/vocabulary';
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
import { type AsyncOperation } from '#/runtime/async';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { type CommandResult, type DocumentChange } from '#/runtime/types';
import { createTestEnvironment, pressKey, setSelection, typeText } from '#/testing';
import { probeRuntimes } from '#/testing/probe';

import { fixturesIn } from '../../fixtures/reader/helpers';

import { defineEditor } from './define';
import { RichTextEditor } from './rich-text-editor';
import { type EditorHandle, type RichTextEditorBaseProps } from './types';

vi.mock('#/model', { spy: true });
vi.mock('#/definition/schema', { spy: true });

const features = [core(), bold()];
const boldModel = compileContentModel(features, { id: 'test.editor', version: 1 });
const definition = defineEditor({ id: 'test.editor', model: boldModel });
// A stand-in for another profile until TASK-rte-profiles ships them.
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

/** Mounts an editor with a test environment and runs its first frame, so it is `ready`. */
const mount = (props: Props = {}, strict = false) => {
    const environment = createTestEnvironment({ seed: 1 });
    const ref = createRef<EditorHandle<object>>();
    const element = (extra: Props) => (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
            environment={environment}
            ref={ref}
            {...props}
            {...extra}
        />
    );
    const wrap = (extra: Props) => (strict ? <StrictMode>{element(extra)}</StrictMode> : element(extra));
    const view = render(wrap({}));
    act(() => environment.flushFrames());
    const handle = () => {
        if (ref.current === null) {
            throw new Error('no handle');
        }
        return ref.current;
    };
    return { ...view, environment, handle, rerender: (extra: Props = {}) => view.rerender(wrap(extra)) };
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
    it('SPEC-rich-text-react/AC-002 throws an error naming the missing root for a part outside it', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        expect(() => render(<RichTextEditor.Surface />)).toThrow(
            'RichTextEditor.Surface must be rendered inside RichTextEditor.Root.',
        );
        vi.mocked(console.error).mockRestore();
    });

    it('SPEC-rich-text-react/AC-003 keeps the view, selection and plugins across 50 rerenders with new callbacks and locale', () => {
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

    it('SPEC-rich-text-react/AC-004 calls the newest onDocumentChange', () => {
        const first = vi.fn();
        const second = vi.fn();
        const { handle, rerender, unmount } = mount({ onDocumentChange: first });

        rerender({ onDocumentChange: second });
        act(() => typeText(handle(), 'c'));

        expect(first).not.toHaveBeenCalled();
        expect(second).toHaveBeenCalledTimes(1);
        unmount();
    });

    it('SPEC-rich-text-runtime/AC-073 aborts only the operations of the services member a rerender replaces', () => {
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

    it('SPEC-rich-text-react/AC-005 leaves one view under StrictMode and nothing from the replayed attachment', () => {
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

    it('SPEC-rich-text-react/AC-006 destroys the view of a detached surface at once and attaches a new one', () => {
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
    ])('SPEC-rich-text-react/AC-027 gives the surface its textbox semantics with %s', (_name, used) => {
        const { unmount } = mount({
            definition: used,
            id: 'notes',
            'aria-describedby': 'hint',
            'aria-errormessage': 'problem',
            status: 'error',
            required: true,
        });

        const textbox = surface();
        expect(textbox).toHaveAttribute('id', 'notes');
        expect(textbox).toHaveAttribute('aria-multiline', 'true');
        expect(textbox).toHaveAttribute('aria-describedby', 'hint');
        expect(textbox).toHaveAttribute('aria-invalid', 'true');
        expect(textbox).toHaveAttribute('aria-errormessage', 'problem');
        expect(textbox).toHaveAttribute('aria-required', 'true');
        expect(textbox).toHaveAttribute('translate', 'no');
        expect(textbox).toHaveAttribute('contenteditable', 'true');
        unmount();
    });

    it('SPEC-rich-text-react/AC-028 keeps a read-only surface focusable with aria-readonly and tabindex 0', () => {
        const { unmount } = mount({ readOnly: true });

        expect(surface()).toHaveAttribute('aria-readonly', 'true');
        expect(surface()).toHaveAttribute('tabindex', '0');
        expect(surface()).toHaveAttribute('contenteditable', 'false');
        unmount();
    });

    it('SPEC-rich-text-react/AC-030 shows the placeholder through attributes, never as document text', () => {
        const { container, unmount } = mount({ placeholder: 'Write a note', defaultValue: defaultValue() });

        expect(surface()).toHaveAttribute('aria-placeholder', 'Write a note');
        expect(surface()).toHaveAttribute('data-rte-empty');
        expect(surface().textContent).toBe('');
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });

    it('SPEC-rich-text-react/AC-071 keeps the mounted definition when the prop changes, and a new key mounts the new one', () => {
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

    it('SPEC-rich-text-react/AC-072 reports one react.definition-changed warning per change after mount', () => {
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

    it('SPEC-rich-text-react/AC-072 reports no definition change in a production build', () => {
        vi.stubEnv('NODE_ENV', 'production');
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const { rerender, unmount } = mount({ onDiagnostic });

        rerender({ onDiagnostic, definition: otherDefinition });

        expect(onDiagnostic).not.toHaveBeenCalled();
        unmount();
        vi.unstubAllEnvs();
    });

    it('SPEC-rich-text-runtime/AC-081 keeps the surface uneditable and the root busy until the first frame', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { container, unmount } = render(
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue()}
                environment={environment}
            />,
        );

        expect(container.querySelector('[contenteditable="true"]')).toBeNull();
        expect(container.firstElementChild).toHaveAttribute('aria-busy', 'true');
        act(() => environment.flushFrames());
        expect(surface()).toHaveAttribute('contenteditable', 'true');
        expect(container.firstElementChild).not.toHaveAttribute('aria-busy');
        unmount();
    });

    it('SPEC-rich-text-editing/AC-068 spellchecks by default, in the document language, and not when turned off', () => {
        const first = mount();
        expect(surface()).toHaveAttribute('spellcheck', 'true');
        expect(surface()).toHaveAttribute('lang', 'en-US');
        first.unmount();

        const off = mount({ spellCheck: false, locale: deDE });
        expect(surface()).toHaveAttribute('spellcheck', 'false');
        expect(surface()).toHaveAttribute('lang', 'de-DE');
        off.unmount();

        const french = defaultValue(para({ type: 'text', text: 'ab' }));
        const stored = {
            ...french.document,
            content: { ...french.document.content, attrs: { lang: 'fr-FR', dir: 'auto' } },
        };
        const declared = mount({ defaultValue: { ...french, document: stored }, locale: deDE });
        expect(surface()).toHaveAttribute('lang', 'fr-FR');
        declared.unmount();
    });

    it('SPEC-rich-text/AC-029 compiles and builds the schema once across ten rerenders and a StrictMode remount', () => {
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

    it('SPEC-rich-text/AC-032 runs a custom model with an outside feature in place of a profile', () => {
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
        expect(surface().querySelector('em')).toHaveTextContent('ab');

        act(() => {
            setSelection(handle(), { text: 'ab' });
            pressKey(handle(), 'Mod-b');
        });

        expect(surface().querySelector('strong em, em strong')).toHaveTextContent('ab');
        expect(changes).toHaveLength(1);
        expect(changes[0]?.readDocument().content.content).toEqual([
            para({ type: 'text', text: 'ab', marks: [{ type: 'bold' }, { type: 'italic' }] }),
        ]);
        unmount();
    });

    it('SPEC-rich-text/AC-030 rejects a function, a regular expression and a component in remote policy values', () => {
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

    it('SPEC-rich-text/AC-025 rejects a policy for a feature the model does not install', () => {
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

    it('SPEC-rich-text/AC-044 keeps the engine out of the definition a host holds', () => {
        expect(Object.keys(definition)).toEqual(['id', 'model', 'capabilities', 'authoring', 'limits']);
        expect(Object.getOwnPropertySymbols(definition)).toEqual([]);
    });

    it('SPEC-rich-text-format/AC-003 keeps negative or non-finite limits out of the definition', () => {
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
    it('SPEC-rich-text-react/AC-025 keeps a selector result with equal fields under a shallow equality function', () => {
        const environment = createTestEnvironment({ seed: 1 });
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
                environment={environment}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Profiler id="collapsed" onRender={() => (renders += 1)}>
                    <Collapsed />
                </Profiler>
            </RichTextEditor.Root>,
        );
        act(() => environment.flushFrames());
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

    it('SPEC-rich-text-react/AC-080 warns once from the second of two editors that share an accessible name', () => {
        const run = (first: Props, second: Props) => {
            const environment = createTestEnvironment({ seed: 1 });
            const firstDiagnostics = vi.fn<(diagnostic: Diagnostic) => void>();
            const secondDiagnostics = vi.fn<(diagnostic: Diagnostic) => void>();
            const editor = (props: Props, onDiagnostic: (diagnostic: Diagnostic) => void) => (
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={defaultValue()}
                    environment={environment}
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
            act(() => environment.flushFrames());
            const codes = (spy: typeof firstDiagnostics) => spy.mock.calls.map(([{ code }]) => code);
            unmount();
            return [codes(firstDiagnostics), codes(secondDiagnostics)];
        };

        expect(run({}, {})).toEqual([[], ['react.duplicate-accessible-name']]);
        const labelledBy = (id: string) => ({ 'aria-label': undefined, 'aria-labelledby': id }) as unknown as Props;
        expect(run(labelledBy('label-a'), labelledBy('label-b'))).toEqual([[], ['react.duplicate-accessible-name']]);
        expect(run({}, { 'aria-label': 'Summary' } as Props)).toEqual([[], []]);
    });

    it('SPEC-rich-text-react/AC-080 warns from the editor mounted second even when it sits before the first', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const first = vi.fn<(diagnostic: Diagnostic) => void>();
        const second = vi.fn<(diagnostic: Diagnostic) => void>();
        const editor = (key: string, onDiagnostic: (diagnostic: Diagnostic) => void) => (
            <RichTextEditor
                key={key}
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue()}
                environment={environment}
                onDiagnostic={onDiagnostic}
            />
        );
        const { rerender, unmount } = render(<>{[editor('a', first)]}</>);
        act(() => environment.flushFrames());

        rerender(<>{[editor('b', second), editor('a', first)]}</>);
        act(() => environment.flushFrames());

        expect(first).not.toHaveBeenCalled();
        expect(second.mock.calls.map(([{ code }]) => code)).toEqual(['react.duplicate-accessible-name']);
        unmount();
    });

    it('SPEC-rich-text-react/AC-080 warns from an editor mounted after another remounted its surface', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const first = vi.fn<(diagnostic: Diagnostic) => void>();
        const second = vi.fn<(diagnostic: Diagnostic) => void>();
        const tree = (surfaceKey: string, withSecond: boolean) => (
            <>
                <RichTextEditor.Root
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={defaultValue()}
                    environment={environment}
                    onDiagnostic={first}
                >
                    <RichTextEditor.Surface key={surfaceKey} />
                </RichTextEditor.Root>
                {withSecond && (
                    <RichTextEditor
                        aria-label="Notes"
                        definition={definition}
                        defaultValue={defaultValue()}
                        environment={environment}
                        onDiagnostic={second}
                    />
                )}
            </>
        );
        const { rerender, unmount } = render(tree('a', false));
        act(() => environment.flushFrames());
        rerender(tree('b', false));

        rerender(tree('b', true));
        act(() => environment.flushFrames());

        expect(first).not.toHaveBeenCalled();
        expect(second.mock.calls.map(([{ code }]) => code)).toEqual(['react.duplicate-accessible-name']);
        unmount();
    });

    it('SPEC-rich-text-react/AC-080 reports no duplicate accessible name in a production build', () => {
        vi.stubEnv('NODE_ENV', 'production');
        const environment = createTestEnvironment({ seed: 1 });
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const editor = () => (
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue()}
                environment={environment}
                onDiagnostic={onDiagnostic}
            />
        );
        const { unmount } = render(
            <>
                {editor()}
                {editor()}
            </>,
        );
        act(() => environment.flushFrames());

        expect(onDiagnostic).not.toHaveBeenCalled();
        unmount();
        vi.unstubAllEnvs();
    });

    it.each(['render', 'effect', 'layout effect'] as const)(
        'SPEC-rich-text-react/AC-102 rejects execute from a React %s with one react.execute-in-render error and no change',
        (during) => {
            const environment = createTestEnvironment({ seed: 1 });
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
                    environment={environment}
                    onDiagnostic={onDiagnostic}
                    ref={ref}
                >
                    <RichTextEditor.Surface />
                    <Caller calling={calling} />
                </RichTextEditor.Root>
            );
            const { rerender, unmount } = render(tree(false));
            act(() => environment.flushFrames());
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

    it('SPEC-rich-text-react/AC-102 rejects execute from the render of a part that rerenders from its own state', () => {
        const environment = createTestEnvironment({ seed: 1 });
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
                environment={environment}
                onDiagnostic={onDiagnostic}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Caller />
            </RichTextEditor.Root>,
        );
        act(() => environment.flushFrames());
        const before = (ref.current as EditorHandle<object>).getSnapshot();

        // Only the part renders: its own setter runs inside `act`, and the root does not.
        act(() => flip(true));

        expect(results).toEqual([{ status: 'rejected', code: 'busy' }]);
        expect(onDiagnostic.mock.calls.map(([{ code }]) => code)).toEqual(['react.execute-in-render']);
        expect((ref.current as EditorHandle<object>).getSnapshot()).toBe(before);
        unmount();
    });

    it('SPEC-rich-text-react/AC-102 reports once when the diagnostic listener itself calls execute', () => {
        const environment = createTestEnvironment({ seed: 1 });
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
                environment={environment}
                onDiagnostic={onDiagnostic}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Caller calling={calling} />
            </RichTextEditor.Root>
        );
        const { rerender, unmount } = render(tree(false));
        act(() => environment.flushFrames());

        rerender(tree(true));

        expect(onDiagnostic).toHaveBeenCalledTimes(1);
        expect(inner).toEqual([{ status: 'rejected', code: 'busy' }]);
        unmount();
    });

    it('SPEC-rich-text-react/AC-102 runs execute from a render with no diagnostic in a production build', () => {
        vi.stubEnv('NODE_ENV', 'production');
        const environment = createTestEnvironment({ seed: 1 });
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
                environment={environment}
                onDiagnostic={onDiagnostic}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Caller calling={calling} />
            </RichTextEditor.Root>
        );
        const { rerender, unmount } = render(tree(false));
        act(() => environment.flushFrames());

        rerender(tree(true));

        expect(results.map(({ status }) => status)).toEqual(['applied']);
        expect(onDiagnostic).not.toHaveBeenCalled();
        unmount();
        vi.unstubAllEnvs();
    });
});

describe('RichTextEditor documents', () => {
    // A path, not a `URL`: happy-dom replaces the global `URL`, which rejects a `file:` URL.
    const fixtures = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'fixtures');
    const load = (...path: readonly string[]) => JSON.parse(readFileSync(join(fixtures, ...path), 'utf8')) as unknown;
    // The engine builds no figure stand-in, whose `asset_image` has required attributes and no default (Findings), so it opens as an island.
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

    it.each(opened)(
        'SPEC-rich-text-format/AC-023 SPEC-rich-text-format/AC-010 opens %s with no document change or save for 2 seconds',
        (_name, document, used) => {
            const environment = createTestEnvironment({ seed: 1 });
            const save = vi.fn();
            const onDocumentChange = vi.fn();
            const ref = createRef<EditorHandle<object>>();
            const { unmount } = render(
                <RichTextEditor
                    aria-label="Notes"
                    definition={used}
                    defaultValue={{ documentId: 'document-1', revision: null, document } as LoadedDocument}
                    environment={environment}
                    services={{ persistence: { save, read: vi.fn() } as unknown as PersistenceService }}
                    onDocumentChange={onDocumentChange}
                    ref={ref}
                />,
            );
            act(() => {
                environment.flushFrames();
                environment.advance(2000);
                environment.flushFrames();
            });

            expect(ref.current?.getSummary().phase).toBe('ready');
            expect(onDocumentChange).not.toHaveBeenCalled();
            expect(save).not.toHaveBeenCalled();
            unmount();
        },
    );

    const urls = load('security', 'urls.json') as readonly { readonly input: string; readonly ok: boolean }[];
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
        const environment = createTestEnvironment({ seed: 1 });
        const view = render(
            <RichTextEditor
                aria-label="Notes"
                definition={linked}
                defaultValue={
                    { documentId: 'document-1', revision: null, document: withUrl(url) } as unknown as LoadedDocument
                }
                environment={environment}
            />,
        );
        act(() => environment.flushFrames());
        return view;
    };

    // oxlint-disable-next-line rte-style/no-view-internals -- `input` is a field of the URL fixture, not of an editor view.
    it.each(urls.filter(({ ok }) => !ok).map(({ input }) => input))(
        'SPEC-rich-text-format/AC-019 renders no href from the unsafe input %j in the editor, as a link or an embed',
        (input) => {
            const { unmount } = surfaceOf(input);

            expect(surface().innerHTML).not.toContain('href=');
            expect(surface().innerHTML).not.toContain('alert(1)');
            expect(surface()).toHaveTextContent('Go');
            unmount();
        },
    );

    it('SPEC-rich-text-format/AC-019 renders the link of a checked href in the editor', () => {
        const { unmount } = surfaceOf('https://example.com/');

        expect(surface().querySelector('a')).toHaveAttribute('href', 'https://example.com/');
        unmount();
    });
});
