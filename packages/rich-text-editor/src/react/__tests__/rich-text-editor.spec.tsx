/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen } from '@testing-library/react';
import { createRef, StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import * as schemaModule from '#/definition/schema';
import { fixtureItalic } from '#/features/__tests__/fixtures/features';
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
import { type LoadedDocument } from '#/persistence/types';
import { type DocumentChange } from '#/runtime/types';
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
        const { rerender, unmount } = mount();
        const view = viewOf();
        const { schema } = view.state;

        rerender({ definition: otherDefinition });
        expect(viewOf()).toBe(view);
        expect(viewOf().state.schema).toBe(schema);

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
