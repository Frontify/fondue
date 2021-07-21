import { Meta, Story } from "@storybook/react";
import { Style, Theme } from "@utilities/enum";
import { useState } from "react";
import CheckboxComponent, { CheckboxProps, CheckboxSelectionState } from "./Checkbox";

export default {
    title: "Elements/Checkbox",
    component: CheckboxComponent,
    args: {
        style: Style.Primary,
        theme: Theme.Light,
        disabled: false,
        required: false,
        tooltip: "tooltip",
        label: "Label",
    },
    argTypes: {
        style: {
            options: Object.keys(Style),
            control: { type: "radio" },
        },
        theme: {
            options: Object.keys(Theme),
            control: { type: "radio" },
        },
        onChange: { action: "onChange" },
    },
} as Meta;

export const Checkbox: Story<CheckboxProps> = (args) => {
    const [selectionState, setSelectionState] = useState(CheckboxSelectionState.Unselected);
    return (
        <CheckboxComponent
            {...args}
            value={selectionState}
            onChange={(state: CheckboxSelectionState) => setSelectionState(state)}
        />
    );
};
