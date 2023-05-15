/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_CODE_BLOCK,
    ELEMENT_H5,
    ELEMENT_H6,
    ELEMENT_HR,
    ELEMENT_IMAGE,
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_MENTION,
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
        blockQuote: getPluginType(editor, 'quote'),
        inlineCodeMark: getPluginType(editor, MARK_CODE),
        strongMark: getPluginType(editor, MARK_BOLD),
        emphasisMark: getPluginType(editor, MARK_ITALIC),
        deleteMark: getPluginType(editor, MARK_STRIKETHROUGH),
        image: getPluginType(editor, ELEMENT_IMAGE),
        codeBlock: getPluginType(editor, ELEMENT_CODE_BLOCK),
        thematicBreak: getPluginType(editor, ELEMENT_HR),
        ulList: getPluginType(editor, ELEMENT_UL),
        olList: getPluginType(editor, ELEMENT_OL),
        listItem: getPluginType(editor, ELEMENT_LI),
        listItemChild: getPluginType(editor, ELEMENT_LIC),
        heading: {
            1: getPluginType(editor, 'heading1'),
            2: getPluginType(editor, 'heading2'),
            3: getPluginType(editor, 'heading3'),
            4: getPluginType(editor, 'heading4'),
            5: getPluginType(editor, ELEMENT_H5),
            6: getPluginType(editor, ELEMENT_H6),
        },
        mention: getPluginType(editor, ELEMENT_MENTION),
    },
    linkDestinationKey: 'url',
});
