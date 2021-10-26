/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Color, EXAMPLE_PALETTES } from "@utilities/colors";
import React, { useState } from "react";
import { ColorPickerFlyout as ColorPickerFlyoutComponent, ColorPickerFlyoutProps } from "./ColorPickerFlyout";

export default {
    title: "Components/Color Picker/Flyout",
    component: ColorPickerFlyoutComponent,
    args: {
        disabled: false,
        currentColor: null,
    },
} as Meta<ColorPickerFlyoutProps>;

export const Flyout: Story<ColorPickerFlyoutProps> = ({ disabled, currentColor }) => {
    const [temporaryColor, setTemporaryColor] = useState<Color | null>(currentColor);
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);

    return (
        <ColorPickerFlyoutComponent
            disabled={disabled}
            currentColor={temporaryColor}
            onClick={() => setSelectedColor(temporaryColor)}
            onClose={() => setTemporaryColor(selectedColor)}
            onSelect={(color) => setTemporaryColor(color)}
            palettes={EXAMPLE_PALETTES}
        />
    );
};
