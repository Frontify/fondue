/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { core, image, upload, mention } from '#/plugins';
import { ADA, advance, deferredService, page } from '#/plugins/Mention/__tests__/fixtures/mount';
import { pressKey, setSelection, typeText } from '#/testing';
import { probeUploads } from '#/testing/probeUploads';

import { caretAfterBefore, slot, started, cancel } from './fixtures/steps';
import { deferredUploads, mountUploads, para, pngFile, settle, text, uploadModel } from './fixtures/uploads';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe('an upload beside other async work', () => {
    it('aborts only a mention search when services.references changes, and keeps the upload, the view and the undo state', async () => {
        const search = deferredService();
        const uploads = deferredUploads();
        const mounted = await mountUploads({
            model: uploadModel([core(), image(), upload(), mention()]),
            uploads,
            services: { references: search.service, uploads: uploads.service },
        });
        caretAfterBefore(mounted);
        await mounted.choose([pngFile('logo.png')]);
        setSelection(mounted.handle, { text: 'Before', from: 6, to: 6 });
        typeText(mounted.handle, ' @ad');
        await advance(200);
        const undo = mounted.handle.query('history.undo');
        const { view } = mounted;

        await mounted.rerenderWith({ references: deferredService().service, uploads: uploads.service });
        search.pending[0]?.resolve(page([ADA]));
        await uploads.complete(0);

        expect(search.pending[0]?.context.signal.aborted).toBe(true);
        expect(uploads.pending[0]?.context.signal.aborted).toBe(false);
        expect(mounted.images()[0]?.assetId).toBe('asset-0');
        expect(mounted.view.state.doc.textContent).toBe('Before @ad');
        expect(mounted.runtime.view).toBe(view);
        expect(mounted.handle.query('history.undo')).toEqual(undo);
        mounted.unmount();
    });
});

describe('the release-gate sequence for media.image', () => {
    it('keeps the document and the service calls right through typing, alternative text, undo, redo, completion, cancel and deletion', async () => {
        const mounted = await mountUploads({ blocks: [para(text('ab'))] });
        const { uploads } = mounted;
        const calls = () => [uploads.upload.mock.calls.length, uploads.released()];
        const texts = () => mounted.view.state.doc.textContent;

        // Start an upload.
        setSelection(mounted.handle, { text: 'ab', from: 2, to: 2 });
        await mounted.choose([pngFile('first.png')]);
        const [first = ''] = mounted.imageIds();
        expect(mounted.images()).toEqual([{ nodeId: first, ...slot('first.png') }]);
        expect(calls()).toEqual([1, []]);

        // Type before the slot.
        setSelection(mounted.handle, { text: 'ab', from: 0, to: 0 });
        typeText(mounted.handle, 'x');
        await settle();
        expect(texts()).toBe('xab');
        expect(calls()).toEqual([1, []]);

        // Edit the alternative text, then undo and redo it.
        act(() => {
            mounted.runtime.nodeActions(first).update({ altIntent: 'meaningful', altText: 'First' });
        });
        await settle();
        expect(mounted.images()[0]).toMatchObject({ altIntent: 'meaningful', altText: 'First', assetId: null });
        await mounted.undo();
        expect(mounted.images()[0]).toMatchObject({ altIntent: 'missing', altText: '', assetId: null });
        await mounted.redo();
        expect(mounted.images()[0]).toMatchObject({ altIntent: 'meaningful', altText: 'First', assetId: null });
        expect(calls()).toEqual([1, []]);

        // Complete, then undo and redo the alternative text again; the asset stays.
        await uploads.complete(0);
        expect(mounted.images()[0]).toMatchObject({ assetId: 'asset-0', altText: 'First' });
        await mounted.undo();
        expect(mounted.images()[0]).toMatchObject({ assetId: 'asset-0', altText: '' });
        await mounted.redo();
        expect(mounted.images()[0]).toMatchObject({ assetId: 'asset-0', altText: 'First' });
        expect(texts()).toBe('xab');
        expect(calls()).toEqual([1, []]);

        // Cancel a second upload, then undo the cancel.
        await mounted.choose([pngFile('second.png')]);
        const second = mounted.imageIds().find((id) => id !== first) ?? '';
        expect(calls()).toEqual([2, []]);
        await cancel(mounted, second);
        expect(mounted.imageIds()).toEqual([first]);
        expect(calls()).toEqual([2, [uploads.operationOf(1)]]);
        await mounted.undo();
        expect(mounted.images().find(({ nodeId }) => nodeId === second)).toEqual({
            nodeId: second,
            ...slot('second.png'),
        });
        expect(calls()).toEqual([2, [uploads.operationOf(1)]]);

        // Delete a third slot, then complete its upload.
        await mounted.choose([pngFile('third.png')]);
        const third = mounted.imageIds().find((id) => id !== first && id !== second) ?? '';
        expect(calls()).toEqual([3, [uploads.operationOf(1)]]);
        setSelection(mounted.handle, { nodeId: mounted.figureOf(third) });
        act(() => pressKey(mounted.handle, 'Backspace'));
        await settle();
        expect(mounted.imageIds()).not.toContain(third);
        uploads.pending[2]?.resolve(uploads.asset(2));
        await settle();
        expect(mounted.imageIds()).not.toContain(third);
        expect(Object.fromEntries(mounted.images().map(({ nodeId, assetId }) => [nodeId, assetId]))).toEqual({
            [first]: 'asset-0',
            [second]: null,
        });
        expect(calls()).toEqual([3, [uploads.operationOf(1), uploads.operationOf(2)]]);
        mounted.unmount();
    });
});

describe('the completed-upload cache', () => {
    it('refuses new uploads with a media.cache-full warning once the cache is full, never evicting, until history resets', async () => {
        const restore = probeUploads().limitCache(2);
        try {
            const mounted = await mountUploads();
            caretAfterBefore(mounted);
            await mounted.choose([pngFile('a.png'), pngFile('b.png')]);
            await mounted.uploads.complete(0);
            await mounted.uploads.complete(1);
            const cache = probeUploads().caches.at(-1);
            expect(cache?.size).toBe(2);

            await mounted.choose([pngFile('c.png')]);

            expect(mounted.uploads.upload).toHaveBeenCalledTimes(2);
            expect(mounted.imageIds()).toHaveLength(2);
            expect(mounted.diagnostics.filter(({ code }) => code === 'media.cache-full')).toEqual([
                {
                    code: 'media.cache-full',
                    severity: 'warning',
                    messageKey: 'media.cache-full',
                    details: { entries: 2 },
                },
            ]);
            expect(cache?.size).toBe(2);

            act(() => mounted.runtime.clearHistory());
            await mounted.choose([pngFile('c.png')]);

            expect(cache?.size).toBe(0);
            expect(mounted.uploads.upload).toHaveBeenCalledTimes(3);
            mounted.unmount();
        } finally {
            restore();
        }
    });

    it('reads the cache only with the operation ID of the upload that created the slot, so an older result never fills it', async () => {
        const mounted = await started();
        await mounted.uploads.complete(0);
        const cache = probeUploads().caches.at(-1);
        if (cache === undefined) {
            throw new Error('No cache.');
        }

        await mounted.replace(mounted.nodeId, pngFile('photo.png'));
        await cancel(mounted, mounted.nodeId);
        const read = vi.spyOn(cache, 'read');

        await mounted.undo();
        expect(mounted.images()[0]).toMatchObject({ assetId: null, labelSnapshot: 'photo.png' });
        await mounted.redo();

        expect(mounted.images()[0]).toMatchObject({ assetId: 'asset-0', labelSnapshot: 'logo.png' });
        expect(read).toHaveBeenCalled();
        expect(new Set(read.mock.calls.map(([operationId]) => operationId))).toEqual(
            new Set([mounted.uploads.operationOf(1)]),
        );
        mounted.unmount();
    });

    it.each([
        ['replaceDocument', 'replace'],
        ['a history reset', 'reset'],
    ] as const)('empties the cache once %s succeeds', async (_name, how) => {
        const mounted = await started();
        await mounted.uploads.complete(0);
        const cache = probeUploads().caches.at(-1);
        expect(cache?.size).toBe(1);

        if (how === 'reset') {
            act(() => mounted.runtime.clearHistory());
        } else {
            const { document } = mounted.handle.getSnapshot();
            await act(async () => {
                await mounted.handle.replaceDocument({
                    expected: mounted.handle.getSnapshot().stamp,
                    next: { documentId: 'document-2', revision: null, document },
                    unsaved: { action: 'discard', confirmed: true },
                    selection: 'start',
                    history: 'reset',
                });
            });
        }

        expect(cache?.size).toBe(0);
        mounted.unmount();
    });

    it.each([
        ['disposed', 'dispose'],
        ['replaced', 'replace'],
    ] as const)(
        'releases only the completed upload that an undo took out of the document once the session is %s',
        async (_name, how) => {
            const mounted = await mountUploads();
            caretAfterBefore(mounted);
            await mounted.choose([pngFile('kept.png')]);
            await mounted.uploads.complete(0);
            await mounted.choose([pngFile('undone.png')]);
            await mounted.uploads.complete(1);
            await mounted.undo();
            expect(mounted.images().map(({ assetId }) => assetId)).toEqual(['asset-0']);
            expect(mounted.uploads.released()).toEqual([]);

            if (how === 'dispose') {
                mounted.unmount();
                await settle();
            } else {
                const empty = { ...mounted.handle.getSnapshot().document };
                await act(async () => {
                    await mounted.handle.replaceDocument({
                        expected: mounted.handle.getSnapshot().stamp,
                        next: { documentId: 'document-2', revision: null, document: empty },
                        unsaved: { action: 'discard', confirmed: true },
                        selection: 'start',
                        history: 'reset',
                    });
                });
            }

            expect(mounted.uploads.released()).toEqual([mounted.uploads.operationOf(1)]);
            if (how === 'replace') {
                mounted.unmount();
            }
        },
    );
});
