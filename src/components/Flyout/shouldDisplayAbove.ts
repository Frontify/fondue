/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject } from "react";

type shouldDisplayAboveProps = {
    triggerRef: MutableRefObject<HTMLDivElement | null>;
    overlayHeight?: number;
    padding: {
        top: number;
        bottom: number;
    };
    offset?: number;
};

export const shouldDisplayAbove = ({
    triggerRef,
    overlayHeight,
    padding,
    offset = 0,
}: shouldDisplayAboveProps): boolean => {
    if (!triggerRef.current || !overlayHeight) {
        return false;
    }

    let displayAbove = false;
    const { top: paddingTop, bottom: paddingBottom } = padding;
    const { top: triggerTop, bottom: triggerBottom } = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.visualViewport.height;
    const spaceBelow = viewportHeight - triggerBottom - offset - paddingBottom;

    if (spaceBelow < overlayHeight) {
        const spaceAbove = triggerTop - offset - paddingTop;
        displayAbove = spaceBelow < spaceAbove;
    }

    return displayAbove;
};
