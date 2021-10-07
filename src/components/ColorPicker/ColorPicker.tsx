/* (c) Copyright Frontify Ltd., all rights reserved. */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Slider } from "@components/Slider/Slider";
import { Color } from "@utilities/colors";
import { merge } from "@utilities/merge";
import React, { FC, useMemo, useState } from "react";
// @ts-ignore
import { getContrastingColor } from "react-color/lib/helpers/color";
import { BrandColorPicker } from "./BrandColorPicker";
import { CustomColorPicker } from "./CustomColorPicker";

type Palette = {
    title: string;
    colors: Color[];
};

export type ColorPickerProps = {
    palettes?: Palette[];
    currentColor: Color;
    currentFormat?: ColorFormat;
    setFormat?: (id: ColorFormat) => void;
    onSelect: (color: Color) => void;
};

export enum ColorFormat {
    Hex = "Hex",
    Rgba = "Rgba",
}

enum ColorType {
    Brand = "Brand",
    Custom = "Custom",
}

export const ColorPicker: FC<ColorPickerProps> = ({ currentColor, palettes, onSelect }) => {
    const colorTypes = [
        { id: ColorType.Brand, value: "Brand Colors" },
        { id: ColorType.Custom, value: "Custom Color" },
    ];
    const [colorType, setColorType] = useState(ColorType.Brand);
    const [colorFormat, setColorFormat] = useState(ColorFormat.Hex);

    return (
        <div data-test-id="color-picker" className="tw-w-[400px]">
            <ColorPreview color={currentColor} format={colorFormat} />
            <div className="tw-p-6 tw-flex tw-flex-col tw-gap-5">
                {palettes && (
                    <Slider
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
                        currentFormat={colorFormat}
                        setFormat={setColorFormat}
                        onSelect={onSelect}
                    />
                )}
            </div>
        </div>
    );
};

const ColorPreview: FC<{ color: Color; format: ColorFormat }> = ({ color, format }) => {
    const { hex, hexa, rgba, name, alpha } = color;

    /**
     * Return contrast color for the label.
     * The contrast color is calculated by 'react-colors' or is just black if alpha drops below 0.3.
     */

    const labelColor = useMemo(() => {
        const value = hexa ? hexa : hex;
        return alpha && alpha < 0.3 ? "#000" : getContrastingColor(value);
    }, [hex, hexa, rgba, alpha]);

    /**
     * Return value for background color. Prefer rgba, because 8-digit hex isn't working correctly.
     */

    const backgroundColor = useMemo(() => {
        if (rgba) {
            return `rgba(${Object.values(rgba).join(", ")})`;
        }
        return hex;
    }, [hex, hexa, rgba, alpha]);

    /**
     * Return color value to display, based on the selected color format (hex or rgba).
     */

    const displayValue = useMemo(() => {
        if (format === ColorFormat.Hex) {
            return hexa || hex;
        }
        if (format === ColorFormat.Rgba) {
            return backgroundColor;
        }
    }, [hex, hexa, rgba, alpha, format]);

    return (
        <div
            className={merge(["tw-flex tw-justify-center tw-p-7 tw-text-m tw-gap-2"])}
            style={{ background: backgroundColor, color: labelColor }}
        >
            {name && <span className="tw-font-bold">{name}</span>}
            <span className={name ? "" : "tw-font-bold"}>{displayValue}</span>
        </div>
    );
};
