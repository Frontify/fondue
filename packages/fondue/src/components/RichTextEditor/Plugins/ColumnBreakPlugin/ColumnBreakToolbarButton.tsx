/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { PlateEditor, PlatePlugin, useEditorState, useEventPlateId } from '@udecode/plate-core';
import { someNode } from '@udecode/slate';
import { toggleColumnBreak } from './onKeyDownColumnBreak';
import { getColumnBreakCount } from './utils/getColumnBreakCount';
import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import { IconStylingWrapper } from '@components/RichTextEditor/Plugins/helper';
import IconTextColumnBreak16 from '@foundation/Icon/Generated/IconTextColumnBreak16';
import { ToolbarButtonProps } from '@components/RichTextEditor/components/Toolbar/types';

export const ColumnBreakToolbarButton = ({ id, ...props }: ToolbarButtonProps) => {
    const editor = useEditorState(useEventPlateId(id));
    const isActive = !!editor?.selection && someNode(editor, { match: (node) => !!node.breakAfterColumn });

    const columns = (editor?.pluginsByKey['breakAfterColumn'] as PlatePlugin)?.options?.columns;

    const columnCount = Number(columns) || 1;
    const canBreakAfter = isColumnBreakEnabled(editor, columnCount, isActive);

    return (
        <ToolbarButton
            disabled={!canBreakAfter}
            pressed={!isActive}
            tooltip={getTooltip(
                canBreakAfter ? 'Column Break\nShift+Ctrl+Return' : 'Already at maximum numbers of columns',
            )}
            onPointerDown={(event) => event.preventDefault()}
            onClick={(event) => {
                toggleColumnBreak(editor, columnCount, event);
            }}
            {...props}
        >
            <IconStylingWrapper icon={<IconTextColumnBreak16 />} />
        </ToolbarButton>
    );
};

export const isColumnBreakEnabled = (editor: PlateEditor, columnCount: number, isButtonActive: boolean): boolean =>
    getColumnBreakCount(editor) + 1 < columnCount || isButtonActive;
