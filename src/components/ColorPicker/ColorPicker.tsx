/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slider } from "@components/Slider/Slider";
import { getColorDisplayValue } from "@utilities/colors";
import React, { FC, useEffect, useMemo, useState } from "react";
import tinycolor from "tinycolor2";
import { Color, ColorFormat, Palette } from "../../types/colors";
import { BrandColorPicker } from "./BrandColorPicker";
import { CustomColorPicker } from "./CustomColorPicker";

export type ColorPickerProps = {
    palettes?: Palette[];
    currentColor: Color;
    currentFormat: ColorFormat;
    setFormat: (id: ColorFormat) => void;
    onSelect: (color: Color) => void;
    showPreview?: boolean;
};

enum ColorType {
    Brand = "Brand",
    Custom = "Custom",
}

const colorTypes = [
    { id: ColorType.Brand, value: "Brand Colors" },
    { id: ColorType.Custom, value: "Custom Color" },
];

export const ColorPicker: FC<ColorPickerProps> = ({
    currentColor,
    palettes,
    onSelect,
    setFormat,
    showPreview = true,
    currentFormat = ColorFormat.Hex,
}) => {
    const [colorType, setColorType] = useState(ColorType.Brand);
    const [color, setColor] = useState<Color>(currentColor);

    useEffect(() => {
        setColor({ ...currentColor, a: currentColor.a || 1 });
    }, [currentColor]);

    return (
        <div className="tw-w-[400px] tw-relative">
            {showPreview && <ColorPreview color={color} format={currentFormat} />}
            <div className="tw-p-6 tw-flex tw-flex-col tw-gap-5">
                {palettes && (
                    <Slider
                        items={colorTypes}
                        activeItemId={colorType}
                        onChange={(type) => setColorType(type as ColorType)}
                    />
                )}
                {palettes && colorType === ColorType.Brand ? (
                    <BrandColorPicker currentColor={color} palettes={palettes} onSelect={onSelect} />
                ) : (
                    <CustomColorPicker
                        currentColor={color}
                        currentFormat={currentFormat}
                        setFormat={setFormat}
                        onSelect={onSelect}
                    />
                )}
            </div>
        </div>
    );
};

const ColorPreview: FC<{ color: Color; format: ColorFormat }> = ({ color, format }) => {
    const parsedColor = tinycolor(color);
    const backgroundColor = parsedColor.toRgbString();
    const displayValue = getColorDisplayValue(color, format);
    const labelColor = useMemo(() => {
        return parsedColor.isLight() || parsedColor.getAlpha() < 0.25 ? "#000" : "#fff";
    }, [parsedColor]);

    return (
        <div className="tw-sticky tw-top-0 tw-bg-white tw-z-20 dark:tw-bg-black-95">
            <div
                className="tw-flex tw-justify-center tw-p-7 tw-text-m tw-text-black dark:tw-text-white tw-gap-2"
                style={{ background: backgroundColor, color: labelColor }}
                data-test-id="color-preview"
            >
                {color.name && <span className="tw-font-bold">{color.name}</span>}
                <span className={color.name ? "" : "tw-font-bold"}>{displayValue}</span>
            </div>
        </div>
    );
};
