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
import { KEY_ELEMENT_BREAK_AFTER } from '../createColumnBreakPlugin';

// This is adapted from src/components/RichTextEditor/Plugins/AlignPlugin/AlignPlugin.ts
export const setBreakAfter = <V extends Value>(
    editor: PlateEditor<V>,
    {
        key = KEY_ELEMENT_BREAK_AFTER,
        value,
        at,
    }: { at?: Location; value: boolean; setNodesOptions?: SetNodesOptions<V> } & PlatePluginKey,
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
