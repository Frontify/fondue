/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { PatternDesign, PatternScale } from "@foundation/Pattern";
import { FrontifyPatternProps, FrontifyPattern as FrontifyPatternComponent } from "./FrontifyPattern";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/FrontifyPattern",
    component: FrontifyPatternComponent,
    args: {
        pattern: PatternDesign.DigitalAssets,
    },
} as Meta<FrontifyPatternProps>;

const FrontifyPattern: Story<FrontifyPatternProps> = (args) => <FrontifyPatternComponent {...args} />;

export const Default = FrontifyPattern.bind({});

export const Large = FrontifyPattern.bind({});
Large.args = {
    scale: PatternScale.Large,
};
