/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Theme } from "@utilities/enum";
import TooltipComponent, { TooltipProps } from "./Tooltip";

export default {
    title: "Components/Tooltip",
    component: TooltipComponent,
    args: {
        tooltip: "Tooltip Content (Reactnode)",
    },
    argTypes: {
        theme: {
            options: [Theme.Light, Theme.Dark],
            control: { type: "radio" },
        },
    },
} as Meta;

export const Tooltip: Story<TooltipProps> = (args) => <TooltipComponent {...args} />;
