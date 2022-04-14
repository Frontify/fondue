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
        clearable: false,
    },
    argTypes: {
        onDelete: { action: "onDelete" },
    },
} as Meta<ColorPickerFlyoutProps>;

export const Flyout: Story<ColorPickerFlyoutProps> = (args) => {
    const [temporaryColor, setTemporaryColor] = useState<Color | null>(null);
    const [selectedColor, setSelectedColor] = useState<Color | null>(args.currentColor);

    return (
        <>
            <ColorPickerFlyoutComponent
                {...args}
                currentColor={temporaryColor ?? selectedColor}
                onClick={() => setSelectedColor(temporaryColor)}
                onClose={() => setTemporaryColor(null)}
                onSelect={(color) => setTemporaryColor(color)}
                palettes={EXAMPLE_PALETTES}
                onClear={() => {
                    setTemporaryColor(null);
                    setSelectedColor(null);
                }}
                onDelete={() => {
                    args.onDelete && args.onDelete();
                }}
            />
        </>
    );
};
