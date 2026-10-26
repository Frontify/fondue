/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSessionValue } from '#/bridge/session';
import { offeredRows, type ToolbarItem } from '#/ui/helpers/items';

const sameRows = (previous: readonly ToolbarItem[], next: readonly ToolbarItem[]) =>
    previous.length === next.length && previous.every((row, index) => row === next[index]);

/** The rows of `items` the session's selection offers now, kept up to date as it changes. */
export const useOfferedRows = (items: readonly ToolbarItem[]): readonly ToolbarItem[] =>
    useSessionValue((session) => offeredRows(items, session), sameRows);
