/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type ButtonGroupsPerRow } from '../../Toolbar/types';

export type ToolbarWrapperProps = {
    children: ReactNode;
    editorWidth?: number;
    toolbarButtonGroups?: ButtonGroupsPerRow;
    toolbarWidth?: number;
};
