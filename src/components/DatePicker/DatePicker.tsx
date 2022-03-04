/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconCaretLeftDouble from "@foundation/Icon/Generated/IconCaretLeftDouble";
import IconCaretRightDouble from "@foundation/Icon/Generated/IconCaretRightDouble";
import IconLeftCaret from "@foundation/Icon/Generated/IconLeftCaret";
import IconRightCaret from "@foundation/Icon/Generated/IconRightCaret";
import { IconSize } from "@foundation/Icon/IconSize";
import { format, getYear } from "date-fns";
import React, { FC, useState } from "react";
import DatepickerComponent from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import "./DatePicker.css";
import { DatePickerTrigger } from "./DatePickerTrigger";

export type DatePickerProps = {
    placeHolder?: string;
    isClearable?: boolean;
    shouldCloseOnSelect?: boolean;
    onChange?: (date: Date | null) => void;
    dateFormat?: string;
    value?: Date;
};

export const DatePicker: FC<DatePickerProps> = ({
    placeHolder = "Select a date",
    isClearable,
    shouldCloseOnSelect,
    onChange,
    dateFormat = "MM/dd/yyyy",
    value,
}) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const onDateChanged = (date: Date | null) => {
        if (onChange) {
            onChange(date);
        }
    };

    return (
        <div data-test-id="date-picker">
            <DatepickerComponent
                calendarClassName="tw-shadow-mid tw-rounded-sm tw-border-slate-200 react-datepicker-wrap"
                selected={value}
                onChange={onDateChanged}
                customInput={
                    <DatePickerTrigger
                        isCalendarOpen={isCalendarOpen}
                        isClearable={isClearable}
                        placeHolder={placeHolder}
                    />
                }
                formatWeekDay={(day) => day.slice(0, 1)}
                isClearable={isClearable}
                dateFormat={dateFormat}
                onCalendarClose={() => setIsCalendarOpen(false)}
                onCalendarOpen={() => setIsCalendarOpen(true)}
                shouldCloseOnSelect={shouldCloseOnSelect}
                dayClassName={(date) => (date < new Date() ? "past-date" : "future-date")}
                renderCustomHeader={({ date, decreaseMonth, increaseMonth, increaseYear, decreaseYear }) => (
                    <div className="tw-flex tw-justify-between tw-pt-2 tw-pb-6 tw-px-3">
                        <button onClick={decreaseYear}>
                            <IconCaretLeftDouble size={IconSize.Size20} />
                        </button>
                        <button onClick={decreaseMonth} className="tw-ml-4">
                            <IconLeftCaret size={IconSize.Size20} />
                        </button>
                        <p className="tw-font-sans tw-font-semibold tw-grow">
                            {format(date, "MMMM")} {getYear(date)}
                        </p>
                        <button onClick={increaseMonth} className="tw-mr-4">
                            <IconRightCaret size={IconSize.Size20} />
                        </button>
                        <button onClick={increaseYear}>
                            <IconCaretRightDouble size={IconSize.Size20} />
                        </button>
                    </div>
                )}
            />
        </div>
    );
};
