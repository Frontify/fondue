/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Editor, Element, Text, Transforms } from "slate";
import { DoneInvokeEvent } from "xstate";
import { BlockStyleTypes, TextAlignTypes } from "../../renderer/renderBlockStyles";
import { BlockTypeData, InlineStyleData, ToolbarContext, ToolbarData } from "./machine";

const isBlockTypeData = (data: ToolbarData): data is BlockTypeData => (data as BlockTypeData).type !== undefined;
const isInlineStyleData = (data: ToolbarData): data is InlineStyleData =>
    (data as InlineStyleData).style !== undefined && (data as InlineStyleData).value !== undefined;

export const updateBlockType = (_: ToolbarContext, { data }: DoneInvokeEvent<ToolbarData>): void => {
    if (isBlockTypeData(data)) {
        const { editor, type, active, textAlign } = data;
        toggleBlock(active, editor, type, textAlign);
    }
};

export const updateInlineStyle = (_: ToolbarContext, { data }: DoneInvokeEvent<ToolbarData>): void => {
    if (isInlineStyleData(data)) {
        const { editor, style } = data;
        Transforms.setNodes(
            editor,
            { [style as string]: data.value },
            { match: (node) => Text.isText(node), split: true },
        );
    }
};

const toggleBlock = (active: boolean, editor: Editor, type: BlockStyleTypes, textAlign?: TextAlignTypes) => {
    const isList = [BlockStyleTypes.OrderedList, BlockStyleTypes.UnorderedList].includes(type);
    const isHeadingOrText = [
        BlockStyleTypes.Paragraph,
        BlockStyleTypes.H1,
        BlockStyleTypes.H2,
        BlockStyleTypes.H3,
        BlockStyleTypes.H4,
        BlockStyleTypes.Custom01,
        BlockStyleTypes.Custom02,
    ].includes(type);
    Transforms.unwrapNodes(editor, {
        match: (node) =>
            Element.isElement(node) && [BlockStyleTypes.OrderedList, BlockStyleTypes.UnorderedList].includes(node.type),
        split: true,
    });

    const newItem: Partial<Element> = {
        type: active && isHeadingOrText ? type : isList ? BlockStyleTypes.ListItem : type,
    };

    if (textAlign) {
        newItem.properties = {
            textAlign: !active ? textAlign : TextAlignTypes.None,
        };
    }

    // ensure all selected child nodes are converted
    for (const [, path] of Editor.nodes(editor, {
        match: (node) => Element.isElement(node) && BlockStyleTypes.ListItem === node.type,
    })) {
        Transforms.setNodes(editor, newItem, { at: path });
    }

    Transforms.setNodes(editor, newItem);

    if (!active && isList) {
        const block = { type: type, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};
