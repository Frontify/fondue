/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type AssetValue, type SaveResponse, type UploadRequest } from '#/index';
import { core, mediaImage, mediaUpload } from '#/plugins';
import { setSelection, typeText } from '#/testing';
import { decodableImage } from '#/testing/images';

import {
    deferredUploads,
    type MountedUploads,
    mountUploads,
    pngFile,
    recordAnnouncements,
    settle,
    uploadModel,
} from './fixtures/uploads';

const ACCEPTED = 'PNG, JPEG, GIF, WebP, or AVIF';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

const caretAfterBefore = (mounted: MountedUploads) => setSelection(mounted.handle, { text: 'Before', from: 6, to: 6 });

/** Mounts the editor and uploads `logo.png` from the toolbar, which the service has not answered. */
const started = async (options: Parameters<typeof mountUploads>[0] = {}) => {
    const mounted = await mountUploads(options);
    caretAfterBefore(mounted);
    await mounted.choose([pngFile('logo.png')]);

    return { ...mounted, nodeId: mounted.imageIds()[0] ?? '' };
};

const run = async (mounted: MountedUploads, id: 'media.upload.cancel' | 'media.upload.retry', nodeId: string) => {
    act(() => {
        mounted.handle.execute(id, { nodeId });
    });
    await settle();
};

/** A JPEG of 640 by 480 pixels whose frame header comes after `comments` comment segments. */
const commentedJpeg = async (name: string, comments: number, frame = true) => {
    const jpeg = await decodableImage('image/jpeg', 640, 480);
    const sof = jpeg.findIndex((byte, index) => byte === 0xff && jpeg[index + 1] === 0xc0);
    const segments = Array.from({ length: comments }, () => Uint8Array.from([0xff, 0xfe, 0x00, 0x04, 0x20, 0x20]));
    const rest = frame ? jpeg.subarray(2) : new Uint8Array([...jpeg.subarray(2, sof), ...jpeg.subarray(sof + 19)]);

    return new File([jpeg.subarray(0, 2), ...segments, rest], name, { type: 'image/jpeg' });
};

describe('the checks before an upload, by the content of the file', () => {
    it('uploads a JPEG whose frame header comes after 300 comment segments with the size that header declares', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);

        await mounted.choose([await commentedJpeg('photo.jpg', 300)]);

        expect(mounted.images()[0]).toMatchObject({ labelSnapshot: 'photo.jpg', width: 640, height: 480 });
        mounted.unmount();
    });

    it('refuses a JPEG whose header tells no size, saying how to fix it, before calling the service', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);

        await mounted.choose([await commentedJpeg('photo.jpg', 2, false)]);

        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        expect(mounted.images()).toEqual([]);
        expect(mounted.announced()).toBe(
            `photo.jpg was not uploaded because its image size cannot be read. Choose a file of type ${ACCEPTED}, of up to 25 MB.`,
        );
        mounted.unmount();
    });

    it('refuses SVG markup after padding, named photo.png, as content of no accepted type', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);
        const markup = `${' '.repeat(4000)}<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>`;

        await mounted.choose([new File([markup], 'photo.png', { type: 'image/png' })]);

        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        expect(mounted.announced()).toContain('photo.png was not uploaded because its file type is not accepted.');
        mounted.unmount();
    });

    it('refuses an SVG with an entity-encoded script in a foreignObject where the host accepts SVG, and uploads a plain one', async () => {
        const model = uploadModel([core(), mediaImage({ acceptTypes: ['image/png', 'image/svg+xml'] }), mediaUpload()]);
        const mounted = await mountUploads({ model });
        caretAfterBefore(mounted);
        const svg = (body: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">${body}</svg>`;
        const active = svg('<foreignObject><iframe srcdoc="&lt;script&gt;alert(1)&lt;/script&gt;"/></foreignObject>');
        const record = recordAnnouncements();

        await mounted.choose([
            new File([active], 'badge.svg', { type: 'image/svg+xml' }),
            new File([svg('<rect width="10" height="10"/>')], 'plain.svg', { type: 'image/svg+xml' }),
        ]);
        await record.stop();

        expect(mounted.uploads.pending.map(({ request }) => request.filename)).toEqual(['plain.svg']);
        expect(record.messages).toEqual([
            'badge.svg was not uploaded because the SVG holds script. Choose a file of type PNG or SVG, of up to 25 MB. Uploading: plain.svg',
        ]);
        mounted.unmount();
    });
});

describe("the service's answer", () => {
    it.each([
        ['an assetId that is a URL', { assetId: 'https://cdn.frontify.test/logo.png', mediaType: 'image/png' }],
        ['an assetId that carries a signature', { assetId: 'asset-1?X-Amz-Signature=abc', mediaType: 'image/png' }],
        ['a mediaType the session does not accept', { assetId: 'asset-1', mediaType: 'text/html' }],
    ])('fails the upload, keeps assetId null and releases the upload once for %s', async (_name, answer) => {
        const mounted = await started();

        mounted.uploads.pending[0]?.resolve({ ...answer, labelSnapshot: 'logo.png' } as AssetValue);
        await settle();

        expect(mounted.images()[0]).toMatchObject({ assetId: null, labelSnapshot: 'logo.png' });
        expect(mounted.status(mounted.nodeId)?.state).toBe('failed');
        expect(mounted.uploads.released()).toEqual([mounted.uploads.operationOf(0)]);
        expect(mounted.diagnostics.filter(({ code }) => code === 'media.upload-failed')).toHaveLength(1);
        mounted.unmount();
    });

    it('fails the upload with Retry and releases it once for an answer whose assetId getter throws', async () => {
        const mounted = await started();
        const answer = {
            get assetId(): string {
                throw new Error('hostile getter');
            },
            mediaType: 'image/png',
            labelSnapshot: 'logo.png',
        };

        mounted.uploads.pending[0]?.resolve(answer);
        await settle();

        expect(mounted.images()[0]).toMatchObject({ assetId: null, labelSnapshot: 'logo.png' });
        expect(mounted.status(mounted.nodeId)?.state).toBe('failed');
        expect(screen.getByRole('button', { name: 'Retry upload' })).toBeDefined();
        expect(mounted.uploads.released()).toEqual([mounted.uploads.operationOf(0)]);
        mounted.unmount();
    });

    it('cuts a labelSnapshot longer than maxAttributeLength to that length', async () => {
        const mounted = await started({ limits: { maxAttributeLength: 16 } });

        mounted.uploads.pending[0]?.resolve({
            assetId: 'asset-1',
            mediaType: 'image/png',
            labelSnapshot: 'x'.repeat(40),
        });
        await settle();

        expect(mounted.images()[0]).toMatchObject({ assetId: 'asset-1', labelSnapshot: 'x'.repeat(16) });
        mounted.unmount();
    });
});

describe('the release of an upload that must not remain', () => {
    it('calls releaseUnused once the service answers a cancelled upload, not while its request may still run', async () => {
        let answer: (asset: AssetValue) => void = () => undefined;
        const releaseUnused = vi.fn(() => Promise.resolve());
        // A service that answers whatever the signal says, as one that cannot stop its request does.
        const upload = vi.fn(
            (_request: UploadRequest) =>
                new Promise<AssetValue>((resolve) => {
                    answer = resolve;
                }),
        );
        const mounted = await started({ services: { uploads: { upload, releaseUnused } } });

        await run(mounted, 'media.upload.cancel', mounted.nodeId);
        expect(releaseUnused).not.toHaveBeenCalled();
        answer({ assetId: 'asset-1', mediaType: 'image/png', labelSnapshot: 'logo.png' });
        await settle();

        expect(releaseUnused).toHaveBeenCalledTimes(1);
        expect(releaseUnused).toHaveBeenCalledWith(upload.mock.calls[0]?.[0].operationId, expect.anything());
        expect(mounted.images()).toEqual([]);
        mounted.unmount();
    });
});

describe('Cancel after a retry or a history reset', () => {
    it.each([
        [
            'an edit elsewhere',
            async (mounted: MountedUploads) => {
                setSelection(mounted.handle, { text: 'Before', from: 0, to: 0 });
                typeText(mounted.handle, 'x');
                await settle();
            },
        ],
        [
            'an undo and a redo of that edit',
            async (mounted: MountedUploads) => {
                setSelection(mounted.handle, { text: 'Before', from: 0, to: 0 });
                typeText(mounted.handle, 'x');
                await mounted.undo();
                await mounted.redo();
            },
        ],
    ] as const)(
        'removes a retried slot after a failure and %s, and its later answer fills nothing',
        async (_name, change) => {
            const mounted = await started();
            await mounted.uploads.fail(0);
            await change(mounted);
            await run(mounted, 'media.upload.retry', mounted.nodeId);

            await run(mounted, 'media.upload.cancel', mounted.nodeId);
            mounted.uploads.pending[1]?.resolve(mounted.uploads.asset(1));
            await settle();

            expect(mounted.images()).toEqual([]);
            expect(mounted.uploads.pending[1]?.context.signal.aborted).toBe(true);
            mounted.unmount();
        },
    );

    it('removes a slot with Cancel after a history reset while its upload runs', async () => {
        const mounted = await started();
        act(() => mounted.runtime.clearHistory());

        await run(mounted, 'media.upload.cancel', mounted.nodeId);

        expect(mounted.images()).toEqual([]);
        expect(mounted.uploads.pending[0]?.context.signal.aborted).toBe(true);
        mounted.unmount();
    });
});

describe('what a screen reader hears of uploads', () => {
    it('announces one message for a gesture: each refused file with its reason, then the count of uploads it started', async () => {
        const mounted = await mountUploads();
        caretAfterBefore(mounted);
        const record = recordAnnouncements();

        await mounted.choose([
            new File(['<p>x</p>'], 'page.html', { type: 'text/html' }),
            pngFile('a.png'),
            pngFile('b.png'),
            pngFile('c.png'),
        ]);
        await record.stop();

        expect(record.messages).toEqual([
            `page.html was not uploaded because its file type is not accepted. Choose a file of type ${ACCEPTED}, of up to 25 MB. Uploading files: 3`,
        ]);
        mounted.unmount();
    });

    it('says that each file chosen while replaceDocument saves the old document failed to upload', async () => {
        const uploads = deferredUploads();
        const persistence = {
            save: vi.fn(() => new Promise<SaveResponse>(() => undefined)),
            read: vi.fn(() => new Promise<never>(() => undefined)),
        };
        const mounted = await mountUploads({ uploads, services: { uploads: uploads.service, persistence } });
        caretAfterBefore(mounted);
        typeText(mounted.handle, 'x');
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Image' }));
        });
        const { document } = mounted.handle.getSnapshot();
        act(() => {
            mounted.handle
                .replaceDocument({
                    expected: mounted.handle.getSnapshot().stamp,
                    next: { documentId: 'document-2', revision: null, document },
                    unsaved: { action: 'save' },
                    selection: 'start',
                    history: 'reset',
                })
                .catch(() => undefined);
        });
        await settle();
        const record = recordAnnouncements();

        act(() => {
            fireEvent.change(mounted.chooser(), { target: { files: [pngFile('a.png'), pngFile('b.png')] } });
        });
        await record.stop();

        expect(record.messages).toEqual(['Upload failed: a.png', 'Upload failed: b.png']);
        expect(uploads.upload).not.toHaveBeenCalled();
        mounted.unmount();
    });

    it("announces a node-selected slot's upload as it stands, and how to fix a failed one", async () => {
        const mounted = await started();
        const record = recordAnnouncements();

        act(() => mounted.runtime.select({ node: mounted.runtime.state.doc.child(0).nodeSize + 1 }));
        await settle();
        await mounted.uploads.fail(0);
        act(() => mounted.runtime.select({ anchor: 1, head: 1 }));
        await settle();
        act(() => mounted.runtime.select({ node: mounted.runtime.state.doc.child(0).nodeSize + 1 }));
        await record.stop();

        // The failure is spoken while the slot stays selected, and again when it is selected anew.
        expect(record.messages.map((message) => message.trim())).toEqual([
            'logo.png. Uploading…',
            'Upload failed: logo.png',
            'logo.png. The upload failed. Retry it, or remove the image.',
            'logo.png. The upload failed. Retry it, or remove the image.',
        ]);
        mounted.unmount();
    });

    it('says that an upload which completes with altIntent missing has no alternative text yet, and not for one that has it', async () => {
        const mounted = await started();
        const record = recordAnnouncements();
        await mounted.uploads.complete(0);
        act(() => {
            mounted.runtime.nodeActions(mounted.nodeId).update({ altIntent: 'meaningful', altText: 'Logo' });
        });
        await mounted.replace(mounted.nodeId, pngFile('photo.png'));
        await mounted.uploads.complete(1);
        await record.stop();

        expect(record.messages).toContain('Uploaded: logo.png. It has no alternative text yet.');
        expect(record.messages).toContain(
            'Uploaded: photo.png. The image changed. Check that its alternative text still describes it.',
        );
        mounted.unmount();
    });

    it('speaks a node-selected slot once while its progress moves, and only the completion when it fills', async () => {
        const mounted = await started();
        act(() => mounted.runtime.select({ node: mounted.runtime.state.doc.child(0).nodeSize + 1 }));
        await settle();
        const record = recordAnnouncements();

        for (const fraction of [0.1, 0.11, 0.5]) {
            act(() => mounted.uploads.pending[0]?.context.reportProgress(fraction));
            await settle();
        }

        await mounted.uploads.complete(0);
        await record.stop();

        expect(record.messages.map((message) => message.trim())).toEqual([
            'Uploaded: logo.png. It has no alternative text yet.',
        ]);
        mounted.unmount();
    });

    it('asks for no review when an image with no alternative text is replaced, and keeps its Add alternative text', async () => {
        const mounted = await started();
        await mounted.uploads.complete(0);
        await mounted.replace(mounted.nodeId, pngFile('photo.png'));
        const record = recordAnnouncements();

        await mounted.uploads.complete(1);
        await record.stop();

        expect(record.messages.map((message) => message.trim())).toEqual([
            'Uploaded: photo.png. It has no alternative text yet.',
        ]);
        expect(screen.queryByText('The image changed. Check that its alternative text still describes it.')).toBeNull();
        expect(screen.getByRole('button', { name: 'Add alternative text' })).toBeTruthy();
        mounted.unmount();
    });
});

describe('focus in the upload chrome', () => {
    const button = (name: string) => screen.getByRole('button', { name });

    it("moves focus from Cancel to Retry when the upload fails, from Retry to Cancel on a retry, and to the image's first button when it completes", async () => {
        const mounted = await started();

        act(() => button('Cancel upload').focus());
        await mounted.uploads.fail(0);
        expect(document.activeElement).toBe(button('Retry upload'));

        act(() => {
            fireEvent.click(button('Retry upload'));
        });
        await settle();
        expect(document.activeElement).toBe(button('Cancel upload'));

        await mounted.uploads.complete(1);
        expect(document.activeElement).toBe(button('Add alternative text'));
        mounted.unmount();
    });

    it('leaves focus on the surface when Remove takes the failed slot away', async () => {
        const mounted = await started();
        act(() => button('Cancel upload').focus());
        await mounted.uploads.fail(0);

        act(() => {
            fireEvent.click(button('Remove image'));
        });
        await settle();

        expect(mounted.images()).toEqual([]);
        expect(document.activeElement).toBe(mounted.view.dom);
        mounted.unmount();
    });

    it('leaves focus where the author types when a replacement uploads in the background, and speaks the review prompt with its completion', async () => {
        const mounted = await started();
        await mounted.uploads.complete(0);
        act(() => {
            mounted.runtime.nodeActions(mounted.nodeId).update({ altIntent: 'meaningful', altText: 'Logo' });
        });
        await mounted.replace(mounted.nodeId, pngFile('photo.png'));
        act(() => mounted.view.focus());
        const record = recordAnnouncements();

        await mounted.uploads.complete(1);
        await record.stop();

        expect(document.activeElement).toBe(mounted.view.dom);
        expect(record.messages.map((message) => message.trim())).toEqual([
            'Uploaded: photo.png. The image changed. Check that its alternative text still describes it.',
        ]);
        mounted.unmount();
    });
});
