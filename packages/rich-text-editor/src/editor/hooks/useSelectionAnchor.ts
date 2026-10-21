/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useMemo, useSyncExternalStore } from 'react';

import { type EditorHandle } from '../port';

import { type EditorStateStore } from './useEditorHandle';

/**
 * A virtual element at the selection for the flyout's anchor, re-rendering the
 * caller on every editor state change. A new one whenever the box moves, so the
 * flyout repositions; while the page scrolls the flyout reads the box live.
 * `contextElement` tells the flyout which scrolling containers to follow.
 */
export const useSelectionAnchor = ({
    handle,
    editorState,
    editableRef,
}: {
    handle: EditorHandle;
    editorState: EditorStateStore;
    editableRef: RefObject<HTMLElement | null>;
}): RefObject<{ getBoundingClientRect(): DOMRect; contextElement?: Element }> => {
    useSyncExternalStore(editorState.subscribe, editorState.getVersion, editorState.getVersion);
    const { left, top, width, height } = handle.selectionRect();
    const box = `${left},${top},${width},${height}`;

    return useMemo(
        () => ({
            current: {
                getBoundingClientRect: () => {
                    const rect = handle.selectionRect();
                    return new DOMRect(rect.left, rect.top, rect.width, rect.height);
                },
                contextElement: editableRef.current ?? undefined,
            },
        }),
        // `box` is the point: the same handle with the selection moved is a new anchor.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
        [handle, editableRef, box],
    );
};
