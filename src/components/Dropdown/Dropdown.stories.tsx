/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as Audio } from "@components/Icon/Svg/Audio.svg";
import { Meta, Story } from "@storybook/react";
import { Size, Style } from "@utilities/enum";
import { useState } from "react";
import Dropdown, { DropdownProps } from "./Dropdown";

export default {
    title: "Dropdown",
    component: Dropdown,
    args: {
        disabled: false,
        clearable: false,
    },
    argTypes: {
        size: {
            options: [Size.Small, Size.Large],
            control: { type: "radio" },
        },
    },
} as Meta;

const DropdownTemplate: Story<DropdownProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState("");
    return <Dropdown activeItemId={activeItemId} onChange={setActiveItemId} {...args} />;
};

export const SmallSelect = DropdownTemplate.bind({});

SmallSelect.args = {
    placeholder: "select item",
    size: Size.Small,
    menuBlocks: [
        {
            id: "block1",
            menuItems: [
                {
                    id: "1",
                    title: "Small icon",
                    icon: <Audio size={IconSize.Size16} />,
                },
                {
                    id: "2",
                    title: "Small icon warning",
                    icon: <Audio size={IconSize.Size16} />,
                    style: Style.Danger,
                },
                {
                    id: "3",
                    title: "Small icon disabled",
                    icon: <Audio size={IconSize.Size16} />,
                    disabled: true,
                },
                {
                    id: "4",
                    title: "Small icon warning disabled",
                    icon: <Audio size={IconSize.Size16} />,
                    style: Style.Danger,
                    disabled: true,
                },
            ],
        },
        {
            id: "block2",
            menuItems: [
                {
                    id: "9",
                    title: "Small",
                },
                {
                    id: "10",
                    title: "Small warning",
                    style: Style.Danger,
                },
                {
                    id: "11",
                    title: "Small disabled",
                    disabled: true,
                },
                {
                    id: "12",
                    title: "Small warning disabled",
                    style: Style.Danger,
                    disabled: true,
                },
            ],
        },
    ],
};

export const LargeSelect = DropdownTemplate.bind({});

LargeSelect.args = {
    placeholder: "select item",
    size: Size.Large,
    menuBlocks: [
        {
            id: "block3",
            menuItems: [
                {
                    id: "5",
                    title: "Large icon",
                    subtitle: "Subtitle",
                    icon: <Audio size={IconSize.Size16} />,
                    size: Size.Large,
                },
                {
                    id: "6",
                    title: "Large icon warning",
                    subtitle: "Subtitle",
                    icon: <Audio size={IconSize.Size16} />,
                    size: Size.Large,
                    style: Style.Danger,
                },
                {
                    id: "7",
                    title: "Large icon disabled",
                    subtitle: "Subtitle",
                    icon: <Audio size={IconSize.Size16} />,
                    size: Size.Large,
                    disabled: true,
                },
                {
                    id: "8",
                    title: "Large icon warning disabled",
                    subtitle: "Subtitle",
                    icon: <Audio size={IconSize.Size16} />,
                    size: Size.Large,
                    style: Style.Danger,
                    disabled: true,
                },
            ],
        },
        {
            id: "block4",
            menuItems: [
                {
                    id: "13",
                    title: "Large",
                    subtitle: "Subtitle",
                    size: Size.Large,
                },
                {
                    id: "14",
                    title: "Large warning",
                    subtitle: "Subtitle",
                    size: Size.Large,
                    style: Style.Danger,
                },
                {
                    id: "15",
                    title: "Large disabled",
                    subtitle: "Subtitle",
                    size: Size.Large,
                    disabled: true,
                },
                {
                    id: "16",
                    title: "Large warning disabled",
                    subtitle: "Subtitle",
                    size: Size.Large,
                    style: Style.Danger,
                    disabled: true,
                },
            ],
        },
    ],
};
