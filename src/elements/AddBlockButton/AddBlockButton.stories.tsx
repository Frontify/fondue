/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Orientation } from "@utilities/enum";
import AddBlockButtonComponent, { AddBlockButtonProps } from "./AddBlockButton";

export default {
    title: "Elements/Add Block Button",
    component: AddBlockButtonComponent,
    args: {
        title: "Add Block Button",
        orientation: Orientation.Horizontal,
    },
    argTypes: {
        onClick: {
            action: "Click",
        },
        orientation: {
            options: [Orientation.Vertical, Orientation.Horizontal],
            control: "radio",
        },
    },
} as Meta<AddBlockButtonProps>;

export const AddBlockButton: Story<AddBlockButtonProps> = (args: AddBlockButtonProps) => (
    <AddBlockButtonComponent {...args} />
);
