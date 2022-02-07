/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject } from "react";

type shouldDisplayAboveProps = {
    triggerRef: MutableRefObject<HTMLDivElement | null>;
    overlayHeight?: number;
    padding?: {
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
    let placement = "below";
    const paddingTop = padding?.top || 0;
    const paddingBottom = padding?.bottom || 0;
    if (triggerRef.current && overlayHeight) {
        const { top, bottom } = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.visualViewport.height - bottom - offset - paddingBottom;
        if (spaceBelow < overlayHeight) {
            const spaceAbove = top - offset - paddingTop;
            if (spaceAbove > spaceBelow) {
                placement = "above";
            }
        }
    }
    return placement === "above";
};
