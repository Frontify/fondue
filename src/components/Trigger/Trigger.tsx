/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconCaretDown from "@foundation/Icon/Generated/IconCaretDown";
import IconReject from "@foundation/Icon/Generated/IconReject";
import { IconSize } from "@foundation/Icon/IconSize";
import { useFocus } from "@react-aria/interactions";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, HTMLAttributes, useState } from "react";

export enum TriggerSize {
    Small = "Small",
    Large = "Large",
}

export type TriggerProps = {
    disabled?: boolean;
    isOpen?: boolean;
    clearable?: boolean;
    onClear?: () => void;
    buttonProps?: HTMLAttributes<HTMLElement>;
    isFocusVisible?: boolean;
    size?: TriggerSize;
};

export const Trigger: FC<TriggerProps> = ({
    buttonProps,
    onClear,
    children,
    disabled = false,
    clearable = false,
    isOpen = false,
    isFocusVisible = false,
    size = TriggerSize.Small,
}) => {
    const [isFocused, setFocused] = useState(false);
    const { focusProps: clearableFocusProps } = useFocus({
        onFocusChange: setFocused,
    });

    const showClear = clearable && onClear;

    return (
        <div
            data-test-id="trigger"
            className={merge([
                "tw-group tw-relative tw-flex tw-w-full tw-items-center tw-justify-between tw-border tw-rounded tw-transition-colors tw-min-h-[36px]",
                isFocusVisible && FOCUS_STYLE,
                disabled
                    ? "tw-border-black-5 tw-bg-black-5 tw-pointer-events-none"
                    : merge([
                          "tw-bg-white hover:tw-border-black-90",
                          isOpen ? "tw-border-black-100" : "tw-border-black-20",
                      ]),
            ])}
        >
            {children}
            <div
                className={merge([
                    "tw-flex-none tw-flex tw-items-center tw-gap-1",
                    size === TriggerSize.Large ? "tw-pr-5" : "tw-pr-3",
                ])}
            >
                {showClear && (
                    <button
                        {...clearableFocusProps}
                        data-test-id="dropdown-clear-button"
                        aria-label="Clear selection"
                        className={merge([
                            "tw-p-0 tw-outline-none",
                            isFocused && FOCUS_STYLE,
                            disabled ? "tw-pointer-events-none tw-text-black-40" : "tw-text-black-80",
                        ])}
                        onClick={() => {
                            setFocused(false);
                            onClear();
                        }}
                    >
                        <IconReject size={IconSize.Size12} />
                    </button>
                )}
                <button
                    {...buttonProps}
                    aria-hidden="true"
                    tabIndex={-1}
                    className={merge([
                        disabled
                            ? "tw-pointer-events-none tw-text-black-40"
                            : merge(["group-hover:tw-text-black", isOpen ? "tw-text-black-100" : "tw-text-black-80"]),
                    ])}
                >
                    <div className={merge(["tw-transition-transform", isOpen && "tw-rotate-180"])}>
                        <IconCaretDown size={IconSize.Size16} />
                    </div>
                </button>
            </div>
        </div>
    );
};
