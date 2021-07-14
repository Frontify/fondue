/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as Audio } from "@components/Icon/Svg/Audio.svg";
import { Meta, Story } from "@storybook/react";
import { Size } from "@utilities/enum";
import DropdownMenuItem, { DropdownMenuItemProps } from "./DropdownMenuItem";

export default {
    title: "DropdownMenuItem",
    component: DropdownMenuItem,
    argTypes: {
        warning: {
            options: [true, false],
            control: { type: "radio" },
        },
        disabled: {
            options: [true, false],
            control: { type: "radio" },
        },
    },
} as Meta;

const DropdownMenuItemTemplate: Story<DropdownMenuItemProps> = (args) => <DropdownMenuItem {...args} />;

export const Large = DropdownMenuItemTemplate.bind({});
Large.args = {
    title: "Large Menu Item",
    subtitle: "Subtitle",
    icon: <Audio size={IconSize.Size16} />,
    size: Size.Large,
    warning: false,
    disabled: false,
    onClick: { action: "onClear" },
};

export const Small = DropdownMenuItemTemplate.bind({});
Small.args = {
    title: "Small Menu Item",
    icon: <Audio size={IconSize.Size16} />,
    warning: false,
    disabled: false,
    onClick: { action: "onClear" },
};
