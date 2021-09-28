/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { Checklist as ChecklistComponent, ChecklistDirection, ChecklistProps } from "./Checklist";

export default {
    title: "Compositions/Checklist",
    component: ChecklistComponent,
    argTypes: {
        direction: {
            options: [ChecklistDirection.Horizontal, ChecklistDirection.Vertical],
            control: { type: "radio" },
        },
    },
    args: {
        direction: ChecklistDirection.Horizontal,
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
                label="Checkbox label"
                tooltip={{ content: "Random Tooltip" }}
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
