/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { DropdownComponent, DropdownComponentProps } from "./DropdownComponent";
import { MenuItemContentSize, MenuItemStyle } from "@components/MenuItem";
import IconAudio from "@foundation/Icon/Generated/IconAudio";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/DropdownComponent",
    component: DropdownComponent,
    args: {
        menuBlocks: [
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
        ],
    },
} as Meta<DropdownComponentProps>;

const Template: Story<DropdownComponentProps> = (args) => {
    const [active, setActive] = useState(args.activeItemId);

    return <DropdownComponent {...args} activeItemId={active} onChange={(id) => setActive(id)} />;
};

export const Default = Template.bind({});
