/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, WithPlatePlugin } from '@udecode/plate';
import { getColumnBreakCount } from './ColumnBreakButton/ColumnBreakoolbarButton';

export const withColumnBreak =
    (columns: number) =>
    <E extends PlateEditor = PlateEditor>(editor: E, {}: WithPlatePlugin) => {
        const { apply } = editor;

        editor.apply = (operation) => {
            if ('split_node' === operation.type) {
                operation.properties = { ...operation.properties, breakAfterColumn: false };
            } else if ('set_node' === operation.type && getColumnBreakCount(editor) > columns) {
                return editor;
            }

            apply(operation);
        };

        return editor;
    };
