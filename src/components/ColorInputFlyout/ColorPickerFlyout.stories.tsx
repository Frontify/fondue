/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { Color } from "../../types/colors";
import { EXAMPLE_PALETTES } from "../ColorPicker/example-palettes";
import { ColorPickerFlyout as ColorPickerFlyoutComponent, ColorPickerFlyoutProps } from "./ColorPickerFlyout";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Color Picker/Flyout",
    component: ColorPickerFlyoutComponent,
    args: {
        disabled: false,
        currentColor: null,
    },
} as Meta<ColorPickerFlyoutProps>;

export const Flyout: Story<ColorPickerFlyoutProps> = ({ disabled, currentColor }) => {
    const [temporaryColor, setTemporaryColor] = useState<Color | null>(null);
    const [selectedColor, setSelectedColor] = useState<Color | null>(currentColor);

    return (
        <ColorPickerFlyoutComponent
            disabled={disabled}
            currentColor={temporaryColor ?? selectedColor}
            onClick={() => setSelectedColor(temporaryColor)}
            onClose={() => setTemporaryColor(null)}
            onSelect={(color) => setTemporaryColor(color)}
            palettes={EXAMPLE_PALETTES}
        />
    );
};
