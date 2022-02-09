/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from "@components/Dropdown";
import { MenuItemContentSize } from "@components/MenuItem";
import { useActor } from "@xstate/react";
import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { Editor, Element } from "slate";
import { useSlateStatic } from "slate-react";
import { BlockElement } from ".";
import { ToolbarContext } from "./context/toolbar";
import { BlockStyleTypes, headingTypeClassname } from "./renderer/renderBlockStyles";

const headingDropdown: { title: ReactNode; id: string; size: MenuItemContentSize }[] = [
    {
        id: BlockStyleTypes.H1,
        title: <span className={headingTypeClassname.h1}>Heading 1</span>,
        size: MenuItemContentSize.Small,
    },
    {
        id: BlockStyleTypes.H2,
        title: <span className={headingTypeClassname.h2}>Heading 2</span>,
        size: MenuItemContentSize.Small,
    },
    {
        id: BlockStyleTypes.H3,
        title: <span className={headingTypeClassname.h3}>Heading 3</span>,
        size: MenuItemContentSize.Small,
    },
    {
        id: BlockStyleTypes.Custom01,
        title: <span className={headingTypeClassname.custom01}>Custom 01</span>,
        size: MenuItemContentSize.Small,
    },
    {
        id: BlockStyleTypes.Custom02,
        title: <span className={headingTypeClassname.custom02}>Custom 02</span>,
        size: MenuItemContentSize.Small,
    },
    {
        id: BlockStyleTypes.Paragraph,
        title: <span>Body Text</span>,
        size: MenuItemContentSize.Small,
    },
];

export const BlockStyleDropdown: FC = () => {
    const { machineRef } = useContext(ToolbarContext);

    const editor = useSlateStatic();
    const [type] = Editor.nodes<BlockElement>(editor, {
        match: (node) => Element.isElement(node), //&& node.type === blockType
    });
    const [active, setActive] = useState<string | null>(type ? type[0]?.type ?? null : null);

    if (!machineRef) {
        return null;
    }

    const [blockTypeIsActive] = Editor.nodes<BlockElement>(editor, {
        match: (node) => Element.isElement(node) && node.type === active, //&& node.properties?.headingType === active,
    });

    useEffect(() => {
        setActive(type ? type[0]?.type ?? null : null);
    }, [active]);

    const [, send] = useActor(machineRef);

    return (
        <Dropdown
            activeItemId={active || BlockStyleTypes.Paragraph}
            placeholder="Body Text"
            onChange={(id) => {
                setActive(id as BlockStyleTypes);
                send({
                    type: "BLOCK_TYPE_SELECTED",
                    data: {
                        type: id as BlockStyleTypes,
                        active: !!blockTypeIsActive,
                        editor,
                    },
                });
            }}
            menuBlocks={[{ id: "heading-picker-dropdown-block", menuItems: headingDropdown }]}
        ></Dropdown>
    );
};
