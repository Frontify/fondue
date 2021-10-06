/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { Checklist as ChecklistComponent, ChecklistDirection, ChecklistProps } from "./Checklist";

export default {
    title: "Compositions/Checklist",
    component: ChecklistComponent,
    argTypes: {
        columns: {
            options: [1, 2, 3, 4],
            control: { type: "select" },
        },
        direction: {
            options: [ChecklistDirection.Horizontal, ChecklistDirection.Vertical],
            defaultValue: ChecklistDirection.Horizontal,
            control: { type: "radio" },
        },
    },
} as Meta<ChecklistProps>;

export const Checklist: Story<ChecklistProps> = (args) => {
    const [checked, setChecked] = useState<CheckboxState[]>([
        CheckboxState.Unchecked,
        CheckboxState.Checked,
        CheckboxState.Mixed,
    ]);

    const updateCheckState = (index: number, isChecked: boolean) => {
        checked[index] = isChecked ? CheckboxState.Checked : CheckboxState.Unchecked;
        setChecked([...checked]);
    };

    return (
        <ChecklistComponent {...args}>
            <Checkbox
                state={checked[0]}
                onChange={(value) => updateCheckState(0, value)}
                label="Checkbox label"
                tooltip={{ content: "Random Tooltip" }}
            />
            <Checkbox
                state={checked[1]}
                onChange={(value) => updateCheckState(1, value)}
                label="Checkbox label"
                note="Note about this input"
                disabled
            />
            <Checkbox state={checked[2]} onChange={(value) => updateCheckState(2, value)} label="Checkbox label" />
        </ChecklistComponent>
    );
};

export const MultipleColumns: Story<ChecklistProps> = (args) => {
    const [checked, setChecked] = useState<CheckboxState[]>(new Array(8).fill(CheckboxState.Unchecked));

    const updateCheckState = (index: number, isChecked: boolean) => {
        checked[index] = isChecked ? CheckboxState.Checked : CheckboxState.Unchecked;
        setChecked([...checked]);
    };

    return (
        <ChecklistComponent {...args}>
            {checked.map((_, index) => (
                <Checkbox
                    key={index}
                    state={checked[index]}
                    onChange={(value) => updateCheckState(index, value)}
                    label={`Checkbox label n°${index + 1}`}
                />
            ))}
        </ChecklistComponent>
    );
};
MultipleColumns.args = {
    direction: ChecklistDirection.Vertical,
    columns: 2,
};
