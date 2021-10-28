/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { Link, LinkProps } from "./Link";

export default {
    title: "Components/Link",
    component: Link,
} as Meta<LinkProps>;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});

Default.args = {
    foo: "bar",
    href: "https://example.com",
};
