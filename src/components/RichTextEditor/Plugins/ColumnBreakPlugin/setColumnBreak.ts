/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
    const { defaultNodeValue, nodeKey } = getPluginInjectProps(editor, key);
    const match: TNodeMatch<ENode<Value>> = (n) => isBlock(editor, n);

    if (value === defaultNodeValue) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        unsetNodes(editor, nodeKey!, {
            match,
        });
    } else {
        setElements(
            editor,
            { [nodeKey!]: value },
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                match: match as any,
            },
        );
    }
};
