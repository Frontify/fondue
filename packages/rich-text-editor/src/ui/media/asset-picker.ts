/* (c) Copyright Frontify Ltd., all rights reserved. */

import { INSERT_IMAGE, MEDIA_PICKER, REPLACE_IMAGE } from '#/runtime/media';
import { type EditorRuntime } from '#/runtime/runtime';
import { type SelectionHandle, type SessionToken } from '#/runtime/types';

/** The feature whose images the picker inserts and refills. */
export const IMAGE_FEATURE = 'media.image';
const ASSETS_SERVICE = 'assets';

/** The host asset picker, as `services.assets` holds it. */
export interface AssetPicker {
    pick(
        request: { readonly purpose: string },
        context: { readonly signal: AbortSignal; readonly session: SessionToken },
    ): Promise<unknown>;
}

/**
 * Opens the host asset picker through the async coordinator, which aborts it when the service, the session or the
 * document changes, and applies the picked asset as the author's own undo step: a figure at the insert target the
 * selection gave when it opened, or, with `nodeId`, that image refilled. When the target or the image is gone by
 * then, nothing changes and `removed` hears why. Focus returns to the surface once the picker answers.
 */
export const pickAsset = (
    runtime: EditorRuntime,
    picker: AssetPicker,
    options: { readonly nodeId?: string; readonly removed: (kind: 'target' | 'image') => void },
): void => {
    const { nodeId, removed } = options;
    let place: { readonly target: SelectionHandle } | { readonly nodeId: string };
    if (nodeId === undefined) {
        const captured = runtime.handle.captureTarget({ purpose: 'insert', onIntersectingEdit: 'map' });
        if (captured.status !== 'captured') {
            return;
        }
        place = { target: captured.target };
    } else {
        place = { nodeId };
    }
    let held = 'target' in place;
    const release = () => {
        if (held && 'target' in place) {
            held = false;
            runtime.handle.releaseTarget(place.target);
        }
    };
    const operation = runtime.startAsync({
        key: MEDIA_PICKER,
        service: ASSETS_SERVICE,
        featureId: IMAGE_FEATURE,
        action: nodeId === undefined ? 'create' : 'edit',
        command: nodeId === undefined ? INSERT_IMAGE : REPLACE_IMAGE,
        run: ({ signal, session }) => {
            signal.addEventListener('abort', release);
            return picker.pick({ purpose: 'image' }, { signal, session }).catch((error: unknown) => {
                release();
                throw error;
            });
        },
        // The picked asset is the author's own insertion, one undo step, so it applies as a host command does.
        deliver: (result) => {
            try {
                if (result === null) {
                    return undefined;
                }
                const outcome = runtime.placeAsset(result, place);
                if (outcome.status !== 'rejected') {
                    return undefined;
                }
                if (outcome.code === 'target-invalid') {
                    removed('target' in place ? 'target' : 'image');
                }
                return outcome.code;
            } finally {
                release();
                runtime.handle.focus();
            }
        },
    });
    // A session that is not ready starts nothing.
    if (operation.controller.signal.aborted) {
        release();
    }
};
