/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { useRichTextEditorContext } from '../context/RichTextEditorContext';
import { ButtonGroupWrapper } from '../Plugins/helper';
import { ToolbarProps } from './types';
import { getButtonGroupWidths, getButtonGroupsPerRow } from './utils';

export const Toolbar = ({ buttons, editor, editorId, editorWidth }: ToolbarProps) => {
    const { PositioningWrapper } = useRichTextEditorContext();

    const buttonGroupWidths = getButtonGroupWidths(buttons);
    const buttonGroupsPerRow = getButtonGroupsPerRow(editorWidth || 0, buttonGroupWidths);

    return (
        <PositioningWrapper.ToolbarWrapper editorWidth={editorWidth} toolbarButtonGroups={buttonGroupsPerRow}>
            {buttonGroupsPerRow.map((row, index) => (
                <div className="tw-divide-x tw-divide-line tw-flex tw-w-full tw-flex-wrap" key={index}>
                    {row.map(({ group, index }) => (
                        <ButtonGroupWrapper index={index} key={index}>
                            {group.map((ToolbarButton, idx) => (
                                <ToolbarButton.button
                                    editor={editor}
                                    editorId={editorId}
                                    id={ToolbarButton.id}
                                    key={idx.toString()}
                                />
                            ))}
                        </ButtonGroupWrapper>
                    ))}
                </div>
            ))}
        </PositioningWrapper.ToolbarWrapper>
    );
};
