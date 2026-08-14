/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, type ReactNode, useRef } from 'react';

import { type FloatingContext, type FloatingKeyHandler, type RtePlugin } from '#/domain';
import { type EditorHandle, type FloatingRect } from '#/ports';

/**
 * The host half of floating UI: turns the anchored placements the engine
 * reports into rendered content, and routes the keyboard to whichever piece is
 * open.
 *
 * Everything about *what* is shown belongs to the plugin. This hook only knows
 * that content has a box, that it may want keys, and that it may decline to
 * show itself.
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
    /** Off in read-only mode: there is nothing floating UI could do. */
    enabled: boolean;
}): {
    surfaces: FloatingSurface[];
    /** Captured on the wrapper, so keys a picker takes never reach the editor. */
    onKeyDownCapture: (event: KeyboardEvent<HTMLElement>) => void;
} => {
    // Registered from inside the floating content (via `onKeys`), so the
    // handler is always the one belonging to the render that is on screen.
    const handlersRef = useRef(new Map<string, FloatingKeyHandler>());

    const placements = enabled && handle ? handle.floating.placements() : [];

    const surfaces = placements.flatMap((placement): FloatingSurface[] => {
        const spec = plugins.find((plugin) => plugin.id === placement.pluginId)?.floating;
        if (!spec || !handle) {
            return [];
        }
        const key = placement.pluginId;
        const context: FloatingContext = {
            api: handle.api,
            query: placement.query,
            clearQuery: () => handle.floating.clearQuery(),
            close: () => handle.floating.dismiss(),
            onKeys: (handler) => {
                handlersRef.current.set(key, handler);
                return () => handlersRef.current.delete(key);
            },
        };
        // Rendered here, in the body, so a plugin with nothing to say returns
        // null and costs nothing.
        const content = spec.render(context);
        if (content === null || content === undefined) {
            return [];
        }
        // Measured only now that there is something to place: asking where the
        // anchor is on screen forces a layout, and this runs on every editor
        // state change.
        return [{ key, rect: placement.measure(), content }];
    });

    const onKeyDownCapture = (event: KeyboardEvent<HTMLElement>): void => {
        // In mount order, until one takes the key.
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
