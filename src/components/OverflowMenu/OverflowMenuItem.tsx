/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent, ReactElement } from 'react';
import { IconProps } from '@foundation/Icon/IconProps';
import { MenuItem } from '..';
import { getItemElementType } from '@utilities/elements';

export interface OverflowMenuItemProps {
    id?: string;
    label: string;
    link?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    decorator?: ReactElement<IconProps>;
    disabled?: boolean;
}

export const OverflowMenuItem = ({
    id = 'overflow-menu-item',
    label,
    link,
    onClick,
    disabled = false,
}: OverflowMenuItemProps) => {
    const contentElementType = getItemElementType(link, onClick);

    const menuItemElement = <MenuItem title={label} disabled={disabled} />;

    return (
        <li id={id} data-test-id="overflow-menu-item">
            {contentElementType === 'a' && <a href={link}>{menuItemElement}</a>}
            {contentElementType === 'button' && (
                <button onClick={onClick} type="button" disabled={disabled}>
                    {menuItemElement}
                </button>
            )}
            {contentElementType === 'span' && <span>{menuItemElement}</span>}
        </li>
    );
};
