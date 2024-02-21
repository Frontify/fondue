/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Color } from '../../types/colors';
import { EXAMPLE_PALETTES } from '../ColorPicker/example-palettes';
import { ColorPickerFlyout as ColorPickerFlyoutComponent, ColorPickerFlyoutProps } from './ColorPickerFlyout';

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
