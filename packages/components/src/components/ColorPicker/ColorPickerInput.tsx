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
     * The active color shown in the swatch preview.
     */
    currentColor?: RgbaColor;
    /**
     * Whether the color picker panel is currently visible. Controls the caret direction indicator.
     */
    isOpen?: boolean;
    /**
     * Prevents interaction and dims the input visually.
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback fired when the user clicks the clear button. When provided, a clear button is shown.
     */
    onClear?: () => void;
    /**
     * Callback fired when the user clicks the input trigger. Use this to toggle the picker panel open.
     */
    onClick?: () => void;
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
                        <span>{t('ColorPicker_selectColor')}</span>
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
