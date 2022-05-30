/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    createAlignPlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createIndentPlugin,
    createItalicPlugin,
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
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
} from '@udecode/plate';
import {
    BoldMark,
    ChosenLinkElement,
    CodeMark,
    Custom1Element,
    Custom2Element,
    Heading1Element,
    Heading2Element,
    Heading3Element,
    Heading4Element,
    ItalicMark,
    ListItemContentElement,
    ListItemElement,
    OrderedListElement,
    StrikethroughMark,
    UnderlineMark,
    UnorderedListElement,
} from '../components';
import { createCheckboxListPlugin, ELEMENT_CHECK_ITEM } from '../plugins/checkboxListPlugin/createCheckboxListPlugin';
import { createLinkChooserPlugin } from '../plugins/linkChooserPlugin/createLinkChooserPlugin';
import { TextStyles, TextStyleType } from './getTextStyles';

export const getEditorConfig = (textStyles?: TextStyleType[]) => {
    const createHeading1Plugin = createPluginFactory({
        key: TextStyles.ELEMENT_HEADING1,
        isElement: true,
        component: Heading1Element,
        deserializeHtml: {
            rules: [{ validNodeName: ['h1', 'H1'] }],
        },
        props: { textStyles },
    });

    const createHeading2Plugin = createPluginFactory({
        key: TextStyles.ELEMENT_HEADING2,
        isElement: true,
        component: Heading2Element,
        deserializeHtml: {
            rules: [{ validNodeName: ['h2', 'H2'] }],
        },
        props: { textStyles },
    });

    const createHeading3Plugin = createPluginFactory({
        key: TextStyles.ELEMENT_HEADING3,
        isElement: true,
        component: Heading3Element,
        deserializeHtml: {
            rules: [{ validNodeName: ['h3', 'H3'] }],
        },
        props: { textStyles },
    });

    const createHeading4Plugin = createPluginFactory({
        key: TextStyles.ELEMENT_HEADING4,
        isElement: true,
        component: Heading4Element,
        deserializeHtml: {
            rules: [{ validNodeName: ['h4', 'H4'] }],
        },
        props: { textStyles },
    });

    const createCustom1Plugin = createPluginFactory({
        key: TextStyles.ELEMENT_CUSTOM1,
        isElement: true,
        component: Custom1Element,
        props: { textStyles },
    });

    const createCustom2Plugin = createPluginFactory({
        key: TextStyles.ELEMENT_CUSTOM2,
        isElement: true,
        component: Custom2Element,
        props: { textStyles },
    });

    const components = createPlateUI({
        // this will override the components over the default ones
        [ELEMENT_LINK]: ChosenLinkElement,
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
            createLinkChooserPlugin(),
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
        ],
        {
            components,
        },
    );
};
