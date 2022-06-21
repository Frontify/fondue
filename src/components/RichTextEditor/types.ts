/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, ReactElement } from 'react';
import { ListStyles } from './TextStyleDropdown/DropdownTrigger';
import { EditorActions } from './utils/actions';
import { TextStyles } from './utils/getTextStyles';

export type DesignTokens = Partial<Record<TextStyles, CSSProperties>>;

export type ToolbarCustomProps = {
    editorId?: string;
    designTokens: DesignTokens;
    actions?: EditorActions[][];
    editorWidth?: number;
};

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type ButtonGroupProps = {
    index: number;
    editorId?: string;
    actions: EditorActions[];
    designTokens: DesignTokens;
};

export type ButtonGroupWidths = { actions: EditorActions[]; buttonGroupWidth: number; index: number }[];

export type AvailableTextStyles = ListStyles & TextStyles;

export const defaultDesignTokens: DesignTokens = {
    heading1: {
        fontSize: '48px',
        fontWeight: 700,
    },
    heading2: {
        fontSize: '32px',
        fontWeight: 700,
    },
    heading3: {
        fontSize: '24px',
    },
    heading4: {
        fontSize: '18px',
    },
    custom1: {
        fontSize: '14px',
    },
    custom2: {
        fontSize: '14px',
        fontWeight: 600,
    },
    custom3: {
        fontSize: '14px',
        textDecoration: 'underline',
    },
};
