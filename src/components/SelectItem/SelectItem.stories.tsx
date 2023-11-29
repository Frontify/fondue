/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from "@storybook/react";
import { SelectItem, SelectItemProps } from "./SelectItem";

export default {
    title: "Components/SelectItem",
    component: SelectItem,
    tags: ['autodocs'],
} as Meta<SelectItemProps>;

const Template: StoryFn<SelectItemProps> = (args) => <SelectItem {...args} />;

export const Default = Template.bind({});

Default.args = {
    foo: "bar",
};
