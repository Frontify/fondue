/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Theme } from "@utilities/enum";
import Tooltip, { TooltipProps } from "./Tooltip";

export default {
    title: "Tooltip",
    component: Tooltip,
} as Meta;

const TooltipTemplate: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const Default = TooltipTemplate.bind({});

Default.args = {
    tooltip: "Tooltip Content (Reactnode)",
};

Default.argTypes = {
    theme: {
        options: [Theme.Light, Theme.Dark],
        control: { type: "radio" },
    },
};
