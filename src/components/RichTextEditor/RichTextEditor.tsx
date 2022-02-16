/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BalloonToolbar, Plate } from "@udecode/plate";
import { debounce } from "@utilities/debounce";
import React, { FC, useEffect } from "react";
import { EditableProps } from "slate-react/dist/components/editable";
import { plugins } from "./config";
import { Toolbar } from "./Toolbar";
import { clearEditor } from "./utils/clearEditor";
import { parseRawValue } from "./utils/parseRawValue";

export type RichTextEditorProps = {
    placeholder?: string;
    value?: string;
    onTextChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    readonly?: boolean;
    clear?: boolean;
};

export const ON_SAVE_DELAY_IN_MS = 500;

export const RichTextEditor: FC<RichTextEditorProps> = ({
    value: initialValue,
    placeholder = "",
    readonly = false,
    clear = false,
    onTextChange,
}) => {
    const editableProps: EditableProps = {
        placeholder: placeholder,
        readOnly: readonly,
    };

    useEffect(() => {
        if (clear) {
            clearEditor();
        }
    }, [clear]);

    return (
        <div data-test-id="rich-text-editor" className="tw-relative tw-w-full">
            <Plate
                initialValue={parseRawValue(initialValue)}
                onChange={debounce((value) => onTextChange && onTextChange(value), ON_SAVE_DELAY_IN_MS)}
                editableProps={editableProps}
                plugins={plugins}
            >
                <BalloonToolbar
                    arrow={true}
                    theme={"light"}
                    popperOptions={{
                        modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
                    }}
                    styles={{ root: { border: "none", background: "#ffffff" } }}
                    //classNames={{ root: "tw-drop-shadow-md" }}
                >
                    <Toolbar />
                </BalloonToolbar>
            </Plate>
        </div>
    );
};
