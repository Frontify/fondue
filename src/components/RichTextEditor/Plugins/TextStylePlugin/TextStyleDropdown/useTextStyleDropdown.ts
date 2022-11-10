/* (c) Copyright Frontify Ltd., all rights reserved. */

import { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { SelectableTextStyles, TextStyles } from '../TextStyles';

export const useTextStyleDropdown = <T extends HTMLElement, P extends HTMLElement>(
    triggerElement: T | null,
    popperElement: P | null,
    textStyles: SelectableTextStyles[],
): {
    state: { isOpen: boolean; toggle: () => void };
    dropdownProps: HTMLAttributes<P>;
    dropdownOptions: TextStyles[];
} => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => {
        setIsOpen((open) => !open);
    }, [setIsOpen]);

    const popperInstance = usePopper(triggerElement, popperElement, {
        placement: 'bottom-start',
        strategy: 'absolute',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 6],
                },
            },
            {
                name: 'flip',
                enabled: true,
            },
        ],
    });

    useEffect(() => {
        const listener = (event: Event) => {
            if (isOpen) {
                const target = event.target as HTMLElement;
                console.log(target, triggerElement);
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
        state: { isOpen, toggle },
        dropdownProps: {
            ...popperInstance.attributes.popper,
            style: popperInstance.styles.popper,
        },
        dropdownOptions: [...textStyles, TextStyles.ELEMENT_PARAGRAPH],
    };
};
