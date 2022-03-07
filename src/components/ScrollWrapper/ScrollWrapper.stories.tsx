/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { ScrollWrapperProps } from "./types";
import { Story, Meta } from "@storybook/react";
import { ScrollWrapper } from "./ScrollWrapper";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/ScrollWrapper",
    component: ScrollWrapper,
} as Meta<ScrollWrapperProps>;

export const Default: Story<ScrollWrapperProps> = (args) => <ScrollWrapper {...args} />;
