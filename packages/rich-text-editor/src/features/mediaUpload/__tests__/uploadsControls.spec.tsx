/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineEditorPart } from '#/entries/authoring';
import { core, mediaImage, mediaUpload } from '#/features';
import { deferredPicker, figure, PALETTE } from '#/features/mediaImage/__tests__/fixtures/mount';
import { defineFeature } from '#/model';

import { caretAfterBefore, slot, started, cancel } from './fixtures/steps';
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

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
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
    const acmePicker = defineEditorPart(acmePick, {
        needs: ['uploads'],
        commands: {
            'acme.image.pick': {
                payload: { fields: { nodeId: { type: 'string' } } },
                run: (api, _payload: { nodeId: string }) => {
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
