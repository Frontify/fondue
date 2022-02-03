/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import React, { FC, PropsWithChildren } from "react";

type HeadingWeight = "medium" | "strong";
type HeadingSize = "medium" | "large" | "x-large";
type HeadingColor = "default" | "weak" | "x-weak" | "disabled" | "negative" | "positive" | "warning" | "interactive";

export type HeadingProps = PropsWithChildren<{
    size?: HeadingSize;
    weight?: HeadingWeight;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
    color?: HeadingColor;
}>;

const weightMap: Record<HeadingWeight, string> = {
    medium: "tw-font-medium",
    strong: "tw-font-bold",
};

const sizeMap: Record<HeadingSize, string> = {
    medium: "tw-text-heading-medium",
    large: "tw-text-heading-large",
    "x-large": "tw-text-heading-x-large",
};

const colorMap: Record<HeadingColor, string> = {
    default: "tw-text-text",
    weak: "tw-text-text-weak",
    "x-weak": "tw-text-text-x-weak",
    disabled: "tw-text-text-disabled",
    negative: "tw-text-text-negative",
    positive: "tw-text-text-positive",
    warning: "tw-text-text-warning",
    interactive: "tw-text-text-interactive",
};

export const Heading: FC<HeadingProps> = ({
    children,
    as: Tag = "span",
    weight = "medium",
    size = "medium",
    color = "default",
}) => {
    return (
        <Tag
            data-test-id="heading"
            className={merge(["tw-font-heading", weightMap[weight], sizeMap[size], colorMap[color]])}
        >
            {children}
        </Tag>
    );
};
