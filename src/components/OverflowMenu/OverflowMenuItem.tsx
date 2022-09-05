/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent, ReactElement } from 'react';
import { IconProps } from '@foundation/Icon/IconProps';
import { MenuItem } from '..';

export interface OverflowMenuItemProps {
    label: string;
    link?: string;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    decorator?: ReactElement<IconProps>;
}

// TODO - The same function is also used on BreadcrumbItem on an open PR (https://github.com/Frontify/fondue/pull/930)
// should we export it on the utilities or wait for it to be merged and update both components?
const getElementType = (link?: OverflowMenuItemProps['link'], onClick?: OverflowMenuItemProps['onClick']) => {
    if (link) {
        return 'a';
    } else if (onClick) {
        return 'button';
    }

    return 'span';
};

export const OverflowMenuItem = ({ label, link, onClick }: OverflowMenuItemProps) => {
    const contentElementType = getElementType(link, onClick);

    const menuItemElement = <MenuItem title={label} />;

    return (
        <li data-test-id="overflow-menu-item">
            {contentElementType === 'a' && <a href={link}>{menuItemElement}</a>}
            {contentElementType === 'button' && (
                <button onClick={onClick} type="button">
                    {menuItemElement}
                </button>
            )}
            {contentElementType === 'span' && <span>{menuItemElement}</span>}
        </li>
    );
};
