/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import TooltipComponent, { TooltipProps } from "./Tooltip";

export default {
    title: "Components/Tooltip",
    component: TooltipComponent,
    args: {
        tooltip: "Tooltip Content (Reactnode)",
    },
} as Meta;

export const Tooltip: Story<TooltipProps> = (args: TooltipProps) => (
    <div>
        <TooltipComponent {...args} />
        <p>Some other text.</p>
    </div>
);
