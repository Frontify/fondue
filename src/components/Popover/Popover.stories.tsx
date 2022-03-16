/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Popover, PopoverAlignment, PopoverPosition, PopoverProps } from "./Popover";
import { Button, ButtonStyle } from "@components/Button";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Popover",
    component: Popover,
    argTypes: {
        position: {
            options: Object.values(PopoverPosition),
            control: { type: "select" },
            defaultValue: PopoverPosition.Bottom,
        },
        alignment: {
            options: Object.values(PopoverAlignment),
            control: { type: "select" },
            defaultValue: PopoverAlignment.Middle,
        },
        point: {
            control: { type: "boolean" },
            defaultValue: false,
        },
        flip: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        maxHeight: {
            control: { type: "number" },
        },
        maxWidth: {
            control: { type: "number" },
        },
    },
} as Meta<PopoverProps>;

const PopoverTemplate: Story<PopoverProps> = (args: PopoverProps) => {
    const trigger = <Button style={ButtonStyle.Secondary}>Reference Element</Button>;
    return (
        <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <Popover {...args} point={true} transactional={false} trigger={trigger}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi architecto cupiditate
                dolorem saepe sapiente sint suscipit voluptas!
                <Button style={ButtonStyle.Danger}>Some action</Button>
            </Popover>
        </div>
    );
};

export const Default = PopoverTemplate.bind({});
Default.storyName = "Popover as Tooltip";
