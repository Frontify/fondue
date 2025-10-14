/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { type Color } from '../../types/colors';
import { EXAMPLE_PALETTES } from '../ColorPicker/example-palettes';

import { ColorPickerFlyout as ColorPickerFlyoutComponent, type ColorPickerFlyoutProps } from './ColorPickerFlyout';

/**
 ### This component is deprecated, please use the `Flyout` together with the [new Color Picker component](/docs/current_components-colorpicker--documentation) instead.
 */
export default {
    title: 'Components/Color Picker/Flyout',
    component: ColorPickerFlyoutComponent,
    tags: ['autodocs'],
    args: {
        disabled: false,
        currentColor: null,
        clearable: false,
    },
    argTypes: {
        onDelete: { action: 'onDelete' },
    },
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<ColorPickerFlyoutProps>;

export const Flyout: StoryFn<ColorPickerFlyoutProps> = ({ disabled, currentColor, clearable, onDelete }) => {
    const [temporaryColor, setTemporaryColor] = useState<Color | null>(null);
    const [selectedColor, setSelectedColor] = useState<Color | null>(currentColor);

    return (
        <ColorPickerFlyoutComponent
            disabled={disabled}
            clearable={clearable}
            currentColor={temporaryColor ?? selectedColor}
            onClick={() => setSelectedColor(temporaryColor)}
            onClose={() => setTemporaryColor(null)}
            onSelect={(color) => setTemporaryColor(color)}
            palettes={EXAMPLE_PALETTES}
            onClear={() => {
                setTemporaryColor(null);
                setSelectedColor(null);
            }}
            onDelete={onDelete}
        />
    );
};
