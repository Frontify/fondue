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

    return (
        <div data-test-id="color-picker" className="tw-w-[400px]">
            <ColorPreview color={currentColor} />
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
                    <CustomColorPicker currentColor={currentColor} onSelect={onSelect} />
                )}
            </div>
        </div>
    );
};

const ColorPreview: FC<{ color: Color }> = ({ color }) => {
    const { hex, value, name, alpha } = color;

    /**
     * Returns a tuple of [contrast color, display name].
     * The contrast color is calculated by `react-colors` or is just black if alpha drops below 0.3.
     *
     * The display name is either an RGBA value (if provided) or the HEX value.
     */
    const [labelColor, colorValue] = useMemo((): [string, string] => {
        if (hex !== value && !!value) {
            return [alpha && alpha < 0.3 ? "#000" : getContrastingColor(value), value];
        }

        return [getContrastingColor(hex), hex];
    }, [hex, value, alpha]);

    return (
        <div
            className={merge(["tw-flex tw-justify-center tw-p-7 tw-text-m tw-gap-2"])}
            style={{ background: value || hex, color: labelColor }}
        >
            {name && <span className="tw-font-bold">{name}</span>}
            <span className={name ? "" : "tw-font-bold"}>{colorValue}</span>
        </div>
    );
};
