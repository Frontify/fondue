/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plate, PlateProvider, TNode, usePlateEditorState } from "@udecode/plate";
import React, { FC, useCallback, useEffect, useState } from "react";
import { EditableProps } from "slate-react/dist/components/editable";
import { debounce } from "../..";
import { Toolbar } from "./Toolbar";
import { getEditorConfig } from "./utils/getEditorConfig";
import { TextStyleType } from "./utils/getTextStyles";
import { EMPTY_VALUE, parseRawValue } from "./utils/parseRawValue";

export type RichTextEditorProps = {
    placeholder?: string;
    value?: string;
    onTextChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    readonly?: boolean;
    clear?: boolean;
    textStyles?: TextStyleType[];
};

export const ON_SAVE_DELAY_IN_MS = 500;

const RichTextEditorComponent: FC<RichTextEditorProps> = ({
    value: initialValue,
    placeholder = "",
    readonly = false,
    clear = false,
    textStyles,
    onTextChange,
    onBlur,
}) => {
    const editor = usePlateEditorState();
    const [debouncedValue, setDebouncedValue] = useState<TNode[]>([]);
    const editableProps: EditableProps = {
        placeholder: placeholder,
        readOnly: readonly,
        onBlur: () => onBlur && onBlur(JSON.stringify(debouncedValue)),
    };

    useEffect(() => {
        onTextChange && onTextChange(JSON.stringify(debouncedValue));
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
                initialValue={parseRawValue(initialValue)}
                onChange={onChange}
                editableProps={editableProps}
                plugins={getEditorConfig(textStyles)}
            >
                <Toolbar textStyles={textStyles} />
            </Plate>
        </div>
    );
};

export const RichTextEditor: FC<RichTextEditorProps> = (props) => (
    <PlateProvider>
        <RichTextEditorComponent {...props} />
    </PlateProvider>
);
