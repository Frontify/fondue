/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from "@hooks/useMemoizedId";
import { Plate, TNode, usePlateEditorState } from "@udecode/plate";
import { debounce } from "@utilities/debounce";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { EditableProps } from "slate-react/dist/components/editable";
import { Toolbar } from "./Toolbar";
import { getEditorConfig } from "./utils/getEditorConfig";
import { TextStyleType } from "./utils/getTextStyles";
import { EMPTY_RICH_TEXT_VALUE, parseRawValue } from "./utils/parseRawValue";

export type RichTextEditorProps = {
    id?: string;
    placeholder?: string;
    value?: string;
    onTextChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    readonly?: boolean;
    clear?: boolean;
    textStyles?: TextStyleType[];
};

export const ON_SAVE_DELAY_IN_MS = 500;

export const RichTextEditor: FC<RichTextEditorProps> = ({
    id,
    value: initialValue,
    placeholder = "",
    readonly = false,
    clear = false,
    textStyles,
    onTextChange,
    onBlur,
}) => {
    const editorId = id || useMemoizedId();
    const editor = usePlateEditorState(editorId);
    const localValue = useRef<TNode[] | null>(null);
    const [debouncedValue, setDebouncedValue] = useState<TNode[] | null>(null);
    const editableProps: EditableProps = {
        placeholder: placeholder,
        readOnly: readonly,
        onBlur: () => onBlur && onBlur(JSON.stringify(localValue.current)),
    };

    useEffect(() => {
        debouncedValue && onTextChange && onTextChange(JSON.stringify(debouncedValue));
    }, [debouncedValue]);

    useEffect(() => {
        if (clear && editor) {
            const point = { path: [0, 0], offset: 0 };
            editor.selection = { anchor: point, focus: point };
            editor.history = { redos: [], undos: [] };
            editor.children = EMPTY_RICH_TEXT_VALUE;
            localValue.current = EMPTY_RICH_TEXT_VALUE;
        }
    }, [clear]);

    const debouncedOnChange = useCallback(
        debounce((value: TNode[]) => {
            setDebouncedValue(value);
        }, ON_SAVE_DELAY_IN_MS),
        [],
    );

    const onChange = useCallback((value) => {
        debouncedOnChange(value);
        localValue.current = value;
    }, []);

    return (
        <div data-test-id="rich-text-editor" className="tw-relative tw-w-full">
            <Plate
                id={editorId}
                initialValue={parseRawValue(initialValue)}
                onChange={onChange}
                editableProps={editableProps}
                plugins={getEditorConfig(textStyles)}
            >
                <Toolbar editorId={editorId} textStyles={textStyles} />
            </Plate>
        </div>
    );
};
