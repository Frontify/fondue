/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ENode, SetNodesOptions, TLocation, TNodeMatch, Value, isBlock, setElements, unsetNodes } from '@udecode/slate';
import { PlateEditor, PlatePluginKey } from '@udecode/plate-core';
import { KEY_ELEMENT_BREAK_AFTER_COLUMN } from '../createColumnBreakPlugin';

export type ColumnBreakValue = 'active' | 'inactive' | undefined;

type SetColumnBreaksType = <V extends Value>(
    editor: PlateEditor<V>,
    { key, value, at }: { at?: TLocation; value?: string; setNodesOptions?: SetNodesOptions<V> } & PlatePluginKey,
) => void;

// This is adapted from src/components/RichTextEditor/Plugins/AlignPlugin/AlignPlugin.ts
export const setColumnBreaks: SetColumnBreaksType = (editor, { key = KEY_ELEMENT_BREAK_AFTER_COLUMN, value, at }) => {
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
