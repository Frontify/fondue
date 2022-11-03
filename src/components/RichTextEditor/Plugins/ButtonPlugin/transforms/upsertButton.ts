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
} from '@udecode/plate-core';
import { ButtonPlugin, ELEMENT_BUTTON } from '../createButtonPlugin';
import { TButtonElement } from '../types';
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

    // edit the button url and/or target
    if (buttonAbove) {
        if (url !== buttonAbove[0]?.url || target !== buttonAbove[0]?.target) {
            setNodes<TButtonElement>(
                editor,
                { url, target },
                {
                    at: buttonAbove[1],
                },
            );
        }

        upsertButtonText(editor, { url, text, target });

        return true;
    }

    // selection contains at one edge edge or between the edges
    const buttonEntry = findNode<TButtonElement>(editor, {
        at,
        match: { type: getPluginType(editor, ELEMENT_BUTTON) },
    });

    const [buttonNode, buttonPath] = buttonEntry ?? [];

    let shouldReplaceText = false;

    if (buttonPath && text?.length) {
        const buttonText = getEditorString(editor, buttonPath);

        if (text !== buttonText) {
            shouldReplaceText = true;
        }
    }

    if (isExpanded(at)) {
        // anchor and focus in button
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
            target,
        });

        upsertButtonText(editor, { url, target, text });

        return true;
    }

    if (shouldReplaceText) {
        removeNodes(editor, {
            at: buttonPath,
        });
    }

    const props = getNodeProps(buttonNode ?? ({} as any));

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
