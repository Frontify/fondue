/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { ForwardedRefColorPickerInput as ColorPickerInput } from '../ColorPickerInput';

const RED = { red: 255, green: 55, blue: 90, alpha: 1, name: '#ff375a' };

describe('ColorPicker.Input', () => {
    it('forwards the ref and the id to the button', () => {
        const ref = createRef<HTMLButtonElement>();
        render(<ColorPickerInput ref={ref} id="status-color" aria-label="Color" currentColor={RED} />);

        const button = screen.getByRole('button', { name: 'Color' });

        expect(ref.current).toBe(button);
        expect(button).toHaveAttribute('id', 'status-color');
    });

    it('adds the shown color to the name given by aria-labelledby', () => {
        render(
            <>
                <span id="color-label">Color</span>
                <ColorPickerInput aria-labelledby="color-label" currentColor={RED} />
            </>,
        );

        expect(screen.getByRole('button', { name: 'Color #ff375a' })).toBeInTheDocument();
    });

    it('adds the select color hint to the name given by aria-labelledby when there is no color', () => {
        render(
            <>
                <span id="color-label">Color</span>
                <ColorPickerInput aria-labelledby="color-label" />
            </>,
        );

        expect(screen.getByRole('button', { name: 'Color Select Color' })).toBeInTheDocument();
    });

    it('keeps the aria-label as the name when no aria-labelledby is given', () => {
        render(<ColorPickerInput aria-label="Brand color" currentColor={RED} />);

        expect(screen.getByRole('button', { name: 'Brand color' })).toBeInTheDocument();
    });
});
