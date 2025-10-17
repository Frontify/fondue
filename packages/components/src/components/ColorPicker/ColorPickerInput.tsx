/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCross, IconDroplet } from '@frontify/fondue-icons';
import { type CSSProperties, type ForwardedRef, forwardRef } from 'react';

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
        ...props
    }: ColorPickerInputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { t } = useTranslation();
    const colorName = currentColor?.name ?? (currentColor ? getColorWithName(currentColor, 'RGBA').name : '');
    return (
        <div id={id} className={styles.root} ref={forwardedRef} data-test-id={dataTestId}>
            <button
                className={styles.button}
                {...props}
                disabled={disabled}
                onClick={onClick}
                type="button"
                data-color-input-select
            >
                {currentColor?.red !== undefined ? (
                    <div
                        aria-hidden
                        className={styles.colorIndicator}
                        style={{ '--active-color': colorToCss(currentColor) } as CSSProperties}
                    />
                ) : (
                    <>
                        <IconDroplet size={16} />
                        <span>{t('colorPicker.selectColor')}</span>
                    </>
                )}

                <span className={styles.colorName}>{colorName}</span>
            </button>
            <div className={styles.actions}>
                {onClear && (
                    <Button onPress={onClear} disabled={disabled} size="small" emphasis="weak" aspect="square">
                        <IconCross className={styles.clearIcon} size={16} />
                    </Button>
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
