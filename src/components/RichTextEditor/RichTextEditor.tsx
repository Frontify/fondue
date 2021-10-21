/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMachine } from "@xstate/react";
import { Editor, EditorState, getDefaultKeyBinding, RawDraftContentState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { FC, useRef } from "react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { ToolbarContext } from "./context/toolbar";
import { decorators } from "./decorators";
import { editorMachine, States } from "./state/editor/machine";
import { ToolbarContext as ToolbarFSMContext, ToolbarStateData } from "./state/toolbar/machine";
import { styleMap } from "./styleMap";
import { Toolbar } from "./Toolbar";
import { parseRawContentState, RawContentState } from "./utils/parseRawContentState";

export type RichTextEditorProps = {
    placeholder?: string;
    value?: RawContentState;
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
    const parsedContentState = value ? parseRawContentState(value) : null;
    const [{ context, matches, children }, send] = useMachine(
        editorMachine.withContext({
            locked: readonly,
            editorState: parsedContentState
                ? EditorState.createWithContent(parsedContentState, decorators)
                : EditorState.createEmpty(decorators),
            onContentChanged: onTextChange,
        }),
    );

    return (
        <div onFocus={() => send("FOCUSED")} data-test-id="rich-text-editor">
            <Editor
                ref={editor}
                customStyleMap={styleMap}
                editorState={context.editorState}
                placeholder={placeholder}
                onChange={(editorState) => send({ type: "CHANGE", data: { editorState } })}
                keyBindingFn={(event) => {
                    if (event.code === "Tab") {
                        send({ type: "CHANGE", data: { editorState: RichUtils.onTab(event, context.editorState, 4) } });
                        return "tab";
                    }
                    return getDefaultKeyBinding(event);
                }}
                handleKeyCommand={(command: string, editorState: EditorState) => {
                    const newState = RichUtils.handleKeyCommand(editorState, command);
                    if (newState) {
                        send({ type: "CHANGE", data: { editorState: newState } });
                        return "handled";
                    }
                    return "not-handled";
                }}
                onBlur={() => editor.current?.blur()}
                readOnly={readonly}
            />
            {matches(States.Styling) && (
                <ToolbarContext.Provider
                    value={{
                        machineRef: children.toolbar as Interpreter<
                            ToolbarFSMContext,
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            any,
                            DoneInvokeEvent<ToolbarStateData>
                        >,
                    }}
                >
                    <Toolbar />
                </ToolbarContext.Provider>
            )}
        </div>
    );
};
