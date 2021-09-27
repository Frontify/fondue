/* (c) Copyright Frontify Ltd., all rights reserved. */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Slider } from "@components/Slider/Slider";
import { Color } from "@utilities/colors";
import React, { FC, useMemo, useState } from "react";
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
    const { hex, value, name } = currentColor;

    const displayColor = useMemo(() => {
        if (hex !== value) {
            return value;
        }

        return hex;
    }, [hex, value]);

    return (
        <div data-test-id="color-picker" className="tw-w-[400px]">
            <div
                className="tw-flex tw-justify-center tw-p-7 tw-text-white tw-text-m tw-gap-2"
                style={{ background: value || hex }}
            >
                {name && <span className="tw-font-bold">{name}</span>}
                <span className={name ? "" : "tw-font-bold"}>{displayColor}</span>
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
