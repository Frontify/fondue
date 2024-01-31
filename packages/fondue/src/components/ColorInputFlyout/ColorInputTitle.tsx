/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getColorDisplayValue, toShortRgb } from '@utilities/colors';
import { ReactElement } from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Color, ColorFormat } from '../../types/colors';

type Props = {
    currentColor: Color;
    format: ColorFormat;
};

export const ColorInputTitle = ({ currentColor, format }: Props): ReactElement => {
    const { name, alpha } = currentColor;
    const parsedColor = new TinyColor(toShortRgb(currentColor));
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
