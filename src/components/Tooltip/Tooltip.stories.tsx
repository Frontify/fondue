/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconIcons from "@foundation/Icon/Generated/IconIcons";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { BrightHeaderStyle } from "./BrightHeader";
import { Tooltip as TooltipComponent, TooltipProps } from "./Tooltip";
import { TooltipArrow } from "./TooltipArrow";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Tooltip",
    component: TooltipComponent,
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
    },
} as Meta;

export const Tooltip: Story<TooltipProps> = (args: TooltipProps) => <TooltipComponent {...args} />;

export const WithInfoBrightHeader = Tooltip.bind({});
WithInfoBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Information,
};

export const WithWarningBrightHeader = Tooltip.bind({});
WithWarningBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Warning,
};

export const WithTipBrightHeader = Tooltip.bind({});
WithTipBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Tip,
};

export const WithNoteBrightHeader = Tooltip.bind({});
WithNoteBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Note,
};

export const WithOneButton = Tooltip.bind({});
WithOneButton.args = {
    buttons: [{ label: "Primary", action: () => null }],
};

export const WithTwoButtons = Tooltip.bind({});
WithTwoButtons.args = {
    buttons: [
        { label: "Primary", action: () => null },
        { label: "Secondary", action: () => null },
    ],
};

export const WithHeading = Tooltip.bind({});
WithHeading.args = {
    heading: "I'm a heading",
};

export const WithHeadingAndIcon = Tooltip.bind({});
WithHeadingAndIcon.args = {
    heading: "I'm a heading",
    headingIcon: <IconIcons />,
};

export const TooltipWithIcon = Tooltip.bind({});
TooltipWithIcon.args = {
    tooltipIcon: <IconIcons />,
};

export const WithLinkWithDefaultLabel = Tooltip.bind({});
WithLinkWithDefaultLabel.args = {
    linkUrl: "#",
};

export const WithLinkWithCustomLabel = Tooltip.bind({});
WithLinkWithCustomLabel.args = {
    linkUrl: "#",
    linkLabel: "Upgrade your plan",
};

export const WithEverythingDisplayed = Tooltip.bind({});
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

type ArrowPosition = "left" | "right" | "top" | "bottom";
type WithArrowProps = TooltipProps & { arrowPosition: ArrowPosition };
const getArrowStyle = (position: ArrowPosition) => {
    switch (position) {
        case "left":
            return { top: 0, left: 0, transform: "translate3d(-6px, 26px, 0)" };
        case "right":
            return { top: 0, right: 0, transform: "translate3d(6px, 26px, 0)" };
        case "top":
            return { top: 0, left: "50%", transform: "translate3d(-50%, -6px, 0)" };
        case "bottom":
            return { bottom: 0, left: "50%", transform: "translate3d(-50%, 6px, 0)" };
        default:
            return {};
    }
};

export const WithArrow: Story<WithArrowProps> = (args: WithArrowProps) => (
    <div className="tw-relative tw-inline-block">
        <TooltipComponent {...args}>
            <TooltipArrow
                style={getArrowStyle(args.arrowPosition)}
                placement={args.arrowPosition}
                headerColor={args.brightHeader}
            />
        </TooltipComponent>
    </div>
);
WithArrow.args = {
    arrowPosition: "left",
};
WithArrow.argTypes = {
    arrowPosition: {
        options: ["left", "right", "top", "bottom"],
        control: { type: "select" },
    },
};
