/* (c) Copyright Frontify Ltd., all rights reserved. */

import { HTMLAttributes } from "react";
import { FlyoutVerticalMargin } from "..";

export const subtractVerticalMarginFromMaxHeight = (
    positionProps: HTMLAttributes<Element>,
    margins: FlyoutVerticalMargin,
    isFlipped: boolean,
    containerPadding: number,
) => {
    const updatedProps = { ...positionProps };
    const { top = 0, bottom = 0 } = margins;
    const heightDifference = (isFlipped ? top : bottom) - containerPadding;

    if (typeof updatedProps?.style?.maxHeight === "number") {
        updatedProps.style.maxHeight -= heightDifference;
    }
    return updatedProps;
};
