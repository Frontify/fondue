/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ColorPicker } from '../ColorPicker';
import { type RgbaColor } from '../types';

const HEX_FIELD_NAME = 'Hex color value';
const ORANGE = { red: 255, green: 170, blue: 0, alpha: 0.8 };
const BLUE = { red: 0, green: 0, blue: 255, alpha: 0.8 };

type ControlledColorPickerProps = {
    initialColor: RgbaColor;
};

const ControlledColorPicker = ({ initialColor }: ControlledColorPickerProps) => {
    const [color, setColor] = useState(initialColor);

    return (
        <ColorPicker.Root defaultFormat="HEX" currentColor={color} onColorChange={setColor}>
            <ColorPicker.Values />
        </ColorPicker.Root>
    );
};

describe('ColorPicker.Values', () => {
    it('reports a typed valid hex colour with the current alpha, without a blur', async () => {
        const onColorChange = vi.fn();
        render(
            <ColorPicker.Root defaultFormat="HEX" currentColor={ORANGE} onColorChange={onColorChange}>
                <ColorPicker.Values />
            </ColorPicker.Root>,
        );
        const hexField = screen.getByRole('textbox', { name: HEX_FIELD_NAME });

        await userEvent.clear(hexField);
        await userEvent.type(hexField, 'aa00cc');

        expect(onColorChange).toHaveBeenLastCalledWith({
            red: 170,
            green: 0,
            blue: 204,
            alpha: 0.8,
            name: '#aa00cc 80%',
        });
    });

    it('reports nothing for a typed invalid hex colour', async () => {
        const onColorChange = vi.fn();
        render(
            <ColorPicker.Root defaultFormat="HEX" currentColor={ORANGE} onColorChange={onColorChange}>
                <ColorPicker.Values />
            </ColorPicker.Root>,
        );
        const hexField = screen.getByRole('textbox', { name: HEX_FIELD_NAME });

        await userEvent.clear(hexField);
        await userEvent.type(hexField, 'zz');

        expect(onColorChange).not.toHaveBeenCalled();
    });

    it('keeps a typed short hex colour as typed while the parent feeds the colour back', async () => {
        render(<ControlledColorPicker initialColor={ORANGE} />);
        const hexField = screen.getByRole('textbox', { name: HEX_FIELD_NAME });

        await userEvent.clear(hexField);
        await userEvent.type(hexField, 'a0c');

        expect(hexField).toHaveValue('a0c');
    });

    it('replaces the field text when the colour is set from outside', () => {
        const { rerender } = render(
            <ColorPicker.Root defaultFormat="HEX" currentColor={ORANGE}>
                <ColorPicker.Values />
            </ColorPicker.Root>,
        );

        rerender(
            <ColorPicker.Root defaultFormat="HEX" currentColor={BLUE}>
                <ColorPicker.Values />
            </ColorPicker.Root>,
        );

        expect(screen.getByRole('textbox', { name: HEX_FIELD_NAME })).toHaveValue('0000ff');
    });
});
