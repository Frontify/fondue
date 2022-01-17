/* (c) Copyright Frontify Ltd., all rights reserved. */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Slider } from "@components/Slider/Slider";
import React, { FC, useEffect, useMemo, useState } from "react";
// @ts-ignore
import { getContrastingColor } from "react-color/lib/helpers/color";
import { Color, ColorFormat, Palette } from "../../types/colors";
import { BrandColorPicker } from "./BrandColorPicker";
import { CustomColorPicker } from "./CustomColorPicker";
import { toHexString } from "@utilities/colors";

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
        setColor(currentColor);
    }, [currentColor]);

    return (
        <div className="tw-w-[400px] tw-relative">
            <ColorPreview color={color} />
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

const ColorPreview: FC<{ color: Color }> = ({ color }) => {
    const backgroundColor = toHexString(color);
    const displayValue = toHexString(color);
    const labelColor = useMemo(() => {
        return color.a && color.a < 0.3 ? null : getContrastingColor(color);
    }, [color]);

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
