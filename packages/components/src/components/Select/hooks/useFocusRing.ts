/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef, type FocusEvent, type MouseEvent, type MutableRefObject } from 'react';

type FocusRingHandlers = {
    /** Ref tracking whether the element was activated via mouse click. */
    wasClickedRef: MutableRefObject<boolean>;
    /** Handler for mousedown events — marks the interaction as click-based. */
    onMouseDown: (event: MouseEvent<HTMLElement>) => void;
    /** Handler for focus events — shows the focus ring only for keyboard navigation. */
    onFocus: (event: FocusEvent<HTMLElement>) => void;
    /** Handler for blur events — hides the focus ring and resets click tracking. */
    onBlur: (event: FocusEvent<HTMLElement>) => void;
};

export const useFocusRing = (): FocusRingHandlers => {
    const wasClickedRef = useRef(false);

    const onMouseDown = (event: MouseEvent<HTMLElement>): void => {
        wasClickedRef.current = true;
        event.currentTarget.dataset.showFocusRing = 'false';
    };

    const onFocus = (event: FocusEvent<HTMLElement>): void => {
        if (!wasClickedRef.current) {
            event.target.dataset.showFocusRing = 'true';
        }
    };

    const onBlur = (event: FocusEvent<HTMLElement>): void => {
        event.target.dataset.showFocusRing = 'false';
        wasClickedRef.current = false;
    };

    return { wasClickedRef, onMouseDown, onFocus, onBlur };
};
