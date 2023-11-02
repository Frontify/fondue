/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject, useLayoutEffect, useState } from 'react';

type DropdownAutoHeightProps = {
    isOpen: boolean;
    autoResize?: boolean;
    isDialog?: boolean;
};

type AvailableSpace = {
    toTop?: number;
    toBottom?: number;
};

export const getInnerOverlayHeight = (triggerRef: MutableRefObject<HTMLElement | null>) => {
    const maxHeight: AvailableSpace = {};
    if (triggerRef.current) {
        const { innerHeight } = window;
        const { bottom, top } = triggerRef.current.getBoundingClientRect();
        const viewportPadding = 33;
        const triggerMargin = 8;
        maxHeight.toBottom = innerHeight - (bottom + viewportPadding + triggerMargin);
        maxHeight.toTop = top - (viewportPadding + triggerMargin);
    }
    return maxHeight;
};

export const useDropdownAutoHeight = (
    triggerRef: MutableRefObject<HTMLElement | null>,
    { isOpen, autoResize }: DropdownAutoHeightProps,
) => {
    const [maxHeight, setMaxHeight] = useState<AvailableSpace>({});
    useLayoutEffect(() => {
        const updateMaxHeight = () => setMaxHeight(getInnerOverlayHeight(triggerRef));
        if (autoResize && isOpen) {
            updateMaxHeight();
            window.addEventListener('resize', updateMaxHeight);
        } else if (autoResize && !isOpen) {
            setMaxHeight({});
        }

        return () => {
            if (isOpen && autoResize) {
                window.removeEventListener('resize', updateMaxHeight);
            }
        };
    }, [isOpen, autoResize]);

    return { maxHeight };
};
