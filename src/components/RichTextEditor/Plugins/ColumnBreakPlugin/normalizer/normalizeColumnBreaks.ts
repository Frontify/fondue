/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, TNodeEntry, Value, getNodeEntries, isBlock, setElements } from '@udecode/plate';
import { Path } from 'slate';

export const normalizeColumnBreaks = <V extends Value>(editor: PlateEditor<V>, columns: number) => {
    const { normalizeNode } = editor;

    return ([node, path]: TNodeEntry) => {
        const nodeEntries = Array.from(getNodeEntries(editor, { at: [], match: { breakAfterColumn: true } }));
        const pathsInColumnCount = nodeEntries.slice(0, Math.max(0, columns - 1)).map(([, p]) => p);

        if (node.breakAfterColumn) {
            setVisible<V>(
                editor,
                path,
                pathsInColumnCount.some((p) => Path.equals(p, path)),
            );
        }

        normalizeNode([node, path]);
    };
};
function setVisible<V extends Value>(editor: PlateEditor<V>, path: Path, breakWithinRange: boolean) {
    setElements(editor, { breakWithinRange }, { mode: 'lowest', at: path, match: (n) => isBlock(editor, n) });
}
