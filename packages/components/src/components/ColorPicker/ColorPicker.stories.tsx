/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { Flyout } from '../Flyout/Flyout';

import { ColorGradientInput } from './ColorGradientInput';
import { ColorPicker, ColorPickerRoot } from './ColorPicker';
import { ColorValueInput } from './ColorValueInput';

type Story = StoryObj<typeof ColorPickerRoot>;
const meta: Meta<typeof ColorPickerRoot> = {
    component: ColorPickerRoot,
    subcomponents: {
        'ColorPicker.Values': ColorValueInput,
        'ColorPicker.Gradient': ColorGradientInput,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
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
            <ColorPicker.Root defaultFormat="HEX" currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Values />
                <ColorPicker.Gradient />
            </ColorPicker.Root>
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
        const [savedColor, setSavedColor] = useState(args.currentColor);
        const [currentColor, setCurrentColor] = useState(args.currentColor);
        const [currentFormat, setCurrentFormat] = useState(args.currentFormat);
        const [isOpen, setIsOpen] = useState(true);
        return (
            <Flyout.Root open={isOpen} onOpenChange={setIsOpen}>
                <Flyout.Trigger>
                    <ColorPicker.Input
                        aria-label="Color Picker"
                        currentColor={currentColor}
                        onClear={() => {
                            setCurrentColor(undefined);
                        }}
                    />
                </Flyout.Trigger>
                <Flyout.Content maxWidth="600px">
                    <Flyout.Body>
                        <div className="tw-p-2 md:tw-w-[450px]">
                            <ColorPicker.Root
                                currentFormat={currentFormat}
                                currentColor={currentColor}
                                onColorChange={setCurrentColor}
                                onFormatChange={setCurrentFormat}
                            >
                                <ColorPicker.Values />
                                <ColorPicker.Gradient />
                            </ColorPicker.Root>
                        </div>
                    </Flyout.Body>
                    <Flyout.Footer>
                        <Button
                            emphasis="default"
                            onPress={() => {
                                setIsOpen(false);
                                setCurrentColor(savedColor);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={() => {
                                setIsOpen(false);
                                setSavedColor(currentColor);
                            }}
                        >
                            Save
                        </Button>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};
