/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SLICE_TYPE } from '#/clipboard/slice';
import { core, mediaImage, mediaUpload, mentions } from '#/features';
import { deferredPicker, figure, PALETTE } from '#/features/media-image/__tests__/fixtures/mount';
import { ADA, advance, deferredService, page } from '#/features/mentions/__tests__/fixtures/mount';
import { defineEditorPlugin } from '#/index';
import { defineFeature, type RichTextSlice } from '#/model';
import { compiledModel } from '#/model/compile';
import { paste, pressKey, probeRuntimes, setSelection, typeText } from '#/testing';
import { probeUploads } from '#/testing/probe-uploads';

import {
    deferredUploads,
    jpegFile,
    type MountedUploads,
    mountUploads,
    para,
    pngFile,
    recordAnnouncements,
    settle,
    text,
    uploadModel,
} from './fixtures/uploads';

const MIB = 1024 * 1024;
const ACCEPTED = 'PNG, JPEG, GIF, WebP, or AVIF';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

/** The caret at the end of `Before`, where the toolbar inserts a slot after the paragraph. */
const caretAfterBefore = (mounted: MountedUploads) => setSelection(mounted.handle, { text: 'Before', from: 6, to: 6 });

/** A slot's stored attributes at upload start, as the chosen PNG measured them. */
const slot = (name: string, width = 40, height = 30) => ({
    assetId: null,
    labelSnapshot: name,
    altIntent: 'missing',
    altText: '',
    width,
    height,
    displayWidth: null,
    mediaType: null,
});

/** Mounts the editor and uploads `logo.png` from the toolbar, which the fake service has not answered. */
const started = async (options: Parameters<typeof mountUploads>[0] = {}) => {
    const mounted = await mountUploads(options);
    caretAfterBefore(mounted);
    await mounted.choose([pngFile('logo.png')]);
    const [nodeId] = mounted.imageIds();
    if (nodeId === undefined) {
        throw new Error('No slot was inserted.');
    }
    return { ...mounted, nodeId };
};

const cancel = async (mounted: MountedUploads, nodeId: string) => {
    act(() => {
        mounted.handle.execute('media.upload.cancel', { nodeId });
    });
    await settle();
};

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

describe('an upload beside other async work', () => {
    it('aborts only a mention search when services.references changes, and keeps the upload, the view and the undo state', async () => {
        const search = deferredService();
        const uploads = deferredUploads();
        const mounted = await mountUploads({
            model: uploadModel([core(), mediaImage(), mediaUpload(), mentions()]),
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

describe('the controls an image insert and an upload start open', () => {
    // A host command that opens the asset picker with a payload naming an image, which the picker never refills.
    const acmePick = defineFeature({
        id: 'acme.pick',
        version: 1,
        requires: [
            { id: 'core', version: 1 },
            { id: 'media.image', version: 1 },
        ],
    });
    const acmePicker = defineEditorPlugin(acmePick, {
        commands: {
            'acme.image.pick': {
                payload: { fields: { nodeId: { type: 'string' } } },
                run: (api, _payload: { readonly nodeId: string }) => {
                    api.uploads.pick();
                    return true;
                },
            },
        },
    });

    it('inserts a new figure through the asset picker for a picker command whose payload names an image, leaving that image', async () => {
        const picker = deferredPicker();
        const uploads = deferredUploads();
        const mounted = await mountUploads({
            model: uploadModel([core(), mediaImage(), mediaUpload(), acmePick()]),
            plugins: [acmePicker],
            blocks: [para(text('Before')), figure('image-1')],
            uploads,
            services: { assets: picker.service, uploads: uploads.service },
        });
        caretAfterBefore(mounted);

        act(() => {
            mounted.handle.execute('acme.image.pick' as never, { nodeId: 'image-1' } as never);
        });
        picker.pending[0]?.resolve(PALETTE);
        await settle();

        expect(
            mounted.images().map(({ nodeId, assetId }) => [nodeId === 'image-1' ? 'image-1' : 'new', assetId]),
        ).toEqual([
            ['new', 'asset-palette'],
            ['image-1', 'asset-logo'],
        ]);
        mounted.unmount();
    });

    it('opens the file chooser for one file to replace the image with Replace, and for many files with Image, without services.assets', async () => {
        const mounted = await mountUploads({ blocks: [para(text('Before')), figure('image-1')] });
        caretAfterBefore(mounted);

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Image' }));
        });
        expect(mounted.chooser().multiple).toBe(true);
        await mounted.replace('image-1', pngFile('photo.png'));

        expect(mounted.chooser().multiple).toBe(false);
        expect(mounted.images()).toEqual([expect.objectContaining({ nodeId: 'image-1', labelSnapshot: 'photo.png' })]);
        mounted.unmount();
    });

    it('uploads nothing from a file chooser that opened before replaceDocument', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Image' }));
        });
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

        act(() => {
            fireEvent.change(mounted.chooser(), { target: { files: [pngFile('logo.png')] } });
        });
        await settle();

        expect(mounted.images()).toEqual([]);
        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        mounted.unmount();
    });
});

describe('a replacement', () => {
    /** An editor with one completed upload, `logo.png`, then a replacement with `photo.png` not answered yet. */
    const replacing = async () => {
        const mounted = await started();
        await mounted.uploads.complete(0);
        act(() => {
            mounted.runtime.nodeActions(mounted.nodeId).update({ altIntent: 'meaningful', altText: 'Frontify logo' });
        });
        await mounted.replace(mounted.nodeId, pngFile('photo.png', 80, 60));
        return mounted;
    };

    it('starts as one undo step that keeps the nodeId and the alternative text, with the new file name and size and no asset', async () => {
        const mounted = await started();
        await mounted.uploads.complete(0);
        act(() => {
            mounted.runtime.nodeActions(mounted.nodeId).update({ altIntent: 'meaningful', altText: 'Frontify logo' });
        });
        const depth = mounted.depth();

        await mounted.replace(mounted.nodeId, pngFile('photo.png', 80, 60));

        expect(mounted.images()).toEqual([
            {
                ...slot('photo.png', 80, 60),
                nodeId: mounted.nodeId,
                altIntent: 'meaningful',
                altText: 'Frontify logo',
                mediaType: 'image/png',
            },
        ]);
        expect(mounted.depth()).toBe(depth + 1);
        expect(mounted.changes.at(-1)?.commandId).toBe('image.replace');
        expect(mounted.uploads.operationOf(1)).not.toBe(mounted.uploads.operationOf(0));
        mounted.unmount();
    });

    it.each([
        ['cancel', async (mounted: MountedUploads, nodeId: string) => cancel(mounted, nodeId)],
        ['undo', async (mounted: MountedUploads) => mounted.undo()],
    ] as const)('gives the image its previous file back and never removes it on %s', async (_name, end) => {
        const mounted = await replacing();
        const [image] = mounted.images();

        await end(mounted, image?.nodeId as string);

        expect(mounted.images()).toEqual([
            {
                ...slot('logo.png'),
                nodeId: image?.nodeId,
                assetId: 'asset-0',
                altIntent: 'meaningful',
                altText: 'Frontify logo',
                mediaType: 'image/png',
            },
        ]);
        expect(mounted.uploads.pending[1]?.context.signal.aborted).toBe(true);
        expect(mounted.uploads.released()).toEqual([mounted.uploads.operationOf(1)]);
        mounted.unmount();
    });

    it('uploads a file chosen again for an image whose upload did not finish before a reload, and a cancel keeps the image', async () => {
        const blocks = [para(text('Before')), figure('image-1', { assetId: null, labelSnapshot: 'old.png' })];
        const mounted = await mountUploads({ blocks });
        expect(mounted.view.dom.querySelector('figure')?.textContent).toContain('Upload did not finish');

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Choose file again' }));
        });
        act(() => {
            fireEvent.change(mounted.chooser(), { target: { files: [pngFile('new.png')] } });
        });
        await settle();
        expect(mounted.chooser().multiple).toBe(false);
        expect(mounted.images()[0]).toMatchObject({ nodeId: 'image-1', assetId: null, labelSnapshot: 'new.png' });
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);

        await cancel(mounted, 'image-1');

        expect(mounted.images()[0]).toMatchObject({ nodeId: 'image-1', assetId: null, labelSnapshot: 'old.png' });
        expect(mounted.uploads.pending[0]?.context.signal.aborted).toBe(true);
        mounted.unmount();
    });

    it('fails as an upload fails, and an undo then restores the previous image', async () => {
        const mounted = await replacing();
        await mounted.uploads.fail(1);
        expect(mounted.images()[0]).toMatchObject({ assetId: null, labelSnapshot: 'photo.png' });
        expect(screen.getByRole('button', { name: 'Retry upload' })).toBeDefined();

        await mounted.undo();

        expect(mounted.images()[0]).toMatchObject({ assetId: 'asset-0', labelSnapshot: 'logo.png' });
        mounted.unmount();
    });

    it('gives an animated GIF its mediaType back when an undo takes back its completed replacement by a JPEG', async () => {
        const blocks = [para(text('Before')), figure('image-1', { mediaType: 'image/gif', labelSnapshot: 'cat.gif' })];
        const mounted = await mountUploads({ blocks });
        await mounted.replace('image-1', jpegFile('photo.jpg', 64, 48));
        mounted.uploads.pending[0]?.resolve({
            assetId: 'asset-photo',
            mediaType: 'image/jpeg',
            labelSnapshot: 'photo.jpg',
        });
        await settle();
        expect(mounted.images()[0]).toMatchObject({ assetId: 'asset-photo', mediaType: 'image/jpeg' });

        await mounted.undo();

        expect(mounted.images()[0]).toMatchObject({
            assetId: 'asset-logo',
            labelSnapshot: 'cat.gif',
            mediaType: 'image/gif',
        });
        mounted.unmount();
    });

    it('asks the author to review the alternative text once the new file is uploaded', async () => {
        const mounted = await replacing();

        await mounted.uploads.complete(1);

        expect(mounted.images()[0]).toMatchObject({ assetId: 'asset-1', altText: 'Frontify logo' });
        expect(mounted.view.dom.querySelector('figure')?.textContent).toContain(
            'The image changed. Check that its alternative text still describes it.',
        );
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

describe('upload progress', () => {
    it('shows progress in the chrome, never in the document, so the snapshots at 10% and 90% are equal', async () => {
        const mounted = await started();
        const upload = mounted.uploads.pending[0];

        act(() => upload?.context.reportProgress(0.1));
        await settle();
        const atTen = mounted.handle.getSnapshot();
        const changes = mounted.changes.length;
        act(() => upload?.context.reportProgress(0.9));
        await settle();

        expect(mounted.handle.getSnapshot()).toBe(atTen);
        expect(mounted.changes).toHaveLength(changes);
        expect(screen.getByRole('button', { name: 'Cancel upload' })).toBeDefined();
        mounted.unmount();
    });

    it('exposes the progress as a progressbar named by the file, from 0 to 100, at 10% and 90%', async () => {
        const mounted = await started();
        const upload = mounted.uploads.pending[0];

        for (const fraction of [0.1, 0.9]) {
            act(() => upload?.context.reportProgress(fraction));
            await settle();
            const bar = screen.getByRole('progressbar', { name: 'logo.png' });
            expect(bar.getAttribute('aria-valuenow')).toBe(String(fraction * 100));
            expect(bar.getAttribute('aria-valuemin')).toBe('0');
            expect(bar.getAttribute('aria-valuemax')).toBe('100');
            expect(mounted.view.dom.querySelector('figure')?.textContent).toContain(`${fraction * 100}% uploaded`);
        }
        mounted.unmount();
    });

    it('stops the indeterminate animation of a slow upload after 5 seconds and leaves its text', async () => {
        const mounted = await started();
        const still = () => mounted.view.dom.querySelector('[data-still] [data-indeterminate="true"]');
        expect(screen.getByRole('progressbar', { name: 'logo.png' }).getAttribute('aria-valuenow')).toBeNull();

        await act(async () => {
            await vi.advanceTimersByTimeAsync(4999);
        });
        expect(still()).toBeNull();
        await act(async () => {
            await vi.advanceTimersByTimeAsync(1);
        });

        expect(still()).not.toBeNull();
        expect(mounted.view.dom.querySelector('figure')?.textContent).toContain('Uploading…');
        mounted.unmount();
    });

    it('announces each upload start, end, failure and cancel once in the live region, and nothing for its progress steps', async () => {
        const mounted = await mountUploads();
        const record = recordAnnouncements();
        caretAfterBefore(mounted);

        await mounted.choose([pngFile('done.png')]);
        for (let percent = 1; percent <= 100; percent += 1) {
            act(() => mounted.uploads.pending[0]?.context.reportProgress(percent / 100));
        }
        await mounted.uploads.complete(0);
        await mounted.choose([pngFile('broken.png')]);
        await mounted.uploads.fail(1);
        await mounted.choose([pngFile('dropped.png')]);
        await cancel(mounted, mounted.imageIds().at(-1) ?? '');
        await record.stop();

        expect(record.messages).toEqual([
            'Uploading: done.png',
            'Uploaded: done.png. It has no alternative text yet.',
            'Uploading: broken.png',
            'Upload failed: broken.png',
            'Uploading: dropped.png',
            'Upload cancelled: dropped.png',
        ]);
        mounted.unmount();
    });

    it('isolates a right-to-left file name in one bdi of the English message', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);
        const region = screen.getByTestId('fondue-rich-text-editor-announcer');

        await mounted.choose([pngFile('شعار.png')]);

        expect(region.textContent).toBe('Uploading: شعار.png');
        expect([...region.querySelectorAll('bdi')].map((element) => element.textContent)).toEqual(['شعار.png']);
        mounted.unmount();
    });
});

describe('the checks before an upload', () => {
    it('reads the headers of 30 pasted files at most maxConcurrentUploads at a time', async () => {
        const mounted = await mountUploads({ blocks: [para(text('ab'))], limits: { maxConcurrentUploads: 3 } });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });
        const read = Blob.prototype.arrayBuffer;
        let open = 0;
        let most = 0;
        vi.spyOn(Blob.prototype, 'arrayBuffer').mockImplementation(function (this: Blob) {
            open += 1;
            most = Math.max(most, open);
            return read.call(this).finally(() => {
                open -= 1;
            });
        });
        const files = Array.from({ length: 30 }, (_, index) => pngFile(`image-${index + 1}.png`));

        act(() => {
            paste(mounted.handle, { files });
        });
        for (let round = 0; round < 10; round += 1) {
            await settle();
        }

        expect(most).toBe(3);
        expect(mounted.imageIds()).toHaveLength(30);
        mounted.unmount();
    });

    it('refuses a 30 MiB file and a text/html file before calling the service, saying which types and size it accepts', async () => {
        const mounted = await mountUploads();
        const record = recordAnnouncements();
        caretAfterBefore(mounted);
        const large = new File([await declaredBytes(), new Uint8Array(30 * MIB)], 'poster.png', { type: 'image/png' });
        const html = new File(['<p>Hello</p>'], 'page.html', { type: 'text/html' });

        await mounted.choose([large, html]);
        await record.stop();

        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        expect(mounted.images()).toEqual([]);
        expect(record.messages).toEqual([
            `poster.png was not uploaded because it is too large. Choose a file of type ${ACCEPTED}, of up to 25 MB. ` +
                `page.html was not uploaded because its file type is not accepted. Choose a file of type ${ACCEPTED}, of up to 25 MB.`,
        ]);
        mounted.unmount();
    });

    it("names the definition's maxAssetBytes and the feature's acceptTypes in the message of a refused file", async () => {
        const model = uploadModel([core(), mediaImage({ acceptTypes: ['image/png', 'image/svg+xml'] }), mediaUpload()]);
        const mounted = await mountUploads({ model, limits: { maxAssetBytes: 5 * MIB } });
        caretAfterBefore(mounted);

        await mounted.choose([jpegFile('photo.jpg', 640, 480)]);

        expect(mounted.announced()).toBe(
            'photo.jpg was not uploaded because its file type is not accepted. Choose a file of type PNG or SVG, of up to 5 MB.',
        );
        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        mounted.unmount();
    });

    it('refuses a 20,000 by 20,000 pixel PNG under 1 MiB from its header, before decoding it or calling the service', async () => {
        const createImageBitmap = vi.fn();
        vi.stubGlobal('createImageBitmap', createImageBitmap);
        const mounted = await mountUploads();
        caretAfterBefore(mounted);
        const file = pngFile('huge.png', 20_000, 20_000);
        expect(file.size).toBeLessThan(MIB);

        await mounted.choose([file]);

        expect(mounted.announced()).toBe(
            'huge.png was not uploaded because the image has too many pixels. Choose an image of at most 89.5 megapixels and 65,535 pixels on each side.',
        );
        expect(createImageBitmap).not.toHaveBeenCalled();
        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        expect(mounted.images()).toEqual([]);
        mounted.unmount();
    });

    it('refuses a PNG over 65,535 pixels on one side whose pixel count is within the limit', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);

        await mounted.choose([pngFile('strip.png', 70_000, 10)]);

        expect(mounted.announced()).toContain('strip.png was not uploaded because the image has too many pixels.');
        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        mounted.unmount();
    });

    it('accepts PNG, JPEG, GIF, WebP and AVIF and refuses SVG when acceptTypes is not set', async () => {
        const model = uploadModel();
        const feature = compiledModel(model).features.find(({ id }) => id === 'media.image');
        expect(feature?.options.acceptTypes).toEqual([
            'image/png',
            'image/jpeg',
            'image/gif',
            'image/webp',
            'image/avif',
        ]);
        const mounted = await mountUploads({ model });
        caretAfterBefore(mounted);
        expect(mounted.chooser().accept).toBe('');
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Image' }));
        });
        expect(mounted.chooser().accept).toBe('image/png,image/jpeg,image/gif,image/webp,image/avif');
        expect(mounted.chooser().multiple).toBe(true);

        const svg = new File(['<svg xmlns="http://www.w3.org/2000/svg"/>'], 'logo.svg', { type: 'image/svg+xml' });
        const record = recordAnnouncements();
        act(() => {
            fireEvent.change(mounted.chooser(), { target: { files: [svg, jpegFile('photo.jpg', 640, 480)] } });
        });
        await record.stop();

        expect(record.messages).toEqual([
            `logo.svg was not uploaded because its file type is not accepted. Choose a file of type ${ACCEPTED}, of up to 25 MB. Uploading: photo.jpg`,
        ]);
        expect(mounted.images()).toEqual([{ nodeId: mounted.imageIds()[0], ...slot('photo.jpg', 640, 480) }]);
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);
        mounted.unmount();
    });
});

describe('concurrent uploads', () => {
    it('runs at most 3 uploads at once and starts each queued one when a running one ends, until all 5 complete', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);
        const files = ['a', 'b', 'c', 'd', 'e'].map((name) => pngFile(`${name}.png`));

        await mounted.choose(files);
        expect(mounted.imageIds()).toHaveLength(5);
        expect(mounted.uploads.open()).toHaveLength(3);
        expect(mounted.imageIds().map((id) => mounted.status(id)?.state)).toEqual([
            'running',
            'running',
            'running',
            'queued',
            'queued',
        ]);

        const counts: (readonly [number, number])[] = [];
        for (let index = 0; index < 5; index += 1) {
            await mounted.uploads.complete(index);
            counts.push([mounted.uploads.upload.mock.calls.length, mounted.uploads.open().length]);
        }

        expect(counts).toEqual([
            [4, 3],
            [5, 3],
            [5, 2],
            [5, 1],
            [5, 0],
        ]);

        expect(mounted.images().map(({ assetId }) => assetId)).toEqual([
            'asset-0',
            'asset-1',
            'asset-2',
            'asset-3',
            'asset-4',
        ]);
        mounted.unmount();
    });

    it.each([
        ['a node view fault', (mounted: MountedUploads) => mounted.runtime.faultView()],
        ['a switch to read-only', (mounted: MountedUploads) => mounted.handle.setMode('readonly')],
    ] as const)(
        'aborts the running and the queued uploads on %s, starting none and leaving no failed slot',
        async (_name, end) => {
            const mounted = await mountUploads({ limits: { maxConcurrentUploads: 1 } });
            caretAfterBefore(mounted);
            await mounted.choose([pngFile('a.png'), pngFile('b.png')]);
            expect(mounted.uploads.open()).toHaveLength(1);

            act(() => end(mounted));
            await settle();
            await mounted.uploads.complete(0);

            expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);
            expect(mounted.uploads.pending[0]?.context.signal.aborted).toBe(true);
            expect(mounted.uploads.released()).toEqual([mounted.uploads.operationOf(0)]);
            expect(mounted.imageIds().map((id) => mounted.status(id)?.state)).toEqual(['stopped', 'stopped']);
            expect(probeRuntimes().operations).toEqual([]);
            mounted.unmount();
        },
    );

    it('keeps the host asset picker open across a switch to read-only and back, and inserts what it picks', async () => {
        const picker = deferredPicker();
        const uploads = deferredUploads();
        const mounted = await mountUploads({ uploads, services: { assets: picker.service, uploads: uploads.service } });
        caretAfterBefore(mounted);
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Image' }));
        });

        act(() => mounted.handle.setMode('readonly'));
        act(() => mounted.handle.setMode('editable'));
        picker.pending[0]?.resolve(PALETTE);
        await settle();

        expect(picker.pending[0]?.context.signal.aborted).toBe(false);
        expect(mounted.images().map(({ assetId }) => assetId)).toEqual(['asset-palette']);
        mounted.unmount();
    });

    it('retries no upload that read-only stopped, even from a command that runs in read-only', async () => {
        const acmeRetry = defineFeature({
            id: 'acme.retry',
            version: 1,
            requires: [
                { id: 'core', version: 1 },
                { id: 'media.image', version: 1 },
            ],
        });
        const acmeRetrier = defineEditorPlugin(acmeRetry, {
            commands: {
                'acme.upload.retry': {
                    payload: { fields: { nodeId: { type: 'string' } } },
                    readOnly: true,
                    run: (api, payload: { readonly nodeId: string }) => api.uploads.retry(payload.nodeId),
                },
            },
        });
        const mounted = await mountUploads({
            model: uploadModel([core(), mediaImage(), mediaUpload(), acmeRetry()]),
            plugins: [acmeRetrier],
        });
        caretAfterBefore(mounted);
        await mounted.choose([pngFile('logo.png')]);
        const [nodeId = ''] = mounted.imageIds();
        act(() => mounted.handle.setMode('readonly'));
        await settle();

        let result: unknown;
        act(() => {
            result = mounted.handle.execute('acme.upload.retry' as never, { nodeId } as never);
        });
        await settle();

        expect(result).toMatchObject({ status: 'rejected' });
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);
        expect(mounted.status(nodeId)?.state).toBe('stopped');
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

describe('alternative text after an upload', () => {
    it('shows a visible Add alternative text button that opens the dialog once an upload completes with altIntent missing', async () => {
        const mounted = await started();
        await mounted.uploads.complete(0);
        expect(mounted.images()[0]?.altIntent).toBe('missing');

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Add alternative text' }));
        });
        await settle();

        expect(screen.getByRole('dialog', { name: 'Alternative text' })).toBeDefined();
        mounted.unmount();
    });

    it('opens the dialog after uploading IMG_2044.jpg with an empty field, prefilled with neither the file name nor its type', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);
        await mounted.choose([jpegFile('IMG_2044.jpg', 4032, 3024)]);
        await mounted.uploads.complete(0);

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Add alternative text' }));
        });
        await settle();

        const field = screen.getByRole('textbox', { name: 'Alternative text' });
        expect((field as HTMLInputElement).value).toBe('');
        mounted.unmount();
    });
});

describe('the Image entry of the toolbar', () => {
    it('shows as an Image row of the More menu when the toolbar has no room for it', async () => {
        const picker = deferredPicker();
        const mounted = await mountUploads({ toolbar: [['history.undo']], services: { assets: picker.service } });

        act(() => {
            fireEvent.keyDown(document.querySelector('[data-rte-toolbar-more]') as HTMLElement, { key: 'Enter' });
        });

        expect(screen.getByRole('menuitem', { name: 'Image' })).toBeInTheDocument();
        mounted.unmount();
    });
});

/** The bytes of a 40 by 30 pixel PNG header, the start of a large file. */
const declaredBytes = async () => new Uint8Array(await pngFile('x.png').arrayBuffer());
