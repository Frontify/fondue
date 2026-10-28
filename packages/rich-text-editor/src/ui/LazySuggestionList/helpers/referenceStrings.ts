/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ListboxOption } from '#/bridge/chrome/components/Listbox';
import { isolate } from '#/bridge/session/helpers/announcer';
import { type CodecContext } from '#/model';

/** What a list says about its search, in the UI locale. */
export type ReferenceListStrings = {
    label: string;
    loading: string;
    noResults: string;
    failed: string;
    loadMore: string;
    retry: string;
    results: (count: number) => string;
    /** The active option with its place, and its type when it has one, so a user and a group of one name differ. */
    option: (option: ListboxOption, position: number, total: number) => string;
    /** Two messages as one announcement, so the second does not cut the first off. */
    both: (first: string, second: string) => string;
};

/** The mention list's and the mention search dialog's list strings from the chrome's `t`. */
export const referenceListStrings = (t: CodecContext['translate']): ReferenceListStrings => ({
    label: t('RichTextEditor_mentionSuggestions'),
    loading: t('RichTextEditor_mentionLoading'),
    noResults: t('RichTextEditor_mentionNoResults'),
    failed: t('RichTextEditor_mentionFailed'),
    loadMore: t('RichTextEditor_mentionLoadMore'),
    retry: t('RichTextEditor_retry'),
    results: (count) => t('RichTextEditor_mentionResults', { count }),
    option: ({ label, detail }, position, total) => {
        if (detail === undefined) {
            return t('RichTextEditor_suggestionOption', { label: isolate(label), position, total });
        }

        return t('RichTextEditor_mentionOption', { label: isolate(label), type: detail, position, total });
    },
    both: (first, second) => t('RichTextEditor_announceBoth', { first, second }),
});
