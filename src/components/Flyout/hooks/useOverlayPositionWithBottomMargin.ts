/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useOverlayPosition } from "@react-aria/overlays";
import { MutableRefObject } from "react";
import { getTotalOverlayHeight } from "../helpers/getTotalOverlayHeight";
import { shouldDisplayAbove } from "../helpers/shouldDisplayAbove";
import { FlyoutPlacement } from "@components/Flyout";

const FLYOUT_OVERLAY_OFFSET = 5;
const DEFAULT_OVERLAY_PADDING = 12;
const INTERCOM_BUTTON_HEIGHT = 70;

type UseOverlayPositionWithBottomMarginProps = {
    triggerRef: MutableRefObject<HTMLElement | null>;
    overlayRef: MutableRefObject<HTMLElement | null>;
    scrollRef: MutableRefObject<HTMLElement | null>;
    isOpen: boolean;
    placement?: FlyoutPlacement;
    offset?: number;
};

export const useOverlayPositionWithBottomMargin = ({
    triggerRef,
    overlayRef,
    scrollRef,
    isOpen,
    placement,
    offset,
}: UseOverlayPositionWithBottomMarginProps) => {
    const overlayHeight = getTotalOverlayHeight(overlayRef, scrollRef);

    const isFlipped = shouldDisplayAbove(triggerRef, overlayHeight, FLYOUT_OVERLAY_OFFSET, INTERCOM_BUTTON_HEIGHT);

    const { overlayProps: positionProps } = useOverlayPosition({
        targetRef: triggerRef,
        overlayRef,
        shouldFlip: false,
        placement: placement ?? (isFlipped ? FlyoutPlacement.Top : FlyoutPlacement.Bottom),
        containerPadding: DEFAULT_OVERLAY_PADDING,
        offset: offset ?? FLYOUT_OVERLAY_OFFSET,
        scrollRef,
        isOpen,
    });

    if (typeof positionProps?.style?.maxHeight === "number" && !isFlipped) {
        const heightToSubtract = INTERCOM_BUTTON_HEIGHT - DEFAULT_OVERLAY_PADDING;
        positionProps.style.maxHeight -= heightToSubtract;
    }

    return { positionProps };
};
