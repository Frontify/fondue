/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Theme } from "@utilities/enum";
import FormControl, { FormControlProps, HelperVariant } from "./FormControl";
import TextInput from "../Form/TextInput/TextInput";

export default {
    title: "FormControl",
    component: FormControl,
} as Meta;

const FormControlTemplate: Story<FormControlProps> = (args) => (
    <FormControl {...args}>
        <TextInput id="input" disabled={args.disabled} />
    </FormControl>
);

export const Default = FormControlTemplate.bind({});

Default.args = {
    disabled: false,
    direction: "vertical",
    label: {
        children: "Input Label",
        required: false,
        htmlFor: "input",
        theme: Theme.Light,
        tooltip: "Tooltip Text",
    },
    extra: "Extra Text or Element",
    helper: {
        text: "Helper Text (before/after) and variant (Default/Success/Error)",
        position: "after",
        variant: HelperVariant.Default,
    },
    children: "",
} as FormControlProps;

Default.argTypes = {
    direction: {
        options: ["vertical", "horizontal"],
        control: "select",
    },
    children: {
        table: {
            disable: true,
        },
    },
};
