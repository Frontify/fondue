/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode, RefObject, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { merge } from '@utilities/merge';
import { useMenuKeyboardNavigation } from '@components/Menu/useMenuKeyboardNavigation';
import { useClickOutside } from '@hooks/useClickOutside';
import { INSET_BORDER } from '@utilities/borderStyle';

interface Props {
    triggerRef?: RefObject<Element>;
    open?: boolean;
    children?: ReactNode | ReactNode[];
    onClose?: () => void;
    offset?: [number, number];
    'data-test-id'?: string;
}

export type MenuProps = Props;

const CONTAINER_BASE_CLASSES = 'tw-relative tw-bg-base tw-rounded tw-py-2 tw-shadow-mid tw-z-[120000]';
const CONTAINER_CLASSES = merge([CONTAINER_BASE_CLASSES, INSET_BORDER]);

export const Menu = ({
    triggerRef,
    children,
    open = true,
    offset = [0, 8],
    onClose,
    'data-test-id': dataTestId = 'menu',
}: MenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(open);
    const [menuContainerRef, setMenuContainerRef] = useState<HTMLElement | null>(null);
    const [menuOpenerRef, setMenuOpenerRef] = useState<HTMLElement | null>(null);

    const menuKeyboardNavigationAction = useMenuKeyboardNavigation(
        isMenuOpen,
        menuContainerRef,
        'li > a, li > button:not(:disabled)',
    );

    const handleClickOutside = useCallback(() => {
        if (menuOpenerRef && isMenuOpen) {
            setIsMenuOpen(false);
            if (onClose) {
                onClose();
            }
        }
    }, [menuOpenerRef, isMenuOpen, onClose]);

    useClickOutside(menuContainerRef, handleClickOutside, [menuOpenerRef as HTMLElement]);

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
                    offset,
                },
            },
        ],
    });

    useEffect(() => {
        const trigger = triggerRef?.current;

        if (trigger) {
            setMenuOpenerRef(trigger as HTMLElement);
        }
    }, [triggerRef]);

    useEffect(() => {
        setIsMenuOpen(open);
    }, [open]);

    useEffect(() => {
        if (isMenuOpen && popperInstance.update) {
            popperInstance.update();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMenuOpen]);

    useEffect(() => {
        if (menuKeyboardNavigationAction === 'CLOSE_MENU' && menuOpenerRef) {
            setIsMenuOpen(false);
            if (onClose) {
                onClose();
            }
        }
    }, [menuKeyboardNavigationAction, onClose, menuOpenerRef]);

    return (
        <nav
            className={merge([CONTAINER_CLASSES, isMenuOpen ? 'tw-block' : 'tw-hidden'])}
            ref={setMenuContainerRef}
            style={menuOpenerRef ? popperInstance.styles.popper : {}}
            {...(menuOpenerRef ? popperInstance.attributes.popper : {})}
            data-test-id={dataTestId}
        >
            <ol className="tw-list-none" role="menu">
                {children}
            </ol>
        </nav>
    );
};
Menu.displayName = 'FondueMenu';
