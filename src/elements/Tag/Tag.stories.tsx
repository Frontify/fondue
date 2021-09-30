/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { Tag, TagProps } from "./Tag";

export default {
    title: "Elements/Tag",
    component: Tag,
    args: {
        label: "Label",
    },
} as Meta<TagProps>;

const Template: Story<TagProps> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {};
