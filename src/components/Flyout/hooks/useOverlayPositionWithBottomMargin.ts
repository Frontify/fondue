/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AriaPositionProps, useOverlayPosition } from "@react-aria/overlays";
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

const flippedPositionMap: Record<FlyoutPlacement, AriaPositionProps["placement"]> = {
    ["top"]: "bottom",
    ["bottom"]: "top",
    ["left"]: "right",
    ["right"]: "left",
    ["top left"]: "bottom left",
    ["top right"]: "bottom right",
    ["bottom left"]: "top left",
    ["bottom right"]: "top right",
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
    const flippedPosition = placement && flippedPositionMap[placement];
    const verticalPosition = isFlipped ? flippedPosition : placement;

    const { overlayProps: positionProps } = useOverlayPosition({
        targetRef: triggerRef,
        overlayRef,
        shouldFlip: placement === FlyoutPlacement.Left || placement === FlyoutPlacement.Right,
        placement:
            placement && (placement === FlyoutPlacement.Left || placement === FlyoutPlacement.Right)
                ? placement
                : verticalPosition,
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
