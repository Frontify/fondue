import { Meta, Story } from "@storybook/react";
import { Style } from "@utilities/enum";
import { useEffect, useState } from "react";
import { Checkbox, CheckboxProps, CheckboxSelectionState } from "./Checkbox";

export default {
    title: "Elements/Checkbox",
    component: Checkbox,
    args: {
        style: Style.Primary,
        value: CheckboxSelectionState.Unselected,
        disabled: false,
        required: false,
        tooltip: "tooltip",
        label: "Label",
    },
    argTypes: {
        variant: {
            options: [Style.Primary, Style.Secondary],
            control: { type: "radio" },
        },
        value: {
            options: [
                CheckboxSelectionState.Unselected,
                CheckboxSelectionState.Indeterminate,
                CheckboxSelectionState.Selected,
            ],
            control: { type: "radio" },
        },
        onChange: { action: "onChange" },
    },
} as Meta<CheckboxProps>;

export const Template: Story<CheckboxProps> = (args: CheckboxProps) => {
    const [selectionState, setSelectionState] = useState(args.value);
    useEffect(() => setSelectionState(args.value), [args.value]);

    return (
        <Checkbox
            {...args}
            value={selectionState}
            onChange={(state: CheckboxSelectionState) => setSelectionState(state)}
        />
    );
};
