/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import AddBlockButton, { AddBlockButtonProps, Orientation } from "./AddBlockButton";

export default {
    title: "AddBlockButton",
    component: AddBlockButton,
    argTypes: {
        onClick: { action: "Click" },
        orientation: { options: [Orientation.Vertical, Orientation.Horizontal], control: "radio" },
    },
} as Meta;

const AddBlockButtonTemplate: Story<AddBlockButtonProps> = (args) => <AddBlockButton {...args} />;

export const Default = AddBlockButtonTemplate.bind({});

Default.args = {
    title: "Add Block Button",
    orientation: Orientation.Horizontal,
};
