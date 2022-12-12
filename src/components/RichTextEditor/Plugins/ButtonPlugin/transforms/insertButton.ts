/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InsertNodesOptions, PlateEditor, TText, Value, insertNodes } from '@udecode/plate';
import { TButtonElement } from '../types';
import { CreateButtonNodeOptions, createButtonNode } from '../utils/index';

export const insertButton = <V extends Value>(
    editor: PlateEditor<V>,
    createButtonNodeOptions: CreateButtonNodeOptions,
    options?: InsertNodesOptions<V>,
) => {
    insertNodes<TButtonElement | TText>(
        editor,
        [createButtonNode(editor, createButtonNodeOptions)],
        options as InsertNodesOptions,
    );
};
