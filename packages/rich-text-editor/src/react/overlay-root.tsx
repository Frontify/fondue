/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { createInteractionScope } from '#/bridge/interaction-scope';
import { type MountCoordinator } from '#/bridge/mount';

// Overlays stack above the sticky and docked toolbar, whose `z-index` is 1.
const OVERLAY_ROOT: CSSProperties = { position: 'relative', zIndex: 2 };

/**
 * This editor's own portal container, inside its root or inside the host's `portalContainer`, so editors that share
 * one keep their overlays apart, and the interaction scope of the root, that container and the host's registered roots
 * (SPEC-rich-text-react/AC-045, AC-047, AC-049).
 */
export const useOverlayRoot = (coordinator: MountCoordinator, portalContainer: HTMLElement | null | undefined) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [overlayRoot, setOverlayRoot] = useState<HTMLDivElement | null>(null);
    const overlayRootRef = useRef<HTMLDivElement | null>(null);
    const setOverlayElement = useCallback((element: HTMLDivElement | null) => {
        overlayRootRef.current = element;
        setOverlayRoot(element);
    }, []);
    const [scope] = useState(() =>
        createInteractionScope(() => {
            const roots: (HTMLElement | null)[] = [rootRef.current, overlayRootRef.current];
            const { runtime } = coordinator;
            if (runtime !== undefined) {
                roots.push(...runtime.interactionRoots);
            }
            return roots;
        }),
    );
    // An editor in an iframe hears the iframe's document.
    useClientLayoutEffect(() => {
        const root = rootRef.current;
        if (root === null) {
            return undefined;
        }
        return scope.listen(root.ownerDocument);
    }, [scope]);
    let element: ReactNode = <div ref={setOverlayElement} style={OVERLAY_ROOT} data-rte-overlays="" />;
    if (portalContainer !== undefined && portalContainer !== null) {
        element = createPortal(element, portalContainer);
    }
    return { rootRef, overlayRoot, overlayRootRef, scope, element };
};
