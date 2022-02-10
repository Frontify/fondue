/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BalloonToolbar,
    createAlignPlugin,
    createBlockquotePlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createHeadingPlugin,
    createItalicPlugin,
    createLinkPlugin,
    createListPlugin,
    createParagraphPlugin,
    createPlateUI,
    createPlugins,
    createSoftBreakPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    Plate,
} from "@udecode/plate";
import { debounce } from "@utilities/debounce";
import React, { FC } from "react";
import { EditableProps } from "slate-react/dist/components/editable";
import { ListItemElement } from "./components/elements/li";
import { ListContentElement } from "./components/elements/lic";
import { OrderedListElement } from "./components/elements/ol";
import { ParagraphElement } from "./components/elements/paragraph";
import { UnorderedListElement } from "./components/elements/ul";
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
        [ELEMENT_PARAGRAPH]: ParagraphElement,
        [ELEMENT_UL]: UnorderedListElement,
        [ELEMENT_OL]: OrderedListElement,
        [ELEMENT_LI]: ListItemElement,
        [ELEMENT_LIC]: ListContentElement,
        // [ELEMENT_LINK]: LinkMark,
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
            createBlockquotePlugin(),
            createCodeBlockPlugin(),
            createHeadingPlugin(),
            createListPlugin(),
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
        <div data-test-id="rich-text-editor" className="tw-relative">
            <Plate
                initialValue={initialValue}
                onChange={debounce((value) => onTextChange && onTextChange(value), ON_SAVE_DELAY_IN_MS)}
                editableProps={editableProps}
                plugins={plugins}
            >
                <BalloonToolbar arrow={true} theme={"light"}>
                    <Toolbar />
                </BalloonToolbar>
            </Plate>
        </div>
    );
};
