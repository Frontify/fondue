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
    createParagraphPlugin,
    createPlateUI,
    createPlateUIEditor,
    createPlugins,
    createSoftBreakPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
    deserializeHtml,
    ELEMENT_H1,
    ELEMENT_LINK,
    ELEMENT_PARAGRAPH,
    LinkElement,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    parseHtmlDocument,
    TDescendant,
} from "@udecode/plate";
import { BoldMark } from "../components/marks/bold";
import { ItalicMark } from "../components/marks/italic";
import { StrikethroughMark } from "../components/marks/strikethrough";
import { UnderlineMark } from "../components/marks/underline";

export const EMPTY_VALUE: TDescendant[] = [{ type: ELEMENT_PARAGRAPH, children: [{ text: "" }] }];

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

export const parseRawValue = (raw?: string): TDescendant[] => {
    console.log({ raw });

    let parsedValue = EMPTY_VALUE;

    if (!raw) {
        return parsedValue;
    }

    try {
        parsedValue = JSON.parse(raw);
    } catch {
        const editor = createPlateUIEditor({ plugins: plugins });
        const document = parseHtmlDocument(raw);
        console.log({ document });
        const parsedHtml = deserializeHtml(editor, {
            element: document.body,
            stripWhitespace: true,
        });
        console.log({ parsedHtml });
        if (parsedHtml) {
            parsedValue = parsedHtml;
        }
    }

    return parsedValue;
};
