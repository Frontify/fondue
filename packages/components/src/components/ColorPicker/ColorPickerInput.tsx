/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCross, IconDroplet } from '@frontify/fondue-icons';
import { type CSSProperties, type ForwardedRef, forwardRef, useId } from 'react';

import { useTranslation } from '#/hooks/useTranslation';
import { type CommonAriaAttrs } from '#/utilities/types';

import { Button } from '../Button/Button';

import styles from './styles/colorInput.module.scss';
import { type RgbaColor } from './types';
import { colorToCss, getColorWithName } from './utils';

type ColorPickerInputProps = {
    id?: string;
    /**
     * The active color in the color picker
     */
    currentColor?: RgbaColor;
    /**
     * The open state of the color picker used to determine arrow state
     */
    isOpen?: boolean;
    /**
     * Whether the color picker input is disabled
     */
    disabled?: boolean;
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
        disabled = false,
        onClear,
        onClick,
        'data-test-id': dataTestId = 'color-picker-input',
        'aria-labelledby': ariaLabelledBy,
        ...props
    }: ColorPickerInputProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
) => {
    const { t } = useTranslation();
    const valueId = useId();
    const colorName = currentColor?.name ?? (currentColor ? getColorWithName(currentColor, 'RGBA').name : '');
    const hasValue = currentColor?.red !== undefined;
    const labelledBy = ariaLabelledBy ? `${ariaLabelledBy} ${valueId}` : undefined;
    return (
        <div className={styles.root} data-test-id={dataTestId}>
            <button
                id={id}
                ref={forwardedRef}
                className={styles.button}
                {...props}
                aria-labelledby={labelledBy}
                disabled={disabled}
                onClick={onClick}
                type="button"
                data-color-input-select
            >
                {hasValue ? (
                    <div
                        aria-hidden
                        className={styles.colorIndicator}
                        style={{ '--active-color': colorToCss(currentColor) } as CSSProperties}
                    />
                ) : (
                    <>
                        <IconDroplet size={16} />
                        <span id={valueId}>{t('ColorPicker_selectColor')}</span>
                    </>
                )}

                <span id={hasValue ? valueId : undefined} className={styles.colorName}>
                    {colorName}
                </span>
            </button>
            <div className={styles.actions}>
                {hasValue && onClear && !disabled && (
                    <Button onPress={onClear} disabled={disabled} size="small" emphasis="weak" aspect="square">
                        <IconCross className={styles.clearIcon} size={16} />
                    </Button>
                )}
                <div className={styles.caret} data-state={isOpen ? 'open' : 'closed'}>
                    <IconCaretDown size={16} />
                </div>
            </div>
        </div>
    );
};
ColorPickerInput.displayName = 'ColorPicker.Input';

export const ForwardedRefColorPickerInput = forwardRef<HTMLButtonElement, ColorPickerInputProps>(ColorPickerInput);
