import { TextInput } from "@components/TextInput";
import IconCalendar from "@foundation/Icon/Generated/IconCalendar";
import React from "react";

type DatePickerTriggerProps = {
    value?: string;
    isClearable?: boolean;
    onClick?: () => void;
};

// eslint-disable-next-line react/display-name
export const DatePickerTrigger = React.forwardRef<HTMLDivElement, React.PropsWithChildren<DatePickerTriggerProps>>(
    (props, ref) => (
        <div onClick={props.onClick} ref={ref} aria-hidden="true">
            <TextInput
                data-test-id="text-input"
                decorator={<IconCalendar />}
                placeholder="Select a date"
                value={props.value}
                clearable={props.isClearable}
                {...props}
            />
        </div>
    ),
);
