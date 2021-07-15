/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Theme } from "../../utilities/enums";
import FormControl, { FormControlProps } from "./FormControl";
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
        text: "Helper Text (before/after) and variant (Success/Error)",
        position: "after",
        variant: "",
    },
} as FormControlProps;

Default.argTypes = {
    direction: {
        options: ["vertical", "horizontal"],
        control: "select",
    },
    label: {
        tooltip: { type: "string" },
        theme: {
            options: [Theme.Light, Theme.Dark],
            control: { type: "radio" },
        },
    },
};
