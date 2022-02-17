/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconCaretLeftDouble from "@foundation/Icon/Generated/IconCaretLeftDouble";
import IconCaretRightDouble from "@foundation/Icon/Generated/IconCaretRightDouble";
import IconLeftCaret from "@foundation/Icon/Generated/IconLeftCaret";
import IconRightCaret from "@foundation/Icon/Generated/IconRightCaret";
import { IconSize } from "@foundation/Icon/IconSize";
import { getMonth, getYear } from "date-fns";
import React, { FC } from "react";
import { default as DatepickerComponent } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import "./DatePicker.css";
import { DatePickerTrigger } from "./DatePickerTrigger";
import { months } from "./utils/constants";

export type DatePickerProps = {
    isClearable?: boolean;
    shouldCloseOnSelect?: boolean;
    onChange?: (date: Date | null) => void;
    dateFormat?: string;
};

export const DatePicker: FC<DatePickerProps> = ({
    onChange,
    isClearable,
    shouldCloseOnSelect,
    dateFormat = "MM/dd/yyyy",
}) => {
    const [startDate, setStartDate] = React.useState<Date | null>();

    const onDateChanged = (date: Date | null) => {
        setStartDate(date);
        if (onChange) {
            onChange(date);
        }
    };

    return (
        <div data-test-id="date-picker">
            <DatepickerComponent
                data-test-id="date-picker"
                calendarClassName="tw-shadow-mid tw-rounded-sm tw-border-slate-200 react-datepicker-wrap"
                selected={startDate}
                onChange={onDateChanged}
                customInput={<DatePickerTrigger isClearable={isClearable} />}
                formatWeekDay={(day) => day.slice(0, 1)}
                isClearable={isClearable}
                dateFormat={dateFormat}
                shouldCloseOnSelect={shouldCloseOnSelect}
                dayClassName={(date) => (date < new Date() ? "past-date" : "future-date")}
                renderCustomHeader={({ date, decreaseMonth, increaseMonth, increaseYear, decreaseYear }) => (
                    <div className="tw-flex tw-justify-between tw-pt-2 tw-pb-6 tw-px-3">
                        <button onClick={decreaseYear}>
                            <IconCaretLeftDouble size={IconSize.Size20} />
                        </button>
                        <button onClick={decreaseMonth}>
                            <IconLeftCaret size={IconSize.Size20} />
                        </button>
                        <p className="tw-font-sans tw-font-semibold">
                            {months[getMonth(date)]}
                            {getYear(date)}
                        </p>
                        <button onClick={increaseMonth}>
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
