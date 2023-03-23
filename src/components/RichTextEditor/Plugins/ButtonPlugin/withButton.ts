/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '@components/RichTextEditor/utils/isValidUrl';
import { AnyObject, EText } from '@udecode/plate';
import {
    PlateEditor,
    Value,
    WithOverride,
    collapseSelection,
    getAboveNode,
    getEditorString,
    getNextNodeStartPoint,
    getPluginType,
    getPreviousNodeEndPoint,
    getRangeBefore,
    getRangeFromBlockStart,
    insertNodes,
    isCollapsed,
    isEndPoint,
    isStartPoint,
    mockPlugin,
    select,
    someNode,
    withRemoveEmptyNodes,
    withoutNormalizing,
} from '@udecode/plate';
import { Path, Point, Range } from 'slate';
import { ELEMENT_BUTTON } from './createButtonPlugin';
import { upsertButton } from './transforms/index';

/**
 * Insert space after a url to wrap a button.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a button element will edit its children text but not its url.
 *
 */

export const withButton: WithOverride = (editor, { type, options: { getUrlHref, rangeBeforeOptions } }) => {
    const { insertData, insertText, apply, normalizeNode, insertBreak } = editor;

    const wrapButton = () => {
        withoutNormalizing(editor, () => {
            const selection = editor.selection as Range;

            // get the range from first space before the cursor
            let beforeWordRange = getRangeBefore(editor, selection, rangeBeforeOptions);

            // if no space found before, get the range from block start
            if (!beforeWordRange) {
                beforeWordRange = getRangeFromBlockStart(editor);
            }

            // if no word found before the cursor, exit
            if (!beforeWordRange) {
                return;
            }

            const hasLink = someNode(editor, {
                at: beforeWordRange,
                match: { type: getPluginType(editor, ELEMENT_BUTTON) },
            });

            // if word before the cursor has a link, exit
            if (hasLink) {
                return;
            }

            let beforeWordText = getEditorString(editor, beforeWordRange);
            beforeWordText = getUrlHref?.(beforeWordText) ?? beforeWordText;

            // if word before is not an url, exit
            if (!isValidUrl(beforeWordText)) {
                return;
            }

            // select the word to wrap button
            select(editor, beforeWordRange);

            // wrap button
            upsertButton(editor, {
                url: beforeWordText,
            });

            // collapse selection
            collapseSelection(editor, { edge: 'end' });
        });
    };

    editor.insertBreak = () => {
        if (!isCollapsed(editor.selection)) {
            return insertBreak();
        }
        wrapButton();
        insertBreak();
    };

    editor.insertText = (text) => {
        if (text === ' ' && isCollapsed(editor.selection)) {
            wrapButton();
        }

        insertText(text);
    };

    editor.insertData = (data: DataTransfer) => {
        const text = data.getData('text/plain');
        const textHref = getUrlHref?.(text);

        if (text) {
            const inserted = upsertButton(editor, {
                url: textHref || text,
                insertTextInButton: true,
            });
            if (inserted) {
                return;
            }
        }

        insertData(data);
    };

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
