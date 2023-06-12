/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import {
    PlateEditor,
    ToolbarButton,
    ToolbarButtonProps,
    someNode,
    useEventPlateId,
    usePlateEditorState,
} from '@udecode/plate';
import React from 'react';
import { getButtonClassNames } from '../../helper';
import { toggleColumnBreak } from '../onKeyDownColumnBreak';
import { getColumnBreakCount } from '../utils/getColumnBreakCount';

export const ColumnBreakToolbarButton = ({ id, ...props }: ToolbarButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(id));
    const isActive = !!editor?.selection && someNode(editor, { match: (node) => !!node.breakAfterColumn });

    const columns = (editor?.pluginsByKey['breakAfterColumn'] as any)?.options?.columns;

    const columnCount = Number(columns) || 1;
    const canBreakAfter = isColumnBreakEnabled(editor, columnCount, isActive);
    const buttonClassNames = getButtonClassNames(canBreakAfter);

    return (
        <ToolbarButton
            active={isActive}
            tooltip={getTooltip(
                canBreakAfter ? 'Column Break\nShift+Ctrl+Return' : 'Already at maximum numbers of columns',
            )}
            onMouseDown={(event) => toggleColumnBreak(editor, columnCount, event)}
            {...props}
            classNames={buttonClassNames}
        />
    );
};

export const isColumnBreakEnabled = (editor: PlateEditor, columnCount: number, isButtonActive: boolean): boolean =>
    getColumnBreakCount(editor) + 1 < columnCount || isButtonActive;
