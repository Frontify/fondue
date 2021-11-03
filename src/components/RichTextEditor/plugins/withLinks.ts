/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Editor, Element, NodeEntry, Transforms } from "slate";
import { BlockStyleTypes } from "../renderer/renderBlockStyles";
import { createParagraphNode } from "../utils/paragraph";

export const withLinks = (editor: Editor): Editor => {
    const { isInline, normalizeNode } = editor;
    editor.isInline = (element) => (element.type === BlockStyleTypes.Link ? true : isInline(element));
    editor.normalizeNode = (entry) => {
        ensureLinkHasAncestorParagraph(entry, editor);
        normalizeNode(entry);
    };

    return editor;
};

const ensureLinkHasAncestorParagraph = (entry: NodeEntry, editor: Editor) => {
    const [node] = entry;
    if (Element.isElement(node) && node.type === BlockStyleTypes.Link) {
        const ancestorParagraph = Editor.above(editor, {
            match: (n) => Element.isElement(n) && n.type === BlockStyleTypes.Paragraph,
        });
        if (!ancestorParagraph) {
            Transforms.wrapNodes(editor, createParagraphNode([node]));
        }
    }
};
