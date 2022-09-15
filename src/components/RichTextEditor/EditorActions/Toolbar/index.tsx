/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor } from '@udecode/plate';
import React from 'react';
import { useRichTextEditorContext } from '../../context/RichTextEditorContext';
import { ButtonGroupWrapper } from '../Plugins/helper';
import { Buttons } from '../Plugins/types';
import { getButtonGroupWidths, getButtonGroupsPerRow } from './utils';

type ToolbarProps = {
    buttons: Buttons;
    editor: PlateEditor;
    editorWidth?: number;
};

export const Toolbar = ({ buttons, editor, editorWidth }: ToolbarProps) => {
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
                                <ToolbarButton.button editor={editor} id={ToolbarButton.id} key={idx.toString()} />
                            ))}
                        </ButtonGroupWrapper>
                    ))}
                </div>
            ))}
        </PositioningWrapper.ToolbarWrapper>
    );
};
