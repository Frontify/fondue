/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DismissButton, useOverlay } from "@react-aria/overlays";
import React, { FC, useRef } from "react";
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

    return (
        <div
            {...overlayProps}
            ref={popoverRef}
            className="tw-bg-white tw-border-black-10 tw-border tw-rounded tw-overflow-hidden tw-shadow-mid"
        >
            {children}
            <DismissButton onDismiss={onClose} />
        </div>
    );
};
