/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Theme, Style } from "@utilities/enum";
import TextInput from "../Form/TextInput/TextInput";
import FormControl, { FormControlDirection, FormControlProps, HelperPosition } from "./FormControl";

export default {
    title: "FormControl",
    component: FormControl,
    args: {
        disabled: false,
        direction: FormControlDirection.Vertical,
        label: {
            children: "Input Label",
            required: false,
            htmlFor: "input",
            theme: Theme.Light,
            tooltip: "Tooltip Text",
        },
        extra: "Extra Text or Element",
        helper: {
            text: "Helper Text (before/after) and style (Primary/Success/Error)",
            position: HelperPosition.After,
            style: Style.Primary,
        },
        children: "",
    },
    argTypes: {
        direction: {
            options: [FormControlDirection.Vertical, FormControlDirection.Horizontal],
            control: "select",
        },
        children: {
            table: { disable: true },
        },
    },
} as Meta;

const FormControlTemplate: Story<FormControlProps> = (args) => (
    <FormControl {...args}>
        <TextInput id="input" disabled={args.disabled} />
    </FormControl>
);

export const Default = FormControlTemplate.bind({});
