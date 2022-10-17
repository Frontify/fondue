/* (c) Copyright Frontify Ltd., all rights reserved. */

import { WrapperProps } from './PlateWrapper/types';
import { ToolbarWrapperProps } from './ToolbarWrapper/types';

export enum Position {
    FLOATING = 'Floating',
    BOTTOM = 'Bottom',
    TOP = 'Top',
}

export type EditorPositioningWrapperChildProps = {
    PlateWrapper: React.ForwardRefExoticComponent<WrapperProps & React.RefAttributes<HTMLDivElement>>;
    ToolbarWrapper: ({ children }: ToolbarWrapperProps) => JSX.Element;
};

export type EditorPositioningWrapperProps = Record<Position, EditorPositioningWrapperChildProps>;
