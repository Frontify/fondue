import { Meta, Story } from "@storybook/react";
import { useEffect, useState } from "react";
import { Checkbox, CheckboxProps, Style } from "./Checkbox";

export default {
    title: "Elements/Checkbox",
    component: Template,
    argTypes: {
        style: {
            options: [Style.Default, Style.Primary],
            control: { type: "radio" },
        },
        checked: {
            options: ["checked", "unchecked", "mixed"],
            control: { type: "radio" },
        },
    },
    args: {
        style: Style.Primary,
        checked: "unchecked",
        disabled: false,
        required: false,
        value: "whatever-you'd-like",
    },
} as Meta<CheckboxProps>;

export const Template: Story<CheckboxProps> = (args: CheckboxProps) => {
    const [checked, setChecked] = useState<"checked" | "unchecked" | "mixed">(args.checked || "unchecked");
    useEffect(() => setChecked(args.checked || "unchecked"), [args.checked]);
    return (
        <Checkbox {...args} checked={checked} onChange={(checked) => setChecked(checked ? "checked" : "unchecked")} />
    );
};
