/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen } from '@testing-library/react';
import { createRef, StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import * as schemaModule from '#/definition/schema';
import { fixtureItalic } from '#/features/__fixtures__/features';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { deDE } from '#/locales/de-DE';
import { enUS } from '#/locales/en-US';
import { compileContentModel, type ContentNodeJSON, DefinitionError, type Diagnostic, type JsonValue } from '#/model';
import * as model from '#/model';
import { type LoadedDocument } from '#/persistence/types';
import { createTestEnvironment, pressKey, setSelection, typeText } from '#/testing';
import { probeRuntimes } from '#/testing/probe';

import { defineEditor, defineReactPresentation } from './define';
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
        expect(probeRuntimes()).toEqual({ views: [], subscriptions: 0, frames: 0 });
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
        const { rerender, unmount } = mount();
        const view = viewOf();
        const { schema } = view.state;

        rerender({ definition: otherDefinition });
        expect(viewOf()).toBe(view);
        expect(viewOf().state.schema).toBe(schema);

        unmount();
        mount({ definition: otherDefinition }).unmount();
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
        const presentation = defineReactPresentation({ toolbar: [['mark.bold.toggle']] });
        const onDocumentChange = vi.fn();
        const { handle, unmount } = mount({ definition: custom, presentation, onDocumentChange });

        act(() => {
            setSelection(handle(), { text: 'ab' });
            pressKey(handle(), 'Mod-b');
        });

        expect(presentation).toEqual({
            styles: [],
            colorTokens: [],
            toolbar: [['mark.bold.toggle']],
            sliceContext: null,
        });
        expect(surface().querySelector('strong')).toHaveTextContent('ab');
        expect(onDocumentChange).toHaveBeenCalledTimes(1);
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
});
