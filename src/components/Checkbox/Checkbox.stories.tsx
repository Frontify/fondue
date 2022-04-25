/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { IconAttentionFilled, IconInfo, IconQuestion } from "@foundation/Icon/Generated";
import { Checkbox as CheckboxComponent, CheckboxProps, CheckboxState } from "./Checkbox";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Checkbox",
    argTypes: {
        state: {
            options: Object.values(CheckboxState),
            control: { type: "radio" },
        },
        onChange: {
            table: { disable: true },
            action: "Change",
        },
    },
    args: {
        state: CheckboxState.Unchecked,
        disabled: false,
        required: false,
        value: "whatever-you'd-like",
        label: "Checkbox label",
        note: "Note about this input",
        tooltip: {
            content: "Lorem ipsum dolor sit amet.",
        },
    },
} as Meta<CheckboxProps>;

export const Checkbox: Story<CheckboxProps> = (args: CheckboxProps) => {
    const [checked, setChecked] = useState<CheckboxState>(args.state || CheckboxState.Unchecked);
    useEffect(() => setChecked(args.state || CheckboxState.Unchecked), [args.state]);

    return (
        <CheckboxComponent
            {...args}
            state={checked}
            onChange={(isChecked) => {
                setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked);
                args.onChange && args.onChange(isChecked);
            }}
        />
    );
};

export const CheckboxWithMultipleTooltips = Checkbox.bind({});

CheckboxWithMultipleTooltips.args = {
    ...Checkbox.args,
    tooltip: [
        { triggerIcon: <IconInfo />, triggerStyle: "Danger", content: "Tooltip 1" },
        { triggerIcon: <IconQuestion />, triggerStyle: "Primary", content: "Tooltip 2" },
        { triggerIcon: <IconAttentionFilled />, triggerStyle: "Warning", content: "Tooltip 3" },
    ],
};
