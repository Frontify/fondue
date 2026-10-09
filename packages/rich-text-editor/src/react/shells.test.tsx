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
import { createTestEnvironment, typeText } from '#/testing';

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
    const tree = (armed: boolean) => (
        <RichTextEditor.Root
            aria-label="Notes"
            definition={definition}
            defaultValue={stored(envelope([para('ab')]))}
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
    return { ...view, environment, ref, spy, before };
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
});

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

describe('the blocked shell', () => {
    it.each(BLOCKED)(
        'SPEC-rich-text-react/AC-087 SPEC-rich-text-format/AC-020 shows why %s blocks editing, copies the original and never saves',
        (_name, original, used, usedModel, message) => {
            const environment = createTestEnvironment({ seed: 1 });
            const spy = persistence();
            const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
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
            const reader = renderToStaticMarkup(
                <RichTextReader document={original} model={usedModel} limits={used.limits} />,
            );
            expect(shell('blocked').innerHTML).toContain(reader);
            fireEvent.click(screen.getByRole('button', { name: 'Copy original' }));
            let text = JSON.stringify(original);
            if (typeof original === 'string') {
                text = original;
            }
            expect(writeText.mock.calls).toEqual([[text]]);
            expect(document.querySelector('[contenteditable]')).toBeNull();
            expect(spy.save).not.toHaveBeenCalled();
            unmount();
        },
    );
});
