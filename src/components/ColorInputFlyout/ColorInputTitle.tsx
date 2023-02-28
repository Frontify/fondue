/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getColorDisplayValue, toShortRgb } from '@utilities/colors';
import React, { FC } from 'react';
import tinycolor from 'tinycolor2';
import { Color, ColorFormat } from '../../types/colors';

type Props = {
    currentColor: Color;
    format: ColorFormat;
};

export const ColorInputTitle: FC<Props> = ({ currentColor, format }) => {
    const { name, alpha } = currentColor;
    const parsedColor = tinycolor(toShortRgb(currentColor));
    const colorValue = getColorDisplayValue(currentColor, format, false);

    return (
        <div className="tw-text-black-100">
            {name || colorValue}
            {format === ColorFormat.Hex && alpha && alpha < 1 && (
                <span className="tw-text-black-60">{` ${Math.trunc(parsedColor.getAlpha() * 100)} %`}</span>
            )}
        </div>
    );
};
ColorInputTitle.displayName = 'FondueColorInputTitle';
