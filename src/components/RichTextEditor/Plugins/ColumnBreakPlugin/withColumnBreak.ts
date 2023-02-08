/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, getParentNode, getPointBefore, getStartPoint, select } from '@udecode/plate';
import { Path } from 'slate';
import { getColumnBreakCount } from './ColumnBreakButton/ColumnBreakToolbarButton';
import { setBreakAfter } from './utils/setBreakAfter';

const moveCursorToPath = (editor: PlateEditor, path: Path) => {
    const startPoint = getStartPoint(editor, path);
    setTimeout(() => {
        select(editor, {
            anchor: startPoint,
            focus: startPoint,
        });
    });
};

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

                    if (!pointBefore) {
                        break;
                    }

                    const node = getParentNode(editor, pointBefore.path);
                    setBreakAfter(editor, { at: pointBefore, value: false });

                    if (node?.[0].breakAfterColumn) {
                        moveCursorToPath(editor, operation.path);
                        return editor;
                    }

                    break;
            }

            apply(operation);
        };

        return editor;
    };
