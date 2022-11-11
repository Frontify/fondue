/* (c) Copyright Frontify Ltd., all rights reserved. */

import { usePlateEditorRef } from '@udecode/plate';
import React from 'react';
import { useEditorResizeContext } from '../context/EditorResizeContext';
import { useRichTextEditorContext } from '../context/RichTextEditorContext';
import { EditorPositioningWrapper } from '../EditorPositioningWrapper';
import { ButtonGroupWrapper } from '../Plugins/helper';
import { ToolbarProps } from './types';
import { getButtonGroupWidths, getButtonGroupsPerRow } from './utils';

export const Toolbar = ({ buttons, editorId }: ToolbarProps) => {
    const editor = usePlateEditorRef(editorId);
    const { editorWidth } = useEditorResizeContext();
    const { position } = useRichTextEditorContext();

    const buttonGroupWidths = getButtonGroupWidths(buttons);
    const buttonGroupsPerRow = getButtonGroupsPerRow(editorWidth || 0, buttonGroupWidths);

    const PositioningWrapper = EditorPositioningWrapper[position];

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
