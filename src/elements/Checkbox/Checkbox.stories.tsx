import { Meta, Story } from "@storybook/react";
import { Variant } from "@utilities/enum";
import { useEffect, useState } from "react";
import CheckboxComponent, { CheckboxProps, CheckboxSelectionState } from "./Checkbox";

export default {
    title: "Elements/Checkbox",
    component: CheckboxComponent,
    args: {
        variant: Variant.Primary,
        value: CheckboxSelectionState.Unselected,
        disabled: false,
        required: false,
        tooltip: "tooltip",
        label: "Label",
    },
    argTypes: {
        variant: {
            options: [Variant.Primary, Variant.Secondary],
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

export const Checkbox: Story<CheckboxProps> = (args) => {
    const [selectionState, setSelectionState] = useState(args.value);
    useEffect(() => {
        setSelectionState(args.value);
    }, [args.value]);
    return (
        <CheckboxComponent
            {...args}
            value={selectionState}
            onChange={(state: CheckboxSelectionState) => setSelectionState(state)}
        />
    );
};
