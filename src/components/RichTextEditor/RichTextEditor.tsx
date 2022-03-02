/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plate, PlateProvider, usePlateEditorState } from "@udecode/plate";
import React, { FC, FocusEvent, useEffect } from "react";
import { EditableProps } from "slate-react/dist/components/editable";
import { Toolbar } from "./Toolbar";
import { getEditorConfig } from "./utils/getEditorConfig";
import { TextStyleType } from "./utils/getTextStyles";
import { EMPTY_VALUE, parseRawValue } from "./utils/parseRawValue";

export type RichTextEditorProps = {
    placeholder?: string;
    value?: string;
    onTextChange?: (value: string) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
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
    const editableProps: EditableProps = {
        placeholder: placeholder,
        readOnly: readonly,
        onBlur,
    };

    useEffect(() => {
        if (clear && editor) {
            const point = { path: [0, 0], offset: 0 };
            editor.selection = { anchor: point, focus: point };
            editor.history = { redos: [], undos: [] };
            editor.children = EMPTY_VALUE;
        }
    }, [clear]);

    return (
        <div data-test-id="rich-text-editor" className="tw-relative tw-w-full">
            <Plate
                initialValue={parseRawValue(initialValue)}
                onChange={(value) => onTextChange && onTextChange(JSON.stringify(value))}
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
