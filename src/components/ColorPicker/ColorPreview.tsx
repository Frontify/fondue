/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import tinycolor from 'tinycolor2';
import { Color } from '../../types/colors';

type ColorPreviewProps = {
    color: Color;
};

export const ColorPreview: FC<ColorPreviewProps> = ({ color }) => {
    const parsedColor = tinycolor(color);
    const backgroundColor = parsedColor.toRgbString();

    return (
        <div
            className="tw-sticky tw-box-content tw-shrink-0 tw-h-2 tw-top-0 tw-bg-base tw-z-20"
            style={{ backgroundColor }}
            data-test-id="color-preview"
        ></div>
    );
};
