/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { PlateEditor } from '@udecode/plate';

export type TextStyleDropdownProps = {
    editor: PlateEditor;
};

export type DropdownTriggerProps = {
    editorId?: string;
    open: boolean;
};

export type DropdownItemProps = {
    editorId?: string;
    type: TextStyles;
    children: ReactNode;
};

export enum ListStyles {
    UL = 'ul',
    OL = 'ol',
    CHECKLIST_ITEM = 'checkbox_item',
}

export enum TextStyles {
    ELEMENT_HEADING1 = 'heading1',
    ELEMENT_HEADING2 = 'heading2',
    ELEMENT_HEADING3 = 'heading3',
    ELEMENT_HEADING4 = 'heading4',
    ELEMENT_CUSTOM1 = 'custom1',
    ELEMENT_CUSTOM2 = 'custom2',
    ELEMENT_CUSTOM3 = 'custom3',
    ELEMENT_PARAGRAPH = 'p',
}

export type TextStylesTitles = Record<TextStyles, string>;
export type ListStylesTitles = Record<ListStyles, string>;

export type AvailableTextStyles = ListStyles | TextStyles;
export type AvailableTextStyleTitles = Record<AvailableTextStyles, string>;
