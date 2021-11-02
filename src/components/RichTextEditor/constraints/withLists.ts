/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Editor, Element, Node, NodeEntry, Transforms } from "slate";
import { BlockStyleTypes } from "../renderer/renderBlockStyles";

export const withLists = (editor: Editor): Editor => {
    const { normalizeNode } = editor;
    editor.normalizeNode = (entry) => {
        ensureListItems(entry, editor);
        normalizeNode(entry);
    };

    return editor;
};

const isList = (nodeType: BlockStyleTypes) =>
    [BlockStyleTypes.UnorderedList, BlockStyleTypes.OrderedList].includes(nodeType);

const ensureListItems = (entry: NodeEntry, editor: Editor) => {
    const [node, path] = entry;
    if (Element.isElement(node) && isList(node.type)) {
        for (const [child, childPath] of Node.children(editor, path)) {
            if (!(Element.isElement(child) && child.type === BlockStyleTypes.ListItem)) {
                Transforms.wrapNodes(editor, { type: BlockStyleTypes.ListItem, children: [child] }, { at: childPath });
            }
        }
    }
};
