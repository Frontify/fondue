/* (c) Copyright Frontify Ltd., all rights reserved. */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Slider } from "@components/Slider/Slider";
import React, { FC, useState } from "react";
// @ts-ignore
import { toState } from "react-color/lib/helpers/color";
import { BrandColorPicker } from "./BrandColorPicker";
import { CustomColorPicker } from "./CustomColorPicker";

type Color = {
    value?: string;
    rgba?: { r: number; g: number; b: number; a: number };
    hex: string;
    alpha?: number;
    name?: string;
};

type Palette = {
    title: string;
    colors: Color[];
};

export type ColorPickerProps = {
    palettes?: Palette[];
    currentColor: Color;
    onSelect: (color: Color) => void;
};

export const transformColor = (color: Color) => toState({ ...toState(color).rgb, a: color.alpha });

const getValidRgbColorValue = (input: string): number => {
    const value = parseInt(input || "0", 10);

    return value > 255 ? 255 : value < 0 ? 0 : value;
};

type DiffColor = {
    hex?: string;
    rgba?: { r?: number | string; g?: number | string; b?: number | string; a?: number };
    name?: string;
};

export const toColor = (current: Color, { name, ...diff }: DiffColor): Color => {
    const a = diff.rgba?.a || current.rgba?.a || current.alpha || 0;
    const alpha = a > 1 ? 1 : a;
    const rgb = { ...current.rgba, ...toState({ hex: diff.hex || current.hex }).rgb, ...diff.rgba };
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(getValidRgbColorValue);
    const rgba = { r, g, b, a: alpha };
    const hex = toState(rgba).hex;
    const value = alpha === 1 ? hex : `rgba(${Object.values(rgba).join(", ")})`;

    return { name, rgba, alpha, hex, value };
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
        { id: ColorType.Brand, name: "Brand Colors" },
        { id: ColorType.Custom, name: "Custom Color" },
    ];
    const [colorType, setColorType] = useState(ColorType.Brand);
    const { hex, value, name } = currentColor;

    return (
        <div data-test-id="color-picker" className="tw-max-w-[400px]">
            <div
                className="tw-flex tw-justify-center tw-p-7 tw-text-white tw-text-m tw-gap-2"
                style={{ background: value || hex }}
            >
                {name && <span className="tw-font-bold">{name}</span>}
                <span className={name ? "" : "tw-font-bold"}>
                    {[hex, value !== hex && value].filter(Boolean).join(" / ")}
                </span>
            </div>
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
