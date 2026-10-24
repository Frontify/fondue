/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type ChangeEvent,
    type CompositionEvent,
    type KeyboardEvent,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';

import { type ListboxOption, suggestionOptionId } from '#/bridge/define';
import { type EditorApi, passesToBrowser, useEditorOverlay } from '#/bridge/plugin';
import { type CodecContext } from '#/model';

import { type EmojiEntry, loadEmoji, searchEmoji } from './data';

/** The command the picker runs with `{ text }`, which inserts the emoji at the selection. */
const INSERT_EMOJI = 'text.insert';

// Enough for a list that scrolls, few enough to rank well, as the suggestion list shows.
const LIMIT = 50;
// Safari sends the Enter that confirms a composition after `compositionend`, as ProseMirror's own guard has it.
const COMPOSITION_ENTER_MS = 500;

/** The emoji picker's strings, in the UI locale. */
interface EmojiPickerStrings {
    readonly title: string;
    readonly search: string;
    readonly noResults: string;
    readonly loading: string;
    readonly failed: string;
}

/** The picker's strings from the chrome's `t`. */
const emojiStrings = (t: CodecContext['t']): EmojiPickerStrings => ({
    title: t('RichTextEditor_emoji'),
    search: t('RichTextEditor_emojiSearch'),
    noResults: t('RichTextEditor_emojiNoResults'),
    loading: t('RichTextEditor_emojiLoading'),
    failed: t('RichTextEditor_emojiFailed'),
});

type Data =
    | { readonly status: 'loading' }
    | { readonly status: 'failed' }
    | { readonly status: 'ready'; readonly entries: readonly EmojiEntry[] };

const optionsOf = (data: Data, query: string): readonly ListboxOption[] => {
    if (data.status !== 'ready') {
        return [];
    }
    let found: readonly EmojiEntry[] = data.entries.slice(0, LIMIT);
    if (query.trim() !== '') {
        found = searchEmoji(data.entries, query, LIMIT);
    }
    return found.map((entry) => ({ key: entry.emoji, label: entry.label, glyph: entry.emoji }));
};

const statusOf = (data: Data, shown: number, strings: EmojiPickerStrings): string => {
    if (data.status === 'loading') {
        return strings.loading;
    }
    if (data.status === 'failed') {
        return strings.failed;
    }
    if (shown === 0) {
        return strings.noResults;
    }
    return '';
};

const wrapped = (index: number, length: number): number => ((index % length) + length) % length;

/** The picker's state, effects and handlers: the view only renders what this returns. */
export const useEmojiPickerState = (api: EditorApi, onClose: () => void) => {
    const lang = api.locale();
    const strings = emojiStrings(api.t);
    const testId = api.testId();
    const [open, setOpen] = useState(true);
    const [data, setData] = useState<Data>({ status: 'loading' });
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState(0);
    // A live region announces a change of its text, never the text it mounts with, so the status is written after mount.
    const statusRef = useRef<HTMLDivElement | null>(null);
    const fieldRef = useRef<HTMLInputElement | null>(null);
    // When the field's last composition ended, so the Enter that confirmed it inserts nothing.
    const composedAtRef = useRef(Number.NEGATIVE_INFINITY);
    const listId = useId();
    const close = (next: boolean) => {
        if (next) {
            return;
        }
        // Focus goes back to the surface, as for a toolbar button that opens no overlay.
        overlay.returnFocusTo(null);
        setOpen(false);
        onClose();
    };
    const overlay = useEditorOverlay(open, close);
    useEffect(() => {
        let current = true;
        const show = (next: Data) => {
            if (current) {
                setData(next);
                setIndex(0);
            }
        };
        loadEmoji(lang)
            .then((entries) => show({ status: 'ready', entries }))
            .catch(() => show({ status: 'failed' }));
        return () => {
            current = false;
        };
    }, [lang]);
    const options = useMemo(() => optionsOf(data, query), [data, query]);
    const status = statusOf(data, options.length, strings);
    useEffect(() => {
        if (statusRef.current !== null) {
            statusRef.current.textContent = status;
        }
    }, [status]);
    const shown = options.length > 0;
    let controls: string | undefined;
    let activeId: string | undefined;
    const active = options[index];
    if (active !== undefined) {
        controls = listId;
        activeId = suggestionOptionId(listId, active.key);
    }
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
    // Fondue's `TextInput` passes props it does not declare on to its `input`, and declares no `role` or composition events.
    const field = {
        role: 'combobox',
        type: 'text',
        value: query,
        placeholder: strings.search,
        'aria-label': strings.search,
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
    const list = {
        id: listId,
        label: strings.title,
        options,
        index,
        onPick: insert,
        onActivate: setIndex,
        testId: `${testId}-emoji-options`,
    };
    return { open, overlay, title: strings.title, testId, field, list: shown ? list : null, fieldRef, statusRef };
};
