/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent, ReactElement } from 'react';
import { IconProps } from '@foundation/Icon/IconProps';
import { MenuItem } from '..';
import { getItemElementType } from '@utilities/elements';

export interface OverflowMenuItemProps {
    id: string;
    label: string;
    link?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    decorator?: ReactElement<IconProps>;
}

export const OverflowMenuItem = ({ id, label, link, onClick }: OverflowMenuItemProps) => {
    const contentElementType = getItemElementType(link, onClick);

    const menuItemElement = <MenuItem title={label} />;

    return (
        <li id={id} data-test-id="overflow-menu-item">
            {contentElementType === 'a' && (
                <a className="item-action" href={link}>
                    {menuItemElement}
                </a>
            )}
            {contentElementType === 'button' && (
                <button onClick={onClick} type="button" className="item-action">
                    {menuItemElement}
                </button>
            )}
            {contentElementType === 'span' && <span>{menuItemElement}</span>}
        </li>
    );
};
