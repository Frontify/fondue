/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";

export enum DividerStyle {
    NoLine = "noLine",
    Dashed = "dashed",
    Solid = "solid",
    Dotted = "dotted",
}

export enum DividerHeight {
    Height10 = "10px",
    Height25 = "25px",
    Height50 = "50px",
    Height75 = "75px",
    Height100 = "100px",
}

export type DividerProps = {
    style?: DividerStyle;
    height?: DividerHeight | string;
    color?: string;
};

const styleMap = {
    [DividerStyle.NoLine]: "tw-border-none",
    [DividerStyle.Dashed]: "tw-border-dashed",
    [DividerStyle.Solid]: "tw-border-solid",
    [DividerStyle.Dotted]: "tw-border-dotted",
};

export const Divider: FC<DividerProps> = ({
    style = DividerStyle.Solid,
    height = DividerHeight.Height50,
    color: borderTopColor = "#CCC",
}) => (
    <div className="tw-flex tw-items-center" style={{ height }} data-test-id="divider">
        <hr
            className={`tw-border-t tw-m-0 tw-w-full ${styleMap[style]}`}
            style={{ borderTopColor }}
            data-test-id="divider-hr"
        />
    </div>
);
