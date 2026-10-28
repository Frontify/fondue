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

/** The mention list's and the mention search dialog's list strings from the chrome's `translate`. */
export const referenceListStrings = (translate: CodecContext['translate']): ReferenceListStrings => ({
    label: translate('RichTextEditor_mentionSuggestions'),
    loading: translate('RichTextEditor_mentionLoading'),
    noResults: translate('RichTextEditor_mentionNoResults'),
    failed: translate('RichTextEditor_mentionFailed'),
    loadMore: translate('RichTextEditor_mentionLoadMore'),
    retry: translate('RichTextEditor_retry'),
    results: (count) => translate('RichTextEditor_mentionResults', { count }),
    option: ({ label, detail }, position, total) => {
        if (detail === undefined) {
            return translate('RichTextEditor_suggestionOption', { label: isolate(label), position, total });
        }

        return translate('RichTextEditor_mentionOption', { label: isolate(label), type: detail, position, total });
    },
    both: (first, second) => translate('RichTextEditor_announceBoth', { first, second }),
});
