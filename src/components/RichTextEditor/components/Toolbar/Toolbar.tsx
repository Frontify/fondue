/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ToolbarCustomProps } from '../../types';
import { useRichTextEditorContext } from '../../context/RichTextEditorContext';
import { getButtonGroupWidths, getButtonGroupWidthsPerRow } from '../../utils/toolbarCalc';
import { ButtonGroup } from './ButtonGroup';
import { useEditorResizeContext } from '@components/RichTextEditor/context/EditorResizeContext';

export const Toolbar = ({ editorId, actions }: ToolbarCustomProps) => {
    const { editorWidth } = useEditorResizeContext();
    const { PositioningWrapper } = useRichTextEditorContext();

    const buttonGroupWidths = getButtonGroupWidths(actions);
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
