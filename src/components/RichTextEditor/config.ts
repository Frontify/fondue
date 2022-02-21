/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    createAlignPlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createHeadingPlugin,
    createIndentListPlugin,
    createIndentPlugin,
    createItalicPlugin,
    createLinkPlugin,
    createListPlugin,
    createParagraphPlugin,
    createPlateUI,
    createPlugins,
    createSoftBreakPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
    ELEMENT_H1,
    ELEMENT_LINK,
    ELEMENT_PARAGRAPH,
    LinkElement,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
} from "@udecode/plate";
import { BoldMark } from "./components/marks/bold";
import { CodeMark } from "./components/marks/code";
import { ItalicMark } from "./components/marks/italic";
import { StrikethroughMark } from "./components/marks/strikethrough";
import { UnderlineMark } from "./components/marks/underline";

const components = createPlateUI({
    // this will override the components over the default ones
    [ELEMENT_LINK]: LinkElement,
    [MARK_BOLD]: BoldMark,
    [MARK_ITALIC]: ItalicMark,
    [MARK_UNDERLINE]: UnderlineMark,
    [MARK_STRIKETHROUGH]: StrikethroughMark,
    [MARK_CODE]: CodeMark,
});

export const plugins = createPlugins(
    [
        createSoftBreakPlugin(),
        createAlignPlugin(),
        createParagraphPlugin(),
        createCodeBlockPlugin(),
        createHeadingPlugin(),
        createListPlugin(),
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
