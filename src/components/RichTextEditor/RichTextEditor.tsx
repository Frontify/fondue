/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMachine } from "@xstate/react";
import React, { FC, useCallback, useState } from "react";
import { BaseEditor, createEditor, Descendant, Editor } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { BlockStyles } from "./BlockStyles";
import { ToolbarContext } from "./context/toolbar";
import { InlineStyles } from "./InlineStyles";
import { editorMachine, States } from "./state/editor/machine";
import { ToolbarContext as ToolbarFSMContext, ToolbarData } from "./state/toolbar/machine";
import { Toolbar } from "./Toolbar";

export type RichTextEditorProps = {
    placeholder?: string;
    value?: BlockElement[];
    onTextChange?: (value: string) => void;
    readonly?: boolean;
};

export type BlockElement = {
    type: "paragraph" | "code" | "unordered-list-item" | "ordered-list-item";
    children: FormattedText[];
};
export type FormattedText = { text: string; bold?: true; italic?: true; strikethrough?: true };
declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: BlockElement;
        Text: FormattedText;
    }
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
    value: initialValue,
    placeholder = "",
    readonly = false,
}) => {
    const [value, setValue] = useState<Descendant[]>(
        initialValue ?? [
            {
                type: "paragraph",
                children: [{ text: placeholder }],
            },
        ],
    );
    const [editor] = useState(() => withReact(createEditor()));
    const [{ matches, children }, send] = useMachine(editorMachine);

    return (
        <div data-test-id="rich-text-editor">
            <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
                <Editable
                    onFocus={() => send("FOCUSED")}
                    readOnly={readonly}
                    onSelect={() => {
                        if (editor.selection) {
                            send("TEXT_SELECTED", { data: { selectedText: Editor.string(editor, editor.selection) } });
                        }
                    }}
                    renderLeaf={useCallback(
                        (props) => (
                            <InlineStyles {...props} />
                        ),
                        [],
                    )}
                    renderElement={useCallback(
                        (props) => (
                            <BlockStyles {...props} />
                        ),
                        [],
                    )}
                />
                {matches(States.Styling) && (
                    <ToolbarContext.Provider
                        value={{
                            machineRef: children.toolbar as Interpreter<
                                ToolbarFSMContext,
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                any,
                                DoneInvokeEvent<ToolbarData>
                            >,
                        }}
                    >
                        <Toolbar />
                    </ToolbarContext.Provider>
                )}
            </Slate>
        </div>
    );
};
