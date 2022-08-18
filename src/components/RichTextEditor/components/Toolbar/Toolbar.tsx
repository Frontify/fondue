/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Position, ToolbarCustomProps } from '../../types';

import { ToolbarFloating } from './ToolbarFloating';
import { ToolbarBottom } from './ToolbarBottom';

type ToolbarProps = ToolbarCustomProps & {
    position: Position;
};

export const Toolbar = ({ position, editorId, actions = [], editorWidth }: ToolbarProps) => {
    if (position === Position.BOTTOM) {
        return <ToolbarBottom editorId={editorId} actions={actions} />;
    }

    return <ToolbarFloating editorId={editorId} actions={actions} editorWidth={editorWidth} />;
};
