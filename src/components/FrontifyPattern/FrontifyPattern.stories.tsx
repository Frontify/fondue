/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { FrontifyPattern as FrontifyPatternComponent, FrontifyPatternProps, PatternScale } from "./FrontifyPattern";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Foundation/FrontifyPattern",
    component: FrontifyPatternComponent,
} as Meta<FrontifyPatternProps>;

const Template: Story<FrontifyPatternProps> = (args) => <FrontifyPatternComponent {...args} />;

export const Large = Template.bind({});
Large.args = {
    scale: PatternScale.Large,
};
