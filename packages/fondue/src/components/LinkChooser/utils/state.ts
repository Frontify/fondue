/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComboBoxState } from '@react-stately/combobox';

import { DropdownState, LinkChooserState, SectionState } from '../state/types';
import { type SearchResult } from '../types';

type MachineMatches = (value: string) => boolean;

export const queryMatchesSelection = (selectedResult: SearchResult | null, query: string): boolean =>
    !!(selectedResult && query === selectedResult.title);

export const isFetching = (matches: MachineMatches): boolean =>
    Object.values(DropdownState).some((dropdown) =>
        [SectionState.Fetching, SectionState.Typing].some((section) =>
            matches(`${LinkChooserState.Focused}.${dropdown}.${section}`),
        ),
    );

export const isLoaded = (matches: MachineMatches): boolean =>
    matches(`${LinkChooserState.Focused}.${DropdownState.Default}.${SectionState.Loaded}`);

export const isUnsuccessful = (matches: MachineMatches): boolean =>
    Object.values(DropdownState).some((state) => matches(`${LinkChooserState.Focused}.${state}.${SectionState.Error}`));

export const shouldGoBack = (matches: MachineMatches): boolean =>
    Object.values(DropdownState)
        .filter((state) => state !== DropdownState.Default)
        .some((dropdown) =>
            Object.values(SectionState).some((section) =>
                matches(`${LinkChooserState.Focused}.${dropdown}.${section}`),
            ),
        );

export const closeBoxState = (state: ComboBoxState<object>) => {
    if (state.isOpen) {
        state.close();
        state.setFocused(false);
    }
};

export const openBoxState = (state: ComboBoxState<object>) => {
    if (!state.isOpen) {
        state.open('first', 'manual');
        state.setFocused(true);
    }
};
