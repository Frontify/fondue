/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { TooltipIcon, TooltipIconProps } from "./TooltipIcon";
import { IconSize } from "@foundation/Icon/IconSize";
import { IconAttentionFilled } from "@foundation/Icon/Generated";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/TooltipIcon",
    component: TooltipIcon,
    argTypes: {
        triggerStyle: {
            options: ["Danger", "Warning", "Primary"],
            control: { type: "select" },
        },
    },
    args: {
        tooltip: {
            content: "Lorem ipsum dolor sit amet.",
        },
        triggerStyle: "Primary",
    },
} as Meta<TooltipIconProps>;

const TooltipIconTemplate: Story<TooltipIconProps> = (args: TooltipIconProps) => {
    return <TooltipIcon {...args} />;
};

export const WithDefaultIconSize = TooltipIconTemplate.bind({});

export const WithCustomIconSize = TooltipIconTemplate.bind({});
WithCustomIconSize.args = {
    iconSize: IconSize.Size20,
};

export const WithCustomIcon = TooltipIconTemplate.bind({});
WithCustomIcon.args = {
    triggerIcon: <IconAttentionFilled />,
};
