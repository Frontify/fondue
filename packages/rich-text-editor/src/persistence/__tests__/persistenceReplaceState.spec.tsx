/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { type EditorHandle, RichTextEditor } from '#/index';
import { typeText } from '#/testing';

import {
    definition,
    para,
    chromeBlock,
    loaded,
    textOf,
    serviceOf,
    settle,
    peek,
    mount,
    replacing,
    textIn,
    replace,
    installPersistenceHooks,
} from './fixtures/mounted';

installPersistenceHooks();

describe('replacement of the session state', () => {
    const NOT_SENT = { status: 'failed', code: 'transport', outcome: 'not-sent' };
    const discard = { action: 'discard', confirmed: true } as const;
    const offline = () => {
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);

        return onLine;
    };

    /** A record whose first block is a chrome block, so a selection at its start differs from one at its end. */
    const withChromeFirst = () => ({
        ...loaded('revision-9', chromeBlock('b2'), para('next')),
        documentId: 'document-2',
    });

    it('sends the first write of the next generation under its own document and generation after the retries ran out', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({
            service,
            persistenceOptions: { maxRetries: 1 },
        });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        advance(2000);
        calls[1]?.fail();
        await settle();
        expect(handle().getSaveStatus().state).toBe('error');
        const { sessionId } = handle().getSummary().session;

        expect(await replace(handle(), { unsaved: discard })).toMatchObject({ status: 'replaced' });
        type('y');
        advance(500);

        expect(calls).toHaveLength(3);
        expect(calls[2]?.request).toMatchObject({
            stamp: { documentId: 'document-2', sessionId, generation: 1, sequence: 1 },
            baseRevision: 'revision-9',
        });
        unmount();
    });

    it('answers a requestCommit made before a discarding replacement as not sent, though the loaded record was acknowledged', async () => {
        const { service } = serviceOf();
        const { handle, type, flush, unmount } = mount({ service, revision: 'revision-1' });
        type('x');

        const committed = handle().requestCommit({ reason: 'navigate' });
        await replace(handle(), { unsaved: discard });
        await flush();
        await settle();

        expect(await committed).toEqual(NOT_SENT);
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('answers a requestCommit made before a saving replacement disposed when the editor is disposed during that save', async () => {
        const { service } = serviceOf(true);
        const { handle, type, flush, unmount } = mount({ service });
        type('x');

        const committed = handle().requestCommit({ reason: 'navigate' });
        const pending = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();
        act(() => handle().dispose());

        expect(await peek(committed)).toMatchObject({ status: 'failed', code: 'disposed' });
        expect(await pending).toMatchObject({ status: 'rejected', code: 'not-ready' });
        unmount();
    });

    it('drops a checkpoint pinned offline with a replacement, so the next write is the next document', async () => {
        const { service, calls } = serviceOf();
        const { handle, type, advance, flush, unmount } = mount({ service });
        const onLine = offline();
        type('x');
        const committed = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await committed).toEqual(NOT_SENT);

        expect(await replace(handle(), { unsaved: discard })).toMatchObject({ status: 'replaced' });
        onLine.mockRestore();
        type('y');
        advance(500);
        await settle();

        expect(calls.map(({ request }) => [request.stamp.documentId, textOf(request)])).toEqual([
            ['document-2', 'ynext'],
        ]);
        unmount();
    });

    it('refuses with save-unresolved when the save policy write times out with an unknown outcome', async () => {
        const { service } = serviceOf(true);
        const { handle, type, advance, flush, unmount } = mount({
            service,
            persistenceOptions: { timeoutMs: 1000 },
        });
        type('x');
        const pending = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();

        advance(1000);

        expect(await act(() => pending)).toEqual({ status: 'rejected', code: 'save-unresolved' });
        expect(handle().getSummary().phase).toBe('ready');
        unmount();
    });

    it('refuses a discard that is not confirmed with unsaved', async () => {
        const { handle, type, unmount } = mount({ service: serviceOf().service });
        type('x');

        const result = await replace(handle(), { unsaved: { action: 'discard' } as never });

        expect(result).toEqual({ status: 'rejected', code: 'unsaved' });
        expect(textIn(handle().getSnapshot().document)).toBe('xab');
        unmount();
    });

    it.each(['start', 'end'] as const)('puts the selection at the %s of the next document', async (selection) => {
        const { handle, unmount } = mount({ service: serviceOf().service });
        let blockType = 'chrome_block';
        if (selection === 'end') {
            blockType = 'paragraph';
        }

        await replace(handle(), { next: withChromeFirst(), selection });

        expect(handle().getSummary().selection).toMatchObject({ kind: 'text', collapsed: true, blockType });
        unmount();
    });

    it('saves the capabilities of the next document, not the first one, while an island keeps its content', async () => {
        const { handle, type, unmount } = mount({ service: serviceOf().service });
        const next = loaded('revision-9', para('next'), { type: 'widget', attrs: {} });
        const requiredCapabilities = [
            { id: 'core', version: 1 },
            { id: 'future.widget', version: 3 },
        ];

        const result = await replace(handle(), {
            next: {
                documentId: 'document-2',
                revision: 'revision-9',
                document: { ...next.document, requiredCapabilities },
            },
        });
        type('x');

        expect(result).toMatchObject({ status: 'replaced' });
        expect(handle().getSnapshot().document.requiredCapabilities).toEqual(requiredCapabilities);
        unmount();
    });

    it('reports the revision of the next document as acknowledged in an unmanaged session', async () => {
        const { handle, unmount } = mount({ revision: 'revision-1' });
        expect(handle().getSaveStatus().revision).toBe('revision-1');

        await replace(handle());

        expect(handle().getSaveStatus()).toMatchObject({
            state: 'unmanaged',
            revision: 'revision-9',
            acknowledgedSequence: 0,
        });
        unmount();
    });

    it('answers a second replaceDocument with not-ready while the first waits at step 5', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, flush, unmount } = mount({ service });
        type('x');
        const first = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();

        const second = await act(() => handle().replaceDocument(replacing(handle())));

        expect(second).toEqual({ status: 'rejected', code: 'not-ready' });
        expect(handle().getSummary().phase).toBe('transitioning');
        calls[0]?.answer();
        expect(await act(() => first)).toMatchObject({ status: 'replaced' });
        unmount();
    });

    it('replaces by the same document and a newer revision, in the next generation', async () => {
        const { handle, unmount } = mount({
            service: serviceOf().service,
            revision: 'revision-1',
        });
        const { document } = handle().getSnapshot();

        const result = await replace(handle(), {
            next: { documentId: 'document-1', revision: 'revision-2', document },
        });

        expect(result).toMatchObject({ status: 'replaced', session: { documentId: 'document-1', generation: 1 } });
        expect(handle().getSaveStatus().revision).toBe('revision-2');
        unmount();
    });

    it.each([
        ['wrong-model', 'test.other', 1 as const],
        ['invalid-document', 'test.persistence', 2 as 1],
    ] as const)(
        'reports %s for a request that also changed since it was made',
        async (code, modelId, formatVersion) => {
            const { handle, type, unmount } = mount({ service: serviceOf().service });
            const expected = handle().getSnapshot().stamp;
            type('x');
            const { document } = loaded('revision-9', para('next'));

            const result = await replace(handle(), {
                expected,
                next: {
                    documentId: 'document-2',
                    revision: 'revision-9',
                    document: { ...document, model: { id: modelId, version: 1 }, formatVersion },
                },
            });

            expect(result).toEqual({ status: 'rejected', code });
            unmount();
        },
    );

    it('makes the surface editable and not busy again after a rejected replacement', async () => {
        const { handle, type, unmount } = mount({ service: serviceOf().service });
        type('x');

        expect(await replace(handle())).toEqual({ status: 'rejected', code: 'unsaved' });

        const surface = screen.getByRole('textbox', { name: 'Notes' });
        expect(surface.getAttribute('contenteditable')).toBe('true');
        expect(surface.hasAttribute('aria-busy')).toBe(false);
        unmount();
    });

    it('emits the selection and save status changes, then replaced with the returned session', async () => {
        const { handle, type, unmount } = mount({ service: serviceOf().service });
        type('x');
        const order: string[] = [];
        const sessions: unknown[] = [];
        handle().subscribe('selectionChange', () => order.push('selectionChange'));
        handle().subscribe('saveStatusChange', () => order.push('saveStatusChange'));
        handle().subscribe('replaced', (session) => {
            order.push('replaced');
            sessions.push(session);
        });

        const result = await replace(handle(), { next: withChromeFirst(), unsaved: discard });

        expect(order).toEqual(['selectionChange', 'saveStatusChange', 'replaced']);
        expect(result).toMatchObject({ status: 'replaced' });
        if (result.status === 'replaced') {
            expect(sessions).toEqual([result.session]);
        }

        unmount();
    });

    it('starts the next generation clean after a Retry mount that held unsaved changes', async () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const { service } = serviceOf(true);
        const ref = createRef<EditorHandle<object>>();
        const Bomb = ({ armed }: { armed: boolean }) => {
            if (armed) {
                throw new Error('render failed');
            }

            return null;
        };

        const tree = (armed: boolean) => (
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={loaded('revision-1', para('ab'))}
                services={{ persistence: service }}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Bomb armed={armed} />
            </RichTextEditor.Root>
        );
        const view = render(tree(false));
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        act(() => typeText(ref.current as EditorHandle<object>, 'c'));
        view.rerender(tree(true));
        view.rerender(tree(false));
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const handle = ref.current as EditorHandle<object>;
        expect(handle.getSaveStatus().state).toBe('dirty');

        expect(await replace(handle, { unsaved: discard })).toMatchObject({ status: 'replaced' });

        expect(handle.getSaveStatus()).toMatchObject({ state: 'clean', acknowledgedSequence: 0 });
        view.unmount();
        consoleError.mockRestore();
    });

    it('starts a replacement by a new record below the first sequence and bases its first write on no revision', async () => {
        const { service, calls } = serviceOf();
        const { handle, type, advance, unmount } = mount({ service, revision: 'revision-1' });

        await replace(handle(), { next: { ...loaded(null, para('next')), documentId: 'document-2' } });

        expect(handle().getSaveStatus()).toMatchObject({ acknowledgedSequence: -1, revision: null });
        type('x');
        advance(500);
        await settle();
        expect(calls[0]?.request.baseRevision).toBeNull();
        unmount();
    });

    it('refuses with save-unresolved at step 6 while a write is in flight', async () => {
        const { service } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        expect(handle().getSaveStatus().state).toBe('saving');

        expect(await replace(handle(), { unsaved: discard })).toEqual({ status: 'rejected', code: 'save-unresolved' });
        unmount();
    });

    it('refuses with save-unresolved at step 6 while a write the network left unknown waits offline', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const onLine = offline();
        calls[0]?.fail();
        await settle();
        expect(handle().getSaveStatus().state).toBe('offline');

        expect(await replace(handle(), { unsaved: discard })).toEqual({ status: 'rejected', code: 'save-unresolved' });
        onLine.mockRestore();
        unmount();
    });
});
