import { TextInput } from '@components/TextInput';
import IconJohanna from '@foundation/Icon/Generated/IconJohanna';
import { merge } from '@utilities/merge';
import React, { PropsWithChildren, forwardRef } from 'react';

type DatePickerTriggerProps = PropsWithChildren<{
    placeHolder?: string;
    value?: string;
    isClearable?: boolean;
    isCalendarOpen?: boolean;
    onClick?: () => void;
}>;

export const DatePickerTrigger = forwardRef<HTMLDivElement, DatePickerTriggerProps>(
    ({ value, onClick, isClearable, placeHolder, isCalendarOpen }, ref) => (
        <div onClick={onClick} ref={ref} aria-hidden="true">
            <div
                className={merge([
                    'tw-absolute tw-top-2 tw-text-black-60 tw-right-8 tw-z-10',
                    value === '' ? 'tw-right-4' : 'tw-right-8',
                ])}
            >
                {isClearable}
                {placeHolder}
                {isCalendarOpen ? <IconJohanna /> : <IconJohanna />}
            </div>
            <TextInput decorator={<IconJohanna />} />
        </div>
    ),
);

DatePickerTrigger.displayName = 'DatePickerTrigger';
