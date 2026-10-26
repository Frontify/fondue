/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CompositionEvent, type KeyboardEvent, useRef } from 'react';

import { suggestionOptionId } from '#/bridge/define';
import { passesToBrowser } from '#/bridge/plugin';

import { type Destination } from '../helpers/destination';
import { type LinkSearch, wrapped } from '../helpers/linkPopoverModel';

// Safari sends the Enter that confirms a composition after `compositionend`, as ProseMirror's own guard has it.
const COMPOSITION_ENTER_MS = 500;

/** The destination field's key handler and combobox attributes. */
export const useDestinationField = (
    search: LinkSearch | undefined,
    results: readonly Destination[],
    index: number,
    setIndex: (index: number) => void,
    pick: (position: number) => void,
    listId: string,
) => {
    const composedAtRef = useRef(Number.NEGATIVE_INFINITY);
    const shown = results.length > 0;
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        // Chromium confirms a composition with an Enter of its own, so only Safari's later Enter is left to swallow.
        if (event.key === 'Enter' && event.nativeEvent.isComposing) {
            composedAtRef.current = Number.NEGATIVE_INFINITY;
        }

        if (passesToBrowser(event.nativeEvent)) {
            return;
        }

        // The Enter that confirms a composition keeps its candidate in the field and submits nothing.
        if (event.key === 'Enter' && event.timeStamp - composedAtRef.current < COMPOSITION_ENTER_MS) {
            composedAtRef.current = Number.NEGATIVE_INFINITY;
            event.preventDefault();

            return;
        }

        if (!shown) {
            return;
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setIndex(wrapped(index + (event.key === 'ArrowDown' ? 1 : -1), results.length));

            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            pick(index);
        }
    };

    // Fondue's `TextInput` passes props it does not declare on to its `input`, and declares no `role` or composition events.
    let combobox: Readonly<Record<string, unknown>> = {
        onCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => {
            composedAtRef.current = event.timeStamp;
        },
    };
    const activeResult = results[index];
    if (search !== undefined) {
        combobox = {
            ...combobox,
            role: 'combobox',
            'aria-autocomplete': 'list',
            'aria-expanded': shown,
            'aria-controls': shown ? listId : undefined,
            'aria-activedescendant':
                activeResult === undefined ? undefined : suggestionOptionId(listId, activeResult.key),
        };
    }

    return [onKeyDown, combobox] as const;
};
