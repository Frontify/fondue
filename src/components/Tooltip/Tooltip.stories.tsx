/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Tooltip as TooltipComponent, TooltipProps, BrightHeaderVariants } from "./Tooltip";

export default {
    title: "Components/Tooltip",
    component: TooltipComponent,
    args: {
        tooltip: "Your text here",
    },
    argTypes: {
        header: {
            options: [
                BrightHeaderVariants.Information,
                BrightHeaderVariants.Warning,
                BrightHeaderVariants.Tip,
                BrightHeaderVariants.Note,
            ],
            control: { type: "select" },
        },
    },
} as Meta;

export const TooltipTemplate: Story<TooltipProps> = (args: TooltipProps) => <TooltipComponent {...args} />;

export const Default = TooltipTemplate.bind({});
Default.args = { header: undefined };
Default.storyName = "Base Tooltip";

export const WithInfoHeader = TooltipTemplate.bind({});
WithInfoHeader.args = {
    header: BrightHeaderVariants.Information,
};
WithInfoHeader.storyName = "With Info Bright Header";

export const WithWarningHeader = TooltipTemplate.bind({});
WithWarningHeader.args = {
    header: BrightHeaderVariants.Warning,
};
WithWarningHeader.storyName = "With Warning Bright Header";

export const WithTipHeader = TooltipTemplate.bind({});
WithTipHeader.args = {
    header: BrightHeaderVariants.Tip,
};
WithTipHeader.storyName = "With Tip Bright Header";

export const WithNoteHeader = TooltipTemplate.bind({});
WithNoteHeader.args = {
    header: BrightHeaderVariants.Note,
};
WithNoteHeader.storyName = "With Note Bright Header";
