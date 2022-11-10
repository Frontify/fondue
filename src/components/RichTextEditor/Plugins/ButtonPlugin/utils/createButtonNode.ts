import { PlateEditor, TText, Value, getPluginType } from '@udecode/plate-core';
import { ELEMENT_BUTTON } from '../createButtonPlugin';
import { ButtonStyle, TButtonElement } from '../types';

export interface CreateButtonNodeOptions {
    url: string;
    text?: string;
    buttonStyle?: ButtonStyle;
    target?: string;
    children?: TText[];
}

export const createButtonNode = <V extends Value>(
    editor: PlateEditor<V>,
    { url, text = '', buttonStyle = 'primary', target, children }: CreateButtonNodeOptions,
): TButtonElement => {
    const type = getPluginType(editor, ELEMENT_BUTTON);

    return {
        type,
        url,
        target,
        buttonStyle,
        children: children ?? [{ text }],
    };
};
