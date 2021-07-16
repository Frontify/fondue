/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as Audio } from "@components/Icon/Svg/Audio.svg";
import { Meta, Story } from "@storybook/react";
import { Size, Style } from "@utilities/enum";
import DropdownMenuItem, { DropdownMenuItemProps, SelectionIndicatorIcon } from "./DropdownMenuItem";

export default {
    title: "Components/DropdownMenuItem",
    component: DropdownMenuItem,
    args: {
        disabled: false,
        active: false,
        style: Style.Primary,
        selectionIndicator: SelectionIndicatorIcon.Check,
    },
    argTypes: {
        onClick: { action: "onClear" },
        style: {
            options: [Style.Primary, Style.Danger],
            control: { type: "radio" },
        },
        selectionIndicator: {
            options: Object.keys(SelectionIndicatorIcon),
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
};

export const Small = DropdownMenuItemTemplate.bind({});
Small.args = {
    title: "Small Menu Item",
    icon: <Audio size={IconSize.Size16} />,
};
