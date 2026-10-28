/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useEffect } from 'react';

import { type SelectionAnchor } from '../helpers/overlayContext';

/** Hides the content of an open overlay while its anchor is clipped. */
export const useHideWhenClipped = (
    open: boolean,
    anchor: SelectionAnchor,
    elementRef: RefObject<HTMLDivElement | null>,
): void => {
    // Hides the content while its anchor is clipped; Floating UI's `hide` middleware would, but Fondue's `Flyout` and
    // `Dropdown` do not expose `hideWhenDetached`. A zero scale with no pointer input, not `visibility: hidden`, which
    // blurs a focused field, keeps focus and state inside and the content in the accessibility tree, since focus may be
    // there.
    useEffect(() => {
        if (!open) {
            return undefined;
        }

        let frame = 0;
        const track = () => {
            const element = elementRef.current;
            let transform = '';
            let pointerEvents = '';
            if (anchor.clipped()) {
                transform = 'scale(0)';
                pointerEvents = 'none';
            }

            if (element !== null && element.style.transform !== transform) {
                element.style.transform = transform;
                element.style.pointerEvents = pointerEvents;
            }

            frame = requestAnimationFrame(track);
        };

        frame = requestAnimationFrame(track);

        return () => cancelAnimationFrame(frame);
    }, [open, anchor, elementRef]);
};
