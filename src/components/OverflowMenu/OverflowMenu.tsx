/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { IconDotsHorizontal } from '@foundation/Icon';
import { merge } from '@utilities/merge';
import { OverflowMenuItem, OverflowMenuItemProps } from './OverflowMenuItem';
import { useOverflowMenuKeyboardNavigation } from './useOverflowMenuKeyboardNavigation';

export interface OverflowMenuProps {
    items: OverflowMenuItemProps[];
}

export const OverflowMenu = ({ items }: OverflowMenuProps) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [menuContainerRef, setMenuContainerRef] = useState<HTMLElement | null>(null);
    const [menuOpenerRef, setMenuOpenerRef] = useState<HTMLButtonElement | null>(null);
    const menuKeyboardNavigationAction = useOverflowMenuKeyboardNavigation(
        isMenuOpened,
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
        if (menuKeyboardNavigationAction === 'CLOSE_MENU') {
            setIsMenuOpened(false);
        }
    }, [menuKeyboardNavigationAction]);

    return (
        <div data-test-id="overflow-menu" className="tw-relative tw-bottom-0 tw-top-0 tw-flex">
            <button
                aria-haspopup="true"
                aria-expanded={isMenuOpened}
                aria-label="Open overflow menu"
                ref={setMenuOpenerRef}
                className={merge([
                    'tw-w-6 tw-h-6 hover:tw-bg-box-neutral-strong-inverse-hover tw-rounded tw-flex tw-justify-center tw-items-center',
                    isMenuOpened ? 'tw-bg-box-neutral-strong-inverse-pressed' : 'tw-bg-box-neutral-strong-inverse',
                ])}
                type="button"
                onClick={() => {
                    setIsMenuOpened(!isMenuOpened);
                }}
            >
                <IconDotsHorizontal />
            </button>
            {isMenuOpened && (
                <nav
                    className="tw-bg-base tw-border tw-border-line-strong tw-rounded-lg tw-absolute tw-left-0 tw-top-7 tw-py-1.5 tw-shadow tw-w-max"
                    role="dialog"
                    ref={setMenuContainerRef}
                    style={popperInstance.styles.popper}
                    {...popperInstance.attributes.popper}
                >
                    <ol className="tw-list-none tw-flex-wrap tw-gap-y-1" role="menu">
                        {items.map((item, index) => (
                            <OverflowMenuItem {...item} key={`overflow-menu-item-${index}`} />
                        ))}
                    </ol>
                </nav>
            )}
        </div>
    );
};
