/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC } from "react";
import { merge } from "@utilities/merge";
import { IconSize } from "@elements/Icon/IconSize";

export type RadioPillProps = {
    label: string;
    active: boolean;
    icon?: React.ReactElement;
};

export const RadioPill: FC<RadioPillProps> = ({ label, active, icon }) => (
    <div
        data-test-id="radio-pill"
        className={merge([
            "tw-text-xs tw-px-2 tw-py-1 tw-inline-flex tw-items-center",
            active ? "dark:tw-bg-black dark:tw-text-white tw-bg-black-5 tw-rounded-full" : "tw-text-black-80",
        ])}
    >
        {icon && <span className="tw-mr-1">{cloneElement(icon, { size: IconSize.Size16 })}</span>}
        <span>{label}</span>
    </div>
);
