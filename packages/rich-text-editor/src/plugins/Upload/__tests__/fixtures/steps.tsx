/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';

import { setSelection } from '#/testing';

import { type MountedUploads, mountUploads, pngFile, settle } from './uploads';

/** The caret at the end of `Before`, where the toolbar inserts a slot after the paragraph. */
export const caretAfterBefore = (mounted: MountedUploads) =>
    setSelection(mounted.handle, { text: 'Before', from: 6, to: 6 });

/** A slot's stored attributes at upload start, as the chosen PNG measured them. */
export const slot = (name: string, width = 40, height = 30) => ({
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
export const started = async (options: Parameters<typeof mountUploads>[0] = {}) => {
    const mounted = await mountUploads(options);
    caretAfterBefore(mounted);
    await mounted.choose([pngFile('logo.png')]);
    const [nodeId] = mounted.imageIds();
    if (nodeId === undefined) {
        throw new Error('No slot was inserted.');
    }

    return { ...mounted, nodeId };
};

export const cancel = async (mounted: MountedUploads, nodeId: string) => {
    act(() => {
        mounted.handle.execute('media.upload.cancel', { nodeId });
    });
    await settle();
};
