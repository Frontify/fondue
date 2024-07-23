/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { Children, useState } from 'react';

import { SegmentedControl } from '../SegmentedControl/SegmentedControl';

import { ColorPreview } from './ColorPreview';
import styles from './styles/colorPicker.module.scss';
import { type Color, type ColorPickerProps } from './types';

type PickerType = 'brand' | 'custom';

export const ColorPicker = ({
    currentColor,
    onSelect,
    showPreview = true,
    allowCustomColor = true,
    children,
}: ColorPickerProps) => {
    const [activePicker, setActivePicker] = useState<PickerType>('brand');

    return (
        <div className={styles.root}>
            {showPreview && <ColorPreview color={currentColor} />}
            <div className={styles.pickerSwitcher}>
                <SegmentedControl.Root
                    defaultValue="brand"
                    onValueChange={(value) => setActivePicker(value as PickerType)}
                >
                    <SegmentedControl.Item value="brand" aria-label="Brand">
                        Brand
                    </SegmentedControl.Item>

                    <SegmentedControl.Item value="custom" aria-label="Custom">
                        Custom
                    </SegmentedControl.Item>
                </SegmentedControl.Root>
            </div>
            <div className={styles.pickers} data-active-picker={activePicker}>
                {Children.map(children, (child, index) => (
                    <RadixSlot
                        key={index}
                        data-test="tttt"
                        currentColor={currentColor}
                        onColorSelected={(color: Color) => {
                            onSelect(color);
                        }}
                    >
                        {child}
                    </RadixSlot>
                ))}
            </div>
        </div>
    );
};
ColorPicker.displayName = 'ColorPicker.Root';
