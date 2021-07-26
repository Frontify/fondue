/* (c) Copyright Frontify Ltd., all rights reserved. */

import TextInput from "@elements/TextInput/TextInput";
import { Meta, Story } from "@storybook/react";
import { Orientation, Style, Theme } from "@utilities/enum";
import FormControlComponent, { FormControlProps, HelperPosition } from "./FormControl";

export default {
    title: "Compositions/Form Control",
    component: FormControlComponent,
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
            text: "Helper Text (before/after) and variant (Primary/Success/Error)",
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

export const FormControl: Story<FormControlProps> = (args) => (
    <FormControlComponent {...args}>
        <TextInput id="input" disabled={args.disabled} />
    </FormControlComponent>
);
