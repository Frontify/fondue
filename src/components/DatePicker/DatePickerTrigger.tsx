/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput } from '@components/TextInput';
import IconCalendar from '@foundation/Icon/Generated/IconCalendar';
import { IconCaretDown, IconCaretUp, IconSize } from '@foundation/Icon/index';
import { merge } from '@utilities/merge';
import React, { PropsWithChildren, forwardRef } from 'react';

type DatePickerTriggerProps = PropsWithChildren<{
    placeHolder?: string;
    value?: string;
    isClearable?: boolean;
    isCalendarOpen?: boolean;
    onClick?: () => void;
    onDateChanged?: (date: Date | null) => void;
}>;

export const DatePickerTrigger = forwardRef<HTMLDivElement, DatePickerTriggerProps>(
    ({ value, onClick, isClearable, placeHolder, isCalendarOpen, onDateChanged }, ref) => {
        const handleClear = () => {
            onDateChanged && onDateChanged(null);
        };

        return (
            <div onClick={onClick} ref={ref} aria-hidden="true">
                <div
                    className={merge([
                        'tw-absolute tw-top-2 tw-text-black-60 tw-z-10',
                        value === '' || !isClearable ? 'tw-right-4' : 'tw-right-8',
                    ])}
                >
                    {isCalendarOpen ? <IconCaretUp size={IconSize.Size20} /> : <IconCaretDown size={IconSize.Size20} />}
                </div>
                <TextInput
                    decorator={<IconCalendar />}
                    placeholder={placeHolder}
                    value={value}
                    clearable={isClearable}
                    onEnterPressed={onClick}
                    onClear={handleClear}
                />
            </div>
        );
    },
);

DatePickerTrigger.displayName = 'DatePickerTrigger';
