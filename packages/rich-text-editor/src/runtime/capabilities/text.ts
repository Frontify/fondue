/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isRecord } from '#/model';

import { redo, undo } from '../history';

import { type CapabilityImplementation } from './shared';

export const insertText: CapabilityImplementation = () => ({
    run: (state, dispatch, payload) => {
        if (!isRecord(payload) || typeof payload.text !== 'string') {
            return false;
        }

        if (dispatch !== undefined) {
            dispatch(state.tr.insertText(payload.text).scrollIntoView());
        }

        return true;
    },
    active: () => false,
});

/** The lines of `text` the range `from`–`to` touches. A collapsed range is its own line. */
const touchedLines = (text: string, from: number, to: number): { start: number; end: number }[] => {
    const lines: { start: number; end: number }[] = [];
    let lineStart = 0;
    const consider = (lineEnd: number) => {
        const touches = from === to ? from >= lineStart && from <= lineEnd : from <= lineEnd && to > lineStart;
        if (touches) {
            lines.push({ start: lineStart, end: lineEnd });
        }
    };

    for (let index = 0; index < text.length; index += 1) {
        if (text[index] === '\n') {
            consider(index);
            lineStart = index + 1;
        }
    }

    consider(text.length);

    return lines;
};

/** How many leading spaces an outdent removes: two, one, or none. */
const leadingSpaces = (line: string): number => {
    if (line.startsWith('  ')) {
        return 2;
    }

    if (line.startsWith(' ')) {
        return 1;
    }

    return 0;
};

export const indentLines: CapabilityImplementation = (args) => ({
    run: (state, dispatch) => {
        const { $from, $to } = state.selection;
        const block = $from.parent;
        if (block !== $to.parent || block.type.spec.code !== true || !block.isTextblock) {
            return false;
        }

        const text = block.textContent;
        const lines = touchedLines(text, $from.parentOffset, $to.parentOffset);
        const indent = args.direction !== 'outdent';
        // `remove` of 0 inserts two spaces. Later lines are edited first, so earlier offsets stay valid.
        const edits: { at: number; remove: number }[] = [];
        for (const line of lines) {
            if (indent) {
                edits.push({ at: line.start, remove: 0 });
            } else {
                const remove = leadingSpaces(text.slice(line.start, line.end));
                if (remove > 0) {
                    edits.push({ at: line.start, remove });
                }
            }
        }

        if (edits.length === 0) {
            return false;
        }

        if (dispatch !== undefined) {
            const origin = $from.start();
            const transaction = state.tr;
            for (const edit of [...edits].reverse()) {
                if (edit.remove === 0) {
                    transaction.insertText('  ', origin + edit.at);
                } else {
                    transaction.delete(origin + edit.at, origin + edit.at + edit.remove);
                }
            }

            dispatch(transaction.scrollIntoView());
        }

        return true;
    },
    active: () => false,
});

export const history: CapabilityImplementation = (args) => {
    let command = undo;
    if (args.action === 'redo') {
        command = redo;
    }

    return { run: (state, dispatch) => command(state, dispatch), active: () => false };
};
