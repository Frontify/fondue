/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";

import FormControl, { FormControlProps } from "./FormControl";

export default {
    title: "FormControl",
    component: FormControl,
} as Meta;

const FormControlTemplate: Story<FormControlProps> = (args) => <FormControl {...args} />;

export const Default = FormControlTemplate.bind({});

Default.args = {
    foo: "bar",
};
