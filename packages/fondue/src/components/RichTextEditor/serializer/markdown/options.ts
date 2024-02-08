/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, getPluginType } from '@udecode/plate-core';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH } from '@udecode/plate-basic-marks';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_MENTION } from '@udecode/plate-mention';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_IMAGE } from '@udecode/plate-media';
import { ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { PartialOptionType } from './types';
import { TextStyles } from '@components/RichTextEditor/Plugins';

export const options = (editor: PlateEditor): PartialOptionType => ({
    nodeTypes: {
        paragraph: getPluginType(editor, ELEMENT_PARAGRAPH),
        link: getPluginType(editor, ELEMENT_LINK),
        blockQuote: getPluginType(editor, TextStyles.quote),
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
            1: getPluginType(editor, TextStyles.heading1),
            2: getPluginType(editor, TextStyles.heading2),
            3: getPluginType(editor, TextStyles.heading3),
            4: getPluginType(editor, TextStyles.heading4),
            5: getPluginType(editor, ELEMENT_H5),
            6: getPluginType(editor, ELEMENT_H6),
        },
        mention: getPluginType(editor, ELEMENT_MENTION),
    },
    linkDestinationKey: 'url',
});
