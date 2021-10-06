/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC } from "react";
import { merge } from "@utilities/merge";
import { IconSize } from "@elements/Icon/IconSize";
import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";

export type RadioPillProps = {
    label: string;
    active: boolean;
    icon?: React.ReactElement;
};

export const RadioPill: FC<RadioPillProps> = ({ label, active, icon }) => {
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <button
            data-test-id="radio-pill"
            className={merge([
                "tw-text-xs tw-px-2 tw-py-1 tw-inline-flex tw-items-center",
                active
                    ? "dark:tw-bg-black-5 dark:tw-text-black-100 tw-bg-black-100 tw-text-white tw-rounded-full"
                    : "tw-text-black-80 dark:tw-bg-black-100 dark:tw-text-black-40",
                isFocusVisible && FOCUS_STYLE,
            ])}
            {...focusProps}
        >
            {icon && <span className="tw-mr-1">{cloneElement(icon, { size: IconSize.Size16 })}</span>}
            <span>{label}</span>
        </button>
    );
};
