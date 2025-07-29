/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { SegmentedControls } from '@components/SegmentedControls/SegmentedControls';

import { ColorFormat, type Color, type Palette } from '../../types/colors';

import { BrandColorPicker } from './BrandColorPicker';
import { ColorPreview } from './ColorPreview';
import { CustomColorPicker } from './CustomColorPicker';

/**
 * @deprecated Use the new `Color Picker` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#color-picker the migration guide}.
 */
export type ColorPickerProps = {
    palettes?: Palette[];
    currentColor: Color;
    currentFormat: ColorFormat;
    setFormat: (id: ColorFormat) => void;
    onSelect: (color: Color) => void;
    showPreview?: boolean;
    allowCustomColor?: boolean;
};

enum ColorType {
    Brand = 'Brand',
    Custom = 'Custom',
}

const colorTypes = [
    { id: ColorType.Brand, value: 'Brand' },
    { id: ColorType.Custom, value: 'Custom' },
];

/**
 * @deprecated Use the new `Color Picker` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#color-picker the migration guide}.
 */
export const ColorPicker = ({
    currentColor,
    palettes,
    onSelect,
    setFormat,
    showPreview = true,
    currentFormat = ColorFormat.Hex,
    allowCustomColor = true,
}: ColorPickerProps) => {
    const [colorType, setColorType] = useState(ColorType.Brand);

    return (
        <div className="tw-w-[400px] tw-relative">
            {showPreview && <ColorPreview color={currentColor} />}
            <div className="tw-p-5 tw-flex tw-flex-col tw-gap-2">
                {palettes && allowCustomColor && (
                    <SegmentedControls
                        items={colorTypes}
                        activeItemId={colorType}
                        onChange={(type) => setColorType(type as ColorType)}
                    />
                )}
                {palettes && colorType === ColorType.Brand ? (
                    <BrandColorPicker currentColor={currentColor} palettes={palettes} onSelect={onSelect} />
                ) : (
                    <CustomColorPicker
                        currentColor={currentColor}
                        currentFormat={currentFormat}
                        setFormat={setFormat}
                        onSelect={onSelect}
                    />
                )}
            </div>
        </div>
    );
};
ColorPicker.displayName = 'FondueColorPicker';
