import { getColorDisplayValue } from "@utilities/colors";
import React, { FC } from "react";
import tinycolor from "tinycolor2";
import { Color, ColorFormat } from "../../types/colors";

type Props = {
    currentColor: Color;
    format: ColorFormat;
};

export const ColorInputTitle: FC<Props> = ({ currentColor, format }) => {
    const { name, a } = currentColor;
    const parsedColor = tinycolor(currentColor);
    const colorValue = getColorDisplayValue(currentColor, format, false);

    return (
        <div className="tw-text-black-100">
            {name || colorValue}
            {format === ColorFormat.Hex && a && a < 1 && (
                <span className="tw-text-black-60">{` ${Math.trunc(parsedColor.getAlpha() * 100)} %`}</span>
            )}
        </div>
    );
};
