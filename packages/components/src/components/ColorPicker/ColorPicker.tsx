/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { Children, forwardRef } from 'react';

import { ForwardedRefColorGradientInput } from './ColorGradientInput';
import { ForwardedRefColorValueInput } from './ColorValueInput';
import styles from './styles/customColorPicker.module.scss';
import { type ColorPickerProps } from './types';

export const ColorPickerRoot = ({ children, ...props }: ColorPickerProps) => {
    return (
        <div className={styles.root} data-picker-type="custom-color" data-test-id="custom-color-picker">
            {Children.map(children, (child) => (
                <RadixSlot {...props}>{child}</RadixSlot>
            ))}
        </div>
    );
};
ColorPickerRoot.displayName = 'ColorPicker';

export const ForwardedRefColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(ColorPickerRoot);

export const ColorPicker = {
    Root: ForwardedRefColorPicker,
    Values: ForwardedRefColorValueInput,
    Gradient: ForwardedRefColorGradientInput,
};

ColorPicker.Root.displayName = 'ColorPicker.Root';
ColorPicker.Values.displayName = 'ColorPicker.Values';
ColorPicker.Gradient.displayName = 'ColorPicker.Gradient';
