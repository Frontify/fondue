/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject } from "react";

export const shouldDisplayAbove = (
    triggerRef: MutableRefObject<HTMLElement | null>,
    overlayHeight: number,
    offset: number,
    bottomMargin: number,
): boolean => {
    if (!triggerRef.current || !overlayHeight) {
        return false;
    }

    let displayAbove = false;
    const { top: triggerTop, bottom: triggerBottom } = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.visualViewport.height;
    const spaceBelow = viewportHeight - triggerBottom - offset - bottomMargin;

    if (spaceBelow < overlayHeight) {
        const spaceAbove = triggerTop - offset;
        displayAbove = spaceBelow < spaceAbove;
    }

    return displayAbove;
};
