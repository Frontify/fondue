/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { Children, type ReactNode } from 'react';

import styles from './styles/customColorPicker.module.scss';
import { type Color } from './types';

export type CustomColorPickerProps = {
    children?: ReactNode;
    currentColor?: Color;
    onColorChange?: (color: Color) => void;
};

export const CustomColorPicker = ({ children, ...props }: CustomColorPickerProps) => {
    return (
        <div className={styles.root} data-picker-type="custom-color" data-test-id="custom-color-picker" {...props}>
            {Children.map(children, (child) => (
                <RadixSlot {...props}>{child}</RadixSlot>
            ))}
        </div>
    );
};
CustomColorPicker.displayName = 'ColorPicker.Wrapper';
