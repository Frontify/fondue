/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorHandle } from '#/index';

/** Counts each time the editor's save state becomes `conflict`; it stays there until the host resolves it. */
export const countSaveConflicts = (handle: EditorHandle<object>) => {
    let conflicts = 0;
    let previous = handle.getSaveStatus().state;
    const stop = handle.subscribe('saveStatusChange', ({ state }) => {
        if (state === 'conflict' && previous !== 'conflict') {
            conflicts += 1;
        }
        previous = state;
    });
    return { conflicts: () => conflicts, stop };
};
