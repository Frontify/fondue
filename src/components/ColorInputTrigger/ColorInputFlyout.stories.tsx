/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Color, EXAMPLE_PALETTES } from "@utilities/colors";
import React, { useState } from "react";
import { ColorInputFlyout as ColorInputFlyoutComponent, ColorInputFlyoutProps } from "./ColorInputFlyout";

export default {
    title: "Components/Color Input Trigger",
    component: ColorInputFlyoutComponent,
    args: {
        disabled: false,
        currentColor: null,
    },
} as Meta<ColorInputFlyoutProps>;

export const ColorInputTrigger: Story<ColorInputFlyoutProps> = ({ disabled, currentColor }) => {
    const [temporaryColor, setTemporaryColor] = useState<Color | null>(currentColor);
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);

    return (
        <ColorInputFlyoutComponent
            disabled={disabled}
            currentColor={temporaryColor}
            onClick={() => setSelectedColor(temporaryColor)}
            onClose={() => setTemporaryColor(selectedColor)}
            onSelect={(color) => setTemporaryColor(color)}
            palettes={EXAMPLE_PALETTES}
        />
    );
};
