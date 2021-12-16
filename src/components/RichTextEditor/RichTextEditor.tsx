/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getMinWidthIfEmpty } from "@components/RichTextEditor/utils/getMinWidthIfEmpty";
import { compose } from "@utilities/compose";
import { debounce } from "@utilities/debounce";
import { useDebounce } from "@utilities/useDebounce";
import { useMachine } from "@xstate/react";
import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BaseEditor, createEditor, Descendant, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { ToolbarContext } from "./context/toolbar";
import { useSoftBreak } from "./hooks/useSoftBreak";
import { withLinks } from "./plugins/withLinks";
import { withLists } from "./plugins/withLists";
import { BlockStyleTypes, renderBlockStyles } from "./renderer/renderBlockStyles";
import { InlineStyles, renderInlineStyles } from "./renderer/renderInlineStyles";
import { editorMachine, States } from "./state/editor/machine";
import { ToolbarContext as ToolbarFSMContext, ToolbarData } from "./state/toolbar/machine";
import { Toolbar } from "./Toolbar";
import { clearEditor } from "./utils/editor/clear";
import { parseRawValue } from "./utils/editor/parseRawContent";

export type RichTextEditorProps = {
    placeholder?: string;
    value?: string;
    onTextChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    readonly?: boolean;
    clear?: boolean;
};

export type BlockElement = {
    type: BlockStyleTypes;
    url?: string;
    children: (FormattedText | BlockElement)[];
};

export type FormattedText = {
    text: string;
} & {
    [key in InlineStyles]?: true;
};

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: BlockElement;
        Text: FormattedText;
    }
}

const TOOLBAR_DELAY_IN_MS = 200;
export const ON_SAVE_DELAY_IN_MS = 500;
const isModifyingKey = (key: string) => !["Alt", "Control", "Meta", "Shift"].includes(key);

export const RichTextEditor: FC<RichTextEditorProps> = ({
    value: initialValue,
    placeholder = "",
    readonly = false,
    clear = false,
    onTextChange,
    onBlur,
}) => {
    const [value, setValue] = useState<Descendant[]>(() => parseRawValue(initialValue));
    const debouncedValue = useDebounce(value, ON_SAVE_DELAY_IN_MS);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [wrapperStyle, setWrapperStyle] = useState<CSSProperties | undefined>({ minWidth: "100%" });

    const withPlugins = compose(withReact, withHistory, withLists, withLinks);
    const editor = useMemo(() => withPlugins(createEditor()), []);
    const softBreakHandler = useSoftBreak(editor);
    const [{ matches, children }, send] = useMachine(() =>
        editorMachine.withContext({ locked: readonly, onTextChange, onBlur }),
    );

    useEffect(() => {
        setWrapperStyle(getMinWidthIfEmpty(editor, placeholder, wrapperRef.current));
    }, []);

    useEffect(() => {
        if (clear) {
            const emptyValue = parseRawValue();
            clearEditor(editor);
            Transforms.insertNodes(editor, emptyValue);
            send("RESET_TEXT");
        }
    }, [clear]);

    useEffect(() => {
        send("SET_LOCKED", { data: { locked: readonly } });
    }, [readonly]);

    useEffect(() => {
        send("TEXT_UPDATED", { data: { value } });
    }, [debouncedValue]);

    const onValueChanged = useCallback(
        (value: Descendant[]): void => {
            setValue(value);
            setWrapperStyle(getMinWidthIfEmpty(editor, placeholder, wrapperRef.current));
        },
        [editor, placeholder, wrapperRef.current],
    );

    const onTextSelected = useCallback(
        debounce(() => send("TEXT_SELECTED", { data: { editor } }), TOOLBAR_DELAY_IN_MS),
        [editor],
    );

    useEffect(() => {
        window.addEventListener("mouseup", onTextSelected);
        return () => window.removeEventListener("mouseup", onTextSelected);
    }, []);

    return (
        <div data-test-id="rich-text-editor" ref={wrapperRef} style={wrapperStyle}>
            <Slate editor={editor} value={value} onChange={onValueChanged}>
                <Editable
                    placeholder={placeholder}
                    onFocus={() => send("FOCUSED")}
                    readOnly={readonly}
                    onKeyUp={onTextSelected}
                    onKeyDown={(e) => {
                        if (isModifyingKey(e.key)) {
                            send("TEXT_DESELECTED");
                        }
                    }}
                    onMouseDown={() => send("TEXT_DESELECTED")}
                    onKeyPress={softBreakHandler}
                    renderLeaf={renderInlineStyles}
                    renderElement={renderBlockStyles}
                    onBlur={() => send("BLUR", { data: { value } })}
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
