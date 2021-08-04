/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxState, CheckboxStyle } from "@elements/Checkbox/Checkbox";
import { Story, Meta } from "@storybook/react";

import { Checklist, ChecklistProps, Direction } from "./Checklist";

export default {
    title: "Components/Checklist",
    component: Checklist,
    argTypes: {
        direction: {
            options: [Direction.Horizontal, Direction.Vertical],
            control: { type: "radio" },
        },
    },
} as Meta<ChecklistProps>;

const Template: Story<ChecklistProps> = (args) => (
    <Checklist {...args}>
        <Checkbox checked={CheckboxState.Unchecked} style={CheckboxStyle.Primary} label="Checkbox label" />
        <Checkbox checked={CheckboxState.Checked} label="Checkbox label" note="Note about this input" disabled />
        <Checkbox checked={CheckboxState.Mixed} label="Checkbox label" />
    </Checklist>
);

export const Default = Template.bind({});

Default.args = {
    direction: Direction.Horizontal,
};
