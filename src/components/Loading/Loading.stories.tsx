/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { Loading } from "./Loading";

export default {
    title: "Components/Loading",
    component: Loading,
} as Meta;

const Template: Story = (args) => <Loading {...args} />;

export const Default = Template.bind({});
