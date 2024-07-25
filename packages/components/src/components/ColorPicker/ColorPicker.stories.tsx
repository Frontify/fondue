/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ColorGradientInput } from './ColorGradientInput';
import { ColorValueInput } from './ColorValueInput';
import { CustomColorPicker } from './CustomColorPicker';
import { BrandColorPicker } from './moveToWebApp/BrandColorPicker';
import { ColorChooser } from './moveToWebApp/ColorChooser';
import { type Color } from './types';

const palettes = [
    {
        id: 'hdsuzfg',
        title: 'Palette 1',
        colors: [
            { red: 255, green: 0, blue: 0, alpha: 1, name: 'red' },
            { red: 0, green: 255, blue: 0, alpha: 1, name: 'green' },
            { red: 0, green: 0, blue: 255, alpha: 1, name: 'blue' },
            { red: 255, green: 255, blue: 0, alpha: 1, name: 'yellow' },
            { red: 0, green: 255, blue: 255, alpha: 1, name: 'cyan' },
            { red: 255, green: 0, blue: 255, alpha: 1, name: 'magenta' },
        ],
    },
    {
        id: 'fdas',
        title: 'Palette 2',
        colors: [
            { red: 255, green: 255, blue: 0, alpha: 1, name: 'yellow' },
            { red: 0, green: 255, blue: 255, alpha: 1, name: 'cyan' },
            { red: 255, green: 0, blue: 255, alpha: 1, name: 'magenta' },
        ],
    },
];

type Story = StoryObj<typeof ColorChooser>;
const meta: Meta<typeof ColorChooser> = {
    component: ColorChooser,
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
    args: {
        children: 'Hello World',
    },
    render: () => {
        const [currentColor, setCurrentColor] = useState<Color | undefined>();
        return (
            <ColorChooser currentColor={currentColor} onColorChange={setCurrentColor}>
                <BrandColorPicker palettes={palettes} />
                <CustomColorPicker>
                    <ColorValueInput defaultFormat="RGBA" />
                    <ColorGradientInput />
                </CustomColorPicker>
            </ColorChooser>
        );
    },
};
