/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { CUSTOM_LINK_ID, DEFAULT_ICON } from "../LinkChooser";
import { DropdownState, LinkChooserState, SectionState } from "../state/machine";
import { SearchResult } from "../types";

type MachineMatches = (value: string) => boolean;

export const createCustomLink = (query: string): SearchResult =>
    ({
        id: CUSTOM_LINK_ID,
        title: query,
        link: query,
        icon: DEFAULT_ICON,
        size: MenuItemContentSize.Large,
        selectionIndicator: SelectionIndicatorIcon.None,
    } as SearchResult);

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
