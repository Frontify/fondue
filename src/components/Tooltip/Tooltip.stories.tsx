/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Tooltip as TooltipComponent, TooltipProps } from "./Tooltip";
import { BrightHeaderStyle } from "./BrightHeader";
import IconIcons from "@elements/Icon/Generated/IconIcons";

export default {
    title: "Components/Tooltip",
    component: TooltipComponent,
    args: {
        tooltip: "Cupcake ipsum dolor sit amet ice cream.",
        heading: "",
    },
    argTypes: {
        brightHeader: {
            options: ["None", "Information", "Warning", "Tip", "Note"],
            mapping: {
                None: null,
                Information: BrightHeaderStyle.Information,
                Warning: BrightHeaderStyle.Warning,
                Tip: BrightHeaderStyle.Tip,
                Note: BrightHeaderStyle.Note,
            },
            defaultValue: "None",
            control: { type: "select" },
        },
        tooltipIcon: {
            options: ["None", "Icon"],
            mapping: {
                None: null,
                Icon: <IconIcons key="1" />,
            },
            defaultValue: "None",
            control: { type: "select" },
        },
        headingIcon: {
            options: ["None", "Icon"],
            mapping: {
                None: null,
                Icon: <IconIcons key="1" />,
            },
            defaultValue: "None",
            control: { type: "select" },
        },
    },
} as Meta;

export const TooltipTemplate: Story<TooltipProps> = (args: TooltipProps) => <TooltipComponent {...args} />;

export const Default = TooltipTemplate.bind({});
Default.args = {};
Default.storyName = "Base Tooltip";

export const WithInfoHeader = TooltipTemplate.bind({});
WithInfoHeader.args = {
    brightHeader: BrightHeaderStyle.Information,
};
WithInfoHeader.storyName = "With Info Bright Header";

export const WithWarningHeader = TooltipTemplate.bind({});
WithWarningHeader.args = {
    brightHeader: BrightHeaderStyle.Warning,
};
WithWarningHeader.storyName = "With Warning Bright Header";

export const WithTipHeader = TooltipTemplate.bind({});
WithTipHeader.args = {
    brightHeader: BrightHeaderStyle.Tip,
};
WithTipHeader.storyName = "With Tip Bright Header";

export const WithNoteHeader = TooltipTemplate.bind({});
WithNoteHeader.args = {
    brightHeader: BrightHeaderStyle.Note,
};
WithNoteHeader.storyName = "With Note Bright Header";

export const WithButtons = TooltipTemplate.bind({});
WithButtons.args = {
    buttons: [
        { label: "Whatever", action: () => null },
        { label: "Hello", action: () => null },
    ],
};

export const WithHeading = TooltipTemplate.bind({});
WithHeading.args = {
    heading: "I'm a heading",
    headingIcon: <IconIcons />,
};

export const TooltipWithIcon = TooltipTemplate.bind({});
TooltipWithIcon.args = {
    tooltipIcon: <IconIcons />,
};

export const WithLinkWithDefaultLabel = TooltipTemplate.bind({});
WithLinkWithDefaultLabel.args = {
    linkUrl: "#",
};

export const WithLinkWithCustomLabel = TooltipTemplate.bind({});
WithLinkWithCustomLabel.args = {
    linkUrl: "#",
    linkLabel: "Upgrade your plan",
};

export const WithEverythingDisplayed = TooltipTemplate.bind({});
WithEverythingDisplayed.args = {
    tooltipIcon: <IconIcons />,
    heading: "I'm a heading",
    headingIcon: <IconIcons />,
    linkUrl: "#",
    brightHeader: BrightHeaderStyle.Warning,
    buttons: [
        { label: "Whatever", action: () => null },
        { label: "Hello", action: () => null },
    ],
};
