/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { ColorFormat } from '../../types/colors';

import { ColorPicker, type ColorPickerProps } from './ColorPicker';
import { EXAMPLE_PALETTES } from './example-palettes';

/**
 ### This component is deprecated, please use the [new Color Picker component](/docs/current_components-colorpicker--documentation) instead.
 */
export default {
    title: 'Components/Color Picker',
    component: ColorPicker,
    tags: ['autodocs'],
    args: {
        currentColor: { red: 85, green: 102, blue: 255 },
    },
    argTypes: {
        onSelect: { action: 'Select Color' },
    },
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<ColorPickerProps>;

const Template: StoryFn<ColorPickerProps> = (args) => {
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

export const OnlyBrandColor = Template.bind({});

OnlyBrandColor.args = { palettes: EXAMPLE_PALETTES, allowCustomColor: false };

export const WithBrandColors = Template.bind({});

WithBrandColors.args = { palettes: EXAMPLE_PALETTES };
