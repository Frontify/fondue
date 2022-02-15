/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject } from "react";

type shouldDisplayAboveProps = {
    triggerRef: MutableRefObject<HTMLDivElement | null>;
    overlayHeight?: number;
    margins: {
        top: number;
        bottom: number;
    };
    offset?: number;
};

export const shouldDisplayAbove = ({
    triggerRef,
    overlayHeight,
    margins,
    offset = 0,
}: shouldDisplayAboveProps): boolean => {
    if (!triggerRef.current || !overlayHeight) {
        return false;
    }

    let displayAbove = false;
    const { top: marginTop, bottom: marginBottom } = margins;
    const { top: triggerTop, bottom: triggerBottom } = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.visualViewport.height;
    const spaceBelow = viewportHeight - triggerBottom - offset - marginBottom;

    if (spaceBelow < overlayHeight) {
        const spaceAbove = triggerTop - offset - marginTop;
        displayAbove = spaceBelow < spaceAbove;
    }

    return displayAbove;
};
