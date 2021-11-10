/* (c) Copyright Frontify Ltd., all rights reserved. */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Slider } from "@components/Slider/Slider";
import { getBackgroundColor, getColorDisplayValue } from "@utilities/colors";
import { merge } from "@utilities/merge";
import React, { FC, useEffect, useMemo, useState } from "react";
// @ts-ignore
import { getContrastingColor } from "react-color/lib/helpers/color";
import { Color, ColorFormat, Palette } from "../../types/colors";
import { BrandColorPicker } from "./BrandColorPicker";
import { CustomColorPicker } from "./CustomColorPicker";

export type ColorPickerProps = {
    palettes?: Palette[];
    currentColor: Color;
    currentFormat: ColorFormat;
    setFormat: (id: ColorFormat) => void;
    onSelect: (color: Color) => void;
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
    currentFormat = ColorFormat.Hex,
}) => {
    const [colorType, setColorType] = useState(ColorType.Brand);
    const [color, setColor] = useState(currentColor);

    useEffect(() => {
        setColor({ ...currentColor, alpha: currentColor.alpha || 1 });
    }, [currentColor]);

    return (
        <div className="tw-w-[400px]">
            <ColorPreview color={color} format={currentFormat} />
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
    const { hex, rgba, name, alpha } = color;
    const backgroundColor = getBackgroundColor(color);
    const displayValue = getColorDisplayValue(color, format);
    const labelColor = useMemo(() => {
        return alpha && alpha < 0.3 ? "#000000" : getContrastingColor(hex);
    }, [hex, rgba, alpha]);

    return (
        <div
            className={merge(["tw-flex tw-justify-center tw-p-7 tw-text-m tw-gap-2"])}
            style={{ background: backgroundColor, color: labelColor }}
            data-test-id="color-preview"
        >
            {name && <span className="tw-font-bold">{name}</span>}
            <span className={name ? "" : "tw-font-bold"}>{displayValue}</span>
        </div>
    );
};
