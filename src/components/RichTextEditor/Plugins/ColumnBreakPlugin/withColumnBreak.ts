/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, getPointBefore } from '@udecode/plate';
import { getColumnBreakCount } from './ColumnBreakButton/ColumnBreakoolbarButton';
import { setBreakAfter } from './utils/setBreakAfter';

export const withColumnBreak =
    (columns: number) =>
    <E extends PlateEditor = PlateEditor>(editor: E) => {
        const { apply } = editor;

        editor.apply = (operation) => {
            switch (operation.type) {
                case 'split_node':
                    operation.properties = { ...operation.properties, breakAfterColumn: false };
                    break;
                case 'set_node':
                    const { newProperties } = operation;
                    if ('breakAfterColumn' in newProperties && getColumnBreakCount(editor) + 2 > columns) {
                        return editor;
                    }
                    break;
                case 'merge_node':
                    const pointBefore = getPointBefore(editor, operation.path);
                    setBreakAfter(editor, { at: pointBefore, value: false });
                    return editor;
            }

            apply(operation);
        };

        return editor;
    };
