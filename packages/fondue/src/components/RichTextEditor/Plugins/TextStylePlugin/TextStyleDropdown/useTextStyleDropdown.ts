/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor, useEditorState } from '@udecode/plate-core';
import { type Dispatch, type HTMLAttributes, type SetStateAction, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';

import { DEFAULT_TEXT_STYLE_VALUE } from '../types';

import { selectedTextStyles as selectedTextStylesUtils } from './selectedTextStyles';
import { verticalPositionModifier } from './verticalPositionModifier';

type UseTextStyleDropdownReturn<T, P> = {
    state: { isOpen: boolean; toggle: () => void; editor: PlateEditor };
    key: string;
    dropdownProps: HTMLAttributes<P>;
    triggerRef: Dispatch<SetStateAction<T | null>>;
    dropdownRef: Dispatch<SetStateAction<P | null>>;
};

export const useTextStyleDropdown = <T extends HTMLElement, P extends HTMLElement>(
    editorId?: string,
): UseTextStyleDropdownReturn<T, P> => {
    const [isOpen, setIsOpen] = useState(false);
    const [triggerElement, setTriggerElement] = useState<T | null>(null);
    const [popperElement, setPopperElement] = useState<P | null>(null);
    const editor = useEditorState(editorId);
    const selectedTextStyles = selectedTextStylesUtils(editor);

    let key = DEFAULT_TEXT_STYLE_VALUE;
    if (selectedTextStyles.length === 1) {
        key = selectedTextStyles[0];
    } else if (selectedTextStyles.length === 0) {
        key = 'p';
    }

    const toggle = useCallback(() => {
        setIsOpen((open) => !open);
    }, [setIsOpen]);

    const popperInstance = usePopper<'offset' | 'flip' | 'vertical-positioning'>(triggerElement, popperElement, {
        placement: 'bottom-start',
        strategy: 'fixed',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 6],
                },
            },
            {
                name: 'flip',
                enabled: false,
            },
            verticalPositionModifier,
        ],
    });

    useEffect(() => {
        const listener = (event: Event) => {
            if (isOpen) {
                const target = event.target as HTMLElement;
                if (popperElement && popperElement.contains(target)) {
                    return;
                }
                if (triggerElement && triggerElement.contains(target)) {
                    return;
                }

                setIsOpen(false);
            }
        };
        document.addEventListener('pointerdown', listener);
        return () => {
            document.removeEventListener('pointerdown', listener);
        };
    }, [isOpen, popperElement, setIsOpen, triggerElement]);

    return {
        state: { isOpen, toggle, editor },
        dropdownProps: {
            ...popperInstance.attributes.popper,
            style: popperInstance.styles.popper,
        },
        key,
        dropdownRef: setPopperElement,
        triggerRef: setTriggerElement,
    };
};
