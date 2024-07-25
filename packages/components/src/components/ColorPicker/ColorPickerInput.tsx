/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconDroplet, IconTrashBin } from '@frontify/fondue-icons';
import { forwardRef } from 'react';

import styles from './styles/colorInput.module.scss';
import { type RgbaColor } from './types';
import { colorToCss } from './utils';

type ColorPickerInputProps = {
    /**
     * The active color in the color picker
     */
    currentColor?: RgbaColor;
    /**
     * The open state of the color picker used to dermine arrow state
     */
    isOpen?: boolean;
    /**
     * callback for clearing the color
     */
    onClear?: () => void;
};

export const ColorPickerInput = ({ currentColor, onClear, isOpen }: ColorPickerInputProps) => {
    return (
        <div className={styles.input} data-open-state={isOpen}>
            {currentColor ? (
                <div className={styles.colorIndicator} style={{ backgroundColor: colorToCss(currentColor) }} />
            ) : (
                <IconDroplet size={16} />
            )}

            <span className={styles.colorName}>{currentColor?.name}</span>
            {onClear && (
                <button className={styles.clear}>
                    <IconTrashBin size={16} />
                </button>
            )}
            <div>
                <IconCaretDown size={16} className={styles.caret} />
            </div>
        </div>
    );
};
ColorPickerInput.displayName = 'ColorPicker.Gradient';

export const ForwardedRefColorPickerInput = forwardRef<HTMLDivElement, ColorPickerInputProps>(ColorPickerInput);
