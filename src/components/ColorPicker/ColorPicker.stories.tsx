/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import tinycolor from "tinycolor2";
import { Color, ColorFormat, Palette } from "../../types/colors";
import { ColorPicker, ColorPickerProps } from "./ColorPicker";

const generatePalette = (color: string, amount: number): Color[] => {
    const sourceColor = tinycolor(color);
    const palette = [...new Array(amount)].map((_, index) => {
        const name = (90 - index * 10).toString();
        const lightColor = sourceColor.lighten(index * 3).toRgb();
        return {
            ...lightColor,
            name,
        };
    });
    return palette;
};

export const EXAMPLE_PALETTES: Palette[] = [
    {
        id: "red",
        title: "Red",
        source: "#992136",
    },
    {
        id: "green",
        title: "Green",
        source: "#006452",
    },
    {
        id: "yellow",
        title: "Yellow",
        source: "#cc9000",
    },
].map((palette) => {
    return {
        ...palette,
        colors: generatePalette(palette.source, 6),
    };
});

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Color Picker",
    component: ColorPicker,
    args: {
        currentColor: { r: 85, g: 102, b: 255 },
    },
    argTypes: {
        onSelect: { action: "Select Color" },
    },
} as Meta<ColorPickerProps>;

const Template: Story<ColorPickerProps> = (args) => {
    const [selectedColor, setSelectedColor] = useState(args.currentColor);
    const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);

    return (
        <ColorPicker
            {...args}
            currentColor={selectedColor}
            currentFormat={currentFormat}
            setFormat={setCurrentFormat}
            onSelect={(color) => {
                args.onSelect(color);
                setSelectedColor(color);
            }}
        />
    );
};

export const OnlyCustomColor = Template.bind({});

export const WithBrandColors = Template.bind({});

WithBrandColors.args = { palettes: EXAMPLE_PALETTES };
