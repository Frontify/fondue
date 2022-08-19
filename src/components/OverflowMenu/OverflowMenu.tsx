/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { IconDotsHorizontal } from '@foundation/Icon';
import { Button, ButtonRounding, ButtonSize, ButtonStyle, ButtonType } from '..';
import { OverflowMenuItem, OverflowMenuItemProps } from './OverflowMenuItem';

export interface OverflowMenuProps {
    items: OverflowMenuItemProps[];
}

export const OverflowMenu = ({ items }: OverflowMenuProps) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    return (
        <div data-test-id="overflow-menu" className="tw-relative tw-bottom-0 tw-top-0 tw-flex">
            <Button
                icon={<IconDotsHorizontal />}
                solid={false}
                rounding={ButtonRounding.Medium}
                size={ButtonSize.Small}
                style={ButtonStyle.Secondary}
                type={ButtonType.Button}
                onClick={() => {
                    setIsMenuOpened(!isMenuOpened);
                }}
            />
            {isMenuOpened && (
                <nav
                    className="tw-bg-base tw-border tw-border-line-strong tw-rounded-lg tw-absolute tw-left-0 tw-top-7 tw-py-1.5 tw-shadow tw-w-max"
                    role="dialog"
                >
                    <ol className="tw-list-none tw-flex-wrap tw-gap-y-1">
                        {items.map((item, index) => (
                            <OverflowMenuItem {...item} key={`overflow-menu-item-${index}`} />
                        ))}
                    </ol>
                </nav>
            )}
        </div>
    );
};
