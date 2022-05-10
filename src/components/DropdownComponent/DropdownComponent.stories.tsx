/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { DropdownComponent, DropdownComponentProps } from "./DropdownComponent";

export default {
    title: "Components/DropdownComponent",
    component: DropdownComponent,
} as Meta<DropdownComponentProps>;

const Template: Story<DropdownComponentProps> = (args) => <DropdownComponent {...args} />;

export const Default = Template.bind({});

Default.args = {
    foo: "bar",
};
