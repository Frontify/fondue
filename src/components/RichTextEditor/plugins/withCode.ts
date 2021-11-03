/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Editor, Element, Path, Point, Transforms } from "slate";
import { BlockStyleTypes } from "../renderer/renderBlockStyles";

export const withCode = (editor: Editor): Editor => {
    const { insertBreak } = editor;

    editor.insertBreak = (...args) => {
        if (!handleLinkLineBreak(editor)) {
            insertBreak(...args);
        }
    };

    return editor;
};

const handleLinkLineBreak = (editor: Editor): boolean => {
    if (!editor.selection?.focus) {
        return false;
    }

    const [parentNode, parentPath] = Editor.parent(editor, editor.selection.focus.path);

    if (Element.isElement(parentNode) && parentNode.type !== BlockStyleTypes.Code) {
        return false;
    }

    const codeStartPoint = Editor.point(editor, editor.selection.focus.path, { edge: "start" });
    const isCursorAtLineStart = Point.equals(editor.selection.anchor, codeStartPoint);

    const insertPath = isCursorAtLineStart ? parentPath : Path.next(parentPath);
    Transforms.insertNodes(
        editor,
        { type: BlockStyleTypes.Paragraph, children: [{ text: "" }] },
        {
            at: insertPath,
            select: true,
        },
    );

    return true;
};
