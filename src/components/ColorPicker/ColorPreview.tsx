/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toShortRgb } from '@utilities/colors';
import React, { FC } from 'react';
import tinycolor from 'tinycolor2';
import { Color } from '../../types/colors';

type ColorPreviewProps = {
    color: Color;
};

export const ColorPreview: FC<ColorPreviewProps> = ({ color }) => {
    const parsedColor = tinycolor(toShortRgb(color));
    const backgroundColor = parsedColor.toRgbString();

    return (
        <div
            className="tw-sticky tw-box-content tw-shrink-0 tw-h-2 tw-top-0 tw-bg-white tw-z-20 dark:tw-bg-black-95 tw-border-line tw-mt-[-1px] tw-rounded-t tw-border tw-border-b-0"
            style={{ backgroundColor }}
            data-test-id="color-preview"
        ></div>
    );
};
ColorPreview.displayName = 'FondueColorPreview';
