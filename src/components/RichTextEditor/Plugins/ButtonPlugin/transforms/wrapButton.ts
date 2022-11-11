/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, WrapNodesOptions, getPluginType, wrapNodes } from '@udecode/plate-core';
import { ELEMENT_BUTTON } from '../createButtonPlugin';
import { ButtonStyle, TButtonElement } from '../types';

export interface WrapButtonOptions<V extends Value = Value> extends WrapNodesOptions<V> {
    url: string;
    buttonStyle?: ButtonStyle;
    target?: string;
}

/**
 * Wrap a button node with split.
 */
export const wrapButton = <V extends Value>(
    editor: PlateEditor<V>,
    { url, buttonStyle, target, ...options }: WrapButtonOptions<V>,
) => {
    wrapNodes<TButtonElement, Value>(
        editor,
        {
            type: getPluginType(editor, ELEMENT_BUTTON),
            url,
            buttonStyle,
            target,
            children: [],
        },
        { split: true, ...options } as WrapNodesOptions,
    );
};
