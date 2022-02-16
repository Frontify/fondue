/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Item } from "@react-stately/collections";
import { useActor } from "@xstate/react";
import React, { FC, useContext, useEffect, useState } from "react";
import { Editor, Element } from "slate";
import { useSlateStatic } from "slate-react";
import { BlockElement, TextStyles } from ".";
import { ToolbarContext } from "./context/toolbar";
import { BlockStyleTypes } from "./renderer/renderBlockStyles";
import { Select } from "./TextStyleDropdown/Select";
import { getTextStyles } from "./utils/editor/getTextStyles";

type Props = {
    textStyles?: TextStyles[];
};

export const headingTitle = {
    [BlockStyleTypes.H1]: "Heading 1",
    [BlockStyleTypes.H2]: "Heading 2",
    [BlockStyleTypes.H3]: "Heading 3",
    [BlockStyleTypes.H4]: "Heading 4",
    [BlockStyleTypes.Custom01]: "Custom 01",
    [BlockStyleTypes.Custom02]: "Custom 02",
    [BlockStyleTypes.Paragraph]: "Body Text",
};

export const BlockStyleDropdown: FC<Props> = ({ textStyles }) => {
    const { machineRef } = useContext(ToolbarContext);
    if (!machineRef) {
        return null;
    }
    const editor = useSlateStatic();
    const [type] = Editor.nodes<BlockElement>(editor, {
        match: (node) => Element.isElement(node),
    });
    const nodeType = type[0]?.type ?? null;
    const [blockTypeId, setBlockTypeId] = useState<string | null>(nodeType);

    const [blockTypeIsActive] = Editor.nodes<BlockElement>(editor, {
        match: (node) => Element.isElement(node) && node.type === blockTypeId,
    });

    useEffect(() => {
        setBlockTypeId(nodeType);
    }, [nodeType]);

    const [, send] = useActor(machineRef);

    const getMenuItemStyle = (identifier: TextStyles["type"]) =>
        [getTextStyles(identifier, textStyles), "tw-truncate"].join(" ");

    return (
        <div>
            <Select
                onSelectionChange={(id) => {
                    setBlockTypeId(id as BlockStyleTypes);
                    send({
                        type: "BLOCK_TYPE_SELECTED",
                        data: {
                            type: id as BlockStyleTypes,
                            active: !!blockTypeIsActive,
                            editor,
                        },
                    });
                }}
                selectedKey={blockTypeId || headingTitle[BlockStyleTypes.Paragraph]}
                placeholder={headingTitle[BlockStyleTypes.Paragraph]}
            >
                <Item textValue={headingTitle[BlockStyleTypes.H1]} key={BlockStyleTypes.H1}>
                    <h1 className={getMenuItemStyle(BlockStyleTypes.H1)}>{headingTitle[BlockStyleTypes.H1]}</h1>
                </Item>
                <Item textValue={headingTitle[BlockStyleTypes.H2]} key={BlockStyleTypes.H2}>
                    <h2 className={getMenuItemStyle(BlockStyleTypes.H2)}>{headingTitle[BlockStyleTypes.H2]}</h2>
                </Item>
                <Item textValue={headingTitle[BlockStyleTypes.H3]} key={BlockStyleTypes.H3}>
                    <h3 className={getMenuItemStyle(BlockStyleTypes.H3)}>{headingTitle[BlockStyleTypes.H3]}</h3>
                </Item>
                <Item textValue={headingTitle[BlockStyleTypes.H4]} key={BlockStyleTypes.H4}>
                    <h4 className={getMenuItemStyle(BlockStyleTypes.H4)}>{headingTitle[BlockStyleTypes.H4]}</h4>
                </Item>
                <Item textValue={headingTitle[BlockStyleTypes.Custom01]} key={BlockStyleTypes.Custom01}>
                    <div className={getMenuItemStyle(BlockStyleTypes.Custom01)}>
                        {headingTitle[BlockStyleTypes.Custom01]}
                    </div>
                </Item>
                <Item textValue={headingTitle[BlockStyleTypes.Custom02]} key={BlockStyleTypes.Custom02}>
                    <div className={getMenuItemStyle(BlockStyleTypes.Custom02)}>
                        {headingTitle[BlockStyleTypes.Custom02]}
                    </div>
                </Item>
                <Item textValue={headingTitle[BlockStyleTypes.Paragraph]} key={BlockStyleTypes.Paragraph}>
                    <div>{headingTitle[BlockStyleTypes.Paragraph]}</div>
                </Item>
            </Select>
        </div>
    );
};
