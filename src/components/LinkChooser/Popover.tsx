/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DismissButton, useOverlay } from "@react-aria/overlays";
import React, { FC, MouseEvent, TouchEvent, useRef } from "react";
import { PopoverProps } from "./types";

export const Popover: FC<PopoverProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const { popoverRef = ref, isOpen, onClose, children } = props;

    const { overlayProps } = useOverlay(
        {
            isOpen,
            onClose,
            shouldCloseOnBlur: true,
            isDismissable: false,
        },
        popoverRef,
    );

    /* Focus must not be shifted to the popover since this will close the input.
     There is a blur event fired on the input when clicking inside the popover which gets fired twice if the click is virtual, 
     once with a relatedTarget and once without */

    const bubblingEventProps = {
        onMouseDownCapture: (event: MouseEvent<HTMLDivElement>) => event.preventDefault(),
        onTouchDownCapture: (event: TouchEvent<HTMLDivElement>) => event.preventDefault(),
    };
    return (
        <div
            {...overlayProps}
            ref={popoverRef}
            className="tw-bg-white tw-border-black-10 tw-border tw-rounded tw-overflow-hidden tw-shadow-mid"
        >
            <div {...bubblingEventProps}>
                {children}
                <DismissButton onDismiss={onClose} />
            </div>
        </div>
    );
};
