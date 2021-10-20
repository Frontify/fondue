/* (c) Copyright Frontify Ltd., all rights reserved. */

import { debounce } from "@utilities/debounce";
import { useMachine } from "@xstate/react";
import { convertFromRaw, Editor, EditorState, RawDraftContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { FC, useMemo, useRef } from "react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { ToolbarContext } from "./context/toolbar";
import { decorators } from "./decorators";
import { editorMachine, States } from "./state/editor/machine";
import { ToolbarContext as ToolbarFSMContext, ToolbarStateData } from "./state/toolbar/machine";
import { styleMap } from "./styleMap";
import { Toolbar } from "./Toolbar";

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
    const [{ context, matches, children }, send] = useMachine(
        editorMachine.withContext({
            locked: readonly,
            editorState: value
                ? EditorState.createWithContent(convertFromRaw(value), decorators)
                : EditorState.createEmpty(decorators),
            onContentChanged: onTextChange,
        }),
    );

    return (
        <div onFocus={() => send("FOCUSED")}>
            {useMemo(
                () => (
                    <Editor
                        ref={editor}
                        customStyleMap={styleMap}
                        editorState={context.editorState}
                        placeholder={placeholder}
                        onChange={debounce((editorState) => send("CHANGED", { data: { editorState } }), 50)}
                        onBlur={() => editor.current?.blur()}
                        readOnly={readonly}
                    />
                ),
                [context.editorState],
            )}
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
