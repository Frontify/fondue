/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ENode,
    PlateEditor,
    PlatePluginKey,
    SetNodesOptions,
    TNodeMatch,
    Value,
    getPluginInjectProps,
    isBlock,
    setElements,
    unsetNodes,
} from '@udecode/plate-core';
import { ELEMENT_BREAK_AFTER } from '../id';

// This is adapted from src/components/RichTextEditor/Plugins/AlignPlugin/AlignPlugin.ts
export const setBreakAfter = <V extends Value>(
    editor: PlateEditor<V>,
    { key = ELEMENT_BREAK_AFTER, value }: { value: boolean; setNodesOptions?: SetNodesOptions<V> } & PlatePluginKey,
) => {
    const { defaultNodeValue } = getPluginInjectProps(editor, key);
    const match: TNodeMatch<ENode<Value>> = (n) => isBlock(editor, n);

    if (value === defaultNodeValue) {
        unsetNodes(editor, key, {
            match,
            mode: 'lowest',
        });
    } else {
        setElements(editor, { [key]: value }, { mode: 'lowest', match });
    }
};
