/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject, useEffect, useState } from 'react';

export const DEFAULT_DROPDOWN_MAX_HEIGHT = 'auto';

type DropdownAutoHeightProps = {
    isOpen: boolean;
    autoResize?: boolean;
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

export const useDropdownAutoHeight = (
    triggerRef: MutableRefObject<HTMLElement | null>,
    { isOpen, autoResize }: DropdownAutoHeightProps,
) => {
    const [maxHeight, setMaxHeight] = useState(DEFAULT_DROPDOWN_MAX_HEIGHT);
    useEffect(() => {
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
