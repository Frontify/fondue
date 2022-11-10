/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, ReactElement } from 'react';
import { ButtonStyles, TextStyles } from './Plugins/TextStylePlugin/TextStyles';
import { EditorActions } from './utils/actions';

export type DesignTokens =
    | Partial<Record<TextStyles, CSSProperties>>
    | Partial<Record<ButtonStyles, CSSProperties & { hover: CSSProperties }>>;

export type ToolbarCustomProps = {
    actions: EditorActions[][];
    editorId?: string;
};

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type ButtonGroupProps = {
    index: number;
    editorId?: string;
    actions: EditorActions[];
};

export type ButtonGroupWidths = { actions: EditorActions[]; buttonGroupWidth: number; index: number }[];

export enum PaddingSizes {
    None = 'tw-p-0',
    Small = 'tw-p-2',
    Medium = 'tw-p-4',
    Large = 'tw-p-6',
    XLarge = 'tw-p-8',
}
