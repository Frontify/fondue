/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren, FC, ReactNode } from "react";
import { Tooltip } from "@components/Tooltip/Tooltip";
import { merge } from "@utilities/merge";

export type InputLabelProps = PropsWithChildren<{
    htmlFor: string;
    required?: boolean;
    disabled?: boolean;
    tooltip?: ReactNode;
    bold?: boolean;
}>;

export const InputLabel: FC<InputLabelProps> = ({
    children,
    htmlFor,
    required = false,
    disabled = false,
    tooltip,
    bold,
}) => {
    return (
        <div
            className={merge([
                "tw-inline-flex tw-items-center tw-gap-1 tw-font-sans tw-text-s",
                bold && "tw-font-medium",
                disabled
                    ? "tw-text-black-40 hover:tw-text-black-40 dark:tw-text-black-60 dark:hover:tw-text-black-60"
                    : "tw-text-black-90 dark:tw-text-white",
            ])}
        >
            <label
                htmlFor={htmlFor}
                className={
                    disabled
                        ? "hover:tw-cursor-not-allowed tw-pointer-events-none"
                        : "hover:tw-cursor-pointer hover:tw-text-black dark:hover:tw-text-white"
                }
                data-test-id="input-label"
            >
                {children}
            </label>
            {required && (
                <span
                    data-test-id="input-label-required"
                    className="tw-h-4 tw-text-m tw-text-red-60 dark:tw-text-red-50"
                >
                    *
                </span>
            )}
            {tooltip && <Tooltip tooltip={tooltip} />}
        </div>
    );
};
