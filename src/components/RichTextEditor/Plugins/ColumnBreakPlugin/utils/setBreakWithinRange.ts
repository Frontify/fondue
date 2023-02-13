/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, isBlock, setElements } from '@udecode/plate';
import { Path } from 'slate';

export const setBreakWithinRange = <V extends Value>(editor: PlateEditor<V>, path: Path, breakWithinRange: boolean) => {
    setElements(editor, { breakWithinRange }, { mode: 'lowest', at: path, match: (n) => isBlock(editor, n) });
};
