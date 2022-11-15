/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren, ReactElement, RefObject, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { merge } from '@utilities/merge';
import { MenuItemProps } from '@components/MenuItem';
import { useMenuKeyboardNavigation } from '@components/MenuItem/useMenuKeyboardNavigation';

interface Props {
    triggerRef: RefObject<Element>;
    open: boolean;
    children?: ReactElement<MenuItemProps>[];
    onClose?: () => void;
}

export type MenuProps = PropsWithChildren<Props>;

export const Menu = ({ triggerRef, children, open = false, onClose }: MenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(open);
    const [menuContainerRef, setMenuContainerRef] = useState<HTMLElement | null>(null);
    const [menuOpenerRef, setMenuOpenerRef] = useState<Element | null>(null);

    const menuKeyboardNavigationAction = useMenuKeyboardNavigation(
        isMenuOpen,
        menuContainerRef,
        'li > a, li > button:not(:disabled)',
    );

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

    useEffect(() => {
        const trigger = triggerRef?.current;

        if (trigger) {
            setMenuOpenerRef(trigger);
        }
    }, [triggerRef]);

    useEffect(() => {
        setIsMenuOpen(open);
    }, [open]);

    useEffect(() => {
        if (menuKeyboardNavigationAction === 'CLOSE_MENU') {
            setIsMenuOpen(false);
            if (onClose) {
                onClose();
            }
        }
    }, [menuKeyboardNavigationAction, onClose]);

    return (
        <nav
            className={merge([
                'tw-bg-base tw-border tw-border-line tw-rounded tw-absolute tw-left-0 tw-top-7 tw-py-2 tw-shadow-mid tw-w-max',
                isMenuOpen ? 'tw-block' : 'tw-hidden',
            ])}
            role={isMenuOpen ? 'dialog' : ''}
            ref={setMenuContainerRef}
            style={popperInstance.styles.popper}
            {...popperInstance.attributes.popper}
        >
            <ol className="tw-list-none" role="menu">
                {children}
            </ol>
        </nav>
    );
};
