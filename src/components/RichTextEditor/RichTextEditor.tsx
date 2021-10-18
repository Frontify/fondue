import { useMachine } from "@xstate/react";
import { convertFromRaw, convertToRaw, Editor, EditorState, RawDraftContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { FC, useRef } from "react";
import { decorators } from "./decorators";
import { editorMachine } from "./state/editor/machine";
import { styleMap } from "./styleMap";

export type RichTextEditorProps = {
    placeholder?: string;
    value?: RawDraftContentState;
    onTextChange?: (value: RawDraftContentState) => void;
    readonly?: boolean;
};

export const RichTextEditor: FC<RichTextEditorProps> = ({
    value,
    placeholder,
    onTextChange,
    readonly = false,
}: RichTextEditorProps) => {
    const editor = useRef<Editor | null>(null);
    const [{ context }, send, machineRef] = useMachine(
        editorMachine.withContext({
            locked: readonly,
            editorState: value
                ? EditorState.createWithContent(convertFromRaw(value), decorators)
                : EditorState.createEmpty(decorators),
        }),
    );

    return (
        <div onFocus={() => send("FOCUS")}>
            <Editor
                ref={editor}
                customStyleMap={styleMap}
                editorState={context.editorState}
                placeholder={placeholder}
                onChange={(editorState) => {
                    send("CONTENT_CHANGED", { data: { editorState } });
                    onTextChange && onTextChange(convertToRaw(context.editorState.getCurrentContent()));
                }}
                onBlur={() => editor.current?.blur()}
                readOnly={readonly}
            />
        </div>
    );
};
