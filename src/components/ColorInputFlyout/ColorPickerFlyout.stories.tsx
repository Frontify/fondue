/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { EXAMPLE_PALETTES } from "@utilities/colors";
import { Color } from "../../types/colors";
import React, { useState } from "react";
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
    const [temporaryColor, setTemporaryColor] = useState<Color | null>(currentColor);
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);

    return (
        <div className="tw-min-h-[1000px] tw-pt-[300px]">
            <ColorPickerFlyoutComponent
                disabled={disabled}
                currentColor={temporaryColor}
                onClick={() => setSelectedColor(temporaryColor)}
                onClose={() => setTemporaryColor(selectedColor)}
                onSelect={(color) => setTemporaryColor(color)}
                palettes={EXAMPLE_PALETTES}
            />
        </div>
    );
};
