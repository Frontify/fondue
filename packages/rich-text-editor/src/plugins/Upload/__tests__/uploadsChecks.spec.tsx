/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineEditorPart } from '#/entries/authoring';
import { defineFeature } from '#/model';
import { compiledModel } from '#/model/internal';
import { core, mediaImage, mediaUpload } from '#/plugins';
import { deferredPicker, PALETTE } from '#/plugins/Image/__tests__/fixtures/mount';
import { paste, probeRuntimes, setSelection } from '#/testing';

import { caretAfterBefore, slot } from './fixtures/steps';
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
        const acmeRetrier = defineEditorPart(acmeRetry, {
            needs: ['uploads'],
            commands: {
                'acme.upload.retry': {
                    payload: { fields: { nodeId: { type: 'string' } } },
                    readOnly: true,
                    run: (api, payload: { nodeId: string }) => api.uploads.retry(payload.nodeId),
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

/** The bytes of a 40 by 30 pixel PNG header, the start of a large file. */
const declaredBytes = async () => new Uint8Array(await pngFile('x.png').arrayBuffer());
