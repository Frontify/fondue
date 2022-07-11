/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { DropdownComponent, DropdownComponentProps } from "./DropdownComponent";
import { MenuItemContentSize, MenuItemStyle } from "@components/MenuItem";
import IconAudio from "@foundation/Icon/Generated/IconAudio";
import { Dropdown, DropdownAlignment, DropdownPosition, DropdownSize } from "@components/Dropdown";
import { Validation } from "@utilities/validation";

const menuItems = [
    {
        id: "block1",
        ariaLabel: "First section",
        menuItems: [
            {
                id: 1,
                title: "Small icon",
                size: MenuItemContentSize.Small,
                decorator: <IconAudio />,
            },
            {
                id: 2,
                title: "Small icon warning",
                size: MenuItemContentSize.Small,
                decorator: <IconAudio />,
                style: MenuItemStyle.Danger,
            },
            {
                id: 3,
                title: "Small icon disabled",
                size: MenuItemContentSize.Small,
                decorator: <IconAudio />,
                disabled: true,
            },
            {
                id: 4,
                title: "Small icon warning disabled",
                size: MenuItemContentSize.Small,
                decorator: <IconAudio />,
                style: MenuItemStyle.Danger,
                disabled: true,
            },
        ],
    },
    {
        id: "block2",
        ariaLabel: "Second section",
        menuItems: [
            {
                id: "9",
                title: "Small",
                size: MenuItemContentSize.Small,
            },
            {
                id: "10",
                title: "Small warning",
                size: MenuItemContentSize.Small,
                style: MenuItemStyle.Danger,
            },
            {
                id: "11",
                title: "Small disabled",
                size: MenuItemContentSize.Small,
                disabled: true,
            },
            {
                id: "12",
                title: "Small warning disabled",
                style: MenuItemStyle.Danger,
                size: MenuItemContentSize.Small,
                disabled: true,
            },
        ],
    },
];

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/DropdownComponent",
    component: Dropdown,
    args: {
        placeholder: "select item",
        disabled: false,
        clearable: false,
        validation: Validation.Default,
        menuBlocks: menuItems,
    },
    argTypes: {
        size: {
            options: Object.values(DropdownSize),
            control: { type: "select" },
            defaultValue: DropdownSize.Small,
        },
        activeItemId: { type: "string" },
        validation: {
            options: Object.values(Validation),
            control: { type: "select" },
        },
        alignment: {
            options: Object.values(DropdownAlignment),
            control: { type: "select" },
            defaultValue: DropdownAlignment.Start,
        },
        position: {
            options: Object.values(DropdownPosition),
            control: { type: "select" },
            defaultValue: DropdownPosition.Bottom,
        },
    },
} as Meta;

const Template: Story<DropdownComponentProps> = (args) => {
    const [active, setActive] = useState(args.activeItemId);

    return <DropdownComponent {...args} activeItemId={active} onChange={(id) => setActive(id)} />;
};

export const Default = Template.bind({});
