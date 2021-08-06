/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";

export enum DividerStyle {
    NoLine = "tw-border-none",
    Dashed = "tw-border-dashed",
    Solid = "tw-border-solid",
    Dotted = "tw-border-dotted",
}

export enum DividerHeight {
    Height10 = "tw-h-[10px]",
    Height25 = "tw-h-[25px]",
    Height50 = "tw-h-[50px]",
    Height75 = "tw-h-[75px]",
    Height100 = "tw-h-[100px]",
}

export type DividerProps = {
    style?: DividerStyle;
    height?: DividerHeight;
    color?: string;
};

export const Divider: FC<DividerProps> = ({
    style = DividerStyle.Solid,
    height = DividerHeight.Height50,
    color: borderTopColor = "#CCC",
}) => (
    <div className={`tw-flex tw-items-center ${height}`} data-test-id="divider">
        <hr className={`tw-border-t tw-m-0 tw-w-full ${style}`} style={{ borderTopColor }} data-test-id="divider-hr" />
    </div>
);
