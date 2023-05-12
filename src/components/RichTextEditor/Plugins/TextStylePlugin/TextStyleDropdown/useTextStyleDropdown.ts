/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, usePlateEditorState } from '@udecode/plate';
import { Dispatch, HTMLAttributes, SetStateAction, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { useSelectedTextStyles } from './useSelectedTextStyles';
import { verticalPositionModifier } from './verticalPositionModifier';

const DEFAULT_TEXT_STYLE_VALUE = 'Mixed';

type UseTextStyleDropdownReturn<T, P> = {
    state: { isOpen: boolean; toggle: () => void; editor: PlateEditor };
    label: string;
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
    const editor = usePlateEditorState(editorId);
    const selectedTextStyles = useSelectedTextStyles(editor);
    const label = selectedTextStyles.length === 1 ? selectedTextStyles[0] : DEFAULT_TEXT_STYLE_VALUE;

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
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [isOpen, popperElement, setIsOpen, triggerElement]);

    return {
        state: { isOpen, toggle, editor },
        dropdownProps: {
            ...popperInstance.attributes.popper,
            style: popperInstance.styles.popper,
        },
        label,
        dropdownRef: setPopperElement,
        triggerRef: setTriggerElement,
    };
};
