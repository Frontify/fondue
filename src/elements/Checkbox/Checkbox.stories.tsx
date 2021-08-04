import { Meta, Story } from "@storybook/react";
import { useEffect, useState } from "react";
import { Checkbox, CheckboxProps, CheckboxState, CheckboxStyle } from "./Checkbox";

export default {
    title: "Elements/Checkbox",
    argTypes: {
        style: {
            options: Object.values(CheckboxStyle),
            control: { type: "radio" },
        },
        checked: {
            options: Object.values(CheckboxState),
            control: { type: "radio" },
        },
        onChange: {
            table: { disable: true },
            action: "Change",
        },
    },
} as Meta<CheckboxProps>;

const Template: Story<CheckboxProps> = (args: CheckboxProps) => {
    const [checked, setChecked] = useState<CheckboxState>(args.checked || CheckboxState.Unchecked);
    useEffect(() => setChecked(args.checked || CheckboxState.Unchecked), [args.checked]);

    return (
        <Checkbox
            {...args}
            checked={checked}
            onChange={(isChecked) => {
                setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked);
                args.onChange && args.onChange(isChecked);
            }}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    style: CheckboxStyle.Primary,
    checked: CheckboxState.Unchecked,
    disabled: false,
    required: false,
    value: "whatever-you'd-like",
    label: "Checkbox label",
    note: "Note about this input",
    tooltip: "Some random Tooltip",
};
