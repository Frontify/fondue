/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, MouseEvent, useMemo } from "react";
import { merge } from "@utilities/merge";
import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { InputLabel } from "@components/InputLabel/InputLabel";
import { TooltipProps } from "@components/Tooltip/Tooltip";

export enum SwitchSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

const lineSizeClasses: Record<SwitchSize, string> = {
    [SwitchSize.Small]: "tw-w-5 tw-h-2",
    [SwitchSize.Medium]: "tw-w-9 tw-h-5",
    [SwitchSize.Large]: "tw-w-11 tw-h-6",
};

const dotSizeClasses: Record<SwitchSize, string> = {
    [SwitchSize.Small]: "tw-w-3 tw-h-3",
    [SwitchSize.Medium]: "tw-w-4 tw-h-4",
    [SwitchSize.Large]: "tw-w-5 tw-h-5",
};

export type SwitchProps = {
    id?: string;
    on?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    size?: SwitchSize;
    hug?: boolean;
    tooltip?: Omit<TooltipProps, "tooltipAriaProps">;
    onChange?: (e: MouseEvent) => void;
};

export const Switch: FC<SwitchProps> = ({
    id: propId,
    name,
    label,
    disabled,
    onChange,
    size = SwitchSize.Medium,
    on = false,
    hug = false,
    tooltip,
}) => {
    const id = useMemoizedId(propId);
    const { isFocusVisible, focusProps } = useFocusRing();

    const lineClasses = useMemo(() => {
        const baseClasses = "tw-inline-flex tw-border-0 tw-rounded-full tw-transition-colors tw-flex-shrink-0";
        const sizeClasses = size !== SwitchSize.Small ? "tw-py-0 tw-px-[0.125rem]" : "tw-p-0";
        const activatedClasses = on ? "tw-bg-black-90 hover:tw-bg-black" : "tw-bg-black-30 hover:tw-bg-black-60";
        const disabledClasses = disabled ? "tw-bg-black-10 tw-pointer-events-none" : activatedClasses;

        return merge([baseClasses, sizeClasses, disabledClasses, lineSizeClasses[size], isFocusVisible && FOCUS_STYLE]);
    }, [on, disabled, size, isFocusVisible]);

    const dotClasses = useMemo(() => {
        const baseClasses = "tw-block tw-self-center tw-bg-white tw-rounded-full tw-transition-transform";
        const disabledClasses = disabled ? "tw-border tw-border-black-30" : "tw-border tw-border-black";
        const sizeClasses = size === SwitchSize.Small ? disabledClasses : "";
        const activatedClasses = size === SwitchSize.Small ? "tw-translate-x-2" : "tw-translate-x-full";
        const animationClasses = on ? activatedClasses : "tw-translate-x-0";

        return merge([baseClasses, sizeClasses, dotSizeClasses[size], animationClasses]);
    }, [on, disabled, size]);

    const containerClasses = useMemo(() => {
        return merge(["tw-gap-2 tw-items-center tw-justify-between", hug ? "tw-inline-flex" : "tw-flex"]);
    }, [hug]);

    return (
        <div className={containerClasses} data-test-id="switch-container">
            {label && (
                <InputLabel htmlFor={id} disabled={disabled} tooltip={tooltip}>
                    {label}
                </InputLabel>
            )}
            <button
                {...focusProps}
                id={id}
                disabled={disabled}
                name={name}
                data-test-id="switch"
                className={lineClasses}
                value={on.toString()}
                onClick={onChange}
            >
                <div className={dotClasses} />
            </button>
        </div>
    );
};
