import { FocusScope } from "@react-aria/focus";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import React, { FC, ReactNode, RefObject, useRef } from "react";

type PopoverProps = {
    popoverRef?: RefObject<HTMLDivElement>;
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
};

export const Popover: FC<PopoverProps> = (props: PopoverProps) => {
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
        <FocusScope restoreFocus>
            <div
                {...overlayProps}
                ref={popoverRef}
                className="tw-absolute tw-z-10 tw-top-full tw-w-52 tw-shadow-lg tw-bg-white tw-mt-2"
            >
                {children}
                <DismissButton onDismiss={onClose} />
            </div>
        </FocusScope>
    );
};
