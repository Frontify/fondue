/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BalloonToolbar,
    createAlignPlugin,
    createBlockquotePlugin,
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
    ELEMENT_PARAGRAPH,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    Plate,
    StyledElement,
    withProps,
} from "@udecode/plate";
import { debounce } from "@utilities/debounce";
import React, { FC } from "react";
import { EditableProps } from "slate-react/dist/components/editable";
import { BoldMark } from "./components/marks/bold";
import { ItalicMark } from "./components/marks/italic";
import { StrikethroughMark } from "./components/marks/strikethrough";
import { UnderlineMark } from "./components/marks/underline";
import { Toolbar } from "./Toolbar";

export type RichTextEditorProps = {
    placeholder?: string;
    value?: any;
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
    onTextChange,
}) => {
    const editableProps: EditableProps = {
        placeholder: placeholder,
        readOnly: readonly,
    };

    const components = createPlateUI({
        // this will override the components over the default ones
        [MARK_BOLD]: BoldMark,
        [MARK_ITALIC]: ItalicMark,
        [MARK_UNDERLINE]: UnderlineMark,
        [MARK_STRIKETHROUGH]: StrikethroughMark,
    });

    const plugins = createPlugins(
        [
            createSoftBreakPlugin(),
            createAlignPlugin(),
            createParagraphPlugin({
                component: withProps(StyledElement, {
                    as: "div",
                    styles: {
                        root: {
                            margin: 0,
                            padding: "4px 0",
                        },
                    },
                }),
            }),
            createBlockquotePlugin(),
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
                initialValue={initialValue}
                onChange={debounce((value) => {
                    console.log(value);
                    return onTextChange && onTextChange(value);
                }, ON_SAVE_DELAY_IN_MS)}
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
                    // classNames={{ root: "tw-drop-shadow-md" }}
                >
                    <Toolbar />
                </BalloonToolbar>
            </Plate>
        </div>
    );
};
