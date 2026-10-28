/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ChangeEvent, type CompositionEvent, type KeyboardEvent } from 'react';

import { type ListboxOption } from '#/bridge/pluginApi/define';
import { type EditorApi, passesToBrowser } from '#/bridge/pluginApi/plugin';

import { type EmojiEntry, searchEmoji } from './data';

// Enough for a list that scrolls, few enough to rank well, as the suggestion list shows.
const LIMIT = 50;
// Safari sends the Enter that confirms a composition after `compositionend`, as ProseMirror's own guard has it.
const COMPOSITION_ENTER_MS = 500;
/** The command the picker runs with `{ text }`, which inserts the emoji at the selection. */
const INSERT_EMOJI = 'text.insert';

export type EmojiData =
    | { status: 'loading' }
    | { status: 'failed' }
    | { status: 'ready'; entries: readonly EmojiEntry[] };

/** The options the list shows for `query`, the first page when the query is empty. */
export const emojiOptions = (data: EmojiData, query: string): readonly ListboxOption[] => {
    if (data.status !== 'ready') {
        return [];
    }

    let found: readonly EmojiEntry[] = data.entries.slice(0, LIMIT);
    if (query.trim() !== '') {
        found = searchEmoji(data.entries, query, LIMIT);
    }

    return found.map((entry) => ({ key: entry.emoji, label: entry.label, glyph: entry.emoji }));
};

const wrapped = (index: number, length: number): number => ((index % length) + length) % length;

type EmojiControlInput = {
    api: EditorApi;
    options: readonly ListboxOption[];
    index: number;
    setIndex: (index: number) => void;
    shown: boolean;
    query: string;
    setQuery: (query: string) => void;
    stringsSearch: string;
    composedAtRef: { current: number };
    close: (next: boolean) => void;
    controls: string | undefined;
    activeId: string | undefined;
};

/** The field's key handler and the insert it runs, which a click on an option runs too. */
export const emojiControls = ({
    api,
    options,
    index,
    setIndex,
    shown,
    query,
    setQuery,
    stringsSearch,
    composedAtRef,
    close,
    controls,
    activeId,
}: EmojiControlInput) => {
    const insert = (position: number) => {
        const option = options[position];
        if (option === undefined || option.glyph === null) {
            return;
        }

        api.commands.execute(INSERT_EMOJI, { text: option.glyph }, { focus: 'editor' });
        close(false);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (passesToBrowser(event.nativeEvent) || !shown) {
            return;
        }

        if (event.key === 'Enter' && event.timeStamp - composedAtRef.current < COMPOSITION_ENTER_MS) {
            composedAtRef.current = Number.NEGATIVE_INFINITY;

            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setIndex(wrapped(index + 1, options.length));

            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIndex(wrapped(index - 1, options.length));

            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            insert(index);
        }
    };

    // Fondue's `TextInput` passes props it does not declare on to its `input`, and declares no `role` or composition
    // events.
    const field = {
        role: 'combobox',
        type: 'text',
        value: query,
        placeholder: stringsSearch,
        'aria-label': stringsSearch,
        'aria-autocomplete': 'list',
        'aria-expanded': shown,
        'aria-controls': controls,
        'aria-activedescendant': activeId,
        autoComplete: 'off',
        spellCheck: false,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
            setQuery(event.target.value);
            setIndex(0);
        },
        onCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => {
            composedAtRef.current = event.timeStamp;
        },
        onKeyDown,
    } as const;

    return { field, insert };
};
