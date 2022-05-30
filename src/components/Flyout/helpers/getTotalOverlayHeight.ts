/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject } from 'react';

export const getTotalOverlayHeight = (
    overlayRef: MutableRefObject<HTMLElement | null>,
    scrollRef: MutableRefObject<HTMLElement | null>,
) => {
    let height = 0;
    if (scrollRef.current && overlayRef.current) {
        const outerScrollHeight = overlayRef.current.scrollHeight;
        const { scrollHeight: innerScrollHeight, clientHeight: innerClientHeight } = scrollRef.current;
        height = outerScrollHeight + (innerScrollHeight - innerClientHeight);
    }

    return height;
};
