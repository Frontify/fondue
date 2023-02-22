/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ENode,
    PlateEditor,
    PlatePluginKey,
    SetNodesOptions,
    TNodeMatch,
    Value,
    isBlock,
    setElements,
    unsetNodes,
} from '@udecode/plate-core';
import { Location } from 'slate';
import { KEY_ELEMENT_BREAK_AFTER_COLUMN } from '../createColumnBreakPlugin';

export type ColumnBreakValue = 'active' | 'inactive' | undefined;

// This is adapted from src/components/RichTextEditor/Plugins/AlignPlugin/AlignPlugin.ts
export const setColumnBreaks = <V extends Value>(
    editor: PlateEditor<V>,
    {
        key = KEY_ELEMENT_BREAK_AFTER_COLUMN,
        value,
        at,
    }: { at?: Location; value?: string; setNodesOptions?: SetNodesOptions<V> } & PlatePluginKey,
) => {
    const match: TNodeMatch<ENode<Value>> = (n) => isBlock(editor, n);

    if (!value) {
        unsetNodes(editor, key, {
            match,
            mode: 'lowest',
            at,
        });
    } else {
        setElements(editor, { [key]: value }, { mode: 'lowest', match, at });
    }
};
