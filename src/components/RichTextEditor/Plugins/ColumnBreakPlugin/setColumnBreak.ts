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
import { ELEMENT_COLUMN_BREAK } from './id';

// This is adapted from src/components/RichTextEditor/Plugins/AlignPlugin/AlignPlugin.ts
export const setColumnBreak = <V extends Value>(
    editor: PlateEditor<V>,
    { key = ELEMENT_COLUMN_BREAK, value }: { value: boolean; setNodesOptions?: SetNodesOptions<V> } & PlatePluginKey,
) => {
    const { defaultNodeValue } = getPluginInjectProps(editor, key);
    const match: TNodeMatch<ENode<Value>> = (n) => isBlock(editor, n);

    if (value === defaultNodeValue) {
        unsetNodes(editor, key, {
            match,
        });
    } else {
        setElements(
            editor,
            { [key]: value },
            {
                match,
            },
        );
    }
};
