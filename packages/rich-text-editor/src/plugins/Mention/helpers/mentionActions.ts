/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

import { passesToBrowser, type EditorApi, type SelectionHandle } from '#/bridge/pluginApi/plugin';

import { type ResultItem } from './results';

/** The command that inserts the chosen result. */
const INSERT_MENTION = 'reference.insert';
// Safari sends the Enter that confirms a composition after `compositionend`, as ProseMirror's own guard has it.
const COMPOSITION_ENTER_MS = 500;

/** An index moved past either end of a list of `length` options, wrapped around to the other end. */
const wrapped = (index: number, length: number): number => ((index % length) + length) % length;

type MentionActionsInput = {
    api: EditorApi;
    items: readonly ResultItem[];
    page: string | null;
    askAgain: (page: string | null) => void;
    optionCount: number;
    index: number;
    setIndex: (index: number) => void;
    targetRef: { current: SelectionHandle | null };
    composedAtRef: { current: number };
    finish: () => void;
};

/** Choosing an option, and the field keys that move or choose it. */
export const mentionActions = ({
    api,
    items,
    page,
    askAgain,
    optionCount,
    index,
    setIndex,
    targetRef,
    composedAtRef,
    finish,
}: MentionActionsInput) => {
    const choose = (position: number) => {
        const item = items[position];
        if (item === undefined) {
            return;
        }

        if (item.action === 'more' && item.cursor !== undefined) {
            askAgain(item.cursor);

            return;
        }

        if (item.action === 'retry') {
            askAgain(page);

            return;
        }

        let commandOptions: { focus: 'editor'; target?: SelectionHandle } = { focus: 'editor' };
        if (targetRef.current !== null) {
            commandOptions = { focus: 'editor', target: targetRef.current };
        }

        if (api.commands.execute(INSERT_MENTION, item.payload, commandOptions).status === 'rejected') {
            return;
        }

        finish();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (passesToBrowser(event.nativeEvent)) {
            return;
        }

        // The Enter that confirms a composition is spent here, with options or none, so it never marks a later Enter.
        if (event.key === 'Enter' && event.timeStamp - composedAtRef.current < COMPOSITION_ENTER_MS) {
            composedAtRef.current = Number.NEGATIVE_INFINITY;
            event.preventDefault();

            return;
        }

        if (optionCount === 0) {
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setIndex(wrapped(index + 1, optionCount));

            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIndex(wrapped(index - 1, optionCount));

            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            choose(index);
        }
    };

    return { choose, onKeyDown };
};
