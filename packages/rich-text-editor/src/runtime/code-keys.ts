/* (c) Copyright Frontify Ltd., all rights reserved. */

import { exitCode } from 'prosemirror-commands';
import { keydownHandler } from 'prosemirror-keymap';
import { type Command, Plugin, PluginKey, TextSelection } from 'prosemirror-state';

import { type PluginImplementation } from '#/definition';
import { CODE_KEYS_PLUGIN } from '#/model/capabilities';

/** ArrowDown at the end of a code block that is its parent's last child opens a paragraph after it. */
const leaveAtEnd: Command = (state, dispatch) => {
    const { $from, empty } = state.selection;
    const block = $from.parent;
    if (!empty || block.type.spec.code !== true || !block.isTextblock || $from.parentOffset !== block.content.size) {
        return false;
    }
    if ($from.depth < 1 || $from.index(-1) !== $from.node(-1).childCount - 1) {
        return false;
    }
    const paragraph = state.schema.nodes.paragraph;
    const parent = $from.node(-1);
    const afterIndex = $from.indexAfter(-1);
    if (paragraph === undefined || !parent.canReplaceWith(afterIndex, afterIndex, paragraph)) {
        return false;
    }
    if (dispatch !== undefined) {
        const after = $from.after();
        const transaction = state.tr.insert(after, paragraph.create());
        dispatch(transaction.setSelection(TextSelection.create(transaction.doc, after + 1)).scrollIntoView());
    }
    return true;
};

/** Mod-Enter leaves a code block, and ArrowDown at its end opens a paragraph when nothing follows it. */
export const codeKeysPlugin: PluginImplementation = () =>
    new Plugin({
        key: new PluginKey(CODE_KEYS_PLUGIN.id),
        props: {
            handleKeyDown: keydownHandler({ 'Mod-Enter': exitCode, ArrowDown: leaveAtEnd }),
        },
    });
