/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    createAlignPlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createHeadingPlugin,
    createItalicPlugin,
    createLinkPlugin,
    createListPlugin,
    createParagraphPlugin,
    createPlateUI,
    createPluginFactory,
    createPlugins,
    createSoftBreakPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_OL,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
} from "@udecode/plate";
import {
    BoldMark,
    CodeMark,
    Custom1Element,
    ItalicMark,
    LinkElement,
    ListItemContentElement,
    ListItemElement,
    OrderedListElement,
    StrikethroughMark,
    UnderlineMark,
    UnorderedListElement,
} from "./components";

export const ELEMENT_CUSTOM1 = "custom1";

const createCustom1Plugin = createPluginFactory({
    key: ELEMENT_CUSTOM1,
    isElement: true,
    component: Custom1Element,
});

const components = createPlateUI({
    // this will override the components over the default ones
    [ELEMENT_LINK]: LinkElement,
    [ELEMENT_UL]: UnorderedListElement,
    [ELEMENT_OL]: OrderedListElement,
    [ELEMENT_LI]: ListItemElement,
    [ELEMENT_LIC]: ListItemContentElement,
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
        createLinkPlugin(),
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createCodePlugin(),
        createCustom1Plugin(),
    ],
    {
        components,
    },
);
