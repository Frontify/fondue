import { toHexString } from "@utilities/colors";
import React, { FC } from "react";
import { Color, ColorFormat } from "../../types/colors";

type Props = {
    currentColor: Color;
    format: ColorFormat;
};

export const ColorInputTitle: FC<Props> = ({ currentColor, format }) => {
    const { name, a } = currentColor;
    const colorValue = toHexString(currentColor);

    return (
        <div className="tw-text-black-100">
            {name || colorValue}
            {format === ColorFormat.Hex && a && a < 1 && <span className="tw-text-black-60"> {currentColor.a}</span>}
        </div>
    );
};
