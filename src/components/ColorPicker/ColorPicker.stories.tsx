/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { EXAMPLE_PALETTES, parseColor } from "@utilities/colors";
import React, { useState } from "react";
import { ColorFormat } from "../../types/colors";
import { ColorPicker, ColorPickerProps } from "./ColorPicker";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Color Picker",
    component: ColorPicker,
    args: {
        currentColor: parseColor("#5566FF"),
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
