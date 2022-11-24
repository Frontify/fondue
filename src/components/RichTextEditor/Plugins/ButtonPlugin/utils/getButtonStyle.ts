/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, getAboveNode } from '@udecode/plate';
import { ELEMENT_BUTTON } from '../createButtonPlugin';
import { RichTextButtonStyle, TButtonElement } from '../types';

export const getButtonStyle = (editor: PlateEditor): RichTextButtonStyle => {
    const linkNode = getAboveNode<TButtonElement>(editor, { match: { type: ELEMENT_BUTTON } });

    if (!Array.isArray(linkNode)) {
        return 'primary';
    }

    return (linkNode[0]?.buttonStyle as RichTextButtonStyle) || 'primary';
};
