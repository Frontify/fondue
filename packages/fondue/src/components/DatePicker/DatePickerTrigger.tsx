/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCalendar, IconCaretDown, IconCaretUp } from '@frontify/fondue-icons';
import { forwardRef } from 'react';

import { TextInput } from '@components/TextInput/TextInput';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';

type DatePickerTriggerProps = {
    placeHolder?: string;
    value?: string;
    isClearable?: boolean;
    isCalendarOpen?: boolean;
    onClick?: () => void;
    validation?: Validation;
    onDateChanged?: ((date: [Date | null, Date | null] | null) => void) | ((date: Date | null) => void);
    hugWidth?: boolean;
    'aria-label': string;
};

export const DatePickerTrigger = forwardRef<HTMLDivElement, DatePickerTriggerProps>(
    (
        {
            value,
            onClick,
            isClearable,
            placeHolder,
            isCalendarOpen,
            validation = Validation.Default,
            onDateChanged,
            hugWidth = true,
            'aria-label': ariaLabel,
        },
        ref,
    ) => {
        const isWarningOrErrorValidationState = validation === Validation.Error || validation === Validation.Warning;

        const twoSlotsAwayFromRightEdge = 'tw-right-14';
        const oneSlotAwayFromRightEdge = 'tw-right-8';
        const zeroSlotsAwayFromRightEdge = 'tw-right-4';

        const carrotRightSideTWPositionClassByOffset = (slotsOffsetFromRighSide: number): string => {
            switch (slotsOffsetFromRighSide) {
                case 0:
                    return zeroSlotsAwayFromRightEdge;
                case 1:
                    return oneSlotAwayFromRightEdge;
                case 2:
                    return twoSlotsAwayFromRightEdge;
            }
            return '';
        };

        const carrotOffsetForClearButton = value && isClearable ? 1 : 0;
        const carrotOffsetForValidationErrorIcon = isWarningOrErrorValidationState ? 1 : 0;

        const carrotRightSideTWPositionClass = carrotRightSideTWPositionClassByOffset(
            carrotOffsetForClearButton + carrotOffsetForValidationErrorIcon,
        );

        return (
            <div ref={ref} className={hugWidth ? 'tw-w-auto' : 'tw-w-full'}>
                <div
                    className={merge([
                        'tw-absolute tw-top-2 tw-text-black-60 tw-z-[1]',
                        carrotRightSideTWPositionClass,
                    ])}
                >
                    {isCalendarOpen ? <IconCaretUp size={20} /> : <IconCaretDown size={20} />}
                </div>
                <div
                    className={merge([
                        'tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-z-10',
                        carrotRightSideTWPositionClass,
                    ])}
                    onClick={onClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            onClick?.();
                        }
                    }}
                    aria-label={ariaLabel}
                    data-test-id="open-close-click-zone"
                ></div>
                <TextInput
                    decorator={<IconCalendar />}
                    placeholder={placeHolder}
                    value={value}
                    clearable={isClearable}
                    onEnterPressed={onClick}
                    onClear={() => {
                        if (onDateChanged) {
                            onDateChanged(null);
                        }
                    }}
                    validation={validation}
                />
            </div>
        );
    },
);

DatePickerTrigger.displayName = 'FondueDatePickerTrigger';
