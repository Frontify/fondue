/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCross, IconDroplet } from '@frontify/fondue-icons';
import { type ForwardedRef, forwardRef } from 'react';

import { type CommonAriaAttrs } from '#/utilities/types';

import styles from './styles/colorInput.module.scss';
import { type RgbaColor } from './types';
import { colorToCss } from './utils';

type ColorPickerInputProps = {
    id?: string;
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
    /**
     * Event handler called when the color picker input is clicked
     */
    onClick?: () => void;
    /**
     * The test id of the color picker input
     */
    'data-test-id'?: string;
} & CommonAriaAttrs;

export const ColorPickerInput = (
    {
        id,
        currentColor,
        isOpen,
        onClear,
        onClick,
        'data-test-id': dataTestId = 'color-picker-input',
        ...props
    }: ColorPickerInputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div id={id} className={styles.root} {...props} ref={forwardedRef} data-test-id={dataTestId}>
            <button className={styles.button} onClick={onClick} type="button" data-color-input-select>
                {currentColor?.red !== undefined ? (
                    <div
                        aria-hidden
                        className={styles.colorIndicator}
                        style={{ backgroundColor: colorToCss(currentColor) }}
                    />
                ) : (
                    <>
                        <IconDroplet size={16} />
                        <span>Select Color</span>
                    </>
                )}

                <span className={styles.colorName}>{currentColor?.name}</span>
            </button>
            <div className={styles.actions}>
                {onClear && (
                    <button type="button" aria-label="Clear color" onClick={onClear} className={styles.clear}>
                        <IconCross size={16} />
                    </button>
                )}
                <div className={styles.caret} data-state={isOpen ? 'open' : 'closed'}>
                    <IconCaretDown size={16} className={styles.caret} />
                </div>
            </div>
        </div>
    );
};
ColorPickerInput.displayName = 'ColorPicker.Input';

export const ForwardedRefColorPickerInput = forwardRef<HTMLDivElement, ColorPickerInputProps>(ColorPickerInput);
