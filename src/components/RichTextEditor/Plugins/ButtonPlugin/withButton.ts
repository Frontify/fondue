/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AnyObject,
    EText,
    PlateEditor,
    Value,
    WithOverride,
    getAboveNode,
    getNextNodeStartPoint,
    getPluginType,
    getPreviousNodeEndPoint,
    insertNodes,
    isCollapsed,
    isEndPoint,
    isStartPoint,
    mockPlugin,
    select,
    withRemoveEmptyNodes,
} from '@udecode/plate';
import { Path, Point, Range } from 'slate';
import { ELEMENT_BUTTON } from './createButtonPlugin';

/**
 * Insert space after a url to wrap a button.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a button element will edit its children text but not its url.
 *
 */

export const withButton: WithOverride = (editor, { type }) => {
    const { apply, normalizeNode } = editor;

    editor.apply = (operation) => {
        if (operation.type !== 'set_selection') {
            apply(operation);
            return;
        }

        const range = operation.newProperties;
        if (!range?.focus || !range.anchor || !isCollapsed(range as Range)) {
            apply(operation);
            return;
        }

        const entry = getAboveNode(editor, {
            at: range as Range,
            match: { type: getPluginType(editor, ELEMENT_BUTTON) },
        });

        if (entry) {
            const [, path] = entry;

            let newPoint: Point | undefined;

            if (isStartPoint(editor, range.focus, path)) {
                newPoint = getPreviousNodeEndPoint(editor, path);
            }

            if (isEndPoint(editor, range.focus, path)) {
                newPoint = getNextNodeStartPoint(editor, path);
            }

            if (newPoint) {
                operation.newProperties = {
                    anchor: newPoint,
                    focus: newPoint,
                };
            }
        }

        apply(operation);
    };

    editor.normalizeNode = ([node, path]) => {
        if (node.type === getPluginType(editor, ELEMENT_BUTTON)) {
            const range = editor.selection as Range | null;

            if (range && isCollapsed(range) && isEndPoint(editor, range.focus, path)) {
                const nextPoint = getNextNodeStartPoint(editor, path);

                // select next text node if any
                if (nextPoint) {
                    select(editor, nextPoint);
                } else {
                    // insert text node then select
                    const nextPath = Path.next(path);
                    insertNodes(editor, { text: '' } as EText<Value>, { at: nextPath });
                    select(editor, nextPath);
                }
            }
        }

        normalizeNode([node, path]);
    };

    return withRemoveEmptyNodes<Value, PlateEditor<Value>>(
        editor,
        mockPlugin<AnyObject, Value, PlateEditor<Value>>({
            options: { types: type },
        }),
    );
};
