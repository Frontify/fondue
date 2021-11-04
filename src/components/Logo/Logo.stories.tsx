/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { Logo, LogoProps } from "./Logo";

export default {
    title: "Components/Logo",
    component: Logo,
} as Meta<LogoProps>;

const Template: Story<LogoProps> = (args) => <Logo {...args} />;

export const Default = Template.bind({});

Default.args = {
    foo: "bar",
};
