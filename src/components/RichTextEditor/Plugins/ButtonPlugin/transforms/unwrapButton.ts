import {
    PlateEditor,
    UnwrapNodesOptions,
    Value,
    getAboveNode,
    getPluginType,
    isElement,
    splitNodes,
    unwrapNodes,
    withoutNormalizing,
} from '@udecode/plate-core';
import { ELEMENT_BUTTON } from '../createButtonPlugin';

/**
 * Unwrap button node.
 */
export const unwrapButton = <V extends Value>(
    editor: PlateEditor<V>,
    options?: UnwrapNodesOptions & {
        split?: boolean;
    },
) => {
    return withoutNormalizing(editor, () => {
        if (options?.split) {
            const buttonAboveAnchor = getAboveNode(editor, {
                at: editor.selection?.anchor,
                match: { type: getPluginType(editor, ELEMENT_BUTTON) },
            });

            // anchor in button
            if (buttonAboveAnchor) {
                splitNodes(editor, {
                    at: editor.selection?.anchor,
                    match: (n) => isElement(n) && n.type === getPluginType(editor, ELEMENT_BUTTON),
                });
                unwrapButton(editor, {
                    at: editor.selection?.anchor,
                });
                return true;
            }
            const buttonAboveFocus = getAboveNode(editor, {
                at: editor.selection?.focus,
                match: { type: getPluginType(editor, ELEMENT_BUTTON) },
            });

            // focus in button
            if (buttonAboveFocus) {
                splitNodes(editor, {
                    at: editor.selection?.focus,
                    match: (n) => isElement(n) && n.type === getPluginType(editor, ELEMENT_BUTTON),
                });
                unwrapButton(editor, {
                    at: editor.selection?.focus,
                });
                return true;
            }
        }

        unwrapNodes(editor, {
            match: { type: getPluginType(editor, ELEMENT_BUTTON) },
            ...options,
        });
    });
};
