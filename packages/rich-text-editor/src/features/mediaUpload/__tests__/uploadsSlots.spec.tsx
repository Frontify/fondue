/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type RichTextSlice } from '#/model';
import { SLICE_TYPE } from '#/runtime/clipboard/slice';
import { paste, pressKey, probeRuntimes, setSelection } from '#/testing';

import { caretAfterBefore, slot, started, cancel } from './fixtures/steps';
import { deferredUploads, type MountedUploads, mountUploads, para, pngFile, settle, text } from './fixtures/uploads';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe('the upload slot', () => {
    it('inserts a slot from the toolbar as one undo step with origin command, holding the file name and its measured size', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);
        const depth = mounted.depth();

        await mounted.choose([pngFile('logo.png')]);

        expect(mounted.images()).toEqual([{ nodeId: mounted.imageIds()[0], ...slot('logo.png') }]);
        expect(mounted.depth()).toBe(depth + 1);
        expect(mounted.changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['command', 'image.insert'],
        ]);
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);
        expect(mounted.uploads.pending[0]?.request.filename).toBe('logo.png');
        expect(mounted.uploads.pending[0]?.request.blob.size).toBeGreaterThan(0);
        mounted.unmount();
    });

    it('removes the slot, aborts the request and restores the replaced paragraph on undo before completion, releasing it once', async () => {
        const mounted = await mountUploads({ blocks: [para(text('Before')), para()] });
        const end = mounted.runtime.state.doc.content.size - 1;
        act(() => mounted.runtime.select({ anchor: end, head: end }));
        const before = structuredClone(mounted.blocksOf());
        await mounted.choose([pngFile('logo.png')]);

        await mounted.undo();

        expect(mounted.blocksOf()).toEqual(before);
        expect(mounted.uploads.pending[0]?.context.signal.aborted).toBe(true);
        expect(mounted.uploads.released()).toEqual([mounted.uploads.operationOf(0)]);
        mounted.unmount();
    });

    it('restores the slot with no asset and Retry on redo after an undo before completion, starting no upload', async () => {
        const mounted = await started();
        await mounted.undo();

        await mounted.redo();

        expect(mounted.images()).toEqual([{ nodeId: mounted.nodeId, ...slot('logo.png') }]);
        expect(mounted.status(mounted.nodeId)?.state).toBe('stopped');
        expect(screen.getByRole('button', { name: 'Retry upload' })).toBeDefined();
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);
        mounted.unmount();
    });

    it('cancels as one undo step: the request aborts, the slot leaves, the empty paragraph it replaced comes back and the caret is there', async () => {
        const mounted = await mountUploads({ blocks: [para()] });
        const before = structuredClone(mounted.blocksOf());
        await mounted.choose([pngFile('logo.png')]);
        const [nodeId = ''] = mounted.imageIds();
        const depth = mounted.depth();

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Cancel upload' }));
        });
        await settle();

        expect(mounted.blocksOf()).toEqual(before);
        expect(mounted.depth()).toBe(depth + 1);
        expect(mounted.uploads.pending[0]?.context.signal.aborted).toBe(true);
        expect(mounted.uploads.released()).toEqual([mounted.uploads.operationOf(0)]);
        expect(mounted.runtime.state.selection.from).toBe(1);
        expect(mounted.view.hasFocus()).toBe(true);
        expect(mounted.status(nodeId)?.state).toBe('stopped');
        mounted.unmount();
    });

    it('restores a cancelled slot with Retry on undo, starts no upload, and cancels again on redo', async () => {
        const mounted = await started();
        await cancel(mounted, mounted.nodeId);
        const cancelled = structuredClone(mounted.blocksOf());

        await mounted.undo();
        expect(mounted.images()).toEqual([{ nodeId: mounted.nodeId, ...slot('logo.png') }]);
        expect(screen.getByRole('button', { name: 'Retry upload' })).toBeDefined();
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);

        await mounted.redo();
        expect(mounted.blocksOf()).toEqual(cancelled);
        expect(mounted.uploads.released()).toHaveLength(1);
        mounted.unmount();
    });

    it('sets the asset on the slot with no undo step, keeping its nodeId and size', async () => {
        const mounted = await started();
        const depth = mounted.depth();
        const sequence = mounted.handle.getSnapshot().stamp.sequence;

        await mounted.uploads.complete(0);

        expect(mounted.images()).toEqual([
            { ...slot('logo.png'), nodeId: mounted.nodeId, assetId: 'asset-0', mediaType: 'image/png' },
        ]);
        expect(mounted.depth()).toBe(depth);
        expect(mounted.changes.at(-1)?.origin).toBe('async');
        expect(mounted.handle.getSnapshot().stamp.sequence).toBe(sequence + 1);
        mounted.unmount();
    });

    it('keeps a failed slot with no asset, shows the error with Retry and Remove, and reports one media.upload-failed warning', async () => {
        const mounted = await started();
        const depth = mounted.depth();
        const stored = structuredClone(mounted.blocksOf());

        await mounted.uploads.fail(0);

        expect(mounted.blocksOf()).toEqual(stored);
        expect(mounted.depth()).toBe(depth);
        expect(mounted.view.dom.querySelector('figure')?.textContent).toContain(
            'The upload failed. Retry it, or remove the image.',
        );
        expect(screen.getByRole('button', { name: 'Retry upload' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Remove image' })).toBeDefined();
        expect(mounted.diagnostics.filter(({ code }) => code === 'media.upload-failed')).toEqual([
            { code: 'media.upload-failed', severity: 'warning', messageKey: 'media.upload-failed' },
        ]);
        expect(mounted.uploads.released()).toEqual([]);
        mounted.unmount();
    });

    it('retries a failed upload as a new operation that fills the same slot with no undo step', async () => {
        const mounted = await started();
        await mounted.uploads.fail(0);
        const depth = mounted.depth();

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Retry upload' }));
        });
        await settle();
        await mounted.uploads.complete(1);

        expect(mounted.uploads.upload).toHaveBeenCalledTimes(2);
        expect(mounted.uploads.operationOf(1)).not.toBe(mounted.uploads.operationOf(0));
        expect(mounted.images()[0]).toMatchObject({ nodeId: mounted.nodeId, assetId: 'asset-1' });
        expect(mounted.depth()).toBe(depth);
        mounted.unmount();
    });

    it('hands a retry to the async coordinator before the first await, with no document change', async () => {
        const mounted = await started();
        await mounted.uploads.fail(0);
        const snapshot = mounted.handle.getSnapshot();
        const before = probeRuntimes().operations.length;

        let result: ReturnType<typeof mounted.handle.execute> | undefined;
        act(() => {
            result = mounted.handle.execute('media.upload.retry', { nodeId: mounted.nodeId });
        });

        expect(result).toMatchObject({ status: 'no-op', contentChanged: false });
        expect(probeRuntimes().operations).toHaveLength(before + 1);
        expect(probeRuntimes().operations.at(-1)).toMatchObject({ service: 'uploads', featureId: 'media.image' });
        expect(mounted.handle.getSnapshot()).toBe(snapshot);
        mounted.unmount();
    });

    it('removes a failed slot with Remove as one undo step, and an undo after the failure removes the insertion', async () => {
        const removed = await started();
        await removed.uploads.fail(0);
        const depth = removed.depth();
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Remove image' }));
        });
        await settle();
        expect(removed.images()).toEqual([]);
        expect(removed.depth()).toBe(depth + 1);
        removed.unmount();

        const undone = await started();
        await undone.uploads.fail(0);
        await undone.undo();
        expect(undone.blocksOf()).toEqual([para(text('Before'))]);
        undone.unmount();
    });

    it('leaves an empty paragraph where Remove takes the failed slot that is the only block', async () => {
        const mounted = await mountUploads({ blocks: [para()] });
        await mounted.choose([pngFile('logo.png')]);
        await mounted.uploads.fail(0);
        const { doc } = mounted.view.state;
        const figure = doc.child(0);
        expect(figure.type.name).toBe('figure');
        // The slot's trailing paragraph is the only other block, so deleting it leaves the figure alone.
        act(() => mounted.view.dispatch(mounted.view.state.tr.delete(figure.nodeSize, doc.content.size)));
        expect(mounted.blocksOf().map(({ type }) => type)).toEqual(['figure']);

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Remove image' }));
        });
        await settle();

        expect(mounted.images()).toEqual([]);
        expect(mounted.blocksOf()).toMatchObject([{ type: 'paragraph' }]);
        mounted.unmount();
    });

    it('removes the whole insertion with one undo after success and restores the completed reference on redo without uploading again', async () => {
        const mounted = await started();
        await mounted.uploads.complete(0);
        const completed = structuredClone(mounted.blocksOf());

        await mounted.undo();
        expect(mounted.images()).toEqual([]);

        await mounted.redo();
        expect(mounted.blocksOf()).toEqual(completed);
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);
        expect(mounted.uploads.released()).toEqual([]);
        mounted.unmount();
    });

    it.each([
        ['cancel', async (mounted: MountedUploads & { readonly nodeId: string }) => cancel(mounted, mounted.nodeId)],
        ['undo', async (mounted: MountedUploads) => mounted.undo()],
        [
            'deletion of the slot',
            async (mounted: MountedUploads & { readonly nodeId: string }) => {
                setSelection(mounted.handle, { nodeId: mounted.figureOf(mounted.nodeId) });
                act(() => pressKey(mounted.handle, 'Backspace'));
                await settle();
            },
        ],
        [
            'replaceDocument',
            async (mounted: MountedUploads) => {
                const { document } = mounted.handle.getSnapshot();
                await act(async () => {
                    await mounted.handle.replaceDocument({
                        expected: mounted.handle.getSnapshot().stamp,
                        next: { documentId: 'document-2', revision: null, document: { ...document } },
                        unsaved: { action: 'discard', confirmed: true },
                        selection: 'start',
                        history: 'reset',
                    });
                });
            },
        ],
        [
            'a policy change',
            async (mounted: MountedUploads) => {
                const { policy } = mounted.runtime;
                const features = {
                    ...policy.features,
                    'media.image': { create: false, edit: true, remove: true, paste: true },
                };
                act(() => mounted.handle.updatePolicy({ ...policy, features }));
                await settle();
            },
        ],
        [
            'a changed services.uploads',
            async (mounted: MountedUploads) => mounted.rerenderWith({ uploads: deferredUploads().service }),
        ],
        [
            'a node view fault',
            async (mounted: MountedUploads) => {
                act(() => mounted.runtime.faultView());
                await settle();
            },
        ],
        [
            'a switch to read-only',
            async (mounted: MountedUploads) => {
                act(() => mounted.handle.setMode('readonly'));
                await settle();
            },
        ],
    ] as const)('inserts nothing and releases the upload once when its result arrives after %s', async (_name, end) => {
        const mounted = await started();
        await end(mounted as MountedUploads & { readonly nodeId: string });
        const after = structuredClone(mounted.blocksOf());

        mounted.uploads.pending[0]?.resolve(mounted.uploads.asset(0));
        await settle();

        expect(mounted.uploads.pending[0]?.context.signal.aborted).toBe(true);
        expect(mounted.blocksOf()).toEqual(after);
        expect(mounted.images().map(({ assetId }) => assetId)).not.toContain('asset-0');
        expect(mounted.uploads.released()).toEqual([mounted.uploads.operationOf(0)]);
        mounted.unmount();
    });

    it('inserts nothing and releases the upload once when the editor is disposed before its result arrives', async () => {
        const mounted = await started();

        mounted.unmount();
        mounted.uploads.pending[0]?.resolve(mounted.uploads.asset(0));
        await settle();

        expect(mounted.uploads.pending[0]?.context.signal.aborted).toBe(true);
        expect(mounted.uploads.released()).toEqual([mounted.uploads.operationOf(0)]);
    });

    it('gives a copied completed image a new nodeId and the same assetId', async () => {
        const mounted = await started();
        await mounted.uploads.complete(0);
        setSelection(mounted.handle, { nodeId: mounted.figureOf(mounted.nodeId) });
        const clipboardData = new DataTransfer();
        act(() => {
            mounted.view.dom.dispatchEvent(
                new ClipboardEvent('copy', { clipboardData, bubbles: true, cancelable: true }),
            );
        });
        const end = mounted.runtime.state.doc.content.size - 1;
        act(() => mounted.runtime.select({ anchor: end, head: end }));

        act(() => {
            paste(mounted.handle, {
                html: clipboardData.getData('text/html'),
                text: clipboardData.getData('text/plain'),
                slice: JSON.parse(clipboardData.getData(SLICE_TYPE)) as RichTextSlice,
            });
        });
        await settle();

        const [first, second] = mounted.images();
        expect(first?.assetId).toBe('asset-0');
        expect(second?.assetId).toBe('asset-0');
        const firstId = first?.nodeId;
        expect(second?.nodeId).not.toBe(firstId);
        mounted.unmount();
    });
});
