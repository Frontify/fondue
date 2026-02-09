/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCross } from '@frontify/fondue-icons';
import { type ForwardedRef, forwardRef } from 'react';

import { type CommonAriaAttrs } from '#/utilities/types';

import { Button } from '../Button/Button';

import styles from './styles/datePickerInput.module.scss';

type DatePickerInputProps = {
    id?: string;
    /**
     * The active date in the date picker
     */
    currentDate?: Date;
    /**
     * The open state of the date picker used to determine arrow state
     */
    isOpen?: boolean;
    /**
     * Whether the date picker input is disabled
     */
    disabled?: boolean;
    /**
     * callback for clearing the date
     */
    onClear?: () => void;
    /**
     * Event handler called when the date picker input is clicked
     */
    onClick?: () => void;
    /**
     * The test id of the date picker input
     */
    'data-test-id'?: string;
} & CommonAriaAttrs;

export const DatePickerInput = (
    {
        id,
        currentDate,
        isOpen,
        disabled = false,
        onClear,
        onClick,
        'data-test-id': dataTestId = 'color-picker-input',
        ...props
    }: DatePickerInputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
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
                <span className={styles.dateName}>{currentDate?.toLocaleDateString()}</span>
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

DatePickerInput.displayName = 'ColorPicker.Input';
export const ForwardedRefDatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(DatePickerInput);
