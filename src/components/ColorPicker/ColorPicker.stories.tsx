/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from "@components/Flyout/Flyout";
import { MenuItem } from "@components/Menu/MenuItem/MenuItem";
import IconColors from "@elements/Icon/Generated/IconColors";
import { IconSize } from "@elements/Icon/IconSize";
import { Meta, Story } from "@storybook/react";
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

const addAlpha = ([hex, name]: string[]) => ({ hex, name, alpha: 1 });

const palettes = [
    {
        title: "Red",
        colors: [
            ["#992136", "90 (Foobar)"],
            ["#cc2c48", "70"],
            ["#e52144", "65"],
            ["#ff375a", "60"],
            ["#ff8066", "50 (This is orange?)"],
            ["#e1c4be", "40"],
            ["#f0e1de", "20"],
        ],
    },
    {
        title: "Green",
        colors: [
            ["#006452", "90"],
            ["#00866e", "75"],
            ["#00a084", "70 (Green Berlin)"],
            ["#00c8a5", "60"],
            ["#80dbb7", "50"],
            ["#bee1d4", "40"],
            ["#def0e9", "20"],
        ],
    },
    {
        title: "Yellow",
        colors: [
            ["#cc9000", "90"],
            ["#e6a200", "79"],
            ["#ffb400", "60"],
            ["#eec779", "50"],
            ["#e1d4be", "40"],
            ["#f0e9de", "20"],
        ],
    },
].map((palette) => ({ ...palette, colors: palette.colors.map(addAlpha) }));

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

WithBrandColors.args = { palettes };

export const WithinFlyout: Story<ColorPickerProps> = ({ currentColor }) => {
    const [temporaryColor, setTemporaryColor] = useState(currentColor);
    const [selectedColor, setSelectedColor] = useState<ColorPickerProps["currentColor"] | null>(null);

    return (
        <div className="dark:tw-text-white">
            <div className="tw-flex tw-items-center">
                Some text
                <Flyout
                    onClick={() => setSelectedColor(temporaryColor)}
                    onClose={() => setTemporaryColor(selectedColor || currentColor)}
                    trigger={
                        <MenuItem
                            title={
                                selectedColor
                                    ? [selectedColor.name || "", selectedColor.hex].join(" ")
                                    : "Selected Color"
                            }
                            decorator={
                                !selectedColor?.hex ? (
                                    <span className="tw-text-black-70">
                                        <IconColors size={IconSize.Size12} />
                                    </span>
                                ) : (
                                    <span
                                        className="tw-h-4 tw-w-4 tw-rounded tw-flex tw-items-center tw-justify-center"
                                        style={{ background: selectedColor?.hex }}
                                    />
                                )
                            }
                        />
                    }
                >
                    <ColorPicker
                        palettes={palettes}
                        currentColor={temporaryColor}
                        onSelect={(color) => setTemporaryColor(color)}
                    />
                </Flyout>
            </div>
            <div>
                Deserunt voluptate deserunt laborum dolor excepteur. Reprehenderit amet cillum ad ut. Magna labore
                consequat enim tempor amet in qui. In esse proident officia aliquip ea in in nulla aliqua in laborum
                anim ipsum est.
            </div>
        </div>
    );
};
