/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';

export const usePopperDropdown = <T extends HTMLElement, P extends HTMLElement>(
    triggerElement: T | null,
    popperElement: P | null,
): { state: { isOpen: boolean; toggle: () => void }; dropdownProps: HTMLAttributes<P> } => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => {
        setIsOpen((open) => !open);
    }, [setIsOpen]);

    const popperInstance = usePopper(triggerElement, popperElement, {
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
                enabled: true,
            },
        ],
    });

    useEffect(() => {
        const listener = (event: Event) => {
            if (isOpen) {
                const target = event.currentTarget as HTMLElement;
                if (popperElement && target.contains(popperElement)) {
                    return;
                }
                if (triggerElement && target.contains(triggerElement)) {
                    return;
                }

                setIsOpen(false);
            }
        };
        document.body.addEventListener('mousedown', listener);
        return () => {
            document.body.removeEventListener('mousedown', listener);
        };
    }, [isOpen, popperElement, setIsOpen, triggerElement]);

    return {
        state: { isOpen, toggle },
        dropdownProps: {
            ...popperInstance.attributes.popper,
            style: popperInstance.styles.popper,
        },
    };
};
