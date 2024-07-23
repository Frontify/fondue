/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BrandColorPicker } from './BrandColorPicker';
import { ColorPicker } from './ColorPicker';
import { CustomColorPicker } from './CustomColorPicker';
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

type Story = StoryObj<typeof ColorPicker>;
const meta: Meta<typeof ColorPicker> = {
    component: ColorPicker,
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
            <ColorPicker currentColor={currentColor} onSelect={setCurrentColor}>
                <BrandColorPicker palettes={palettes} />
                <CustomColorPicker palettes={palettes} />
            </ColorPicker>
        );
    },
};
