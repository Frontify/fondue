/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    createAlignPlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createIndentPlugin,
    createItalicPlugin,
    createListPlugin,
    createParagraphPlugin,
    createPlateUI,
    createPlugins,
    createSoftBreakPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
} from '@udecode/plate';
import {
    BoldMark,
    CodeMark,
    ItalicMark,
    LinkMarkupElementNode,
    ListItemContentElement,
    ListItemElement,
    OrderedListElement,
    StrikethroughMark,
    UnderlineMark,
    UnorderedListElement,
} from '../components';
import { createCheckboxListPlugin } from '../EditorActions/Plugins/CheckboxListPlugin/index';
import { ELEMENT_CHECK_ITEM } from '../EditorActions/Plugins/CheckboxListPlugin/id';
import { CheckboxListElementNode } from '../EditorActions/Plugins/CheckboxListPlugin/CheckboxListElement';
import { createLinkPlugin } from '../EditorActions/Plugins/LinkPlugin';
import {
    TextStyles,
    createCustom1Plugin,
    createCustom2Plugin,
    createCustom3Plugin,
    createHeading1Plugin,
    createHeading2Plugin,
    createHeading3Plugin,
    createHeading4Plugin,
    createQuotePlugin,
} from '../EditorActions/Plugins/TextStylePlugin/TextStyles';

export const getEditorConfig = () => {
    const components = createPlateUI({
        // this will override the components over the default ones
        [ELEMENT_LINK]: LinkMarkupElementNode,
        [ELEMENT_UL]: UnorderedListElement,
        [ELEMENT_OL]: OrderedListElement,
        [ELEMENT_LI]: ListItemElement,
        [ELEMENT_LIC]: ListItemContentElement,
        [MARK_BOLD]: BoldMark,
        [MARK_ITALIC]: ItalicMark,
        [MARK_UNDERLINE]: UnderlineMark,
        [MARK_STRIKETHROUGH]: StrikethroughMark,
        [MARK_CODE]: CodeMark,
        [ELEMENT_CHECK_ITEM]: CheckboxListElementNode,
    });

    return createPlugins(
        [
            createSoftBreakPlugin(),
            createAlignPlugin({
                inject: {
                    props: {
                        validTypes: [
                            ELEMENT_PARAGRAPH,
                            TextStyles.ELEMENT_HEADING1,
                            TextStyles.ELEMENT_HEADING2,
                            TextStyles.ELEMENT_HEADING3,
                            TextStyles.ELEMENT_HEADING4,
                            TextStyles.ELEMENT_CUSTOM1,
                            TextStyles.ELEMENT_CUSTOM2,
                            TextStyles.ELEMENT_CUSTOM3,
                            TextStyles.ELEMENT_QUOTE,
                        ],
                    },
                },
            }),
            createIndentPlugin({
                inject: {
                    props: {
                        validTypes: [ELEMENT_CHECK_ITEM],
                    },
                },
            }),
            createParagraphPlugin(),
            createCodeBlockPlugin(),
            createListPlugin(),
            createCheckboxListPlugin(),
            createLinkPlugin(),
            createBoldPlugin(),
            createItalicPlugin(),
            createUnderlinePlugin(),
            createStrikethroughPlugin(),
            createCodePlugin(),
            createHeading1Plugin(),
            createHeading2Plugin(),
            createHeading3Plugin(),
            createHeading4Plugin(),
            createCustom1Plugin(),
            createCustom2Plugin(),
            createCustom3Plugin(),
            createQuotePlugin(),
        ],
        {
            components,
        },
    );
};
