/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ToolbarCustomProps } from '../../types';

import { useRichTextEditorContext } from '../../context/RichTextEditorContext';
import { getButtonGroupWidths, getButtonGroupWidthsPerRow } from '../../utils/toolbarCalc';
import { defaultActions } from '../../utils/actions';
import { ButtonGroup } from './ButtonGroup';

export const Toolbar = ({ editorId, actions = [], editorWidth }: ToolbarCustomProps) => {
    const { PositioningWrapper } = useRichTextEditorContext();

    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const buttonGroupWidths = getButtonGroupWidths(toolbarActions);
    const toolbarButtonGroups = getButtonGroupWidthsPerRow(editorWidth || 0, buttonGroupWidths);

    return (
        <PositioningWrapper.ToolbarWrapper editorWidth={editorWidth} toolbarButtonGroups={toolbarButtonGroups}>
            {toolbarButtonGroups.map((row, index) => (
                <div key={index} className="tw-divide-x tw-divide-line tw-flex tw-w-full tw-flex-wrap">
                    {row.map(({ actions, index }) => (
                        <ButtonGroup key={index} actions={actions} index={index} editorId={editorId} />
                    ))}
                </div>
            ))}
        </PositioningWrapper.ToolbarWrapper>
    );
};
