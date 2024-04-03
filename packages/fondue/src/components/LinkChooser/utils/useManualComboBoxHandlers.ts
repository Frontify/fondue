/* (c) Copyright Frontify Ltd., all rights reserved. */

import { chain } from '@react-aria/utils';
import { type FocusEvent, type KeyboardEvent } from 'react';

import { type ManualComboBoxEventProps, type ManualComboBoxEvents } from '../types';

export const useManualComboBoxEventHandlers = (
    { inputProps, inputRef, popoverRef, state }: ManualComboBoxEventProps,
    { onOpen, onClose, onNavigate, onSelect }: ManualComboBoxEvents,
) => {
    const { onClick, onTouchEnd, onBlur, onFocus, onKeyDown, ...ariaProps } = inputProps;
    return {
        ...ariaProps,
        onClick: chain(onClick, onOpen),
        onTouchEnd: chain(onTouchEnd, onOpen),
        onBlur: chain(onBlur, (event: FocusEvent<HTMLInputElement, HTMLElement>) => {
            if (
                popoverRef.current?.contains(event.relatedTarget as HTMLElement) ||
                (event.relatedTarget?.dataset.comboBoxControl === 'true' && state.isOpen)
            ) {
                inputRef.current?.focus();
            } else {
                onClose();
            }
        }),
        onFocus: chain(onFocus, onOpen),
        onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
            const SUBMISSION_KEYS = ['Enter', 'Tab'];
            const NAVIGATION_KEYS = ['ArrowRight', 'ArrowLeft', ...SUBMISSION_KEYS];
            const focusedKey = state.selectionManager.focusedKey;
            const item = state.collection.getItem(focusedKey);
            const { key } = event;

            if (state.isOpen && SUBMISSION_KEYS.includes(key)) {
                if (item && item.parentKey !== 'search') {
                    onNavigate(item.key);
                    /* If focused key is a not part of the search results then the function must 
                    end before the react-aria event chain begins is started so that the item is not 
                    selected internally in the useComboBoxState hook */
                    return;
                } else if (item) {
                    onSelect(item.key);
                } else {
                    onClose();
                    return;
                }
            } else if (state.isOpen && key === 'Escape') {
                onClose();
            } else if (!state.isOpen && !NAVIGATION_KEYS.includes(key)) {
                onOpen();
            }
            onKeyDown && onKeyDown(event);
        },
    };
};
