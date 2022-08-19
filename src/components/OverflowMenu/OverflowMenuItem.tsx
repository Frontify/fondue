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

// TODO - The same function is also used on BreadcrumbItem
// should we export it on the utilities?
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
    return (
        <li data-test-id="overflow-menu-item">
            {contentElementType === 'a' && (
                <a href={link}>
                    <MenuItem title={label} />
                </a>
            )}
            {contentElementType === 'button' && <button>{label}</button>}
            {contentElementType === 'span' && <span>{label}</span>}
        </li>
    );
};
