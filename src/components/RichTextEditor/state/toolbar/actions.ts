/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Editor, Element, Text, Transforms } from "slate";
import { DoneInvokeEvent } from "xstate";
import { BlockStyleTypes } from "../../renderer/renderBlockStyles";
import { BlockTypeData, InlineStyleData, ToolbarContext, ToolbarData } from "./machine";

const isBlockTypeData = (data: ToolbarData): data is BlockTypeData => (data as BlockTypeData).type !== undefined;
const isInlineStyleData = (data: ToolbarData): data is InlineStyleData =>
    (data as InlineStyleData).style !== undefined && (data as InlineStyleData).value !== undefined;

export const updateBlockType = (_: ToolbarContext, { data }: DoneInvokeEvent<ToolbarData>): void => {
    if (isBlockTypeData(data)) {
        const { editor, type, active } = data;
        toggleBlock(active, editor, type);
    }
};

export const updateInlineStyle = (_: ToolbarContext, { data }: DoneInvokeEvent<ToolbarData>): void => {
    if (isInlineStyleData(data)) {
        const { editor, style } = data;
        Transforms.setNodes(editor, { [style as string]: data.value }, { match: (n) => Text.isText(n), split: true });
    }
};

const toggleBlock = (active: boolean, editor: Editor, type: BlockStyleTypes) => {
    const isList = [BlockStyleTypes.OrderedList, BlockStyleTypes.UnorderedList].includes(type);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            Element.isElement(n) && [BlockStyleTypes.OrderedList, BlockStyleTypes.UnorderedList].includes(n.type),
        split: true,
    });

    const newListItem: Partial<Element> = {
        type: active ? BlockStyleTypes.Paragraph : isList ? BlockStyleTypes.ListItem : type,
    };

    // ensure all selected child nodes are converted
    for (const [, path] of Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && BlockStyleTypes.ListItem === n.type,
    })) {
        Transforms.setNodes(editor, newListItem, { at: path });
    }

    Transforms.setNodes(editor, newListItem);

    if (!active && isList) {
        const block = { type: type, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};
