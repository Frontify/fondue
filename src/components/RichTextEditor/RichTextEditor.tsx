/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BalloonToolbar,
    createAlignPlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createHeadingPlugin,
    createIndentListPlugin,
    createIndentPlugin,
    createItalicPlugin,
    createLinkPlugin,
    createParagraphPlugin,
    createPlateUI,
    createPlugins,
    createSoftBreakPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
    ELEMENT_H1,
    ELEMENT_LINK,
    ELEMENT_PARAGRAPH,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    Plate,
    usePlateEditorRef,
} from "@udecode/plate";
import { debounce } from "@utilities/debounce";
import React, { FC, useEffect } from "react";
import { EditableProps } from "slate-react/dist/components/editable";
import { LinkElement } from "./components/elements/link";
import { BoldMark } from "./components/marks/bold";
import { ItalicMark } from "./components/marks/italic";
import { StrikethroughMark } from "./components/marks/strikethrough";
import { UnderlineMark } from "./components/marks/underline";
import { Toolbar } from "./Toolbar";
import { clearEditor } from "./utils/clearEditor";

export type RichTextEditorProps = {
    placeholder?: string;
    value?: any;
    onTextChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    readonly?: boolean;
    clear?: boolean;
};

export const ON_SAVE_DELAY_IN_MS = 500;
export const RTE_ID = "plate-rich-text-editor";

export const RichTextEditor: FC<RichTextEditorProps> = ({
    value: initialValue,
    placeholder = "",
    readonly = false,
    clear = false,
    onTextChange,
}) => {
    const editor = usePlateEditorRef();

    const editableProps: EditableProps = {
        placeholder: placeholder,
        readOnly: readonly,
    };

    useEffect(() => {
        if (clear && editor) {
            clearEditor(editor);
        }
    }, [clear]);

    const components = createPlateUI({
        // this will override the components over the default ones
        [ELEMENT_LINK]: LinkElement,
        [MARK_BOLD]: BoldMark,
        [MARK_ITALIC]: ItalicMark,
        [MARK_UNDERLINE]: UnderlineMark,
        [MARK_STRIKETHROUGH]: StrikethroughMark,
    });

    const plugins = createPlugins(
        [
            createSoftBreakPlugin(),
            createAlignPlugin(),
            createParagraphPlugin(),
            createCodeBlockPlugin(),
            createHeadingPlugin(),
            createIndentListPlugin(),
            createIndentPlugin({
                inject: {
                    props: {
                        validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1],
                    },
                },
            }),
            createLinkPlugin(),
            createBoldPlugin(),
            createItalicPlugin(),
            createUnderlinePlugin(),
            createStrikethroughPlugin(),
            createCodePlugin(),
        ],
        {
            components,
        },
    );

    return (
        <div data-test-id="rich-text-editor" className="tw-relative tw-w-full">
            <Plate
                id={RTE_ID}
                initialValue={initialValue}
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
                    classNames={{ root: "tw-drop-shadow-md" }}
                >
                    <Toolbar />
                </BalloonToolbar>
            </Plate>
        </div>
    );
};
