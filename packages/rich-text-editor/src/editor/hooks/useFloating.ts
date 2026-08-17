/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, type ReactNode, useRef } from 'react';

import { type AutocompleteContext, type AutocompleteKeyHandler, type RtePlugin } from '#/core';

import { type EditorHandle, type FloatingRect } from '../port';

/**
 * The host half of autocomplete: turns the anchored placements the engine
 * reports into rendered content, and routes the keyboard to whichever picker is
 * open.
 */

export type FloatingSurface = {
    /** The declaring plugin's id — also what its key handler is stored under. */
    key: string;
    rect: FloatingRect;
    content: ReactNode;
};

export const useFloating = ({
    handle,
    plugins,
    enabled,
}: {
    handle: EditorHandle | null;
    plugins: RtePlugin[];
    /** Off in read-only mode: there is nothing autocomplete could do. */
    enabled: boolean;
}): {
    surfaces: FloatingSurface[];
    /** Captured on the wrapper, so keys a picker takes never reach the editor. */
    onKeyDownCapture: (event: KeyboardEvent<HTMLElement>) => void;
} => {
    const handlersRef = useRef(new Map<string, AutocompleteKeyHandler>());

    const placements = enabled && handle ? handle.autocomplete.placements() : [];

    const surfaces = placements.flatMap((placement): FloatingSurface[] => {
        const spec = plugins.find((plugin) => plugin.id === placement.pluginId)?.autocomplete;
        if (!spec || !handle) {
            return [];
        }
        const key = placement.pluginId;
        const context: AutocompleteContext = {
            api: handle.api,
            query: placement.query,
            clearQuery: () => handle.autocomplete.clearQuery(),
            close: () => handle.autocomplete.dismiss(),
            onKeys: (handler) => {
                handlersRef.current.set(key, handler);
                return () => handlersRef.current.delete(key);
            },
        };
        const content = spec.component(context);
        if (content === null || content === undefined) {
            return [];
        }
        return [{ key, rect: placement.measure(), content }];
    });

    const onKeyDownCapture = (event: KeyboardEvent<HTMLElement>): void => {
        for (const surface of surfaces) {
            if (handlersRef.current.get(surface.key)?.(event)) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
    };

    return { surfaces, onKeyDownCapture };
};
