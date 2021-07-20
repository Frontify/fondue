/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import AddBlockButton, { AddBlockButtonProps } from "./AddBlockButton";

export default {
    title: "AddBlockButton",
    component: AddBlockButton,
    argTypes: {
        onClick: { action: "Click" },
    },
} as Meta;

const AddBlockButtonTemplate: Story<AddBlockButtonProps> = (args) => <AddBlockButton {...args} />;

export const Default = AddBlockButtonTemplate.bind({});

Default.args = {
    title: "Add Block Button",
};
