/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef, type RefObject } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs/codecs';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel, type ContentModel, type JsonValue } from '#/model';
import { type LoadedDocument, type PersistenceService } from '#/persistence/types';
import { RichTextReader } from '#/reader/reader';
import { createFakePersistenceService, createTestEnvironment, typeText } from '#/testing';

import { defineEditor } from './define';
import { RichTextEditor } from './rich-text-editor';
import { type CompiledEditorDefinition, type EditorHandle } from './types';

const model = compileContentModel([core(), bold()], { id: 'test.editor', version: 1 });
const definition = defineEditor({ id: 'test.editor', model });

const para = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });
const stored = (document: unknown): LoadedDocument => ({
    documentId: 'document-1',
    revision: null,
    document: document as LoadedDocument['document'],
});
const envelope = (content: readonly JsonValue[], version = 1) => ({
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'test.editor', version },
    requiredCapabilities: [{ id: 'core', version: 1 }],
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content },
});

/** A save spy, which the editor must never call for these documents. */
const persistence = () => ({ save: vi.fn(), read: vi.fn() });

/** A host part inside `RichTextEditor.Root` that throws in render while `armed`, as a broken part would. */
const Bomb = ({ armed }: { readonly armed: boolean }) => {
    if (armed) {
        throw new Error('render failed');
    }
    return null;
};

const handleOf = (ref: RefObject<EditorHandle<object>>) => {
    if (ref.current === null) {
        throw new Error('no handle');
    }
    return ref.current;
};

/** Mounts the editor with a `Bomb`, types `c` before `ab`, then arms it, which shows the recovery shell. */
const breakAfterTyping = () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const environment = createTestEnvironment({ seed: 1 });
    const ref = createRef<EditorHandle<object>>();
    const spy = persistence();
    const tree = (armed: boolean, documentId = 'document-1') => (
        <RichTextEditor.Root
            aria-label="Notes"
            definition={definition}
            defaultValue={{ ...stored(envelope([para('ab')])), documentId }}
            environment={environment}
            services={{ persistence: spy as unknown as PersistenceService }}
            ref={ref}
        >
            <RichTextEditor.Surface />
            <Bomb armed={armed} />
        </RichTextEditor.Root>
    );
    const view = render(tree(false));
    act(() => environment.flushFrames());
    act(() => typeText(handleOf(ref), 'c'));
    const before = handleOf(ref).getSnapshot();
    view.rerender(tree(true));
    // The shell stays until Retry, so the host part is fixed first.
    view.rerender(tree(false));
    return { ...view, tree, environment, ref, spy, before };
};

const shell = (kind: string) => {
    const element = document.querySelector(`[data-rte-shell="${kind}"]`);
    if (element === null) {
        throw new Error(`no ${kind} shell`);
    }
    return element;
};

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

const COPY_FAILED = 'Copying failed. Select the content and copy it with the keyboard.';

/** Takes the clipboard away, as a page outside a secure context has none, and records unhandled rejections. */
const withoutClipboard = () => {
    vi.stubGlobal('navigator', { ...navigator, clipboard: undefined });
    const rejections = vi.fn();
    process.on('unhandledRejection', rejections);
    return {
        rejections: async () => {
            // A rejection is reported after the microtask queue drains.
            await new Promise((resolve) => {
                setTimeout(resolve, 0);
            });
            process.off('unhandledRejection', rejections);
            return rejections.mock.calls.length;
        },
    };
};

describe('the recovery shell', () => {
    it('SPEC-rich-text-react/AC-022 shows the last published snapshot through the reader after a render error, with no save', () => {
        const { before, spy, unmount } = breakAfterTyping();

        expect(screen.getByRole('alert')).toHaveTextContent('The editor stopped working.');
        const reader = renderToStaticMarkup(<RichTextReader document={before.document} model={model} />);
        expect(reader).toContain('cab');
        expect(shell('recovery').innerHTML).toContain(reader);
        expect(document.querySelector('[contenteditable]')).toBeNull();
        expect(spy.save).not.toHaveBeenCalled();
        unmount();
    });

    it('SPEC-rich-text-react/AC-085 mounts an editable editor again from the snapshot on Retry', () => {
        const { before, environment, ref, unmount } = breakAfterTyping();

        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        act(() => environment.flushFrames());

        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('contenteditable', 'true');
        expect(handleOf(ref).getSnapshot().document).toEqual(before.document);
        expect(document.querySelector('[data-rte-shell]')).toBeNull();
        unmount();
    });

    it('SPEC-rich-text-react/AC-085 mounts the snapshot on Retry under the document ID it was loaded with, not a newer prop', () => {
        const { before, environment, ref, rerender, tree, unmount } = breakAfterTyping();
        rerender(tree(false, 'b'));

        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        act(() => environment.flushFrames());

        expect(handleOf(ref).getSnapshot().stamp.documentId).toBe('document-1');
        expect(handleOf(ref).getSnapshot().document).toEqual(before.document);
        unmount();
    });

    it('SPEC-rich-text-react/AC-085 mounts on Retry under the acknowledged revision, so the next write after a save does not conflict', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const environment = createTestEnvironment({ seed: 1 });
        const server = createFakePersistenceService();
        const save = vi.fn(server.save);
        const ref = createRef<EditorHandle<object>>();
        const tree = (armed: boolean) => (
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={stored(envelope([para('ab')]))}
                environment={environment}
                services={{ persistence: { save, read: server.read } }}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Bomb armed={armed} />
            </RichTextEditor.Root>
        );
        const settle = () =>
            act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });
        const view = render(tree(false));
        act(() => environment.flushFrames());
        act(() => typeText(handleOf(ref), 'c'));
        act(() => environment.advance(500));
        await settle();
        const { revision } = handleOf(ref).getSaveStatus();
        view.rerender(tree(true));
        view.rerender(tree(false));

        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        act(() => environment.flushFrames());
        // A session that saved everything before the error mounts clean and writes nothing until typing.
        act(() => environment.advance(10_000));
        await settle();
        expect(handleOf(ref).getSaveStatus().state).toBe('clean');
        expect(save).toHaveBeenCalledTimes(1);
        act(() => typeText(handleOf(ref), 'd'));
        act(() => environment.advance(500));
        await settle();

        expect(revision).toBe('revision-1');
        expect(save.mock.calls.map(([request]) => request.baseRevision)).toEqual([null, 'revision-1']);
        expect(handleOf(ref).getSaveStatus()).toMatchObject({ state: 'clean', revision: 'revision-2' });
        view.unmount();
    });

    it('SPEC-rich-text-react/AC-085 saves on Retry the edit that a render error caught before its write', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const environment = createTestEnvironment({ seed: 1 });
        const server = createFakePersistenceService();
        // An existing record at `revision-1`, which the server holds.
        const existing = stored(envelope([para('ab')]));
        await server.save(
            {
                operationId: 'elsewhere-1',
                stamp: { documentId: 'document-1', sessionId: 'elsewhere', generation: 0, sequence: 1 },
                baseRevision: null,
                document: existing.document,
                writer: {
                    build: '0.0.0',
                    formatVersion: 1,
                    model: { id: 'test.editor', version: 1 },
                    capabilities: model.capabilities,
                },
            },
            {
                signal: new AbortController().signal,
                session: { documentId: 'document-1', sessionId: 'x', generation: 0 },
            },
        );
        const save = vi.fn(server.save);
        const ref = createRef<EditorHandle<object>>();
        const tree = (armed: boolean) => (
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={{ ...existing, revision: 'revision-1' }}
                environment={environment}
                services={{ persistence: { save, read: server.read } }}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Bomb armed={armed} />
            </RichTextEditor.Root>
        );
        const view = render(tree(false));
        act(() => environment.flushFrames());
        act(() => typeText(handleOf(ref), 'c'));
        view.rerender(tree(true));
        view.rerender(tree(false));

        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        act(() => environment.flushFrames());
        expect(handleOf(ref).getSaveStatus()).toMatchObject({
            state: 'dirty',
            acknowledgedSequence: 0,
            revision: 'revision-1',
        });
        act(() => environment.advance(10_000));
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(save).toHaveBeenCalledTimes(1);
        expect(JSON.stringify(save.mock.calls[0]?.[0].document)).toContain('cab');
        expect(handleOf(ref).getSaveStatus().state).toBe('clean');
        view.unmount();
    });

    it('SPEC-rich-text-react/AC-086 copies the snapshot as plain text and HTML from the codecs with no recovery service', async () => {
        const { before, unmount } = breakAfterTyping();
        const write = vi.spyOn(navigator.clipboard, 'write').mockResolvedValue(undefined);

        fireEvent.click(screen.getByRole('button', { name: 'Copy content' }));

        expect(write).toHaveBeenCalledTimes(1);
        const [[item]] = write.mock.calls[0] as unknown as [[ClipboardItem]];
        expect(item.types).toEqual(['text/plain', 'text/html']);
        const typed = async (type: string) => {
            const blob = await item.getType(type);
            return blob.text();
        };
        const codecs = createCodecs(model);
        expect(await typed('text/plain')).toBe(codecs.toPlainText(before.document).text);
        expect(await typed('text/html')).toBe(codecs.toHTML(before.document).html);
        expect(codecs.toPlainText(before.document).text).toBe('cab');
        unmount();
    });
});

const cannotUpgrade = compileContentModel([core(), bold()], {
    id: 'test.editor',
    version: 2,
    migrations: [
        {
            id: 'test.cannot-upgrade',
            from: 1,
            migrate: (document) => ({ status: 'unsupported', document, diagnostics: [] }),
        },
    ],
});
// A step may report its refusal with any diagnostic code, not only a `migration.*` one.
const refusesWithFormatCode = compileContentModel([core(), bold()], {
    id: 'test.editor',
    version: 2,
    migrations: [
        {
            id: 'test.refuses',
            from: 1,
            migrate: (document) => ({
                status: 'unsupported',
                document,
                diagnostics: [
                    { code: 'format.invalid-structure', severity: 'error', messageKey: 'format.invalid-structure' },
                ],
            }),
        },
    ],
});
const limited = defineEditor({ id: 'test.editor', model, limits: { maxTextLength: 3 } });

const BLOCKED: readonly (readonly [string, unknown, CompiledEditorDefinition<object>, ContentModel, string])[] = [
    [
        'an unknown format version',
        { ...envelope([para('ab')]), formatVersion: 2 },
        definition,
        model,
        'Editing is unavailable because this content uses an unknown format or model.',
    ],
    [
        'another model',
        { ...envelope([para('ab')]), model: { id: 'test.other', version: 1 } },
        definition,
        model,
        'Editing is unavailable because this content uses an unknown format or model.',
    ],
    [
        'a migration that cannot upgrade it',
        envelope([para('ab')]),
        defineEditor({ id: 'test.editor', model: cannotUpgrade }),
        cannotUpgrade,
        'Editing is unavailable because this content cannot be upgraded to the current version.',
    ],
    [
        'a migration that refuses with a format diagnostic',
        envelope([para('ab')]),
        defineEditor({ id: 'test.editor', model: refusesWithFormatCode }),
        refusesWithFormatCode,
        'Editing is unavailable because this content cannot be upgraded to the current version.',
    ],
    [
        'input that is not JSON',
        '{"format":',
        definition,
        model,
        'Editing is unavailable because this content is not valid.',
    ],
    [
        'a bad envelope',
        { format: 'frontify.rich-text', formatVersion: 1 },
        definition,
        model,
        'Editing is unavailable because this content is not valid.',
    ],
    [
        'an exceeded limit',
        envelope([para('abcdef')]),
        limited,
        model,
        'Editing is unavailable because this content exceeds a size limit.',
    ],
];

describe('copying without a full clipboard', () => {
    it('SPEC-rich-text-react/AC-086 copies the snapshot as plain text when the browser has no ClipboardItem', async () => {
        const { unmount } = breakAfterTyping();
        vi.stubGlobal('ClipboardItem', undefined);
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);

        fireEvent.click(screen.getByRole('button', { name: 'Copy content' }));

        await vi.waitFor(() => expect(writeText.mock.calls).toEqual([['cab']]));
        expect(screen.queryByText(COPY_FAILED)).toBeNull();
        unmount();
    });

    it('SPEC-rich-text-react/AC-086 shows a message and leaves no unhandled rejection when Copy content has no clipboard', async () => {
        const { unmount } = breakAfterTyping();
        const { rejections } = withoutClipboard();

        fireEvent.click(screen.getByRole('button', { name: 'Copy content' }));

        expect(await screen.findByText(COPY_FAILED)).toBeVisible();
        expect(await rejections()).toBe(0);
        unmount();
    });

    it('SPEC-rich-text-react/AC-087 shows a message and leaves no unhandled rejection when Copy original has no clipboard', async () => {
        const { unmount } = render(
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={stored({ ...envelope([para('ab')]), formatVersion: 2 })}
            />,
        );
        const { rejections } = withoutClipboard();

        fireEvent.click(screen.getByRole('button', { name: 'Copy original' }));

        expect(await screen.findByText(COPY_FAILED)).toBeVisible();
        expect(await rejections()).toBe(0);
        unmount();
    });
});

describe('the blocked shell', () => {
    it.each(BLOCKED)(
        'SPEC-rich-text-react/AC-087 SPEC-rich-text-format/AC-020 shows why %s blocks editing, copies the original and never saves',
        (_name, original, used, usedModel, message) => {
            const environment = createTestEnvironment({ seed: 1 });
            const spy = persistence();
            const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
            // Taken from a copy before the editor sees the input, so an editor that changed it in place fails.
            const reader = renderToStaticMarkup(
                <RichTextReader document={structuredClone(original)} model={usedModel} limits={used.limits} />,
            );
            let text = JSON.stringify(original);
            if (typeof original === 'string') {
                text = original;
            }
            const { unmount } = render(
                <RichTextEditor
                    aria-label="Notes"
                    definition={used}
                    defaultValue={stored(original)}
                    environment={environment}
                    services={{ persistence: spy as unknown as PersistenceService }}
                />,
            );
            act(() => {
                environment.flushFrames();
                environment.advance(2000);
            });

            expect(shell('blocked')).toHaveTextContent(message);
            expect(shell('blocked').innerHTML).toContain(reader);
            fireEvent.click(screen.getByRole('button', { name: 'Copy original' }));
            expect(writeText.mock.calls).toEqual([[text]]);
            expect(document.querySelector('[contenteditable]')).toBeNull();
            expect(spy.save).not.toHaveBeenCalled();
            unmount();
        },
    );
});
