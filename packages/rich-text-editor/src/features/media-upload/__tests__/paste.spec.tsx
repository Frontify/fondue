/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { core, mediaImage } from '#/features';
import { paste, pressKey, setSelection } from '#/testing';
import { probeUploads } from '#/testing/probe-uploads';

import { type MountedUploads, mountUploads, para, pngFile, settle, text, uploadModel } from './fixtures/uploads';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

const transfer = (data: Readonly<Record<string, string>>, files: readonly File[]) => {
    const dataTransfer = new DataTransfer();
    for (const [type, value] of Object.entries(data)) {
        dataTransfer.setData(type, value);
    }
    for (const file of files) {
        dataTransfer.items.add(file);
    }
    return dataTransfer;
};

const pasteInto = async (mounted: MountedUploads, input: { readonly text?: string }, files: readonly File[]) => {
    act(() => {
        paste(mounted.handle, { ...input, files });
    });
    await settle();
};

/** The paste event itself, for the one case that asserts the browser default is cancelled. */
const pasteEventInto = async (
    mounted: MountedUploads,
    data: Readonly<Record<string, string>>,
    files: readonly File[],
) => {
    const event = new ClipboardEvent('paste', {
        clipboardData: transfer(data, files),
        bubbles: true,
        cancelable: true,
    });
    act(() => {
        mounted.view.dom.dispatchEvent(event);
    });
    await settle();
    return event;
};

/** Drops `files` from outside the editor at a point inside the paragraph's text, as a browser does after the release. */
const dropInto = async (mounted: MountedUploads, files: readonly File[], pos: number) => {
    vi.spyOn(mounted.view, 'posAtCoords').mockReturnValue({ pos, inside: 0 });
    const event = new DragEvent('drop', { bubbles: true, cancelable: true });
    // happy-dom's DragEvent ignores the `dataTransfer` init.
    Object.defineProperty(event, 'dataTransfer', { value: transfer({}, files) });
    act(() => {
        mounted.view.dom.dispatchEvent(event);
    });
    await settle();
    return event;
};

const files = (count: number) => Array.from({ length: count }, (_, index) => pngFile(`image-${index + 1}.png`));
const blockTypes = (mounted: MountedUploads) => mounted.blocksOf().map(({ type }) => type);

describe('a paste with files', () => {
    it('starts an upload into a new slot per file in one paste transaction and undo step, at most 3 uploads at once', async () => {
        const mounted = await mountUploads({ blocks: [para(text('ab'))] });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });
        const before = structuredClone(mounted.blocksOf());
        const depth = mounted.depth();

        await pasteInto(mounted, {}, files(5));

        expect(mounted.imageIds()).toHaveLength(5);
        expect(mounted.images().map(({ labelSnapshot }) => labelSnapshot)).toEqual([
            'image-1.png',
            'image-2.png',
            'image-3.png',
            'image-4.png',
            'image-5.png',
        ]);
        expect(mounted.changes.map(({ origin }) => origin)).toEqual(['paste']);
        expect(mounted.depth()).toBe(depth + 1);
        expect(mounted.uploads.open()).toHaveLength(3);

        await mounted.undo();

        expect(mounted.blocksOf()).toEqual(before);
        expect(mounted.uploads.open()).toHaveLength(0);
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(3);
        expect(mounted.uploads.released()).toHaveLength(3);
        mounted.unmount();
    });

    it.each([
        ['text/html', { 'text/html': '<p>html</p>', 'text/plain': 'plain' }],
        ['text/plain', { 'text/plain': 'plain' }],
    ])('ignores the %s that comes with the files once media.image is installed', async (_name, data) => {
        const mounted = await mountUploads({ blocks: [para(text('ab'))] });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });

        const event = await pasteEventInto(mounted, data, [pngFile('logo.png')]);

        expect(event.defaultPrevented).toBe(true);
        expect(mounted.view.state.doc.textContent).toBe('ab');
        expect(blockTypes(mounted)).toEqual(['paragraph', 'figure', 'paragraph']);
        expect(mounted.images()[0]).toMatchObject({ assetId: null, labelSnapshot: 'logo.png', width: 40, height: 30 });
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);
        mounted.unmount();
    });

    it('replaces the selected text with the slots, which a cancel of the only slot restores', async () => {
        const mounted = await mountUploads({ blocks: [para(text('abc'))] });
        setSelection(mounted.handle, { text: 'b' });
        const before = structuredClone(mounted.blocksOf());

        await pasteInto(mounted, {}, [pngFile('logo.png')]);
        expect(mounted.view.state.doc.textContent).toBe('ac');
        act(() => {
            mounted.handle.execute('media.upload.cancel', { nodeId: mounted.imageIds()[0] ?? '' });
        });
        await settle();

        expect(mounted.blocksOf()).toEqual(before);
        mounted.unmount();
    });

    it('pastes the text with Shift held and starts no upload', async () => {
        const mounted = await mountUploads({ blocks: [para(text('ab'))] });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });
        act(() => {
            pressKey(mounted.handle, 'Shift');
        });

        await pasteInto(mounted, { text: 't' }, [pngFile('logo.png')]);

        expect(mounted.view.state.doc.textContent).toBe('atb');
        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        mounted.unmount();
    });

    it('goes on to the text flavors when the host has no upload service', async () => {
        const mounted = await mountUploads({ blocks: [para(text('ab'))], services: {} });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });

        await pasteInto(mounted, { text: 't' }, [pngFile('logo.png')]);

        expect(mounted.view.state.doc.textContent).toBe('atb');
        expect(mounted.images()).toEqual([]);
        mounted.unmount();
    });

    it('starts no upload for a paste that the policy refuses for media.image', async () => {
        const mounted = await mountUploads({ blocks: [para(text('ab'))], model: uploadModel([core(), mediaImage()]) });
        const { policy } = mounted.runtime;
        act(() =>
            mounted.handle.updatePolicy({
                ...policy,
                features: {
                    ...policy.features,
                    'media.image': { create: true, edit: true, remove: true, paste: false },
                },
            }),
        );
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });

        await pasteInto(mounted, {}, [pngFile('logo.png')]);

        expect(mounted.images()).toEqual([]);
        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        mounted.unmount();
    });

    it('pastes the text that comes with files the policy refuses to paste into media.image', async () => {
        const mounted = await mountUploads({ blocks: [para(text('ab'))] });
        const { policy } = mounted.runtime;
        act(() =>
            mounted.handle.updatePolicy({
                ...policy,
                features: {
                    ...policy.features,
                    'media.image': { create: true, edit: true, remove: true, paste: false },
                },
            }),
        );
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });

        await pasteInto(mounted, { text: 't' }, [pngFile('logo.png')]);

        expect(mounted.view.state.doc.textContent).toBe('atb');
        expect(mounted.images()).toEqual([]);
        expect(mounted.uploads.upload).not.toHaveBeenCalled();
        mounted.unmount();
    });

    it('pastes the text that comes with files once the completed-upload cache is full', async () => {
        const restore = probeUploads().limitCache(0);
        try {
            const mounted = await mountUploads({ blocks: [para(text('ab'))] });
            setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });

            await pasteInto(mounted, { text: 't' }, [pngFile('logo.png')]);

            expect(mounted.view.state.doc.textContent).toBe('atb');
            expect(mounted.images()).toEqual([]);
            expect(mounted.diagnostics.filter(({ code }) => code === 'media.cache-full')).toHaveLength(1);
            mounted.unmount();
        } finally {
            restore();
        }
    });
});

describe('a drop of files', () => {
    it('inserts the slot at the block boundary nearest the drop point as one undo step with origin drop', async () => {
        const mounted = await mountUploads({ blocks: [para(text('abcd')), para(text('ef'))] });
        const depth = mounted.depth();

        const event = await dropInto(mounted, [pngFile('logo.png')], 4);

        expect(event.defaultPrevented).toBe(true);
        expect(blockTypes(mounted)).toEqual(['paragraph', 'figure', 'paragraph']);
        expect(mounted.view.state.doc.textContent).toBe('abcdef');
        expect(mounted.changes.map(({ origin }) => origin)).toEqual(['drop']);
        expect(mounted.depth()).toBe(depth + 1);
        expect(mounted.uploads.upload).toHaveBeenCalledTimes(1);
        mounted.unmount();
    });
});
