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
import { ListItemMarkupElementNode } from '../Plugins/ListPlugin/ListItemMarkupElement';
import { ListItemContentMarkupElementNode } from '../Plugins/ListPlugin/ListItemContentMarkupElement';
import { LinkMarkupElementNode } from '../Plugins/LinkPlugin/LinkMarkupElement/LinkMarkupElementNode';
import { ELEMENT_CHECK_ITEM } from '../Plugins/CheckboxListPlugin/id';
import { UnderlineMarkupElementNode } from '../Plugins/UnderlinePlugin/UnderlineMarkupElement';
import { OrderedListMarkupElementNode } from '../Plugins/ListPlugin/OrderedListPlugin/OrderedListMarkupElement';
import { UnorderedListMarkupElementNode } from '../Plugins/ListPlugin/UnorderedListPlugin/UnorderedListMarkupElement';
import { StrikethroughMarkupElementNode } from '../Plugins/StrikethroughPlugin/StrikethroughMarkupElement';
import { BoldMarkupElementNode } from '../Plugins/BoldPlugin/BoldMarkupElement';
import { CodeMarkupElementNode } from '../Plugins/CodePlugin/CodeMarkupElement';
import { ItalicMarkupElementNode } from '../Plugins/ItalicPlugin/ItalicMarkupElement';
import { createCheckboxListPlugin } from '../Plugins/CheckboxListPlugin/index';
import { CheckboxListElementNode } from '../Plugins/CheckboxListPlugin/CheckboxListElement';
import { createLinkPlugin } from '../Plugins/LinkPlugin';
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
} from '../Plugins/TextStylePlugin/TextStyles';
import { ButtonMarkupElementNode } from '../Plugins/ButtonPlugin/ButtonMarkupElement/ButtonMarkupElementNode';
import { ELEMENT_BUTTON, createButtonPlugin } from '../Plugins/ButtonPlugin/createButtonPlugin';

export const getEditorConfig = () => {
    const components = createPlateUI({
        // this will override the components over the default ones
        [ELEMENT_LINK]: LinkMarkupElementNode,
        [ELEMENT_UL]: UnorderedListMarkupElementNode,
        [ELEMENT_OL]: OrderedListMarkupElementNode,
        [ELEMENT_LI]: ListItemMarkupElementNode,
        [ELEMENT_LIC]: ListItemContentMarkupElementNode,
        [MARK_BOLD]: BoldMarkupElementNode,
        [MARK_ITALIC]: ItalicMarkupElementNode,
        [MARK_UNDERLINE]: UnderlineMarkupElementNode,
        [MARK_STRIKETHROUGH]: StrikethroughMarkupElementNode,
        [MARK_CODE]: CodeMarkupElementNode,
        [ELEMENT_CHECK_ITEM]: CheckboxListElementNode,
        [ELEMENT_BUTTON]: ButtonMarkupElementNode,
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
            createButtonPlugin(),
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
