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
        brightHeader: {
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

const loremIpsum = "Cupcake ipsum dolor sit amet ice cream.";

export const TooltipTemplate: Story<TooltipProps> = (args: TooltipProps) => <TooltipComponent {...args} />;

export const Default = TooltipTemplate.bind({});
Default.args = {
    brightHeader: undefined,
    tooltip: loremIpsum,
};
Default.storyName = "Base Tooltip";

export const WithInfoHeader = TooltipTemplate.bind({});
WithInfoHeader.args = {
    brightHeader: BrightHeaderVariants.Information,
    tooltip: loremIpsum,
};
WithInfoHeader.storyName = "With Info Bright Header";

export const WithWarningHeader = TooltipTemplate.bind({});
WithWarningHeader.args = {
    brightHeader: BrightHeaderVariants.Warning,
    tooltip: loremIpsum,
};
WithWarningHeader.storyName = "With Warning Bright Header";

export const WithTipHeader = TooltipTemplate.bind({});
WithTipHeader.args = {
    brightHeader: BrightHeaderVariants.Tip,
    tooltip: loremIpsum,
};
WithTipHeader.storyName = "With Tip Bright Header";

export const WithNoteHeader = TooltipTemplate.bind({});
WithNoteHeader.args = {
    brightHeader: BrightHeaderVariants.Note,
    tooltip: loremIpsum,
};
WithNoteHeader.storyName = "With Note Bright Header";
