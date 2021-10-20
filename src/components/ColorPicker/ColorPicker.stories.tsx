/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { EXAMPLE_PALETTES } from "@utilities/colors";
import React, { useState } from "react";
import { ColorPicker, ColorPickerProps } from "./ColorPicker";

export default {
    title: "Components/Color Picker",
    component: ColorPicker,
    args: {
        currentColor: { hex: "#5566FF", alpha: 1 },
    },
    argTypes: {
        onSelect: { action: "Select Color" },
    },
} as Meta<ColorPickerProps>;

const Template: Story<ColorPickerProps> = (args) => {
    const [selectedColor, setSelectedColor] = useState(args.currentColor);
    return (
        <ColorPicker
            {...args}
            currentColor={selectedColor}
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
