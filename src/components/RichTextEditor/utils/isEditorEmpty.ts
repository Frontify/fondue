import { Editor, Path, Text } from "slate";

export const isEditorEmpty = (editor: Editor): boolean => {
    const rootPath: Path = [0];
    const [match] = Editor.nodes(editor, {
        at: rootPath,
        match: (node) => !Editor.isEditor(node) && Text.isText(node) && node.text.length > 0,
    });

    return !match;
};
