/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Tooltip, TooltipProps } from "./Tooltip";

export default {
    title: "Components/Tooltip",
    component: Tooltip,
    args: {
        tooltip: "Tooltip Content (Reactnode)",
    },
} as Meta;

export const Template: Story<TooltipProps> = (args: TooltipProps) => (
    <div>
        <Tooltip {...args} />
        <p>Some other text.</p>
    </div>
);
