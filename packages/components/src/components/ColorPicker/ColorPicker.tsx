/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { Children } from 'react';
import { ColorPreview } from './ColorPreview';
import styles from './styles/colorPicker.module.scss';
import { Color, ColorPickerProps } from './types';

export const ColorPicker = ({
    currentColor,
    onSelect,
    showPreview = true,
    allowCustomColor = true,
    children,
}: ColorPickerProps) => {
    return (
        <div className={styles.root}>
            {showPreview && <ColorPreview color={currentColor} />}
            <div className="tw-p-5 tw-flex tw-flex-col tw-gap-2">
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
