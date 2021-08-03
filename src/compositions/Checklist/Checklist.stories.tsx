/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox } from "@elements/Checkbox/Checkbox";
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
        <Checkbox label="Yolo" />
    </Checklist>
);

export const Default = Template.bind({});

Default.args = {
    direction: Direction.Horizontal,
};
