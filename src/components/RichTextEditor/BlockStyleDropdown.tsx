/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from "@components/Dropdown";
import { MenuBlock } from "@components/Dropdown/SelectMenu/SelectMenu";
import { MenuItemContentSize } from "@components/MenuItem";
import { useActor } from "@xstate/react";
import React, { FC, useContext, useEffect, useState } from "react";
import { Editor, Element } from "slate";
import { useSlateStatic } from "slate-react";
import { BlockElement } from ".";
import { ToolbarContext } from "./context/toolbar";
import { BlockStyleTypes } from "./renderer/renderBlockStyles";

const headingMenuBlocks: MenuBlock[] = [
    {
        id: "toolbar-heading-menu-block",
        menuItems: [
            {
                id: BlockStyleTypes.H1,
                title: "Heading 1",
                size: MenuItemContentSize.Small,
            },
            {
                id: BlockStyleTypes.H2,
                title: "Heading 2",
                size: MenuItemContentSize.Small,
            },
            {
                id: BlockStyleTypes.H3,
                title: "Heading 3",
                size: MenuItemContentSize.Small,
            },
            {
                id: BlockStyleTypes.H4,
                title: "Heading 4",
                size: MenuItemContentSize.Small,
            },
            {
                id: BlockStyleTypes.Custom01,
                title: "Custom 01",
                size: MenuItemContentSize.Small,
            },
            {
                id: BlockStyleTypes.Custom02,
                title: "Custom 02",
                size: MenuItemContentSize.Small,
            },
            {
                id: BlockStyleTypes.Paragraph,
                title: "Body Text",
                size: MenuItemContentSize.Small,
            },
        ],
    },
];

export const BlockStyleDropdown: FC = () => {
    const { machineRef } = useContext(ToolbarContext);
    if (!machineRef) {
        return null;
    }
    const editor = useSlateStatic();
    const [type] = Editor.nodes<BlockElement>(editor, {
        match: (node) => Element.isElement(node),
    });
    const nodeType = type[0]?.type ?? null;
    const [blockType, setBlockType] = useState<string | null>(nodeType);

    const [blockTypeIsActive] = Editor.nodes<BlockElement>(editor, {
        match: (node) => Element.isElement(node) && node.type === blockType,
    });
    useEffect(() => {
        setBlockType(nodeType);
    }, [nodeType]);

    const [, send] = useActor(machineRef);

    return (
        <Dropdown
            activeItemId={blockType || BlockStyleTypes.Paragraph}
            placeholder="Body Text"
            onChange={(id) => {
                setBlockType(id as BlockStyleTypes);
                send({
                    type: "BLOCK_TYPE_SELECTED",
                    data: {
                        type: id as BlockStyleTypes,
                        active: !!blockTypeIsActive,
                        editor,
                    },
                });
            }}
            menuBlocks={headingMenuBlocks}
        ></Dropdown>
    );
};
