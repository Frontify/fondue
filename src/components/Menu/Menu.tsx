/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren, ReactElement, RefObject, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { merge } from '@utilities/merge';
import { MenuItemProps } from '@components/MenuItem';

interface Props {
    triggerRef: RefObject<Element>;
    open?: boolean;
    children?: ReactElement<MenuItemProps>[];
    onOpen?: () => void;
    onClose?: () => void;
}

export type MenuProps = PropsWithChildren<Props>;

export const Menu = ({ triggerRef, children, open = false, onOpen, onClose }: MenuProps) => {
    const [isDirty, setIsDirty] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [menuContainerRef, setMenuContainerRef] = useState<HTMLElement | null>(null);
    const [menuOpenerRef, setMenuOpenerRef] = useState<Element | null>(null);

    const popperInstance = usePopper(menuOpenerRef, menuContainerRef, {
        placement: 'bottom-start',
        strategy: 'fixed',
        modifiers: [
            {
                name: 'flip',
                enabled: true,
            },
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });

    const handleTriggerClick = useCallback(() => {
        setIsDirty(true);
        setIsMenuOpened((isOpen) => !isOpen);
    }, []);

    useEffect(() => {
        const trigger = triggerRef?.current;
        if (trigger) {
            trigger.removeEventListener('click', handleTriggerClick);
            trigger.addEventListener('click', handleTriggerClick);
            setMenuOpenerRef(trigger);
        }

        return () => {
            if (trigger) {
                trigger.removeEventListener('click', handleTriggerClick);
            }
        };
    }, [triggerRef, handleTriggerClick]);

    useEffect(() => {
        setIsDirty(true);
        setIsMenuOpened(open);
    }, [open]);

    useEffect(() => {
        if (!isDirty) {
            return;
        }

        if (isMenuOpened && onOpen) {
            onOpen();
        } else if (!isMenuOpened && onClose) {
            onClose();
        }
    }, [isMenuOpened, isDirty, onClose, onOpen]);

    return (
        <nav
            className={merge([
                'tw-bg-base tw-border tw-border-line-strong tw-rounded-lg tw-absolute tw-left-0 tw-top-7 tw-py-1.5 tw-shadow tw-w-max',
                isMenuOpened ? 'tw-block' : 'tw-hidden',
            ])}
            role="dialog"
            ref={setMenuContainerRef}
            style={popperInstance.styles.popper}
            {...popperInstance.attributes.popper}
        >
            <ol className="tw-list-none tw-flex-wrap tw-gap-y-1" role="menu">
                {children &&
                    children.map((child, index) => (
                        <li key={`menu-item-${index}`} role="menuitem">
                            {child}
                        </li>
                    ))}
            </ol>
        </nav>
    );
};
