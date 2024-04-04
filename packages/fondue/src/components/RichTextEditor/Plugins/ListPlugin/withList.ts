/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor, type WithPlatePlugin } from '@udecode/plate-core';
import {
    deleteBackwardList,
    deleteForwardList,
    deleteFragmentList,
    insertBreakList,
    insertFragmentList,
    normalizeList,
} from '@udecode/plate-list';
import { type Value } from '@udecode/slate';

import { type WithListPlugin } from './types';

export const withList = <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
    editor: E,
    { options: { validLiChildrenTypes, isSoftBreak } }: WithPlatePlugin<WithListPlugin, V, E>,
) => {
    const { insertBreak, deleteBackward, deleteForward, deleteFragment } = editor;

    if (isSoftBreak) {
        editor.insertSoftBreak = () => {
            if (insertBreakList(editor)) {
                return;
            }

            insertBreak();
        };
    } else {
        editor.insertBreak = () => {
            if (insertBreakList(editor)) {
                return;
            }

            insertBreak();
        };
    }

    editor.deleteBackward = (unit) => {
        if (deleteBackwardList(editor, unit)) {
            return;
        }

        deleteBackward(unit);
    };

    editor.deleteForward = (unit) => {
        if (deleteForwardList(editor, () => {}, unit)) {
            return;
        }

        deleteForward(unit);
    };

    editor.deleteFragment = (direction) => {
        if (deleteFragmentList(editor)) {
            return;
        }

        deleteFragment(direction);
    };

    editor.insertFragment = insertFragmentList(editor);

    editor.normalizeNode = normalizeList(editor, { validLiChildrenTypes });

    return editor;
};
