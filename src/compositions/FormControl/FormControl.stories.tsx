/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { FormControl, FormControlDirection, FormControlProps, HelperPosition, HelperTextStyle } from "./FormControl";
import { TextInput } from "@elements/TextInput/TextInput";

export default {
    title: "Compositions/Form Control",
    component: FormControl,
    args: {
        disabled: false,
        direction: FormControlDirection.Vertical,
        label: {
            children: "Input Label",
            required: false,
            htmlFor: "input",
            tooltip: "Tooltip Text",
        },
        extra: "Extra Text or Element",
        helper: {
            text: "Helper Text (before/after) and variant (Primary/Success/Danger)",
            position: HelperPosition.After,
            style: HelperTextStyle.Primary,
        },
        children: "",
    },
    argTypes: {
        orientation: {
            options: Object.values(FormControlDirection),
            control: "select",
        },
        children: {
            table: { disable: true },
        },
    },
} as Meta<FormControlProps>;

export const Template: Story<FormControlProps> = (args) => (
    <FormControl {...args}>
        <TextInput id="input" disabled={args.disabled} />
    </FormControl>
);
