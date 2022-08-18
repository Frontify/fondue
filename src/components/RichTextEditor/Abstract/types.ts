/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { ButtonGroupWidths } from '../types';

export type WrapperProps = {
    children: ReactNode;
};

export type ToolbarWrapperProps = WrapperProps & {
    editorWidth: number | undefined;
    toolbarButtonGroups: ButtonGroupWidths[];
};
