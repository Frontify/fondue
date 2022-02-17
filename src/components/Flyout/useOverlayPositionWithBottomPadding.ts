/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useOverlayPosition } from "@react-aria/overlays";
import { MutableRefObject } from "react";
import { getTotalOverlayHeight } from "./helpers/getTotalOverlayHeight";
import { shouldDisplayAbove } from "./helpers/shouldDisplayAbove";

const FLYOUT_OVERLAY_OFFSET = 5;
const DEFAULT_OVERLAY_PADDING = 12;
const INTERCOM_BUTTON_HEIGHT = 70;

type UseOverlayPositionWithBottomPaddingProps = {
    triggerRef: MutableRefObject<HTMLElement | null>;
    overlayRef: MutableRefObject<HTMLElement | null>;
    scrollRef: MutableRefObject<HTMLElement | null>;
    isOpen: boolean;
};

export const useOverlayPositionWithBottomPadding = ({
    triggerRef,
    overlayRef,
    scrollRef,
    isOpen,
}: UseOverlayPositionWithBottomPaddingProps) => {
    const overlayHeight = getTotalOverlayHeight(overlayRef, scrollRef);

    const isFlipped = shouldDisplayAbove({
        triggerRef,
        overlayHeight,
        offset: FLYOUT_OVERLAY_OFFSET,
        bottomMargin: INTERCOM_BUTTON_HEIGHT,
    });

    const { overlayProps: positionProps } = useOverlayPosition({
        targetRef: triggerRef,
        overlayRef,
        shouldFlip: false,
        placement: isFlipped ? "top left" : "bottom left",
        containerPadding: DEFAULT_OVERLAY_PADDING,
        offset: FLYOUT_OVERLAY_OFFSET,
        scrollRef,
        isOpen,
    });

    if (typeof positionProps?.style?.maxHeight === "number" && !isFlipped) {
        const heightToSubtract = INTERCOM_BUTTON_HEIGHT - DEFAULT_OVERLAY_PADDING;
        positionProps.style.maxHeight -= heightToSubtract;
    }

    return { positionProps };
};
