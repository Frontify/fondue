/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Flyout } from '../Flyout/Flyout';

import { ColorGradientInput } from './ColorGradientInput';
import { ColorPicker, ColorPickerRoot } from './ColorPicker';
import { ColorValueInput } from './ColorValueInput';

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
    args: {
        currentColor: { red: 230, green: 100, blue: 50, alpha: 0.8 },
    },
    render: (args) => {
        const [currentColor, setCurrentColor] = useState(args.currentColor);
        return (
            <>
                <span>{JSON.stringify(currentColor)}</span>
                <ColorPicker.Root defaultFormat="HEX" currentColor={currentColor} onColorChange={setCurrentColor}>
                    <ColorPicker.Values />
                    <ColorPicker.Gradient />
                </ColorPicker.Root>
            </>
        );
    },
};

export const WithRgbaDefaultFormat: Story = {
    args: {
        currentColor: { red: 230, green: 100, blue: 50, alpha: 0.8 },
    },
    render: (args) => {
        const [currentColor, setCurrentColor] = useState(args.currentColor);
        return (
            <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor} defaultFormat="RGBA">
                <ColorPicker.Values />
                <ColorPicker.Gradient />
            </ColorPicker.Root>
        );
    },
};

export const OnlyPicker: Story = {
    args: {
        currentColor: { red: 230, green: 100, blue: 50, alpha: 0.8 },
    },
    render: (args) => {
        const [currentColor, setCurrentColor] = useState(args.currentColor);
        return (
            <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Gradient />
            </ColorPicker.Root>
        );
    },
};

export const OnlyValues: Story = {
    args: {
        currentColor: { red: 230, green: 100, blue: 50, alpha: 0.8 },
    },
    render: (args) => {
        const [currentColor, setCurrentColor] = useState(args.currentColor);
        return (
            <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Values />
            </ColorPicker.Root>
        );
    },
};

export const InFlyout: Story = {
    args: {},
    render: (args) => {
        const [currentColor, setCurrentColor] = useState(args.currentColor);
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <ColorPicker.Input
                        currentColor={currentColor}
                        onClear={() => {
                            setCurrentColor(undefined);
                        }}
                    />
                </Flyout.Trigger>

                <Flyout.Content maxWidth="500px">
                    <div className="tw-p-4">
                        <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                            <ColorPicker.Values />
                            <ColorPicker.Gradient />
                        </ColorPicker.Root>
                    </div>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};
