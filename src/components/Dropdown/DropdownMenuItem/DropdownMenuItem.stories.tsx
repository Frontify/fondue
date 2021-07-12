/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";

import DropdownMenuItem, { DropdownMenuItemProps } from "./DropdownMenuItem";

export default {
    title: "DropdownMenuItem",
    component: DropdownMenuItem,
} as Meta;

const DropdownMenuItemTemplate: Story<DropdownMenuItemProps> = (args) => <DropdownMenuItem {...args} />;

export const Default = DropdownMenuItemTemplate.bind({});

Default.args = {
    foo: "bar",
};
