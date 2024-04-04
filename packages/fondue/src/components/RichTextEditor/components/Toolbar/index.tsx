/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorRef } from '@udecode/plate-core';

import { useEditorResizeContext } from '../../context/EditorResizeContext';
import { useRichTextEditorContext } from '../../context/RichTextEditorContext';
import { EditorPositioningWrapper } from '../EditorPositioningWrapper';

import { ButtonGroupWrapper } from './ButtonGroupWrapper';
import { type ToolbarProps } from './types';
import { getButtonGroupWidths, getButtonGroupsPerRow } from './utils';

export const Toolbar = ({ toolbarButtons, editorId, toolbarWidth }: ToolbarProps) => {
    const editor = useEditorRef(editorId);
    const { editorWidth } = useEditorResizeContext();
    const { position } = useRichTextEditorContext();

    const calculationToolbarWidth = toolbarWidth || editorWidth || 0;
    const buttonGroupWidths = getButtonGroupWidths(toolbarButtons.at(position));
    const buttonGroupsPerRow = getButtonGroupsPerRow(calculationToolbarWidth, buttonGroupWidths);

    const PositioningWrapper = EditorPositioningWrapper[position];
    return (
        <PositioningWrapper.ToolbarWrapper
            editorWidth={editorWidth}
            toolbarWidth={toolbarWidth}
            toolbarButtonGroups={buttonGroupsPerRow}
        >
            {buttonGroupsPerRow.map((row, index) => (
                <div className="tw-divide-x tw-divide-line tw-flex tw-w-full" key={index}>
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

export { ToolbarButton } from './ToolbarButton';
