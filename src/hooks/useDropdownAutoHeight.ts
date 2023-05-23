/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject, useLayoutEffect, useState } from 'react';

export const DEFAULT_DROPDOWN_MAX_HEIGHT = 'auto';

type DropdownAutoHeightProps = {
    isOpen: boolean;
    autoResize?: boolean;
    isDialog?: boolean;
};

export const getInnerOverlayHeight = (triggerRef: MutableRefObject<HTMLElement | null>, isDialog: boolean) => {
    let maxHeight = 'auto';
    if (triggerRef.current) {
        const { innerHeight } = window;
        const { bottom } = triggerRef.current.getBoundingClientRect();
        const viewportPadding = 33;
        const triggerMargin = 8;
        const extraSpace = isDialog ? innerHeight / 3 : 0;
        maxHeight = `${Math.max(innerHeight - (bottom + viewportPadding + triggerMargin + extraSpace), 130)}px`;
    }
    return maxHeight;
};

export const useDropdownAutoHeight = (
    triggerRef: MutableRefObject<HTMLElement | null>,
    { isOpen, autoResize, isDialog = false }: DropdownAutoHeightProps,
) => {
    const [maxHeight, setMaxHeight] = useState(DEFAULT_DROPDOWN_MAX_HEIGHT);
    useLayoutEffect(() => {
        const updateMaxHeight = () => setMaxHeight(getInnerOverlayHeight(triggerRef, isDialog));
        if ((autoResize || isDialog) && isOpen) {
            updateMaxHeight();
            window.addEventListener('resize', updateMaxHeight);
        } else if ((autoResize || isDialog) && !isOpen) {
            setMaxHeight(DEFAULT_DROPDOWN_MAX_HEIGHT);
        }

        return () => {
            if (isOpen && (autoResize || isDialog)) {
                window.removeEventListener('resize', updateMaxHeight);
            }
        };
    }, [isOpen, autoResize, triggerRef, isDialog]);

    return { maxHeight };
};
