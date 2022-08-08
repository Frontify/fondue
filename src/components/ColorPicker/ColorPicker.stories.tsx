/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { ColorFormat } from '../../types/colors';
import { ColorPicker, ColorPickerProps } from './ColorPicker';
import { EXAMPLE_PALETTES } from './example-palettes';

export default {
    title: 'Components/Color Picker',
    component: ColorPicker,
    args: {
        currentColor: { red: 85, green: 102, blue: 255 },
    },
    argTypes: {
        onSelect: { action: 'Select Color' },
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
