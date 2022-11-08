/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_BLOCKQUOTE,
    ELEMENT_CODE_BLOCK,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
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
import { PartialOptionType } from './RemarkPlate';

export const options = (editor: PlateEditor): PartialOptionType => ({
    nodeTypes: {
        paragraph: getPluginType(editor, ELEMENT_PARAGRAPH),
        link: getPluginType(editor, ELEMENT_LINK),
        block_quote: getPluginType(editor, ELEMENT_BLOCKQUOTE),
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
            1: getPluginType(editor, ELEMENT_H1),
            2: getPluginType(editor, ELEMENT_H2),
            3: getPluginType(editor, ELEMENT_H3),
            4: getPluginType(editor, ELEMENT_H4),
            5: getPluginType(editor, ELEMENT_H5),
            6: getPluginType(editor, ELEMENT_H6),
        },
    },
    linkDestinationKey: 'url',
});
