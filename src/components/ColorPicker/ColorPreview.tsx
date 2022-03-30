/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getColorDisplayValue, isColorLight } from "@utilities/colors";
import { merge } from "@utilities/merge";
import React, { FC } from "react";
import tinycolor from "tinycolor2";
import { Color, ColorFormat } from "../../types/colors";

type ColorPreviewProps = {
    color: Color;
    format: ColorFormat;
};

export const ColorPreview: FC<ColorPreviewProps> = ({ color, format }) => {
    const parsedColor = tinycolor(color);
    const backgroundColor = parsedColor.toRgbString();
    const colorName = color.name;
    const displayValue = getColorDisplayValue(color, format);

    return (
        <div className="tw-sticky tw-top-0 tw-bg-white tw-z-20 dark:tw-bg-black-95 tw-border-b tw-border-b-black-10">
            <div
                className={merge([
                    "tw-flex tw-justify-center tw-p-7 tw-text-m tw-gap-2",
                    isColorLight(color) ? "tw-text-black" : "tw-text-white",
                ])}
                style={{ backgroundColor }}
                data-test-id="color-preview"
            >
                {colorName && <span className="tw-font-bold">{colorName}</span>}
                <span className={colorName ? "" : "tw-font-bold"}>{displayValue}</span>
            </div>
        </div>
    );
};
