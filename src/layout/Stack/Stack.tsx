/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import React, { FC, PropsWithChildren } from "react";

export type StackSpacing = "none" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";

export type StackProps = PropsWithChildren<{
    padding: StackSpacing;
    spacing: StackSpacing;
    direction?: "row" | "column";
    wrap?: boolean;
}>;

const paddingMap: Record<StackSpacing, string> = {
    none: "tw-p-0",
    xxs: "tw-p-xxs",
    xs: "tw-p-xs",
    s: "tw-p-s",
    m: "tw-p-m",
    l: "tw-p-l",
    xl: "tw-p-xl",
    xxl: "tw-p-xxl",
};

const spacingMap: Record<StackSpacing, string> = {
    none: "tw-gap-0",
    xxs: "tw-gap-xxs",
    xs: "tw-gap-xs",
    s: "tw-gap-s",
    m: "tw-gap-m",
    l: "tw-gap-l",
    xl: "tw-gap-xl",
    xxl: "tw-gap-xxl",
};

export const Stack: FC<StackProps> = ({ children, padding, spacing, direction = "row", wrap = false }) => {
    return (
        <div
            data-test-id="stack"
            className={merge([
                "tw-flex",
                paddingMap[padding],
                spacingMap[spacing],
                direction === "row" ? "tw-flex-row" : "tw-flex-col",
                wrap ? "tw-flex-wrap" : "tw-flex-nowrap",
            ])}
        >
            {children}
        </div>
    );
};
