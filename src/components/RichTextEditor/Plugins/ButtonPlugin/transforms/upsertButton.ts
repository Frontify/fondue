/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TNode, TNodeEntry } from '@udecode/plate';
import {
    InsertNodesOptions,
    PlateEditor,
    UnwrapNodesOptions,
    Value,
    WrapNodesOptions,
    findNode,
    getAboveNode,
    getEditorString,
    getNodeLeaf,
    getNodeProps,
    getPluginOptions,
    getPluginType,
    isDefined,
    isExpanded,
    removeNodes,
    setNodes,
} from '@udecode/plate';
import { Path } from 'slate';
import { ButtonPlugin, ELEMENT_BUTTON } from '../createButtonPlugin';
import { RichTextButtonStyle, TButtonElement } from '../types';
import { CreateButtonNodeOptions } from '../utils/index';
import { insertButton } from './insertButton';
import { unwrapButton } from './unwrapButton';
import { upsertButtonText } from './upsertButtonText';
import { wrapButton } from './wrapButton';

export type UpsertButtonOptions<V extends Value = Value> = CreateButtonNodeOptions & {
    /**
     * If true, insert text when selection is in url.
     */
    insertTextInButton?: boolean;
    insertNodesOptions?: InsertNodesOptions<V>;
    unwrapNodesOptions?: UnwrapNodesOptions<V>;
    wrapNodesOptions?: WrapNodesOptions<V>;
    isUrl?: (url: string) => boolean;
};

/**
 * If selection in a button or is not url:
 * - insert text with url, exit
 * If selection is expanded or `update` in a button:
 * - remove button node, get button text
 * Then:
 * - insert button node
 */
export const upsertButton = <V extends Value>(
    editor: PlateEditor<V>,
    {
        url,
        text,
        buttonStyle,
        target,
        insertTextInButton,
        insertNodesOptions,
        isUrl = getPluginOptions<ButtonPlugin, V>(editor, ELEMENT_BUTTON).isUrl,
    }: UpsertButtonOptions<V>,
) => {
    const at = editor.selection;
    if (!at) {
        return;
    }

    const buttonAbove = getAboveNode<TButtonElement>(editor, {
        at,
        match: { type: getPluginType(editor, ELEMENT_BUTTON) },
    });

    // anchor and focus in button -> insert text
    if (insertTextInButton && buttonAbove) {
        // we don't want to insert marks in buttons
        editor.insertText(url);
        return true;
    }

    if (!isUrl?.(url)) {
        return;
    }

    if (isDefined(text) && text.length === 0) {
        text = url;
    }

    if (buttonAbove) {
        editButtonUrlAndTarget<V>(url, editor, buttonAbove, target, buttonStyle, text);
        return true;
    }

    // selection contains at one edge edge or between the edges
    const buttonEntry = findNode<TButtonElement>(editor, {
        at,
        match: { type: getPluginType(editor, ELEMENT_BUTTON) },
    });

    const [buttonNode, buttonPath] = buttonEntry ?? [];

    const shouldReplaceText = shouldReplaceButtonText<V>(editor, buttonPath, text);

    if (isExpanded(at)) {
        anchorAndFocusInButton<V>(buttonAbove, editor, url, buttonStyle, target, text);
        return true;
    }

    if (shouldReplaceText) {
        removeNodes(editor, {
            at: buttonPath,
        });
    }

    const props = getNodeProps(buttonNode ?? ({} as TNode));

    const path = editor.selection?.focus.path;
    if (!path) {
        return;
    }

    // button text should have the focused leaf marks
    const leaf = getNodeLeaf(editor, path);

    // if text is empty, text is url
    if (!text?.length) {
        text = url;
    }

    insertButton(
        editor,
        {
            ...props,
            url,
            target,
            children: [
                {
                    ...leaf,
                    text,
                },
            ],
        },
        insertNodesOptions,
    );
    return true;
};

function shouldReplaceButtonText<V extends Value>(editor: PlateEditor<V>, buttonPath?: Path, text?: string) {
    return buttonPath && text?.length && text !== getEditorString(editor, buttonPath);
}

function anchorAndFocusInButton<V extends Value>(
    buttonAbove: undefined,
    editor: PlateEditor<V>,
    url: string,
    buttonStyle?: RichTextButtonStyle,
    target?: string,
    text?: string,
) {
    if (buttonAbove) {
        unwrapButton(editor, {
            at: buttonAbove[1],
        });
    } else {
        unwrapButton(editor, {
            split: true,
        });
    }

    wrapButton(editor, {
        url,
        buttonStyle,
        target,
    });

    upsertButtonText(editor, { url, target, text });
}

function editButtonUrlAndTarget<V extends Value>(
    url: string,
    editor: PlateEditor<V>,
    buttonAbove: TNodeEntry<TButtonElement>,
    target?: string,
    buttonStyle?: string,
    text?: string,
) {
    if (
        url !== buttonAbove[0]?.url ||
        target !== buttonAbove[0]?.target ||
        buttonStyle !== buttonAbove[0]?.buttonStyle
    ) {
        setNodes<TButtonElement>(
            editor,
            { url, target, buttonStyle },
            {
                at: buttonAbove[1],
            },
        );
    }

    upsertButtonText(editor, { url, text, target });
}
