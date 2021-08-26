/* (c) Copyright Frontify Ltd., all rights reserved. */

// React
import React, { FC, useRef } from "react";
// Icon
import { IconSize } from "@elements/Icon/IconSize";
import IconAddSimple from "@elements/Icon/Generated/IconAddSimple";
// ARIA
import { useButton } from "@react-aria/button";
import { useHover } from "@react-aria/interactions";
import { usePress } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
// Utilities
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";

export enum AddBlockButtonDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export type AddBlockButtonProps = {
    onClick: () => void;
    title?: string;
    orientation?: AddBlockButtonDirection;
};

export const AddBlockButton: FC<AddBlockButtonProps> = ({
    onClick,
    title,
    orientation = AddBlockButtonDirection.Horizontal,
}) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const { isFocusVisible, focusProps } = useFocusRing();
    const { buttonProps } = useButton({ onPress: () => onClick() }, ref);
    const { hoverProps, isHovered } = useHover({});
    const { pressProps, isPressed } = usePress({});

    return (
        <button
            {...mergeProps(buttonProps, focusProps, hoverProps, pressProps)}
            title={title}
            data-test-id="add-block-button"
            className={merge([
                "tw-leading-none tw-rounded-sm tw-outline-none",
                isFocusVisible && FOCUS_STYLE,
                orientation === AddBlockButtonDirection.Vertical ? "tw-rotate-90" : "",
            ])}
        >
            <span
                className={merge([
                    "tw-text-white tw-bg-violet-60 tw-rounded tw-inline-flex tw-items-center tw-w-7 tw-h-6 tw-relative tw-p-1 tw-transition-color",
                    isHovered && "tw-bg-violet-70",
                    isPressed && "tw-bg-violet-90",
                    orientation === AddBlockButtonDirection.Vertical ? "tw-rotate-90" : "",
                ])}
                style={{
                    clipPath: `path(
                        "M27.3333 10.9369L21.7246 2C20.5 0.5 19.5 0 18 0H4C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H18C19.5 24 20.5 23.5 21.7246 22L27.3333 13.0631C27.7412 12.4131 27.7412 11.5869 27.3333 10.9369Z"
                    )`,
                }}
            >
                <IconAddSimple size={IconSize.Size16} />
            </span>
        </button>
    );
};
