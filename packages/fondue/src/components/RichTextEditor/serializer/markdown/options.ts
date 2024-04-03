/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH } from '@udecode/plate-basic-marks';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { type PlateEditor, getPluginType } from '@udecode/plate-core';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_MENTION } from '@udecode/plate-mention';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { TextStyles } from '@components/RichTextEditor/Plugins';

import { type PartialOptionType } from './types';

export const options = (editor: PlateEditor): PartialOptionType => ({
    nodeTypes: {
        paragraph: getPluginType(editor, ELEMENT_PARAGRAPH),
        link: getPluginType(editor, ELEMENT_LINK),
        blockQuote: getPluginType(editor, TextStyles.quote),
        inlineCodeMark: getPluginType(editor, MARK_CODE),
        strongMark: getPluginType(editor, MARK_BOLD),
        emphasisMark: getPluginType(editor, MARK_ITALIC),
        deleteMark: getPluginType(editor, MARK_STRIKETHROUGH),
        image: getPluginType(editor, 'img'),
        codeBlock: getPluginType(editor, ELEMENT_CODE_BLOCK),
        thematicBreak: getPluginType(editor, 'hr'),
        ulList: getPluginType(editor, ELEMENT_UL),
        olList: getPluginType(editor, ELEMENT_OL),
        listItem: getPluginType(editor, ELEMENT_LI),
        listItemChild: getPluginType(editor, ELEMENT_LIC),
        heading: {
            1: getPluginType(editor, TextStyles.heading1),
            2: getPluginType(editor, TextStyles.heading2),
            3: getPluginType(editor, TextStyles.heading3),
            4: getPluginType(editor, TextStyles.heading4),
            5: getPluginType(editor, 'h5'),
            6: getPluginType(editor, 'h6'),
        },
        mention: getPluginType(editor, ELEMENT_MENTION),
    },
    linkDestinationKey: 'url',
});
