import React from "react";
import { useOverlay, DismissButton } from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";
import { FC } from "react";

interface PopoverProps {
    popoverRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    isOpen?: boolean;
    onClose: () => void;
}
export const Popover: FC<PopoverProps> = (props) => {
    const ref = React.useRef<HTMLDivElement>(null);
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
                className="tw-bg-white tw-border-black-10 tw-border tw-rounded tw-overflow-hidden tw-shadow-mid"
            >
                {children}
                <DismissButton onDismiss={onClose} />
            </div>
        </FocusScope>
    );
};
