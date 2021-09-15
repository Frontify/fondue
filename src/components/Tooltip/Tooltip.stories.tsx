/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Tooltip as TooltipComponent, TooltipProps } from "./Tooltip";
import { BrightHeaderVariants } from "./partials/BrightHeader";
import IconIcons from "@elements/Icon/Generated/IconIcons";

export default {
    title: "Components/Tooltip",
    component: TooltipComponent,
    args: {
        tooltip: "Your text here",
        heading: "",
        buttons: [],
    },
    argTypes: {
        brightHeader: {
            options: [
                null,
                BrightHeaderVariants.Information,
                BrightHeaderVariants.Warning,
                BrightHeaderVariants.Tip,
                BrightHeaderVariants.Note,
            ],
            control: { type: "select" },
        },
        headingIcon: {
            options: ["Nothing", "Icon"],
            mapping: {
                Nothing: null,
                Icon: <IconIcons key="1" />,
            },
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
    buttons: undefined,
};
Default.storyName = "Base Tooltip";

export const WithInfoHeader = TooltipTemplate.bind({});
WithInfoHeader.args = {
    brightHeader: BrightHeaderVariants.Information,
    tooltip: loremIpsum,
    buttons: undefined,
};
WithInfoHeader.storyName = "With Info Bright Header";

export const WithWarningHeader = TooltipTemplate.bind({});
WithWarningHeader.args = {
    brightHeader: BrightHeaderVariants.Warning,
    tooltip: loremIpsum,
    buttons: undefined,
};
WithWarningHeader.storyName = "With Warning Bright Header";

export const WithTipHeader = TooltipTemplate.bind({});
WithTipHeader.args = {
    brightHeader: BrightHeaderVariants.Tip,
    tooltip: loremIpsum,
    buttons: undefined,
};
WithTipHeader.storyName = "With Tip Bright Header";

export const WithNoteHeader = TooltipTemplate.bind({});
WithNoteHeader.args = {
    brightHeader: BrightHeaderVariants.Note,
    tooltip: loremIpsum,
    buttons: undefined,
};
WithNoteHeader.storyName = "With Note Bright Header";

export const WithButtons = TooltipTemplate.bind({});
WithButtons.args = {
    tooltip: loremIpsum,
    buttons: [
        { label: "Whatever", action: () => null },
        { label: "Hello", action: () => null },
    ],
};

export const WithHeading = TooltipTemplate.bind({});
WithHeading.args = {
    tooltip: loremIpsum,
    heading: "I'm a heading",
    headingIcon: <IconIcons />,
    buttons: undefined,
};
