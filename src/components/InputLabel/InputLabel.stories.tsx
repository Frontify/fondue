/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React from "react";
import { IconAttentionFilled, IconInfo, IconQuestion } from "@foundation/Icon/Generated";
import { InputLabel as InputLabelComponent, InputLabelProps } from "./InputLabel";
import { TooltipIconTriggerStyle } from "..";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Input Label",
    component: InputLabelComponent,
    args: {
        children: "Input Label",
        disabled: false,
        required: false,
        tooltip: {
            content: "Lorem ipsum dolor sit amet.",
        },
    },
} as Meta;

export const InputLabel: Story<InputLabelProps> = (args: InputLabelProps) => <InputLabelComponent {...args} />;

export const InputLabelWithMultipleTooltips = InputLabel.bind({});

InputLabelWithMultipleTooltips.args = {
    ...InputLabel.args,
    tooltip: [
        { triggerIcon: <IconInfo />, triggerStyle: TooltipIconTriggerStyle.Danger, content: "Tooltip 1" },
        { triggerIcon: <IconQuestion />, triggerStyle: TooltipIconTriggerStyle.Primary, content: "Tooltip 2" },
        { triggerIcon: <IconAttentionFilled />, triggerStyle: TooltipIconTriggerStyle.Warning, content: "Tooltip 3" },
    ],
};
