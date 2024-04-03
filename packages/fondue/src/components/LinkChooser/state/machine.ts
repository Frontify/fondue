/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DoneInvokeEvent, createMachine } from 'xstate';

import { type LinkChooserContext, type LinkChooserEventData } from '../types';
import { isFetching } from '../utils/state';

import {
    clearSelectedResult,
    copyLinkToClipboard,
    emitSelectSearchResult,
    fetchExtraSectionResults,
    fetchGlobalSearchResults,
    fillResultsWithNewRecentQueries,
    interruptFetching,
    openPreviewContext,
    populateDropdownSearchResultsWithRecentQueries,
    replaceCustomLink,
    replaceCustomLinkWithSelected,
    resolveFetching,
    setCurrentSectionId,
    setExtraResultsByQuery,
    setSelectedSearchResult,
    storeNewSelectedResult,
    updateDropdownSearchResults,
    updateQueryFromObject,
    updateQueryFromString,
} from './actions';
import { DropdownState, LinkChooserState, SectionState } from './types';

const closeActions = [
    'storeNewSelectedResult',
    'updateQueryFromObject',
    'setSelectedSearchResult',
    'emitSelectSearchResult',
];

const clearingActions = [
    'clearSelectedResult',
    'updateQueryFromString',
    'emitSelectSearchResult',
    'populateDropdownSearchResultsWithRecentQueries',
];

const sharedActions = {
    CLEARING: {
        actions: [...clearingActions],
    },
    OPEN_PREVIEW: {
        actions: ['openPreviewContext'],
    },
    COPY_TO_CLIPBOARD: {
        actions: ['copyLinkToClipboard'],
    },
};

const DEBOUNCE_TIMEOUT = 500;

const typingAction = {
    TYPING: [
        {
            target: SectionState.Typing,
            internal: false,
            cond: 'hasNoValue',
            actions: [...clearingActions],
        },
        {
            target: SectionState.Typing,
            internal: false,
            actions: ['updateQueryFromString'],
        },
    ],
};

export type SectionCondition = {
    type: 'isSection';
    value: DropdownState[];
};

const initializeSectionState = (
    initial: string,
    id: string,
    src: (context: LinkChooserContext) => Promise<LinkChooserEventData>,
) => ({
    initial,
    states: {
        [SectionState.Loaded]: {
            on: {
                ...typingAction,
            },
        },
        [SectionState.Typing]: {
            after: {
                [DEBOUNCE_TIMEOUT]: SectionState.Fetching,
            },
            on: {
                ...typingAction,
            },
        },
        [SectionState.Fetching]: {
            invoke: {
                id,
                src,
                onDone: [
                    {
                        target: SectionState.Loaded,
                        actions: ['updateDropdownSearchResults', 'replaceCustomLink', 'resolveFetching'],
                        cond: {
                            type: 'isSection',
                            value: [DropdownState.Default],
                        },
                    },
                    {
                        target: SectionState.Loaded,
                        actions: ['updateDropdownSearchResults'],
                    },
                ],
                onError: SectionState.Error,
            },
            on: {
                ...typingAction,
            },
        },
        [SectionState.Error]: {
            on: {
                ...typingAction,
            },
        },
    },
});

export const linkChooserMachine = createMachine<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>(
    {
        id: 'link-chooser',
        initial: LinkChooserState.Idle,
        states: {
            [LinkChooserState.Idle]: {
                on: {
                    OPEN_DROPDOWN: [
                        {
                            target: LinkChooserState.Focused,
                            actions: ['populateDropdownSearchResultsWithRecentQueries'],
                            cond: 'isQueryEmpty',
                        },
                        {
                            target: LinkChooserState.Focused,
                        },
                    ],
                    ...sharedActions,
                },
            },
            [LinkChooserState.Focused]: {
                initial: DropdownState.Default,
                states: {
                    [DropdownState.Default]: {
                        ...initializeSectionState(SectionState.Loaded, 'fetchGlobal', fetchGlobalSearchResults),
                        on: {
                            SELECT_EXTRA_SECTION: {
                                target: DropdownState.ExtraSection,
                                actions: [setExtraResultsByQuery, setCurrentSectionId],
                            },
                        },
                    },
                    [DropdownState.ExtraSection]: {
                        ...initializeSectionState(
                            SectionState.Fetching,
                            'fetchExtraSectionResults',
                            fetchExtraSectionResults,
                        ),
                        on: {
                            BACK_TO_DEFAULT: {
                                target: `${DropdownState.Default}.${SectionState.Fetching}`,
                                actions: [setExtraResultsByQuery, setCurrentSectionId],
                            },
                            CLEARING: {
                                target: DropdownState.Default,
                                actions: clearingActions,
                            },
                        },
                    },
                },
                on: {
                    CLOSE_DROPDOWN: [
                        {
                            target: LinkChooserState.Idle,
                            actions: [...closeActions, 'interruptFetching', 'replaceCustomLinkWithSelected'],
                            cond: 'shouldRefetch',
                        },
                        {
                            target: LinkChooserState.Idle,
                            actions: [...closeActions, 'replaceCustomLinkWithSelected'],
                        },
                    ],
                    SET_SELECTED_SEARCH_RESULT: {
                        target: LinkChooserState.Idle,
                        actions: ['fillResultsWithNewRecentQueries', ...closeActions],
                    },
                    ...sharedActions,
                },
            },
        },
    },
    {
        guards: {
            isSection: (_context, _event, meta) =>
                Object.values(SectionState).some((state) =>
                    (meta.cond as SectionCondition).value.some((value: DropdownState) =>
                        meta.state.matches(`${LinkChooserState.Focused}.${value}.${state}`),
                    ),
                ),
            shouldRefetch: (context, _event, meta) => isFetching(meta.state.matches) && !!context.query,
            isQueryEmpty: (context) => !context.query,
            hasNoValue: (_context, event) => !event.data.query,
        },
        actions: {
            clearSelectedResult,
            copyLinkToClipboard,
            emitSelectSearchResult,
            fetchGlobalSearchResults,
            setExtraResultsByQuery,
            setCurrentSectionId,
            openPreviewContext,
            populateDropdownSearchResultsWithRecentQueries,
            fillResultsWithNewRecentQueries,
            setSelectedSearchResult,
            storeNewSelectedResult,
            replaceCustomLink,
            replaceCustomLinkWithSelected,
            updateDropdownSearchResults,
            updateQueryFromObject,
            updateQueryFromString,
            interruptFetching,
            resolveFetching,
        },
    },
);
