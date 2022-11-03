import { PlateEditor, TText, Value, getPluginType } from '@udecode/plate-core';
import { ELEMENT_BUTTON } from '../createButtonPlugin';
import { TButtonElement } from '../types';

export interface CreateButtonNodeOptions {
    url: string;
    text?: string;
    target?: string;
    children?: TText[];
}

export const createButtonNode = <V extends Value>(
    editor: PlateEditor<V>,
    { url, text = '', target, children }: CreateButtonNodeOptions,
): TButtonElement => {
    const type = getPluginType(editor, ELEMENT_BUTTON);

    return {
        type,
        url,
        target,
        children: children ?? [{ text }],
    };
};
