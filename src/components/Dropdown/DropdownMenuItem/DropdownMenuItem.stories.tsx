/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as Audio } from "@components/Icon/Svg/Audio.svg";
import { Meta, Story } from "@storybook/react";
import { Size } from "@utilities/enum";
import DropdownMenuItem, { DropdownMenuItemProps } from "./DropdownMenuItem";

export default {
    title: "DropdownMenuItem",
    component: DropdownMenuItem,
    args: {
        warning: false,
        disabled: false,
    },
    argTypes: {
        onClick: { action: "onClear" },
    },
} as Meta;

const DropdownMenuItemTemplate: Story<DropdownMenuItemProps> = (args) => <DropdownMenuItem {...args} />;

export const Large = DropdownMenuItemTemplate.bind({});
Large.args = {
    title: "Large Menu Item",
    subtitle: "Subtitle",
    icon: <Audio size={IconSize.Size16} />,
    size: Size.Large,
};

export const Small = DropdownMenuItemTemplate.bind({});
Small.args = {
    title: "Small Menu Item",
    icon: <Audio size={IconSize.Size16} />,
};
