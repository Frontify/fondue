/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineEditorPart, type EditorApi, useEditorApi } from '#/entries/authoring';
import { mediaUpload } from '#/features';
import { figure } from '#/features/mediaImage/__tests__/fixtures/mount';
import { paste, setSelection } from '#/testing';

import { type MountedUploads, mountUploads, para, pngFile, settle, text } from './fixtures/uploads';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

let live: EditorApi | undefined;
let taken: { readonly names: readonly string[]; readonly origin: string; readonly text: string }[] = [];

const Grab = () => {
    live = useEditorApi();
    return null;
};

beforeEach(() => {
    live = undefined;
    taken = [];
});

/** A host part of `media.upload` that keeps the live editor API and takes the files no earlier part took. */
const grabbing = defineEditorPart(mediaUpload, {
    overlays: [Grab],
    files: (api, files, at) => {
        taken.push({ names: files.map(({ name }) => name), origin: at.origin, text: api.selectedText() });
        return true;
    },
});

const caretAfterBefore = (mounted: MountedUploads) => setSelection(mounted.handle, { text: 'Before', from: 6, to: 6 });

const apiOf = () => {
    if (live === undefined) {
        throw new Error('The editor API did not mount.');
    }
    return live;
};

describe('the uploads of the editor API', () => {
    it('begins an upload into a new slot, reports its status, retries it after a failure and cancels it', async () => {
        const mounted = await mountUploads({ plugins: [grabbing] });
        caretAfterBefore(mounted);

        let begun: boolean | undefined;
        act(() => {
            begun = apiOf().uploads.begin([pngFile('logo.png')], {
                origin: 'paste',
                range: apiOf().selectedRange(),
            });
        });
        await settle();

        const [nodeId = ''] = mounted.imageIds();
        expect(begun).toBe(true);
        expect(apiOf().uploads.status(nodeId)).toMatchObject({ state: 'running', name: 'logo.png' });
        await mounted.uploads.fail(0);
        expect(apiOf().uploads.status(nodeId)).toMatchObject({ state: 'failed' });

        let retried: boolean | undefined;
        act(() => {
            retried = apiOf().uploads.retry(nodeId);
        });
        await settle();
        expect(retried).toBe(true);
        expect(mounted.uploads.open()).toHaveLength(1);

        const depth = mounted.depth();
        act(() => {
            apiOf().uploads.cancel(nodeId);
        });
        await settle();
        expect(mounted.images()).toEqual([]);
        expect(mounted.depth()).toBe(depth + 1);
        mounted.unmount();
    });

    it('begins nothing without an upload service, and opens the file chooser for new images or one image', async () => {
        const mounted = await mountUploads({ plugins: [grabbing], blocks: [para(text('Before')), figure('image-1')] });
        const click = vi.spyOn(mounted.chooser(), 'click').mockImplementation(() => undefined);

        act(() => {
            apiOf().uploads.pick();
        });
        expect(click).toHaveBeenCalledTimes(1);
        expect(mounted.chooser().multiple).toBe(true);
        act(() => {
            apiOf().uploads.pick('image-1');
        });
        expect(click).toHaveBeenCalledTimes(2);
        expect(mounted.chooser().multiple).toBe(false);
        mounted.unmount();

        const bare = await mountUploads({ plugins: [grabbing], services: {} });
        expect(apiOf().uploads.begin([pngFile('logo.png')], { origin: 'paste', range: apiOf().selectedRange() })).toBe(
            false,
        );
        bare.unmount();
    });
});

describe('the files intake of an editor part', () => {
    it('hands pasted files that no earlier part took to the part, and pastes none of their text', async () => {
        const mounted = await mountUploads({ plugins: [grabbing], services: {}, blocks: [para(text('Before'))] });
        setSelection(mounted.handle, { text: 'Before', from: 0, to: 6 });

        act(() => {
            paste(mounted.handle, { text: 'ignored', files: [pngFile('logo.png')] });
        });
        await settle();

        expect(taken).toEqual([{ names: ['logo.png'], origin: 'paste', text: 'Before' }]);
        expect(mounted.view.state.doc.textContent).toBe('Before');
        mounted.unmount();
    });
});

describe('the node state of the editor API', () => {
    it('keeps a flag on a node for the session, which adds no undo step, until it is set to null', async () => {
        const mounted = await mountUploads({ plugins: [grabbing], blocks: [para(text('Before')), figure('image-1')] });
        const depth = mounted.depth();
        const snapshot = mounted.handle.getSnapshot();

        act(() => {
            apiOf().nodeState.set('image-1', 'fixture.flag', { seen: true });
        });

        expect(apiOf().nodeState.get('image-1', 'fixture.flag')).toEqual({ seen: true });
        expect(apiOf().nodeState.get('image-1', 'fixture.other')).toBeUndefined();
        expect(mounted.depth()).toBe(depth);
        expect(mounted.handle.getSnapshot().document).toBe(snapshot.document);
        act(() => {
            apiOf().nodeState.set('image-1', 'fixture.flag', null);
        });
        expect(apiOf().nodeState.get('image-1', 'fixture.flag')).toBeUndefined();
        mounted.unmount();
    });
});
