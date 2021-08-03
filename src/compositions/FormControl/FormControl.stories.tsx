/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { FormControl, FormControlProps, HelperPosition } from "./FormControl";
import { TextInput } from "@elements/TextInput/TextInput";
import { Orientation, Style, Theme } from "@utilities/enum";

export default {
    title: "Compositions/Form Control",
    component: FormControl,
    args: {
        disabled: false,
        orientation: Orientation.Vertical,
        label: {
            children: "Input Label",
            required: false,
            htmlFor: "input",
            theme: Theme.Light,
            tooltip: "Tooltip Text",
        },
        extra: "Extra Text or Element",
        helper: {
            text: "Helper Text (before/after) and variant (Primary/Success/Danger)",
            position: HelperPosition.After,
            style: Style.Primary,
        },
        children: "",
    },
    argTypes: {
        orientation: {
            options: [Orientation.Vertical, Orientation.Horizontal],
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
