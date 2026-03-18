/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCalendar, IconCaretDown, IconCross } from '@frontify/fondue-icons';
import { type ForwardedRef, forwardRef, useMemo } from 'react';

import { useTranslation } from '#/hooks/useTranslation';
import { type CommonAriaAttrs } from '#/utilities/types';

import { Button } from '../Button/Button';

import { getDateDisplayString } from './helpers/dateDisplayFormatter';
import styles from './styles/datePickerInput.module.scss';
import { type DatePickerDateRange, type DatePickerDate } from './types';

type DatePickerInputProps = {
    id?: string;
    /**
     * The active date or date range in the date picker
     */
    selected?: DatePickerDateRange | DatePickerDate;
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
        selected,
        isOpen,
        disabled = false,
        onClear,
        onClick,
        'data-test-id': dataTestId = 'date-picker-input',
        ...props
    }: DatePickerInputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { t } = useTranslation();
    const displayString = useMemo(() => getDateDisplayString(selected), [selected]);
    return (
        <div id={id} className={styles.root} ref={forwardedRef} data-test-id={dataTestId}>
            <button
                className={styles.button}
                {...props}
                disabled={disabled}
                onClick={onClick}
                type="button"
                data-date-input-select
            >
                <IconCalendar className={styles.icon} size={16} />
                {displayString ? (
                    <span className={styles.dateName}>{displayString}</span>
                ) : (
                    <span>{t('DatePicker_selectDate')}</span>
                )}
            </button>
            <div className={styles.actions}>
                {onClear && (
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

DatePickerInput.displayName = 'DatePicker.Input';
export const ForwardedRefDatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(DatePickerInput);
