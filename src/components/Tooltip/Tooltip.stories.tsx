/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconIcons from "@foundation/Icon/Generated/IconIcons";
import { Meta, Story } from "@storybook/react";
import React, { useRef } from "react";
import { BrightHeaderStyle } from "./BrightHeader";
import { Tooltip, TooltipAlignment, TooltipPosition, TooltipProps } from "./Tooltip";
import { IconAttentionFilled, IconSize } from "@foundation/Icon";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Tooltip",
    component: Tooltip,
    args: {
        content: "Cupcake ipsum dolor sit amet ice cream.",
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
            control: { type: "select" },
        },
        tooltipIcon: {
            options: ["None", "Icon"],
            mapping: {
                None: null,
                Icon: <IconIcons />,
            },
            control: { type: "select" },
        },
        headingIcon: {
            options: ["None", "Icon"],
            mapping: {
                None: null,
                Icon: <IconIcons />,
            },
            control: { type: "select" },
        },
        position: {
            options: Object.values(TooltipPosition),
            control: { type: "select" },
            defaultValue: TooltipPosition.Bottom,
        },
        alignment: {
            options: Object.values(TooltipAlignment),
            control: { type: "select" },
            defaultValue: TooltipAlignment.Middle,
        },
        withArrow: {
            control: { type: "boolean" },
            defaultValue: false,
        },
        flip: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        hoverdelay: {
            control: { type: "number" },
            defaultValue: 2000,
        },
    },
} as Meta<TooltipProps>;

export const TooltipComponent: Story<TooltipProps> = (args: TooltipProps) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
        <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <button ref={triggerRef} className="tw-flex tw-justify-center tw-items-center">
                <IconAttentionFilled size={IconSize.Size16} />
                <span>Tooltip trigger</span>
            </button>
            <Tooltip {...args} triggerRefElement={triggerRef} />
        </div>
    );
};

export const WithInfoBrightHeader = TooltipComponent.bind({});
WithInfoBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Information,
};

export const WithWarningBrightHeader = TooltipComponent.bind({});
WithWarningBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Warning,
};

export const WithTipBrightHeader = TooltipComponent.bind({});
WithTipBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Tip,
};

export const WithNoteBrightHeader = TooltipComponent.bind({});
WithNoteBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Note,
};

export const WithOneButton = TooltipComponent.bind({});
WithOneButton.args = {
    buttons: [{ label: "Primary", action: () => null }],
};

export const WithTwoButtons = TooltipComponent.bind({});
WithTwoButtons.args = {
    buttons: [
        { label: "Primary", action: () => null },
        { label: "Secondary", action: () => null },
    ],
};

export const WithHeading = TooltipComponent.bind({});
WithHeading.args = {
    heading: "I'm a heading",
};

export const WithHeadingAndIcon = TooltipComponent.bind({});
WithHeadingAndIcon.args = {
    heading: "I'm a heading",
    headingIcon: <IconIcons />,
};

export const TooltipWithIcon = TooltipComponent.bind({});
TooltipWithIcon.args = {
    tooltipIcon: <IconIcons />,
};

export const WithLinkWithDefaultLabel = TooltipComponent.bind({});
WithLinkWithDefaultLabel.args = {
    linkUrl: "#",
};

export const WithLinkWithCustomLabel = TooltipComponent.bind({});
WithLinkWithCustomLabel.args = {
    linkUrl: "#",
    linkLabel: "Upgrade your plan",
};

export const WithEverythingDisplayed = TooltipComponent.bind({});
WithEverythingDisplayed.args = {
    tooltipIcon: <IconIcons />,
    heading: "I'm a heading",
    headingIcon: <IconIcons />,
    linkUrl: "#",
    brightHeader: BrightHeaderStyle.Warning,
    buttons: [
        { label: "Primary", action: () => null },
        { label: "Secondary", action: () => null },
    ],
};

export const WithArrow = TooltipComponent.bind({});
WithArrow.args = {
    withArrow: true,
};
