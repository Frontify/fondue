/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Checkbox, CheckboxState, CheckboxStyle } from "@elements/Checkbox/Checkbox";
import { Meta, Story } from "@storybook/react";
import { Checklist as ChecklistComponent, ChecklistProps, Direction } from "./Checklist";

export default {
    title: "Components/Checklist",
    component: ChecklistComponent,
    argTypes: {
        direction: {
            options: [Direction.Horizontal, Direction.Vertical],
            control: { type: "radio" },
        },
    },
    args: {
        direction: Direction.Horizontal,
    },
} as Meta<ChecklistProps>;

export const Checklist: Story<ChecklistProps> = (args) => {
    const [checked, setChecked] = useState<CheckboxState[]>([
        CheckboxState.Unchecked,
        CheckboxState.Checked,
        CheckboxState.Mixed,
    ]);

    const updateCheckState = (index: number) => (isChecked: boolean) => {
        checked[index] = isChecked ? CheckboxState.Checked : CheckboxState.Unchecked;
        setChecked([...checked]);
    };

    return (
        <ChecklistComponent {...args}>
            <Checkbox
                state={checked[0]}
                onChange={updateCheckState(0)}
                style={CheckboxStyle.Primary}
                label="Checkbox label"
                tooltip="Random Tooltip"
            />
            <Checkbox
                state={checked[1]}
                onChange={updateCheckState(1)}
                label="Checkbox label"
                note="Note about this input"
                disabled
            />
            <Checkbox state={checked[2]} onChange={updateCheckState(2)} label="Checkbox label" />
        </ChecklistComponent>
    );
};
