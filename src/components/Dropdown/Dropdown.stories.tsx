/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from "react";
import { Dropdown, DropdownProps } from "./Dropdown";
import { Meta, Story } from "@storybook/react";
import { IconSize } from "@elements/Icon/IconSize";
import IconAudio from "@elements/Icon/Generated/IconAudio";
import { Size, Style } from "@utilities/enum";

export default {
    title: "Components/Dropdown",
    component: Dropdown,
    args: {
        placeholder: "select item",
        disabled: false,
        clearable: false,
    },
    argTypes: {
        size: {
            table: { disable: true },
        },
        activeItemId: { type: "string" },
    },
} as Meta;

const DropdownTemplate: Story<DropdownProps> = (args: DropdownProps) => {
    const [active, setActive] = useState(args.activeItemId);
    useEffect(() => setActive(args.activeItemId), [args.activeItemId]);

    return <Dropdown {...args} activeItemId={active} onChange={(id) => setActive(id)} />;
};

export const SmallSelect = DropdownTemplate.bind({});

SmallSelect.args = {
    size: Size.Small,
    menuBlocks: [
        {
            id: "block1",
            menuItems: [
                {
                    id: "1",
                    title: "Small icon",
                    size: Size.Small,
                    icon: <IconAudio size={IconSize.Size16} />,
                },
                {
                    id: "2",
                    title: "Small icon warning",
                    size: Size.Small,
                    icon: <IconAudio size={IconSize.Size16} />,
                    style: Style.Danger,
                },
                {
                    id: "3",
                    title: "Small icon disabled",
                    size: Size.Small,
                    icon: <IconAudio size={IconSize.Size16} />,
                    disabled: true,
                },
                {
                    id: "4",
                    title: "Small icon warning disabled",
                    size: Size.Small,
                    icon: <IconAudio size={IconSize.Size16} />,
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
                    size: Size.Small,
                },
                {
                    id: "10",
                    title: "Small warning",
                    size: Size.Small,
                    style: Style.Danger,
                },
                {
                    id: "11",
                    title: "Small disabled",
                    size: Size.Small,
                    disabled: true,
                },
                {
                    id: "12",
                    title: "Small warning disabled",
                    style: Style.Danger,
                    size: Size.Small,
                    disabled: true,
                },
            ],
        },
    ],
};

export const LargeSelect = DropdownTemplate.bind({});

LargeSelect.args = {
    size: Size.Large,
    menuBlocks: [
        {
            id: "block3",
            menuItems: [
                {
                    id: "5",
                    title: "Large icon",
                    subtitle: "Subtitle",
                    icon: <IconAudio size={IconSize.Size16} />,
                    size: Size.Large,
                },
                {
                    id: "6",
                    title: "Large icon warning",
                    subtitle: "Subtitle",
                    icon: <IconAudio size={IconSize.Size16} />,
                    size: Size.Large,
                    style: Style.Danger,
                },
                {
                    id: "7",
                    title: "Large icon disabled",
                    subtitle: "Subtitle",
                    icon: <IconAudio size={IconSize.Size16} />,
                    size: Size.Large,
                    disabled: true,
                },
                {
                    id: "8",
                    title: "Large icon warning disabled",
                    subtitle: "Subtitle",
                    icon: <IconAudio size={IconSize.Size16} />,
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
