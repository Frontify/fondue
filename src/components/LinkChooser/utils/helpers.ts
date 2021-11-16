/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { CUSTOM_LINK_ID, DEFAULT_ICON } from "../LinkChooser";
import { SearchResult } from "../types";

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
