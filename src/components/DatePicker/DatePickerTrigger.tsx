import { TextInput } from "@components/TextInput";
import IconCalendar from "@foundation/Icon/Generated/IconCalendar";
import React, { forwardRef, PropsWithChildren } from "react";

type DatePickerTriggerProps = PropsWithChildren<{
    placeHolder?: string;
    value?: string;
    isClearable?: boolean;
    onClick?: () => void;
}>;

export const DatePickerTrigger = forwardRef<HTMLDivElement, DatePickerTriggerProps>(
    ({ value, onClick, isClearable, placeHolder }, ref) => (
        <div onClick={onClick} ref={ref} aria-hidden="true">
            <TextInput decorator={<IconCalendar />} placeholder={placeHolder} value={value} clearable={isClearable} />
        </div>
    ),
);

DatePickerTrigger.displayName = "DatePickerTrigger";
