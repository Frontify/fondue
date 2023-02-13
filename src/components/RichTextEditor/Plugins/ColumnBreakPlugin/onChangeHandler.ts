/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, getParentNode, getPointBefore, getStartPoint, select } from '@udecode/plate';
import { Path } from 'slate';
import { getColumnBreakCount } from './ColumnBreakButton/ColumnBreakoolbarButton';
import { KEY_ELEMENT_BREAK_AFTER } from './createColumnBreakPlugin';
import { setBreakAfter } from './utils/setBreakAfter';
import { toggleBreakWithinRange } from './utils/toggleBreakWithinRange';

const moveCursorToPath = (editor: PlateEditor, path: Path) => {
    const startPoint = getStartPoint(editor, path);
    setTimeout(() => {
        select(editor, {
            anchor: startPoint,
            focus: startPoint,
        });
    });
};

type Handler = null | (() => void);

export const onChangeHandler = <E extends PlateEditor = PlateEditor>(editor: E) => {
    const { apply } = editor;
    const breakAfterPlugin = editor.plugins.find((plugin) => plugin.key === KEY_ELEMENT_BREAK_AFTER);
    const columns = (breakAfterPlugin?.options as { columns: number })?.columns ?? 1;

    editor.apply = (operation) => {
        switch (operation.type) {
            case 'split_node':
                operation.properties = { ...operation.properties, breakAfterColumn: false };
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

    // TOOD: only apply initially and on above events
    return () => toggleBreakWithinRange(editor, columns);
};
