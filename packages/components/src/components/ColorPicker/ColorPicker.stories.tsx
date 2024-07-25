/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ColorGradientInput } from './ColorGradientInput';
import { ColorPicker, ColorPickerRoot } from './ColorPicker';
import { ColorValueInput } from './ColorValueInput';
import { type Color } from './types';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof ColorPickerRoot> = {
    component: ColorPickerRoot,
    subcomponents: {
        // @ts-expect-error Storybook has the wrong type for subcomponents
        'ColorPicker.Values': ColorValueInput,
        // @ts-expect-error Storybook has the wrong type for subcomponents
        'ColorPicker.Gradient': ColorGradientInput,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {},
};
export default meta;

export const Default: Story = {
    args: {},
    render: (args) => {
        const [currentColor, setCurrentColor] = useState<Color | undefined>();
        return (
            <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Values />
                <ColorPicker.Gradient />
            </ColorPicker.Root>
        );
    },
};
