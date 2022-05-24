/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { DatePicker, DatePickerProps } from './DatePicker';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'Components/DatePicker',
    component: DatePicker,
} as Meta<DatePickerProps>;

const Template: Story<DatePickerProps> = (args) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>();

    return <DatePicker {...args} value={selectedDate as Date} onChange={setSelectedDate} />;
};

export const Default = Template.bind({});
Default.args = {
    placeHolder: 'Select a date',
    isClearable: true,
    shouldCloseOnSelect: true,
    dateFormat: 'MM/dd/yyyy',
};

Default.storyName = 'Date Picker';
