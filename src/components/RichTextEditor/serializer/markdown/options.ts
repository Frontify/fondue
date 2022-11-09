/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/TextStyles';
import {
    ELEMENT_CODE_BLOCK,
    ELEMENT_H5,
    ELEMENT_H6,
    ELEMENT_HR,
    ELEMENT_IMAGE,
    ELEMENT_LI,
    ELEMENT_LINK,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    PlateEditor,
    getPluginType,
} from '@udecode/plate';
import { PartialOptionType } from './types';

export const options = (editor: PlateEditor): PartialOptionType => ({
    nodeTypes: {
        paragraph: getPluginType(editor, ELEMENT_PARAGRAPH),
        link: getPluginType(editor, ELEMENT_LINK),
        block_quote: getPluginType(editor, TextStyles.ELEMENT_QUOTE),
        inline_code_mark: getPluginType(editor, MARK_CODE),
        strong_mark: getPluginType(editor, MARK_BOLD),
        emphasis_mark: getPluginType(editor, MARK_ITALIC),
        delete_mark: getPluginType(editor, MARK_STRIKETHROUGH),
        image: getPluginType(editor, ELEMENT_IMAGE),
        code_block: getPluginType(editor, ELEMENT_CODE_BLOCK),
        thematic_break: getPluginType(editor, ELEMENT_HR),
        ul_list: getPluginType(editor, ELEMENT_UL),
        ol_list: getPluginType(editor, ELEMENT_OL),
        listItem: getPluginType(editor, ELEMENT_LI),
        heading: {
            1: getPluginType(editor, TextStyles.ELEMENT_HEADING1),
            2: getPluginType(editor, TextStyles.ELEMENT_HEADING2),
            3: getPluginType(editor, TextStyles.ELEMENT_HEADING3),
            4: getPluginType(editor, TextStyles.ELEMENT_HEADING4),
            5: getPluginType(editor, ELEMENT_H5),
            6: getPluginType(editor, ELEMENT_H6),
        },
    },
    linkDestinationKey: 'url',
});
