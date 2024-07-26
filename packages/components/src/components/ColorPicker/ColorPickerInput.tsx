/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconDroplet, IconTrashBin } from '@frontify/fondue-icons';
import { type ForwardedRef, forwardRef, useId } from 'react';

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

export const ColorPickerInput = (
    { currentColor, onClear, isOpen, ...props }: ColorPickerInputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const colorNameId = useId();
    console.log(currentColor);

    return (
        <div className={styles.input} data-open-state={isOpen} {...props} ref={forwardedRef}>
            {currentColor?.red !== undefined ? (
                <div
                    aria-describedby={colorNameId}
                    className={styles.colorIndicator}
                    style={{ backgroundColor: colorToCss(currentColor) }}
                />
            ) : (
                <IconDroplet size={16} />
            )}

            <span id={colorNameId} className={styles.colorName}>
                {currentColor?.name}
            </span>
            {onClear && (
                <button type="button" aria-label="Clear color" className={styles.clear}>
                    <IconTrashBin size={16} />
                </button>
            )}
            <div>
                <IconCaretDown size={16} className={styles.caret} />
            </div>
        </div>
    );
};
ColorPickerInput.displayName = 'ColorPicker.Input';

export const ForwardedRefColorPickerInput = forwardRef<HTMLDivElement, ColorPickerInputProps>(ColorPickerInput);
