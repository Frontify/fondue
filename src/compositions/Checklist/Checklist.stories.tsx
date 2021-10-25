/* (c) Copyright Frontify Ltd., all rights reserved. */

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

const CHECKBOXES = [
    {
        value: "box-1",
        label: "Checkbox label",
        tooltip: { content: "Random Tooltip" },
    },
    {
        value: "box-2",
        label: "Checkbox label",
        note: "Note about this input",
        disabled: true,
    },
    {
        value: "box-3",
        label: "Checkbox label",
    },
];

const COLUMN_CHECKBOXES = new Array(8).fill({}).map((_, index) => ({
    value: `box-${index}`,
    label: `Checkbox Nr. ${index}`,
    tooltip: { content: `Random Tooltip ${index}` },
}));

export const Checklist: Story<ChecklistProps> = (args) => {
    const [activeBoxes, setActiveBoxes] = useState<string[]>([]);

    return (
        <ChecklistComponent
            {...args}
            checkboxes={CHECKBOXES}
            activeValues={activeBoxes}
            setActiveValues={setActiveBoxes}
        />
    );
};

export const MultipleColumns: Story<ChecklistProps> = (args) => {
    const [activeBoxes, setActiveBoxes] = useState<string[]>([]);

    return (
        <ChecklistComponent
            {...args}
            checkboxes={COLUMN_CHECKBOXES}
            activeValues={activeBoxes}
            setActiveValues={setActiveBoxes}
        />
    );
};
MultipleColumns.args = {
    direction: ChecklistDirection.Vertical,
    columns: 2,
};
