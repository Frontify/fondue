/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useClientLayoutEffect } from '#/bridge/clientLayoutEffect';
import { createInteractionScope } from '#/bridge/interactionScope';
import { type MountCoordinator } from '#/bridge/mount';

import styles from './styles/overlayRoot.module.scss';

// The values that make an element the containing block of its fixed descendants, which then clip with it.
const CONTAINS = /paint|layout|strict|content/;
const WILL_CHANGE = /transform|perspective|filter/;

/** Whether an ancestor of `element` is the containing block of fixed positioning. */
const inFixedContainingBlock = (element: Element): boolean => {
    for (let node = element.parentElement; node !== null; node = node.parentElement) {
        const style = getComputedStyle(node);
        const backdrop = style.getPropertyValue('backdrop-filter');
        if (
            style.transform !== 'none' ||
            style.perspective !== 'none' ||
            style.filter !== 'none' ||
            (backdrop !== '' && backdrop !== 'none') ||
            CONTAINS.test(style.contain) ||
            WILL_CHANGE.test(style.willChange)
        ) {
            return true;
        }
    }
    return false;
};

/**
 * This editor's own portal container, inside its root or inside the host's `portalContainer`, so editors that share
 * one keep their overlays apart, and the interaction scope of the root, that container and the host's registered roots.
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
    // An editor in an iframe hears the iframe's document, once focus or a press reaches its root or its overlays.
    useClientLayoutEffect(() => {
        const elements: HTMLElement[] = [];
        for (const element of [rootRef.current, overlayRoot]) {
            if (element !== null) {
                elements.push(element);
            }
        }
        return scope.listen(elements);
    }, [scope, overlayRoot]);
    // An ancestor's transform, such as a host dialog's, makes it the overlays' containing block, which clips them; while
    // one is open the top layer draws them above it, and they stay inside the dialog's focus trap and accessibility tree.
    useClientLayoutEffect(() => {
        if (overlayRoot === null || !('showPopover' in overlayRoot)) {
            return undefined;
        }
        const hide = () => {
            if (overlayRoot.matches(':popover-open')) {
                overlayRoot.hidePopover();
            }
        };
        // Radix portals an overlay into the root while it is open, so the root's children say which are open.
        const observer = new MutationObserver((records) => {
            if (overlayRoot.childElementCount === 0 || !inFixedContainingBlock(overlayRoot)) {
                hide();
                overlayRoot.removeAttribute('popover');
                return;
            }
            if (!records.some((record) => record.addedNodes.length > 0)) {
                return;
            }
            // Showing it again puts it above what entered the top layer since, such as a host's modal `dialog`.
            hide();
            overlayRoot.popover = 'manual';
            overlayRoot.showPopover();
        });
        observer.observe(overlayRoot, { childList: true });
        return () => observer.disconnect();
    }, [overlayRoot]);
    let element: ReactNode = <div ref={setOverlayElement} className={styles.root} data-rte-overlays="" />;
    if (portalContainer !== undefined && portalContainer !== null) {
        element = createPortal(element, portalContainer);
    }
    return { rootRef, overlayRoot, overlayRootRef, scope, element };
};
