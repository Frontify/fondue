/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toShortRgb } from '@utilities/colors';
import { ReactElement } from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Color } from '../../types/colors';

type ColorPreviewProps = {
    color: Color;
};

export const ColorPreview = ({ color }: ColorPreviewProps): ReactElement => {
    const parsedColor = new TinyColor(toShortRgb(color));
    const backgroundColor = parsedColor.toRgbString();

    return (
        <div className="tw-sticky tw-ml-[-1px] tw-mt-[-1px] tw-border tw-border-transparent tw-w-full tw-box-content tw-shrink-0 tw-h-2 tw-top-0 tw-rounded-t tw-overflow-hidden">
            <div
                className="tw-h-full tw-w-full tw-bg-white tw-z-20 dark:tw-bg-black-95"
                style={{ backgroundColor }}
                data-test-id="color-preview"
            ></div>
        </div>
    );
};
ColorPreview.displayName = 'FondueColorPreview';
