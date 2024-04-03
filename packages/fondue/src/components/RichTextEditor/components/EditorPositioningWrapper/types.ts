/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type ToolbarWrapperProps } from './ToolbarWrapper/types';

export enum Position {
    FLOATING = 'Floating',
    BOTTOM = 'Bottom',
    TOP = 'Top',
}

export type WrapperProps = {
    children: ReactNode;
};

export type EditorPositioningWrapperChildProps = {
    PlateWrapperClassNames: string;
    ToolbarWrapper: ({ children }: ToolbarWrapperProps) => JSX.Element;
};

export type EditorPositioningWrapperProps = Record<Position, EditorPositioningWrapperChildProps>;
