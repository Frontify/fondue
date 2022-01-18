/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemStyle, SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import IconAudio from "@foundation/Icon/Generated/IconAudio";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { ActionMenu as ActionMenuComponent, ActionMenuProps } from "./ActionMenu";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Action Menu",
    component: ActionMenuComponent,
    argTypes: {
        onClick: { action: "onClick" },
    },
} as Meta;

const initialMenuBlocks = [
    {
        id: "block1",
        ariaLabel: "First section",
        menuItems: [
            {
                id: "1",
                title: "Small item with icon",
                size: MenuItemContentSize.Small,
                decorator: <IconAudio />,
                selectionIndicator: SelectionIndicatorIcon.CaretRight,
                onClick: action("click"),
            },
            {
                id: "2",
                title: "Small item with icon warning",
                size: MenuItemContentSize.Small,
                decorator: <IconAudio />,
                style: MenuItemStyle.Danger,
                selectionIndicator: SelectionIndicatorIcon.CaretRight,
                onClick: action("click"),
            },
        ],
    },
    {
        id: "block2",
        ariaLabel: "Second section",
        menuItems: [
            {
                id: "9",
                title: "Small item",
                size: MenuItemContentSize.Small,
                selectionIndicator: SelectionIndicatorIcon.CaretRight,
                onClick: action("click"),
            },
        ],
    },
];

export const ActionMenu: Story<ActionMenuProps & { onClick: () => void }> = (args) => {
    const [menuBlocks, setMenuBlocks] = useState(initialMenuBlocks);

    const addBlocks = () => {
        setMenuBlocks([
            ...menuBlocks,
            {
                id: "block3",
                ariaLabel: "Third section",
                menuItems: [
                    {
                        id: "10",
                        title: "Dini Mää",
                        size: MenuItemContentSize.Small,
                        selectionIndicator: SelectionIndicatorIcon.CaretRight,
                        onClick: action("click"),
                    },
                ],
            },
        ]);
    };

    return (
        <div>
            <ActionMenuComponent {...args} menuBlocks={menuBlocks} />
            <button onClick={addBlocks}>MOAR</button>
        </div>
    );
};
