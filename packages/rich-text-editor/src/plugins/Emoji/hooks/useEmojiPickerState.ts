/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { suggestionOptionId } from '#/bridge/pluginApi/define';
import { type EditorApi, useEditorOverlay } from '#/bridge/pluginApi/plugin';
import { type CodecContext } from '#/model';

import { type EmojiData, emojiControls, emojiOptions } from '../helpers/emojiControls';

import { useEmojiLoad } from './useEmojiLoad';

/** The emoji picker's strings, in the UI locale. */
type EmojiPickerStrings = {
    title: string;
    search: string;
    noResults: string;
    loading: string;
    failed: string;
};

/** The picker's strings from the chrome's `t`. */
const emojiStrings = (t: CodecContext['t']): EmojiPickerStrings => ({
    title: t('RichTextEditor_emoji'),
    search: t('RichTextEditor_emojiSearch'),
    noResults: t('RichTextEditor_emojiNoResults'),
    loading: t('RichTextEditor_emojiLoading'),
    failed: t('RichTextEditor_emojiFailed'),
});

const statusOf = (data: EmojiData, shown: number, strings: EmojiPickerStrings): string => {
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

/** The picker's state, effects and handlers: the view only renders what this returns. */
export const useEmojiPickerState = (api: EditorApi, onClose: () => void) => {
    const lang = api.locale();
    const strings = emojiStrings(api.t);
    const testId = api.testId();
    const [open, setOpen] = useState(true);
    const [data, setData] = useState<EmojiData>({ status: 'loading' });
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

    useEmojiLoad(lang, setData, setIndex);

    const options = useMemo(() => emojiOptions(data, query), [data, query]);
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

    const { field, insert } = emojiControls({
        api,
        options,
        index,
        setIndex,
        shown,
        query,
        setQuery,
        stringsSearch: strings.search,
        composedAtRef,
        close,
        controls,
        activeId,
    });
    const list = {
        id: listId,
        label: strings.title,
        options,
        index,
        onPick: insert,
        onActivate: setIndex,
        testId: `${testId}-emoji-options`,
    };
    let listProps: typeof list | null = null;
    if (shown) {
        listProps = list;
    }

    return { open, overlay, title: strings.title, testId, field, list: listProps, fieldRef, statusRef };
};
