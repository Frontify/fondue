/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, type RefObject, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';

import { useMenuKeyboardNavigation } from '@components/Menu/useMenuKeyboardNavigation';
import { useClickOutside } from '@hooks/useClickOutside';
import { INSET_BORDER } from '@utilities/borderStyle';
import { merge } from '@utilities/merge';

interface Props {
    triggerRef?: RefObject<Element>;
    open?: boolean;
    children?: ReactNode | ReactNode[];
    onClose?: () => void;
    offset?: [number, number];
    'data-test-id'?: string;
}

/**
 * @deprecated Use `Dropdown` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dropdown the migration guide}.
 */
export type MenuProps = Props;

const CONTAINER_BASE_CLASSES = 'tw-relative tw-bg-base tw-rounded tw-py-2 tw-shadow-mid tw-z-[120000]';
const CONTAINER_CLASSES = merge([CONTAINER_BASE_CLASSES, INSET_BORDER]);

/**
 * @deprecated Use `Dropdown` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dropdown the migration guide}.
 */
export const Menu = ({
    triggerRef,
    children,
    open = true,
    offset = [0, 8],
    onClose,
    'data-test-id': dataTestId = 'menu',
}: MenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(open);
    const [menuOpenerRef, setMenuOpenerRef] = useState<HTMLElement | null>(null);
    const [menuContainerRef, setMenuContainerRef] = useState<HTMLElement | null>(null);

    const handleClickOutside = useCallback(() => {
        if (menuOpenerRef && isMenuOpen) {
            setIsMenuOpen(false);
            if (onClose) {
                onClose();
            }
        }
    }, [menuOpenerRef, isMenuOpen, onClose]);

    const { dismissibleElementRef } = useClickOutside<HTMLOListElement>(handleClickOutside, [
        menuOpenerRef as HTMLElement,
    ]);

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
            role={isMenuOpen ? 'navigation' : ''}
        >
            <ol ref={dismissibleElementRef} className="tw-list-none">
                {children}
            </ol>
        </nav>
    );
};
Menu.displayName = 'FondueMenu';
