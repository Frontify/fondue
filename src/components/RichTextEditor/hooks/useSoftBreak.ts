import { KeyboardEvent } from "react";
import { Editor } from "slate";

export const useSoftBreak =
    (editor: Editor) =>
    (event: KeyboardEvent): void => {
        if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault();
            editor.insertText("\n");
        }
    };
