/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { Children, useState } from 'react';

import { SegmentedControl } from '../SegmentedControl/SegmentedControl';

import { ColorPreview } from './ColorPreview';
import styles from './styles/colorPicker.module.scss';
import { type ColorPickerProps } from './types';

type PickerType = 'brand' | 'custom';

export const ColorPicker = ({ showPreview = true, children, ...props }: ColorPickerProps) => {
    const [activePicker, setActivePicker] = useState<PickerType>('custom');

    return (
        <div className={styles.root}>
            {showPreview && <ColorPreview color={props.currentColor} />}
            <div className={styles.pickerSwitcher}>
                <SegmentedControl.Root
                    defaultValue="custom"
                    value={activePicker}
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
                {Children.map(children, (child) => (
                    <RadixSlot {...props}>{child}</RadixSlot>
                ))}
            </div>
        </div>
    );
};
ColorPicker.displayName = 'ColorPicker.Root';
