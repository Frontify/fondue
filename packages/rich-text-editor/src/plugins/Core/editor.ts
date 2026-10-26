/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/pluginApi/plugin';
import { type JsonValue } from '#/model';

import { core } from './feature';

/** Sets a paragraph, inserts text and hard breaks, undoes and redoes, moves blocks, and runs the slash menu's chosen command. */
export const coreEditor = defineEditorPart(core, {
    needs: ['blocks', 'commands', 'history', 'insert'],
    commands: {
        'paragraph.set': {
            run: (api) => api.blocks.set('paragraph'),
            active: (api) => api.blocks.active('paragraph'),
        },
        'text.insert': {
            payload: { fields: { text: { type: 'string' } } },
            run: (api, payload: { text: string }) => api.insert.text(payload.text),
        },
        'slash.run': {
            payload: { fields: { command: { type: 'string' }, payload: { type: 'json', optional: true } } },
            // The selection is the typed `/` and query, which the chosen command replaces in the same undo step.
            run: (api, { command, payload }: { command: string; payload?: JsonValue }) =>
                api.insert.text('') && api.commands.execute(command, payload).status === 'applied',
        },
        'hard-break.insert': {
            run: (api) => {
                // A code block keeps a line break as text, as ProseMirror's `newlineInCode` does.
                if (api.selection().verbatim) {
                    return api.insert.text('\n');
                }

                return api.insert.node('hard_break').status === 'applied';
            },
        },
        'history.undo': { run: (api) => api.history.undo(), enabled: (api) => api.history.canUndo() },
        'history.redo': { run: (api) => api.history.redo(), enabled: (api) => api.history.canRedo() },
        'block.move.up': { run: (api) => api.blocks.move('up') },
        'block.move.down': { run: (api) => api.blocks.move('down') },
    },
    keys: {
        'mac:Mod-Alt-0': 'paragraph.set',
        'other:Ctrl-Shift-0': 'paragraph.set',
        'Mod-z': 'history.undo',
        'Mod-Shift-z': 'history.redo',
        'other:Ctrl-y': 'history.redo',
        'Shift-Enter': 'hard-break.insert',
        // Not Mod-Shift-ArrowUp, which extends the selection natively on macOS.
        'Mod-Alt-ArrowUp': { command: 'block.move.up', labelKey: 'RichTextEditor_moveUp' },
        'Mod-Alt-ArrowDown': { command: 'block.move.down', labelKey: 'RichTextEditor_moveDown' },
    },
    toolbar: [
        {
            id: 'paragraph',
            kind: 'toggle',
            command: 'paragraph.set',
            labelKey: 'RichTextEditor_normalText',
            icon: 'IconTextBoxStack',
        },
        {
            id: 'undo',
            kind: 'button',
            command: 'history.undo',
            labelKey: 'RichTextEditor_undo',
            icon: 'IconArrowRoundAntiClockwise',
        },
        {
            id: 'redo',
            kind: 'button',
            command: 'history.redo',
            labelKey: 'RichTextEditor_redo',
            icon: 'IconArrowRoundClockwise',
        },
    ],
});
