import { Editor, Text, Transforms } from "slate";
import { DoneInvokeEvent } from "xstate";
import { BlockTypeData, InlineStyleData, ToolbarContext, ToolbarData } from "./machine";

const isBlockTypeData = (data: ToolbarData): data is BlockTypeData => (data as BlockTypeData).type !== undefined;
const isInlineStyleData = (data: ToolbarData): data is InlineStyleData =>
    (data as InlineStyleData).style !== undefined && (data as InlineStyleData).value !== undefined;

export const updateBlockType = (_: ToolbarContext, { data }: DoneInvokeEvent<ToolbarData>): void => {
    if (isBlockTypeData(data)) {
        const { editor, type } = data;
        Transforms.setNodes(editor, { type }, { match: (n) => Editor.isBlock(editor, n) });
    }
};

export const updateInlineStyle = (_: ToolbarContext, { data }: DoneInvokeEvent<ToolbarData>): void => {
    if (isInlineStyleData(data)) {
        const { editor, style } = data;
        Transforms.setNodes(editor, { [style as string]: data.value }, { match: (n) => Text.isText(n), split: true });
    }
};
