/* (c) Copyright Frontify Ltd., all rights reserved. */

import { debounce } from "@utilities/debounce";
import { useMachine } from "@xstate/react";
import React, { FC, useCallback, useMemo, useState } from "react";
import { BaseEditor, createEditor, Descendant, Editor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { BlockStyles, BlockStyleTypes } from "./BlockStyles";
import { ToolbarContext } from "./context/toolbar";
import { InlineStyles, Styles as InlineStyleTypes } from "./InlineStyles";
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
    type: BlockStyleTypes;
    children: FormattedText[];
};

export type FormattedText = {
    text: string;
} & {
    [key in InlineStyleTypes]?: true;
};

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: BlockElement;
        Text: FormattedText;
    }
}

const TOOLBAR_DELAY_IN_MS = 200;
const isModifyingKey = (key: string) => !["Alt", "Control", "Meta", "Shift"].includes(key);

export const RichTextEditor: FC<RichTextEditorProps> = ({
    value: initialValue,
    placeholder = "",
    readonly = false,
}) => {
    const [value, setValue] = useState<Descendant[]>(
        initialValue ?? [
            {
                type: BlockStyleTypes.Paragraph,
                children: [{ text: "" }],
            },
        ],
    );
    const editor = useMemo(() => withReact(withHistory(createEditor())), []);
    const [{ matches, children }, send] = useMachine(editorMachine);

    const onTextSelected = useCallback(
        debounce(
            () =>
                editor.selection &&
                send("TEXT_SELECTED", {
                    data: { selectedText: Editor.string(editor, editor.selection) },
                }),
            TOOLBAR_DELAY_IN_MS,
        ),
        [editor],
    );

    return (
        <div data-test-id="rich-text-editor">
            <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
                <Editable
                    placeholder={placeholder}
                    onFocus={() => send("FOCUSED")}
                    readOnly={readonly}
                    onKeyUp={onTextSelected}
                    onKeyDown={(e) => isModifyingKey(e.key) && send("TEXT_DESELECTED")}
                    onMouseUp={onTextSelected}
                    onMouseDown={() => {
                        // force deselection, since the editor will return the last selection onMouseUp
                        Transforms.deselect(editor);
                        send("TEXT_DESELECTED");
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
                    onBlur={() => send("BLUR")}
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
