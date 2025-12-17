/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useLayoutEffect, useState } from 'react';

/**
 * @deprecated This component is deprecated and will be removed in the next major version.
 */
export const DEFAULT_DROPDOWN_MAX_HEIGHT = 'auto';

type DropdownAutoHeightProps = {
    isOpen: boolean;
    autoResize?: boolean;
    isDialog?: boolean;
};

const getInnerOverlayHeight = (triggerRef: MutableRefObject<HTMLElement | null>) => {
    let maxHeight = 'auto';
    if (triggerRef.current) {
        const { innerHeight } = window;
        const { bottom } = triggerRef.current.getBoundingClientRect();
        const viewportPadding = 33;
        const triggerMargin = 8;
        maxHeight = `${Math.max(innerHeight - (bottom + viewportPadding + triggerMargin), 130)}px`;
    }
    return maxHeight;
};

/**
 * @deprecated This function is deprecated and will be removed in the next major version.
 */
export const useDropdownAutoHeight = (
    triggerRef: MutableRefObject<HTMLElement | null>,
    { isOpen, autoResize }: DropdownAutoHeightProps,
) => {
    const [maxHeight, setMaxHeight] = useState(DEFAULT_DROPDOWN_MAX_HEIGHT);
    useLayoutEffect(() => {
        const updateMaxHeight = () => setMaxHeight(getInnerOverlayHeight(triggerRef));
        if (autoResize && isOpen) {
            updateMaxHeight();
            window.addEventListener('resize', updateMaxHeight);
        } else if (autoResize && !isOpen) {
            setMaxHeight(DEFAULT_DROPDOWN_MAX_HEIGHT);
        }

        return () => {
            if (isOpen && autoResize) {
                window.removeEventListener('resize', updateMaxHeight);
            }
        };
    }, [isOpen, autoResize, triggerRef]);

    return { maxHeight };
};
