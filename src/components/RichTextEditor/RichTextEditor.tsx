/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from "@hooks/useMemoizedId";
import { createPlateEditor, Plate, TNode } from "@udecode/plate";
import { debounce } from "@utilities/debounce";
import React, { FC, useCallback, useEffect, useState } from "react";
import { EditableProps } from "slate-react/dist/components/editable";
import { Toolbar } from "./Toolbar";
import { getEditorConfig } from "./utils/getEditorConfig";
import { TextStyleType } from "./utils/getTextStyles";
import { EMPTY_VALUE, parseRawValue } from "./utils/parseRawValue";

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
    const editor = createPlateEditor({ plugins: getEditorConfig() });
    const [debouncedValue, setDebouncedValue] = useState<TNode[] | null>(null);
    const editableProps: EditableProps = {
        placeholder: placeholder,
        readOnly: readonly,
        onBlur: () => onBlur && onBlur(JSON.stringify(debouncedValue)),
    };

    useEffect(() => {
        debouncedValue && onTextChange && onTextChange(JSON.stringify(debouncedValue));
    }, [debouncedValue]);

    useEffect(() => {
        if (clear && editor) {
            const point = { path: [0, 0], offset: 0 };
            editor.selection = { anchor: point, focus: point };
            editor.history = { redos: [], undos: [] };
            editor.children = EMPTY_VALUE;
        }
    }, [clear]);

    const onChange = useCallback(
        debounce((value: TNode[]) => setDebouncedValue(value), ON_SAVE_DELAY_IN_MS),
        [],
    );

    return (
        <div data-test-id="rich-text-editor" className="tw-relative tw-w-full">
            <Plate
                id={editorId}
                editor={editor}
                initialValue={parseRawValue(editor, initialValue)}
                onChange={onChange}
                editableProps={editableProps}
                plugins={getEditorConfig(textStyles)}
            >
                <Toolbar editorId={editorId} textStyles={textStyles} />
            </Plate>
        </div>
    );
};
