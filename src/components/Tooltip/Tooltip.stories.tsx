/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Tooltip as TooltipComponent, TooltipProps } from "./Tooltip";

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
