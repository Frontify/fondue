/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { DatePicker, DatePickerProps } from "./DatePicker";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/DatePicker",
    component: DatePicker,
} as Meta<DatePickerProps>;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
    isClearable: true,
    shouldCloseOnSelect: true,
    dateFormat: "MM/dd/yyyy",
};

Default.storyName = "Date Picker";
