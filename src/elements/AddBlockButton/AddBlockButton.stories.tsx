/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { AddBlockButton, AddBlockButtonDirection, AddBlockButtonProps } from "./AddBlockButton";

export default {
    title: "Elements/Add Block Button",
    component: AddBlockButton,
    args: {
        title: "Add Block Button",
        orientation: AddBlockButtonDirection.Horizontal,
    },
    argTypes: {
        onClick: {
            action: "Click",
        },
        orientation: {
            options: Object.values(AddBlockButtonDirection),
            control: "radio",
        },
    },
} as Meta<AddBlockButtonProps>;

export const Template: Story<AddBlockButtonProps> = (args: AddBlockButtonProps) => <AddBlockButton {...args} />;
