/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject } from 'react';

import { type MountCoordinator } from '#/bridge/session/helpers/mount';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { passesToBrowser } from '#/runtime/port';

import { leavesToSurface } from '../helpers/chromeFocus';

/**
 * Returns an Escape in the fixed toolbar or node chrome to the surface ahead of any page layer, such as a host `Dialog`
 * that would close on it, while no editor overlay, a tooltip included, is open to take it first.
 * The window's capture phase runs before Radix's capture listeners on the document.
 */
export const useEscapeToSurface = (
    rootRef: RefObject<HTMLElement | null>,
    toolbarRef: RefObject<HTMLElement | null>,
    overlayRootRef: RefObject<HTMLElement | null>,
    coordinator: MountCoordinator,
): void => {
    useClientLayoutEffect(() => {
        const root = rootRef.current;
        const view = root?.ownerDocument.defaultView;
        if (root === null || view === null || view === undefined) {
            return undefined;
        }

        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            const overlays = overlayRootRef.current;
            if (
                event.key !== 'Escape' ||
                passesToBrowser(event) ||
                (overlays !== null && overlays.childElementCount > 0)
            ) {
                return;
            }

            if (!leavesToSurface(event.composedPath()[0], toolbarRef.current, root)) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();
            coordinator.runtime?.handle.focus();
        };

        view.addEventListener('keydown', onKeyDown, true);

        return () => view.removeEventListener('keydown', onKeyDown, true);
    }, [rootRef, toolbarRef, overlayRootRef, coordinator]);
};
