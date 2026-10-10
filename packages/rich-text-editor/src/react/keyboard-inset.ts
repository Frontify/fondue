/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useEffect, useState } from 'react';

import { type MountCoordinator } from '#/bridge/mount';

/**
 * The height the on-screen keyboard of a touch device covers, which a focused editor docks its toolbar above
 * (SPEC-rich-text-react/AC-096); every device's keyboard part of the bottom scroll margin (SPEC-rich-text-accessibility/AC-024).
 */
export const useKeyboardInset = (rootRef: RefObject<HTMLElement | null>, coordinator: MountCoordinator): number => {
    const [keyboard, setKeyboard] = useState(0);
    useEffect(() => {
        // The window of the editor's own document, also inside an iframe; some test DOMs have no `visualViewport` at all.
        const view = rootRef.current?.ownerDocument.defaultView;
        const viewport: VisualViewport | null | undefined = view?.visualViewport;
        if (view === null || view === undefined || viewport === null || viewport === undefined) {
            return undefined;
        }
        const measure = () => {
            const inset = Math.max(0, view.innerHeight - viewport.offsetTop - viewport.height);
            coordinator.chrome.setKeyboardInset(inset);
            // Only a touch device docks its toolbar above the on-screen keyboard.
            if (view.matchMedia('(pointer: coarse)').matches) {
                // oxlint-disable-next-line @eslint-react/set-state-in-effect -- the state is the measured viewport.
                setKeyboard(inset);
            }
        };
        measure();
        // A pan of the visual viewport, as iOS makes above its keyboard, changes `offsetTop` with no resize.
        viewport.addEventListener('resize', measure);
        viewport.addEventListener('scroll', measure);
        return () => {
            viewport.removeEventListener('resize', measure);
            viewport.removeEventListener('scroll', measure);
        };
    }, [rootRef, coordinator]);
    return keyboard;
};
