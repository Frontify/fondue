/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TinyColor } from '@ctrl/tinycolor';
import { type ReactElement } from 'react';

import { toShortRgb } from '@utilities/colors';

import { type Color } from '../../types/colors';

type ColorPreviewProps = {
    color: Color;
};

/**
 * @deprecated Use the new `Color Picker` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#color-picker the migration guide}.
 */
export const ColorPreview = ({ color }: ColorPreviewProps): ReactElement => {
    const parsedColor = new TinyColor(toShortRgb(color));
    const backgroundColor = parsedColor.toRgbString();

    return (
        <div className="tw-sticky -tw-ml-px -tw-mt-px tw-border tw-border-transparent tw-w-full tw-box-content tw-shrink-0 tw-h-2 tw-top-0 tw-rounded-t tw-overflow-hidden">
            <div
                className="tw-h-full tw-w-full tw-bg-white tw-z-20 dark:tw-bg-black-95"
                style={{ backgroundColor }}
                data-test-id="color-preview"
            ></div>
        </div>
    );
};
ColorPreview.displayName = 'FondueColorPreview';
